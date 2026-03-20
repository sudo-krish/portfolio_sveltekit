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
        if (!trackElement) {
            animationFrameId = requestAnimationFrame(loop);
            return;
        }

        // If not dragging and not hovered, auto-scroll
        if (!isDragging && !isHovered) {
            currentSpeed = direction === "left" ? baseSpeed : -baseSpeed;
            position -= currentSpeed;
        }

        // The exact width of one full set of items (we divide by 4 since we quadrupled the array)
        const totalScrollWidth = trackElement.scrollWidth / 4;

        // Infinite Loop Logic
        if (totalScrollWidth > 0) {
            if (position <= -totalScrollWidth) {
                position += totalScrollWidth; // Reset seamlessly without jumping
            } else if (position > 0) {
                position -= totalScrollWidth;
            }
        }

        trackElement.style.transform = `translate3d(${position}px, 0, 0)`;
        animationFrameId = requestAnimationFrame(loop);
    }

    // --- Drag Handlers ---
    // We delay pointer capture until we've confirmed the gesture is horizontal.
    // If the initial movement is primarily vertical, we bail out entirely so the
    // browser's native page scroll (or carousel swipe) isn't blocked.
    let pointerDown = false;
    let startY = 0;
    let axisLocked: "none" | "horizontal" | "vertical" = "none";

    function onPointerDown(e: PointerEvent) {
        pointerDown = true;
        startX = e.clientX;
        startY = e.clientY;
        axisLocked = "none";
    }

    function onPointerMove(e: PointerEvent) {
        if (!pointerDown) return;

        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        // First significant movement decides the axis lock
        if (axisLocked === "none") {
            const absX = Math.abs(e.clientX - startX);  // total from origin, not delta
            const absY = Math.abs(e.clientY - startY);
            const totalMove = absX + absY;

            if (totalMove >= 5) {
                axisLocked = absX >= absY ? "horizontal" : "vertical";
            }
        }

        // Vertical gesture — bail out, let the page scroll
        if (axisLocked === "vertical") {
            pointerDown = false;
            return;
        }

        // Horizontal gesture — capture and drag the marquee
        if (axisLocked === "horizontal") {
            if (!isDragging) {
                isDragging = true;
                trackElement.style.cursor = "grabbing";
                try {
                    containerElement.setPointerCapture(e.pointerId);
                } catch {}
            }

            if (e.cancelable) e.preventDefault();
            e.stopPropagation();
            position += deltaX;
        }

        startX = e.clientX;
        startY = e.clientY;
    }

    function onPointerUp(e: PointerEvent) {
        pointerDown = false;
        isDragging = false;
        axisLocked = "none";
        trackElement.style.cursor = "grab";
        try {
            if (containerElement.hasPointerCapture(e.pointerId)) {
                containerElement.releasePointerCapture(e.pointerId);
            }
        } catch (err) {}
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
    style="touch-action: pan-y;"
    class="relative flex w-full overflow-hidden mask-fade-edges py-20 cursor-grab active:cursor-grabbing focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
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
                       bg-card/60 backdrop-blur-2xl border border-foreground/10 rounded-2xl
                       transition-colors duration-300 hover:bg-foreground/[0.08] hover:border-foreground/20
                       select-none shadow-[0_8px_24px_rgba(0,0,0,0.4),0_24px_64px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.1)]"
            >
                <!-- Inner High-Contrast Pedestal -->
                <!-- We use a nearly solid white/silver background so dark-green logos NEVER get lost -->
                <div
                    class="relative flex items-center justify-center w-[52px] h-[52px] rounded-xl
                           bg-foreground/90 border border-foreground/40 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),0_4px_12px_rgba(0,0,0,0.4)]
                           transition-transform duration-300 group-hover:scale-105"
                >
                    <!-- Small subtle reflection on the top of the pedestal -->
                    <div
                        class="absolute inset-x-1 top-1 h-2 bg-gradient-to-b from-foreground to-transparent rounded-t-lg opacity-80 pointer-events-none"
                    ></div>

                    <img
                        src={tag.iconUrl}
                        alt=""
                        aria-hidden="true"
                        class="relative w-8 h-8 object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-110 pointer-events-none"
                        loading="lazy"
                        draggable="false"
                        width="32"
                        height="32"
                    />
                </div>

                <!-- Text Label -->
                <span
                    class="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground group-hover:text-foreground transition-colors duration-300 pointer-events-none"
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
