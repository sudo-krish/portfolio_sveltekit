<!-- src/lib/components/ui/MobileCarousel.svelte -->
<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import {
        Eye,
        FileText,
        ChevronUp,
        ChevronDown,
    } from "lucide-svelte";
    import { carouselSwipeFraction } from "$lib/stores/carousel-store";
    import { scrollDirection } from "$lib/stores/scroll-store";
    import gsap from "gsap";

    let {
        layout = "left",
        sectionTitle = "Data Feature",
        sectionDescription = "Interact with the 3D model",
        accentColor = "hsl(var(--primary))",
    } = $props<{
        layout?: "left" | "right";
        sectionTitle?: string;
        sectionDescription?: string;
        accentColor?: string;
    }>();

    let wrapperEl = $state<HTMLDivElement | null>(null);
    let flipperEl = $state<HTMLDivElement | null>(null);
    let backSlideEl = $state<HTMLDivElement | null>(null);
    let activeSlide = $state(0); // 0 = 3D, 1 = Content
    let hintVisible = $state(true);
    let observer: IntersectionObserver;
    let isCurrentlyVisible = $state(false);
    let isTransitioning = $state(false);

    function triggerSectionChange(dir: number) {
        if (isTransitioning) return;
        scrollDirection.set(dir);
        setTimeout(() => {
            scrollDirection.set(0);
        }, 100);
    }

    function goToSlide(index: number) {
        if (activeSlide === index || isTransitioning) return;
        isTransitioning = true;
        activeSlide = index;
        
        if (index === 1 && backSlideEl) {
            backSlideEl.scrollTop = 0;
            const targets = backSlideEl.querySelectorAll(
                ".mobile-spec-stage > * > * > *, .mobile-spec-stage > * > *",
            );
            if (targets.length > 0 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                gsap.fromTo(
                    targets,
                    { y: 18, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.55,
                        stagger: 0.055,
                        ease: "expo.out",
                        delay: 0.24,
                        clearProps: "transform,opacity",
                    },
                );
            }
        }

        if (flipperEl) {
            const tl = gsap.timeline({
                onComplete: () => {
                    isTransitioning = false;
                    if (hintVisible) hintVisible = false;
                }
            });

            // Smooth flip with subtle zoom out/in effect
            tl.to(flipperEl, {
                scale: 0.92,
                duration: 0.3,
                ease: "power2.out"
            }, 0)
            .to(flipperEl, {
                rotationY: index === 1 ? -180 : 0,
                duration: 0.7,
                ease: "power3.inOut",
                force3D: true
            }, 0.1)
            .to(flipperEl, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            }, 0.6);
        } else {
            isTransitioning = false;
        }

        // Reset the global store so the 3D model returns to the center
        if (index === 0) {
            carouselSwipeFraction.set(0);
        }
    }

    function resetTo3D() {
        if (activeSlide !== 0 && !isTransitioning) {
            activeSlide = 0;
            if (flipperEl) {
                gsap.set(flipperEl, { rotationY: 0, scale: 1 });
            }
            carouselSwipeFraction.set(0);
        }
    }

    /**
     * Custom Gesture Handler
     */
    function swipeSection(node: HTMLElement, is3D: boolean) {
        let startY = 0, startX = 0;
        let hasMoved = false;
        let startAtTop = false;
        let startAtBottom = false;

        function onStart(e: TouchEvent) {
            if (isTransitioning) return;
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            hasMoved = false;
            
            if (!is3D) {
                const maxScroll = node.scrollHeight - node.clientHeight;
                startAtTop = node.scrollTop <= 2;
                startAtBottom = node.scrollTop >= maxScroll - 2;
            }
        }

        function onMove(e: TouchEvent) {
            if (isTransitioning) {
                if (e.cancelable) e.preventDefault();
                return;
            }
            hasMoved = true;
            // On 3D view, prevent native scrolling entirely
            if (is3D && e.cancelable) {
                e.preventDefault();
            }
        }

        function onEnd(e: TouchEvent) {
            if (isTransitioning || !hasMoved) return;
            const dx = e.changedTouches[0].clientX - startX;
            const dy = startY - e.changedTouches[0].clientY; // Positive = Swiped UP

            // Horizontal Swipe
            if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
                if (is3D) {
                    goToSlide(1); // Any horizontal swipe on 3D goes to content
                } else {
                    if (dx > 50) goToSlide(0); // Swiped Right -> back to 3D
                }
                return;
            }

            // Vertical Swipe
            if (Math.abs(dy) > 50) {
                if (is3D) {
                    if (dy > 0) { // Swiped UP (scroll down intent)
                        goToSlide(1); 
                    } else { // Swiped DOWN (scroll up intent)
                        triggerSectionChange(-1);
                    }
                } else {
                    if (startAtTop && dy < -80) goToSlide(0);
                    else if (startAtBottom && dy > 80) triggerSectionChange(1);
                }
            }
        }

        let wheelTimeout: ReturnType<typeof setTimeout>;
        function onWheel(e: WheelEvent) {
            if (isTransitioning) {
                if (e.cancelable) e.preventDefault();
                return;
            }
            
            if (is3D) {
                if (e.cancelable) e.preventDefault();
                if (e.deltaY > 10) {
                    clearTimeout(wheelTimeout);
                    wheelTimeout = setTimeout(() => goToSlide(1), 50);
                } else if (e.deltaY < -10) {
                    clearTimeout(wheelTimeout);
                    wheelTimeout = setTimeout(() => triggerSectionChange(-1), 50);
                }
                return;
            }

            if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

            const atTop = node.scrollTop <= 2;
            const maxScroll = node.scrollHeight - node.clientHeight;
            const atBottom = node.scrollTop >= maxScroll - 2;

            if (atTop && e.deltaY < -10) {
                clearTimeout(wheelTimeout);
                wheelTimeout = setTimeout(() => goToSlide(0), 50);
            } else if (atBottom && e.deltaY > 10) {
                clearTimeout(wheelTimeout);
                wheelTimeout = setTimeout(() => triggerSectionChange(1), 50);
            }
        }

        node.addEventListener("touchstart", onStart, { passive: false });
        node.addEventListener("touchmove", onMove, { passive: false });
        node.addEventListener("touchend", onEnd, { passive: false });
        node.addEventListener("wheel", onWheel, { passive: false });

        return {
            destroy() {
                node.removeEventListener("touchstart", onStart);
                node.removeEventListener("touchmove", onMove);
                node.removeEventListener("touchend", onEnd);
                node.removeEventListener("wheel", onWheel);
            },
        };
    }

    let hintTimer: ReturnType<typeof setTimeout>;

    onMount(() => {
        resetTo3D();

        observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    isCurrentlyVisible = entry.isIntersecting;
                    if (isCurrentlyVisible) resetTo3D();
                });
            },
            { threshold: 0.5 },
        );

        if (wrapperEl) observer.observe(wrapperEl);

        // Initial entry flip animation
        if (flipperEl) {
            const initialAngle = layout === "left" ? -10 : 10;
            gsap.fromTo(flipperEl, 
                { rotationY: initialAngle, scale: 0.96 },
                {
                    rotationY: 0,
                    scale: 1,
                    duration: 1.0,
                    ease: "expo.out",
                    delay: 0.5,
                }
            );
        }

        hintTimer = setTimeout(() => (hintVisible = false), 6000);
    });

    onDestroy(() => {
        if (hintTimer) clearTimeout(hintTimer);
        if (observer) observer.disconnect();
    });
</script>

<div bind:this={wrapperEl} class="relative w-full h-[100dvh] overflow-hidden z-20">
    <div class="hidden lg:block w-full h-[100dvh]">
        <!-- svelte-ignore slot_element_deprecated -->
        <slot name="content-pc" />
    </div>

    <!-- MOBILE STACKED FLIP LAYOUT -->
    <div class="lg:hidden w-full h-[100dvh] relative perspective-container">
        
        <div bind:this={flipperEl} class="flipper w-full h-full relative">
            
            <!-- 3D SLIDE (Front) -->
            <div
                use:swipeSection={true}
                class="slide-front absolute inset-0 w-full h-full flex flex-col justify-between pt-11 pb-24 z-10"
                style="pointer-events: {activeSlide === 0 ? 'auto' : 'none'};"
            >
                <!-- Artistic 3D Viewport Registration HUD (Non-intrusive frame around 3D stage) -->
                <div class="mx-4 sm:mx-auto sm:w-full sm:max-w-md flex items-center justify-between pointer-events-none select-none opacity-85">
                    <div class="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-card/75 border border-border/70">
                        <span class="w-1.5 h-1.5 rounded-full animate-pulse" style="background-color: {accentColor};"></span>
                        <span class="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                            3D STAGE // LIVE
                        </span>
                    </div>
                    <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-card/75 border border-border/70">
                        <span class="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-primary">
                            DRAG OR SWIPE
                        </span>
                    </div>
                </div>

                <!-- Sculpted Architectural Exhibition Placard -->
                <div class="mx-4 sm:mx-auto sm:w-full sm:max-w-md w-auto relative pointer-events-auto">
                    <div class="flip-card relative overflow-hidden bg-card/95 border border-border/85 rounded-2xl shadow-[var(--shadow-xl)] p-4 sm:p-5 w-full">
                        <!-- Top Specular Hairline -->
                        <div
                            class="pointer-events-none absolute inset-x-0 top-0 h-px opacity-80"
                            style="background: linear-gradient(90deg, transparent, {accentColor}, transparent);"
                        ></div>
                        <!-- Left Vertical Specification Rule -->
                        <div
                            class="pointer-events-none absolute inset-y-3 left-0 w-[2px] rounded-r-full opacity-75"
                            style="background-color: {accentColor};"
                        ></div>

                        <div class="relative z-10 flex flex-col items-start text-left pl-1">
                            <div class="w-full flex items-start justify-between gap-3">
                                <div class="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight leading-tight font-heading">
                                    {sectionTitle}
                                </div>
                                <span
                                    class="shrink-0 font-mono text-[9px] font-bold uppercase tracking-[0.16em] px-2 py-0.5 rounded-md bg-muted/80 border border-border/70 text-primary mt-0.5"
                                >
                                    3D MODEL
                                </span>
                            </div>
                            <p class="text-[12.5px] sm:text-[13px] font-normal text-muted-foreground mt-1 mb-3.5 leading-snug">
                                {sectionDescription}
                            </p>
                            <button
                                type="button"
                                onclick={() => goToSlide(1)}
                                aria-label="View specifications"
                                class="w-full pt-3 border-t border-border/70 flex items-center justify-between cursor-pointer group hover:bg-transparent bg-transparent outline-none"
                            >
                                <div class="flex items-center gap-2">
                                    <span class="w-5 h-px bg-primary/60 group-hover:w-7 transition-all duration-300"></span>
                                    <span class="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-foreground/90 transition-colors group-hover:text-primary">
                                        Open Architecture Specs
                                    </span>
                                </div>
                                <div class="relative px-2.5 h-7 flex items-center justify-center gap-1 overflow-hidden rounded-lg bg-primary/14 border border-primary/35 shadow-2xs group-hover:bg-primary/22 transition-colors">
                                    <div class="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-primary/25 to-transparent swipe-track-down"></div>
                                    <span class="font-mono text-[9px] font-bold uppercase tracking-wider text-primary relative z-10">Flip</span>
                                    <ChevronDown
                                        size={14}
                                        class="text-primary relative z-10"
                                    />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- SPECS SLIDE (Back) -->
            <div
                bind:this={backSlideEl}
                use:swipeSection={false}
                class="slide-back absolute inset-0 w-full h-full overflow-y-auto overscroll-y-contain hide-scroll block z-20 bg-background/92"
                style="pointer-events: {activeSlide === 1 ? 'auto' : 'none'}; background-image: radial-gradient(circle at 85% 8%, hsl(var(--primary) / 0.10), transparent 52%);"
            >
                <div class="mobile-spec-stage min-h-[101%] pb-32 relative">
                    <!-- Quick Return-to-3D Header Strip -->
                    <div class="max-w-xl md:max-w-2xl mx-auto px-4 sm:px-6 pt-10 -mb-14 relative z-30 flex items-center justify-between">
                        <button
                            type="button"
                            onclick={() => goToSlide(0)}
                            class="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-card/90 border border-border/80 text-muted-foreground hover:text-primary hover:border-primary/45 transition-all duration-300 shadow-2xs cursor-pointer active:scale-95"
                        >
                            <Eye size={13} class="text-primary" />
                            <span class="font-mono text-[10px] font-bold uppercase tracking-[0.15em]">
                                Return to 3D Stage
                            </span>
                        </button>
                        <span class="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                            {sectionTitle}
                        </span>
                    </div>

                    <!-- svelte-ignore slot_element_deprecated -->
                    <slot name="content-mobile" />
                </div>
            </div>

        </div>

        <!-- Pagination Indicator -->
        <div class="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 pointer-events-auto w-[90vw] max-w-[380px]">
            <div class="relative flex items-center p-1.5 rounded-2xl bg-card/95 backdrop-blur-xl border border-border shadow-lg gap-1">
                <div class="relative flex items-center flex-1 min-w-0">
                    <div
                        class="absolute top-0 bottom-0 w-1/2 bg-muted rounded-xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-sm"
                        style="transform: translateX({activeSlide === 0 ? '0' : '100%'});"
                    ></div>
                    <button
                        type="button"
                        onclick={() => goToSlide(0)}
                        class="relative z-10 flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl transition-colors duration-300 cursor-pointer {activeSlide === 0 ? 'text-foreground font-bold' : 'text-muted-foreground'}"
                    >
                        <Eye size={16} class={activeSlide === 0 ? "text-primary" : ""} />
                        <span class="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-widest whitespace-nowrap">3D Model</span>
                    </button>
                    <button
                        type="button"
                        onclick={() => goToSlide(1)}
                        class="relative z-10 flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl transition-colors duration-300 cursor-pointer {activeSlide === 1 ? 'text-foreground font-bold' : 'text-muted-foreground'}"
                    >
                        <FileText size={16} class={activeSlide === 1 ? "text-primary" : ""} />
                        <span class="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-widest whitespace-nowrap">Specs</span>
                    </button>
                </div>
                <div class="w-px h-8 bg-border/50 mx-1 shrink-0"></div>
                <div class="flex items-center gap-1 shrink-0">
                    <button
                        type="button"
                        onclick={() => triggerSectionChange(-1)}
                        aria-label="Previous Section"
                        class="w-10 h-10 rounded-xl flex items-center justify-center bg-transparent hover:bg-muted text-foreground transition-colors active:scale-95 cursor-pointer"
                    ><ChevronUp size={20} /></button>
                    <button
                        type="button"
                        onclick={() => triggerSectionChange(1)}
                        aria-label="Next Section"
                        class="w-10 h-10 rounded-xl flex items-center justify-center bg-transparent hover:bg-muted text-foreground transition-colors active:scale-95 cursor-pointer"
                    ><ChevronDown size={20} /></button>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .hide-scroll {
        -ms-overflow-style: none;
        scrollbar-width: none;
        overscroll-behavior-x: none;
        overscroll-behavior-y: contain;
    }
    .hide-scroll::-webkit-scrollbar {
        display: none;
    }
    
    /* 3D Flip Styles */
    .perspective-container {
        perspective: 1500px;
    }
    .flipper {
        transform-style: preserve-3d;
        will-change: transform;
    }
    .slide-front {
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        touch-action: none;
    }
    .slide-back {
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        transform: rotateY(180deg);
        touch-action: pan-y;
    }
    
    .swipe-track-down {
        transform: translateY(-100%);
        animation: swipeLightDown 2.5s infinite ease-in-out;
    }
    @keyframes swipeLightDown {
        0% { transform: translateY(-100%); }
        100% { transform: translateY(100%); }
    }
</style>
