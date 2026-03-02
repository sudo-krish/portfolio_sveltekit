<!-- src/lib/components/home/github/GithubSection.svelte -->
<!-- 3D: RIGHT (x:4.5) | Content: LEFT -->
<script lang="ts">
    import { onMount } from "svelte";
    import gsap from "gsap";
    import GitHubStatsCard from "./GitHubStatsCard.svelte";
    import LeetCodeCard from "./LeetCodeCard.svelte";
    import MobileCarousel from "$lib/components/ui/MobileCarousel.svelte";

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

<MobileCarousel
    layout="right"
    sectionTitle="Dev Activity"
    sectionDescription="Check out my open-source work"
    accentColor="#22c55e"
>
    <!-- DESKTOP / TABLET (Original Preserved floating layout) -->
    <svelte:fragment slot="content-pc">
        <!-- Background elements -->
        <div
            class="absolute top-[20%] left-[10%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-green-500/[0.06] rounded-full blur-[80px] md:blur-[120px]"
        ></div>

        <!-- MAIN CONTENT CARD (RIGHT SIDE PC) -->
        <div
            class="absolute top-[20%] right-[8%] w-full max-w-xl z-20 pointer-events-auto flex flex-col gap-4"
        >
            <div class="gh-panel flex-shrink-0"><GitHubStatsCard /></div>
            <div class="gh-panel flex-shrink-0"><LeetCodeCard /></div>
        </div>
    </svelte:fragment>

    <!-- MOBILE / SMALL TABLET (Carousel Slide Layout) -->
    <svelte:fragment slot="content-mobile">
        <div
            class="z-20 w-full max-w-lg mx-auto pointer-events-auto flex flex-col gap-4 mt-8"
        >
            <div class="gh-panel flex-shrink-0"><GitHubStatsCard /></div>
            <div class="gh-panel flex-shrink-0"><LeetCodeCard /></div>
        </div>
    </svelte:fragment>
</MobileCarousel>
