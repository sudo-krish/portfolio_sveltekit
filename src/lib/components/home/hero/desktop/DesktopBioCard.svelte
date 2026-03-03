<script lang="ts">
    import { TerminalSquare } from "lucide-svelte";
    import {
        Card,
        CardHeader,
        CardTitle,
        CardDescription,
        CardContent,
        CardFooter,
    } from "$lib/components/ui/card";

    // Import the shared hero text
    import { heroContent } from "$lib/data/hero_content";

    // Allow dynamic overrides from parent, but make them optional
    let props = $props<{
        metaLabel?: string;
        metaTitle?: string;
        main?: string;
        details?: string;
    }>();

    // Default to heroContent, but allow parent to override
    const metaLabel = props.metaLabel ?? heroContent.bioCard.metaLabel;
    const metaTitle = props.metaTitle ?? heroContent.bioCard.metaTitle;

    // For the main text, since you have HTML tags (<strong>) in your design,
    // you have two choices: render as raw HTML using {@html main} or keep the HTML in hero_content.ts.
    // Assuming heroContent.bioCard.main contains the HTML tags:
    const main = props.main ?? heroContent.bioCard.main;
    const details = props.details ?? heroContent.bioCard.details;
</script>

<Card
    class="glass-shard relative w-full mb-8 rounded-2xl rounded-tl-xl 
         bg-white/[0.04] backdrop-blur-2xl border border-white/12 
         shadow-[0_22px_60px_rgba(0,0,0,0.70)] overflow-hidden"
>
    <!-- Accent + glow -->
    <div
        class="pointer-events-none absolute inset-x-6 top-0 h-[1px]
           bg-gradient-to-r from-primary/70 via-white/40 to-transparent"
    ></div>
    <div
        class="pointer-events-none absolute -right-10 -bottom-10
           w-40 h-40 rounded-full
           bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.45)_0%,transparent_65%)]
           opacity-70 mix-blend-screen"
    ></div>

    <CardHeader class="relative z-10 flex items-center gap-3 pb-4">
        <div
            class="flex h-9 w-9 items-center justify-center rounded-xl
             bg-primary/15 border border-primary/35
             shadow-[0_0_20px_rgba(0,0,0,0.65)]"
        >
            <TerminalSquare
                size={18}
                class="text-primary drop-shadow-[0_0_10px_rgba(56,189,248,0.9)]"
            />
        </div>
        <div class="flex flex-col gap-0.5">
            <CardTitle
                class="font-mono text-[10px] tracking-[0.24em] uppercase text-white/60"
            >
                {metaLabel}
            </CardTitle>
            <CardDescription class="text-sm font-medium text-white/85">
                {metaTitle}
            </CardDescription>
        </div>
    </CardHeader>

    <CardContent class="relative z-10 pt-0 space-y-4">
        <p
            class="text-[1.1rem] xl:text-[1.25rem] leading-[1.6] text-white/85 font-light"
        >
            {@html main}
        </p>
        <p class="text-[0.9rem] xl:text-[0.95rem] leading-[1.7] text-white/60">
            {details}
        </p>
    </CardContent>

    <!-- Optional footer if you ever need a CTA/meta -->
    <!--
  <CardFooter class="relative z-10 pt-4">
    ...
  </CardFooter>
  -->
</Card>
