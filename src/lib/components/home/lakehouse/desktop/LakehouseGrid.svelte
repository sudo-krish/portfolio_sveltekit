<script lang="ts">
    import { lakehouseData } from "$lib/data/lakehouse";
    import FeatureGrid from "$lib/components/ui/grids/FeatureGrid.svelte";
</script>

<FeatureGrid
    items={lakehouseData.lakehouseNodes}
    
    cardClass="bg-card/60 backdrop-blur-md border border-border hover:bg-card hover:border-primary/30"
    glowClass="bg-primary/20"
    textHoverClass="group-hover:text-primary"
/>
