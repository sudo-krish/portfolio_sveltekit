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
        class="w-full p-4 rounded-[1.25rem] bg-card/60 backdrop-blur-md border border-border relative overflow-hidden"
    >
        <div
            class="absolute top-6 bottom-6 left-[29px] w-px bg-gradient-to-b from-primary via-violet-500/20 to-border"
        ></div>

        <div class="flex flex-col gap-4">
            {#each experienceData.milestones as m, i}
                <div class="relative flex items-start gap-3">
                    <div
                        class="relative z-10 flex-shrink-0 w-7 h-7 rounded-lg border flex items-center justify-center transition-all duration-300 {i ===
                        experienceData.milestones.length - 1
                            ? 'bg-highlight/15 border-highlight/40 shadow-[var(--glow-accent)]'
                            : 'bg-muted border-border'}"
                    >
                        <svelte:component
                            this={getIcon(m.iconName)}
                            size={12}
                            style="color: {m.color}"
                        />
                        {#if i === experienceData.milestones.length - 1}
                            <div
                                class="absolute -inset-0.5 rounded-lg bg-highlight/20 animate-ping opacity-40"
                            ></div>
                        {/if}
                    </div>

                    <div class="flex flex-col pt-0.5">
                        <div class="flex items-center gap-1.5 mb-0.5">
                            <span
                                class="font-mono text-[10px] font-bold"
                                style="color: {m.color}">{m.year}</span
                            >
                            <span class="text-muted-foreground">·</span>
                            <span class="text-[11px] font-bold text-foreground"
                                >{m.label}</span
                            >
                        </div>
                        <span
                            class="text-[9px] text-muted-foreground font-mono leading-tight"
                            >{m.role}</span
                        >
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>
