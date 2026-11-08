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
    let loopItems = $derived([...items, ...items, ...items, ...items]);

    let trackElement: HTMLDivElement;
    let containerElement: HTMLDivElement;

    let position = 0;
    let isDragging = false;
    let isHovered = false;
    let startX = 0;
    let animationFrameId: number;

    function loop() {
        if (!trackElement) {
            animationFrameId = requestAnimationFrame(loop);
            return;
        }

        // If not dragging and not hovered, auto-scroll
        if (!isDragging && !isHovered) {
            const currentSpeed = direction === "left" ? baseSpeed : -baseSpeed;
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
                } catch {
                    // ignore
                }
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
        } catch (err) {
            // ignore
        }
    }

    onMount(() => {
        animationFrameId = requestAnimationFrame(loop);
    });

    onDestroy(() => {
        if (typeof cancelAnimationFrame !== "undefined" && animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
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
    class="relative flex w-full overflow-hidden mask-fade-edges py-3 cursor-grab active:cursor-grabbing focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
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
        class="flex w-max shrink-0 gap-4 will-change-transform"
    >
        {#each loopItems as tag}
            <div
                class="group relative flex flex-col items-center justify-center gap-2.5 w-[88px] h-[100px] sm:w-24 sm:h-28
                       bg-card/85 backdrop-blur-xl border border-border/80 rounded-xl
                       transition-colors duration-300 hover:bg-accent/50 hover:border-primary/45
                       select-none shadow-[var(--shadow-sm)]"
            >
                <!-- Inner High-Contrast Archival Pedestal (consistent in Dark & Light mode so dark SVG logos never vanish) -->
                <div
                    class="relative flex items-center justify-center w-[50px] h-[50px] rounded-lg
                           bg-white/95 border border-border/70 shadow-xs
                           transition-transform duration-300 group-hover:scale-105"
                >
                    <img
                        src={tag.iconUrl}
                        alt="{tag.name} Data Engineering Architecture Tool"
                        class="relative w-7 h-7 object-contain transition-transform duration-300 group-hover:scale-105 pointer-events-none"
                        loading="lazy"
                        draggable="false"
                        width="28"
                        height="28"
                    />
                </div>

                <!-- Text Label -->
                <span
                    class="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground group-hover:text-foreground transition-colors duration-300 pointer-events-none"
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
