<!-- src/lib/components/home/pipeline/PipelineContent.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import { ChevronDown } from "lucide-svelte";
  import gsap from "gsap";
  import GlowAccent from "$lib/components/ui/GlowAccent.svelte";
  import MobileCarousel from "$lib/components/ui/MobileCarousel.svelte";
  import { pipelineData } from "$lib/data/pipeline";

  import LeftAnchor from "./desktop/LeftAnchor.svelte";
  import RightCard from "./desktop/RightCard.svelte";
  import MarqueeRail from "./desktop/MarqueeRail.svelte";

  import MobileCard from "./mobile/MobileCard.svelte";
  import MobileMarquee from "./mobile/MobileMarquee.svelte";

  let leftPanel: HTMLElement;
  let rightPanel: HTMLElement;
  let mobilePanel: HTMLElement;
  let scrollHint: HTMLElement;

  onMount(() => {
    let ctx = gsap.context(() => {
      // Left Anchor Animation (Desktop)
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

      // Right Content Panel Animation (Desktop)
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
    });
    return () => ctx.revert();
  });
</script>

<MobileCarousel
  layout="right"
  sectionTitle={pipelineData.ui.carousel.sectionTitle}
  sectionDescription={pipelineData.ui.carousel.sectionDescription}
  accentColor={pipelineData.ui.carousel.accentColor}
>
  <!-- ========================================== -->
  <!-- DESKTOP / TABLET                           -->
  <!-- ========================================== -->
  <svelte:fragment slot="content-pc">
    <GlowAccent
      color={pipelineData.ui.carousel.accentColor}
      position="top-[20%] right-[15%]"
      size={700}
    />

    <div
      class="absolute inset-0 z-20 pointer-events-none flex pt-24 pb-12 relative"
    >
      <!-- LEFT 45% -->
      <div
        bind:this={leftPanel}
        class="w-[45%] h-full pl-12 lg:pl-24 flex flex-col items-start justify-end pb-24 pointer-events-auto"
      >
        <LeftAnchor />
      </div>

      <!-- RIGHT 55% -->
      <div
        bind:this={rightPanel}
        class="w-[55%] h-full pr-12 lg:pr-24 flex flex-col items-end justify-center gap-0 pointer-events-auto"
      >
        <RightCard />
        <MarqueeRail />
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
        class="flex flex-col items-center justify-center w-full min-h-[100dvh] max-w-lg mx-auto gap-6 px-4 pt-[12dvh] pb-[20dvh] relative"
      >
        <div class="w-full flex flex-col items-center relative z-10">
          <MobileCard />
          <MobileMarquee />
        </div>
      </div>
    </div>
  </svelte:fragment>
</MobileCarousel>
