<!-- src/lib/components/home/github/desktop/RightGrid.svelte -->
<script lang="ts">
    import GitHubStatsCard from "../GitHubStatsCard.svelte";
    import LeetCodeCard from "../LeetCodeCard.svelte";
    import { codingStatsData } from "$lib/data/coding_stats";
</script>

<div class="w-full flex flex-col relative z-10" style="gap: 1cqi;">
    <!-- Side by Side Grid for Stats Cards -->
    <div class="grid grid-cols-2" style="gap: 1cqi;">
        <GitHubStatsCard />
        <LeetCodeCard />
    </div>

    <!-- Full-Width Bottom Philosophy Card (Glassmorphism) -->
    <div
        class="rounded-xl bg-cyan-950/20 backdrop-blur-xl border border-cyan-500/20 border-l-4 border-l-cyan-400 shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
        style="margin-top: 0.2cqi; padding: 1cqi;"
    >
        <p
            class="leading-[1.5] text-foreground"
            style="font-size: clamp(0.65rem, 0.85cqi, 0.95rem);"
        >
            {@html codingStatsData.philosophy.shortDescription}
            {@html codingStatsData.philosophy.detailedPhilosophy}
        </p>
    </div>
</div>
