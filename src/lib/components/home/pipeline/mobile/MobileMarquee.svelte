<!-- src/lib/components/home/pipeline/mobile/MobileMarquee.svelte -->
<script lang="ts">
    import InfiniteMarquee from "$lib/components/ui/marquee/InfiniteMarquee.svelte";
    import { pipelineData } from "$lib/data/pipeline";
</script>

<div
    class="w-[110%] -ml-[5%] relative overflow-hidden mask-edges-fade opacity-90 scale-90"
>
    <InfiniteMarquee
        items={pipelineData.techStack}
        baseSpeed={0.5}
        direction="left"
    />
</div>

<style>
    .mask-edges-fade {
        mask-image: linear-gradient(
            to right,
            transparent,
            black 15%,
            black 85%,
            transparent
        );
        -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            black 15%,
            black 85%,
            transparent
        );
    }
</style>
