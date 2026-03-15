<!-- src/lib/components/ui/cards/SectionCard.svelte -->
<script lang="ts">
    import { Card } from "$lib/components/ui/card";

    let {
        badge,
        subtitle,
        Icon,
        iconHoverColor = "text-primary",
        accentColor = "border-primary/40",
        gradientFrom = "from-primary",
        shortDescription,
        detailedPhilosophy,
        metrics = [],
    } = $props<{
        badge: string;
        subtitle: string;
        Icon: any;
        iconHoverColor?: string;
        accentColor?: string;
        gradientFrom?: string;
        shortDescription: string;
        detailedPhilosophy: string;
        metrics?: { label: string; value: string; unit: string }[];
    }>();
</script>

<Card
    class="glass-shard relative w-full mb-4 rounded-[2rem] rounded-tl-[1rem]
           bg-card/80 backdrop-blur-2xl border border-foreground/10
           shadow-[0_30px_80px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.1)] overflow-hidden group"
>
    <!-- Soft background glow -->
    <div
        class="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
    ></div>

    <!-- Accent line top -->
    <div
        class="pointer-events-none absolute inset-x-0 top-0 h-[1px]
           bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50"
    ></div>

    <!-- Radial Glow Blob -->
    <div
        class="pointer-events-none absolute -right-20 -top-20
           w-64 h-64 rounded-full
           bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.3)_0%,transparent_60%)]
           opacity-60 dark:mix-blend-screen transition-opacity duration-700 group-hover:opacity-100"
    ></div>

    <div class="relative z-10 flex flex-col" style="padding: max(1.25rem, 1cqi); gap: max(0.75rem, 0.5cqi);">
        <!-- Floating Header Area -->
        <div class="flex items-start justify-between w-full">
            <div class="flex flex-col" style="gap: max(0.25rem, 0.2cqi); margin-top: max(0.25rem, 0.2cqi);">
                <span
                    class="font-mono text-[clamp(9px,1vw,11px)] tracking-[0.3em] uppercase text-primary/80 font-semibold drop-shadow-[0_0_8px_hsl(var(--primary)/0.3)]"
                >
                    {badge}
                </span>
                <span
                    class="text-[clamp(12px,1.2vw,14px)] font-medium text-foreground/50 tracking-wide"
                >
                    {subtitle}
                </span>
            </div>

            <!-- Right side: Metrics OR Icon Badge -->
            {#if metrics.length > 0}
                <div class="flex" style="gap: max(1rem, 1cqi);">
                    {#each metrics as m, i}
                        {#if i > 0}
                            <div class="w-px bg-foreground/10 self-center" style="height: max(1.5rem, 1.5cqi);"></div>
                        {/if}
                        <div class="text-right">
                            <div
                                class="text-foreground/40 uppercase font-mono tracking-wider"
                                style="font-size: clamp(7px, 0.7cqi, 10px);"
                            >
                                {m.label}
                            </div>
                            <div
                                class="font-black text-foreground flex items-baseline justify-end"
                                style="font-size: clamp(0.9rem, 1.4cqi, 1.25rem); gap: 0.2cqi;"
                            >
                                {m.value}<span
                                    class="text-primary font-semibold"
                                    style="font-size: clamp(8px, 0.8cqi, 12px);"
                                >{m.unit}</span>
                            </div>
                        </div>
                    {/each}
                </div>
            {:else}
                <!-- Floating Icon Badge -->
                <div
                    class="flex items-center justify-center rounded-2xl
                     bg-foreground/[0.03] border border-foreground/10 backdrop-blur-md
                     shadow-[0_8px_16px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.1)]
                     transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shrink-0"
                    style="width: max(2.5rem, 3cqi); height: max(2.5rem, 3cqi);"
                >
                    <Icon
                        size={22}
                        class="text-foreground/80 group-hover:{iconHoverColor} transition-colors duration-500 drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]"
                    />
                </div>
            {/if}
        </div>

        <!-- Main Statement (Pull Quote Style) -->
        <div class="relative border-l-2 {accentColor}" style="padding-left: max(1rem, 0.8cqi); padding-top: max(0.25rem, 0.3cqi); padding-bottom: max(0.25rem, 0.3cqi);">
            <div
                class="absolute left-[-2px] top-0 w-[2px] h-1/3 bg-gradient-to-b {gradientFrom} to-transparent"
            ></div>
            <p
                class="text-[clamp(1.2rem,2vw,1.875rem)] leading-[1.4] text-foreground/95 font-medium tracking-tight"
            >
                {@html shortDescription}
            </p>
        </div>

        <!-- Details Box (Inner Frosted Glass) -->
        <div
            class="relative rounded-2xl bg-foreground/[0.02] border border-foreground/[0.05] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
            style="margin-top: max(0.5rem, 0.4cqi); padding: max(1.25rem, 1.2cqi);"
        >
            <p
                class="text-[clamp(0.85rem,1vw,1rem)] leading-[1.8] text-foreground/60"
            >
                {detailedPhilosophy}
            </p>
        </div>
    </div>
</Card>
