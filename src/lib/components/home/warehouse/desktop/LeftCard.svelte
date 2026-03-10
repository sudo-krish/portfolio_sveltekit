<!-- src/lib/components/home/warehouse/desktop/LeftCard.svelte -->
<script lang="ts">
    import { BarChart3 } from "lucide-svelte";
    import { warehouseData } from "$lib/data/warehouse";
    import { Card } from "$lib/components/ui/card";
</script>

<Card
    class="glass-shard relative w-full max-w-[1000px] mb-2 rounded-[2rem] rounded-tr-[1rem] 
           bg-black/40 backdrop-blur-2xl border border-white/10
           shadow-[0_30px_80px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.1)] overflow-hidden group flex-shrink-0"
>
    <!-- Soft background glow -->
    <div
        class="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
    ></div>

    <!-- Accent line top -->
    <div
        class="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400/50 to-transparent opacity-50"
    ></div>

    <!-- Radial Glow Blob (Purple tinted) -->
    <div
        class="pointer-events-none absolute -left-20 -top-20 w-64 h-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.25)_0%,transparent_60%)] opacity-60 mix-blend-screen transition-opacity duration-700 group-hover:opacity-100"
    ></div>

    <div class="relative z-10 p-6 xl:p-8 flex flex-col gap-6">
        <!-- Floating Header Area -->
        <div class="flex items-start justify-between w-full">
            <div class="flex flex-col gap-1 mt-1">
                <span
                    class="font-mono text-[clamp(9px,0.4vh+0.6vw,14px)] tracking-[0.3em] uppercase text-purple-400/80 font-semibold drop-shadow-[0_0_8px_rgba(168,85,247,0.3)]"
                >
                    {warehouseData.header.badge}
                </span>
                <span
                    class="text-[clamp(11px,0.5vh+0.7vw,18px)] font-medium text-white/50 tracking-wide uppercase mt-1"
                >
                    BI & Serving Layer
                </span>
            </div>

            <!-- Added Metrics into the Top Right -->
            <div class="flex gap-4">
                <div class="text-right">
                    <div
                        class="text-[10px] text-white/40 uppercase font-mono tracking-wider"
                    >
                        Latency
                    </div>
                    <div
                        class="text-xl font-black text-white flex items-baseline justify-end gap-1"
                    >
                        {warehouseData.metrics.latency}<span
                            class="text-xs text-purple-400 font-semibold"
                            >{warehouseData.metrics.latencyUnit}</span
                        >
                    </div>
                </div>
                <div class="w-px h-8 bg-white/10 self-center"></div>
                <div class="text-right">
                    <div
                        class="text-[10px] text-white/40 uppercase font-mono tracking-wider"
                    >
                        Concurrency
                    </div>
                    <div
                        class="text-xl font-black text-white flex items-baseline justify-end gap-1"
                    >
                        {warehouseData.metrics.concurrency}<span
                            class="text-xs text-purple-400 font-semibold"
                            >{warehouseData.metrics.concurrencyUnit}</span
                        >
                    </div>
                </div>
            </div>
        </div>

        <!-- Main Statement -->
        <div class="relative pl-5 py-1 border-l-2 border-purple-400/40">
            <div
                class="absolute left-[-2px] top-0 w-[2px] h-1/3 bg-gradient-to-b from-purple-400 to-transparent"
            ></div>
            <p
                class="text-[clamp(1.1rem,1vh+1.2vw,2.5rem)] leading-[1.4] text-white/95 font-medium tracking-tight"
            >
                {@html warehouseData.content.shortDescription}
            </p>
        </div>

        <!-- Details Box -->
        <div
            class="relative p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
        >
            <p
                class="text-[clamp(0.8rem,0.5vh+0.7vw,1.2rem)] leading-[1.7] text-white/60"
            >
                {warehouseData.content.detailedPhilosophy}
            </p>
        </div>
    </div>
</Card>
