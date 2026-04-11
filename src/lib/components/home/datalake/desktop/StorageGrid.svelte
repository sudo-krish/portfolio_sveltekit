<script lang="ts">
    import { datalakeData } from "$lib/data/datalake";
    import FeatureGrid from "$lib/components/ui/grids/FeatureGrid.svelte";
</script>

<FeatureGrid
    items={datalakeData.storageNodes}
    
    cardClass="bg-card/60 backdrop-blur-md border border-border hover:bg-card hover:border-emerald-500/30"
    glowClass="bg-emerald-500/20"
    textHoverClass="group-hover:text-accent"
/>
