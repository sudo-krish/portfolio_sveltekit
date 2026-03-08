<!-- src/lib/components/home/techstack/TechStackContent.svelte -->
<script lang="ts">
    import { onMount } from "svelte";
    import gsap from "gsap";
    import GlowAccent from "$lib/components/ui/GlowAccent.svelte";
    import MobileCarousel from "$lib/components/ui/MobileCarousel.svelte";
    import { techstackData } from "$lib/data/techstack";

    import RightAnchor from "./desktop/RightAnchor.svelte";
    import LeftGrid from "./desktop/LeftGrid.svelte";

    import MobileGrid from "./mobile/MobileGrid.svelte";

    let leftPanel: HTMLElement;
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
            class="absolute inset-0 z-20 pointer-events-none flex pt-24 pb-12 relative"
        >
            <!-- LEFT 55%: Skill Cards Grid -->
            <div
                bind:this={leftPanel}
                class="w-[55%] h-full pl-12 lg:pl-24 flex flex-col justify-center gap-6 pointer-events-auto"
            >
                <LeftGrid />
            </div>

            <!-- RIGHT 45%: Typographic Anchor -->
            <div
                bind:this={rightPanel}
                class="w-[45%] pr-12 lg:pr-24 flex flex-col justify-end items-end text-right pb-8 pointer-events-auto"
            >
                <RightAnchor />
            </div>
        </div>
    </svelte:fragment>

    <svelte:fragment slot="content-mobile">
        <div
            class="h-full w-full overflow-y-auto overscroll-contain no-scrollbar relative z-20 pointer-events-auto"
        >
            <div
                bind:this={mobilePanel}
                class="flex flex-col items-center w-full max-w-lg mx-auto gap-5 px-4 pt-[14vh] pb-[18vh]"
            >
                <MobileGrid />
            </div>
        </div>
    </svelte:fragment>
</MobileCarousel>
