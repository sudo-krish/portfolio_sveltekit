<!-- src/lib/components/home/experience/mobile/MobileCareerTimeline.svelte -->
<script lang="ts">
    import { Terminal, Cloud, Zap, Sparkles, ArrowRight } from "lucide-svelte";
    import { experienceData } from "$lib/data/experience";

    const getIcon = (name: string) => {
        switch (name) {
            case "Terminal":
                return Terminal;
            case "Cloud":
                return Cloud;
            case "Zap":
                return Zap;
            case "Sparkles":
                return Sparkles;
            default:
                return Terminal;
        }
    };
</script>

<div class="w-full flex flex-col gap-3 relative z-10">
    <!-- Timeline Component -->
    <div
        class="w-full p-4 rounded-[1.25rem] bg-[#050505]/60 backdrop-blur-md border border-white/[0.05] relative overflow-hidden"
    >
        <div
            class="absolute top-6 bottom-6 left-[29px] w-px bg-gradient-to-b from-blue-500/40 via-violet-500/20 to-transparent"
        ></div>

        <div class="flex flex-col gap-4">
            {#each experienceData.milestones as m, i}
                <div class="relative flex items-start gap-3">
                    <div
                        class="relative z-10 flex-shrink-0 w-7 h-7 rounded-lg border flex items-center justify-center transition-all duration-300 {i ===
                        experienceData.milestones.length - 1
                            ? 'bg-amber-500/15 border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                            : 'bg-black/60 border-white/10'}"
                    >
                        <svelte:component
                            this={getIcon(m.iconName)}
                            size={12}
                            style="color: {m.color}"
                        />
                        {#if i === experienceData.milestones.length - 1}
                            <div
                                class="absolute -inset-0.5 rounded-lg bg-amber-500/20 animate-ping opacity-40"
                            ></div>
                        {/if}
                    </div>

                    <div class="flex flex-col pt-0.5">
                        <div class="flex items-center gap-1.5 mb-0.5">
                            <span
                                class="font-mono text-[10px] font-bold"
                                style="color: {m.color}">{m.year}</span
                            >
                            <span class="text-white/20">·</span>
                            <span class="text-[11px] font-bold text-white/90"
                                >{m.label}</span
                            >
                        </div>
                        <span
                            class="text-[9px] text-white/40 font-mono leading-tight"
                            >{m.role}</span
                        >
                    </div>
                </div>
            {/each}
        </div>
    </div>

    <!-- Action Button -->
    <a
        href={experienceData.ui.cta.href}
        class="w-full p-4 rounded-[1.25rem] bg-[#050505]/60 backdrop-blur-md border border-white/[0.05] flex items-center justify-between group overflow-hidden"
    >
        <div class="flex flex-col">
            <span
                class="font-mono text-[9px] text-blue-400 uppercase tracking-widest mb-1 block"
                >Deep Dive</span
            >
            <span class="text-sm font-bold text-white">Explore Full Resume</span
            >
        </div>
        <div
            class="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center"
        >
            <ArrowRight size={14} class="text-white/60" />
        </div>
    </a>
</div>
