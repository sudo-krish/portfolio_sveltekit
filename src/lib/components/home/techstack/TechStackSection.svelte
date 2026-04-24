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
        let ctx = gsap.context(() => {
            // Right Anchor Animation
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

            // Left Grid Animation
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

{#snippet techStackGrid(isMobile: boolean)}
    {#if isMobile}
        <div class="w-full flex flex-col gap-4 relative z-10">
            <!-- Top Narrative Box -->
            <div
                class="w-full p-6 rounded-[1.5rem] bg-card/80 backdrop-blur-xl border border-border shadow-xl"
            >
                <div
                    class="text-[10px] font-mono text-primary uppercase tracking-[0.2em] mb-3 block"
                >
                    {techstackData.rightAnchor.label}
                </div>
                <p class="text-sm text-foreground leading-relaxed mb-4">
                    {@html techstackData.content.shortDescription}
                </p>
            </div>

            <!-- Grid of Skill Cards -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {#each techstackData.categories as cat}
                    <div
                        class="flex flex-col p-5 rounded-[1.25rem] bg-card/80 backdrop-blur-xl border border-border relative overflow-hidden"
                    >
                        
                        <div class="flex items-center gap-3 mb-4">
                            <div
                                class="w-8 h-8 rounded-lg bg-muted border border-border flex items-center justify-center shadow-sm"
                            >
                                <svelte:component
                                    this={getIcon(cat.iconName)}
                                    size={14}
                                    style="color: {cat.accent}"
                                />
                            </div>
                            <span
                                class="text-[13px] font-bold text-foreground tracking-wide"
                                >{cat.name}</span
                            >
                        </div>
                        <div class="flex flex-wrap gap-1.5 relative z-10">
                            {#each cat.skills as skill}
                                <div
                                    class="flex items-center gap-1.5 px-2 py-1 rounded-md border border-border bg-muted/50 text-[10px] font-mono text-muted-foreground group/skill"
                                >
                                    <img
                                        src={skill.icon}
                                        alt={skill.name}
                                        class="w-3 h-3 object-contain opacity-70 group-hover/skill:opacity-100 transition-opacity"
                                        loading="lazy"
                                        width="12"
                                        height="12"
                                    />
                                    <span>{skill.name}</span>
                                </div>
                            {/each}
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    {:else}
        <div class="w-full flex flex-col relative z-10" style="gap: 0.6cqi;">
            <!-- 3x2 Grid of Frosted Glass Skill Cards -->
            <div class="grid grid-cols-2 xl:grid-cols-3" style="gap: 0.8cqi;">
                {#each techstackData.categories as cat}
                    <GlassCard
                        variant="compact"
                        accent={cat.accent}
                        class="group flex flex-col"
                    >
                        <div
                            class="flex items-center relative z-10 border-b border-foreground/[0.06]"
                            style="gap: 0.5cqi; margin-bottom: 0.5cqi; padding-bottom: 0.4cqi;"
                        >
                            <div
                                class="rounded-lg bg-foreground/[0.03] border border-foreground/[0.05] flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] group-hover:-translate-y-0.5 transition-transform duration-300"
                                style="width: 1.5cqi; height: 1.5cqi;"
                            >
                                <svelte:component
                                    this={getIcon(cat.iconName)}
                                    size={16}
                                    style="color: {cat.accent}"
                                />
                            </div>
                            <span
                                class="font-bold text-foreground/85 tracking-wide"
                                style="font-size: clamp(10px, 1cqi, 15px);"
                            >
                                {cat.name}
                            </span>
                        </div>
                        <div
                            class="flex flex-wrap relative z-10"
                            style="gap: 0.3cqi;"
                        >
                            {#each cat.skills as skill}
                                <div
                                    class="flex items-center rounded-md border border-foreground/[0.06] bg-foreground/[0.02] hover:bg-foreground/[0.05] hover:border-foreground/[0.12] transition-all duration-300 cursor-default group/skill"
                                    style="gap: 0.3cqi; padding: 0.15cqi 0.4cqi;"
                                >
                                    <div
                                        class="flex items-center justify-center rounded-md opacity-75 group-hover/skill:opacity-100 transition-opacity"
                                        style="width: 1cqi; height: 1cqi;"
                                    >
                                        <img
                                            src={skill.icon}
                                            alt={skill.name}
                                            class="w-3 h-3 2xl:w-3.5 2xl:h-3.5 object-contain"
                                            loading="lazy"
                                            width="14"
                                            height="14"
                                        />
                                    </div>
                                    <span
                                        class="font-mono text-muted-foreground/70 group-hover/skill:text-foreground transition-colors"
                                        style="font-size: clamp(7px, 0.7cqi, 11px);"
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
                variant="inset"
                hover={false}
                style="margin-top: 0.2cqi;"
            >
                <p
                    class="leading-[1.6] text-foreground/50"
                    style="font-size: clamp(0.65rem, 0.85cqi, 0.95rem);"
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
    accentColor={techstackData.ui.carousel.accentColor}
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
                    labelColor="text-primary/80"
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
                class="flex items-stretch bg-card/80 backdrop-blur-xl rounded-[1.5rem] border border-foreground/10 shadow-[0_20px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)]"
                style="padding: 0.4cqi;"
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
            class="h-full w-full overflow-y-auto overscroll-contain no-scrollbar touch-pan-y relative z-20 pointer-events-auto"
        >
            <div
                bind:this={mobilePanel}
                class="flex flex-col items-center justify-center w-full min-h-[100dvh] max-w-lg mx-auto gap-5 px-4 pt-[12dvh] pb-[20dvh]"
            >
                <SectionAnchor
                    label={techstackData.rightAnchor.label}
                    title={techstackData.rightAnchor.title}
                    description={techstackData.rightAnchor.description}
                    labelColor="text-primary/80"
                    align="center"
                />

                <div
                    class="flex items-stretch bg-card/80 backdrop-blur-xl rounded-[1.5rem] border border-foreground/10 shadow-[0_20px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] p-1.5 w-max mx-auto"
                >
                    <PillButton
                        href={techstackData.ui.cta.href}
                        label={techstackData.ui.cta.label}
                        Icon={ArrowRight}
                        accentColor="cyan"
                    />
                </div>

                {@render techStackGrid(true)}
            </div>
        </div>
    </svelte:fragment>
</MobileCarousel>
