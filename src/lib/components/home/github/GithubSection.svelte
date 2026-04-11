<!-- src/lib/components/home/github/GithubContent.svelte -->
<script lang="ts">
    import { onMount } from "svelte";
    import gsap from "gsap";
    import GlowAccent from "$lib/components/ui/GlowAccent.svelte";
    import MobileCarousel from "$lib/components/ui/MobileCarousel.svelte";
    import { codingStatsData } from "$lib/data/coding_stats";

    // Desktop
    import SectionAnchor from "$lib/components/ui/anchors/SectionAnchor.svelte";
    import PillButton from "$lib/components/ui/buttons/PillButton.svelte";
    import RightGrid from "./desktop/RightGrid.svelte";
    import { Github, Code2 } from "lucide-svelte";

    import MobileGrid from "./mobile/MobileGrid.svelte";

    let leftPanel: HTMLElement;
    let rightPanel: HTMLElement;

    onMount(() => {
        let ctx = gsap.context(() => {
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
            if (rightPanel) {
                gsap.fromTo(
                    rightPanel.children,
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
        });
        return () => ctx.revert();
    });
</script>

<MobileCarousel
    layout="right"
    sectionTitle={codingStatsData.ui.carousel.sectionTitle}
    sectionDescription={codingStatsData.ui.carousel.sectionDescription}
    accentColor={codingStatsData.ui.carousel.accentColor}
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
                    labelColor="text-muted-foreground/80"
                    align="left"
                />
            </div>

            <!-- RIGHT 65%: Glassmorphism Grid -->
            <div
                bind:this={rightPanel}
                class="w-[65%] h-full flex flex-col justify-center items-end pointer-events-auto"
                style="padding-right: 3cqi; gap: 1.5cqi;"
            >
                <RightGrid />
            </div>
        </div>

        <!-- CENTER BOTTOM: CTA Dock -->
        <div
            class="absolute left-1/2 -translate-x-1/2 z-40 pointer-events-auto flex justify-center"
            style="bottom: 2cqi;"
        >
            <div
                class="flex items-stretch bg-card/80 backdrop-blur-xl rounded-[1.5rem] border border-foreground/10 shadow-[0_20px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)]"
                style="gap: 0.4cqi; padding: 0.4cqi;"
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
            class="h-full w-full overflow-y-auto overscroll-contain no-scrollbar touch-pan-y relative z-20 pointer-events-auto"
        >
            <div
                class="flex flex-col items-center justify-center w-full min-h-[100dvh] max-w-lg mx-auto gap-6 px-4 pt-[12dvh] pb-[20dvh]"
            >
                <SectionAnchor
                    label={codingStatsData.leftAnchor.label}
                    title={codingStatsData.leftAnchor.title}
                    description={codingStatsData.leftAnchor.description}
                    labelColor="text-muted-foreground/80"
                    align="center"
                />

                <div
                    class="flex items-stretch bg-card/80 backdrop-blur-xl rounded-[1.5rem] border border-foreground/10 shadow-[0_20px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] p-1.5 w-max mx-auto gap-2"
                >
                    <PillButton
                        href="/github"
                        label="GitHub"
                        Icon={Github}
                        accentColor="green"
                    />
                    <div
                        class="w-[1px] bg-foreground/10 self-stretch my-1"
                    ></div>
                    <PillButton
                        href="/leetcode"
                        label="LeetCode"
                        Icon={Code2}
                        accentColor="amber"
                    />
                </div>

                <MobileGrid />
            </div>
        </div>
    </svelte:fragment>
</MobileCarousel>
