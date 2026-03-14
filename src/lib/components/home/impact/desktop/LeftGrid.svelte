<!-- src/lib/components/home/impact/desktop/LeftGrid.svelte -->
<script lang="ts">
    import {
        TrendingUp,
        Target,
        Zap,
        Award,
        CheckCircle2,
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

<div
    class="w-full max-w-[900px] flex flex-col gap-4 2xl:gap-5 relative z-10 pt-4"
>
    <!-- MAIN ACHIEVEMENT CARD (Top Full Width) -->
    <!-- Clean, deep frosted glass: high blur, subtle gradient bg, white/10 border -->
    <div
        class="group relative flex flex-col p-6 2xl:p-8 rounded-[2rem] bg-card/80 backdrop-blur-[60px] border border-border hover:border-border/80 transition-all duration-700 overflow-hidden shadow-xl"
    >
        <!-- Crisp top highlight edge for physical glass realism -->
        <div
            class="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-60"
        ></div>
        <!-- Left edge colored highlight -->
        <div
            class="absolute inset-y-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-purple-500/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700"
        ></div>

        <!-- Ambient Purple Glow behind the glass -->
        <div
            class="absolute -right-32 -top-32 w-80 h-80 rounded-full blur-[90px] opacity-20 group-hover:opacity-40 transition-opacity duration-1000 pointer-events-none bg-purple-500"
        ></div>

        <div class="relative z-10 flex flex-col gap-5">
            <!-- Header Section -->
            <div class="flex items-center gap-4">
                <div
                    class="flex items-center justify-center w-12 h-12 2xl:w-14 2xl:h-14 rounded-2xl bg-muted border border-border shadow-inner text-purple-500 group-hover:-translate-y-1 transition-all duration-500"
                >
                    <CheckCircle2
                        size={24}
                        class="drop-shadow-[0_0_8px_hsl(var(--accent)/)]"
                    />
                </div>
                <div class="flex flex-col">
                    <span
                        class="text-[clamp(18px,1.5vw,22px)] font-black text-foreground leading-tight tracking-tight"
                    >
                        {resultsData.achievement.title}
                    </span>
                    <span
                        class="text-[11px] 2xl:text-xs font-mono text-purple-400 uppercase tracking-[0.2em] mt-0.5"
                    >
                        {resultsData.achievement.subtitle}
                    </span>
                </div>
            </div>

            <!-- Description -->
            <p
                class="text-[clamp(0.95rem,1vw,1.1rem)] leading-[1.8] text-muted-foreground font-light max-w-[95%]"
            >
                {@html resultsData.achievement.description}
            </p>
        </div>
    </div>

    <!-- 4 SMALL METRIC CARDS (Bottom Grid) -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 2xl:gap-4">
        {#each resultsData.metrics as m}
            <div
                class="group relative flex flex-col items-center justify-center text-center p-4 2xl:p-6 rounded-[1.5rem] bg-card/60 backdrop-blur-[40px] border border-border hover:bg-card/80 transition-all duration-500 overflow-hidden shadow-md"
            >
                <!-- Card top highlight -->
                <div
                    class="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-50"
                ></div>

                <!-- Dynamic Mini Glow based on Metric Color -->
                <div
                    class="absolute inset-0 blur-[40px] opacity-0 group-hover:opacity-[0.15] transition-opacity duration-700 pointer-events-none"
                    style="background-color: {m.color}"
                ></div>

                <!-- Inner Content -->
                <div class="relative z-10 flex flex-col items-center w-full">
                    <div
                        class="flex items-center justify-center w-10 h-10 rounded-xl bg-muted border border-border shadow-inner group-hover:-translate-y-1 transition-transform duration-500 mb-3"
                    >
                        <svelte:component
                            this={getIcon(m.iconName)}
                            size={18}
                            style="color: {m.color}"
                            class="drop-shadow-[0_0_8px_currentColor]"
                        />
                    </div>

                    <div class="flex flex-col items-center w-full">
                        <span
                            class="text-3xl 2xl:text-4xl font-black font-mono leading-none drop-shadow-[0_0_15px_currentColor] mb-1.5"
                            style="color: {m.color}"
                        >
                            {m.value}
                        </span>

                        <span
                            class="text-[10px] 2xl:text-[11px] font-bold text-foreground uppercase tracking-[0.1em] leading-tight mb-1.5"
                        >
                            {m.label}
                        </span>

                        <!-- Added Description Line -->
                        <p
                            class="text-[8px] 2xl:text-[9px] font-mono text-muted-foreground leading-snug px-1 line-clamp-2"
                        >
                            {@html m.description}
                        </p>
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>
