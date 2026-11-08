<script lang="ts">
    import { onMount } from "svelte";
    import GlassCard from "$lib/components/ui/cards/GlassCard.svelte";
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

    import { page } from "$app/stores";

    // PRE-FILL FROM SSR (Crucial for crawlers bypassing the Loading state)
    $: {
        if ($page.data.leetcodeStats && stats === null) {
            stats = $page.data.leetcodeStats;
            loading = false;
            error = false;
        }
    }

    onMount(async () => {
        if (stats) return; // SSR hydrated perfectly
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
            color: "hsl(var(--success))",
            totalKey: "totalEasy",
        },
        {
            label: "Medium",
            key: "mediumSolved",
            color: "hsl(var(--warning))",
            totalKey: "totalMedium",
        },
        {
            label: "Hard",
            key: "hardSolved",
            color: "hsl(var(--destructive))",
            totalKey: "totalHard",
        },
    ];

    function handleImageError(e: Event) {
        const target = e.target as HTMLImageElement;
        target.src = "https://leetcode.com/static/images/LeetCode_logo_rvs.png";
    }
</script>

<GlassCard
    variant="default"
    accent={codingStatsData.leetcode.accent}
    href={leetcodeUrl}
    target="_blank"
    rel="noopener noreferrer"
    class="group w-full h-full"
>
    <!-- Profile Header Row (Flat hairline ledger — zero nested cards) -->
    <div class="flex items-center justify-between pb-4 mb-4 border-b border-border/70 z-10">
        <div class="flex items-center gap-3.5">
            <div
                class="relative w-11 h-11 2xl:w-12 2xl:h-12 rounded-xl overflow-hidden border border-border/80 group-hover:border-primary/50 transition-colors duration-300 bg-white/95 p-1.5 shrink-0"
            >
                <img
                    src={stats?.avatar ||
                        "https://leetcode.com/static/images/LeetCode_logo_rvs.png"}
                    alt="{stats?.name || 'Krishnanand Anil'} - LeetCode Data Engineering Profile"
                    class="w-full h-full object-contain rounded-lg"
                    onerror={handleImageError}
                    loading="lazy"
                    width="48"
                    height="48"
                />
            </div>
            <div class="flex flex-col">
                <span
                    class="text-[clamp(14px,1.15vw,17px)] font-heading font-bold text-foreground leading-tight"
                >
                    {stats?.name || "LeetCode Profile"}
                </span>
                <span
                    class="text-[11px] font-mono text-muted-foreground mt-0.5"
                >
                    @{leetcodeUsername}
                </span>
            </div>
        </div>

        <div
            class="flex items-center justify-center w-8 h-8 rounded-lg bg-muted/70 border border-border/80 group-hover:bg-primary/12 group-hover:border-primary/40 transition-colors duration-300"
        >
            <ExternalLink
                size={14}
                class="text-muted-foreground group-hover:text-primary transition-colors duration-300"
            />
        </div>
    </div>

    {#if loading}
        <div
            class="flex-1 flex flex-col items-center justify-center py-12 relative z-10 gap-3"
        >
            <div
                class="w-7 h-7 border-2 border-border border-t-primary rounded-full animate-spin"
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
        <!-- 3-Column Tabular Telemetry Ledger (Flat hairline grid — zero nested cards) -->
        <div class="grid grid-cols-3 divide-x divide-border/70 pb-4 mb-4 border-b border-border/70 relative z-10">
            <!-- Solved -->
            <div class="flex flex-col pr-3">
                <div class="flex items-center gap-1.5 text-muted-foreground mb-1.5">
                    <Target size={12} class="text-primary" />
                    <span class="text-[10px] font-mono uppercase tracking-wider">Solved</span>
                </div>
                <div class="flex items-baseline gap-1">
                    <span class="text-2xl 2xl:text-3xl font-bold text-foreground font-mono tabular-nums leading-none">
                        {stats.totalSolved}
                    </span>
                    <span class="text-[10px] text-muted-foreground font-mono tabular-nums">
                        /{stats.totalQuestions || 3000}
                    </span>
                </div>
            </div>

            <!-- Global Rank -->
            <div class="flex flex-col px-3">
                <div class="flex items-center gap-1.5 text-muted-foreground mb-1.5">
                    <Trophy size={12} class="text-warning" />
                    <span class="text-[10px] font-mono uppercase tracking-wider">Rank</span>
                </div>
                <span class="text-lg 2xl:text-xl font-bold text-foreground font-mono tabular-nums leading-none">
                    {stats.ranking?.toLocaleString() || "N/A"}
                </span>
            </div>

            <!-- Streak -->
            <div class="flex flex-col pl-3">
                <div class="flex items-center gap-1.5 text-muted-foreground mb-1.5">
                    <Flame size={12} class="text-warning" />
                    <span class="text-[10px] font-mono uppercase tracking-wider">Streak</span>
                </div>
                <div class="flex items-baseline gap-1">
                    <span class="text-2xl 2xl:text-3xl font-bold text-foreground font-mono tabular-nums leading-none">
                        {stats.streak || 0}
                    </span>
                    <span class="text-[10px] text-muted-foreground font-mono uppercase">d</span>
                </div>
            </div>
        </div>

        <!-- Difficulty Distribution Telemetry (Flat section — zero nested cards) -->
        <div class="flex flex-col flex-1 justify-center relative z-10">
            <div class="flex items-center justify-between mb-2.5">
                <span class="text-[10px] font-mono uppercase tracking-[0.12em] font-semibold text-muted-foreground">
                    Complexity Distribution
                </span>
                {#if stats.activeDays}
                    <span class="text-[10px] font-mono tabular-nums text-muted-foreground">
                        {stats.activeDays} Active Days
                    </span>
                {/if}
            </div>

            <!-- Proportional Progress Bar -->
            <div
                class="w-full h-2 bg-muted rounded-full overflow-hidden mb-4 flex relative z-10 border border-border/60"
            >
                <div
                    class="h-full bg-success"
                    style="width: {stats.totalSolved
                        ? (stats.easySolved / stats.totalSolved) * 100
                        : 0}%"
                ></div>
                <div
                    class="h-full bg-warning"
                    style="width: {stats.totalSolved
                        ? (stats.mediumSolved / stats.totalSolved) * 100
                        : 0}%"
                ></div>
                <div
                    class="h-full bg-destructive"
                    style="width: {stats.totalSolved
                        ? (stats.hardSolved / stats.totalSolved) * 100
                        : 0}%"
                ></div>
            </div>

            <!-- Exact Difficulty Values -->
            <div class="grid grid-cols-3 divide-x divide-border/60 relative z-10">
                {#each difficulties as d, idx}
                    <div class="flex items-center justify-between {idx === 0 ? 'pr-3' : idx === 1 ? 'px-3' : 'pl-3'}">
                        <span
                            class="text-[10px] font-mono text-muted-foreground uppercase tracking-wider"
                            >{d.label}</span
                        >
                        <span
                            class="text-xs 2xl:text-sm font-bold font-mono tabular-nums"
                            style="color: {d.color}">{stats[d.key] || 0}</span
                        >
                    </div>
                {/each}
            </div>
        </div>

        <!-- Bottom Footer (Acceptance Rate) -->
        <div
            class="mt-3 pt-2.5 border-t border-border/70 flex items-center justify-between relative z-10 text-muted-foreground"
        >
            <div class="flex items-center gap-1.5">
                <Activity size={13} class="text-primary" />
                <span class="text-[10px] font-mono tabular-nums">
                    {stats.acceptanceRate}% Acceptance Rate
                </span>
            </div>

            <span
                class="text-[9.5px] font-mono tracking-wider uppercase text-primary font-semibold group-hover:underline"
                >Open Profile &rarr;</span
            >
        </div>
    {/if}
</GlassCard>
