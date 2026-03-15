<!-- src/lib/components/home/credentials/desktop/PremiumMarquee.svelte -->
<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import {
        Database,
        Code2,
        BrainCircuit,
        Server,
        Briefcase,
        BookOpen,
        ScrollText,
        Award,
        Hexagon,
    } from "lucide-svelte";

    // Props
    export let title: string;
    export let items: any[] = [];
    export let onSelect: (item: any) => void;
    export let direction: "left" | "right" = "left";
    export let variant: "cert" | "paper" = "cert"; // Distinct styling for each type
    export let icon: any; // Keep prop for backward compatibility, but we will mostly override it
    export let baseSpeed: number = 0.5;

    function getIcon(id: string) {
        if (!id) return icon;

        if (variant === "paper") {
            if (id.includes("scara")) return BrainCircuit;
            if (id.includes("emissions")) return ScrollText;
            return BookOpen;
        }

        switch (id) {
            case "databricks-lakehouse":
                return Hexagon;
            case "pyspark-bigdata":
            case "apache-spark-3":
                return Server;
            case "ibm-hadoop-101":
            case "aws-redshift":
            case "sql-mysql":
                return Database;
            case "python-bible":
                return Code2;
            case "pm-course":
                return Briefcase;
            default:
                return icon || Award;
        }
    }

    // Quadruple items to ensure we always have enough off-screen to loop safely
    const loopItems = [...items, ...items, ...items, ...items];

    let trackElement: HTMLDivElement;
    let containerElement: HTMLDivElement;

    let position = 0;
    let isDragging = false;
    let isHovered = false;
    let startX = 0;
    let dragDistance = 0; // NEW: Track total movement to distinguish click vs drag
    let currentSpeed = baseSpeed;
    let animationFrameId: number;

    function loop() {
        if (!trackElement) {
            animationFrameId = requestAnimationFrame(loop);
            return;
        }

        // Auto-scroll logic
        if (!isDragging && !isHovered) {
            currentSpeed = direction === "left" ? baseSpeed : -baseSpeed;
            position -= currentSpeed;
        }

        // The exact width of one full set of items
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
    function onPointerDown(e: PointerEvent) {
        isDragging = true;
        startX = e.clientX;
        dragDistance = 0; // Reset on down
        trackElement.style.cursor = "grabbing";
        containerElement.setPointerCapture(e.pointerId);
    }

    function onPointerMove(e: PointerEvent) {
        if (!isDragging) return;

        // Vigorously prevent default and stop propagation during an active drag
        if (e.cancelable) e.preventDefault();
        e.stopPropagation();

        const deltaX = e.clientX - startX;
        dragDistance += Math.abs(deltaX); // Accumulate movement
        position += deltaX;
        startX = e.clientX;
    }

    function onPointerUp(e: PointerEvent) {
        isDragging = false;
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

<div class="relative flex flex-col w-full" style="margin-bottom: 1.2cqi;">
    <!-- Minimalist Header -->
    <div class="flex items-center" style="gap: 0.4cqi; padding: 0 0.4cqi; margin-bottom: 0.4cqi;">
        <div
            class="w-1.5 h-1.5 rounded-full {variant === 'cert'
                ? 'bg-orange-500'
                : 'bg-emerald-500'} animate-pulse"
        ></div>
        <h4
            class="font-mono uppercase tracking-[0.25em] text-foreground/40 font-bold"
            style="font-size: clamp(7px, 0.6cqi, 10px);"
        >
            {title}
        </h4>
    </div>

    <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
    <div
        bind:this={containerElement}
        role="region"
        aria-roledescription="marquee"
        aria-label="{title} Marquee"
        style="touch-action: pan-y; overscroll-behavior-x: none; user-select: none; -webkit-user-select: none;"
        class="relative flex w-full overflow-hidden mask-fade-edges py-2 cursor-grab active:cursor-grabbing focus:outline-none"
        onpointerdown={onPointerDown}
        onpointermove={onPointerMove}
        onpointerup={onPointerUp}
        onpointerleave={onPointerUp}
        onmouseenter={() => (isHovered = true)}
        onmouseleave={() => (isHovered = false)}
        onfocus={() => (isHovered = true)}
        onblur={() => (isHovered = false)}
        onwheel={(e) => {
            // Treat mouse wheel horizontal scrolling like dragging
            if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
                e.preventDefault();
                position -= e.deltaX;
            }
        }}
    >
        <!-- Marquee Track (Hardware-accelerated via JS translate3d) -->
        <div
            bind:this={trackElement}
            class="flex w-max shrink-0 will-change-transform" style="gap: 0.8cqi;"
        >
            {#each loopItems as item}
                <button
                    type="button"
                    onclick={(e) => {
                        // Only trigger select if we haven't dragged significantly
                        if (dragDistance < 5) {
                            onSelect(item);
                        } else {
                            e.preventDefault();
                        }
                    }}
                    class="relative overflow-hidden flex items-center rounded-2xl transition-all duration-300 w-max text-left shrink-0 group bg-foreground/[0.03] hover:bg-foreground/[0.06] shadow-[0_4px_12px_rgba(0,0,0,0.5)] border border-foreground/5"
                    style="gap: 1cqi; padding: 1cqi 2.5cqi 1cqi 1.2cqi; min-height: 5cqi; --hover-color: {item.color};"
                >
                    <!-- Hover Border Glow -->
                    <div
                        class="absolute inset-0 border-2 border-transparent group-hover:border-[var(--hover-color)] opacity-0 group-hover:opacity-30 rounded-2xl transition-all duration-300 pointer-events-none"
                    ></div>

                    <!-- Subtle glow blob on hover inside the card -->
                    <div
                        class="absolute -right-10 -bottom-10 w-32 h-32 rounded-full blur-[40px] opacity-0 group-hover:opacity-15 transition-opacity duration-300 pointer-events-none"
                        style="background-color: {item.color};"
                    ></div>

                    <!-- Taller, Cleaner Icon Box -->
                    <div
                        class="w-14 h-14 shrink-0 flex items-center justify-center rounded-2xl transition-all duration-300 shadow-inner group-hover:scale-110"
                        style="background-color: {item.color}15; color: {item.color};"
                    >
                        <svelte:component this={getIcon(item.id)} size={24} />
                    </div>

                    <!-- Clean Typography -->
                    <div class="flex flex-col" style="max-width: 26cqi;">
                        <span
                            class="font-bold tracking-wide text-foreground/90 group-hover:text-foreground transition-colors duration-300 truncate"
                            style="font-size: clamp(10px, 0.9cqi, 15px);"
                        >
                            {item.name}
                        </span>
                        <div class="flex items-center" style="gap: 0.4cqi; margin-top: 0.3cqi;">
                            <span
                                class="font-mono text-foreground/50 group-hover:text-foreground/70 transition-colors duration-300 uppercase tracking-widest truncate"
                                style="font-size: clamp(8px, 0.7cqi, 11px);"
                            >
                                {item.issuer}
                            </span>
                            <span
                                class="w-1 h-1 rounded-full bg-foreground/20 shrink-0"
                            ></span>
                            <span
                                class="font-mono text-foreground/40 group-hover:text-foreground/60 transition-colors duration-300 whitespace-nowrap"
                                style="font-size: clamp(8px, 0.7cqi, 11px);"
                            >
                                {item.date}
                            </span>
                        </div>
                    </div>
                </button>
            {/each}
        </div>
    </div>
</div>

<style>
    /* CSS Mask for a perfect, native fade effect on the left/right edges without using absolute divs */
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
