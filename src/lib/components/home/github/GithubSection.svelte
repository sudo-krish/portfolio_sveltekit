<!-- src/lib/components/home/github/GithubContent.svelte -->
<script lang="ts">
    import { onMount } from "svelte";
    import gsap from "gsap";
    import GlowAccent from "$lib/components/ui/GlowAccent.svelte";
    import MobileCarousel from "$lib/components/ui/MobileCarousel.svelte";
    import { codingStatsData } from "$lib/data/coding_stats";

    import LeftAnchor from "./desktop/LeftAnchor.svelte";
    import RightGrid from "./desktop/RightGrid.svelte"; // NEW

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
            class="absolute inset-0 z-20 pointer-events-none flex pt-24 pb-12 relative"
        >
            <!-- LEFT 35%: Typographic Anchor -->
            <div
                bind:this={leftPanel}
                class="w-[35%] pl-12 lg:pl-24 flex flex-col justify-center pointer-events-auto"
            >
                <LeftAnchor />
            </div>

            <!-- RIGHT 65%: Glassmorphism Grid -->
            <!-- Adjusted width splits to give the new 1000px grid more room to breathe -->
            <div
                bind:this={rightPanel}
                class="w-[65%] h-full pr-12 lg:pr-24 flex flex-col justify-center items-end gap-6 pointer-events-auto"
            >
                <RightGrid />
            </div>
        </div>
    </svelte:fragment>

    <!-- Mobile view implementation omitted for brevity, but you would stack them vertically there -->
</MobileCarousel>
