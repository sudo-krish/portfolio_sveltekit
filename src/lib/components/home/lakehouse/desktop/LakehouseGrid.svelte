<script lang="ts">
    import { lakehouseData } from "$lib/data/lakehouse";
    import FeatureGrid from "$lib/components/ui/grids/FeatureGrid.svelte";
</script>

<FeatureGrid
    items={lakehouseData.lakehouseNodes}
    
    cardClass="bg-card/60 backdrop-blur-md border border-border hover:bg-blue-950/20 hover:border-blue-500/30"
    glowClass="bg-blue-500/20"
    textHoverClass="group-hover:text-blue-400"
/>
