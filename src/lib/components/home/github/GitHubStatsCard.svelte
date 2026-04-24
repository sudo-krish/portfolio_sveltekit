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

    <!-- Profile Header Row -->
    <GlassCard variant="inset" hover={false} class="flex items-center justify-between mb-6 !p-3 2xl:!p-4 z-10">
        <div class="flex items-center gap-3.5 2xl:gap-4">
            <!-- Profile Picture -->
            <div
                class="relative w-12 h-12 2xl:w-14 2xl:h-14 rounded-full bg-gradient-to-br from-success to-success/20 p-[2px] shadow-[0_0_15px_hsl(var(--success)/)] group-hover:shadow-[0_0_25px_hsl(var(--success)/)] transition-shadow duration-500"
            >
                <div
                    class="w-full h-full bg-background rounded-full overflow-hidden border-2 border-transparent"
                >
                    <img
                        src={stats?.avatarUrl ||
                            `https://github.com/${githubUsername}.png`}
                        alt="{stats?.name || 'Krishnanand Anil'} - GitHub Data Engineering Portfolio Avatar"
                        class="w-full h-full object-cover rounded-full"
                        onerror={handleImageError}
                        loading="lazy"
                        width="56"
                        height="56"
                    />
                </div>
            </div>
            <!-- Name & Username -->
            <div class="flex flex-col">
                <span
                    class="text-[clamp(14px,1.2vw,18px)] font-bold text-foreground leading-tight drop-shadow-sm group-hover:text-foreground transition-colors duration-300"
                >
                    {stats?.name || "Krishnanand Anil"}
                </span>
                <span
                    class="text-[11px] 2xl:text-xs font-mono text-muted-foreground mt-0.5"
                >
                    @{githubUsername}
                </span>
            </div>
        </div>

        <!-- External Link Icon (Replaces Active indicator) -->
        <div
            class="flex items-center justify-center w-8 h-8 rounded-full bg-muted border border-border group-hover:bg-success/10 group-hover:border-success/30 transition-colors duration-300"
        >
            <ExternalLink
                size={14}
                class="text-muted-foreground group-hover:text-foreground transition-colors duration-300"
            />
        </div>
    </GlassCard>

    {#if loading}
        <!-- Loading State for Content Body -->
        <div
            class="flex-1 flex flex-col items-center justify-center py-12 relative z-10 gap-4"
        >
            <div
                class="w-8 h-8 border-2 border-success/30 border-t-success rounded-full animate-spin"
            ></div>
            <span
                class="text-xs font-mono text-muted-foreground animate-pulse uppercase tracking-widest"
                >Loading Activity...</span
            >
        </div>
    {:else}
        <!-- Core Metrics Dashboard Layout -->
        <div class="grid grid-cols-2 gap-3 2xl:gap-4 mb-5 relative z-10">
            <!-- Primary Metric: The Streak -->
            <GlassCard
                variant="inset"
                class="col-span-2 sm:col-span-1 flex flex-col justify-center p-4 2xl:p-5 !bg-gradient-to-br from-success/10 to-transparent border-success/20 group/streak relative overflow-hidden"
            >
                <div
                    class="absolute right-0 top-0 w-24 h-24 bg-[radial-gradient(circle_at_top_right,hsl(var(--success)/)_0,transparent_70%)]"
                ></div>
                <div
                    class="flex items-center justify-between mb-3 text-foreground/80 relative z-10"
                >
                    <Activity
                        size={14}
                        class="group-hover/streak:animate-pulse"
                    />
                    <span
                        class="text-[9px] 2xl:text-[10px] font-mono uppercase tracking-widest font-bold"
                        >Daily Streak</span
                    >
                </div>
                <div class="flex items-baseline gap-1.5 relative z-10">
                    <span
                        class="text-3xl 2xl:text-4xl font-black text-foreground font-mono leading-none drop-shadow-[0_0_15px_hsl(var(--success)/)] group-hover/streak:text-foreground transition-colors duration-300"
                    >
                        {stats?.contributionStreak || 0}
                    </span>
                    <span
                        class="text-[10px] text-muted-foreground font-mono uppercase"
                        >Days</span
                    >
                </div>
            </GlassCard>

            <!-- Secondary Metrics Grid -->
            <div
                class="col-span-2 sm:col-span-1 grid grid-cols-2 gap-3 2xl:gap-4"
            >
                <!-- Repositories -->
                <GlassCard
                    variant="inset"
                    class="flex flex-col justify-center p-3 2xl:p-4 group/card"
                >
                    <div
                        class="flex items-center gap-1.5 text-muted-foreground mb-2 relative z-10 group-hover/card:text-foreground transition-colors"
                    >
                        <GitFork size={12} />
                        <span
                            class="text-[9px] font-mono uppercase tracking-widest"
                            >Repos</span
                        >
                    </div>
                    <span
                        class="text-xl 2xl:text-2xl font-black text-foreground font-mono leading-none relative z-10"
                    >
                        {stats?.totalRepos || 0}
                    </span>
                </GlassCard>

                <!-- Stars -->
                <GlassCard
                    variant="inset"
                    class="flex flex-col justify-center p-3 2xl:p-4 group/stars hover:border-[#eab308]/20 transition-colors"
                >
                    <div
                        class="flex items-center gap-1.5 text-muted-foreground mb-2 group-hover/stars:text-foreground transition-colors relative z-10"
                    >
                        <Star
                            size={12}
                            class="group-hover/stars:fill-[#eab308]/20"
                        />
                        <span
                            class="text-[9px] font-mono uppercase tracking-widest"
                            >Stars</span
                        >
                    </div>
                    <span
                        class="text-xl 2xl:text-2xl font-black text-foreground font-mono leading-none group-hover/stars:text-foreground transition-colors relative z-10"
                    >
                        {stats?.totalStars || 0}
                    </span>
                </GlassCard>
            </div>
        </div>

        <!-- Recent Activity Console log -->
        <GlassCard variant="inset" hover={false} class="font-mono text-[10px] 2xl:text-xs flex-1 flex flex-col hover:border-foreground/[0.12] !p-4 2xl:!p-5 z-10">
            <div
                class="flex items-center justify-between mb-4 pb-2.5 border-b border-border font-bold tracking-[0.1em] text-[9px] uppercase"
            >
                <div class="flex items-center gap-2 text-muted-foreground">
                    <Terminal size={12} class="text-foreground" /> Recent Pushes
                </div>
                <div
                    class="w-2 h-2 rounded-full bg-success animate-pulse shadow-[0_0_8px_hsl(var(--success)/)]"
                ></div>
            </div>

            <div class="flex flex-col gap-3 relative mt-1 flex-1">
                <!-- Left timeline line -->
                <div
                    class="absolute left-[5px] top-1.5 bottom-1.5 w-[1px] bg-border z-0"
                ></div>

                {#each commits.slice(0, 3) as c}
                    <div
                        class="flex items-start gap-3 text-muted-foreground hover:text-foreground transition-colors group/commit relative z-10 cursor-pointer"
                    >
                        <!-- Timeline Node -->
                        <div
                            class="mt-0.5 shrink-0 bg-background py-0.5 relative"
                        >
                            <div
                                class="absolute inset-0 bg-secondary rounded-full scale-0 group-hover/commit:scale-150 transition-transform duration-300"
                            ></div>
                            {#if c.type === "pr"}
                                <GitPullRequest
                                    size={10}
                                    class="text-foreground relative z-10 drop-shadow-[0_0_2px_rgba(139,92,246,0.6)]"
                                />
                            {:else}
                                <GitCommit
                                    size={10}
                                    class="text-foreground relative z-10 drop-shadow-[0_0_2px_hsl(var(--success)/)]"
                                />
                            {/if}
                        </div>

                        <!-- Content -->
                        <div class="flex flex-col gap-0.5 w-full min-w-0">
                            <div
                                class="flex items-center justify-between gap-2"
                            >
                                <span
                                    class="text-foreground font-bold text-[10px] 2xl:text-[11px] shrink-0 group-hover/commit:text-foreground transition-colors"
                                    >{c.sha}</span
                                >
                                <span
                                    class="text-muted-foreground text-[8px] 2xl:text-[9px] shrink-0 font-sans tracking-wide"
                                    >{c.time}</span
                                >
                            </div>
                            <span
                                class="truncate text-[10px] 2xl:text-[11px] text-muted-foreground group-hover/commit:text-foreground transition-colors"
                                >{c.msg}</span
                            >
                        </div>
                    </div>
                {/each}
            </div>
        </GlassCard>

        <!-- Bottom Footer -->
        <div
            class="mt-4 pt-3 border-t border-border flex items-center justify-end relative z-10 text-muted-foreground"
        >
            <div
                class="flex items-center gap-2 group-hover:text-foreground transition-colors duration-300"
            >
                <span
                    class="text-[9px] 2xl:text-[10px] font-mono tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-2 group-hover:translate-x-0"
                    >View Profile on GitHub</span
                >
            </div>
        </div>
    {/if}
</GlassCard>
