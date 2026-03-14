<!-- src/lib/components/home/impact/ImpactContent.svelte -->
<script lang="ts">
    import { onMount } from "svelte";
    import gsap from "gsap";
    import GlowAccent from "$lib/components/ui/GlowAccent.svelte";
    import MobileCarousel from "$lib/components/ui/MobileCarousel.svelte";
    import { resultsData } from "$lib/data/results";

    // Desktop
    import RightAnchor from "./desktop/RightAnchor.svelte";
    import LeftGrid from "./desktop/LeftGrid.svelte";

    // Mobile
    import MobileAnchor from "./mobile/MobileAnchor.svelte";
    import MobileGrid from "./mobile/MobileGrid.svelte";

    let leftPanel: HTMLElement;
    let rightPanel: HTMLElement;

    onMount(() => {
        let ctx = gsap.context(() => {
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
        });
        return () => ctx.revert();
    });
</script>

<MobileCarousel
    layout="left"
    sectionTitle={resultsData.ui.carousel.sectionTitle}
    sectionDescription={resultsData.ui.carousel.sectionDescription}
    accentColor={resultsData.ui.carousel.accentColor}
>
    <!-- DESKTOP / TABLET -->
    <svelte:fragment slot="content-pc">
        <GlowAccent
            color={resultsData.ui.carousel.accentColor}
            position="top-[20%] left-[10%]"
            size={700}
        />

        <div
            class="absolute inset-0 z-20 pointer-events-none flex pt-24 pb-12 relative"
        >
            <div
                bind:this={leftPanel}
                class="w-[55%] h-full pl-12 lg:pl-24 flex flex-col justify-center pointer-events-auto"
            >
                <LeftGrid />
            </div>

            <div
                bind:this={rightPanel}
                class="w-[45%] pr-12 lg:pr-24 flex flex-col justify-end items-end text-right pb-8 pointer-events-auto"
            >
                <RightAnchor />
            </div>
        </div>
    </svelte:fragment>

    <!-- MOBILE / SMALL TABLET -->
    <svelte:fragment slot="content-mobile">
        <div
            class="h-full w-full overflow-y-auto overscroll-contain no-scrollbar touch-pan-y relative z-20 pointer-events-auto"
        >
            <div
                class="flex flex-col items-center justify-center w-full min-h-[100dvh] max-w-lg mx-auto gap-5 px-4 pt-[12dvh] pb-[20dvh]"
            >
                <!-- Mobile specific text intro -->
                <MobileAnchor />

                <!-- Mobile specific grid (stacked logic) -->
                <MobileGrid />
            </div>
        </div>
    </svelte:fragment>
</MobileCarousel>
