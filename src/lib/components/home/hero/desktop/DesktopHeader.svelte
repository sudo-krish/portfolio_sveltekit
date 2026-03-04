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
    <div class="hero-type flex items-center gap-5 mb-8 pl-1">
        <!-- Name Plate -->
        <div
            class="flex items-center gap-3 bg-white/[0.03] border border-white/[0.08] rounded-full pl-1.5 pr-5 py-1.5 backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
        >
            <div
                class="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center"
            >
                <div class="h-1 w-2.5 bg-white/60 rounded-full"></div>
            </div>
            <span
                class="font-mono text-[10px] font-bold tracking-[0.3em] text-white/70 uppercase pt-px"
            >
                {props.name}
            </span>
        </div>

        <!-- Status Indicator -->
        <div
            class="flex items-center gap-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.15)]"
        >
            <div
                class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_currentColor]"
            ></div>
            <span
                class="font-mono text-[9px] uppercase tracking-[0.25em] text-emerald-400 font-bold pt-px"
            >
                {metaLabel}
            </span>
        </div>
    </div>

    <!-- Massive Typography Block -->
    <!-- Increased clamp sizes slightly since we have more horizontal room now -->
    <div class="flex flex-col">
        <h1
            class="hero-type font-black text-[clamp(6rem,9vw,11rem)] leading-[0.82] tracking-[-0.03em] text-white/95 mix-blend-plus-lighter"
        >
            {prefix}
        </h1>
        <h1
            class="hero-type font-black text-[clamp(6rem,9vw,11rem)] leading-[0.82] tracking-[-0.03em] text-transparent bg-clip-text bg-gradient-to-br from-white via-primary to-accent drop-shadow-[0_4px_32px_hsl(var(--primary)/0.3)]"
        >
            {suffix}
        </h1>
    </div>

    <!-- Bottom Payload & Marquee Row -->
    <!-- Expanded max-width constraint to take advantage of ultrawide monitors -->
    <div
        class="hero-type mt-12 w-full max-w-[95%] pointer-events-auto flex items-center gap-5"
    >
        <!-- Payload Badge -->
        <div
            class="flex items-center gap-2.5 border border-white/10 bg-white/[0.03] shadow-[0_8px_16px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.15)] backdrop-blur-md px-4 py-2 rounded-xl shrink-0"
        >
            <Cpu
                size={16}
                class="text-primary drop-shadow-[0_0_8px_hsl(var(--primary)/0.6)]"
            />
            <span
                class="font-mono text-[10px] text-white/90 tracking-[0.2em] uppercase font-bold pt-px"
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
