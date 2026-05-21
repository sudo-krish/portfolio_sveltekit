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

    // CRITICAL FIX: We must reset the store to 0 so consecutive swipes don't get ignored!
    function triggerSectionChange(dir: number) {
        scrollDirection.set(dir);
        setTimeout(() => {
            scrollDirection.set(0);
        }, 100);
    }

    /**
     * Svelte Action applied to BOTH slides.
     * It strictly listens to boundaries without blocking native scroll.
     */
    function swipeSection(node: HTMLElement, is3D: boolean) {
        let startY = 0,
            startX = 0;

        function onStart(e: TouchEvent) {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }

        function onEnd(e: TouchEvent) {
            const dx = e.changedTouches[0].clientX - startX;
            const dy = startY - e.changedTouches[0].clientY; // Positive = Swiped UP

            if (Math.abs(dx) > Math.abs(dy)) return; // Ignore horizontal swipes

            if (Math.abs(dy) > 50) {
                if (is3D) {
                    triggerSectionChange(dy > 0 ? 1 : -1);
                } else {
                    const atTop = node.scrollTop <= 2;
                    const maxScroll = node.scrollHeight - node.clientHeight;
                    const atBottom = node.scrollTop >= maxScroll - 2;

                    if (atTop && dy < -50) triggerSectionChange(-1);
                    else if (atBottom && dy > 50) triggerSectionChange(1);
                }
            }
        }

        function onWheel(e: WheelEvent) {
            if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

            if (is3D) {
                if (Math.abs(e.deltaY) > 10)
                    triggerSectionChange(e.deltaY > 0 ? 1 : -1);
            } else {
                const atTop = node.scrollTop <= 2;
                const maxScroll = node.scrollHeight - node.clientHeight;
                const atBottom = node.scrollTop >= maxScroll - 2;

                if (atTop && e.deltaY < -10) triggerSectionChange(-1);
                else if (atBottom && e.deltaY > 10) triggerSectionChange(1);
            }
        }

        function onNativeScroll() {
            if (is3D) return;
            const maxScroll = node.scrollHeight - node.clientHeight;

            // Detect mobile rubber-band overscroll
            if (node.scrollTop < -30) triggerSectionChange(-1);
            else if (node.scrollTop > maxScroll + 30 && maxScroll > 0)
                triggerSectionChange(1);
        }

        // All passive: true guarantees 100% native scrolling isn't blocked
        node.addEventListener("touchstart", onStart, { passive: true });
        node.addEventListener("touchend", onEnd, { passive: true });
        node.addEventListener("wheel", onWheel, { passive: true });
        node.addEventListener("scroll", onNativeScroll, { passive: true });

        return {
            destroy() {
                node.removeEventListener("touchstart", onStart);
                node.removeEventListener("touchend", onEnd);
                node.removeEventListener("wheel", onWheel);
                node.removeEventListener("scroll", onNativeScroll);
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
        
        // Reset the global store so the 3D model returns to the center
        carouselSwipeFraction.set(0);
    }

    function onScroll() {
        if (!carouselEl) return;

        const slideWidth = carouselEl.clientWidth;
        const scrollPos = carouselEl.scrollLeft;

        const newSlide = Math.round(scrollPos / slideWidth);
        if (newSlide !== activeSlide) {
            activeSlide = newSlide;
            if (hintVisible) hintVisible = false;
        }

        if (!isCurrentlyVisible) return;

        let scrollPercentage = scrollPos / slideWidth;
        scrollPercentage = Math.max(0, Math.min(scrollPercentage, 1));

        const SWIPE_OFFSET = 10;
        const actual3DOffset =
            layout === "left"
                ? -(scrollPercentage * SWIPE_OFFSET)
                : (1 - scrollPercentage) * SWIPE_OFFSET;

        carouselSwipeFraction.set(actual3DOffset);
    }

    let hintTimer: ReturnType<typeof setTimeout>;

    onMount(() => {
        requestAnimationFrame(() => resetTo3D());

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

        hintTimer = setTimeout(() => (hintVisible = false), 6000);
    });

    onDestroy(() => {
        if (hintTimer) clearTimeout(hintTimer);
        if (observer) observer.disconnect();
    });
</script>

<div
    bind:this={wrapperEl}
    class="relative w-full h-[100dvh] overflow-hidden z-20"
>
    <div class="hidden lg:block w-full h-[100dvh]">
        <!-- svelte-ignore slot_element_deprecated -->
        <slot name="content-pc" />
    </div>

    <div class="lg:hidden w-full h-[100dvh] relative">
        <div
            bind:this={carouselEl}
            onscroll={onScroll}
            class="hide-scroll flex w-full h-[100dvh] overflow-x-auto snap-x snap-mandatory pointer-events-auto"
            style="scroll-behavior: smooth;"
        >
            {#if layout === "left"}
                <!-- 3D SLIDE -->
                <div
                    use:swipeSection={true}
                    class="flex-none w-full h-full snap-center relative pointer-events-none flex flex-col justify-end pb-28"
                >
                    <div class="mx-4 w-auto pointer-events-auto relative">
                        <div
                            class="flip-card relative overflow-hidden rounded-3xl p-6 bg-[hsl(var(--glass-bg))] backdrop-blur-[var(--glass-blur)] border border-[hsl(var(--glass-border))] border-t-[hsl(var(--glass-highlight))] shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
                        >
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
                                    aria-label="View specifications"
                                    class="w-full mt-2 flex flex-col items-center justify-center cursor-pointer group hover:bg-transparent bg-transparent border-none outline-none p-2"
                                >
                                    <span
                                        class="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground mb-2 transition-colors group-hover:text-foreground"
                                        >Swipe to turn page</span
                                    >
                                    <div
                                        class="relative w-20 h-10 flex items-center justify-center overflow-hidden rounded-full bg-muted border border-border shadow-sm"
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

                <!-- SPECS SLIDE: flex-none ensures Flexbox strictly calculates its height boundaries -->
                <div
                    use:swipeSection={false}
                    class="flex-none w-full h-full snap-center relative z-20 pointer-events-auto overflow-y-auto overscroll-y-contain block"
                >
                    <!-- Ensure internal content is tall enough to register bounds -->
                    <div class="min-h-[101%] pb-32">
                        <!-- svelte-ignore slot_element_deprecated -->
                        <slot name="content-mobile" />
                    </div>
                </div>
            {:else}
                <!-- SPECS SLIDE -->
                <div
                    use:swipeSection={false}
                    class="flex-none w-full h-full snap-center relative z-20 pointer-events-auto overflow-y-auto overscroll-y-contain block"
                >
                    <div class="min-h-[101%] pb-32">
                        <!-- svelte-ignore slot_element_deprecated -->
                        <slot name="content-mobile" />
                    </div>
                </div>

                <!-- 3D SLIDE -->
                <div
                    use:swipeSection={true}
                    class="flex-none w-full h-full snap-center relative pointer-events-none flex flex-col justify-end pb-28"
                >
                    <div class="mx-4 w-auto pointer-events-auto relative">
                        <div
                            class="flip-card relative overflow-hidden rounded-3xl p-6 bg-[hsl(var(--glass-bg))] backdrop-blur-[var(--glass-blur)] border border-[hsl(var(--glass-border))] border-t-[hsl(var(--glass-highlight))] shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
                        >
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
                                    aria-label="View 3D model"
                                    class="w-full mt-2 flex flex-col items-center justify-center cursor-pointer group hover:bg-transparent bg-transparent border-none outline-none p-2"
                                >
                                    <span
                                        class="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground mb-2 transition-colors group-hover:text-foreground"
                                        >Swipe to turn page</span
                                    >
                                    <div
                                        class="relative w-20 h-10 flex items-center justify-center overflow-hidden rounded-full bg-foreground/5 border border-foreground/10 shadow-[inset_0_1px_4px_rgba(0,0,0,0.5)]"
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

        <!-- Pagination Indicator -->
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
                        {#if layout === "left"}<Eye
                                size={16}
                                class={activeSlide === 0
                                    ? "drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                                    : ""}
                            /><span
                                class="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-widest truncate"
                                >3D Model</span
                            >
                        {:else}<FileText
                                size={16}
                                class={activeSlide === 0
                                    ? "drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                                    : ""}
                            /><span
                                class="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-widest truncate"
                                >Specs</span
                            >{/if}
                    </button>
                    <button
                        type="button"
                        onclick={() => goToSlide(1)}
                        class="relative z-10 flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl transition-colors duration-300 {activeSlide ===
                        1
                            ? 'text-foreground font-bold'
                            : 'text-muted-foreground'}"
                    >
                        {#if layout === "left"}<FileText
                                size={16}
                                class={activeSlide === 1
                                    ? "drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                                    : ""}
                            /><span
                                class="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-widest truncate"
                                >Specs</span
                            >
                        {:else}<Eye
                                size={16}
                                class={activeSlide === 1
                                    ? "drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                                    : ""}
                            /><span
                                class="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-widest truncate"
                                >3D Model</span
                            >{/if}
                    </button>
                </div>
                <div class="w-px h-8 bg-border/50 mx-1 shrink-0"></div>
                <div class="flex items-center gap-1 shrink-0">
                    <button
                        type="button"
                        onclick={() => triggerSectionChange(-1)}
                        aria-label="Previous Section"
                        class="w-10 h-10 rounded-xl flex items-center justify-center bg-transparent hover:bg-muted text-foreground transition-colors active:scale-95"
                        ><ChevronUp size={20} /></button
                    >
                    <button
                        type="button"
                        onclick={() => triggerSectionChange(1)}
                        aria-label="Next Section"
                        class="w-10 h-10 rounded-xl flex items-center justify-center bg-transparent hover:bg-muted text-foreground transition-colors active:scale-95"
                        ><ChevronDown size={20} /></button
                    >
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
    .flip-card {
        will-change: transform;
    }
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
