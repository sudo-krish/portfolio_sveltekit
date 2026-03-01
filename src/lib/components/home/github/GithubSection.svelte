<!-- src/lib/components/home/github/GithubSection.svelte -->
<script lang="ts">
    import { onMount } from "svelte";
    import gsap from "gsap";
    import GitHubStatsCard from "./GitHubStatsCard.svelte";
    import LeetCodeCard from "./LeetCodeCard.svelte";

    onMount(() => {
        gsap.fromTo(
            ".gh-card",
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: { trigger: "#github", start: "top 60%" },
            },
        );
    });
</script>

<div
    class="relative w-full h-[100dvh] overflow-hidden pointer-events-none z-20"
>
    <!-- Ambient glow -->
    <div
        class="absolute top-1/3 right-1/3 w-[500px] h-[500px] bg-green-500/[0.04] rounded-full blur-[120px] pointer-events-none"
    ></div>

    <!-- Content: Right aligned (zig-zag 3) -->
    <div
        class="absolute top-[12%] md:top-[18%] right-[5%] md:right-[10%] w-full max-w-sm md:max-w-xl lg:max-w-2xl lg:w-[45%] flex flex-col gap-6 pointer-events-auto"
    >
        <div class="gh-card w-full h-[40dvh] lg:h-[35dvh]">
            <GitHubStatsCard />
        </div>
        <div class="gh-card w-full h-[40dvh] lg:h-[35dvh]">
            <LeetCodeCard />
        </div>
    </div>
</div>
