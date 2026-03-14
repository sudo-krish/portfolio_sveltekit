<!-- src/lib/components/home/warehouse/WarehouseContent.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import gsap from "gsap";
  import GlowAccent from "$lib/components/ui/GlowAccent.svelte";
  import MobileCarousel from "$lib/components/ui/MobileCarousel.svelte";
  import { warehouseData } from "$lib/data/warehouse";

  import RightAnchor from "./desktop/RightAnchor.svelte";
  import LeftCard from "./desktop/LeftCard.svelte";
  import WarehouseGrid from "./desktop/WarehouseGrid.svelte";

  import MobileCard from "./mobile/MobileCard.svelte";
  import MobileWarehouseGrid from "./mobile/MobileWarehouseGrid.svelte";

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

      // Left Content Panel Animation
      if (leftPanel) {
        gsap.fromTo(
          leftPanel.children,
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
  layout="left"
  sectionTitle={warehouseData.ui.carousel.sectionTitle}
  sectionDescription={warehouseData.ui.carousel.sectionDescription}
  accentColor={warehouseData.ui.carousel.accentColor}
>
  <!-- ========================================== -->
  <!-- DESKTOP / TABLET                           -->
  <!-- ========================================== -->
  <svelte:fragment slot="content-pc">
    <GlowAccent
      color={warehouseData.ui.carousel.accentColor}
      position="top-[20%] left-[15%]"
      size={700}
    />

    <div
      class="absolute inset-0 z-20 pointer-events-none flex pt-24 pb-12 relative"
    >
      <!-- LEFT 55%: Dense Content & Grid -->
      <div
        bind:this={leftPanel}
        class="w-[55%] h-full pl-12 lg:pl-24 flex flex-col justify-center gap-8 pointer-events-auto"
      >
        <LeftCard />
        <WarehouseGrid />
      </div>

      <!-- RIGHT 45%: Typographic Anchor & 3D Space -->
      <div
        bind:this={rightPanel}
        class="w-[45%] h-full pr-12 lg:pr-24 flex flex-col justify-end items-end text-right pb-24 pointer-events-auto"
      >
        <RightAnchor />
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
        <MobileCard />
        <MobileWarehouseGrid />
      </div>
    </div>
  </svelte:fragment>
</MobileCarousel>
