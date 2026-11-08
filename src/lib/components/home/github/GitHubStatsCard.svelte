<script lang="ts">
    import { fade, slide } from "svelte/transition";
    import { onMount } from "svelte";
    import GlassCard from "$lib/components/ui/cards/GlassCard.svelte";
    import {
        Terminal,
        Github,
        Star,
        GitFork,
        Activity,
        GitCommit,
        GitPullRequest,
        ExternalLink,
    } from "lucide-svelte";
    import { codingStatsData } from "$lib/data/coding_stats";
    import {
        getGitHubStatsCached,
        getGitHubEventsCached,
    } from "$lib/services/github";
    import { page } from "$app/stores";

    let stats: any = null;
    let fallbackCommits = [
        {
            sha: "a1b2c3d",
            msg: "feat: lakehouse architecture implementation",
            time: "2h ago",
            type: "commit",
        },
        {
            sha: "e4f5g6h",
            msg: "fix: optimize redshift query execution plan",
            time: "5h ago",
            type: "pr",
        },
        {
            sha: "i7j8k9l",
            msg: "refactor: realtime CDC pipeline",
            time: "1d ago",
            type: "commit",
        },
    ];
    let commits: any[] = [];
    let loading = true;

    $: githubUsername = $page.data.githubUsername;
    $: githubProfileUrl = `https://github.com/${githubUsername}`;

    // PRE-FILL FROM SSR (Crucial for Crawlers avoiding 'Fetching...')
    $: {
        if ($page.data.githubStats && stats === null) {
            stats = $page.data.githubStats;
            loading = false;
        }
        if ($page.data.githubEvents && commits.length === 0) {
            commits = $page.data.githubEvents.length > 0 ? $page.data.githubEvents : fallbackCommits;
        }
    }

    onMount(async () => {
        // Only run isolated fetchers if SSR wasn't provided or failed
        if (stats && commits.length > 0) return;
        
        try {
            const [statsData, eventsData] = await Promise.all([
                getGitHubStatsCached(),
                getGitHubEventsCached(),
            ]);
            if (!stats && statsData && !statsData.error) stats = statsData;
            if (commits.length === 0 || commits === fallbackCommits) {
                if (eventsData && eventsData.length > 0) commits = eventsData;
                else commits = fallbackCommits;
            }
        } catch (e) {
            if (commits.length === 0) commits = fallbackCommits;
        } finally {
            loading = false;
        }
    });

    function handleImageError(e: Event) {
        const target = e.target as HTMLImageElement;
        target.src = "https://github.com/github.png";
    }
</script>

<GlassCard
    variant="default"
    accent={codingStatsData.github.accent}
    href={githubProfileUrl}
    target="_blank"
    rel="noopener noreferrer"
    class="group w-full h-full"
>
    <!-- Profile Header Row (Flat hairline ledger — zero nested cards) -->
    <div class="flex items-center justify-between pb-4 mb-4 border-b border-border/70 z-10">
        <div class="flex items-center gap-3.5">
            <div
                class="relative w-11 h-11 2xl:w-12 2xl:h-12 rounded-xl overflow-hidden border border-border/80 group-hover:border-primary/50 transition-colors duration-300 shrink-0"
            >
                <img
                    src={stats?.avatarUrl ||
                        `https://github.com/${githubUsername}.png`}
                    alt="{stats?.name || 'Krishnanand Anil'} - GitHub Data Engineering Portfolio Avatar"
                    class="w-full h-full object-cover"
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
                    {stats?.name || "Krishnanand Anil"}
                </span>
                <span
                    class="text-[11px] font-mono text-muted-foreground mt-0.5"
                >
                    @{githubUsername}
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
                >Loading Activity...</span
            >
        </div>
    {:else}
        <!-- 3-Column Tabular Telemetry Ledger (Flat hairline grid — zero nested cards) -->
        <div class="grid grid-cols-3 divide-x divide-border/70 pb-4 mb-4 border-b border-border/70 relative z-10">
            <!-- Daily Streak -->
            <div class="flex flex-col pr-3">
                <div class="flex items-center gap-1.5 text-muted-foreground mb-1.5">
                    <Activity size={12} class="text-success" />
                    <span class="text-[10px] font-mono uppercase tracking-wider">Streak</span>
                </div>
                <div class="flex items-baseline gap-1">
                    <span class="text-2xl 2xl:text-3xl font-bold text-foreground font-mono tabular-nums leading-none">
                        {stats?.contributionStreak || 0}
                    </span>
                    <span class="text-[10px] text-muted-foreground font-mono uppercase">d</span>
                </div>
            </div>

            <!-- Repositories -->
            <div class="flex flex-col px-3">
                <div class="flex items-center gap-1.5 text-muted-foreground mb-1.5">
                    <GitFork size={12} class="text-primary" />
                    <span class="text-[10px] font-mono uppercase tracking-wider">Repos</span>
                </div>
                <span class="text-2xl 2xl:text-3xl font-bold text-foreground font-mono tabular-nums leading-none">
                    {stats?.totalRepos || 0}
                </span>
            </div>

            <!-- Stars -->
            <div class="flex flex-col pl-3">
                <div class="flex items-center gap-1.5 text-muted-foreground mb-1.5">
                    <Star size={12} class="text-warning" />
                    <span class="text-[10px] font-mono uppercase tracking-wider">Stars</span>
                </div>
                <span class="text-2xl 2xl:text-3xl font-bold text-foreground font-mono tabular-nums leading-none">
                    {stats?.totalStars || 0}
                </span>
            </div>
        </div>

        <!-- Recent Activity Telemetry Log (Flat section — zero nested cards) -->
        <div class="font-mono text-[10px] 2xl:text-xs flex-1 flex flex-col z-10">
            <div
                class="flex items-center justify-between mb-3 font-semibold tracking-[0.12em] text-[10px] uppercase text-muted-foreground"
            >
                <div class="flex items-center gap-2">
                    <Terminal size={12} class="text-primary" /> Recent Pushes
                </div>
                <div
                    class="w-1.5 h-1.5 rounded-full bg-success animate-pulse"
                ></div>
            </div>

            <div class="flex flex-col gap-2.5 relative flex-1">
                <!-- Left timeline line -->
                <div
                    class="absolute left-[4.5px] top-1.5 bottom-1.5 w-px bg-border/80 z-0"
                ></div>

                {#each commits.slice(0, 3) as c}
                    <div
                        class="flex items-start gap-2.5 text-muted-foreground group-hover:text-foreground transition-colors relative z-10"
                    >
                        <div class="mt-0.5 shrink-0 bg-card py-0.5 relative">
                            {#if c.type === "pr"}
                                <GitPullRequest
                                    size={10}
                                    class="text-primary relative z-10"
                                />
                            {:else}
                                <GitCommit
                                    size={10}
                                    class="text-success relative z-10"
                                />
                            {/if}
                        </div>

                        <div class="flex flex-col gap-0.5 w-full min-w-0">
                            <div class="flex items-center justify-between gap-2">
                                <span
                                    class="text-primary font-bold text-[10px] 2xl:text-[11px] shrink-0 tabular-nums"
                                    >{c.sha}</span
                                >
                                <span
                                    class="text-muted-foreground text-[10px] shrink-0 tabular-nums"
                                    >{c.time}</span
                                >
                            </div>
                            <span
                                class="line-clamp-2 leading-snug text-[10px] 2xl:text-[11px] text-foreground/85"
                                >{c.msg}</span
                            >
                        </div>
                    </div>
                {/each}
            </div>
        </div>

        <!-- Bottom Footer -->
        <div
            class="mt-3 pt-2.5 border-t border-border/70 flex items-center justify-between relative z-10 text-muted-foreground"
        >
            <span class="text-[9.5px] font-mono uppercase tracking-wider">Production Commits</span>
            <span
                class="text-[9.5px] font-mono tracking-wider uppercase text-primary font-semibold group-hover:underline"
                >Open Profile &rarr;</span
            >
        </div>
    {/if}
</GlassCard>
