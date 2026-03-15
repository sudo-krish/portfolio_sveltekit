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
        class="group relative flex flex-col p-5 sm:p-6 rounded-[1.5rem] bg-card/80 backdrop-blur-[60px] border border-border overflow-hidden shadow-xl"
    >
        <!-- Top internal highlight -->
        <div
            class="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-60"
        ></div>
        <!-- Ambient Purple Glow -->
        <div
            class="absolute -right-20 -top-20 w-48 h-48 rounded-full blur-[60px] opacity-20 pointer-events-none bg-purple-500"
        ></div>

        <div class="relative z-10 flex flex-col gap-4">
            <!-- Mobile Header Section -->
            <div class="flex items-center gap-3">
                <div
                    class="flex items-center justify-center w-10 h-10 rounded-xl bg-muted border border-border shadow-inner text-purple-500"
                >
                    <CheckCircle2
                        size={20}
                        class="drop-shadow-[0_0_8px_hsl(var(--accent)/)]"
                    />
                </div>
                <div class="flex flex-col">
                    <span
                        class="text-[16px] sm:text-[18px] font-black text-foreground leading-tight tracking-tight"
                    >
                        {resultsData.achievement.title}
                    </span>
                    <span
                        class="text-[9px] sm:text-[10px] font-mono text-primary uppercase tracking-[0.2em] mt-0.5"
                    >
                        {resultsData.achievement.subtitle}
                    </span>
                </div>
            </div>

            <!-- Mobile Description -->
            <p
                class="text-[0.85rem] sm:text-[0.95rem] leading-[1.7] text-muted-foreground font-light"
            >
                {@html resultsData.achievement.description}
            </p>
        </div>
    </div>

    <!-- 4 SMALL METRIC CARDS (2x2 Mobile Grid) -->
    <div class="grid grid-cols-2 gap-3 mt-1">
        {#each resultsData.metrics as m}
            <div
                class="group relative flex flex-col items-center justify-center text-center p-4 rounded-2xl bg-card/60 backdrop-blur-[40px] border border-border shadow-sm overflow-hidden"
            >
                <!-- Dynamic Glow based on Metric Color -->
                <div
                    class="absolute inset-0 blur-[30px] opacity-10 pointer-events-none"
                    style="background-color: {m.color}"
                ></div>

                <!-- Card top highlight -->
                <div
                    class="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-50"
                ></div>

                <div class="relative z-10 flex flex-col items-center w-full">
                    <!-- Smaller icon box for mobile -->
                    <div
                        class="flex items-center justify-center w-8 h-8 rounded-lg bg-muted border border-border shadow-inner mb-2.5"
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
                            class="text-[9px] sm:text-[10px] font-bold text-foreground uppercase tracking-[0.1em] leading-tight mb-1"
                        >
                            {m.label}
                        </span>

                        <p
                            class="text-[7px] sm:text-[8px] font-mono text-muted-foreground leading-snug px-1 line-clamp-2"
                        >
                            {@html m.description}
                        </p>
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>
