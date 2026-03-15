<script lang="ts">
    import { onMount } from "svelte";
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

    const githubUsername = "sudo-krish";
    const githubProfileUrl = `https://github.com/${githubUsername}`;

    onMount(async () => {
        try {
            const [statsData, eventsData] = await Promise.all([
                getGitHubStatsCached(),
                getGitHubEventsCached(),
            ]);
            if (statsData && !statsData.error) stats = statsData;
            if (eventsData && eventsData.length > 0) commits = eventsData;
            else commits = fallbackCommits;
        } catch (e) {
            commits = fallbackCommits;
        } finally {
            loading = false;
        }
    });

    function handleImageError(e: Event) {
        const target = e.target as HTMLImageElement;
        target.src = "https://github.com/github.png";
    }
</script>

<a
    href={githubProfileUrl}
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
        class="absolute inset-y-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-[#22c55e]/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500"
    ></div>

    <!-- Ambient organic green glow behind the UI -->
    <div
        class="absolute -right-20 -top-20 w-64 h-64 rounded-full blur-[80px] opacity-10 group-hover:opacity-25 transition-opacity duration-1000 pointer-events-none"
        style="background-color: {codingStatsData.github.accent}"
    ></div>

    <div
        class="absolute -left-20 -bottom-20 w-64 h-64 rounded-full blur-[80px] opacity-[0.05] group-hover:opacity-15 transition-opacity duration-1000 pointer-events-none"
        style="background-color: {codingStatsData.github.accent}"
    ></div>

    <!-- Profile Header Row -->
    <div
        class="flex items-center justify-between mb-6 relative z-10 bg-muted/40 p-3 2xl:p-4 rounded-[1.25rem] border border-border shadow-inner backdrop-blur-md"
    >
        <div class="flex items-center gap-3.5 2xl:gap-4">
            <!-- Profile Picture -->
            <div
                class="relative w-12 h-12 2xl:w-14 2xl:h-14 rounded-full bg-gradient-to-br from-[#22c55e] to-[#22c55e]/20 p-[2px] shadow-[0_0_15px_hsl(var(--success)/)] group-hover:shadow-[0_0_25px_hsl(var(--success)/)] transition-shadow duration-500"
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
                    />
                </div>
            </div>
            <!-- Name & Username -->
            <div class="flex flex-col">
                <span
                    class="text-[clamp(14px,1.2vw,18px)] font-bold text-foreground leading-tight drop-shadow-sm group-hover:text-[#22c55e] transition-colors duration-300"
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
            class="flex items-center justify-center w-8 h-8 rounded-full bg-muted border border-border group-hover:bg-[#22c55e]/10 group-hover:border-[#22c55e]/30 transition-colors duration-300"
        >
            <ExternalLink
                size={14}
                class="text-muted-foreground group-hover:text-[#22c55e] transition-colors duration-300"
            />
        </div>
    </div>

    {#if loading}
        <!-- Loading State for Content Body -->
        <div
            class="flex-1 flex flex-col items-center justify-center py-12 relative z-10 gap-4"
        >
            <div
                class="w-8 h-8 border-2 border-[#22c55e]/30 border-t-[#22c55e] rounded-full animate-spin"
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
            <div
                class="col-span-2 sm:col-span-1 flex flex-col justify-center p-4 2xl:p-5 rounded-[1.25rem] bg-gradient-to-br from-[#22c55e]/10 to-transparent border border-[#22c55e]/20 shadow-inner group/streak relative overflow-hidden backdrop-blur-md"
            >
                <div
                    class="absolute right-0 top-0 w-24 h-24 bg-[radial-gradient(circle_at_top_right,hsl(var(--success)/)_0,transparent_70%)]"
                ></div>
                <div
                    class="flex items-center justify-between mb-3 text-[#22c55e]/80 relative z-10"
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
                        class="text-3xl 2xl:text-4xl font-black text-foreground font-mono leading-none drop-shadow-[0_0_15px_hsl(var(--success)/)] group-hover/streak:text-[#22c55e] transition-colors duration-300"
                    >
                        {stats?.contributionStreak || 0}
                    </span>
                    <span
                        class="text-[10px] text-muted-foreground font-mono uppercase"
                        >Days</span
                    >
                </div>
            </div>

            <!-- Secondary Metrics Grid -->
            <div
                class="col-span-2 sm:col-span-1 grid grid-cols-2 gap-3 2xl:gap-4"
            >
                <!-- Repositories -->
                <div
                    class="flex flex-col justify-center p-3 2xl:p-4 rounded-xl bg-gradient-to-br from-card/80 to-foreground/[0.02] border border-foreground/5 shadow-[inset_0_4px_20px_rgba(0,0,0,0.5)] hover:bg-foreground/[0.04] transition-colors group/card overflow-hidden relative"
                >
                    <div
                        class="absolute inset-0 bg-gradient-to-b from-foreground/[0.02] to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity"
                    ></div>
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
                </div>

                <!-- Stars -->
                <div
                    class="flex flex-col justify-center p-3 2xl:p-4 rounded-xl bg-gradient-to-br from-card/80 to-foreground/[0.02] border border-foreground/5 shadow-[inset_0_4px_20px_rgba(0,0,0,0.5)] hover:bg-[#eab308]/5 hover:border-[#eab308]/20 transition-colors group/stars overflow-hidden relative"
                >
                    <div
                        class="absolute inset-0 bg-gradient-to-b from-[#eab308]/[0.02] to-transparent opacity-0 group-hover/stars:opacity-100 transition-opacity"
                    ></div>
                    <div
                        class="flex items-center gap-1.5 text-muted-foreground mb-2 group-hover/stars:text-[#eab308] transition-colors relative z-10"
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
                        class="text-xl 2xl:text-2xl font-black text-foreground font-mono leading-none group-hover/stars:text-[#eab308] transition-colors relative z-10"
                    >
                        {stats?.totalStars || 0}
                    </span>
                </div>
            </div>
        </div>

        <!-- Recent Activity Console log -->
        <div
            class="rounded-[1.25rem] bg-gradient-to-b from-card to-card/90 border border-border p-4 2xl:p-5 font-mono text-[10px] 2xl:text-xs shadow-inner relative z-10 flex-1 flex flex-col backdrop-blur-md hover:border-primary/30 transition-colors duration-300"
        >
            <div
                class="flex items-center justify-between mb-4 pb-2.5 border-b border-border font-bold tracking-[0.1em] text-[9px] uppercase"
            >
                <div class="flex items-center gap-2 text-muted-foreground">
                    <Terminal size={12} class="text-[#22c55e]" /> Recent Pushes
                </div>
                <div
                    class="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse shadow-[0_0_8px_hsl(var(--success)/)]"
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
                                    class="text-[#8b5cf6] relative z-10 drop-shadow-[0_0_2px_rgba(139,92,246,0.6)]"
                                />
                            {:else}
                                <GitCommit
                                    size={10}
                                    class="text-[#22c55e] relative z-10 drop-shadow-[0_0_2px_hsl(var(--success)/)]"
                                />
                            {/if}
                        </div>

                        <!-- Content -->
                        <div class="flex flex-col gap-0.5 w-full min-w-0">
                            <div
                                class="flex items-center justify-between gap-2"
                            >
                                <span
                                    class="text-[#22c55e] font-bold text-[10px] 2xl:text-[11px] shrink-0 group-hover/commit:text-[#4ade80] transition-colors"
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
        </div>

        <!-- Bottom Footer -->
        <div
            class="mt-4 pt-3 border-t border-border flex items-center justify-end relative z-10 text-muted-foreground"
        >
            <div
                class="flex items-center gap-2 group-hover:text-[#22c55e] transition-colors duration-300"
            >
                <span
                    class="text-[9px] 2xl:text-[10px] font-mono tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-2 group-hover:translate-x-0"
                    >View Profile on GitHub</span
                >
            </div>
        </div>
    {/if}
</a>
