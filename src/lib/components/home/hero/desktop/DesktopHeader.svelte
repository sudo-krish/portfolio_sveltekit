<script lang="ts">
    import { Cpu } from "lucide-svelte";
    import InfiniteMarquee from "$lib/components/ui/marquee/InfiniteMarquee.svelte";

    // Import the shared hero text
    import { heroContent, type TechItem } from "$lib/data/hero_content";

    let props = $props<{
        name: string;
        techStack: TechItem[];
        prefix?: string;
        suffix?: string;
        metaLabel?: string;
        payloadLabel?: string;
    }>();

    const prefix = props.prefix ?? heroContent.headline.prefix;
    const suffix = props.suffix ?? heroContent.headline.suffix;
    const metaLabel = props.metaLabel ?? heroContent.headline.metaLabelDesktop;
    const payloadLabel = props.payloadLabel ?? heroContent.marquee.payloadLabel;
</script>

<!-- Removed w-3/5, now fills the column provided by the parent layout -->
<div class="relative z-10 w-full flex flex-col justify-center">
    <!-- Top Identity Bar -->
    <div class="hero-type flex items-center" style="gap: 1.2cqi; margin-bottom: 1.5cqi; padding-left: 0.2cqi;">
        <!-- Name Plate -->
        <div
            class="flex items-center bg-foreground/[0.03] border border-foreground/[0.08] rounded-full backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
            style="gap: 0.6cqi; padding: 0.5cqi 1cqi 0.5cqi 0.3cqi;"
        >
            <div
                class="rounded-full bg-foreground/10 flex items-center justify-center"
                style="width: 1.2cqi; height: 1.2cqi;"
            >
                <div class="h-1 w-2.5 bg-foreground/60 rounded-full"></div>
            </div>
            <span
                class="font-mono font-bold tracking-[0.3em] text-foreground/70 uppercase"
                style="font-size: clamp(8px, 0.7cqi, 10px);"
            >
                {props.name}
            </span>
        </div>

        <!-- Status Indicator -->
        <div
            class="flex items-center bg-emerald-500/10 border border-emerald-500/20 rounded-full backdrop-blur-md shadow-[0_0_15px_hsl(var(--primary)/)]"
            style="gap: 0.5cqi; padding: 0.5cqi 0.8cqi;"
        >
            <div
                class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_currentColor]"
            ></div>
            <span
                class="font-mono uppercase tracking-[0.25em] text-emerald-400 font-bold"
                style="font-size: clamp(7px, 0.6cqi, 9px);"
            >
                {metaLabel}
            </span>
        </div>
    </div>

    <!-- Massive Typography Block -->
    <!-- Increased clamp sizes slightly since we have more horizontal room now -->
    <div class="flex flex-col">
        <h1
            class="hero-type font-black text-[clamp(6rem,9vw,11rem)] leading-[0.82] tracking-[-0.03em] text-foreground/95 mix-blend-plus-lighter"
        >
            {prefix}
        </h1>
        <h1
            class="hero-type font-black text-[clamp(6rem,9vw,11rem)] leading-[0.82] tracking-[-0.03em] text-transparent bg-clip-text bg-gradient-to-br from-foreground via-primary to-accent drop-shadow-[0_4px_32px_hsl(var(--primary)/0.3)]"
        >
            {suffix}
        </h1>
    </div>

    <!-- Bottom Payload & Marquee Row -->
    <!-- Expanded max-width constraint to take advantage of ultrawide monitors -->
    <div
        class="hero-type w-full max-w-[95%] pointer-events-auto flex items-center"
        style="margin-top: 2.5cqi; gap: 1.2cqi;"
    >
        <!-- Payload Badge -->
        <div
            class="flex items-center border border-foreground/10 bg-foreground/[0.03] shadow-[0_8px_16px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.15)] backdrop-blur-md rounded-xl shrink-0"
            style="gap: 0.5cqi; padding: 0.4cqi 0.8cqi;"
        >
            <Cpu
                size={16}
                class="text-primary drop-shadow-[0_0_8px_hsl(var(--primary)/0.6)]"
            />
            <span
                class="font-mono text-foreground/90 tracking-[0.2em] uppercase font-bold"
                style="font-size: clamp(8px, 0.7cqi, 10px);"
            >
                {payloadLabel}
            </span>
        </div>

        <!-- Marquee Track -->
        <div class="flex-1 overflow-hidden mask-fade-edges">
            <InfiniteMarquee items={props.techStack} />
        </div>
    </div>
</div>
