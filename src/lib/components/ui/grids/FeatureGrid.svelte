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
            class="group flex items-center"
            style="gap: max(0.5rem, 0.7cqi);"
        >
            <!-- Icon -->
            <div
                class="shrink-0 flex items-center justify-center
                       rounded-lg bg-foreground/[0.03] border border-foreground/[0.05]
                       shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]
                       opacity-75 group-hover:opacity-100
                       group-hover:scale-105
                       transition-all duration-500"
                style="width: max(1.6rem, 1.8cqi); height: max(1.6rem, 1.8cqi);"
            >
                <img
                    src={node.iconUrl}
                    alt={node.name}
                    class="w-[60%] h-[60%] object-contain"
                    loading="lazy"
                />
            </div>

            <!-- Text -->
            <div class="flex flex-col relative z-10">
                <span
                    class="font-bold text-foreground/85 {textHoverClass} transition-colors duration-400"
                    style="font-size: clamp(0.72rem, 1cqi, 0.85rem);"
                >
                    {node.name}
                </span>
                <span
                    class="uppercase tracking-widest font-mono text-muted-foreground/60"
                    style="font-size: clamp(8px, 0.65cqi, 10px);"
                >
                    {node.desc}
                </span>
            </div>
        </GlassCard>
    {/each}
</div>
