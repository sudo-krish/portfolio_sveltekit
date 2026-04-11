<!-- src/lib/components/home/github/mobile/MobileGrid.svelte -->
<script lang="ts">
    // We can reuse the exact same stat cards, they are fully responsive!
    import GitHubStatsCard from "../GitHubStatsCard.svelte";
    import LeetCodeCard from "../LeetCodeCard.svelte";
    import { codingStatsData } from "$lib/data/coding_stats";
</script>

<div class="w-full flex flex-col gap-4 mt-2 relative z-10">
    <!-- Stats Cards Stacked -->
    <GitHubStatsCard />
    <LeetCodeCard />

    <!-- Full-Width Bottom Philosophy Card (Glassmorphism) scaled for mobile -->
    <div
        class="group relative w-full p-5 rounded-2xl bg-foreground/[0.03] backdrop-blur-2xl border border-foreground/10 hover:bg-foreground/[0.06] transition-all duration-500 overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.5)]"
    >
        <!-- Top internal highlight -->
        <div
            class="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-foreground/20 to-transparent opacity-50"
        ></div>

        <!-- Subtle Ambient Glow -->
        <div
            class="absolute -left-10 -bottom-10 w-32 h-32 rounded-full blur-[50px] opacity-10 pointer-events-none bg-gradient-to-r from-success to-highlight"
        ></div>

        <div class="relative z-10">
            <p class="text-[0.85rem] leading-[1.6] text-foreground/80 font-light">
                {@html codingStatsData.philosophy.shortDescription}
                {@html codingStatsData.philosophy.detailedPhilosophy}
            </p>
        </div>
    </div>
</div>
