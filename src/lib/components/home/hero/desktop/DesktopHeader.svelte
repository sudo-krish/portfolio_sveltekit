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
    <div
        class="hero-type flex items-center"
        style="gap: 1.2cqi; margin-bottom: 1.5cqi; padding-left: 0.2cqi;"
    >
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
    <div class="flex flex-col" role="presentation">
        <span
            class="hero-type block font-black leading-[0.82] tracking-[-0.04em]
		text-[clamp(6rem,9vw,11rem)] text-foreground/72"
        >
            {prefix}
        </span>

        <span
            class="hero-type block font-black leading-[0.82] tracking-[-0.04em]
	text-[clamp(6rem,9vw,11rem)] text-foreground"
        >
            {suffix}
        </span>
    </div>

    <!-- Semantic Intent Routers -->
    <div
        class="hero-type w-full max-w-[95%] flex flex-wrap items-center gap-3 mt-6 mb-2 pointer-events-auto"
    >
        <a href="/projects" class="btn-hero-nav">
            <span class="hero-index">01</span>
            <span>Explore Projects</span>
        </a>

        <a href="/learn" class="btn-hero-nav">
            <span class="hero-index">02</span>
            <span>Learn Concepts</span>
        </a>

        <a href="/articles" class="btn-hero-nav">
            <span class="hero-index">03</span>
            <span>Read Articles</span>
        </a>

        <a href="/experience" class="btn-hero-nav">
            <span class="hero-index">04</span>
            <span>View Experience</span>
        </a>
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

<style>
    .btn-hero-nav {
        display: inline-flex;
        align-items: center;
        gap: 0.7rem;
        padding: 0.78rem 1rem;
        border-radius: 9999px;
        border: 1px solid hsl(var(--foreground) / 0.08);
        background: linear-gradient(
            180deg,
            hsl(var(--foreground) / 0.045),
            hsl(var(--foreground) / 0.025)
        );
        color: hsl(var(--foreground) / 0.78);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        box-shadow:
            0 8px 24px rgba(0, 0, 0, 0.18),
            inset 0 1px 0 rgba(255, 255, 255, 0.04);
        font-size: 0.92rem;
        font-weight: 520;
        letter-spacing: -0.01em;
        transition:
            transform 180ms ease,
            border-color 180ms ease,
            background 180ms ease,
            color 180ms ease,
            box-shadow 180ms ease;
    }

    .btn-hero-nav:hover {
        transform: translateY(-1px);
        color: hsl(var(--foreground) / 0.96);
        border-color: hsl(var(--primary) / 0.28);
        background: linear-gradient(
            180deg,
            hsl(var(--foreground) / 0.07),
            hsl(var(--foreground) / 0.035)
        );
        box-shadow:
            0 12px 30px rgba(0, 0, 0, 0.22),
            0 0 0 1px hsl(var(--primary) / 0.08) inset;
    }

    .btn-hero-nav:active {
        transform: translateY(0);
    }

    .hero-index {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 1.9rem;
        height: 1.9rem;
        padding: 0 0.45rem;
        border-radius: 9999px;
        background: hsl(var(--foreground) / 0.06);
        border: 1px solid hsl(var(--foreground) / 0.08);
        color: hsl(var(--primary) / 0.9);
        font-size: 0.72rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
            monospace;
    }

    .btn-hero-nav:hover .hero-index {
        background: hsl(var(--primary) / 0.12);
        border-color: hsl(var(--primary) / 0.2);
        color: hsl(var(--primary));
    }
</style>
