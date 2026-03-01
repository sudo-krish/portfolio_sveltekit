<!-- src/lib/components/home/experience/CareerTimelineCard.svelte -->
<script lang="ts">
    import { GitCommit, ArrowUpRight, GitBranch, Rocket } from "lucide-svelte";
    import { getAllCompanies, getPersonalInfo } from "$lib/data/portfolio-data";

    const companies = getAllCompanies();
    const personal = getPersonalInfo();

    const timeline = companies.map((company) => ({
        company: company.name,
        role: company.position,
        version: company.position.includes("Senior")
            ? "v3.0"
            : company.position.includes("Associate")
              ? "v1.0"
              : "v2.0",
        year:
            company.duration.split(" ")[1] || String(new Date().getFullYear()),
        current: company.current,
        promoted: company.roles && company.roles.length > 1,
    }));
</script>

<div
    class="w-full h-full flex flex-col rounded-2xl border border-white/[0.06] bg-black/40 backdrop-blur-2xl overflow-hidden group hover:border-pink-500/20 transition-all duration-500"
>
    <!-- Header -->
    <div class="px-6 pt-6 pb-4 flex items-center justify-between">
        <div class="flex items-center gap-2">
            <GitBranch size={14} class="text-pink-400" />
            <span
                class="font-mono text-[10px] font-bold text-pink-400/80 tracking-[0.2em] uppercase"
                >git log --oneline</span
            >
        </div>
        <div
            class="px-2.5 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 flex items-center gap-1.5"
        >
            <Rocket size={10} class="text-pink-400" />
            <span class="text-[9px] font-bold text-pink-400 tracking-wider"
                >{personal.yearsOfExperience}+ YOE</span
            >
        </div>
    </div>

    <!-- Commit History -->
    <div class="flex-1 px-6 pb-4 overflow-y-auto relative">
        <div
            class="absolute left-[2.1rem] top-0 bottom-4 w-px bg-white/[0.06]"
        ></div>

        <div class="flex flex-col gap-4">
            {#each timeline as stage}
                <div class="relative flex items-start gap-4 group/item">
                    <!-- Commit Node -->
                    <div class="relative z-10 flex-shrink-0 mt-1">
                        <div
                            class="w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300
              {stage.current
                                ? 'bg-pink-500/20 border-pink-500 text-pink-400 shadow-[0_0_12px_rgba(236,72,153,0.4)]'
                                : 'bg-black/60 border-white/10 text-white/30 group-hover/item:border-white/30'}"
                        >
                            <GitCommit size={12} />
                        </div>
                        {#if stage.current}
                            <div
                                class="absolute -inset-1 rounded-full bg-pink-500/20 animate-ping opacity-50"
                            ></div>
                        {/if}
                    </div>

                    <!-- Content -->
                    <div class="flex-1 min-w-0 pt-0.5">
                        <div class="flex items-center gap-2 mb-0.5">
                            <span
                                class="text-xs font-bold text-white/90 truncate"
                                >{stage.company}</span
                            >
                            <span
                                class="ml-auto text-[10px] font-mono text-white/20 bg-white/[0.04] px-1.5 py-0.5 rounded shrink-0"
                                >{stage.year}</span
                            >
                        </div>
                        <p class="text-[11px] text-white/35 truncate mb-1.5">
                            {stage.role}
                        </p>
                        <div class="flex items-center gap-2">
                            <span
                                class="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold
                {stage.current
                                    ? 'bg-pink-500/10 text-pink-400 border border-pink-500/20'
                                    : 'bg-white/[0.04] text-white/30 border border-white/[0.04]'}"
                            >
                                {stage.version}
                            </span>
                            {#if stage.promoted}
                                <span
                                    class="flex items-center gap-1 text-[9px] text-green-400 font-bold"
                                >
                                    <ArrowUpRight size={10} /> Promoted
                                </span>
                            {/if}
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>

    <!-- Footer -->
    <div
        class="px-6 py-3 border-t border-white/[0.04] flex justify-between text-[10px] text-white/20 font-mono"
    >
        <span>HEAD → origin/main</span>
        <span>{timeline.length} commits</span>
    </div>
</div>
