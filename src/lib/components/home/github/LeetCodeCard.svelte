<script lang="ts">
    import { onMount } from "svelte";
    import {
        Code2,
        Target,
        Trophy,
        Flame,
        ExternalLink,
        Activity,
    } from "lucide-svelte";
    import { codingStatsData } from "$lib/data/coding_stats";
    import { getLeetCodeStatsCached } from "$lib/services/leetcode";

    let stats: any = null;
    let loading = true;
    let error = false;

    // The user's LeetCode username
    const leetcodeUsername = "user8673j";
    const leetcodeUrl = `https://leetcode.com/u/${leetcodeUsername}/`;

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
            totalKey: "totalEasy",
        },
        {
            label: "Medium",
            key: "mediumSolved",
            color: "#ffc01e",
            totalKey: "totalMedium",
        },
        {
            label: "Hard",
            key: "hardSolved",
            color: "#ef4743",
            totalKey: "totalHard",
        },
    ];

    function handleImageError(e: Event) {
        const target = e.target as HTMLImageElement;
        target.src = "https://leetcode.com/static/images/LeetCode_logo_rvs.png";
    }
</script>

<a
    href={leetcodeUrl}
    target="_blank"
    rel="noopener noreferrer"
    class="group block relative flex flex-col p-5 2xl:p-7 rounded-[2rem] bg-card/80 backdrop-blur-3xl border border-border hover:border-primary/50 transition-all duration-700 overflow-hidden shadow-xl w-full h-full"
>
    <!-- Ultra-premium internal top highlight -->
    <div
        class="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-foreground/30 to-transparent opacity-60"
    ></div>

    <!-- Colored gradient border accent on the left -->
    <div
        class="absolute inset-y-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-[#ffa116]/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500"
    ></div>

    <!-- Ambient organic orange glow behind the UI -->
    <div
        class="absolute -right-20 -top-20 w-64 h-64 rounded-full blur-[80px] opacity-15 group-hover:opacity-30 transition-opacity duration-1000 pointer-events-none"
        style="background-color: {codingStatsData.leetcode.accent}"
    ></div>

    <div
        class="absolute -left-20 -bottom-20 w-64 h-64 rounded-full blur-[80px] opacity-[0.08] group-hover:opacity-20 transition-opacity duration-1000 pointer-events-none"
        style="background-color: {codingStatsData.leetcode.accent}"
    ></div>

    <!-- Profile Header Row -->
    <div
        class="flex items-center justify-between mb-6 relative z-10 bg-muted/40 p-3 2xl:p-4 rounded-[1.25rem] border border-border shadow-inner backdrop-blur-md"
    >
        <div class="flex items-center gap-3.5 2xl:gap-4">
            <!-- Profile Picture -->
            <div
                class="relative w-12 h-12 2xl:w-14 2xl:h-14 rounded-full bg-gradient-to-br from-[#ffa116] to-[#ffa116]/20 p-[2px] shadow-[0_0_15px_hsl(var(--warning)/)] group-hover:shadow-[0_0_25px_hsl(var(--warning)/)] transition-shadow duration-500"
            >
                <div
                    class="w-full h-full bg-background rounded-full overflow-hidden border-2 border-transparent"
                >
                    <img
                        src={stats?.avatar ||
                            "https://leetcode.com/static/images/LeetCode_logo_rvs.png"}
                        alt={stats?.name || "LeetCode Avatar"}
                        class="w-full h-full object-cover rounded-full"
                        onerror={handleImageError}
                    />
                </div>
            </div>
            <!-- Name & Username -->
            <div class="flex flex-col">
                <span
                    class="text-[clamp(14px,1.2vw,18px)] font-bold text-foreground leading-tight drop-shadow-sm group-hover:text-[#ffa116] transition-colors duration-300"
                >
                    {stats?.name || "LeetCode Profile"}
                </span>
                <span
                    class="text-[11px] 2xl:text-xs font-mono text-muted-foreground mt-0.5"
                >
                    @{leetcodeUsername}
                </span>
            </div>
        </div>

        <!-- LeetCode Badge / External Link Icon -->
        <div class="flex items-center gap-2">
            <div
                class="flex items-center justify-center w-8 h-8 rounded-full bg-muted border border-border group-hover:bg-[#ffa116]/10 group-hover:border-[#ffa116]/30 transition-colors duration-300"
            >
                <ExternalLink
                    size={14}
                    class="text-muted-foreground group-hover:text-[#ffa116] transition-colors duration-300"
                />
            </div>
        </div>
    </div>

    <!-- Title and Content Body -->
    {#if loading}
        <div
            class="flex-1 flex flex-col items-center justify-center py-12 relative z-10 gap-4"
        >
            <div
                class="w-8 h-8 border-2 border-[#ffa116]/30 border-t-[#ffa116] rounded-full animate-spin"
            ></div>
            <span
                class="text-xs font-mono text-muted-foreground animate-pulse uppercase tracking-widest"
                >Loading Profile...</span
            >
        </div>
    {:else if error || !stats}
        <div
            class="flex-1 flex flex-col items-center justify-center py-12 relative z-10 gap-2"
        >
            <Code2 size={24} class="text-muted-foreground opacity-50" />
            <span
                class="text-[11px] font-mono text-muted-foreground uppercase tracking-widest"
                >[ERR] failed_to_fetch_stats</span
            >
        </div>
    {:else}
        <!-- Top Metrics Row (Rank and Streak) -->
        <div class="grid grid-cols-2 gap-3 2xl:gap-4 mb-5 relative z-10">
            <!-- Global Rank -->
            <div
                class="col-span-1 flex flex-col justify-center p-4 rounded-[1.25rem] bg-gradient-to-br from-card/80 to-foreground/[0.02] border border-foreground/5 shadow-inner hover:bg-foreground/[0.04] transition-colors relative overflow-hidden group/card shadow-[inset_0_4px_20px_rgba(0,0,0,0.5)]"
            >
                <div
                    class="absolute inset-0 bg-gradient-to-b from-foreground/[0.02] to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity"
                ></div>
                <div
                    class="flex items-center gap-2 text-foreground/40 mb-3 relative z-10"
                >
                    <Trophy
                        size={14}
                        class="text-muted-foreground group-hover/card:text-foreground transition-colors"
                    />
                    <span
                        class="text-[9px] 2xl:text-[10px] font-mono uppercase tracking-widest font-bold"
                        >Global Rank</span
                    >
                </div>
                <div class="flex items-baseline gap-1 relative z-10">
                    <span
                        class="text-xl 2xl:text-2xl font-black text-foreground font-mono leading-none group-hover/card:text-[#ffa116] transition-colors"
                    >
                        {stats.ranking?.toLocaleString() || "N/A"}
                    </span>
                </div>
                {#if stats.reputation}
                    <div
                        class="text-[9px] text-[#ffa116]/80 mt-2 font-mono relative z-10 bg-[#ffa116]/10 self-start px-2 py-0.5 rounded-sm"
                    >
                        +{stats.reputation} Reputation
                    </div>
                {/if}
            </div>

            <!-- Flame Streak Indicator -->
            <div
                class="col-span-1 flex flex-col justify-center p-4 rounded-[1.25rem] bg-gradient-to-br from-card/80 to-foreground/[0.02] border border-foreground/5 shadow-inner hover:bg-[#ffa116]/5 hover:border-[#ffa116]/20 transition-all duration-300 relative overflow-hidden group/card shadow-[inset_0_4px_20px_rgba(0,0,0,0.5)]"
            >
                <div
                    class="flex items-center gap-2 text-foreground/40 mb-3 relative z-10"
                >
                    <Flame
                        size={14}
                        class={stats.streak > 0
                            ? "text-[#ffa116] group-hover/card:animate-pulse"
                            : "text-muted-foreground"}
                    />
                    <span
                        class="text-[9px] 2xl:text-[10px] font-mono uppercase tracking-widest font-bold"
                        >Streak</span
                    >
                </div>
                <div class="flex items-baseline gap-1 relative z-10">
                    <span
                        class="text-xl 2xl:text-2xl font-black text-[#ffa116] font-mono leading-none"
                    >
                        {stats.streak || 0}
                    </span>
                    <span
                        class="text-[10px] text-muted-foreground font-mono uppercase ml-1"
                        >Days</span
                    >
                </div>
                {#if stats.activeDays}
                    <div
                        class="text-[9px] text-muted-foreground mt-2 font-mono relative z-10"
                    >
                        {stats.activeDays} Active Days
                    </div>
                {/if}
            </div>
        </div>

        <!-- Primary Centerpiece: Problems Solved -->
        <div
            class="flex flex-col p-4 2xl:p-5 rounded-[1.25rem] bg-gradient-to-br from-[#ffa116]/10 to-transparent border border-[#ffa116]/20 shadow-inner group/streak relative z-10 mb-5 overflow-hidden backdrop-blur-md"
        >
            <!-- Background detail for the solved card -->
            <div
                class="absolute right-0 top-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,hsl(var(--warning)/)_0,transparent_70%)]"
            ></div>

            <div class="flex items-center justify-between mb-4 relative z-10">
                <div class="flex items-center gap-2 text-[#ffa116]/80">
                    <Target size={16} />
                    <span
                        class="text-[10px] 2xl:text-xs font-mono uppercase tracking-widest font-bold"
                        >Problems Solved</span
                    >
                </div>
                <div class="flex items-baseline gap-1">
                    <span
                        class="text-3xl 2xl:text-4xl font-black text-foreground font-mono leading-none drop-shadow-sm"
                    >
                        {stats.totalSolved}
                    </span>
                    <span
                        class="text-[11px] text-muted-foreground font-mono uppercase"
                    >
                        /{stats.totalQuestions || 3000}
                    </span>
                </div>
            </div>

            <!-- Single Line Progress Bar -->
            <div
                class="w-full h-1.5 2xl:h-2 bg-foreground/5 rounded-full overflow-hidden mb-5 flex relative z-10 shadow-inner"
            >
                <div
                    class="h-full bg-[#2cbb5d] shadow-[0_0_10px_#2cbb5d]"
                    style="width: {stats.totalSolved
                        ? (stats.easySolved / stats.totalSolved) * 100
                        : 0}%"
                ></div>
                <div
                    class="h-full bg-[#ffc01e] shadow-[0_0_10px_#ffc01e]"
                    style="width: {stats.totalSolved
                        ? (stats.mediumSolved / stats.totalSolved) * 100
                        : 0}%"
                ></div>
                <div
                    class="h-full bg-[#ef4743] shadow-[0_0_10px_#ef4743]"
                    style="width: {stats.totalSolved
                        ? (stats.hardSolved / stats.totalSolved) * 100
                        : 0}%"
                ></div>
            </div>

            <!-- Exact Difficulty Values -->
            <div class="flex justify-between relative z-10">
                {#each difficulties as d}
                    <div class="flex flex-col items-center">
                        <span
                            class="text-[9px] 2xl:text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-1"
                            >{d.label}</span
                        >
                        <span
                            class="text-xs 2xl:text-sm font-black font-mono drop-shadow-[0_0_5px_currentColor]"
                            style="color: {d.color}">{stats[d.key] || 0}</span
                        >
                    </div>
                {/each}
            </div>
        </div>

        <!-- Bottom Footer (Acceptance Rate) -->
        <div
            class="mt-auto pt-3 border-t border-border flex items-center justify-between relative z-10 text-muted-foreground"
        >
            <div
                class="flex items-center gap-2 group-hover:text-foreground transition-colors duration-300"
            >
                <Activity size={14} />
                <span
                    class="text-[10px] 2xl:text-[11px] font-mono tracking-wide"
                    >{stats.acceptanceRate}% Acceptance Rate</span
                >
            </div>

            <div class="flex items-center gap-2">
                <span
                    class="text-[9px] 2xl:text-[10px] font-mono tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0"
                    >View Profile</span
                >
            </div>
        </div>
    {/if}
</a>
