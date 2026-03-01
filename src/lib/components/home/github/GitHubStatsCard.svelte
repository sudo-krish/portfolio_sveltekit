<!-- src/lib/components/home/github/GitHubStatsCard.svelte -->
<!-- GitHub Dark Theme: #0d1117 bg, #238636 green, #7ee787 highlight -->
<script lang="ts">
    import {
        Github,
        GitMerge,
        Star,
        Terminal,
        ArrowRight,
    } from "lucide-svelte";
    import { getSectionContent } from "$lib/data/section-content";

    const content = getSectionContent("github")!;

    const commits = [
        { sha: "a1b2c3d", msg: "feat: lakehouse architecture", time: "2h" },
        { sha: "e4f5g6h", msg: "fix: redshift query plan", time: "5h" },
        { sha: "i7j8k9l", msg: "refactor: CDC pipeline", time: "1d" },
    ];
</script>

<div
    class="pointer-events-auto w-full border border-white/10 bg-black/40 backdrop-blur-2xl rounded-3xl shadow-2xl relative overflow-hidden"
>
    <div
        class="absolute top-0 right-0 w-32 h-32 bg-[#238636]/20 blur-[50px]"
    ></div>

    <div class="relative z-10 p-6">
        <!-- Header -->
        <div class="mb-4 flex items-center gap-3">
            <div
                class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#238636]/30 bg-[#238636]/10 backdrop-blur-sm"
            >
                <span class="relative flex h-1.5 w-1.5">
                    <span
                        class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#238636] opacity-75"
                    ></span>
                    <span
                        class="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#238636]"
                    ></span>
                </span>
                <span
                    class="font-mono text-[10px] font-semibold text-[#7ee787] tracking-widest uppercase"
                    >GitHub</span
                >
            </div>
        </div>

        <h3
            class="text-2xl lg:text-3xl font-black mb-2 leading-tight text-white tracking-tight"
        >
            Building in
            <span
                class="text-transparent bg-clip-text bg-gradient-to-r from-[#238636] via-[#7ee787] to-[#238636]"
                >The Open.</span
            >
        </h3>

        <p
            class="text-[11px] text-muted-foreground leading-relaxed mb-4 line-clamp-2"
        >
            {content.introParagraph}
        </p>

        <!-- Metrics Row -->
        <div class="grid grid-cols-3 gap-3 mb-4">
            <div
                class="p-2 rounded-xl border border-white/[0.06] bg-white/[0.02] text-center"
            >
                <div
                    class="text-lg font-black text-white font-mono leading-none"
                >
                    42
                </div>
                <div
                    class="text-[8px] font-mono text-white/25 uppercase tracking-wider mt-0.5"
                >
                    Repos
                </div>
            </div>
            <div
                class="p-2 rounded-xl border border-white/[0.06] bg-white/[0.02] text-center"
            >
                <div
                    class="text-lg font-black text-[#7ee787] font-mono leading-none"
                >
                    4.2k
                </div>
                <div
                    class="text-[8px] font-mono text-white/25 uppercase tracking-wider mt-0.5"
                >
                    Commits
                </div>
            </div>
            <div
                class="p-2 rounded-xl border border-white/[0.06] bg-white/[0.02] text-center"
            >
                <div
                    class="text-lg font-black text-white font-mono leading-none"
                >
                    128
                </div>
                <div
                    class="text-[8px] font-mono text-white/25 uppercase tracking-wider mt-0.5"
                >
                    Stars
                </div>
            </div>
        </div>

        <!-- Compact Commit Log -->
        <div
            class="rounded-xl bg-black/40 border border-white/[0.06] p-3 font-mono text-[9px]"
        >
            <div
                class="flex items-center gap-2 text-[#7ee787]/60 mb-2 pb-1.5 border-b border-white/[0.06]"
            >
                <Terminal size={9} /><span class="tracking-wider">RECENT</span>
            </div>
            {#each commits as c}
                <div
                    class="flex items-start gap-2 text-white/30 mb-1 last:mb-0"
                >
                    <span class="text-[#7ee787]/70 font-bold shrink-0"
                        >{c.sha}</span
                    >
                    <span class="flex-1 truncate">{c.msg}</span>
                    <span class="text-white/15 shrink-0">{c.time}</span>
                </div>
            {/each}
        </div>
    </div>

    <!-- CTA -->
    <div class="px-6 py-2.5 border-t border-white/[0.06]">
        <a
            href={content.ctaSlug}
            class="group/cta flex items-center gap-2 text-[11px] font-bold text-[#7ee787]/70 hover:text-[#7ee787] transition-colors"
        >
            <span>{content.ctaLabel}</span>
            <ArrowRight
                size={12}
                class="group-hover/cta:translate-x-1 transition-transform"
            />
        </a>
    </div>
</div>
