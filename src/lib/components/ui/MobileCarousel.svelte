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

    // NEW: Action to completely isolate mobile touch scrolling
    // This stops the touch events from reaching Pages.svelte
    function isolateTouch(node: HTMLElement) {
        let touchStartY = 0;

        function handleTouch(e: TouchEvent) {
            // Track where the swipe started
            if (e.type === "touchstart") {
                touchStartY = e.touches[0].clientY;
            }

            // Get current Y position to determine scroll direction
            const touchY = e.touches[0]
                ? e.touches[0].clientY
                : e.changedTouches[0].clientY;
            const deltaY = touchStartY - touchY; // positive = scrolling down

            const atTop = node.scrollTop <= 0;
            const atBottom =
                Math.ceil(node.scrollTop + node.clientHeight) >=
                node.scrollHeight;

            // If they are trying to push past the boundary, DO NOT stop propagation.
            // This allows the event to bubble up to Pages.svelte to trigger the snap.
            if ((atTop && deltaY < 0) || (atBottom && deltaY > 0)) {
                return;
            }

            // Otherwise, they are scrolling normally. Stop propagation to isolate the text.
            e.stopPropagation();
        }

        node.addEventListener("touchstart", handleTouch, { passive: true });
        node.addEventListener("touchmove", handleTouch, { passive: true });
        node.addEventListener("touchend", handleTouch, { passive: true });

        return {
            destroy() {
                node.removeEventListener("touchstart", handleTouch);
                node.removeEventListener("touchmove", handleTouch);
                node.removeEventListener("touchend", handleTouch);
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
    <div class="lg:hidden w-full h-[100dvh] relative">
        <div
            bind:this={carouselEl}
            onscroll={onScroll}
            class="hide-scroll flex w-full h-full overflow-x-auto snap-x snap-mandatory pointer-events-auto touch-auto"
            style="scroll-behavior: smooth;"
        >
            {#if layout === "left"}
                <div
                    class="w-full h-full shrink-0 snap-center relative pointer-events-none flex flex-col justify-end pb-28"
                >
                    <div class="mx-4 w-auto pointer-events-auto relative">
                        <div
                            class="flip-card relative overflow-hidden rounded-3xl p-6 bg-[hsl(var(--glass-bg))] backdrop-blur-[var(--glass-blur)] border border-[hsl(var(--glass-border))] border-t-[hsl(var(--glass-highlight))] shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
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
                                <h4
                                    class="text-3xl font-black text-foreground tracking-tighter leading-tight drop-shadow-sm"
                                >
                                    {sectionTitle}
                                </h4>
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
                    use:isolateTouch
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
                    use:isolateTouch
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
                            class="flip-card relative overflow-hidden rounded-3xl p-6 bg-[hsl(var(--glass-bg))] backdrop-blur-[var(--glass-blur)] border border-[hsl(var(--glass-border))] border-t-[hsl(var(--glass-highlight))] shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
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
                                <h4
                                    class="text-3xl font-black text-foreground tracking-tighter leading-tight drop-shadow-sm"
                                >
                                    {sectionTitle}
                                </h4>
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
