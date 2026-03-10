<!-- src/lib/components/home/pipeline/desktop/RightCard.svelte -->
<script lang="ts">
    import { Database } from "lucide-svelte";
    import { pipelineData } from "$lib/data/pipeline";
    import { Card } from "$lib/components/ui/card";
</script>

<Card
    class="glass-shard relative w-full max-w-[1000px] mb-6 rounded-[2rem] rounded-tl-[1rem] 
           bg-black/40 backdrop-blur-2xl border border-white/10
           shadow-[0_30px_80px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.1)] overflow-hidden group flex-shrink-0"
>
    <!-- Soft background glow -->
    <div
        class="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
    ></div>

    <!-- Accent line top -->
    <div
        class="pointer-events-none absolute inset-x-0 top-0 h-[1px]
           bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-50"
    ></div>

    <!-- Radial Glow Blob (Cyan tinted) -->
    <div
        class="pointer-events-none absolute -right-20 -top-20
           w-64 h-64 rounded-full
           bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.25)_0%,transparent_60%)]
           opacity-60 mix-blend-screen transition-opacity duration-700 group-hover:opacity-100"
    ></div>

    <div class="relative z-10 p-6 xl:p-8 flex flex-col gap-6">
        <!-- Floating Header Area -->
        <div class="flex items-start justify-between w-full">
            <div class="flex flex-col gap-1 mt-1">
                <span
                    class="font-mono text-[clamp(9px,0.4vh+0.6vw,14px)] tracking-[0.3em] uppercase text-cyan-400/80 font-semibold drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]"
                >
                    {pipelineData.header.badge}
                </span>
                <span
                    class="text-[clamp(11px,0.5vh+0.7vw,18px)] font-medium text-white/50 tracking-wide uppercase mt-1"
                >
                    System Architecture
                </span>
            </div>

            <!-- Floating Icon Badge -->
            <div
                class="flex h-10 w-10 xl:h-12 xl:w-12 items-center justify-center rounded-2xl
                 bg-white/[0.03] border border-white/10 backdrop-blur-md
                 shadow-[0_8px_16px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.1)]
                 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shrink-0"
            >
                <Database
                    class="w-5 h-5 xl:w-6 xl:h-6 text-white/80 group-hover:text-cyan-400 transition-colors duration-500 drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]"
                />
            </div>
        </div>

        <!-- Main Statement (Pull Quote Style) -->
        <div class="relative pl-5 py-1 border-l-2 border-cyan-400/40">
            <div
                class="absolute left-[-2px] top-0 w-[2px] h-1/3 bg-gradient-to-b from-cyan-400 to-transparent"
            ></div>
            <p
                class="text-[clamp(1.1rem,1vh+1.2vw,2.5rem)] leading-[1.4] text-white/95 font-medium tracking-tight"
            >
                {@html pipelineData.content.shortDescription}
            </p>
        </div>

        <!-- Details Box (Inner Frosted Glass) -->
        <div
            class="relative p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
        >
            <p
                class="text-[clamp(0.8rem,0.5vh+0.7vw,1.2rem)] leading-[1.7] text-white/60"
            >
                {pipelineData.content.detailedPhilosophy}
            </p>
        </div>
    </div>
</Card>
