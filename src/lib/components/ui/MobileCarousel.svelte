<!-- src/lib/components/ui/MobileCarousel.svelte -->
<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import {
        Layers,
        FileText,
        ChevronUp,
        ChevronDown,
        ArrowRight,
    } from "lucide-svelte";
    import { carouselSwipeFraction } from "$lib/stores/carousel-store";
    import { scrollDirection, activeSectionIndex } from "$lib/stores/scroll-store";
    import gsap from "gsap";

    let {
        layout = "left",
        sectionTitle = "Platform Architecture",
        sectionDescription = "Interact with the 3D pipeline simulation",
        accentColor = "hsl(var(--primary))",
        modelLabel = "Architecture",
        briefLabel = "Executive Brief",
    } = $props<{
        layout?: "left" | "right";
        sectionTitle?: string;
        sectionDescription?: string;
        accentColor?: string;
        modelLabel?: string;
        briefLabel?: string;
    }>();

    let wrapperEl = $state<HTMLDivElement | null>(null);
    let flipperEl = $state<HTMLDivElement | null>(null);
    let backSlideEl = $state<HTMLDivElement | null>(null);
    let activeSlide = $state(0); // 0 = 3D Architecture, 1 = Executive Brief
    let hintVisible = $state(true);
    let observer: IntersectionObserver;
    let isCurrentlyVisible = $state(false);
    let isTransitioning = $state(false);

    let sectionStep = $derived(String(($activeSectionIndex ?? 0) + 1).padStart(2, "0"));

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
            if (
                targets.length > 0 &&
                !window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ) {
                gsap.fromTo(
                    targets,
                    { y: 16, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.55,
                        stagger: 0.05,
                        ease: "expo.out",
                        delay: 0.22,
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

            // Smooth flip with subtle scale transition
            tl.to(flipperEl, {
                scale: 0.94,
                duration: 0.25,
                ease: "power2.out"
            }, 0)
            .to(flipperEl, {
                rotationY: index === 1 ? -180 : 0,
                duration: 0.65,
                ease: "power3.inOut",
                force3D: true
            }, 0.08)
            .to(flipperEl, {
                scale: 1,
                duration: 0.25,
                ease: "power2.out"
            }, 0.55);
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
                class="slide-front absolute inset-0 w-full h-full flex flex-col justify-end pb-24 z-10"
                style="pointer-events: {activeSlide === 0 ? 'auto' : 'none'};"
            >
                <div class="mx-3.5 sm:mx-auto sm:w-full sm:max-w-md w-auto relative pointer-events-auto">
                    <div class="flip-card relative overflow-hidden bg-card/90 backdrop-blur-2xl border border-border/85 rounded-2xl shadow-[var(--shadow-xl)] p-4 sm:p-5 w-full">
                        <!-- Blueprint Crosshair / Registration Corner Marks -->
                        <div class="pointer-events-none absolute top-2 left-2 w-2 h-2 border-t border-l" style="border-color: {accentColor}; opacity: 0.6;"></div>
                        <div class="pointer-events-none absolute bottom-2 right-2 w-2 h-2 border-b border-r" style="border-color: {accentColor}; opacity: 0.6;"></div>

                        <!-- Top Specular Hairline -->
                        <div
                            class="pointer-events-none absolute inset-x-0 top-0 h-px opacity-90"
                            style="background: linear-gradient(90deg, transparent, {accentColor}, transparent);"
                        ></div>
                        <!-- Left Vertical Specification Rule -->
                        <div
                            class="pointer-events-none absolute inset-y-3 left-0 w-[2px] rounded-r-full opacity-80"
                            style="background-color: {accentColor};"
                        ></div>

                        <div class="relative z-10 flex flex-col items-start text-left pl-1.5">
                            <!-- Stage Index (Clean, zero clutter, no fake pulse badge) -->
                            <div class="w-full flex items-center justify-between gap-2 mb-1">
                                <span class="font-mono text-[9.5px] font-bold uppercase tracking-[0.2em]" style="color: {accentColor};">
                                    Stage {sectionStep} // 11
                                </span>
                            </div>

                            <!-- Headline -->
                            <div class="text-[1.18rem] sm:text-[1.32rem] font-extrabold text-foreground tracking-tight leading-tight font-heading">
                                {sectionTitle}
                            </div>

                            <!-- Description -->
                            <p class="text-[12px] sm:text-[13px] font-normal text-muted-foreground mt-1 mb-3 leading-snug">
                                {sectionDescription}
                            </p>

                            <!-- Section-Specific Action Trigger Button -->
                            <button
                                type="button"
                                onclick={() => goToSlide(1)}
                                aria-label="Explore {briefLabel}"
                                class="w-full pt-3 border-t border-border/70 flex items-center justify-between cursor-pointer group hover:bg-transparent bg-transparent outline-none active:scale-[0.99] transition-transform"
                            >
                                <div class="flex items-center gap-2">
                                    <span class="w-3.5 h-px group-hover:w-5 transition-all duration-300" style="background-color: {accentColor}; opacity: 0.85;"></span>
                                    <span class="font-mono text-[10.5px] font-bold uppercase tracking-[0.16em] text-foreground/90 transition-colors group-hover:text-foreground">
                                        {briefLabel}
                                    </span>
                                </div>
                                <div class="relative px-2.5 h-7 flex items-center justify-center gap-1.5 overflow-hidden rounded-lg border shadow-2xs group-hover:brightness-110 transition-all" style="background-color: color-mix(in srgb, {accentColor} 14%, transparent); border-color: color-mix(in srgb, {accentColor} 40%, transparent);">
                                    <div class="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent swipe-track-down"></div>
                                    <span class="font-mono text-[9px] font-bold uppercase tracking-wider relative z-10" style="color: {accentColor};">Open</span>
                                    <ArrowRight
                                        size={12}
                                        class="relative z-10 group-hover:translate-x-0.5 transition-transform"
                                        style="color: {accentColor};"
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
                class="slide-back absolute inset-0 w-full h-full overflow-y-auto overscroll-y-contain hide-scroll block z-20 bg-background/95"
                style="pointer-events: {activeSlide === 1 ? 'auto' : 'none'}; background-image: radial-gradient(circle at 85% 8%, hsl(var(--primary) / 0.08), transparent 52%);"
            >
                <div class="mobile-spec-stage min-h-[101%] pb-32 relative">
                    <!-- Quick Return-to-Architecture Header Strip -->
                    <div class="max-w-xl md:max-w-2xl mx-auto px-4 sm:px-6 pt-6 -mb-14 relative z-30 flex items-center justify-between pointer-events-auto">
                        <button
                            type="button"
                            onclick={() => goToSlide(0)}
                            class="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-card/90 backdrop-blur-md border border-border/80 text-muted-foreground hover:border-primary/45 transition-all duration-300 shadow-2xs cursor-pointer active:scale-95"
                        >
                            <Layers size={13} style="color: {accentColor};" />
                            <span class="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-foreground">
                                Return to {modelLabel}
                            </span>
                        </button>
                        <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-card/80 border border-border/70 shadow-2xs">
                            <span class="font-mono text-[9px] font-bold uppercase tracking-[0.18em]" style="color: {accentColor};">
                                Stage {sectionStep} // 11
                            </span>
                        </div>
                    </div>

                    <!-- svelte-ignore slot_element_deprecated -->
                    <slot name="content-mobile" />
                </div>
            </div>

        </div>

        <!-- Pagination Indicator & Contextual Section Tabs -->
        <div
            class="absolute left-1/2 -translate-x-1/2 z-40 pointer-events-auto w-[92vw] max-w-[380px]"
            style="bottom: max(1.25rem, env(safe-area-inset-bottom));"
        >
            <div class="relative flex items-center p-1 rounded-2xl bg-card/92 backdrop-blur-2xl border border-border/80 shadow-[var(--shadow-xl)] gap-1">
                <div class="relative flex items-center flex-1 min-w-0">
                    <div
                        class="absolute top-0 bottom-0 w-1/2 bg-muted/90 rounded-xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-xs border border-border/60"
                        style="transform: translateX({activeSlide === 0 ? '0' : '100%'});"
                    ></div>
                    <button
                        type="button"
                        onclick={() => goToSlide(0)}
                        class="relative z-10 flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl transition-colors duration-300 cursor-pointer {activeSlide === 0 ? 'text-foreground font-bold' : 'text-muted-foreground hover:text-foreground'}"
                    >
                        <Layers size={14} class="shrink-0" style={activeSlide === 0 ? `color: ${accentColor}` : ""} />
                        <span class="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider whitespace-nowrap truncate">{modelLabel}</span>
                    </button>
                    <button
                        type="button"
                        onclick={() => goToSlide(1)}
                        class="relative z-10 flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl transition-colors duration-300 cursor-pointer {activeSlide === 1 ? 'text-foreground font-bold' : 'text-muted-foreground hover:text-foreground'}"
                    >
                        <FileText size={14} class="shrink-0" style={activeSlide === 1 ? `color: ${accentColor}` : ""} />
                        <span class="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider whitespace-nowrap truncate">{briefLabel}</span>
                    </button>
                </div>
                <div class="w-px h-6 bg-border/60 mx-0.5 shrink-0"></div>
                <div class="flex items-center gap-0.5 shrink-0">
                    <button
                        type="button"
                        onclick={() => triggerSectionChange(-1)}
                        aria-label="Previous Section"
                        class="w-9 h-9 min-h-[44px] min-w-[36px] relative before:absolute before:-inset-1 rounded-lg flex items-center justify-center bg-transparent hover:bg-muted text-foreground transition-colors active:scale-95 cursor-pointer"
                    ><ChevronUp size={18} /></button>
                    <button
                        type="button"
                        onclick={() => triggerSectionChange(1)}
                        aria-label="Next Section"
                        class="w-9 h-9 min-h-[44px] min-w-[36px] relative before:absolute before:-inset-1 rounded-lg flex items-center justify-center bg-transparent hover:bg-muted text-foreground transition-colors active:scale-95 cursor-pointer"
                    ><ChevronDown size={18} /></button>
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
