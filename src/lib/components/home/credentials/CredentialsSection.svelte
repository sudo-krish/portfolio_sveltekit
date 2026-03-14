<!-- src/lib/components/home/credentials/CredentialsContent.svelte -->
<script lang="ts">
    import { onMount } from "svelte";
    import gsap from "gsap";
    import GlowAccent from "$lib/components/ui/GlowAccent.svelte";
    import MobileCarousel from "$lib/components/ui/MobileCarousel.svelte";
    import { certificatesData } from "$lib/data/certificates";

    import LeftAnchor from "./desktop/LeftAnchor.svelte";
    import RightGrid from "./desktop/RightGrid.svelte";
    import MobileAnchor from "./mobile/MobileAnchor.svelte";
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
            class="absolute inset-0 z-20 pointer-events-none flex pt-24 pb-12 relative"
        >
            <!-- LEFT 40%: Typographic Anchor -->
            <div
                bind:this={leftPanel}
                class="w-[40%] pl-12 lg:pl-24 flex flex-col justify-center pointer-events-auto"
            >
                <LeftAnchor />
            </div>

            <!-- RIGHT 60%: Interactive Certificate Accordion -->
            <div
                bind:this={rightPanel}
                class="w-[60%] h-full pr-12 lg:pr-24 flex flex-col justify-center items-end gap-6 pointer-events-auto"
            >
                <RightGrid />
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
                <MobileAnchor />
                <MobileGrid />
            </div>
        </div>
    </svelte:fragment>
</MobileCarousel>
