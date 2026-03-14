<!-- src/lib/components/home/github/desktop/RightGrid.svelte -->
<script lang="ts">
    import GitHubStatsCard from "../GitHubStatsCard.svelte";
    import LeetCodeCard from "../LeetCodeCard.svelte";
    import { codingStatsData } from "$lib/data/coding_stats";
</script>

<div class="w-full max-w-[1000px] flex flex-col gap-4 2xl:gap-6 relative z-10">
    <!-- Side by Side Grid for Stats Cards -->
    <div class="grid grid-cols-2 gap-4 2xl:gap-6">
        <GitHubStatsCard />
        <LeetCodeCard />
    </div>

    <!-- Full-Width Bottom Philosophy Card (Glassmorphism) -->
    <div
        class="group relative w-full p-5 2xl:p-6 rounded-2xl 2xl:rounded-3xl bg-foreground/[0.03] backdrop-blur-2xl border border-foreground/10 hover:bg-foreground/[0.06] hover:border-foreground/20 transition-all duration-500 overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.5)]"
    >
        <!-- Top internal highlight -->
        <div
            class="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-foreground/20 to-transparent opacity-50"
        ></div>

        <!-- Subtle Ambient Glow -->
        <div
            class="absolute -left-10 -bottom-10 w-40 h-40 rounded-full blur-[60px] opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none bg-gradient-to-r from-[#22c55e] to-[#ffa116]"
        ></div>

        <div class="relative z-10">
            <p
                class="text-[clamp(0.85rem,1vw,1rem)] 2xl:text-[clamp(0.95rem,1.1vw,1.1rem)] leading-[1.7] text-foreground/80"
            >
                {@html codingStatsData.philosophy.shortDescription}
                {@html codingStatsData.philosophy.detailedPhilosophy}
            </p>
        </div>
    </div>
</div>
