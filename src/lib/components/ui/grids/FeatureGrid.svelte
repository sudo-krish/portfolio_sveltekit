<!-- src/lib/components/ui/grids/FeatureGrid.svelte -->
<script lang="ts">
    export type GridItem = {
        name: string;
        desc: string;
        iconUrl: string;
    };

    let {
        items = [],
        gridClass = "grid-cols-2 lg:grid-cols-3",
        cardClass = "bg-card/60 backdrop-blur-md border border-border hover:bg-card hover:border-neutral-500/30",
        glowClass = "bg-primary/20",
        textHoverClass = "group-hover:text-primary",
    } = $props<{
        items: GridItem[];
        gridClass?: string;
        cardClass?: string;
        glowClass?: string;
        textHoverClass?: string;
    }>();
</script>

<div class="w-full grid {gridClass} relative z-10" style="gap: max(0.75rem, 0.8cqi);">
    {#each items as node}
        <div
            class="group relative rounded-2xl {cardClass} transition-all duration-300 overflow-hidden flex items-center"
            style="padding: max(0.75rem, 0.8cqi); gap: max(0.5rem, 0.8cqi);"
        >
            <div
                class="absolute -right-4 -top-4 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity {glowClass}"
                style="width: max(2rem, 3cqi); height: max(2rem, 3cqi);"
            ></div>

            <div
                class="shrink-0 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity"
                style="width: max(1.5rem, 1.8cqi); height: max(1.5rem, 1.8cqi);"
            >
                <img
                    src={node.iconUrl}
                    alt={node.name}
                    class="w-full h-full object-contain"
                />
            </div>

            <div class="flex flex-col">
                <span
                    class="font-bold text-foreground {textHoverClass} transition-colors"
                    style="font-size: clamp(0.75rem, 1.1cqi, 0.875rem);"
                >
                    {node.name}
                </span>
                <span
                    class="uppercase tracking-widest font-mono text-muted-foreground"
                    style="font-size: clamp(9px, 0.7cqi, 11px);"
                >
                    {node.desc}
                </span>
            </div>
        </div>
    {/each}
</div>

