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
            class="flex items-center gap-3 bg-foreground/[0.03] border border-foreground/5 rounded-full pl-1 pr-4 py-1 backdrop-blur-md shrink-0"
        >
            <div
                class="h-6 w-6 rounded-full bg-foreground/10 flex items-center justify-center"
            >
                <div class="h-1 w-2.5 bg-foreground/60 rounded-full"></div>
            </div>
            <span
                class="font-mono text-[9px] font-bold tracking-[0.25em] text-foreground/70 uppercase pt-px"
            >
                {props.name}
            </span>
        </div>

        <!-- Status Indicator -->
        <div
            class="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1.5 backdrop-blur-md shadow-[0_0_15px_hsl(var(--primary)/)] shrink-0"
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
            class="hero-type text-center font-black text-[clamp(3.5rem,17vw,6rem)] leading-[0.78] tracking-[-0.04em] text-foreground/95 mix-blend-plus-lighter w-full"
        >
            {prefix}
        </h1>
        <h1
            class="hero-type text-center font-black text-[clamp(3.5rem,17vw,6rem)] leading-[0.78] tracking-[-0.04em] text-transparent bg-clip-text bg-gradient-to-br from-foreground via-primary to-accent drop-shadow-[0_4px_24px_hsl(var(--primary)/0.4)] w-full"
        >
            {suffix}
        </h1>
    </div>

    <!-- Semantic Intent Routers -->
    <div class="hero-type flex flex-wrap justify-center items-center gap-2 mt-4 pointer-events-auto relative z-50">
        <a href="/projects" class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-foreground/[0.03] border border-foreground/10 font-mono text-[9px] uppercase tracking-widest text-foreground/80 active:bg-foreground/10">
            <span class="text-primary font-bold">01</span> Proof
        </a>
        <a href="/learn" class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-foreground/[0.03] border border-foreground/10 font-mono text-[9px] uppercase tracking-widest text-foreground/80 active:bg-foreground/10">
            <span class="text-primary font-bold">02</span> Concepts
        </a>
        <a href="/articles" class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-foreground/[0.03] border border-foreground/10 font-mono text-[9px] uppercase tracking-widest text-foreground/80 active:bg-foreground/10">
            <span class="text-primary font-bold">03</span> Articles
        </a>
        <a href="/experience" class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-foreground/[0.03] border border-foreground/10 font-mono text-[9px] uppercase tracking-widest text-foreground/80 active:bg-foreground/10">
            <span class="text-primary font-bold">04</span> Journey
        </a>
    </div>
</div>
