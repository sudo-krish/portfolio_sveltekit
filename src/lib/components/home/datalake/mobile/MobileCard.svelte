<!-- src/lib/components/home/datalake/mobile/MobileCard.svelte -->
<script lang="ts">
    import { HardDrive } from "lucide-svelte";
    import { datalakeData } from "$lib/data/datalake";
    import { Card } from "$lib/components/ui/card";
</script>

<Card
    class="glass-shard relative w-full mb-4 rounded-[1.5rem] rounded-tr-[1rem] 
           bg-card/80 backdrop-blur-2xl border border-foreground/10 
           shadow-[0_20px_60px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.1)] overflow-hidden"
>
    <!-- Soft background glow -->
    <div
        class="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none"
    ></div>

    <!-- Accent line top -->
    <div
        class="pointer-events-none absolute inset-x-0 top-0 h-[1px]
           bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent opacity-50"
    ></div>

    <!-- Radial Glow Blob (Emerald tinted) -->
    <div
        class="pointer-events-none absolute -left-16 -top-16
           w-48 h-48 rounded-full
           bg-[radial-gradient(circle_at_center,hsl(var(--primary)/)_0%,transparent_60%)]
           opacity-60 dark:mix-blend-screen"
    ></div>

    <div class="relative z-10 p-6 flex flex-col gap-5">
        <!-- Floating Header Area -->
        <div class="flex items-start justify-between w-full">
            <div class="flex flex-col gap-1 mt-1">
                <span
                    class="font-mono text-[10px] tracking-[0.25em] uppercase text-emerald-400/80 font-semibold drop-shadow-[0_0_8px_hsl(var(--primary)/)]"
                >
                    {datalakeData.header.badge}
                </span>
                <span
                    class="text-[12px] font-medium text-muted-foreground tracking-wide uppercase"
                >
                    Storage Architecture
                </span>
            </div>

            <!-- Floating Icon Badge -->
            <div
                class="flex h-10 w-10 items-center justify-center rounded-xl
                 bg-foreground/[0.03] border border-foreground/10 backdrop-blur-md
                 shadow-[0_8px_16px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.1)] shrink-0"
            >
                <HardDrive
                    class="w-5 h-5 text-foreground/80 drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]"
                />
            </div>
        </div>

        <!-- Main Statement (Pull Quote Style) -->
        <div class="relative pl-4 py-1 border-l-2 border-emerald-400/40">
            <div
                class="absolute left-[-2px] top-0 w-[2px] h-1/3 bg-gradient-to-b from-emerald-400 to-transparent"
            ></div>
            <p
                class="text-[1.15rem] leading-[1.4] text-foreground font-medium tracking-tight"
            >
                {@html datalakeData.content.shortDescription}
            </p>
        </div>

        <!-- Details Box (Inner Frosted Glass) -->
        <div
            class="relative p-5 rounded-[1.25rem] bg-foreground/[0.02] border border-foreground/[0.05] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
        >
            <p class="text-[0.85rem] leading-[1.7] text-muted-foreground">
                {datalakeData.content.detailedPhilosophy}
            </p>
        </div>
    </div>
</Card>
