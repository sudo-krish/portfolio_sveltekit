<script lang="ts">
    import { Cpu } from "lucide-svelte";
    import InfiniteMarquee from "$lib/components/ui/marquee/InfiniteMarquee.svelte";

    // Import the shared hero text
    import { heroContent } from "$lib/data/hero_content";

    // Allow dynamic overrides from parent, but make them optional
    let props = $props<{
        name: string;
        techTags: string[];
        prefix?: string;
        suffix?: string;
        metaLabel?: string;
        payloadLabel?: string;
    }>();

    // Default to heroContent, but allow parent to override
    const prefix = props.prefix ?? heroContent.headline.prefix;
    const suffix = props.suffix ?? heroContent.headline.suffix;
    const metaLabel = props.metaLabel ?? heroContent.headline.metaLabelDesktop;
    const payloadLabel = props.payloadLabel ?? heroContent.marquee.payloadLabel;
</script>

<div class="relative z-10 w-3/5 flex flex-col justify-center">
    <div class="hero-type flex items-center gap-4 mb-6 pl-2">
        <div class="h-[2px] w-12 bg-white/40"></div>
        <span
            class="font-mono text-[11px] font-bold tracking-[0.4em] text-white/80 uppercase"
        >
            {props.name}
        </span>
        <div
            class="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1"
        >
            <div
                class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_currentColor]"
            ></div>
            <span
                class="font-mono text-[9px] uppercase tracking-widest text-emerald-400 font-bold"
            >
                {metaLabel}
            </span>
        </div>
    </div>

    <h1
        class="hero-type font-black text-[clamp(5rem,8vw,9rem)] leading-[0.85] tracking-tighter text-white drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] mix-blend-overlay"
    >
        {prefix}
    </h1>
    <h1
        class="hero-type font-black text-[clamp(5rem,8vw,9rem)] leading-[0.85] tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-accent relative"
    >
        {suffix}
    </h1>

    <div
        class="hero-type mt-10 w-full max-w-[90%] pointer-events-auto flex items-center gap-4"
    >
        <div
            class="flex items-center gap-2 border border-white/5 bg-white/[0.02] px-3 py-1.5 rounded-lg shrink-0"
        >
            <Cpu size={14} class="text-primary" />
            <span
                class="font-mono text-[10px] text-primary tracking-widest uppercase font-bold"
            >
                {payloadLabel}
            </span>
        </div>
        <InfiniteMarquee items={props.techTags} speed="25s" />
    </div>
</div>
