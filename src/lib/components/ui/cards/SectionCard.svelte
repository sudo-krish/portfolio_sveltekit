<!-- src/lib/components/ui/cards/SectionCard.svelte -->
<script lang="ts">
    import GlassCard from "./GlassCard.svelte";

    let {
        badge,
        subtitle,
        Icon,
        iconHoverColor = "text-primary",
        accentColor = "hsl(var(--primary))",
        shortDescription,
        detailedPhilosophy,
        metrics = [],
    } = $props<{
        badge: string;
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
                class="flex items-center justify-center rounded-xl
                       bg-primary/10 border border-primary/30
                       group-hover:bg-primary/18 group-hover:border-primary/50
                       transition-all duration-300 shrink-0 shadow-2xs"
                style="width: max(2.2rem, 2.4cqi); height: max(2.2rem, 2.4cqi);"
            >
                <Icon
                    size={17}
                    class="text-primary {iconHoverColor} transition-transform duration-300 group-hover:scale-110"
                />
            </div>
            <h3 class="text-[1.08rem] sm:text-[clamp(1.08rem,1.38vw,1.25rem)] font-heading font-bold text-foreground tracking-tight leading-snug">
                {subtitle}
            </h3>
        </div>

        {#if metrics.length > 0}
            <div
                class="flex items-center shrink-0 ml-auto px-2.5 py-1.5 rounded-xl bg-muted/55 border border-border/75"
                style="gap: max(0.65rem, 0.75cqi);"
            >
                {#each metrics as m, i}
                    {#if i > 0}
                        <div class="w-px bg-border/80 self-stretch my-0.5"></div>
                    {/if}
                    <div class="text-right">
                        <div class="text-muted-foreground uppercase font-mono tracking-wider leading-none mb-0.5"
                             style="font-size: clamp(7.5px, 0.62cqi, 9.5px);">
                            {m.label}
                        </div>
                        <div class="font-mono tabular-nums font-bold text-foreground flex items-baseline justify-end leading-none"
                             style="font-size: clamp(0.85rem, 1.2cqi, 1.1rem); gap: 0.14cqi;">
                            {m.value}<span class="font-semibold"
                                           style="color: var(--_accent); font-size: clamp(7.5px, 0.68cqi, 10px);"
                            >{m.unit}</span>
                        </div>
                    </div>
                {/each}
            </div>
        {:else}
            <span
                class="font-mono text-[10px] tracking-[0.14em] uppercase font-semibold px-2.5 py-1 rounded-md bg-muted/60 border border-border/70 leading-tight"
                style="color: var(--_accent);"
            >
                {badge}
            </span>
        {/if}
    </div>

    <!-- Primary Architectural Statement -->
    <div class="border-t border-border/70 mt-3.5 pt-3.5">
        <p class="text-[1.02rem] sm:text-[clamp(1.06rem,1.65vw,1.42rem)] leading-[1.45] sm:leading-[1.38] text-foreground font-medium tracking-tight mb-0">
            {@html shortDescription}
        </p>
    </div>

    <!-- Specification Ledger Footer (Flat hairline division — zero nested cards) -->
    <div class="border-t border-border/50 mt-3.5 pt-3 flex flex-col gap-2">
        <p class="text-[0.86rem] sm:text-[clamp(0.84rem,0.95vw,0.95rem)] leading-[1.68] text-muted-foreground mb-0">
            {detailedPhilosophy}
        </p>
        {#if metrics.length > 0}
            <div class="flex items-center justify-between gap-2 pt-1.5">
                <div class="flex items-center gap-2">
                    <span class="w-4 h-px bg-primary/55 group-hover:w-6 transition-all duration-300"></span>
                    <span class="font-mono text-[9.5px] uppercase tracking-[0.16em] text-muted-foreground/90 leading-snug">
                        SPEC // {badge}
                    </span>
                </div>
                <span class="h-1.5 w-1.5 rounded-full shrink-0 animate-pulse" style="background: var(--_accent);"></span>
            </div>
        {/if}
    </div>
</GlassCard>
