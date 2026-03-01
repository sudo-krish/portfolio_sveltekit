<!-- src/lib/components/home/experience/ExperienceSection.svelte -->
<script lang="ts">
    import { onMount } from "svelte";
    import gsap from "gsap";
    import ExperienceCard from "./ExperienceCard.svelte";
    import CareerTimelineCard from "./CareerTimelineCard.svelte";

    onMount(() => {
        gsap.fromTo(
            ".exp-card",
            { y: 60, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: { trigger: "#experience", start: "top 60%" },
            },
        );
    });
</script>

<div
    class="relative w-full h-[100dvh] overflow-hidden pointer-events-none z-20"
>
    <!-- Ambient glow -->
    <div
        class="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-blue-500/[0.04] rounded-full blur-[120px] pointer-events-none"
    ></div>

    <!-- Content: Two cards side by side (left half of screen) -->
    <div class="absolute inset-0 flex items-center pointer-events-auto">
        <div class="w-full max-w-6xl mx-auto px-6 lg:px-12">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:max-w-[65%]">
                <div class="exp-card"><ExperienceCard /></div>
                <div class="exp-card"><CareerTimelineCard /></div>
            </div>
        </div>
    </div>
</div>
