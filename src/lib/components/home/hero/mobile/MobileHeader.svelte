<script lang="ts">
    import { heroContent } from "$lib/data/hero_content";

    let props = $props<{
        name: string;
        prefix?: string;
        suffix?: string;
        metaLabel?: string;
    }>();

    const prefix = props.prefix ?? heroContent.headline.prefix;
    const suffix = props.suffix ?? heroContent.headline.suffix;
    const metaLabel = props.metaLabel ?? heroContent.headline.metaLabelMobile;
</script>

<div class="w-full relative z-10 mb-8 flex flex-col gap-6">
    <!-- Top Identity Bar (Left unchanged) -->
    <div class="hero-type flex items-center justify-between w-full">
        <!-- Name Plate -->
        <div
            class="flex items-center gap-3 bg-white/[0.03] border border-white/5 rounded-full pl-1 pr-4 py-1 backdrop-blur-md shrink-0"
        >
            <div
                class="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center"
            >
                <div class="h-1 w-2.5 bg-white/60 rounded-full"></div>
            </div>
            <span
                class="font-mono text-[9px] font-bold tracking-[0.25em] text-white/70 uppercase pt-px"
            >
                {props.name}
            </span>
        </div>

        <!-- Status Indicator -->
        <div
            class="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1.5 backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.1)] shrink-0"
        >
            <div
                class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_currentColor]"
            ></div>
            <span
                class="font-mono text-[9px] uppercase tracking-widest text-emerald-400 font-bold pt-px"
            >
                {metaLabel}
            </span>
        </div>
    </div>

    <!-- Massive Typography Block (Centered) -->
    <!-- Changed to items-center to horizontally center the stack -->
    <div
        class="flex flex-col items-center w-full max-w-full relative mt-4 mb-2"
    >
        <h1
            class="hero-type text-center font-black text-[clamp(3.5rem,17vw,6rem)] leading-[0.78] tracking-[-0.04em] text-white/95 mix-blend-plus-lighter w-full"
        >
            {prefix}
        </h1>
        <h1
            class="hero-type text-center font-black text-[clamp(3.5rem,17vw,6rem)] leading-[0.78] tracking-[-0.04em] text-transparent bg-clip-text bg-gradient-to-br from-white via-primary to-accent drop-shadow-[0_4px_24px_hsl(var(--primary)/0.4)] w-full"
        >
            {suffix}
        </h1>
    </div>
</div>
