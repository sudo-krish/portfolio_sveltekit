<!-- src/lib/components/home/impact/ImpactMetricsCard.svelte -->
<script lang="ts">
    import { TrendingUp, Zap, Target, Award } from "lucide-svelte";

    const metrics = [
        {
            label: "Latency",
            value: "99%",
            sub: "3h → sec",
            icon: TrendingUp,
            color: "#ef4444",
        },
        {
            label: "Accuracy",
            value: "98%",
            sub: "60% → 98%",
            icon: Target,
            color: "#06b6d4",
        },
        {
            label: "Efficiency",
            value: "80%",
            sub: "Auto-Scaling",
            icon: Zap,
            color: "#eab308",
        },
        {
            label: "AI Insights",
            value: "70%",
            sub: "ML Driven",
            icon: Award,
            color: "#a855f7",
        },
    ];
</script>

<div
    class="w-full h-full flex flex-col rounded-2xl border border-white/[0.06] bg-black/40 backdrop-blur-2xl overflow-hidden group hover:border-purple-500/20 transition-all duration-500"
>
    <!-- Header -->
    <div class="px-6 pt-6 pb-4 flex items-center justify-between">
        <div class="flex items-center gap-2">
            <TrendingUp size={14} class="text-purple-400" />
            <span
                class="font-mono text-[10px] font-bold text-purple-400/80 tracking-[0.2em] uppercase"
                >impact.metrics</span
            >
        </div>
        <div
            class="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20"
        >
            <div
                class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"
            ></div>
            <span class="text-[9px] font-bold text-green-400 tracking-wider"
                >LIVE</span
            >
        </div>
    </div>

    <!-- Metric Tiles -->
    <div class="flex-1 px-6 pb-6 grid grid-cols-2 gap-3">
        {#each metrics as m}
            <div
                class="relative flex flex-col items-center justify-center p-4 rounded-xl border border-white/[0.04] bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 group/tile"
            >
                <!-- Icon -->
                <div
                    class="mb-2 p-2 rounded-lg bg-white/[0.03]"
                    style="color: {m.color}"
                >
                    <svelte:component this={m.icon} size={16} strokeWidth={2} />
                </div>
                <!-- Value -->
                <span
                    class="text-2xl font-black font-mono leading-none"
                    style="color: {m.color}">{m.value}</span
                >
                <!-- Label -->
                <span
                    class="text-[10px] font-mono font-bold text-white/30 uppercase tracking-wider mt-1"
                    >{m.label}</span
                >
                <!-- Sub -->
                <span class="text-[9px] text-white/15 mt-0.5">{m.sub}</span>
            </div>
        {/each}
    </div>
</div>
