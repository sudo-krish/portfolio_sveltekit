<!-- src/lib/components/ui/cards/SectionCard.svelte -->
<script lang="ts">
    import GlassCard from "./GlassCard.svelte";

    let {
        badge = "",
        subtitle,
        Icon,
        iconHoverColor = "text-primary",
        accentColor = "hsl(var(--primary))",
        shortDescription,
        detailedPhilosophy,
        metrics = [],
    } = $props<{
        badge?: string;
        subtitle: string;
        Icon: any;
        iconHoverColor?: string;
        /** CSS color value for accent line */
        accentColor?: string;
        shortDescription: string;
        detailedPhilosophy: string;
        metrics?: { label: string; value: string; unit: string }[];
    }>();
</script>

<GlassCard variant="default" accent={accentColor} class="group mb-3 sm:mb-4 w-full">
    <!-- Specification Header Row (Wraps cleanly on mobile; never truncates title) -->
    <div class="flex flex-wrap items-center justify-between gap-y-2.5 gap-x-4 w-full">
        <div class="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div
                class="flex items-center justify-center rounded-lg border transition-all duration-300 shrink-0 shadow-2xs"
                style="width: max(2.1rem, 2.35cqi); height: max(2.1rem, 2.35cqi); background-color: color-mix(in srgb, {accentColor} 12%, hsl(var(--card))); border-color: color-mix(in srgb, {accentColor} 32%, hsl(var(--border)));"
            >
                <Icon
                    size={17}
                    style="color: {accentColor};"
                    class="transition-transform duration-300 group-hover:scale-110"
                />
            </div>
            <h3 class="text-[1.05rem] sm:text-[clamp(1.05rem,1.35vw,1.22rem)] font-heading font-bold text-foreground tracking-tight leading-snug">
                {subtitle}
            </h3>
        </div>

        {#if metrics.length > 0}
            <div class="flex items-center shrink-0 ml-auto" style="gap: max(0.75rem, 0.85cqi);">
                {#each metrics as m, i}
                    {#if i > 0}
                        <div class="w-px bg-border/80 self-center" style="height: max(1.35rem, 1.35cqi);"></div>
                    {/if}
                    <div class="text-right">
                        <div class="text-muted-foreground uppercase font-mono tracking-wider"
                             style="font-size: clamp(8px, 0.68cqi, 10px);">
                            {m.label}
                        </div>
                        <div class="font-mono tabular-nums font-bold text-foreground flex items-baseline justify-end"
                             style="font-size: clamp(0.88rem, 1.3cqi, 1.18rem); gap: 0.16cqi;">
                            {m.value}<span class="font-semibold"
                                           style="color: var(--_accent); font-size: clamp(8px, 0.72cqi, 11px);"
                            >{m.unit}</span>
                        </div>
                    </div>
                {/each}
            </div>
        {:else if badge}
            <span
                class="font-mono text-[10px] tracking-[0.14em] uppercase font-semibold px-2.5 py-1 rounded-md bg-muted/60 border border-border/70 leading-tight"
                style="color: var(--_accent);"
            >
                {badge}
            </span>
        {/if}
    </div>

    <!-- Primary Architectural Statement -->
    <div class="border-t mt-3.5 pt-3.5" style="border-color: color-mix(in srgb, {accentColor} 22%, hsl(var(--border) / 0.7));">
        <p class="text-[1rem] sm:text-[clamp(1.06rem,1.65vw,1.45rem)] leading-[1.45] sm:leading-[1.38] text-foreground font-medium tracking-tight mb-0">
            {@html shortDescription}
        </p>
    </div>

    <!-- Engineering Philosophy Ledger (Clean hairline division — zero repetitive spec clutter) -->
    <div class="border-t border-border/60 mt-3.5 pt-3">
        <p class="text-[0.86rem] sm:text-[clamp(0.84rem,0.95vw,0.95rem)] leading-[1.68] text-muted-foreground mb-0">
            {detailedPhilosophy}
        </p>
    </div>
</GlassCard>
