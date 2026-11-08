<!-- src/lib/components/home/techstack/TechStackSection.svelte -->
<script lang="ts">
    import { onMount } from "svelte";
    import gsap from "gsap";
    import GlowAccent from "$lib/components/ui/GlowAccent.svelte";
    import MobileCarousel from "$lib/components/ui/MobileCarousel.svelte";
    import { techstackData } from "$lib/data/techstack";

    import SectionAnchor from "$lib/components/ui/anchors/SectionAnchor.svelte";
    import PillButton from "$lib/components/ui/buttons/PillButton.svelte";
    import GlassCard from "$lib/components/ui/cards/GlassCard.svelte";
    import {
        ArrowRight,
        Cloud,
        Database,
        Code2,
        GitBranch,
        Layers,
    } from "lucide-svelte";

    let leftPanel: HTMLElement;
    let rightPanel: HTMLElement;
    let mobilePanel: HTMLElement;

    const getIcon = (name: string) => {
        switch (name) {
            case "Cloud":
                return Cloud;
            case "Database":
                return Database;
            case "Code2":
                return Code2;
            case "GitBranch":
                return GitBranch;
            default:
                return Layers;
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

{#snippet techStackGrid(isMobile: boolean)}
    {#if isMobile}
        <div class="w-full flex flex-col gap-3.5 relative z-10">
            <!-- Top Narrative Specification Box -->
            <GlassCard variant="default" accent="hsl(var(--primary))" class="w-full">
                <p class="text-[0.92rem] text-foreground/95 leading-relaxed mb-0">
                    {@html techstackData.content.shortDescription}
                </p>
            </GlassCard>

            <!-- Grid of Skill Cards -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                {#each techstackData.categories as cat}
                    <GlassCard
                        variant="compact"
                        accent={cat.accent}
                        class="flex flex-col !p-4"
                    >
                        <div class="flex items-center justify-between gap-2.5 pb-2.5 mb-3 border-b border-border/70">
                            <div class="flex items-center gap-2.5 min-w-0">
                                <div
                                    class="w-7 h-7 rounded-lg bg-muted/80 border border-border/80 flex items-center justify-center shrink-0"
                                >
                                    <svelte:component
                                        this={getIcon(cat.iconName)}
                                        size={14}
                                        style="color: {cat.accent}"
                                    />
                                </div>
                                <span
                                    class="text-[13.5px] font-heading font-bold text-foreground tracking-tight leading-snug"
                                    >{cat.name}</span
                                >
                            </div>
                            <span class="font-mono tabular-nums text-[9.5px] font-bold uppercase tracking-wider text-muted-foreground px-2 py-0.5 rounded bg-muted/60 border border-border/70 shrink-0">
                                {cat.skills.length}
                            </span>
                        </div>
                        <div class="flex flex-wrap gap-1.5 relative z-10">
                            {#each cat.skills as skill}
                                <div
                                    class="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-border/80 bg-muted/50 text-[11px] font-mono text-foreground/90 hover:border-primary/40 transition-colors"
                                >
                                    <span class="w-4 h-4 rounded bg-white/95 border border-border/50 flex items-center justify-center p-0.5 shrink-0">
                                        <img
                                            src={skill.icon}
                                            alt={skill.name}
                                            class="w-full h-full object-contain"
                                            loading="lazy"
                                            width="12"
                                            height="12"
                                        />
                                    </span>
                                    <span>{skill.name}</span>
                                </div>
                            {/each}
                        </div>
                    </GlassCard>
                {/each}
            </div>
        </div>
    {:else}
        <div class="w-full flex flex-col relative z-10" style="gap: 0.75cqi;">
            <!-- 3x2 Grid of Architectural Specification Skill Cards -->
            <div class="grid grid-cols-2 xl:grid-cols-3" style="gap: 0.75cqi;">
                {#each techstackData.categories as cat}
                    <GlassCard
                        variant="compact"
                        accent={cat.accent}
                        class="group flex flex-col"
                    >
                        <div
                            class="flex items-center relative z-10 border-b border-border/70"
                            style="gap: 0.5cqi; margin-bottom: 0.55cqi; padding-bottom: 0.45cqi;"
                        >
                            <div
                                class="rounded-lg bg-muted/80 border border-border/80 flex items-center justify-center shrink-0"
                                style="width: 1.65cqi; height: 1.65cqi; min-width: 24px; min-height: 24px;"
                            >
                                <svelte:component
                                    this={getIcon(cat.iconName)}
                                    size={14}
                                    style="color: {cat.accent}"
                                />
                            </div>
                            <span
                                class="font-heading font-bold text-foreground tracking-tight"
                                style="font-size: clamp(11px, 0.98cqi, 14.5px);"
                            >
                                {cat.name}
                            </span>
                        </div>
                        <div
                            class="flex flex-wrap relative z-10"
                            style="gap: 0.35cqi;"
                        >
                            {#each cat.skills as skill}
                                <div
                                    class="flex items-center rounded-md border border-border/75 bg-muted/45 hover:bg-primary/10 hover:border-primary/40 transition-colors duration-200 cursor-default group/skill"
                                    style="gap: 0.32cqi; padding: 0.18cqi 0.45cqi;"
                                >
                                    <div
                                        class="flex items-center justify-center rounded bg-white/95 border border-border/50 p-0.5 shrink-0"
                                        style="width: 1.05cqi; height: 1.05cqi; min-width: 15px; min-height: 15px;"
                                    >
                                        <img
                                            src={skill.icon}
                                            alt={skill.name}
                                            class="w-full h-full object-contain"
                                            loading="lazy"
                                            width="12"
                                            height="12"
                                        />
                                    </div>
                                    <span
                                        class="font-mono text-muted-foreground group-hover/skill:text-foreground transition-colors"
                                        style="font-size: clamp(8px, 0.72cqi, 11px);"
                                    >
                                        {skill.name}
                                    </span>
                                </div>
                            {/each}
                        </div>
                    </GlassCard>
                {/each}
            </div>
            <GlassCard
                variant="compact"
                hover={false}
                style="margin-top: 0.15cqi;"
            >
                <p
                    class="leading-[1.65] text-muted-foreground mb-0"
                    style="font-size: clamp(0.76rem, 0.86cqi, 0.94rem);"
                >
                    {@html techstackData.content.shortDescription}
                    {@html techstackData.content.detailedPhilosophy}
                </p>
            </GlassCard>
        </div>
    {/if}
{/snippet}

<MobileCarousel
    layout="left"
    sectionTitle={techstackData.ui.carousel.sectionTitle}
    sectionDescription={techstackData.ui.carousel.sectionDescription}
    accentColor="hsl(173 80% 40%)"
    modelLabel="Cluster Nodes"
    briefLabel="Ecosystem Stack"
>
    <svelte:fragment slot="content-pc">
        <GlowAccent
            color={techstackData.ui.carousel.accentColor}
            position="top-[20%] right-[15%]"
            size={700}
        />

        <div
            class="absolute inset-0 z-20 pointer-events-none flex relative"
            style="container-type: size; padding: 3cqi 0 1cqi 0;"
        >
            <!-- LEFT 55%: Skill Cards Grid -->
            <div
                bind:this={leftPanel}
                class="w-[55%] h-full flex flex-col items-start justify-center pointer-events-auto"
                style="padding-left: 3cqi; gap: 1.5cqi;"
            >
                {@render techStackGrid(false)}
            </div>

            <!-- RIGHT 45%: Typographic Anchor -->
            <div
                bind:this={rightPanel}
                class="w-[45%] h-full flex flex-col items-end justify-end text-right pointer-events-auto"
                style="padding-right: 3cqi; padding-bottom: 2cqi;"
            >
                <SectionAnchor
                    label={techstackData.rightAnchor.label}
                    title={techstackData.rightAnchor.title}
                    description={techstackData.rightAnchor.description}
                    labelColor="text-teal-400/90"
                    accentColor="hsl(173 80% 40%)"
                    align="right"
                />
            </div>
        </div>

        <!-- CENTER BOTTOM: CTA Dock (Hero ActionDock style) -->
        <div
            class="absolute left-1/2 -translate-x-1/2 z-40 pointer-events-auto flex justify-center"
            style="bottom: 2cqi; max-width: 20cqi;"
        >
            <div
                class="flex items-stretch bg-card/88 backdrop-blur-xl rounded-2xl border border-border/80 shadow-[var(--shadow-lg)]"
                style="padding: 0.38cqi;"
            >
                <PillButton
                    href={techstackData.ui.cta.href}
                    label={techstackData.ui.cta.label}
                    sublabel="Explore Work"
                    Icon={ArrowRight}
                    accentColor="cyan"
                />
            </div>
        </div>
    </svelte:fragment>

    <svelte:fragment slot="content-mobile">
        <div
            class="w-full relative z-20 pointer-events-auto"
        >
            <div
                bind:this={mobilePanel}
                class="flex flex-col items-start justify-start w-full min-h-[100dvh] max-w-xl md:max-w-2xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-12 gap-4 sm:gap-5"
            >
                <SectionAnchor
                    label={techstackData.rightAnchor.label}
                    title={techstackData.rightAnchor.title}
                    description={techstackData.rightAnchor.description}
                    labelColor="text-teal-400/90"
                    accentColor="hsl(173 80% 40%)"
                    align="left"
                />

                {@render techStackGrid(true)}

                <div
                    class="flex items-stretch bg-card/90 backdrop-blur-xl rounded-2xl border border-border/80 shadow-[var(--shadow-md)] p-1.5 w-max"
                >
                    <PillButton
                        href={techstackData.ui.cta.href}
                        label={techstackData.ui.cta.label}
                        Icon={ArrowRight}
                        accentColor="cyan"
                    />
                </div>
            </div>
        </div>
    </svelte:fragment>
</MobileCarousel>
