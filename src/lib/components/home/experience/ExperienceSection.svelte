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
        let ctx = gsap.context(() => {
            // Left Anchor Animation
            if (leftPanel) {
                gsap.fromTo(
                    leftPanel.children,
                    { x: -30, opacity: 0 },
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

            // Right Content Panel Animation
            if (rightPanel) {
                gsap.fromTo(
                    rightPanel.children,
                    { y: 30, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1.2,
                        stagger: 0.2,
                        ease: "power3.out",
                        delay: 0.1,
                    },
                );
            }

            // Mobile Animation
            if (mobilePanel) {
                gsap.fromTo(
                    mobilePanel.children,
                    { y: 30, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1.0,
                        stagger: 0.15,
                        ease: "power3.out",
                        delay: 0.1,
                    },
                );
            }
        });
        return () => ctx.revert();
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
    />
{/snippet}

{#snippet careerTimeline(isMobile: boolean)}
    {#if isMobile}
        <div class="w-full flex flex-col gap-3 relative z-10 pt-2 pb-4">
            <GlassCard variant="inset" hover={false} class="w-full !p-6 relative overflow-hidden">
                <!-- Clean hairline timeline -->
                <div class="absolute top-10 bottom-10 left-[39px] w-px bg-foreground/10 z-0"></div>
                
                <div class="flex flex-col gap-8 relative z-10">
                    {#each experienceData.milestones as m, i}
                        <div class="relative flex items-start gap-5 group/node">
                            <!-- Clean minimal node -->
                            <div class="relative z-10 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 
                                {i === experienceData.milestones.length - 1 ? 'bg-background border border-foreground/30 shadow-[0_0_10px_hsl(var(--foreground)/0.05)]' : 'bg-background border border-foreground/10 group-hover/node:border-foreground/30 group-hover/node:bg-foreground/[0.02]'}">
                                
                                {#if i === experienceData.milestones.length - 1}
                                    <div class="absolute -inset-1 rounded-full bg-foreground/5 animate-ping opacity-50 pointer-events-none"></div>
                                {/if}
                                
                                <svelte:component this={getIcon(m.iconName)} size={12} class="transition-colors duration-300 {i === experienceData.milestones.length - 1 ? 'text-foreground' : 'text-muted-foreground group-hover/node:text-foreground/80'}" />
                            </div>
                            
                            <!-- Content Details -->
                            <div class="flex flex-col pt-1 flex-1">
                                <div class="flex items-center gap-2 mb-1.5">
                                    <span class="font-mono text-[10px] font-bold tracking-[0.15em] uppercase" style="color: {m.color}">{m.year}</span>
                                    <span class="text-muted-foreground/30 text-[10px] font-light">/</span>
                                    <span class="text-[12px] font-bold text-foreground/90 group-hover/node:text-foreground transition-colors duration-300 tracking-tight">{m.label}</span>
                                </div>
                                <span class="text-[10px] text-muted-foreground font-mono leading-relaxed transition-colors group-hover/node:text-foreground/70">{m.role}</span>
                            </div>
                        </div>
                    {/each}
                </div>
            </GlassCard>
        </div>
    {:else}
        <div class="w-full flex flex-col relative z-10" style="padding-top: 3.5cqi; padding-bottom: 3.5cqi;">
            <div class="relative w-full">
                
                <!-- Clean horizontal hairline -->
                <div class="absolute top-[3.5cqi] left-[12%] right-[12%] h-px bg-foreground/10 z-0"></div>
                
                <div class="relative flex justify-between items-start w-full z-10 px-6">
                    {#each experienceData.milestones as m, i}
                        <div class="flex flex-col items-center group relative w-[20%]">
                            
                            <!-- Minimal Year Label -->
                            <div class="mb-[1.8cqi] transition-all duration-300">
                                <span class="font-mono font-bold tracking-[0.2em] uppercase text-muted-foreground group-hover:text-foreground transition-colors" style="font-size: clamp(9px, 0.75cqi, 11px);">
                                    {m.year}
                                </span>
                            </div>
                            
                            <!-- Clean Desktop Node -->
                            <div class="flex items-center justify-center transition-all duration-300 rounded-full 
                                {i === experienceData.milestones.length - 1 ? 'bg-background border border-foreground/30 shadow-[0_0_15px_hsl(var(--foreground)/0.05)] scale-105' : 'bg-background border border-foreground/10 group-hover:border-foreground/40 group-hover:bg-foreground/[0.02] group-hover:scale-110'}" 
                                style="width: 2.8cqi; height: 2.8cqi; min-width: 28px; min-height: 28px;">
                                
                                {#if i === experienceData.milestones.length - 1}
                                    <div class="absolute -inset-1.5 rounded-full bg-foreground/5 animate-[ping_3s_ease-out_infinite] opacity-50 pointer-events-none"></div>
                                {/if}
                                
                                <svelte:component this={getIcon(m.iconName)} size={16} class="transition-all duration-300 relative z-10 {i === experienceData.milestones.length - 1 ? 'text-foreground drop-shadow-sm' : 'text-muted-foreground group-hover:text-foreground/90'}" />
                            </div>
                            
                            <!-- Content Details -->
                            <div class="flex flex-col items-center text-center mt-[1.8cqi]" style="max-width: 12cqi;">
                                <span class="font-bold text-foreground/80 group-hover:text-foreground transition-colors duration-300 leading-tight tracking-wide" style="font-size: clamp(10px, 1cqi, 14px); margin-bottom: 0.5cqi;">{m.label}</span>
                                <span class="text-muted-foreground font-mono leading-relaxed transition-colors duration-300 group-hover:text-foreground/70" style="font-size: clamp(8px, 0.75cqi, 11px);">{m.role}</span>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
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
                class="flex flex-col items-center justify-start w-full min-h-[100dvh] max-w-lg mx-auto px-5 pt-16 pb-16"
                style="gap: 2rem;"
            >
                {@render experienceAnchor("center")}
                {@render experienceCard()}
                {@render careerTimeline(true)}

                <div
                    class="flex items-stretch bg-card/80 backdrop-blur-xl rounded-[1.5rem] border border-foreground/10 shadow-[0_20px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] p-1.5 mt-2 w-max mx-auto"
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
