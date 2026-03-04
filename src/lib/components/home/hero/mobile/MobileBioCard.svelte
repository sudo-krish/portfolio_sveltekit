<script lang="ts">
    import { TerminalSquare } from "lucide-svelte";
    import InfiniteMarquee from "$lib/components/ui/marquee/InfiniteMarquee.svelte";
    import { Card } from "$lib/components/ui/card";

    import { heroContent, type TechItem } from "$lib/data/hero_content";

    let props = $props<{
        metaLabel?: string;
        metaTitle?: string;
        main?: string;
        details?: string;
        techStack: TechItem[];
    }>();

    const metaLabel = props.metaLabel ?? heroContent.bioCard.metaLabel;
    const metaTitle = props.metaTitle ?? heroContent.bioCard.metaTitle;
    const main = props.main ?? heroContent.bioCard.main;
    const details = props.details ?? heroContent.bioCard.details;
    const techStack = props.techStack;
</script>

<!-- Bio card -->
<!-- Inherited dark glass bg-black/40 and heavy backdrop blur from desktop -->
<Card
    class="relative z-20 w-full mb-8 rounded-[2rem] rounded-tl-[1rem] 
           bg-black/40 backdrop-blur-2xl border border-white/10 
           shadow-[0_24px_60px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.1)] 
           overflow-hidden group"
>
    <!-- Soft background glow -->
    <div
        class="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
    ></div>

    <!-- Accent line top -->
    <div
        class="pointer-events-none absolute inset-x-0 top-0 h-[1px]
               bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50"
    ></div>

    <!-- Radial Glow Blob -->
    <div
        class="pointer-events-none absolute -right-16 -top-16
               w-48 h-48 rounded-full
               bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.25)_0%,transparent_60%)]
               opacity-60 mix-blend-screen transition-opacity duration-700 group-hover:opacity-100"
    ></div>

    <div class="relative z-10 p-6 flex flex-col gap-6">
        <!-- Floating Header Area -->
        <div class="flex items-start justify-between w-full">
            <div class="flex flex-col gap-1 mt-1">
                <span
                    class="font-mono text-[9px] tracking-[0.3em] uppercase text-primary/80 font-semibold drop-shadow-[0_0_8px_hsl(var(--primary)/0.3)]"
                >
                    {metaLabel}
                </span>
                <span
                    class="text-[13px] font-medium text-white/50 tracking-wide"
                >
                    {metaTitle}
                </span>
            </div>

            <!-- Floating Terminal Badge -->
            <div
                class="flex h-10 w-10 items-center justify-center rounded-xl
                       bg-white/[0.03] border border-white/10 backdrop-blur-md
                       shadow-[0_8px_16px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.1)]
                       shrink-0 transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3"
            >
                <TerminalSquare
                    size={18}
                    class="text-white/80 group-hover:text-primary transition-colors duration-500 drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]"
                />
            </div>
        </div>

        <!-- Main Statement (Pull Quote Style) -->
        <div class="relative pl-5 py-1 border-l-2 border-primary/40">
            <div
                class="absolute left-[-2px] top-0 w-[2px] h-1/3 bg-gradient-to-b from-primary to-transparent"
            ></div>
            <p
                class="text-[1.1rem] leading-[1.45] text-white/95 font-medium tracking-tight"
            >
                {@html main}
            </p>
        </div>

        <!-- Details Box (Inner Frosted Glass) -->
        <div
            class="relative mt-1 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
        >
            <p class="text-[0.85rem] leading-[1.7] text-white/60">
                {details}
            </p>
        </div>
    </div>
</Card>

<!-- Tech marquee -->
<div class="hero-type relative w-[100vw] z-20 mb-10 -ml-4 pointer-events-auto">
    <InfiniteMarquee items={techStack} />
</div>
