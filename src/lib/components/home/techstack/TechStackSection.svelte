<!-- src/lib/components/home/techstack/TechStackContent.svelte -->
<script lang="ts">
    import { onMount } from "svelte";
    import gsap from "gsap";
    import GlowAccent from "$lib/components/ui/GlowAccent.svelte";
    import MobileCarousel from "$lib/components/ui/MobileCarousel.svelte";
    import { techstackData } from "$lib/data/techstack";

    import SectionAnchor from "$lib/components/ui/anchors/SectionAnchor.svelte";
    import PillButton from "$lib/components/ui/buttons/PillButton.svelte";
    import LeftGrid from "./desktop/LeftGrid.svelte";
    import { ArrowRight } from "lucide-svelte";

    import MobileGrid from "./mobile/MobileGrid.svelte";
    import NextSectionMobileCTA from "$lib/components/ui/buttons/NextSectionMobileCTA.svelte";    let leftPanel: HTMLElement;
    let rightPanel: HTMLElement;
    let mobilePanel: HTMLElement;

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
                <LeftGrid />
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
                    labelColor="text-cyan-400/80"
                    align="right"
                />
            </div>
        </div>

        <!-- CENTER BOTTOM: CTA Dock (Hero ActionDock style) -->
        <div
            class="absolute left-1/2 -translate-x-1/2 z-40 pointer-events-auto flex justify-center"
            style="bottom: 2cqi; max-width: 20cqi;"
        >
            <div class="flex items-stretch bg-card/80 backdrop-blur-xl rounded-[1.5rem] border border-foreground/10 shadow-[0_20px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)]" style="padding: 0.4cqi;">
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
                    labelColor="text-cyan-400/80"
                    align="center"
                />

                <div class="flex items-stretch bg-card/80 backdrop-blur-xl rounded-[1.5rem] border border-foreground/10 shadow-[0_20px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] p-1.5 w-max mx-auto">
                    <PillButton
                        href={techstackData.ui.cta.href}
                        label={techstackData.ui.cta.label}
                        Icon={ArrowRight}
                        accentColor="cyan"
                    />
                </div>

                <MobileGrid />
                <NextSectionMobileCTA targetId="github" label="Next: GitHub Stats" accentColor="green" />
            </div>
        </div>
    </svelte:fragment>
</MobileCarousel>
