<!-- src/lib/components/home/experience/ExperienceCard.svelte -->
<script lang="ts">
    import { Briefcase, Cloud, Zap, Sparkles, Terminal } from "lucide-svelte";
    import { onMount } from "svelte";

    const milestones = [
        {
            year: "2020",
            title: "Initialized",
            role: "Junior Engineer",
            icon: Terminal,
            accent: "#3b82f6",
        },
        {
            year: "2022",
            title: "Scaled Up",
            role: "Data & Cloud Engineer",
            icon: Cloud,
            accent: "#8b5cf6",
        },
        {
            year: "2023",
            title: "Optimized",
            role: "Streaming ETL Lead",
            icon: Zap,
            accent: "#ec4899",
        },
        {
            year: "2025",
            title: "Future State",
            role: "AI Data Architect",
            icon: Sparkles,
            accent: "#f59e0b",
        },
    ];

    let mounted = false;
    onMount(() => {
        mounted = true;
    });
</script>

<div
    class="w-full h-full flex flex-col rounded-2xl border border-white/[0.06] bg-black/40 backdrop-blur-2xl overflow-hidden group hover:border-blue-500/20 transition-all duration-500"
>
    <!-- Header -->
    <div class="px-6 pt-6 pb-4">
        <div class="flex items-center gap-2 mb-4">
            <Briefcase size={14} class="text-blue-400" />
            <span
                class="font-mono text-[10px] font-bold text-blue-400/80 tracking-[0.2em] uppercase"
                >Career.log</span
            >
            <div class="ml-auto relative flex h-2 w-2">
                <span
                    class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-60"
                ></span>
                <span
                    class="relative inline-flex rounded-full h-2 w-2 bg-blue-500"
                ></span>
            </div>
        </div>
        <h3
            class="text-2xl font-black text-white tracking-tight leading-none mb-1"
        >
            Professional
        </h3>
        <h3 class="text-2xl font-black tracking-tight leading-none">
            <span
                class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500"
            >
                Evolution.
            </span>
        </h3>
    </div>

    <!-- Timeline -->
    <div class="flex-1 px-6 pb-6 relative">
        <!-- Vertical line -->
        <div
            class="absolute left-[2.1rem] top-0 bottom-6 w-px bg-gradient-to-b from-blue-500/30 via-blue-500/10 to-transparent"
        ></div>

        <div class="flex flex-col gap-5">
            {#each milestones as m, i}
                <div
                    class="relative flex items-start gap-4 group/item"
                    style="--accent: {m.accent}"
                >
                    <!-- Node -->
                    <div
                        class="relative z-10 flex-shrink-0 w-8 h-8 rounded-lg border border-white/10 bg-black/60 flex items-center justify-center group-hover/item:border-[var(--accent)] group-hover/item:shadow-[0_0_12px_var(--accent)] transition-all duration-300"
                    >
                        <svelte:component
                            this={m.icon}
                            size={14}
                            class="text-white/40 group-hover/item:text-[var(--accent)] transition-colors"
                        />
                    </div>

                    <!-- Content -->
                    <div class="flex-1 min-w-0 pt-0.5">
                        <div class="flex items-center gap-2 mb-1">
                            <span
                                class="font-mono text-[10px] font-bold"
                                style="color: {m.accent}">{m.year}</span
                            >
                            <span class="text-white/10">·</span>
                            <span class="text-xs font-bold text-white/90"
                                >{m.title}</span
                            >
                        </div>
                        <p class="text-[11px] text-white/40 font-mono">
                            {m.role}
                        </p>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>
