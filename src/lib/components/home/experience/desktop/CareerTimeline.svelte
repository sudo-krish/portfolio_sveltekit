<!-- src/lib/components/home/experience/desktop/CareerTimeline.svelte -->
<script lang="ts">
    import { Terminal, Cloud, Zap, Sparkles } from "lucide-svelte";
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

<!-- Outer Container -->
<div class="w-full flex flex-col relative z-10" style="padding-top: 2cqi; padding-bottom: 3cqi;">
    <!-- Floating Timeline Track Container -->
    <div class="relative w-full">
        <!-- The Track Line -->
        <div
            class="absolute top-[2.5rem] left-[10%] right-[10%] h-0.5 bg-foreground/5 shadow-[0_0_10px_rgba(255,255,255,0.05)] rounded-full z-0"
        >
            <!-- Active gradient fill representing progress -->
            <div
                class="absolute top-0 left-0 h-full w-[95%] bg-gradient-to-r from-blue-500/20 via-blue-400 to-amber-400 rounded-full opacity-80"
            ></div>
        </div>

        <!-- The Nodes -->
        <div class="relative flex justify-between items-start w-full z-10 px-2">
            {#each experienceData.milestones as m, i}
                <div class="flex flex-col items-center group relative w-1/4">
                    <!-- Floating Year Label (Top) -->
                    <span
                        class="font-mono font-bold tracking-[0.2em] uppercase transition-all duration-300 transform group-hover:-translate-y-1 opacity-60 group-hover:opacity-100"
                        style="color: {m.color}; font-size: clamp(8px, 0.8cqi, 11px); margin-bottom: 0.8cqi;"
                    >
                        {m.year}
                    </span>

                    <!-- Main Icon Node -->
                    <div
                        class="relative flex items-center justify-center rounded-[1.25rem] bg-[#030303]/80 backdrop-blur-xl border border-foreground/5 shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] transition-all duration-500 {i === experienceData.milestones.length - 1
                            ? 'border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.2)] scale-110 -translate-y-1'
                            : 'group-hover:border-blue-400/30 group-hover:-translate-y-1 group-hover:bg-[#0a0a0a]'}"
                        style="width: 3.5cqi; height: 3.5cqi;"
                    >
                        <!-- Pulsing glow for the current/future node -->
                        {#if i === experienceData.milestones.length - 1}
                            <div
                                class="absolute -inset-1 rounded-[1.4rem] bg-amber-500/10 animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite] opacity-50 pointer-events-none"
                            ></div>
                        {/if}

                        <!-- The Icon -->
                        <svelte:component
                            this={getIcon(m.iconName)}
                            size={20}
                            class="transition-transform duration-500 group-hover:scale-110 drop-shadow-[0_0_8px_currentColor]"
                            style="color: {i ===
                            experienceData.milestones.length - 1
                                ? '#fbbf24'
                                : '#94a3b8'}; {i !==
                                experienceData.milestones.length - 1 &&
                                'group-hover:color: white;'}"
                        />
                    </div>

                    <!-- Bottom Details (Title & Role) -->
                    <!-- Always visible but dims/brightens smoothly -->
                    <div
                        class="flex flex-col items-center text-center"
                        style="margin-top: 1.2cqi; max-width: 10cqi;"
                    >
                        <span
                            class="font-bold text-foreground/70 group-hover:text-foreground transition-colors duration-300 leading-tight tracking-wide"
                            style="font-size: clamp(9px, 0.9cqi, 13px); margin-bottom: 0.3cqi;"
                        >
                            {m.label}
                        </span>

                        <div
                            class="h-[1px] w-4 bg-gradient-to-r from-transparent via-foreground/20 to-transparent mb-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                        ></div>

                        <span
                            class="text-foreground/30 group-hover:text-blue-200/80 font-mono leading-relaxed transition-colors duration-300"
                            style="font-size: clamp(7px, 0.7cqi, 10px);"
                        >
                            {m.role}
                        </span>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>
