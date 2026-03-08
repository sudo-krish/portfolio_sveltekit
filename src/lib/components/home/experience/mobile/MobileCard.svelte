<!-- src/lib/components/home/experience/mobile/MobileCard.svelte -->
<script lang="ts">
    import { Briefcase } from "lucide-svelte";
    import { experienceData } from "$lib/data/experience";
    import { Card } from "$lib/components/ui/card";
</script>

<Card
    class="glass-shard relative w-full rounded-[1.5rem] rounded-tl-[1rem] 
           bg-black/40 backdrop-blur-2xl border border-white/10 
           shadow-[0_20px_60px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.1)] overflow-hidden"
>
    <div
        class="absolute inset-0 bg-gradient-to-bl from-blue-500/5 to-transparent pointer-events-none"
    ></div>
    <div
        class="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400/50 to-transparent opacity-50"
    ></div>
    <div
        class="pointer-events-none absolute -right-16 -top-16 w-48 h-48 rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.25)_0%,transparent_60%)] opacity-60 mix-blend-screen"
    ></div>

    <div class="relative z-10 p-6 flex flex-col gap-5">
        <div class="flex items-start justify-between w-full">
            <div class="flex flex-col gap-1 mt-1">
                <span
                    class="font-mono text-[10px] tracking-[0.25em] uppercase text-blue-400/80 font-semibold drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]"
                >
                    {experienceData.header.badge}
                </span>
                <span
                    class="text-[12px] font-medium text-white/50 tracking-wide uppercase"
                >
                    Career Log
                </span>
            </div>
            <div
                class="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md shadow-[0_8px_16px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.1)] shrink-0"
            >
                <Briefcase
                    class="w-5 h-5 text-white/80 drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]"
                />
            </div>
        </div>

        <div class="relative pl-4 py-1 border-l-2 border-blue-400/40">
            <div
                class="absolute left-[-2px] top-0 w-[2px] h-1/3 bg-gradient-to-b from-blue-400 to-transparent"
            ></div>
            <p
                class="text-[1.15rem] leading-[1.4] text-white/95 font-medium tracking-tight"
            >
                {@html experienceData.content.shortDescription}
            </p>
        </div>

        <div
            class="relative p-5 rounded-[1.25rem] bg-white/[0.02] border border-white/[0.05] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
        >
            <p class="text-[0.85rem] leading-[1.7] text-white/60">
                {experienceData.content.detailedPhilosophy}
            </p>
        </div>
    </div>
</Card>
