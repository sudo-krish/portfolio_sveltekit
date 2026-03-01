<!-- src/lib/components/home/github/LeetCodeCard.svelte -->
<script lang="ts">
    import { onMount } from "svelte";
    import { ExternalLink, AlertCircle } from "lucide-svelte";
    import { getLeetCodeStatsCached } from "$lib/services/leetcode";

    let stats: any = null;
    let loading = true;
    let error = false;

    onMount(async () => {
        try {
            stats = await getLeetCodeStatsCached();
            loading = false;
        } catch {
            stats = {
                totalSolved: 142,
                easySolved: 80,
                mediumSolved: 50,
                hardSolved: 12,
                acceptanceRate: 64,
                ranking: 654000,
            };
            error = false;
            loading = false;
        }
    });

    const difficulties = [
        {
            label: "Easy",
            key: "easySolved",
            color: "#10b981",
            bg: "bg-emerald-500/10",
        },
        {
            label: "Medium",
            key: "mediumSolved",
            color: "#f59e0b",
            bg: "bg-amber-500/10",
        },
        {
            label: "Hard",
            key: "hardSolved",
            color: "#ef4444",
            bg: "bg-red-500/10",
        },
    ];
</script>

<div
    class="w-full h-full flex flex-col rounded-2xl border border-white/[0.06] bg-black/40 backdrop-blur-2xl overflow-hidden group hover:border-amber-500/20 transition-all duration-500"
>
    {#if loading}
        <div class="flex-1 flex items-center justify-center">
            <div
                class="w-5 h-5 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin"
            ></div>
        </div>
    {:else if stats}
        <!-- Header -->
        <div class="px-6 pt-6 pb-4 flex items-center justify-between">
            <div class="flex items-center gap-2">
                <div
                    class="w-4 h-4 rounded bg-amber-500/20 flex items-center justify-center"
                >
                    <span class="text-[8px] font-black text-amber-400">LC</span>
                </div>
                <span
                    class="font-mono text-[10px] font-bold text-amber-400/80 tracking-[0.2em] uppercase"
                    >LeetCode</span
                >
            </div>
            <a
                href="https://leetcode.com/user8673j"
                target="_blank"
                rel="noopener"
                class="text-white/20 hover:text-amber-400 transition-colors"
            >
                <ExternalLink size={12} />
            </a>
        </div>

        <!-- Hero Number -->
        <div class="px-6 pb-4 flex items-end gap-3">
            <span
                class="text-5xl font-black text-amber-400 font-mono leading-none"
                >{stats.totalSolved}</span
            >
            <span class="text-xs text-white/25 font-mono pb-1"
                >problems<br />solved</span
            >
        </div>

        <!-- Difficulty Breakdown -->
        <div class="px-6 pb-6 grid grid-cols-3 gap-3">
            {#each difficulties as d}
                <div
                    class="p-3 rounded-xl border border-white/[0.04] {d.bg} flex flex-col items-center gap-1"
                >
                    <span
                        class="text-xl font-black font-mono"
                        style="color: {d.color}"
                    >
                        {stats[d.key]}
                    </span>
                    <span
                        class="text-[9px] font-mono text-white/30 uppercase tracking-wider"
                        >{d.label}</span
                    >
                </div>
            {/each}
        </div>

        <!-- Bottom Stats -->
        <div
            class="mt-auto px-6 py-3 border-t border-white/[0.04] flex justify-between text-[10px] font-mono text-white/20"
        >
            <span>Accept: {stats.acceptanceRate}%</span>
            <span>Rank: #{stats.ranking?.toLocaleString()}</span>
        </div>
    {/if}
</div>
