<!-- src/lib/components/home/github/GitHubStatsCard.svelte -->
<!-- GitHub Dark Theme: #238636 green, #7ee787 highlight -->
<script lang="ts">
    import { onMount } from "svelte";
    import { Terminal } from "lucide-svelte";
    import { getSectionContent } from "$lib/data/section-content";
    import {
        getGitHubStatsCached,
        getGitHubEventsCached,
    } from "$lib/services/github";
    import GlassPanel from "$lib/components/ui/GlassPanel.svelte";
    import StatusBadge from "$lib/components/ui/StatusBadge.svelte";
    import CtaLink from "$lib/components/ui/CtaLink.svelte";

    const content = getSectionContent("github")!;

    let stats: any = null;
    let fallbackCommits = [
        { sha: "a1b2c3d", msg: "feat: lakehouse architecture", time: "2h" },
        { sha: "e4f5g6h", msg: "fix: redshift query plan", time: "5h" },
        { sha: "i7j8k9l", msg: "refactor: CDC pipeline", time: "1d" },
    ];
    let commits: any[] = [];
    let loading = true;

    onMount(async () => {
        try {
            const [statsData, eventsData] = await Promise.all([
                getGitHubStatsCached(),
                getGitHubEventsCached(),
            ]);

            if (statsData && !statsData.error) {
                stats = statsData;
            }
            if (eventsData && eventsData.length > 0) {
                commits = eventsData;
            } else {
                commits = fallbackCommits;
            }
        } catch (e) {
            console.error("Failed to fetch Github data for card", e);
            commits = fallbackCommits;
        } finally {
            loading = false;
        }
    });
</script>

<GlassPanel
    glow="#238636"
    className="pointer-events-auto w-full rounded-3xl relative overflow-hidden h-full flex flex-col"
>
    <!-- Ambient Inner Glow -->
    <div
        class="absolute -top-10 -left-10 w-40 h-40 bg-[#238636]/10 blur-[50px] rounded-full pointer-events-none mix-blend-screen z-0"
    ></div>

    <div class="p-6 sm:p-8 relative z-10 flex-1 flex flex-col">
        <div class="mb-5 flex items-center gap-4">
            <StatusBadge color="#238636" label="GitHub" />
        </div>

        <h3
            class="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 leading-[1.1] text-white tracking-tighter"
        >
            Building in
            <span
                class="text-transparent bg-clip-text bg-gradient-to-r from-[#238636] via-[#7ee787] to-[#238636]"
                >The Open.</span
            >
        </h3>

        <p
            class="text-sm sm:text-base text-white/70 leading-relaxed font-light mb-6 line-clamp-2"
        >
            {content.introParagraph}
        </p>

        <!-- Metrics -->
        <div class="grid grid-cols-3 gap-3 mb-6 mt-auto">
            <div
                class="p-3 rounded-2xl border border-white/5 bg-white/5 text-center shadow-inner hover:bg-white/10 transition-colors"
            >
                <div
                    class="text-xl sm:text-2xl font-black text-white font-mono leading-none mb-1 flex items-center justify-center min-h-[24px]"
                >
                    {#if loading}
                        <div
                            class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
                        ></div>
                    {:else}
                        {stats?.totalRepos || 0}
                    {/if}
                </div>
                <div
                    class="text-[9px] sm:text-[10px] font-mono text-white/40 uppercase tracking-widest"
                >
                    Repos
                </div>
            </div>
            <div
                class="p-3 rounded-2xl border border-[#7ee787]/10 bg-[#7ee787]/5 text-center shadow-inner hover:bg-[#7ee787]/10 transition-colors"
            >
                <div
                    class="text-xl sm:text-2xl font-black text-[#7ee787] font-mono leading-none mb-1 flex items-center justify-center min-h-[24px]"
                >
                    {#if loading}
                        <div
                            class="w-4 h-4 border-2 border-[#7ee787]/30 border-t-[#7ee787] rounded-full animate-spin"
                        ></div>
                    {:else}
                        {stats?.contributionStreak || 0}
                    {/if}
                </div>
                <div
                    class="text-[9px] sm:text-[10px] font-mono text-[#7ee787]/60 uppercase tracking-widest leading-tight"
                >
                    Day Streak
                </div>
            </div>
            <div
                class="p-3 rounded-2xl border border-white/5 bg-white/5 text-center shadow-inner hover:bg-white/10 transition-colors"
            >
                <div
                    class="text-xl sm:text-2xl font-black text-white font-mono leading-none mb-1 flex items-center justify-center min-h-[24px]"
                >
                    {#if loading}
                        <div
                            class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
                        ></div>
                    {:else}
                        {stats?.totalStars || 0}
                    {/if}
                </div>
                <div
                    class="text-[9px] sm:text-[10px] font-mono text-white/40 uppercase tracking-widest"
                >
                    Stars
                </div>
            </div>
        </div>

        <!-- Commit Log -->
        <div
            class="rounded-2xl bg-black/40 border border-white/5 p-4 sm:p-5 font-mono text-[10px] sm:text-xs shadow-inner min-h-[120px]"
        >
            <div
                class="flex items-center gap-2 text-[#7ee787]/60 mb-3 pb-2 border-b border-white/5"
            >
                <Terminal size={12} class="text-[#7ee787]/80" /><span
                    class="tracking-[0.2em] font-bold">RECENT PUSHES</span
                >
            </div>
            <div class="flex flex-col gap-2.5 relative">
                {#if loading}
                    <div class="flex items-center justify-center py-4">
                        <div
                            class="w-4 h-4 border-2 border-[#7ee787]/30 border-t-[#7ee787] rounded-full animate-spin"
                        ></div>
                    </div>
                {:else}
                    {#each commits.slice(0, 3) as c}
                        <div
                            class="flex items-start gap-3 sm:gap-4 text-white/40 hover:text-white/60 transition-colors group"
                            title={c.repo ? `Pushed to ${c.repo}` : ""}
                        >
                            <span
                                class="text-[#7ee787]/70 font-bold shrink-0 group-hover:text-[#7ee787]/90 transition-colors"
                                >{c.sha}</span
                            >
                            <span class="flex-1 truncate">{c.msg}</span>
                            <span
                                class="text-white/20 shrink-0 group-hover:text-white/40 transition-colors font-medium text-[9px]"
                                >{c.time}</span
                            >
                        </div>
                    {/each}
                {/if}
            </div>
        </div>

        <div class="mt-6 sm:mt-8 pt-4">
            <CtaLink
                href={content.ctaSlug}
                label={content.ctaLabel}
                color="#238636"
            />
        </div>
    </div>
</GlassPanel>
