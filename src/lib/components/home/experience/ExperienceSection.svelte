<!-- src/lib/components/home/experience/ExperienceSection.svelte -->
<script lang="ts">
    import { onMount } from "svelte";
    import gsap from "gsap";
    import GlowAccent from "$lib/components/ui/GlowAccent.svelte";
    import MobileCarousel from "$lib/components/ui/MobileCarousel.svelte";
    import { experienceData } from "$lib/data/experience";

    import SectionAnchor from "$lib/components/ui/anchors/SectionAnchor.svelte";
    import SectionCard from "$lib/components/ui/cards/SectionCard.svelte";
    import GlassCard from "$lib/components/ui/cards/GlassCard.svelte";
    import PillButton from "$lib/components/ui/buttons/PillButton.svelte";
    import { Briefcase, ArrowRight, Terminal, Cloud, Zap, Sparkles } from "lucide-svelte";

    let leftPanel: HTMLElement;
    let rightPanel: HTMLElement;
    let mobilePanel: HTMLElement;

    const getIcon = (name: string) => {
        switch (name) {
            case "Terminal": return Terminal;
            case "Cloud": return Cloud;
            case "Zap": return Zap;
            case "Sparkles": return Sparkles;
            default: return Terminal;
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
                                    { x: -24, opacity: 0 },
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
                            if (rightPanel) {
                                gsap.fromTo(
                                    rightPanel.children,
                                    { y: 24, opacity: 0 },
                                    {
                                        y: 0,
                                        opacity: 1,
                                        duration: 0.85,
                                        stagger: 0.12,
                                        ease: "expo.out",
                                        delay: 0.06,
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

{#snippet experienceAnchor(align: "left" | "center" | "right")}
    <SectionAnchor
        label={experienceData.leftAnchor.label}
        title={experienceData.leftAnchor.title}
        description={experienceData.leftAnchor.description}
        labelColor="text-primary/80"
        align={align}
    />
{/snippet}

{#snippet experienceCard()}
    <SectionCard
        badge={experienceData.header.badge}
        subtitle="Career Progression"
        Icon={Briefcase}
        iconHoverColor="text-primary"
        accentColor="hsl(var(--primary))"
        shortDescription={experienceData.content.shortDescription}
        detailedPhilosophy={experienceData.content.detailedPhilosophy}
        metrics={[
            { label: "Tenure", value: "5+", unit: "Yrs" },
            { label: "Scale", value: "50", unit: "M+/day" },
        ]}
    />
{/snippet}

{#snippet careerTimeline(isMobile: boolean)}
    {#if isMobile}
        <div class="w-full flex flex-col gap-3 relative z-10 pt-1 pb-3">
            <GlassCard variant="default" hover={false} class="w-full !p-5 relative overflow-hidden">
                <!-- Clean hairline timeline -->
                <div class="absolute top-9 bottom-9 left-[35px] w-px bg-border/80 z-0"></div>
                
                <div class="flex flex-col gap-6 relative z-10">
                    {#each experienceData.milestones as m, i}
                        <div class="relative flex items-start gap-4 group/node">
                            <!-- Architectural node -->
                            <div class="relative z-10 flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 
                                {i === experienceData.milestones.length - 1 ? 'bg-primary/15 border border-primary/50 text-primary shadow-2xs' : 'bg-muted/80 border border-border/80 text-muted-foreground group-hover/node:border-primary/40 group-hover/node:text-foreground'}">
                                <svelte:component this={getIcon(m.iconName)} size={14} />
                            </div>
                            
                            <!-- Content Details -->
                            <div class="flex flex-col pt-0.5 flex-1">
                                <div class="flex items-center gap-2 mb-1">
                                    <span class="font-mono tabular-nums text-[11px] font-bold tracking-wider uppercase text-primary">{m.year}</span>
                                    <span class="text-border text-[11px]">/</span>
                                    <span class="text-[13.5px] font-heading font-bold text-foreground tracking-tight">{m.label}</span>
                                </div>
                                <span class="text-[12px] text-muted-foreground leading-relaxed">{m.role}</span>
                            </div>
                        </div>
                    {/each}
                </div>
            </GlassCard>
        </div>
    {:else}
        <div class="w-full flex flex-col relative z-10" style="padding-top: 2cqi; padding-bottom: 2cqi;">
            <GlassCard variant="compact" hover={false} class="w-full !p-5">
                <div class="relative w-full">
                    <!-- Clean horizontal hairline -->
                    <div class="absolute top-[2.85rem] left-[10%] right-[10%] h-px bg-border/80 z-0"></div>
                    
                    <div class="relative grid grid-cols-4 gap-4 w-full z-10">
                        {#each experienceData.milestones as m, i}
                            <div class="flex flex-col items-center group relative">
                                <!-- Tabular Year Label -->
                                <div class="mb-3">
                                    <span class="font-mono tabular-nums font-bold tracking-[0.18em] uppercase {i === experienceData.milestones.length - 1 ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'} transition-colors" style="font-size: clamp(10px, 0.78cqi, 12px);">
                                        {m.year}
                                    </span>
                                </div>
                                
                                <!-- Architectural Desktop Node -->
                                <div class="flex items-center justify-center transition-all duration-300 rounded-lg 
                                    {i === experienceData.milestones.length - 1 ? 'bg-primary/15 border border-primary/50 text-primary shadow-xs' : 'bg-card border border-border/80 text-muted-foreground group-hover:border-primary/40 group-hover:text-foreground'}" 
                                    style="width: 2.4rem; height: 2.4rem;">
                                    <svelte:component this={getIcon(m.iconName)} size={15} class="relative z-10" />
                                </div>
                                
                                <!-- Content Details -->
                                <div class="flex flex-col items-center text-center mt-3">
                                    <span class="font-heading font-bold text-foreground leading-tight tracking-tight" style="font-size: clamp(11px, 0.95cqi, 13.5px); margin-bottom: 0.35cqi;">{m.label}</span>
                                    <span class="text-muted-foreground leading-snug" style="font-size: clamp(9.5px, 0.76cqi, 11.5px);">{m.role}</span>
                                </div>
                            </div>
                        {/each}
                    </div>
                </div>
            </GlassCard>
        </div>
    {/if}
{/snippet}

<MobileCarousel
    layout="right"
    sectionTitle={experienceData.ui.carousel.sectionTitle}
    sectionDescription={experienceData.ui.carousel.sectionDescription}
    accentColor={experienceData.ui.carousel.accentColor}
>
    <!-- ========================================== -->
    <!-- DESKTOP / TABLET                           -->
    <!-- ========================================== -->
    <svelte:fragment slot="content-pc">
        <GlowAccent
            color={experienceData.ui.carousel.accentColor}
            position="top-[20%] left-[15%]"
            size={700}
        />

        <div
            class="absolute inset-0 z-20 pointer-events-none flex relative"
            style="container-type: size; padding: 3cqi 0 1cqi 0;"
        >
            <!-- LEFT 45%: Typographic Anchor & 3D Space -->
            <div
                bind:this={leftPanel}
                class="w-[45%] h-full flex flex-col items-start justify-end pointer-events-auto"
                style="padding-left: 3cqi; padding-bottom: 2cqi;"
            >
                {@render experienceAnchor("left")}
            </div>

            <!-- RIGHT 55%: Dense Content & Timeline -->
            <div
                bind:this={rightPanel}
                class="w-[55%] h-full flex flex-col items-end justify-center pointer-events-auto"
                style="padding-right: 3cqi;"
            >
                <div
                    class="flex flex-col items-end w-full"
                    style="gap: 0.8cqi;"
                >
                    {@render experienceCard()}
                    {@render careerTimeline(false)}
                </div>
            </div>
        </div>

        <!-- BOTTOM LEFT: CTA Dock -->
        <div
            class="absolute left-[3cqi] bottom-[2cqi] z-40 pointer-events-auto flex justify-start"
        >
            <div
                class="flex items-stretch bg-card/88 backdrop-blur-xl rounded-2xl border border-border/80 shadow-[var(--shadow-lg)]"
                style="padding: 0.38cqi;"
            >
                <PillButton
                    href={experienceData.ui.cta.href}
                    label={experienceData.ui.cta.label}
                    sublabel="Full Resume"
                    Icon={ArrowRight}
                    accentColor="blue"
                />
            </div>
        </div>
    </svelte:fragment>

    <!-- ========================================== -->
    <!-- MOBILE / SMALL TABLET                      -->
    <!-- ========================================== -->
    <svelte:fragment slot="content-mobile">
        <div
            class="w-full relative z-20 pointer-events-auto"
        >
            <div
                bind:this={mobilePanel}
                class="flex flex-col items-start justify-start w-full min-h-[100dvh] max-w-xl md:max-w-2xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-12 gap-4 sm:gap-5"
            >
                {@render experienceAnchor("left")}
                {@render experienceCard()}
                {@render careerTimeline(true)}

                <div
                    class="flex items-stretch bg-card/90 backdrop-blur-xl rounded-2xl border border-border/80 shadow-[var(--shadow-md)] p-1.5 w-max"
                >
                    <PillButton
                        href={experienceData.ui.cta.href}
                        label={experienceData.ui.cta.label}
                        Icon={ArrowRight}
                        accentColor="blue"
                    />
                </div>
            </div>
        </div>
    </svelte:fragment>
</MobileCarousel>
