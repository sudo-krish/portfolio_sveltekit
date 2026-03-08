<!-- src/lib/components/home/pipeline/desktop/MarqueeRail.svelte -->
<script lang="ts">
    import InfiniteMarquee from "$lib/components/ui/marquee/InfiniteMarquee.svelte";
    import { pipelineData } from "$lib/data/pipeline";
</script>

<div
    class="w-full max-w-[1000px] relative overflow-hidden mask-edges-fade opacity-80 hover:opacity-100 transition-opacity duration-500"
>
    <InfiniteMarquee
        items={pipelineData.techStack}
        baseSpeed={0.8}
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
