<!-- src/lib/components/home/github/LeetCodeCard.svelte -->
<!-- LeetCode Theme: #ffa116 amber, #2cbb5d easy, #ffc01e medium, #ef4743 hard -->
<script lang="ts">
    import { onMount } from "svelte";
    import { ExternalLink } from "lucide-svelte";
    import { getLeetCodeStatsCached } from "$lib/services/leetcode";

    let stats: any = null;
    let loading = true;

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
            loading = false;
        }
    });

    const difficulties = [
        {
            label: "Easy",
            key: "easySolved",
            color: "#2cbb5d",
            bg: "rgba(44,187,93,0.1)",
        },
        {
            label: "Med",
            key: "mediumSolved",
            color: "#ffc01e",
            bg: "rgba(255,192,30,0.1)",
        },
        {
            label: "Hard",
            key: "hardSolved",
            color: "#ef4743",
            bg: "rgba(239,71,67,0.1)",
        },
    ];
</script>

<div
    class="pointer-events-auto w-full border border-white/10 bg-black/40 backdrop-blur-2xl rounded-3xl shadow-2xl relative overflow-hidden"
>
    <div
        class="absolute top-0 right-0 w-32 h-32 bg-[#ffa116]/15 blur-[50px]"
    ></div>

    {#if loading}
        <div class="flex items-center justify-center p-8">
            <div
                class="w-5 h-5 border-2 border-[#ffa116]/30 border-t-[#ffa116] rounded-full animate-spin"
            ></div>
        </div>
    {:else if stats}
        <div class="relative z-10 p-6">
            <!-- Header -->
            <div class="flex items-center justify-between mb-3">
                <div
                    class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#ffa116]/30 bg-[#ffa116]/10 backdrop-blur-sm"
                >
                    <span class="relative flex h-1.5 w-1.5">
                        <span
                            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffa116] opacity-75"
                        ></span>
                        <span
                            class="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#ffa116]"
                        ></span>
                    </span>
                    <span
                        class="font-mono text-[10px] font-semibold text-[#ffa116] tracking-widest uppercase"
                        >LeetCode</span
                    >
                </div>
                <a
                    href="https://leetcode.com/user8673j"
                    target="_blank"
                    rel="noopener"
                    class="text-white/20 hover:text-[#ffa116] transition-colors"
                >
                    <ExternalLink size={12} />
                </a>
            </div>

            <!-- Hero + Difficulty in one row -->
            <div class="flex items-center gap-4">
                <div class="shrink-0">
                    <span
                        class="text-4xl font-black text-[#ffa116] font-mono leading-none"
                        >{stats.totalSolved}</span
                    >
                    <p class="text-[9px] text-white/25 font-mono mt-0.5">
                        solved
                    </p>
                </div>
                <div class="flex-1 grid grid-cols-3 gap-2">
                    {#each difficulties as d}
                        <div
                            class="p-2 rounded-lg border border-white/[0.06] text-center"
                            style="background: {d.bg}"
                        >
                            <span
                                class="text-base font-black font-mono"
                                style="color: {d.color}">{stats[d.key]}</span
                            >
                            <p
                                class="text-[8px] font-mono text-white/30 uppercase"
                            >
                                {d.label}
                            </p>
                        </div>
                    {/each}
                </div>
            </div>
        </div>

        <!-- Bottom -->
        <div
            class="px-6 py-2.5 border-t border-white/[0.06] flex justify-between text-[9px] font-mono text-white/20"
        >
            <span>Accept: {stats.acceptanceRate}%</span>
            <span>Rank: #{stats.ranking?.toLocaleString()}</span>
        </div>
    {/if}
</div>
