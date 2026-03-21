<!-- src/lib/components/home/experience/ExperienceContent.svelte -->
<script lang="ts">
    import { onMount } from "svelte";
    import gsap from "gsap";
    import GlowAccent from "$lib/components/ui/GlowAccent.svelte";
    import MobileCarousel from "$lib/components/ui/MobileCarousel.svelte";
    import { experienceData } from "$lib/data/experience";

    import SectionAnchor from "$lib/components/ui/anchors/SectionAnchor.svelte";
    import SectionCard from "$lib/components/ui/cards/SectionCard.svelte";
    import PillButton from "$lib/components/ui/buttons/PillButton.svelte";
    import CareerTimeline from "./desktop/CareerTimeline.svelte";
    import { Briefcase, ArrowRight } from "lucide-svelte";

    import MobileCareerTimeline from "./mobile/MobileCareerTimeline.svelte";

    let leftPanel: HTMLElement;
    let rightPanel: HTMLElement;
    let mobilePanel: HTMLElement;

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
                <SectionAnchor
                    label={experienceData.leftAnchor.label}
                    title={experienceData.leftAnchor.title}
                    description={experienceData.leftAnchor.description}
                    labelColor="text-blue-400/80"
                    align="left"
                />
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
                    <SectionCard
                        badge={experienceData.header.badge}
                        subtitle="Career Progression"
                        Icon={Briefcase}
                        iconHoverColor="text-blue-400"
                        accentColor="border-blue-400/40"
                        gradientFrom="from-blue-400"
                        shortDescription={experienceData.content
                            .shortDescription}
                        detailedPhilosophy={experienceData.content
                            .detailedPhilosophy}
                    />
                    <CareerTimeline />
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
                <SectionAnchor
                    label={experienceData.leftAnchor.label}
                    title={experienceData.leftAnchor.title}
                    description={experienceData.leftAnchor.description}
                    labelColor="text-blue-400/80"
                    align="center"
                    headingTag="div"
                />

                <SectionCard
                    badge={experienceData.header.badge}
                    subtitle="Career Progression"
                    Icon={Briefcase}
                    iconHoverColor="text-blue-400"
                    accentColor="border-blue-400/40"
                    gradientFrom="from-blue-400"
                    shortDescription={experienceData.content.shortDescription}
                    detailedPhilosophy={experienceData.content
                        .detailedPhilosophy}
                />
                <MobileCareerTimeline />

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
