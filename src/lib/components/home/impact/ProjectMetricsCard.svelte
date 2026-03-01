<!-- src/lib/components/home/impact/ProjectMetricsCard.svelte -->
<script lang="ts">
    import { Activity, Database, Clock, Layers, Terminal } from "lucide-svelte";

    const metrics = [
        {
            label: "Throughput",
            value: "50M+",
            sub: "Events/Day",
            icon: Activity,
            color: "#3b82f6",
        },
        {
            label: "Latency",
            value: "<1s",
            sub: "Query Speed",
            icon: Database,
            color: "#a855f7",
        },
        {
            label: "Refresh",
            value: "5min",
            sub: "Data SLA",
            icon: Clock,
            color: "#f97316",
        },
        {
            label: "Uptime",
            value: "99.9%",
            sub: "Availability",
            icon: Layers,
            color: "#10b981",
        },
    ];
</script>

<div
    class="w-full h-full flex flex-col rounded-2xl border border-white/[0.06] bg-black/40 backdrop-blur-2xl overflow-hidden group hover:border-blue-500/20 transition-all duration-500"
>
    <!-- Header -->
    <div class="px-6 pt-6 pb-4 flex items-center justify-between">
        <div class="flex items-center gap-2">
            <Terminal size={14} class="text-blue-400" />
            <span
                class="font-mono text-[10px] font-bold text-blue-400/80 tracking-[0.2em] uppercase"
                >production.stats</span
            >
        </div>
        <div
            class="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20"
        >
            <div
                class="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"
            ></div>
            <span class="text-[9px] font-bold text-blue-400 tracking-wider"
                >PROD</span
            >
        </div>
    </div>

    <!-- Stats -->
    <div class="flex-1 px-6 pb-6 grid grid-cols-2 gap-3">
        {#each metrics as m}
            <div
                class="relative flex flex-col items-center justify-center p-4 rounded-xl border border-white/[0.04] bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300"
            >
                <div
                    class="mb-2 p-2 rounded-lg bg-white/[0.03]"
                    style="color: {m.color}"
                >
                    <svelte:component this={m.icon} size={16} strokeWidth={2} />
                </div>
                <span
                    class="text-2xl font-black font-mono leading-none"
                    style="color: {m.color}">{m.value}</span
                >
                <span
                    class="text-[10px] font-mono font-bold text-white/30 uppercase tracking-wider mt-1"
                    >{m.label}</span
                >
                <span class="text-[9px] text-white/15 mt-0.5">{m.sub}</span>
            </div>
        {/each}
    </div>
</div>
