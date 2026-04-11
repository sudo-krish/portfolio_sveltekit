<script lang="ts">
    import { warehouseData } from "$lib/data/warehouse";
    import FeatureGrid from "$lib/components/ui/grids/FeatureGrid.svelte";
</script>

<FeatureGrid
    items={warehouseData.warehouseNodes}
    
    cardClass="bg-card/60 backdrop-blur-md border border-border hover:bg-card hover:border-purple-500/30"
    glowClass="bg-purple-500/20"
    textHoverClass="group-hover:text-muted-foreground"
/>
