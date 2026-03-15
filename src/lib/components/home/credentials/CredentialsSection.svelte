<!-- src/lib/components/home/credentials/CredentialsContent.svelte -->
<script lang="ts">
    import { onMount } from "svelte";
    import gsap from "gsap";
    import GlowAccent from "$lib/components/ui/GlowAccent.svelte";
    import MobileCarousel from "$lib/components/ui/MobileCarousel.svelte";
    import { certificatesData } from "$lib/data/certificates";

    import SectionAnchor from "$lib/components/ui/anchors/SectionAnchor.svelte";
    import PillButton from "$lib/components/ui/buttons/PillButton.svelte";
    import RightGrid from "./desktop/RightGrid.svelte";
    import { ArrowRight } from "lucide-svelte";
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
    sectionTitle={certificatesData.ui.carousel.sectionTitle}
    sectionDescription={certificatesData.ui.carousel.sectionDescription}
    accentColor={certificatesData.ui.carousel.accentColor}
>
    <!-- DESKTOP -->
    <svelte:fragment slot="content-pc">
        <GlowAccent
            color={certificatesData.ui.carousel.accentColor}
            position="top-[15%] right-[10%]"
            size={600}
        />

        <div
            class="absolute inset-0 z-20 pointer-events-none flex relative"
            style="container-type: size; padding: 3cqi 0 1cqi 0;"
        >
            <!-- LEFT 40%: Typographic Anchor -->
            <div
                bind:this={leftPanel}
                class="w-[40%] h-full flex flex-col items-start justify-end pointer-events-auto"
                style="padding-left: 3cqi; padding-bottom: 2cqi;"
            >
                <SectionAnchor
                    label={certificatesData.leftAnchor.label}
                    title={certificatesData.leftAnchor.title}
                    description={certificatesData.leftAnchor.description}
                    labelColor="text-orange-400/80"
                    align="left"
                />
            </div>

            <!-- RIGHT 60%: Interactive Certificate Accordion -->
            <div
                bind:this={rightPanel}
                class="w-[60%] h-full flex flex-col justify-center items-end pointer-events-auto"
                style="padding-right: 3cqi; gap: 1.5cqi;"
            >
                <RightGrid />
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
                    href={certificatesData.ui.cta.href}
                    label={certificatesData.ui.cta.label}
                    sublabel="View All"
                    Icon={ArrowRight}
                    accentColor="orange"
                />
            </div>
        </div>
    </svelte:fragment>

    <!-- MOBILE -->
    <svelte:fragment slot="content-mobile">
        <div
            class="h-full w-full overflow-y-auto overscroll-contain no-scrollbar touch-pan-y relative z-20 pointer-events-auto"
        >
            <div
                class="flex flex-col items-center justify-center w-full min-h-[100dvh] max-w-lg mx-auto gap-6 px-4 pt-[12dvh] pb-[20dvh]"
            >
                <SectionAnchor
                    label={certificatesData.leftAnchor.label}
                    title={certificatesData.leftAnchor.title}
                    description={certificatesData.leftAnchor.description}
                    labelColor="text-orange-400/80"
                    align="center"
                />

                <div
                    class="flex items-stretch bg-card/80 backdrop-blur-xl rounded-[1.5rem] border border-foreground/10 shadow-[0_20px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] p-1.5 w-max mx-auto"
                >
                    <PillButton
                        href={certificatesData.ui.cta.href}
                        label={certificatesData.ui.cta.label}
                        Icon={ArrowRight}
                        accentColor="orange"
                    />
                </div>

                <MobileGrid />
            </div>
        </div>
    </svelte:fragment>
</MobileCarousel>
