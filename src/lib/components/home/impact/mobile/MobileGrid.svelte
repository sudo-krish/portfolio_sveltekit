<!-- src/lib/components/home/impact/mobile/MobileGrid.svelte -->
<script lang="ts">
    import {
        TrendingUp,
        Target,
        Zap,
        Award,
        CheckCircle2,
        ArrowRight,
    } from "lucide-svelte";
    import { resultsData } from "$lib/data/results";

    const getIcon = (name: string) => {
        switch (name) {
            case "TrendingUp":
                return TrendingUp;
            case "Target":
                return Target;
            case "Zap":
                return Zap;
            case "Award":
                return Award;
            default:
                return TrendingUp;
        }
    };
</script>

<div class="w-full flex flex-col gap-3 relative z-10">
    <!-- MAIN ACHIEVEMENT CARD (Mobile) -->
    <div
        class="group relative flex flex-col p-5 sm:p-6 rounded-[1.5rem] bg-gradient-to-br from-white/[0.06] to-white/[0.01] backdrop-blur-[60px] border border-white/10 overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
    >
        <!-- Top internal highlight -->
        <div
            class="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-60"
        ></div>
        <!-- Ambient Purple Glow -->
        <div
            class="absolute -right-20 -top-20 w-48 h-48 rounded-full blur-[60px] opacity-20 pointer-events-none bg-purple-500"
        ></div>

        <div class="relative z-10 flex flex-col gap-4">
            <!-- Mobile Header Section -->
            <div class="flex items-center gap-3">
                <div
                    class="flex items-center justify-center w-10 h-10 rounded-xl bg-black/20 border border-white/10 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)] text-purple-400"
                >
                    <CheckCircle2
                        size={20}
                        class="drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]"
                    />
                </div>
                <div class="flex flex-col">
                    <span
                        class="text-[16px] sm:text-[18px] font-black text-white leading-tight tracking-tight"
                    >
                        {resultsData.achievement.title}
                    </span>
                    <span
                        class="text-[9px] sm:text-[10px] font-mono text-purple-400 uppercase tracking-[0.2em] mt-0.5"
                    >
                        {resultsData.achievement.subtitle}
                    </span>
                </div>
            </div>

            <!-- Mobile Description -->
            <p
                class="text-[0.85rem] sm:text-[0.95rem] leading-[1.7] text-white/70 font-light"
            >
                {@html resultsData.achievement.description}
            </p>
        </div>
    </div>

    <!-- 4 SMALL METRIC CARDS (2x2 Mobile Grid) -->
    <div class="grid grid-cols-2 gap-3 mt-1">
        {#each resultsData.metrics as m}
            <div
                class="group relative flex flex-col items-center justify-center text-center p-4 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent backdrop-blur-[40px] border border-white/10 shadow-[0_15px_30px_rgba(0,0,0,0.4)] overflow-hidden"
            >
                <!-- Dynamic Glow based on Metric Color -->
                <div
                    class="absolute inset-0 blur-[30px] opacity-10 pointer-events-none"
                    style="background-color: {m.color}"
                ></div>

                <!-- Card top highlight -->
                <div
                    class="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50"
                ></div>

                <div class="relative z-10 flex flex-col items-center w-full">
                    <!-- Smaller icon box for mobile -->
                    <div
                        class="flex items-center justify-center w-8 h-8 rounded-lg bg-black/30 border border-white/5 shadow-inner mb-2.5"
                    >
                        <svelte:component
                            this={getIcon(m.iconName)}
                            size={14}
                            style="color: {m.color}"
                        />
                    </div>

                    <div class="flex flex-col items-center w-full">
                        <span
                            class="text-2xl sm:text-3xl font-black font-mono leading-none drop-shadow-[0_0_15px_currentColor] mb-1.5"
                            style="color: {m.color}"
                        >
                            {m.value}
                        </span>

                        <span
                            class="text-[9px] sm:text-[10px] font-bold text-white/90 uppercase tracking-[0.1em] leading-tight mb-1"
                        >
                            {m.label}
                        </span>

                        <p
                            class="text-[7px] sm:text-[8px] font-mono text-white/40 leading-snug px-1 line-clamp-2"
                        >
                            {@html m.description}
                        </p>
                    </div>
                </div>
            </div>
        {/each}
    </div>

    <!-- Mobile Button CTA (to replace the anchor right side CTA) -->
    <a
        href={resultsData.ui.cta.href}
        class="group relative flex justify-center items-center gap-3 w-full mt-3 p-3.5 rounded-[1.25rem] bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] transition-all duration-300"
    >
        <span class="text-sm font-bold text-white tracking-wide">
            {resultsData.ui.cta.label}
        </span>
        <div
            class="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300"
        >
            <ArrowRight size={12} />
        </div>
    </a>
</div>
