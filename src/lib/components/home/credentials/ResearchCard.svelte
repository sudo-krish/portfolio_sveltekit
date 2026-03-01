<!-- src/lib/components/home/credentials/ResearchCard.svelte -->
<script lang="ts">
    import { BookOpen, ExternalLink, Calendar, Award } from "lucide-svelte";
    import { getResearchPapers } from "$lib/data/portfolio-data";

    const papers = getResearchPapers();
</script>

<div
    class="w-full h-full flex flex-col rounded-2xl border border-white/[0.06] bg-black/40 backdrop-blur-2xl overflow-hidden group hover:border-violet-500/20 transition-all duration-500"
>
    <!-- Header -->
    <div class="px-6 pt-6 pb-4 flex items-center justify-between">
        <div class="flex items-center gap-2">
            <BookOpen size={14} class="text-violet-400" />
            <span
                class="font-mono text-[10px] font-bold text-violet-400/80 tracking-[0.2em] uppercase"
                >research.archive</span
            >
        </div>
        <div
            class="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20"
        >
            <span class="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse"
            ></span>
            <span class="text-[9px] font-bold text-violet-400 tracking-wider"
                >PUBLISHED</span
            >
        </div>
    </div>

    <!-- Papers List -->
    <div class="flex-1 px-6 pb-4 flex flex-col gap-3 overflow-y-auto">
        {#each papers as paper, i}
            <a
                href={paper.url}
                target="_blank"
                class="group/item flex flex-col gap-2 p-4 rounded-xl border border-white/[0.04] bg-white/[0.02] hover:bg-white/[0.05] hover:border-violet-500/20 transition-all duration-300"
            >
                <!-- Paper ID & Link -->
                <div class="flex items-center justify-between">
                    <span
                        class="px-2 py-0.5 rounded text-[9px] font-mono text-violet-400/70 bg-violet-500/[0.06] border border-violet-500/10"
                    >
                        PAPER-{i + 1}
                    </span>
                    <ExternalLink
                        size={11}
                        class="text-white/10 group-hover/item:text-violet-400/60 transition-opacity"
                    />
                </div>

                <!-- Title -->
                <h4
                    class="text-xs font-bold text-white/70 group-hover/item:text-white/90 leading-relaxed transition-colors"
                >
                    {paper.title}
                </h4>

                <!-- Meta -->
                <div
                    class="flex items-center gap-3 pt-2 border-t border-white/[0.04]"
                >
                    <div
                        class="flex items-center gap-1.5 text-[10px] text-white/25"
                    >
                        <Award size={10} class="text-violet-400/50" />
                        <span>{paper.journal}</span>
                    </div>
                    <div
                        class="flex items-center gap-1.5 text-[10px] text-white/20 ml-auto"
                    >
                        <Calendar size={10} />
                        <span class="font-mono"
                            >{new Date(paper.datePublished).getFullYear()}</span
                        >
                    </div>
                </div>
            </a>
        {/each}
    </div>

    <!-- Footer -->
    <div
        class="px-6 py-3 border-t border-white/[0.04] grid grid-cols-3 gap-2 text-center"
    >
        <div>
            <div class="text-[10px] text-white/20 uppercase tracking-wider">
                Count
            </div>
            <div class="text-xs font-bold text-white/60 font-mono">
                {papers.length}
            </div>
        </div>
        <div>
            <div class="text-[10px] text-white/20 uppercase tracking-wider">
                Impact
            </div>
            <div class="text-xs font-bold text-white/60 font-mono">High</div>
        </div>
        <div>
            <div class="text-[10px] text-white/20 uppercase tracking-wider">
                Status
            </div>
            <div class="text-xs font-bold text-violet-400/80 font-mono">
                Active
            </div>
        </div>
    </div>
</div>
