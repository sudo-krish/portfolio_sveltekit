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
        let ctx = gsap.context(() => {
            if (leftPanel) {
                gsap.fromTo(
                    leftPanel.children,
                    { y: 30, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1.2,
                        stagger: 0.15,
                        ease: "power3.out",
                        delay: 0.1,
                    },
                );
            }
            if (rightPanel) {
                gsap.fromTo(
                    rightPanel.children,
                    { x: 30, opacity: 0 },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 1.0,
                        stagger: 0.15,
                        ease: "power3.out",
                        delay: 0.2,
                    },
                );
            }
        });
        return () => ctx.revert();
    });
</script>

{#snippet leftGrid(isMobile: boolean)}
    {#if isMobile}
        <div class="w-full flex flex-col gap-3 relative z-10">
            <!-- MAIN ACHIEVEMENT CARD (Mobile) -->
            <div class="group relative flex flex-col p-5 sm:p-6 rounded-[1.5rem] bg-card/80 backdrop-blur-[60px] border border-foreground/[0.08] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
                <!-- Top internal highlight -->
                <div class="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-foreground/40 to-transparent opacity-60"></div>
                <!-- Ambient Purple Glow -->


                <div class="relative z-10 flex flex-col gap-4">
                    <!-- Mobile Header Section -->
                    <div class="flex items-center gap-3">
                        <div class="flex items-center justify-center w-10 h-10 rounded-xl bg-muted border border-border shadow-inner text-muted-foreground">
                            <CheckCircle2 size={20} class="drop-shadow-[0_0_8px_hsl(var(--accent)/)]" />
                        </div>
                        <div class="flex flex-col">
                            <span class="text-[16px] sm:text-[18px] font-black text-foreground leading-tight tracking-tight">
                                {resultsData.achievement.title}
                            </span>
                            <span class="text-[9px] sm:text-[10px] font-mono text-primary uppercase tracking-[0.2em] mt-0.5">
                                {resultsData.achievement.subtitle}
                            </span>
                        </div>
                    </div>

                    <!-- Mobile Description -->
                    <p class="text-[0.85rem] sm:text-[0.95rem] leading-[1.7] text-muted-foreground font-light">
                        {@html resultsData.achievement.description}
                    </p>
                </div>
            </div>

            <!-- 4 SMALL METRIC CARDS (2x2 Mobile Grid) -->
            <div class="grid grid-cols-2 gap-3 mt-1">
                {#each resultsData.metrics as m}
                    <div class="group relative flex flex-col items-center justify-center text-center p-4 rounded-2xl bg-card/60 backdrop-blur-[40px] border border-foreground/[0.08] shadow-[0_4px_16px_rgba(0,0,0,0.08)] overflow-hidden">
                        <!-- Dynamic Glow based on Metric Color -->
                        

                        <!-- Card top highlight -->
                        <div class="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-foreground/20 to-transparent opacity-50"></div>

                        <div class="relative z-10 flex flex-col items-center w-full">
                            <!-- Smaller icon box for mobile -->
                            <div class="flex items-center justify-center w-8 h-8 rounded-lg bg-muted border border-border shadow-inner mb-2.5">
                                <svelte:component this={getIcon(m.iconName)} size={14} style="color: {m.color}" />
                            </div>

                            <div class="flex flex-col items-center w-full">
                                <span class="text-2xl sm:text-3xl font-black font-mono leading-none drop-shadow-[0_0_15px_currentColor] mb-1.5" style="color: {m.color}">
                                    {m.value}
                                </span>
                                <span class="text-[9px] sm:text-[10px] font-bold text-foreground uppercase tracking-[0.1em] leading-tight mb-1">
                                    {m.label}
                                </span>
                                <p class="text-[8px] sm:text-[9.5px] font-mono text-muted-foreground leading-snug px-1">
                                    {@html m.description}
                                </p>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    {:else}
        <div class="w-full flex flex-col relative z-10" style="gap: 1cqi; padding-top: 1cqi;">
            <!-- MAIN ACHIEVEMENT CARD (Top Full Width) -->
            <GlassCard variant="default" accent="hsl(var(--foreground))" class="group">
                <div class="flex flex-col" style="gap: 1cqi;">
                    <div class="flex items-center" style="gap: 0.8cqi;">
                        <div class="flex items-center justify-center rounded-xl bg-foreground/[0.03] border border-foreground/[0.05] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] group-hover:-translate-y-1 transition-all duration-500" style="width: 3cqi; height: 3cqi;">
                            <CheckCircle2 size={24} class="text-muted-foreground" />
                        </div>
                        <div class="flex flex-col">
                            <span class="text-[clamp(18px,1.5vw,22px)] font-black text-foreground leading-tight tracking-tight">
                                {resultsData.achievement.title}
                            </span>
                            <span class="font-mono text-muted-foreground/70 uppercase tracking-[0.2em]" style="font-size: clamp(8px, 0.7cqi, 12px); margin-top: 0.3cqi;">
                                {resultsData.achievement.subtitle}
                            </span>
                        </div>
                    </div>

                    <p class="text-[clamp(0.95rem,1vw,1.1rem)] leading-[1.8] text-foreground/50 font-light max-w-[95%]">
                        {@html resultsData.achievement.description}
                    </p>
                </div>
            </GlassCard>

            <!-- 4 SMALL METRIC CARDS (Bottom Grid) -->
            <div class="grid grid-cols-2 md:grid-cols-4" style="gap: 0.6cqi;">
                {#each resultsData.metrics as m}
                    <GlassCard variant="compact" accent={m.color} class="group flex flex-col items-center justify-center text-center">
                        <div class="relative z-10 flex flex-col items-center w-full">
                            <div class="flex items-center justify-center rounded-lg bg-foreground/[0.03] border border-foreground/[0.05] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] group-hover:-translate-y-1 transition-transform duration-500" style="width: 2.2cqi; height: 2.2cqi; margin-bottom: 0.5cqi;">
                                <svelte:component this={getIcon(m.iconName)} size={18} style="color: {m.color}" />
                            </div>

                            <div class="flex flex-col items-center w-full">
                                <span class="font-black font-mono leading-none" style="color: {m.color}; font-size: clamp(1.2rem, 2.2cqi, 2.5rem); margin-bottom: 0.5cqi;">
                                    {m.value}
                                </span>
                                <span class="font-bold text-foreground/80 uppercase tracking-[0.1em] leading-tight" style="font-size: clamp(7px, 0.7cqi, 11px); margin-bottom: 0.4cqi;">
                                    {m.label}
                                </span>
                                <p class="font-mono text-foreground/40 leading-snug" style="font-size: clamp(6.5px, 0.6cqi, 9.5px); padding: 0 0.2cqi;">
                                    {@html m.description}
                                </p>
                            </div>
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
    accentColor={resultsData.ui.carousel.accentColor}
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
                    labelColor="text-muted-foreground/80"
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
                class="flex items-stretch bg-card/80 backdrop-blur-xl rounded-[1.5rem] border border-foreground/10 shadow-[0_20px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)]"
                style="padding: 0.4cqi;"
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
            class="h-full w-full overflow-y-auto overscroll-contain no-scrollbar touch-pan-y relative z-20 pointer-events-auto"
        >
            <div
                class="flex flex-col items-center justify-center w-full min-h-[100dvh] max-w-lg mx-auto gap-5 px-4 pt-[12dvh] pb-[20dvh]"
            >
                <SectionAnchor
                    label={resultsData.rightAnchor.label}
                    title={resultsData.rightAnchor.title}
                    description={resultsData.rightAnchor.description}
                    labelColor="text-muted-foreground/80"
                    align="center"
                    headingTag="div"
                />

                <div
                    class="flex items-stretch bg-card/80 backdrop-blur-xl rounded-[1.5rem] border border-foreground/10 shadow-[0_20px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] p-1.5 w-max mx-auto"
                >
                    <PillButton
                        href={resultsData.ui.cta.href}
                        label={resultsData.ui.cta.label}
                        Icon={ArrowRight}
                        accentColor="purple"
                    />
                </div>

                <!-- Mobile specific grid (stacked logic) -->
                {@render leftGrid(true)}
            </div>
        </div>
    </svelte:fragment>
</MobileCarousel>
