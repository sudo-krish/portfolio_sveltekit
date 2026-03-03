<!-- src/lib/components/ui/MobileCarousel.svelte -->
<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { ChevronLeft, ChevronRight, Eye, FileText } from "lucide-svelte";
    import { carouselSwipeFraction } from "$lib/stores/carousel-store";
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

    function goToSlide(index: number) {
        if (!carouselEl) return;
        const slideWidth = carouselEl.clientWidth;
        carouselEl.scrollTo({ left: slideWidth * index, behavior: "smooth" });
    }

    function resetTo3D() {
        if (!carouselEl) return;

        // Use instant scroll behavior for initialization to prevent GSAP/CSS conflicts
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
        // Delay initialization by 1 frame to let Svelte mount the DOM properly
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

        // GSAP is ONLY used for 3D card flipping now. No more scrollLeft animation conflicts!
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

<div
    bind:this={wrapperEl}
    class="relative w-full h-[100dvh] overflow-hidden z-20 pointer-events-none"
>
    <div class="hidden lg:block w-full h-[100dvh]">
        <!-- svelte-ignore slot_element_deprecated -->
        <slot name="content-pc" />
    </div>

    <div class="lg:hidden w-full h-[100dvh] relative">
        <!-- FIXED: Pure CSS Snap scrolling. No GSAP interference. -->
        <div
            bind:this={carouselEl}
            onscroll={onScroll}
            class="hide-scroll flex w-full h-full overflow-x-auto snap-x snap-mandatory pointer-events-auto touch-pan-y"
            style="scroll-behavior: smooth;"
        >
            {#if layout === "left"}
                <div
                    class="w-full h-full shrink-0 snap-center relative pointer-events-none flex flex-col justify-end pb-[14vh]"
                >
                    <div class="mx-4 w-auto pointer-events-auto relative">
                        <div
                            class="flip-card relative overflow-hidden rounded-3xl p-6 bg-[hsl(var(--glass-bg))] backdrop-blur-[var(--glass-blur)] border border-[hsl(var(--glass-border))] border-t-[hsl(var(--glass-highlight))] shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
                        >
                            <div
                                class="absolute top-0 right-0 w-32 h-32 blur-[40px] opacity-20 mix-blend-screen pointer-events-none"
                                style="background: radial-gradient(circle, {accentColor} 0%, transparent 70%);"
                            ></div>
                            <div class="relative z-10">
                                <div class="flex items-center gap-2 mb-2">
                                    <div
                                        class="w-1.5 h-1.5 rounded-full animate-pulse shadow-[0_0_8px_currentColor]"
                                        style="background-color: {accentColor}; color: {accentColor};"
                                    ></div>
                                    <span
                                        class="text-[9px] font-mono uppercase tracking-[0.2em] font-bold text-white/70"
                                        >Interactive</span
                                    >
                                </div>
                                <h4
                                    class="text-3xl font-black text-white tracking-tighter leading-tight drop-shadow-md"
                                >
                                    {sectionTitle}
                                </h4>
                                <p
                                    class="text-[13px] font-light text-white/70 mt-1 mb-5"
                                >
                                    {sectionDescription}
                                </p>
                                <button
                                    type="button"
                                    onclick={() => goToSlide(1)}
                                    class="w-full mt-2 flex flex-col items-center justify-center cursor-pointer group hover:bg-transparent bg-transparent border-none outline-none"
                                >
                                    <span
                                        class="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-white/50 mb-2 transition-colors group-hover:text-white"
                                        >Swipe to turn page</span
                                    >
                                    <div
                                        class="relative w-16 h-8 flex items-center justify-center overflow-hidden rounded-full bg-white/5 border border-white/10 shadow-[inset_0_1px_4px_rgba(0,0,0,0.5)]"
                                    >
                                        <div
                                            class="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent swipe-track-left"
                                        ></div>
                                        <ChevronRight
                                            size={18}
                                            class="text-white/80 group-hover:text-white relative z-10 animate-pulse-fast"
                                        />
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    class="w-full h-full shrink-0 snap-center relative z-20 pointer-events-auto"
                >
                    <!-- svelte-ignore slot_element_deprecated -->
                    <slot name="content-mobile" />
                </div>
            {:else}
                <div
                    class="w-full h-full shrink-0 snap-center relative z-20 pointer-events-auto"
                >
                    <!-- svelte-ignore slot_element_deprecated -->
                    <slot name="content-mobile" />
                </div>
                <div
                    class="w-full h-full shrink-0 snap-center relative pointer-events-none flex flex-col justify-end pb-[14vh]"
                >
                    <div class="mx-4 w-auto pointer-events-auto relative">
                        <div
                            class="flip-card relative overflow-hidden rounded-3xl p-6 bg-[hsl(var(--glass-bg))] backdrop-blur-[var(--glass-blur)] border border-[hsl(var(--glass-border))] border-t-[hsl(var(--glass-highlight))] shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
                        >
                            <div
                                class="absolute top-0 left-0 w-32 h-32 blur-[40px] opacity-20 mix-blend-screen pointer-events-none"
                                style="background: radial-gradient(circle, {accentColor} 0%, transparent 70%);"
                            ></div>
                            <div class="relative z-10 text-right">
                                <div
                                    class="flex items-center justify-end gap-2 mb-2"
                                >
                                    <span
                                        class="text-[9px] font-mono uppercase tracking-[0.2em] font-bold text-white/70"
                                        >Interactive</span
                                    >
                                    <div
                                        class="w-1.5 h-1.5 rounded-full animate-pulse shadow-[0_0_8px_currentColor]"
                                        style="background-color: {accentColor}; color: {accentColor};"
                                    ></div>
                                </div>
                                <h4
                                    class="text-3xl font-black text-white tracking-tighter leading-tight drop-shadow-md"
                                >
                                    {sectionTitle}
                                </h4>
                                <p
                                    class="text-[13px] font-light text-white/70 mt-1 mb-5"
                                >
                                    {sectionDescription}
                                </p>
                                <button
                                    type="button"
                                    onclick={() => goToSlide(0)}
                                    class="w-full mt-2 flex flex-col items-center justify-center cursor-pointer group hover:bg-transparent bg-transparent border-none outline-none"
                                >
                                    <span
                                        class="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-white/50 mb-2 transition-colors group-hover:text-white"
                                        >Swipe to turn page</span
                                    >
                                    <div
                                        class="relative w-16 h-8 flex items-center justify-center overflow-hidden rounded-full bg-white/5 border border-white/10 shadow-[inset_0_1px_4px_rgba(0,0,0,0.5)]"
                                    >
                                        <div
                                            class="absolute inset-0 w-[200%] h-full bg-gradient-to-l from-transparent via-white/20 to-transparent swipe-track-right"
                                        ></div>
                                        <ChevronLeft
                                            size={18}
                                            class="text-white/80 group-hover:text-white relative z-10 animate-pulse-fast"
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
            class="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 pointer-events-auto"
        >
            <div
                class="relative flex items-center p-1.5 rounded-2xl bg-black/60 backdrop-blur-2xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.15)]"
            >
                <div
                    class="absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white/15 rounded-xl transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
                    style="transform: translateX({activeSlide === 0
                        ? '0'
                        : '100%'}) translateX({activeSlide === 0
                        ? '0px'
                        : '6px'});"
                ></div>
                <button
                    type="button"
                    onclick={() => goToSlide(0)}
                    class="relative z-10 flex items-center justify-center gap-2 px-5 py-3 w-32 rounded-xl transition-colors duration-300 {activeSlide ===
                    0
                        ? 'text-white'
                        : 'text-white/50'}"
                >
                    {#if layout === "left"}<Eye
                            size={16}
                            class={activeSlide === 0
                                ? "drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                                : ""}
                        /><span
                            class="font-mono text-[11px] font-bold uppercase tracking-widest"
                            >3D Model</span
                        >{:else}<FileText
                            size={16}
                            class={activeSlide === 0
                                ? "drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                                : ""}
                        /><span
                            class="font-mono text-[11px] font-bold uppercase tracking-widest"
                            >Specs</span
                        >{/if}
                </button>
                <button
                    type="button"
                    onclick={() => goToSlide(1)}
                    class="relative z-10 flex items-center justify-center gap-2 px-5 py-3 w-32 rounded-xl transition-colors duration-300 {activeSlide ===
                    1
                        ? 'text-white'
                        : 'text-white/50'}"
                >
                    {#if layout === "left"}<FileText
                            size={16}
                            class={activeSlide === 1
                                ? "drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                                : ""}
                        /><span
                            class="font-mono text-[11px] font-bold uppercase tracking-widest"
                            >Specs</span
                        >{:else}<Eye
                            size={16}
                            class={activeSlide === 1
                                ? "drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                                : ""}
                        /><span
                            class="font-mono text-[11px] font-bold uppercase tracking-widest"
                            >3D Model</span
                        >{/if}
                </button>
            </div>
        </div>
    </div>
</div>

<style>
    .hide-scroll {
        -ms-overflow-style: none;
        scrollbar-width: none;
        overscroll-behavior-x: none;
    }
    .hide-scroll::-webkit-scrollbar {
        display: none;
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
    .animate-pulse-fast {
        animation: pulseFast 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
    @keyframes pulseFast {
        0%,
        100% {
            opacity: 1;
            transform: scale(1);
        }
        50% {
            opacity: 0.5;
            transform: scale(0.85);
        }
    }
</style>
