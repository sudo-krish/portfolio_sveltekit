<!-- src/lib/components/home/github/LeetCodeCard.svelte -->
<!-- LeetCode Theme: #ffa116 amber -->
<script lang="ts">
    import { onMount } from "svelte";
    import { ExternalLink, Flame, Brain, Code2 } from "lucide-svelte";
    import { getLeetCodeStatsCached } from "$lib/services/leetcode";
    import GlassPanel from "$lib/components/ui/GlassPanel.svelte";
    import StatusBadge from "$lib/components/ui/StatusBadge.svelte";

    let stats: any = null;
    let loading = true;
    let error = false;

    onMount(async () => {
        try {
            const data = await getLeetCodeStatsCached();
            if (data && !data.error) {
                stats = data;
            } else {
                error = true;
            }
        } catch {
            error = true;
        } finally {
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
    className="pointer-events-auto w-full rounded-3xl relative overflow-hidden flex flex-col items-stretch h-full"
>
    <!-- Ambient Inner Glow -->
    <div
        class="absolute -bottom-10 -right-10 w-40 h-40 bg-[#ffa116]/10 blur-[50px] rounded-full pointer-events-none mix-blend-screen z-0"
    ></div>

    <div class="p-6 sm:p-8 relative z-10 flex-1 flex flex-col">
        <div class="flex items-center justify-between mb-6">
            <StatusBadge color="#ffa116" label="LeetCode" />
            <a
                href="https://leetcode.com/user8673j"
                target="_blank"
                rel="noopener"
                class="text-white/20 hover:text-[#ffa116] transition-colors"
            >
                <ExternalLink size={14} />
            </a>
        </div>

        {#if loading}
            <div class="flex-1 flex items-center justify-center p-8">
                <div
                    class="w-6 h-6 border-2 border-[#ffa116]/30 border-t-[#ffa116] rounded-full animate-spin"
                ></div>
            </div>
        {:else if error || !stats}
            <div
                class="flex-1 flex items-center justify-center p-8 text-center flex-col gap-3"
            >
                <div
                    class="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500/50 mb-2"
                >
                    <ExternalLink size={20} />
                </div>
                <p class="text-white/40 text-sm font-light">
                    Unable to load LeetCode data.
                </p>
                <a
                    href="https://leetcode.com/user8673j"
                    target="_blank"
                    class="text-[#ffa116]/80 text-xs hover:text-[#ffa116] underline decoration-[#ffa116]/30 transition-all"
                    >View Profile Directly</a
                >
            </div>
        {:else}
            <!-- User Profile Row -->
            <div
                class="flex items-center gap-4 mb-8 pb-4 border-b border-white/5"
            >
                {#if stats.avatar}
                    <div
                        class="w-12 h-12 rounded-full overflow-hidden border-2 border-[#ffa116]/20 shrink-0"
                    >
                        <img
                            src={stats.avatar}
                            alt="LeetCode Avatar"
                            class="w-full h-full object-cover"
                        />
                    </div>
                {/if}
                <div>
                    <h3 class="font-bold text-white/90 leading-tight">
                        {stats.name || "user8673j"}
                    </h3>
                    <div
                        class="flex items-center gap-3 mt-1.5 text-[10px] font-mono font-bold tracking-widest uppercase text-white/40"
                    >
                        <span class="flex items-center gap-1.5" title="Ranking">
                            <div
                                class="w-1.5 h-1.5 rounded-full bg-[#ffa116]"
                            ></div>
                            #{stats.ranking?.toLocaleString()}
                        </span>
                        <span
                            class="flex items-center gap-1.5 text-orange-400"
                            title="Active Streak"
                        >
                            <Flame size={10} />
                            {stats.streak} Day
                        </span>
                    </div>
                </div>
            </div>

            <!-- Solved Stats Grid -->
            <div
                class="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 mb-6"
            >
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
                <div class="flex-1 grid grid-cols-3 gap-2 w-full">
                    {#each difficulties as d}
                        <div
                            class="p-3 rounded-2xl border border-white/5 text-center shadow-inner transition-colors"
                            style="background: {d.bg}; border-color: {d.color}15;"
                        >
                            <span
                                class="text-xl sm:text-2xl font-black font-mono mb-1 block drop-shadow-md"
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

            <!-- Skills & Languages Row -->
            <div class="grid grid-cols-2 gap-3 mt-auto pt-2">
                <div class="p-4 rounded-2xl bg-black/20 border border-white/5">
                    <div
                        class="flex items-center gap-2 text-white/40 mb-3 text-[10px] font-mono uppercase tracking-widest font-bold"
                    >
                        <Code2 size={12} class="text-[#ffa116]" /> Languages
                    </div>
                    <div class="flex flex-wrap gap-1.5">
                        {#if stats.languages && stats.languages.length > 0}
                            {#each stats.languages.slice(0, 3) as lang}
                                <span
                                    class="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] text-white/60 font-mono tracking-wide"
                                    >{lang}</span
                                >
                            {/each}
                        {:else}
                            <span class="text-[10px] text-white/30 italic"
                                >None visible</span
                            >
                        {/if}
                    </div>
                </div>

                <div class="p-4 rounded-2xl bg-black/20 border border-white/5">
                    <div
                        class="flex items-center gap-2 text-white/40 mb-3 text-[10px] font-mono uppercase tracking-widest font-bold"
                    >
                        <Brain size={12} class="text-[#ffa116]" /> Topics High
                    </div>
                    <div
                        class="flex items-center justify-between text-[11px] font-mono text-white/60 w-full mb-1"
                    >
                        <span>Adv. Topics</span>
                        <span class="text-[#ef4743] font-bold"
                            >{stats.skillStats?.advanced || 0}</span
                        >
                    </div>
                    <div
                        class="flex items-center justify-between text-[11px] font-mono text-white/60 w-full"
                    >
                        <span>Inter. Topics</span>
                        <span class="text-[#ffc01e] font-bold"
                            >{stats.skillStats?.intermediate || 0}</span
                        >
                    </div>
                </div>
            </div>
        {/if}
    </div>

    {#if stats && !error && !loading}
        <div
            class="px-6 sm:px-8 py-4 border-t border-white/5 flex justify-between items-center text-[10px] sm:text-[11px] font-mono font-bold tracking-widest uppercase text-white/30 relative z-10 bg-black/20"
        >
            <span class="flex items-center gap-2">
                <div class="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                Acceptance:<span class="text-white/60"
                    >{stats.acceptanceRate}%</span
                >
            </span>
            <span class="flex items-center gap-2">
                Active: <span class="text-white/60"
                    >{stats.activeDays} Days</span
                >
            </span>
        </div>
    {/if}
</GlassPanel>
