<!-- src/lib/components/home/experience/desktop/RightCard.svelte -->
<script lang="ts">
    import { Briefcase } from "lucide-svelte";
    import { experienceData } from "$lib/data/experience";
    import { Card } from "$lib/components/ui/card";
</script>

<Card
    class="glass-shard relative w-full max-w-[1000px] rounded-[2rem] rounded-tl-[1rem] 
           bg-card/80 backdrop-blur-2xl border border-foreground/10
           shadow-[0_30px_80px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.1)] overflow-hidden group flex-shrink-0"
>
    <div
        class="absolute inset-0 bg-gradient-to-bl from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
    ></div>
    <div
        class="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400/50 to-transparent opacity-50"
    ></div>
    <div
        class="pointer-events-none absolute -right-20 -top-20 w-64 h-64 rounded-full bg-[radial-gradient(circle_at_center,hsl(var(--primary)/)_0%,transparent_60%)] opacity-60 dark:mix-blend-screen transition-opacity duration-700 group-hover:opacity-100"
    ></div>

    <div class="relative z-10 p-6 xl:p-8 flex flex-col gap-6">
        <div class="flex items-start justify-between w-full">
            <div class="flex flex-col gap-1 mt-1">
                <span
                    class="font-mono text-[clamp(9px,0.4vh+0.6vw,14px)] tracking-[0.3em] uppercase text-blue-400/80 font-semibold drop-shadow-[0_0_8px_hsl(var(--primary)/)]"
                >
                    {experienceData.header.badge}
                </span>
                <span
                    class="text-[clamp(11px,0.5vh+0.7vw,18px)] font-medium text-foreground/50 tracking-wide uppercase mt-1"
                >
                    Career Log
                </span>
            </div>
            <div
                class="flex h-10 w-10 xl:h-12 xl:w-12 items-center justify-center rounded-2xl bg-foreground/[0.03] border border-foreground/10 backdrop-blur-md shadow-[0_8px_16px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.1)] transition-transform duration-500 group-hover:scale-110 shrink-0"
            >
                <Briefcase
                    class="w-5 h-5 xl:w-6 xl:h-6 text-foreground/80 group-hover:text-blue-400 transition-colors duration-500 drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]"
                />
            </div>
        </div>

        <div class="relative pl-5 py-1 border-l-2 border-blue-400/40">
            <div
                class="absolute left-[-2px] top-0 w-[2px] h-1/3 bg-gradient-to-b from-blue-400 to-transparent"
            ></div>
            <p
                class="text-[clamp(1.1rem,1vh+1.2vw,2.5rem)] leading-[1.4] text-foreground/95 font-medium tracking-tight"
            >
                {@html experienceData.content.shortDescription}
            </p>
        </div>

        <div
            class="relative p-5 rounded-2xl bg-foreground/[0.02] border border-foreground/[0.05] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
        >
            <p
                class="text-[clamp(0.8rem,0.5vh+0.7vw,1.2rem)] leading-[1.7] text-foreground/60"
            >
                {experienceData.content.detailedPhilosophy}
            </p>
        </div>
    </div>
</Card>
