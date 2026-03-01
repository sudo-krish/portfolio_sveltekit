<!-- src/lib/components/home/impact/ImpactSection.svelte -->
<script lang="ts">
    import { onMount } from "svelte";
    import gsap from "gsap";
    import ImpactMetricsCard from "./ImpactMetricsCard.svelte";
    import ProjectMetricsCard from "./ProjectMetricsCard.svelte";

    onMount(() => {
        gsap.fromTo(
            ".impact-card",
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: { trigger: "#impact", start: "top 60%" },
            },
        );
    });
</script>

<div
    class="relative w-full h-[100dvh] overflow-hidden pointer-events-none z-20"
>
    <div
        class="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-purple-500/[0.04] rounded-full blur-[120px] pointer-events-none"
    ></div>

    <!-- Content: Left aligned (zig-zag 4) -->
    <div
        class="absolute top-[12%] md:top-[18%] left-[5%] md:left-[10%] w-full max-w-sm md:max-w-xl lg:max-w-2xl lg:w-[45%] flex flex-col gap-6 pointer-events-auto"
    >
        <div class="impact-card w-full h-[40dvh] lg:h-[35dvh]">
            <ImpactMetricsCard />
        </div>
        <div class="impact-card w-full h-[40dvh] lg:h-[35dvh]">
            <ProjectMetricsCard />
        </div>
    </div>
</div>
