<!-- src/lib/components/ui/cards/SectionCard.svelte -->
<script lang="ts">
    import type { Component } from "svelte";
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

<GlassCard variant="default" accent={accentColor} class="group mb-4 rounded-tl-[1rem]">
    <!-- Header row -->
    <div class="flex items-start justify-between w-full">
        <div class="flex flex-col" style="gap: 2px; margin-top: 2px;">
            <span class="font-mono text-[clamp(9px,1vw,11px)] tracking-[0.3em] uppercase font-semibold"
                  style="color: var(--_accent); filter: drop-shadow(0 0 6px color-mix(in srgb, var(--_accent) 40%, transparent));"
            >
                {badge}
            </span>
            <h3 class="text-[clamp(12px,1.2vw,14px)] font-medium text-foreground/45 tracking-wide">
                {subtitle}
            </h3>
        </div>

        {#if metrics.length > 0}
            <div class="flex" style="gap: max(1rem, 1cqi);">
                {#each metrics as m, i}
                    {#if i > 0}
                        <div class="w-px bg-foreground/10 self-center" style="height: max(1.5rem, 1.5cqi);"></div>
                    {/if}
                    <div class="text-right">
                        <div class="text-foreground/35 uppercase font-mono tracking-wider"
                             style="font-size: clamp(7px, 0.7cqi, 10px);">
                            {m.label}
                        </div>
                        <div class="font-black text-foreground flex items-baseline justify-end"
                             style="font-size: clamp(0.9rem, 1.4cqi, 1.25rem); gap: 0.2cqi;">
                            {m.value}<span class="font-semibold"
                                           style="color: var(--_accent); font-size: clamp(8px, 0.8cqi, 12px);"
                            >{m.unit}</span>
                        </div>
                    </div>
                {/each}
            </div>
        {:else}
            <!-- Icon badge -->
            <div
                class="flex items-center justify-center rounded-xl
                       bg-foreground/[0.03] border border-foreground/[0.06]
                       shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]
                       transition-all duration-500
                       group-hover:scale-110 group-hover:rotate-2 shrink-0"
                style="width: max(2.25rem, 2.8cqi); height: max(2.25rem, 2.8cqi);"
            >
                <Icon
                    size={20}
                    class="text-foreground/60 group-hover:{iconHoverColor} transition-colors duration-500"
                />
            </div>
        {/if}
    </div>

    <!-- Pull-quote description -->
    <div class="relative border-l-2 mt-3"
         style="border-color: color-mix(in srgb, var(--_accent) 40%, transparent);
                padding-left: max(0.9rem, 0.8cqi); padding-top: 3px; padding-bottom: 3px;">
        <div class="absolute left-[-2px] top-0 w-[2px] h-1/3"
             style="background: linear-gradient(to bottom, var(--_accent), transparent);"></div>
        <p class="text-[clamp(1.15rem,1.9vw,1.75rem)] leading-[1.4] text-foreground/85 font-medium tracking-tight">
            {@html shortDescription}
        </p>
    </div>

    <!-- Detail box (inner inset card) -->
    <GlassCard variant="inset" hover={false} class="mt-3">
        <p class="text-[clamp(0.82rem,0.95vw,0.95rem)] leading-[1.8] text-foreground/50">
            {detailedPhilosophy}
        </p>
    </GlassCard>
</GlassCard>
