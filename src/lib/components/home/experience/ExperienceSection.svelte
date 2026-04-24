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
        headingTag={align === 'center' ? 'div' : 'h2'}
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
        <div class="w-full flex flex-col gap-3 relative z-10">
            <GlassCard variant="inset" hover={false} class="w-full !p-4 relative">
                <div class="absolute top-6 bottom-6 left-[29px] w-px bg-gradient-to-b from-foreground/50 via-foreground/20 to-transparent opacity-50"></div>
                <div class="flex flex-col gap-4 relative z-10">
                    {#each experienceData.milestones as m, i}
                        <div class="relative flex items-start gap-3 group/node">
                            <div class="relative z-10 flex-shrink-0 w-7 h-7 rounded-lg border flex items-center justify-center transition-all duration-300 {i === experienceData.milestones.length - 1 ? 'bg-highlight/15 border-highlight/40 shadow-[0_0_10px_hsl(var(--highlight)/0.2)]' : 'bg-foreground/[0.03] border-foreground/[0.08] group-hover/node:bg-foreground/[0.06]'}">
                                <svelte:component this={getIcon(m.iconName)} size={12} style="color: {m.color}" />
                                {#if i === experienceData.milestones.length - 1}
                                    <div class="absolute -inset-0.5 rounded-lg bg-highlight/20 animate-ping opacity-40 pointer-events-none"></div>
                                {/if}
                            </div>
                            <div class="flex flex-col pt-0.5">
                                <div class="flex items-center gap-1.5 mb-0.5">
                                    <span class="font-mono text-[10px] font-bold" style="color: {m.color}">{m.year}</span>
                                    <span class="text-muted-foreground/50">·</span>
                                    <span class="text-[11px] font-bold text-foreground/80 group-hover/node:text-foreground transition-colors">{m.label}</span>
                                </div>
                                <span class="text-[9px] text-foreground/40 font-mono leading-tight transition-colors">{m.role}</span>
                            </div>
                        </div>
                    {/each}
                </div>
            </GlassCard>
        </div>
    {:else}
        <div class="w-full flex flex-col relative z-10" style="padding-top: 2cqi; padding-bottom: 3cqi;">
            <div class="relative w-full">
                <div class="absolute top-[2.5rem] left-[10%] right-[10%] h-0.5 bg-foreground/5 shadow-[0_0_10px_rgba(255,255,255,0.05)] rounded-full z-0">
                    <div class="absolute top-0 left-0 h-full w-[95%] bg-gradient-to-r from-foreground/50 via-foreground/20 to-transparent rounded-full opacity-80"></div>
                </div>
                <div class="relative flex justify-between items-start w-full z-10 px-2">
                    {#each experienceData.milestones as m, i}
                        <div class="flex flex-col items-center group relative w-1/4">
                            <span class="font-mono font-bold tracking-[0.2em] uppercase transition-all duration-300 transform group-hover:-translate-y-1 opacity-60 group-hover:opacity-100" style="color: {m.color}; font-size: clamp(8px, 0.8cqi, 11px); margin-bottom: 0.8cqi;">{m.year}</span>
                            <GlassCard variant="compact" accent={m.color} hover={false} class="flex items-center justify-center transition-all duration-500 {i === experienceData.milestones.length - 1 ? 'border-highlight/30 shadow-[0_0_20px_hsl(var(--highlight)/0.2)] scale-110 -translate-y-1' : 'group-hover:border-foreground/[0.14] group-hover:-translate-y-1'}" style="width: 3.5cqi; height: 3.5cqi; padding: 0;">
                                {#if i === experienceData.milestones.length - 1}
                                    <div class="absolute -inset-1 rounded-[1.4rem] bg-highlight/10 animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite] opacity-50 pointer-events-none"></div>
                                {/if}
                                <svelte:component this={getIcon(m.iconName)} size={20} class="transition-transform duration-500 group-hover:scale-110 relative z-10 drop-shadow-[0_0_8px_currentColor]" style="color: {i === experienceData.milestones.length - 1 ? 'hsl(var(--highlight))' : 'hsl(var(--muted-foreground))'}; {i !== experienceData.milestones.length - 1 && 'group-hover:color: white;'}" />
                            </GlassCard>
                            <div class="flex flex-col items-center text-center" style="margin-top: 1.2cqi; max-width: 10cqi;">
                                <span class="font-bold text-foreground/70 group-hover:text-foreground transition-colors duration-300 leading-tight tracking-wide" style="font-size: clamp(9px, 0.9cqi, 13px); margin-bottom: 0.3cqi;">{m.label}</span>
                                <div class="h-[1px] w-4 bg-gradient-to-r from-transparent via-foreground/20 to-transparent mb-1.5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <span class="text-foreground/30 group-hover:text-primary/80 font-mono leading-relaxed transition-colors duration-300" style="font-size: clamp(7px, 0.7cqi, 10px);">{m.role}</span>
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
            class="h-full w-full overflow-y-auto overscroll-contain no-scrollbar touch-pan-y relative z-20 pointer-events-auto"
        >
            <div
                bind:this={mobilePanel}
                class="flex flex-col items-center justify-center w-full min-h-[100dvh] max-w-lg mx-auto gap-5 px-4 pt-[12dvh] pb-[20dvh]"
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
