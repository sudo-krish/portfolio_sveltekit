<!-- src/lib/components/home/lakehouse/LakehouseContent.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import { ChevronDown } from "lucide-svelte";
  import gsap from "gsap";
  import GlowAccent from "$lib/components/ui/GlowAccent.svelte";
  import MobileCarousel from "$lib/components/ui/MobileCarousel.svelte";
  import { lakehouseData } from "$lib/data/lakehouse";

  import LeftAnchor from "./desktop/LeftAnchor.svelte";
  import RightCard from "./desktop/RightCard.svelte";
  import LakehouseGrid from "./desktop/LakehouseGrid.svelte";

  import MobileCard from "./mobile/MobileCard.svelte";
  import MobileLakehouseGrid from "./mobile/MobileLakehouseGrid.svelte";

  let leftPanel: HTMLElement;
  let rightPanel: HTMLElement;
  let mobilePanel: HTMLElement;
  let scrollHint: HTMLElement;

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

      // Scroll Hint Animation
      if (scrollHint) {
        gsap.fromTo(
          scrollHint,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 1.5, ease: "power2.out", delay: 1.0 },
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
  sectionTitle={lakehouseData.ui.carousel.sectionTitle}
  sectionDescription={lakehouseData.ui.carousel.sectionDescription}
  accentColor={lakehouseData.ui.carousel.accentColor}
>
  <!-- ========================================== -->
  <!-- DESKTOP / TABLET                           -->
  <!-- ========================================== -->
  <svelte:fragment slot="content-pc">
    <GlowAccent
      color={lakehouseData.ui.carousel.accentColor}
      position="top-[20%] right-[15%]"
      size={700}
    />

    <div
      class="absolute inset-0 z-20 pointer-events-none flex pt-24 pb-12 relative"
    >
      <!-- LEFT 45%: Typographic Anchor & 3D Space -->
      <div
        bind:this={leftPanel}
        class="w-[45%] h-full pl-12 lg:pl-24 flex flex-col items-start justify-end pb-24 pointer-events-auto"
      >
        <LeftAnchor />
      </div>

      <!-- RIGHT 55%: Dense Content & Grid -->
      <div
        bind:this={rightPanel}
        class="w-[55%] h-full pr-12 lg:pr-24 flex flex-col items-end justify-center gap-8 pointer-events-auto"
      >
        <RightCard />
        <LakehouseGrid />
      </div>

      <!-- ABSOLUTE CENTER SCROLL HINT -->
      <div
        bind:this={scrollHint}
        class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center gap-3 pointer-events-auto z-50 opacity-0"
      ></div>
    </div>
  </svelte:fragment>

  <!-- ========================================== -->
  <!-- MOBILE / SMALL TABLET                      -->
  <!-- ========================================== -->
  <svelte:fragment slot="content-mobile">
    <div
      class="h-full w-full overflow-y-auto overscroll-contain no-scrollbar relative z-20 pointer-events-auto"
    >
      <div
        bind:this={mobilePanel}
        class="flex flex-col items-center justify-center w-full min-h-[100dvh] max-w-lg mx-auto gap-5 px-4 pt-[12dvh] pb-[20dvh]"
      >
        <MobileCard />
        <MobileLakehouseGrid />
      </div>
    </div>
  </svelte:fragment>
</MobileCarousel>
