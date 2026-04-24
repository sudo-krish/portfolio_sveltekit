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

    let carouselEl = $state<HTMLDivElement | null>(null);
    let wrapperEl = $state<HTMLDivElement | null>(null);
    let activeSlide = $state(0);
    let hintVisible = $state(true);
    let observer: IntersectionObserver;
    let isCurrentlyVisible = $state(false);

    // Prevent desktop wheel events from bubbling to GSAP observer
    function handleWheel(e: WheelEvent) {
        const target = e.target as HTMLElement;
        const container = target.closest(
            ".overflow-y-auto, .overflow-y-scroll",
        ) as HTMLElement;

        if (container && container.scrollHeight > container.clientHeight) {
            e.stopPropagation();
        }
    }

    // Content slide boundary detector: signals scrollDirection when
    // vertical scroll reaches top/bottom. Horizontal swipes propagate
    // to the carousel handler for slide navigation.
    function contentTouchBoundary(node: HTMLElement) {
        let startY = 0;
        let startX = 0;
        let axis: "none" | "h" | "v" = "none";
        let hitBoundary = false;
        let boundaryY = 0;

        function onStart(e: TouchEvent) {
            startY = e.touches[0].clientY;
            startX = e.touches[0].clientX;
            axis = "none";
            hitBoundary = false;
        }

        function onMove(e: TouchEvent) {
            const cy = e.touches[0].clientY;
            if (axis === "none") {
                const dx = Math.abs(e.touches[0].clientX - startX);
                const dy = Math.abs(cy - startY);
                if (dx + dy >= 8) axis = dx > dy ? "h" : "v";
            }
            if (axis !== "v") return;

            const delta = startY - cy; // positive = scrolling down
            const atTop = node.scrollTop <= 0;
            const atBottom =
                Math.ceil(node.scrollTop + node.clientHeight) >=
                node.scrollHeight;

            if ((atBottom && delta > 0) || (atTop && delta < 0)) {
                if (!hitBoundary) {
                    hitBoundary = true;
                    boundaryY = cy;
                }
            } else {
                hitBoundary = false;
            }
        }

        function onEnd(e: TouchEvent) {
            if (axis === "v" && hitBoundary) {
                const pastDelta = boundaryY - e.changedTouches[0].clientY;
                if (Math.abs(pastDelta) >= 40) {
                    scrollDirection.set(pastDelta > 0 ? 1 : -1);
                }
            }
            axis = "none";
            hitBoundary = false;
        }

        node.addEventListener("touchstart", onStart, { passive: true });
        node.addEventListener("touchmove", onMove, { passive: true });
        node.addEventListener("touchend", onEnd, { passive: true });
        return {
            destroy() {
                node.removeEventListener("touchstart", onStart);
                node.removeEventListener("touchmove", onMove);
                node.removeEventListener("touchend", onEnd);
            },
        };
    }

    // Carousel container touch handler. Owns all touch logic:
    // - Horizontal → programmatic goToSlide()
    // - Vertical on 3D slide (non-scrollable) → signal scrollDirection
    // - Vertical on content slide → handled by contentTouchBoundary
    function carouselTouch(node: HTMLElement) {
        let startX = 0;
        let startY = 0;
        let axis: "none" | "h" | "v" = "none";
        let hasScroller = false;

        function onStart(e: TouchEvent) {
            e.stopPropagation(); // Block GSAP Observer from catching this and calling preventDefault()
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            axis = "none";
            const target = e.target as HTMLElement;
            const el = target.closest('[data-carousel-scroller="true"]');
            hasScroller = !!el;
        }

        function onMove(e: TouchEvent) {
            e.stopPropagation(); // Block GSAP Observer from catching this and calling preventDefault()
            if (axis === "none") {
                const dx = Math.abs(e.touches[0].clientX - startX);
                const dy = Math.abs(e.touches[0].clientY - startY);
                if (dx + dy >= 8) axis = dx > dy ? "h" : "v";
            }
            if (axis === "h") {
                if (e.cancelable) e.preventDefault();
            } else if (axis === "v" && !hasScroller) {
                if (e.cancelable) e.preventDefault();
            }
        }

        function onEnd(e: TouchEvent) {
            e.stopPropagation(); // Block GSAP Observer from catching this and calling preventDefault()
            const THRESHOLD = 40;
            if (axis === "h") {
                const dx = startX - e.changedTouches[0].clientX;
                if (Math.abs(dx) >= THRESHOLD) {
                    if (dx > 0 && activeSlide === 0) goToSlide(1);
                    else if (dx < 0 && activeSlide === 1) goToSlide(0);
                }
            } else if (axis === "v" && !hasScroller) {
                const dy = startY - e.changedTouches[0].clientY;
                if (Math.abs(dy) >= THRESHOLD) {
                    scrollDirection.set(dy > 0 ? 1 : -1);
                }
            }
            axis = "none";
        }

        node.addEventListener("touchstart", onStart, { passive: true });
        node.addEventListener("touchmove", onMove, { passive: false });
        node.addEventListener("touchend", onEnd, { passive: true });
        return {
            destroy() {
                node.removeEventListener("touchstart", onStart);
                node.removeEventListener("touchmove", onMove);
                node.removeEventListener("touchend", onEnd);
            },
        };
    }

    function goToSlide(index: number) {
        if (!carouselEl) return;
        const slideWidth = carouselEl.clientWidth;
        carouselEl.scrollTo({ left: slideWidth * index, behavior: "smooth" });
    }

    function resetTo3D() {
        if (!carouselEl) return;

        if (layout === "right") {
            carouselEl.style.scrollBehavior = "auto";
            carouselEl.scrollLeft = carouselEl.clientWidth;
            activeSlide = 1;
            carouselEl.style.scrollBehavior = "smooth";
        } else {
            carouselEl.style.scrollBehavior = "auto";
            carouselEl.scrollLeft = 0;
            activeSlide = 0;
            carouselEl.style.scrollBehavior = "smooth";
        }

        if (wrapperEl) {
            const scrollContainers = wrapperEl.querySelectorAll(
                ".overflow-y-auto, .overflow-y-scroll",
            );
            scrollContainers.forEach((container) => {
                container.scrollTop = 0;
            });
        }

        if (isCurrentlyVisible) {
            carouselSwipeFraction.set(0);
        }
    }

    function onScroll() {
        if (!carouselEl || !isCurrentlyVisible) return;

        const slideWidth = carouselEl.clientWidth;
        const scrollPos = carouselEl.scrollLeft;

        const newSlide = Math.round(scrollPos / slideWidth);
        if (newSlide !== activeSlide) {
            activeSlide = newSlide;
            if (hintVisible) hintVisible = false;
        }

        let scrollPercentage = scrollPos / slideWidth;
        scrollPercentage = Math.max(0, Math.min(scrollPercentage, 1));

        const SWIPE_OFFSET = 10;
        let actual3DOffset = 0;

        if (layout === "left") {
            actual3DOffset = -(scrollPercentage * SWIPE_OFFSET);
        } else {
            actual3DOffset = (1 - scrollPercentage) * SWIPE_OFFSET;
        }

        carouselSwipeFraction.set(actual3DOffset);
    }

    let hintTimer: ReturnType<typeof setTimeout>;

    onMount(() => {
        requestAnimationFrame(() => {
            resetTo3D();
        });

        observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        isCurrentlyVisible = true;
                        resetTo3D();
                    } else {
                        isCurrentlyVisible = false;
                    }
                });
            },
            { threshold: 0.5 },
        );

        if (wrapperEl) observer.observe(wrapperEl);

        if (wrapperEl) {
            const flipAngle = layout === "left" ? -12 : 12;
            gsap.to(wrapperEl.querySelector(".flip-card") || ".flip-card", {
                rotationY: flipAngle,
                transformPerspective: 1200,
                transformOrigin:
                    layout === "left" ? "right center" : "left center",
                duration: 0.6,
                ease: "power2.out",
                delay: 1.5,
                onComplete: () => {
                    gsap.to(
                        wrapperEl?.querySelector(".flip-card") || ".flip-card",
                        {
                            rotationY: 0,
                            duration: 0.8,
                            ease: "elastic.out(1, 0.5)",
                        },
                    );
                },
            });
        }

        hintTimer = setTimeout(() => {
            hintVisible = false;
        }, 6000);
    });

    onDestroy(() => {
        if (hintTimer) clearTimeout(hintTimer);
        if (observer) observer.disconnect();
    });
</script>

<!-- CHANGED: wrapperEl pointer-events removed. We manage pointer events strictly on the children now -->
<div
    bind:this={wrapperEl}
    class="relative w-full h-[100dvh] overflow-hidden z-20"
>
    <div class="hidden lg:block w-full h-[100dvh]">
        <!-- svelte-ignore slot_element_deprecated -->
        <slot name="content-pc" />
    </div>

    <!-- CHANGED: onwheel={handleWheel} removed from here to prevent Svelte passive listener conflicts -->
    <!-- HIDDEN FROM CRAWLERS: aria-hidden="true" completely stops SEO from reading this block twice! -->
    <div class="lg:hidden w-full h-[100dvh] relative" aria-hidden="true">
        <div
            bind:this={carouselEl}
            use:carouselTouch
            data-carousel-touch-zone="true"
            onscroll={onScroll}
            class="hide-scroll flex w-full h-full overflow-x-auto snap-x snap-mandatory pointer-events-auto"
            style="scroll-behavior: smooth;"
        >
            {#if layout === "left"}
                <div
                    class="w-full h-full shrink-0 snap-center relative pointer-events-none flex flex-col justify-end pb-28"
                >
                    <div class="mx-4 w-auto pointer-events-auto relative">
                        <div
                            class="flip-card relative overflow-hidden rounded-3xl p-6 bg-[hsl(var(--glass-bg))] backdrop-blur-[var(--glass-blur)] border border-[hsl(var(--glass-border))] border-t-[hsl(var(--glass-highlight))] shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
                        >
                            <div
                                class="absolute top-0 right-0 w-32 h-32 blur-[40px] opacity-20 dark:mix-blend-screen pointer-events-none"
                                style="background: radial-gradient(circle, {accentColor} 0%, transparent 70%);"
                            ></div>
                            <div class="relative z-10">
                                <div class="flex items-center gap-2 mb-2">
                                    <div
                                        class="w-1.5 h-1.5 rounded-full animate-pulse shadow-[0_0_8px_currentColor]"
                                        style="background-color: {accentColor}; color: {accentColor};"
                                    ></div>
                                    <span
                                        class="text-[9px] font-mono uppercase tracking-[0.2em] font-bold text-muted-foreground"
                                        >Interactive</span
                                    >
                                </div>
                                <div
                                    class="text-3xl font-black text-foreground tracking-tighter leading-tight drop-shadow-sm font-heading"
                                >
                                    {sectionTitle}
                                </div>
                                <p
                                    class="text-[13px] font-light text-muted-foreground mt-1 mb-5"
                                >
                                    {sectionDescription}
                                </p>
                                <button
                                    type="button"
                                    onclick={() => goToSlide(1)}
                                    class="w-full mt-2 flex flex-col items-center justify-center cursor-pointer group hover:bg-transparent bg-transparent border-none outline-none"
                                >
                                    <span
                                        class="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground mb-2 transition-colors group-hover:text-foreground"
                                        >Swipe to turn page</span
                                    >
                                    <div
                                        class="relative w-16 h-8 flex items-center justify-center overflow-hidden rounded-full bg-muted border border-border shadow-sm"
                                    >
                                        <div
                                            class="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-foreground/20 to-transparent swipe-track-left"
                                        ></div>
                                        <ChevronRight
                                            size={18}
                                            class="text-muted-foreground group-hover:text-foreground relative z-10 animate-pulse-fast"
                                        />
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- CHANGED: Applied use:isolateTouch here, and added touch-pan-y to restore native scroll -->
                <div
                    use:contentTouchBoundary
                    data-carousel-scroller="true"
                    onwheel={handleWheel}
                    class="w-full h-full shrink-0 snap-center relative z-20 pointer-events-auto overflow-y-auto overscroll-y-contain touch-pan-y hide-scroll"
                >
                    <div class="min-h-[101%] pb-32">
                        <!-- svelte-ignore slot_element_deprecated -->
                        <slot name="content-mobile" />
                    </div>
                </div>
            {:else}
                <!-- CHANGED: Applied use:isolateTouch here, and added touch-pan-y to restore native scroll -->
                <div
                    use:contentTouchBoundary
                    data-carousel-scroller="true"
                    onwheel={handleWheel}
                    class="w-full h-full shrink-0 snap-center relative z-20 pointer-events-auto overflow-y-auto overscroll-y-contain touch-pan-y hide-scroll"
                >
                    <div class="min-h-[101%] pb-32">
                        <!-- svelte-ignore slot_element_deprecated -->
                        <slot name="content-mobile" />
                    </div>
                </div>

                <div
                    class="w-full h-full shrink-0 snap-center relative pointer-events-none flex flex-col justify-end pb-28"
                >
                    <div class="mx-4 w-auto pointer-events-auto relative">
                        <div
                            class="flip-card relative overflow-hidden rounded-3xl p-6 bg-[hsl(var(--glass-bg))] backdrop-blur-[var(--glass-blur)] border border-[hsl(var(--glass-border))] border-t-[hsl(var(--glass-highlight))] shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
                        >
                            <div
                                class="absolute top-0 left-0 w-32 h-32 blur-[40px] opacity-20 dark:mix-blend-screen pointer-events-none"
                                style="background: radial-gradient(circle, {accentColor} 0%, transparent 70%);"
                            ></div>
                            <div class="relative z-10 text-right">
                                <div
                                    class="flex items-center justify-end gap-2 mb-2"
                                >
                                    <span
                                        class="text-[9px] font-mono uppercase tracking-[0.2em] font-bold text-muted-foreground"
                                        >Interactive</span
                                    >
                                    <div
                                        class="w-1.5 h-1.5 rounded-full animate-pulse shadow-[0_0_8px_currentColor]"
                                        style="background-color: {accentColor}; color: {accentColor};"
                                    ></div>
                                </div>
                                <div
                                    class="text-3xl font-black text-foreground tracking-tighter leading-tight drop-shadow-sm font-heading"
                                >
                                    {sectionTitle}
                                </div>
                                <p
                                    class="text-[13px] font-light text-muted-foreground mt-1 mb-5"
                                >
                                    {sectionDescription}
                                </p>
                                <button
                                    type="button"
                                    onclick={() => goToSlide(0)}
                                    class="w-full mt-2 flex flex-col items-center justify-center cursor-pointer group hover:bg-transparent bg-transparent border-none outline-none"
                                >
                                    <span
                                        class="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground mb-2 transition-colors group-hover:text-foreground"
                                        >Swipe to turn page</span
                                    >
                                    <div
                                        class="relative w-16 h-8 flex items-center justify-center overflow-hidden rounded-full bg-foreground/5 border border-foreground/10 shadow-[inset_0_1px_4px_rgba(0,0,0,0.5)]"
                                    >
                                        <div
                                            class="absolute inset-0 w-[200%] h-full bg-gradient-to-l from-transparent via-foreground/20 to-transparent swipe-track-right"
                                        ></div>
                                        <ChevronLeft
                                            size={18}
                                            class="text-foreground/80 group-hover:text-foreground relative z-10 animate-pulse-fast"
                                        />
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            {/if}
        </div>

        <!-- Pagination Indicator & Section Navigation (UNCHANGED) -->
        <div
            class="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 pointer-events-auto w-[90vw] max-w-[380px]"
        >
            <div
                class="relative flex items-center p-1.5 rounded-2xl bg-card border border-border shadow-lg gap-1"
            >
                <div class="relative flex items-center flex-1 min-w-0">
                    <div
                        class="absolute top-0 bottom-0 w-1/2 bg-muted rounded-xl transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-sm"
                        style="transform: translateX({activeSlide === 0
                            ? '0'
                            : '100%'});"
                    ></div>
                    <button
                        type="button"
                        onclick={() => goToSlide(0)}
                        class="relative z-10 flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl transition-colors duration-300 {activeSlide ===
                        0
                            ? 'text-foreground font-bold'
                            : 'text-muted-foreground'}"
                    >
                        {#if layout === "left"}
                            <Eye
                                size={16}
                                class={activeSlide === 0
                                    ? "drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                                    : ""}
                            />
                            <span
                                class="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-widest truncate"
                                >3D Model</span
                            >
                        {:else}
                            <FileText
                                size={16}
                                class={activeSlide === 0
                                    ? "drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                                    : ""}
                            />
                            <span
                                class="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-widest truncate"
                                >Specs</span
                            >
                        {/if}
                    </button>
                    <button
                        type="button"
                        onclick={() => goToSlide(1)}
                        class="relative z-10 flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl transition-colors duration-300 {activeSlide ===
                        1
                            ? 'text-foreground font-bold'
                            : 'text-muted-foreground'}"
                    >
                        {#if layout === "left"}
                            <FileText
                                size={16}
                                class={activeSlide === 1
                                    ? "drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                                    : ""}
                            />
                            <span
                                class="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-widest truncate"
                                >Specs</span
                            >
                        {:else}
                            <Eye
                                size={16}
                                class={activeSlide === 1
                                    ? "drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                                    : ""}
                            />
                            <span
                                class="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-widest truncate"
                                >3D Model</span
                            >
                        {/if}
                    </button>
                </div>
                <div class="w-px h-8 bg-border/50 mx-1 shrink-0"></div>
                <div class="flex items-center gap-1 shrink-0">
                    <button
                        type="button"
                        onclick={() => scrollDirection.set(-1)}
                        aria-label="Previous Section"
                        class="w-10 h-10 rounded-xl flex items-center justify-center bg-transparent hover:bg-muted text-foreground transition-colors active:scale-95"
                    >
                        <ChevronUp size={20} />
                    </button>
                    <button
                        type="button"
                        onclick={() => scrollDirection.set(1)}
                        aria-label="Next Section"
                        class="w-10 h-10 rounded-xl flex items-center justify-center bg-transparent hover:bg-muted text-foreground transition-colors active:scale-95"
                    >
                        <ChevronDown size={20} />
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .hide-scroll {
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
        overscroll-behavior-x: none; /* Prevent horizontal bounce/pull-to-refresh */
        overscroll-behavior-y: contain; /* Prevent vertical bleeding into parent */
    }
    .hide-scroll::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera */
    }
    .flip-card {
        will-change: transform;
    }

    /* Native CSS Swipe Hints that will not interfere with scroll-snap */
    .swipe-track-left {
        transform: translateX(-100%);
        animation: swipeLightLeft 2.5s infinite ease-in-out;
    }
    .swipe-track-right {
        transform: translateX(50%);
        animation: swipeLightRight 2.5s infinite ease-in-out;
    }
    @keyframes swipeLightLeft {
        0% {
            transform: translateX(-100%);
        }
        100% {
            transform: translateX(50%);
        }
    }
    @keyframes swipeLightRight {
        0% {
            transform: translateX(50%);
        }
        100% {
            transform: translateX(-100%);
        }
    }
</style>
