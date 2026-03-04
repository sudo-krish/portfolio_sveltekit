<script lang="ts">
    import { onMount, onDestroy } from "svelte";

    type TechItem = {
        name: string;
        iconUrl: string;
    };

    let {
        items = [],
        baseSpeed = 0.5, // Pixels per frame
        direction = "left",
    } = $props<{
        items: TechItem[];
        baseSpeed?: number;
        direction?: "left" | "right";
    }>();

    // Quadruple items to ensure we always have enough off-screen to loop safely
    const loopItems = [...items, ...items, ...items, ...items];

    let trackElement: HTMLDivElement;
    let containerElement: HTMLDivElement;

    let position = 0;
    let isDragging = false;
    let isHovered = false;
    let startX = 0;
    let currentSpeed = baseSpeed;
    let animationFrameId: number;

    function loop() {
        if (!trackElement) return;

        // If not dragging and not hovered, auto-scroll
        if (!isDragging && !isHovered) {
            currentSpeed = direction === "left" ? baseSpeed : -baseSpeed;
            position -= currentSpeed;
        }

        // The exact width of one full set of items (we divide by 4 since we quadrupled the array)
        const totalScrollWidth = trackElement.scrollWidth / 4;

        // Infinite Loop Logic
        if (position <= -totalScrollWidth) {
            position += totalScrollWidth; // Reset seamlessly without jumping
        } else if (position > 0) {
            position -= totalScrollWidth;
        }

        trackElement.style.transform = `translate3d(${position}px, 0, 0)`;
        animationFrameId = requestAnimationFrame(loop);
    }

    // --- Drag Handlers ---
    function onPointerDown(e: PointerEvent) {
        isDragging = true;
        startX = e.clientX;
        trackElement.style.cursor = "grabbing";
        containerElement.setPointerCapture(e.pointerId);
    }

    function onPointerMove(e: PointerEvent) {
        if (!isDragging) return;
        const deltaX = e.clientX - startX;
        position += deltaX;
        startX = e.clientX; // Update startX for the next frame
    }

    function onPointerUp(e: PointerEvent) {
        isDragging = false;
        trackElement.style.cursor = "grab";
        containerElement.releasePointerCapture(e.pointerId);
    }

    onMount(() => {
        animationFrameId = requestAnimationFrame(loop);
    });

    onDestroy(() => {
        cancelAnimationFrame(animationFrameId);
    });
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div
    bind:this={containerElement}
    role="region"
    aria-roledescription="marquee"
    aria-label="Technology Marquee"
    tabindex="0"
    class="relative flex w-full overflow-hidden mask-fade-edges py-20 cursor-grab active:cursor-grabbing touch-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
    onpointerdown={onPointerDown}
    onpointermove={onPointerMove}
    onpointerup={onPointerUp}
    onpointerleave={onPointerUp}
    onmouseenter={() => (isHovered = true)}
    onmouseleave={() => (isHovered = false)}
    onfocus={() => (isHovered = true)}
    onblur={() => (isHovered = false)}
>
    <!-- Marquee Track (Now hardware-accelerated via JS translate3d) -->
    <div
        bind:this={trackElement}
        class="flex w-max shrink-0 gap-5 will-change-transform"
    >
        {#each loopItems as tag, i}
            <!-- 
               Redesigned Tech Card:
               Outer container uses heavy glass.
               Inner container uses solid high-contrast white. 
            -->
            <div
                class="group relative flex flex-col items-center justify-center gap-3 w-24 h-28
                       bg-black/20 backdrop-blur-2xl border border-white/10 rounded-2xl
                       transition-colors duration-300 hover:bg-white/[0.08] hover:border-white/20
                       select-none shadow-[0_8px_24px_rgba(0,0,0,0.4),0_24px_64px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.1)]"
            >
                <!-- Inner High-Contrast Pedestal -->
                <!-- We use a nearly solid white/silver background so dark-green logos NEVER get lost -->
                <div
                    class="relative flex items-center justify-center w-[52px] h-[52px] rounded-xl
                           bg-white/90 border border-white/40 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),0_4px_12px_rgba(0,0,0,0.4)]
                           transition-transform duration-300 group-hover:scale-105"
                >
                    <!-- Small subtle reflection on the top of the pedestal -->
                    <div
                        class="absolute inset-x-1 top-1 h-2 bg-gradient-to-b from-white to-transparent rounded-t-lg opacity-80 pointer-events-none"
                    ></div>

                    <img
                        src={tag.iconUrl}
                        alt={tag.name}
                        class="relative w-8 h-8 object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-110 pointer-events-none"
                        loading="lazy"
                        draggable="false"
                    />
                </div>

                <!-- Text Label -->
                <span
                    class="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 group-hover:text-white transition-colors duration-300 pointer-events-none"
                >
                    {tag.name}
                </span>
            </div>
        {/each}
    </div>
</div>

<style>
    /* CSS Mask for a perfect, native fade effect on the left/right edges */
    .mask-fade-edges {
        mask-image: linear-gradient(
            to right,
            transparent,
            black 10%,
            black 90%,
            transparent
        );
        -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            black 10%,
            black 90%,
            transparent
        );
    }
</style>
