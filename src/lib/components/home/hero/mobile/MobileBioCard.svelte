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

    import { heroContent } from "$lib/data/hero_content";

    // Allow dynamic overrides from parent (HeroContent.svelte)
    let props = $props<{
        metaLabel?: string; // optional override
        metaTitle?: string; // optional override
        main?: string; // optional override
        details?: string; // optional override
        techTags: string[]; // always passed
    }>();

    // Default to heroContent, but allow parent to override
    const metaLabel = props.metaLabel ?? heroContent.bioCard.metaLabel;
    const metaTitle = props.metaTitle ?? heroContent.bioCard.metaTitle;
    const main = props.main ?? heroContent.bioCard.main;
    const details = props.details ?? heroContent.bioCard.details;
    const techTags = props.techTags;
</script>

<Card
    class="relative z-20 w-[94%] mb-6 ml-auto rounded-2xl rounded-l-3xl
         bg-white/[0.05] backdrop-blur-2xl 
         border border-white/10 
         shadow-[0_16px_40px_rgba(0,0,0,0.75)] 
         overflow-hidden px-5 py-4"
>
    <!-- Accent spine -->
    <div
        class="pointer-events-none absolute inset-y-2 left-3 w-[2px]
           bg-gradient-to-b from-primary/0 via-primary/70 to-primary/0"
    ></div>

    <CardHeader class="pl-6 pb-2 pt-1 flex items-center gap-3">
        <div
            class="flex h-8 w-8 items-center justify-center rounded-xl
             bg-primary/15 border border-primary/40"
        >
            <TerminalSquare
                size={16}
                class="text-primary drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]"
            />
        </div>
        <div class="flex flex-col gap-0.5">
            <CardTitle
                class="font-mono text-[9px] tracking-[0.22em] uppercase text-white/55"
            >
                {metaLabel}
            </CardTitle>
            <CardDescription class="text-[11px] text-white/80">
                {metaTitle}
            </CardDescription>
        </div>
    </CardHeader>

    <CardContent class="pl-6 pr-1 pt-1 pb-1">
        <p class="text-[3.6vw] leading-[1.55] text-white/85 font-light">
            {main}
        </p>
        <p class="mt-2 text-[3.2vw] leading-[1.6] text-white/65">
            {details}
        </p>
    </CardContent>
</Card>

<!-- Tech marquee -->
<div
    class="hero-type relative w-full z-20 mb-10 -mx-4 px-4 pointer-events-auto"
>
    <InfiniteMarquee items={techTags} speed="20s" />
</div>
