<!-- src/lib/components/home/github/GithubSection.svelte -->
<script lang="ts">
    import { onMount } from "svelte";
    import gsap from "gsap";
    import GlowAccent from "$lib/components/ui/GlowAccent.svelte";
    import MobileCarousel from "$lib/components/ui/MobileCarousel.svelte";
    import { codingStatsData } from "$lib/data/coding_stats";

    import SectionAnchor from "$lib/components/ui/anchors/SectionAnchor.svelte";
    import PillButton from "$lib/components/ui/buttons/PillButton.svelte";
    import GlassCard from "$lib/components/ui/cards/GlassCard.svelte";
    import { Github, Code2 } from "lucide-svelte";

    import GitHubStatsCard from "./GitHubStatsCard.svelte";
    import LeetCodeCard from "./LeetCodeCard.svelte";

    let leftPanel: HTMLElement;
    let rightPanel: HTMLElement;

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

{#snippet codingStatsGrid(isMobile: boolean)}
    {#if isMobile}
        <div class="w-full flex flex-col gap-4 mt-2 relative z-10">
            <!-- Stats Cards Stacked -->
            <GitHubStatsCard />
            <LeetCodeCard />

            <!-- Mobile Philosophy Card -->
            <GlassCard variant="compact" hover={false} class="w-full">
                <p
                    class="text-[0.84rem] leading-[1.68] text-muted-foreground mb-0"
                >
                    {@html codingStatsData.philosophy.shortDescription}
                    {@html codingStatsData.philosophy.detailedPhilosophy}
                </p>
            </GlassCard>
        </div>
    {:else}
        <div class="w-full flex flex-col relative z-10" style="gap: 0.85cqi;">
            <!-- Side by Side Grid for Stats Cards -->
            <div class="grid grid-cols-2" style="gap: 0.85cqi;">
                <GitHubStatsCard />
                <LeetCodeCard />
            </div>

            <!-- Desktop Philosophy Card (1px left rule instead of thick border-l-2) -->
            <GlassCard
                variant="compact"
                hover={false}
                style="margin-top: 0.15cqi;"
            >
                <p
                    class="leading-[1.65] text-muted-foreground mb-0"
                    style="font-size: clamp(0.76rem, 0.86cqi, 0.94rem);"
                >
                    {@html codingStatsData.philosophy.shortDescription}
                    {@html codingStatsData.philosophy.detailedPhilosophy}
                </p>
            </GlassCard>
        </div>
    {/if}
{/snippet}

<MobileCarousel
    layout="right"
    sectionTitle={codingStatsData.ui.carousel.sectionTitle}
    sectionDescription={codingStatsData.ui.carousel.sectionDescription}
    accentColor="hsl(142 71% 45%)"
    modelLabel="Code Topology"
    briefLabel="Live Telemetry"
>
    <!-- DESKTOP / TABLET -->
    <svelte:fragment slot="content-pc">
        <GlowAccent
            color={codingStatsData.ui.carousel.accentColor}
            position="top-[20%] right-[10%]"
            size={700}
        />

        <div
            class="absolute inset-0 z-20 pointer-events-none flex relative"
            style="container-type: size; padding: 3cqi 0 1cqi 0;"
        >
            <!-- LEFT 35%: Typographic Anchor -->
            <div
                bind:this={leftPanel}
                class="w-[35%] h-full flex flex-col items-start justify-end pointer-events-auto"
                style="padding-left: 3cqi; padding-bottom: 2cqi;"
            >
                <SectionAnchor
                    label={codingStatsData.leftAnchor.label}
                    title={codingStatsData.leftAnchor.title}
                    description={codingStatsData.leftAnchor.description}
                    labelColor="text-emerald-400/90"
                    accentColor="hsl(142 71% 45%)"
                    align="left"
                />
            </div>

            <!-- RIGHT 65%: Glassmorphism Grid -->
            <div
                bind:this={rightPanel}
                class="w-[65%] h-full flex flex-col justify-center items-end pointer-events-auto"
                style="padding-right: 3cqi; gap: 1.5cqi;"
            >
                {@render codingStatsGrid(false)}
            </div>
        </div>

        <!-- CENTER BOTTOM: CTA Dock -->
        <div
            class="absolute left-1/2 -translate-x-1/2 z-40 pointer-events-auto flex justify-center"
            style="bottom: 2cqi;"
        >
            <div
                class="flex items-stretch bg-card/88 backdrop-blur-xl rounded-2xl border border-border/80 shadow-[var(--shadow-lg)]"
                style="gap: 0.38cqi; padding: 0.38cqi;"
            >
                <PillButton
                    href="/github"
                    label="GitHub"
                    sublabel="View Profile"
                    Icon={Github}
                    accentColor="green"
                />
                <PillButton
                    href="/leetcode"
                    label="LeetCode"
                    sublabel="View Stats"
                    Icon={Code2}
                    accentColor="amber"
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
                    label={codingStatsData.leftAnchor.label}
                    title={codingStatsData.leftAnchor.title}
                    description={codingStatsData.leftAnchor.description}
                    labelColor="text-emerald-400/90"
                    accentColor="hsl(142 71% 45%)"
                    align="left"
                />

                {@render codingStatsGrid(true)}

                <div
                    class="flex items-stretch bg-card/90 backdrop-blur-xl rounded-2xl border border-border/80 shadow-[var(--shadow-md)] p-1.5 w-max gap-2"
                >
                    <PillButton
                        href="/github"
                        label="GitHub"
                        Icon={Github}
                        accentColor="green"
                    />
                    <div
                        class="w-px bg-border/80 self-stretch my-1"
                    ></div>
                    <PillButton
                        href="/leetcode"
                        label="LeetCode"
                        Icon={Code2}
                        accentColor="amber"
                    />
                </div>
            </div>
        </div>
    </svelte:fragment>
</MobileCarousel>
