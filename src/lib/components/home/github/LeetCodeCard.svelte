<!-- src/lib/components/home/github/LeetCodeCard.svelte -->
<!-- LeetCode Theme: #ffa116 amber -->
<script lang="ts">
    import { onMount } from "svelte";
    import { ExternalLink } from "lucide-svelte";
    import { getLeetCodeStatsCached } from "$lib/services/leetcode";
    import GlassPanel from "$lib/components/ui/GlassPanel.svelte";
    import StatusBadge from "$lib/components/ui/StatusBadge.svelte";

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

<GlassPanel
    glow="#ffa116"
    className="pointer-events-auto w-full rounded-3xl relative overflow-hidden"
>
    <!-- Ambient Inner Glow -->
    <div
        class="absolute -bottom-10 -right-10 w-40 h-40 bg-[#ffa116]/10 blur-[50px] rounded-full pointer-events-none mix-blend-screen z-0"
    ></div>

    {#if loading}
        <div class="flex items-center justify-center p-8 relative z-10">
            <div
                class="w-6 h-6 border-2 border-[#ffa116]/30 border-t-[#ffa116] rounded-full animate-spin"
            ></div>
        </div>
    {:else if stats}
        <div class="p-6 sm:p-8 relative z-10">
            <div class="flex items-center justify-between mb-6">
                <StatusBadge color="#ffa116" label="LeetCode" />
                <a
                    href="https://leetcode.com/user8673j"
                    target="_blank"
                    rel="noopener"
                    class="text-white/20 hover:text-[#ffa116] transition-colors"
                >
                    <ExternalLink size={12} />
                </a>
            </div>

            <div class="flex items-center gap-6 sm:gap-8 mt-2">
                <div class="shrink-0 flex flex-col items-center">
                    <span
                        class="text-5xl font-black text-[#ffa116] font-mono leading-none drop-shadow-[0_0_15px_rgba(255,161,22,0.3)]"
                        >{stats.totalSolved}</span
                    >
                    <p
                        class="text-[10px] text-white/40 uppercase tracking-widest font-mono mt-2 font-bold"
                    >
                        solved
                    </p>
                </div>
                <div class="flex-1 grid grid-cols-3 gap-3">
                    {#each difficulties as d}
                        <div
                            class="p-3 rounded-2xl border border-white/5 text-center shadow-inner transition-colors"
                            style="background: {d.bg}; border-color: {d.color}20;"
                        >
                            <span
                                class="text-xl sm:text-2xl font-black font-mono mb-1 block"
                                style="color: {d.color}">{stats[d.key]}</span
                            >
                            <p
                                class="text-[9px] sm:text-[10px] font-mono text-white/50 uppercase tracking-widest"
                            >
                                {d.label}
                            </p>
                        </div>
                    {/each}
                </div>
            </div>
        </div>

        <div
            class="px-6 sm:px-8 py-4 border-t border-white/5 flex justify-between text-[10px] sm:text-[11px] font-mono font-bold tracking-widest uppercase text-white/30 relative z-10 bg-black/20"
        >
            <span class="flex items-center gap-2"
                ><div class="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                Accept: {stats.acceptanceRate}%</span
            >
            <span class="flex items-center gap-2"
                ><div class="w-1.5 h-1.5 rounded-full bg-[#ffa116]"></div>
                Rank: #{stats.ranking?.toLocaleString()}</span
            >
        </div>
    {/if}
</GlassPanel>
