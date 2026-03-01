<!-- src/lib/components/home/github/GitHubStatsCard.svelte -->
<script lang="ts">
    import {
        Github,
        GitMerge,
        Star,
        GitPullRequest,
        Terminal,
    } from "lucide-svelte";

    const commits = [
        {
            sha: "a1b2c3d",
            msg: "feat: initialized lakehouse architecture",
            time: "2h ago",
        },
        {
            sha: "e4f5g6h",
            msg: "fix: optimized redshift query plan",
            time: "5h ago",
        },
        {
            sha: "i7j8k9l",
            msg: "refactor: streamlined CDC pipeline",
            time: "1d ago",
        },
        {
            sha: "m0n1o2p",
            msg: "chore: terraform state migration",
            time: "2d ago",
        },
    ];
</script>

<div
    class="w-full h-full flex flex-col rounded-2xl border border-white/[0.06] bg-black/40 backdrop-blur-2xl overflow-hidden group hover:border-green-500/20 transition-all duration-500"
>
    <!-- Header -->
    <div class="px-6 pt-6 pb-4 flex items-center justify-between">
        <div class="flex items-center gap-2">
            <Github size={14} class="text-green-400" />
            <span
                class="font-mono text-[10px] font-bold text-green-400/80 tracking-[0.2em] uppercase"
                >github.activity</span
            >
        </div>
        <div class="relative flex h-2 w-2">
            <span
                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60"
            ></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"
            ></span>
        </div>
    </div>

    <!-- Metrics Row -->
    <div class="px-6 pb-4 grid grid-cols-3 gap-4">
        <div class="flex flex-col">
            <span class="text-3xl font-black text-white font-mono leading-none"
                >42</span
            >
            <span
                class="text-[9px] font-mono text-white/25 uppercase tracking-wider mt-1"
                >Repos</span
            >
        </div>
        <div class="flex flex-col items-center">
            <span
                class="text-3xl font-black text-green-400 font-mono leading-none flex items-center gap-1"
            >
                <GitMerge size={16} class="text-green-500/60" />4.2k
            </span>
            <span
                class="text-[9px] font-mono text-white/25 uppercase tracking-wider mt-1"
                >Commits</span
            >
        </div>
        <div class="flex flex-col items-end">
            <span
                class="text-3xl font-black text-white font-mono leading-none flex items-center gap-1"
            >
                128<Star size={14} class="text-yellow-500/60" />
            </span>
            <span
                class="text-[9px] font-mono text-white/25 uppercase tracking-wider mt-1"
                >Stars</span
            >
        </div>
    </div>

    <!-- Activity Log -->
    <div
        class="flex-1 mx-6 mb-6 rounded-xl bg-black/40 border border-white/[0.04] p-4 font-mono text-[10px] overflow-hidden"
    >
        <div
            class="flex items-center gap-2 text-green-400/60 mb-3 pb-2 border-b border-white/[0.04]"
        >
            <Terminal size={10} />
            <span class="tracking-wider">RECENT_COMMITS</span>
        </div>
        <div class="flex flex-col gap-2">
            {#each commits as c}
                <div
                    class="flex items-start gap-3 text-white/30 hover:text-white/60 transition-colors"
                >
                    <span class="text-green-500/70 font-bold shrink-0"
                        >{c.sha}</span
                    >
                    <span class="flex-1 truncate">{c.msg}</span>
                    <span class="text-white/15 shrink-0">{c.time}</span>
                </div>
            {/each}
        </div>
    </div>
</div>
