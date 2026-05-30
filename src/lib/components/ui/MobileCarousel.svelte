<!-- src/lib/components/ui/MobileCarousel.svelte -->
<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import {
        ChevronLeft,
        ChevronRight,
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
        }

        if (flipperEl) {
            const tl = gsap.timeline({
                onComplete: () => {
                    isTransitioning = false;
                    if (hintVisible) hintVisible = false;
                }
            });

            // Premium smooth flip with zoom out/in effect
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

        // Reset the global store so the 3D model returns to the center or sides appropriately
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
                e.preventDefault();
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
                    // Only trigger if they STARTED the swipe at the boundary.
                    // This prevents a fast scrolling swipe from accidentally jumping sections.
                    // Lowered threshold to 80px for better responsiveness.
                    if (startAtTop && dy < -80) goToSlide(0);
                    else if (startAtBottom && dy > 80) triggerSectionChange(1);
                }
            }
        }

        let wheelTimeout: ReturnType<typeof setTimeout>;
        function onWheel(e: WheelEvent) {
            if (isTransitioning) {
                e.preventDefault();
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

        function onNativeScroll() {
            // We no longer trigger section changes purely on native scroll positions!
            // iOS rubber banding or fast scrolling would accidentally trigger jumps.
            // The boundary jumps are now strictly enforced by intentional swipes (onEnd)
            // or explicit wheel events.
        }

        // Must be passive: false to allow e.preventDefault()
        node.addEventListener("touchstart", onStart, { passive: false });
        node.addEventListener("touchmove", onMove, { passive: false });
        node.addEventListener("touchend", onEnd, { passive: false });
        node.addEventListener("wheel", onWheel, { passive: false });
        node.addEventListener("scroll", onNativeScroll, { passive: true });

        return {
            destroy() {
                node.removeEventListener("touchstart", onStart);
                node.removeEventListener("touchmove", onMove);
                node.removeEventListener("touchend", onEnd);
                node.removeEventListener("wheel", onWheel);
                node.removeEventListener("scroll", onNativeScroll);
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
            const initialAngle = layout === "left" ? -12 : 12;
            gsap.fromTo(flipperEl, 
                { rotationY: initialAngle, scale: 0.95 },
                {
                    rotationY: 0,
                    scale: 1,
                    duration: 1.2,
                    ease: "elastic.out(1, 0.6)",
                    delay: 0.8,
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
                class="slide-front absolute inset-0 w-full h-full flex flex-col justify-end pb-28 z-10"
                style="pointer-events: {activeSlide === 0 ? 'auto' : 'none'};"
            >
                <div class="mx-4 w-auto relative pointer-events-auto">
                    <div class="flip-card bg-card/95 border border-foreground/10 rounded-[1.5rem] shadow-[0_20px_40px_rgba(0,0,0,0.5)] p-6 w-full">
                        <div class="relative z-10 text-center">
                            <div class="flex items-center justify-center gap-2 mb-2">
                                <div
                                    class="w-1.5 h-1.5 rounded-full animate-pulse shadow-[0_0_8px_currentColor]"
                                    style="background-color: {accentColor}; color: {accentColor};"
                                ></div>
                                <span class="text-[9px] font-mono uppercase tracking-[0.2em] font-bold text-muted-foreground">
                                    Interactive
                                </span>
                            </div>
                            <div class="text-3xl font-black text-foreground tracking-tighter leading-tight drop-shadow-sm font-heading">
                                {sectionTitle}
                            </div>
                            <p class="text-[13px] font-light text-muted-foreground mt-1 mb-5">
                                {sectionDescription}
                            </p>
                            <button
                                type="button"
                                onclick={() => goToSlide(1)}
                                aria-label="View specifications"
                                class="w-full mt-2 flex flex-col items-center justify-center cursor-pointer group hover:bg-transparent bg-transparent border-none outline-none p-2"
                            >
                                <span class="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground mb-2 transition-colors group-hover:text-foreground">
                                    Tap or swipe down to read
                                </span>
                                <div class="relative w-20 h-10 flex items-center justify-center overflow-hidden rounded-full bg-muted border border-border shadow-sm">
                                    <div class="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-foreground/20 to-transparent swipe-track-down"></div>
                                    <ChevronDown
                                        size={18}
                                        class="text-muted-foreground group-hover:text-foreground relative z-10 animate-pulse-fast"
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
                class="slide-back absolute inset-0 w-full h-full overflow-y-auto overscroll-y-contain hide-scroll block z-20 bg-background"
                style="pointer-events: {activeSlide === 1 ? 'auto' : 'none'};"
            >
                <div class="min-h-[101%] pb-32">
                    <!-- svelte-ignore slot_element_deprecated -->
                    <slot name="content-mobile" />
                </div>
            </div>

        </div>

        <!-- Pagination Indicator -->
        <div class="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 pointer-events-auto w-[90vw] max-w-[380px]">
            <div class="relative flex items-center p-1.5 rounded-2xl bg-card border border-border shadow-lg gap-1">
                <div class="relative flex items-center flex-1 min-w-0">
                    <div
                        class="absolute top-0 bottom-0 w-1/2 bg-muted rounded-xl transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-sm"
                        style="transform: translateX({activeSlide === 0 ? '0' : '100%'});"
                    ></div>
                    <button
                        type="button"
                        onclick={() => goToSlide(0)}
                        class="relative z-10 flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl transition-colors duration-300 {activeSlide === 0 ? 'text-foreground font-bold' : 'text-muted-foreground'}"
                    >
                        <Eye size={16} class={activeSlide === 0 ? "drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" : ""} />
                        <span class="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-widest truncate">3D Model</span>
                    </button>
                    <button
                        type="button"
                        onclick={() => goToSlide(1)}
                        class="relative z-10 flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl transition-colors duration-300 {activeSlide === 1 ? 'text-foreground font-bold' : 'text-muted-foreground'}"
                    >
                        <FileText size={16} class={activeSlide === 1 ? "drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" : ""} />
                        <span class="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-widest truncate">Specs</span>
                    </button>
                </div>
                <div class="w-px h-8 bg-border/50 mx-1 shrink-0"></div>
                <div class="flex items-center gap-1 shrink-0">
                    <button
                        type="button"
                        onclick={() => triggerSectionChange(-1)}
                        aria-label="Previous Section"
                        class="w-10 h-10 rounded-xl flex items-center justify-center bg-transparent hover:bg-muted text-foreground transition-colors active:scale-95"
                    ><ChevronUp size={20} /></button>
                    <button
                        type="button"
                        onclick={() => triggerSectionChange(1)}
                        aria-label="Next Section"
                        class="w-10 h-10 rounded-xl flex items-center justify-center bg-transparent hover:bg-muted text-foreground transition-colors active:scale-95"
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
