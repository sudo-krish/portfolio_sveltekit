<!-- src/lib/components/ui/grids/FeatureGrid.svelte -->
<script lang="ts">
    import GlassCard from "$lib/components/ui/cards/GlassCard.svelte";

    export type GridItem = {
        name: string;
        desc: string;
        iconUrl: string;
    };

    let {
        items = [],
        gridClass = "grid-cols-2 lg:grid-cols-3",
        accent = "hsl(var(--primary))",
        textHoverClass = "group-hover:text-primary",
    } = $props<{
        items: GridItem[];
        gridClass?: string;
        /** CSS color for accent glow */
        accent?: string;
        textHoverClass?: string;
    }>();
</script>

<div
    class="w-full grid {gridClass} relative z-10"
    style="gap: max(0.6rem, 0.7cqi);"
>
    {#each items as node}
        <GlassCard
            variant="compact"
            {accent}
            class="group flex items-start sm:items-center"
            style="gap: max(0.55rem, 0.7cqi);"
        >
            <!-- Icon Pedestal -->
            <div
                class="shrink-0 flex items-center justify-center
                       rounded-lg bg-white/95 border border-border/80
                       shadow-2xs
                       transition-transform duration-300
                       group-hover:scale-105 mt-0.5 sm:mt-0"
                style="width: max(1.75rem, 1.9cqi); height: max(1.75rem, 1.9cqi);"
            >
                <img
                    src={node.iconUrl}
                    alt={node.name}
                    class="w-[62%] h-[62%] object-contain"
                    loading="lazy"
                />
            </div>

            <!-- Text (Wraps cleanly on mobile; never truncates) -->
            <div class="flex flex-col relative z-10 min-w-0">
                <span
                    class="font-heading font-bold text-foreground {textHoverClass} transition-colors duration-300 leading-tight break-words"
                    style="font-size: clamp(0.76rem, 0.98cqi, 0.88rem);"
                >
                    {node.name}
                </span>
                <span
                    class="uppercase tracking-wider font-mono text-muted-foreground leading-snug mt-0.5 break-words"
                    style="font-size: clamp(8.5px, 0.65cqi, 10px);"
                >
                    {node.desc}
                </span>
            </div>
        </GlassCard>
    {/each}
</div>
