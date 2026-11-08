<!-- src/lib/components/home/impact/ImpactSection.svelte -->
<script lang="ts">
    import { onMount } from "svelte";
    import gsap from "gsap";
    import GlowAccent from "$lib/components/ui/GlowAccent.svelte";
    import MobileCarousel from "$lib/components/ui/MobileCarousel.svelte";
    import { resultsData } from "$lib/data/results";

    import SectionAnchor from "$lib/components/ui/anchors/SectionAnchor.svelte";
    import PillButton from "$lib/components/ui/buttons/PillButton.svelte";
    import GlassCard from "$lib/components/ui/cards/GlassCard.svelte";
    import { ArrowRight, TrendingUp, Target, Zap, Award, CheckCircle2 } from "lucide-svelte";

    let leftPanel: HTMLElement;
    let rightPanel: HTMLElement;

    const getIcon = (name: string) => {
        switch (name) {
            case "TrendingUp": return TrendingUp;
            case "Target": return Target;
            case "Zap": return Zap;
            case "Award": return Award;
            default: return TrendingUp;
        }
    };

    onMount(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        let ctx = gsap.context(() => {});
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        ctx.add(() => {
                            if (leftPanel) {
                                gsap.fromTo(
                                    leftPanel.children,
                                    { y: 24, opacity: 0 },
                                    {
                                        y: 0,
                                        opacity: 1,
                                        duration: 0.85,
                                        stagger: 0.1,
                                        ease: "expo.out",
                                        delay: 0.06,
                                        clearProps: "transform,opacity",
                                    },
                                );
                            }
                            if (rightPanel) {
                                gsap.fromTo(
                                    rightPanel.children,
                                    { x: 24, opacity: 0 },
                                    {
                                        x: 0,
                                        opacity: 1,
                                        duration: 0.75,
                                        stagger: 0.1,
                                        ease: "expo.out",
                                        clearProps: "transform,opacity",
                                    },
                                );
                            }
                        });
                    }
                });
            },
            { threshold: 0.25 },
        );
        if (leftPanel) observer.observe(leftPanel);
        return () => {
            observer.disconnect();
            ctx.revert();
        };
    });
</script>

{#snippet leftGrid(isMobile: boolean)}
    {#if isMobile}
        <div class="w-full flex flex-col gap-3.5 relative z-10">
            <!-- MAIN ACHIEVEMENT SPECIFICATION SHEET (Mobile) -->
            <GlassCard variant="default" accent="hsl(24 95% 53%)" class="group">
                <div class="flex flex-col gap-3.5">
                    <div class="flex items-center justify-between gap-3 pb-3 border-b border-border/70">
                        <div class="flex items-center gap-2.5">
                            <div class="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-500/15 border border-orange-500/40 text-orange-400 shrink-0">
                                <CheckCircle2 size={17} />
                            </div>
                            <h3 class="text-[16px] sm:text-[18px] font-heading font-bold text-foreground leading-tight tracking-tight">
                                {resultsData.achievement.title}
                            </h3>
                        </div>
                        <span class="text-[10px] font-mono text-orange-400 uppercase tracking-[0.16em] font-semibold px-2 py-1 rounded bg-muted/60 border border-border/70 shrink-0">
                            {resultsData.achievement.subtitle}
                        </span>
                    </div>

                    <p class="text-[0.92rem] leading-[1.68] text-muted-foreground mb-0">
                        {@html resultsData.achievement.description}
                    </p>
                </div>
            </GlassCard>

            <!-- TELEMETRY PROOF LEDGER (2-Column Mobile Grid) -->
            <div class="grid grid-cols-2 gap-3">
                {#each resultsData.metrics as m}
                    <GlassCard variant="compact" accent="hsl(24 95% 53%)" class="group flex flex-col justify-between text-left">
                        <div class="flex items-center justify-between w-full mb-2 pb-2 border-b border-border/60">
                            <span class="text-[10px] font-heading font-bold text-foreground uppercase tracking-wider leading-tight">
                                {m.label}
                            </span>
                            <svelte:component this={getIcon(m.iconName)} size={13} class="text-orange-400 shrink-0" />
                        </div>

                        <div class="flex flex-col w-full">
                            <span class="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-orange-400 leading-none mb-2">
                                {m.value}
                            </span>
                            <p class="text-[11px] text-muted-foreground leading-snug mb-0">
                                {@html m.description}
                            </p>
                        </div>
                    </GlassCard>
                {/each}
            </div>
        </div>
    {:else}
        <div class="w-full flex flex-col relative z-10" style="gap: 0.85cqi; padding-top: 0.5cqi;">
            <!-- MAIN ACHIEVEMENT SPECIFICATION SHEET (Top Full Width) -->
            <GlassCard variant="default" accent="hsl(24 95% 53%)" class="group">
                <div class="flex flex-col" style="gap: 0.85cqi;">
                    <div class="flex items-center justify-between pb-3 border-b border-border/70" style="gap: 0.8cqi;">
                        <div class="flex items-center" style="gap: 0.7cqi;">
                            <div class="flex items-center justify-center rounded-lg bg-orange-500/15 border border-orange-500/40 text-orange-400 shrink-0" style="width: 2.3rem; height: 2.3rem;">
                                <CheckCircle2 size={18} />
                            </div>
                            <h3 class="text-[clamp(17px,1.4vw,21px)] font-heading font-bold text-foreground leading-tight tracking-tight">
                                {resultsData.achievement.title}
                            </h3>
                        </div>
                        <span class="font-mono text-orange-400 uppercase tracking-[0.18em] font-semibold px-2.5 py-1 rounded-md bg-muted/60 border border-border/70 shrink-0" style="font-size: clamp(9px, 0.7cqi, 11px);">
                            {resultsData.achievement.subtitle}
                        </span>
                    </div>

                    <p class="text-[clamp(0.9rem,0.98vw,1.04rem)] leading-[1.7] text-muted-foreground max-w-[96%] mb-0">
                        {@html resultsData.achievement.description}
                    </p>
                </div>
            </GlassCard>

            <!-- TELEMETRY PROOF LEDGER (Bottom Grid) -->
            <div class="grid grid-cols-2 md:grid-cols-5" style="gap: 0.6cqi;">
                {#each resultsData.metrics as m}
                    <GlassCard variant="compact" accent="hsl(24 95% 53%)" class="group flex flex-col justify-between text-left">
                        <div class="flex items-center justify-between w-full pb-2 mb-2 border-b border-border/60">
                            <span class="font-heading font-bold text-foreground uppercase tracking-wide leading-tight" style="font-size: clamp(8.5px, 0.72cqi, 11px);">
                                {m.label}
                            </span>
                            <svelte:component this={getIcon(m.iconName)} size={14} class="text-orange-400 shrink-0" />
                        </div>

                        <div class="flex flex-col w-full">
                            <span class="font-bold font-mono tabular-nums text-orange-400 leading-none" style="font-size: clamp(1.25rem, 1.9cqi, 2.1rem); margin-bottom: 0.45cqi;">
                                {m.value}
                            </span>
                            <p class="text-muted-foreground leading-snug mb-0" style="font-size: clamp(8.5px, 0.68cqi, 11px);">
                                {@html m.description}
                            </p>
                        </div>
                    </GlassCard>
                {/each}
            </div>
        </div>
    {/if}
{/snippet}

<MobileCarousel
    layout="left"
    sectionTitle={resultsData.ui.carousel.sectionTitle}
    sectionDescription={resultsData.ui.carousel.sectionDescription}
    accentColor="hsl(24 95% 53%)"
    modelLabel="SLA Proof"
    briefLabel="Verified Metrics"
>
    <!-- DESKTOP / TABLET -->
    <svelte:fragment slot="content-pc">
        <GlowAccent
            color={resultsData.ui.carousel.accentColor}
            position="top-[20%] left-[10%]"
            size={700}
        />

        <div
            class="absolute inset-0 z-20 pointer-events-none flex relative"
            style="container-type: size; padding: 3cqi 0 1cqi 0;"
        >
            <div
                bind:this={leftPanel}
                class="w-[55%] h-full flex flex-col justify-center pointer-events-auto"
                style="padding-left: 3cqi;"
            >
                {@render leftGrid(false)}
            </div>

            <div
                bind:this={rightPanel}
                class="w-[45%] h-full flex flex-col justify-end items-end text-right pointer-events-auto"
                style="padding-right: 3cqi; padding-bottom: 2cqi;"
            >
                <SectionAnchor
                    label={resultsData.rightAnchor.label}
                    title={resultsData.rightAnchor.title}
                    description={resultsData.rightAnchor.description}
                    labelColor="text-orange-400/90"
                    accentColor="hsl(24 95% 53%)"
                    align="right"
                />
            </div>
        </div>

        <!-- CENTER BOTTOM: CTA Dock -->
        <div
            class="absolute left-1/2 -translate-x-1/2 z-40 pointer-events-auto flex justify-center"
            style="bottom: 2cqi; max-width: 20cqi;"
        >
            <div
                class="flex items-stretch bg-card/88 backdrop-blur-xl rounded-2xl border border-border/80 shadow-[var(--shadow-lg)]"
                style="padding: 0.38cqi;"
            >
                <PillButton
                    href={resultsData.ui.cta.href}
                    label={resultsData.ui.cta.label}
                    sublabel="Case Studies"
                    Icon={ArrowRight}
                    accentColor="purple"
                />
            </div>
        </div>
    </svelte:fragment>

    <!-- MOBILE / SMALL TABLET -->
    <svelte:fragment slot="content-mobile">
        <div
            class="w-full relative z-20 pointer-events-auto"
        >
            <div
                class="flex flex-col items-start justify-start w-full min-h-[100dvh] max-w-xl md:max-w-2xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-12 gap-4 sm:gap-5"
            >
                <SectionAnchor
                    label={resultsData.rightAnchor.label}
                    title={resultsData.rightAnchor.title}
                    description={resultsData.rightAnchor.description}
                    labelColor="text-orange-400/90"
                    accentColor="hsl(24 95% 53%)"
                    align="left"
                />

                <!-- Mobile specific grid (stacked logic) -->
                {@render leftGrid(true)}

                <div
                    class="flex items-stretch bg-card/90 backdrop-blur-xl rounded-2xl border border-border/80 shadow-[var(--shadow-md)] p-1.5 w-max"
                >
                    <PillButton
                        href={resultsData.ui.cta.href}
                        label={resultsData.ui.cta.label}
                        Icon={ArrowRight}
                        accentColor="orange"
                    />
                </div>
            </div>
        </div>
    </svelte:fragment>
</MobileCarousel>
