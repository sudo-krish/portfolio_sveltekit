<!-- src/lib/components/home/github/GithubSection.svelte -->
<!-- 3D: RIGHT (x:4.5) | Content: LEFT -->
<script lang="ts">
    import { onMount } from "svelte";
    import gsap from "gsap";
    import GitHubStatsCard from "./GitHubStatsCard.svelte";
    import LeetCodeCard from "./LeetCodeCard.svelte";

    onMount(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo(
                ".gh-panel",
                { y: 50, opacity: 0, scale: 0.95 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1.2,
                    stagger: 0.15,
                    ease: "power3.out",
                    delay: 0.1,
                },
            );
        });
        return () => ctx.revert();
    });
</script>

<div
    class="relative w-full h-[100dvh] overflow-hidden pointer-events-none z-20"
>
    <div
        class="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-green-500/[0.06] rounded-full blur-[120px]"
    ></div>

    <!-- Content: RIGHT (3D on LEFT) -->
    <div
        class="absolute top-[15%] md:top-[20%] right-[5%] md:right-[10%] w-full max-w-sm md:max-w-xl lg:max-w-2xl lg:w-[45%] flex flex-col gap-4"
    >
        <div class="gh-panel"><GitHubStatsCard /></div>
        <div class="gh-panel"><LeetCodeCard /></div>
    </div>
</div>
