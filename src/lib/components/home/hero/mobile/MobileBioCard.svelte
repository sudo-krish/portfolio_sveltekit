<script lang="ts">
    import { TerminalSquare } from "lucide-svelte";
    import InfiniteMarquee from "$lib/components/ui/marquee/InfiniteMarquee.svelte";
    import {
        Card,
        CardHeader,
        CardTitle,
        CardDescription,
        CardContent,
    } from "$lib/components/ui/card";

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
<Card
    class="relative z-20 w-[92%] mb-8 ml-auto rounded-3xl
           bg-white/[0.03] backdrop-blur-[32px] 
           border border-white/[0.08] 
           shadow-[0_24px_48px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.15)] 
           overflow-hidden px-4 py-5"
>
    <!-- Soft glow behind icon -->
    <div
        class="pointer-events-none absolute top-4 left-8 w-24 h-24 rounded-full
               bg-primary/20 mix-blend-screen blur-[24px]"
    ></div>

    <CardHeader class="pl-7 pb-4 pt-0 flex items-center gap-3.5">
        <div
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl
                   bg-white/[0.06] border border-white/10"
        >
            <TerminalSquare
                size={16}
                class="text-primary drop-shadow-[0_0_8px_hsl(var(--primary)/0.8)]"
            />
        </div>
        <div class="flex flex-col gap-1">
            <CardTitle
                class="font-mono text-[9px] tracking-[0.25em] uppercase text-white/50"
            >
                {metaLabel}
            </CardTitle>
            <CardDescription
                class="text-[12px] font-medium tracking-wide text-white/90"
            >
                {metaTitle}
            </CardDescription>
        </div>
    </CardHeader>

    <CardContent class="pl-7 pr-2 pt-0 pb-1 flex flex-col gap-3">
        <p
            class="text-[15px] leading-[1.6] text-white/80 font-light tracking-[-0.01em]"
        >
            {@html main}
        </p>
        <p class="text-[13px] leading-[1.65] text-white/50 font-light">
            {@html details}
        </p>
    </CardContent>
</Card>

<!-- Tech marquee -->
<div
    class="hero-type relative w-full z-20 mb-10 -mx-4 px-4 pointer-events-auto"
>
    <InfiniteMarquee items={techStack} />
</div>
