<!-- src/lib/components/home/pipeline/mobile/MobileCard.svelte -->
<script lang="ts">
    import { Database } from "lucide-svelte";
    import { pipelineData } from "$lib/data/pipeline";
    import { Card } from "$lib/components/ui/card";
</script>

<Card
    class="glass-shard relative w-full mb-6 rounded-[1.5rem] rounded-tl-[1rem] 
           bg-black/40 backdrop-blur-2xl border border-white/10 
           shadow-[0_20px_60px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.1)] overflow-hidden"
>
    <!-- Soft background glow -->
    <div
        class="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent pointer-events-none"
    ></div>

    <!-- Accent line top -->
    <div
        class="pointer-events-none absolute inset-x-0 top-0 h-[1px]
           bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-50"
    ></div>

    <div class="relative z-10 p-6 flex flex-col gap-6">
        <!-- Floating Header Area -->
        <div class="flex items-start justify-between w-full">
            <div class="flex flex-col gap-1 mt-1">
                <span
                    class="font-mono text-[10px] tracking-[0.25em] uppercase text-cyan-400/80 font-semibold drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]"
                >
                    {pipelineData.header.badge}
                </span>
            </div>
        </div>

        <!-- Main Statement (Pull Quote Style) -->
        <div class="relative pl-4 py-1 border-l-2 border-cyan-400/40">
            <div
                class="absolute left-[-2px] top-0 w-[2px] h-1/3 bg-gradient-to-b from-cyan-400 to-transparent"
            ></div>
            <p
                class="text-[1.15rem] leading-[1.4] text-white/95 font-medium tracking-tight"
            >
                {@html pipelineData.content.shortDescription}
            </p>
        </div>

        <!-- Details Box (Inner Frosted Glass) -->
        <div
            class="relative p-5 rounded-[1.25rem] bg-white/[0.02] border border-white/[0.05] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
        >
            <p class="text-[0.85rem] leading-[1.7] text-white/60">
                {pipelineData.content.detailedPhilosophy}
            </p>
        </div>
    </div>
</Card>
