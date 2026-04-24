<!-- src/lib/components/home/warehouse/WarehouseContent.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import gsap from "gsap";
  import GlowAccent from "$lib/components/ui/GlowAccent.svelte";
  import MobileCarousel from "$lib/components/ui/MobileCarousel.svelte";
  import { warehouseData } from "$lib/data/warehouse";

  import SectionCard from "$lib/components/ui/cards/SectionCard.svelte";
  import SectionAnchor from "$lib/components/ui/anchors/SectionAnchor.svelte";
  import WarehouseGrid from "$lib/components/ui/grids/FeatureGrid.svelte";
  import { BarChart3 } from "lucide-svelte";

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

{#snippet warehouseAnchor(align: "left" | "center" | "right")}
  <SectionAnchor
    label={warehouseData.rightAnchor.label}
    title={warehouseData.rightAnchor.title}
    description={warehouseData.rightAnchor.description}
    labelColor="text-muted-foreground/80"
    {align}
  />
{/snippet}

{#snippet warehouseCard()}
  <SectionCard
    badge={warehouseData.header.badge}
    subtitle="BI & Serving Layer"
    Icon={BarChart3}
    iconHoverColor="text-muted-foreground"
    accentColor="hsl(280, 60%, 65%)"
    shortDescription={warehouseData.content.shortDescription}
    detailedPhilosophy={warehouseData.content.detailedPhilosophy}
    metrics={[
      {
        label: "Latency",
        value: warehouseData.metrics.latency,
        unit: warehouseData.metrics.latencyUnit,
      },
      {
        label: "Concurrency",
        value: warehouseData.metrics.concurrency,
        unit: warehouseData.metrics.concurrencyUnit,
      },
    ]}
  />
{/snippet}

{#snippet warehouseGrid()}
  <WarehouseGrid
    items={warehouseData.warehouseNodes}
    accent="hsl(280, 60%, 65%)"
    textHoverClass="group-hover:text-purple-400"
  />
{/snippet}

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
      class="absolute inset-0 z-20 pointer-events-none flex relative"
      style="container-type: size; padding: 3cqi 0 1cqi 0;"
    >
      <!-- LEFT 55%: Dense Content & Grid -->
      <div
        bind:this={leftPanel}
        class="w-[55%] h-full flex flex-col justify-center pointer-events-auto"
        style="padding-left: 3cqi;"
      >
        <div class="flex flex-col w-full" style="gap: 1cqi;">
          {@render warehouseCard()}
          {@render warehouseGrid()}
        </div>
      </div>

      <!-- RIGHT 45%: Typographic Anchor & 3D Space -->
      <div
        bind:this={rightPanel}
        class="w-[45%] h-full flex flex-col justify-end items-end text-right pointer-events-auto"
        style="padding-right: 3cqi; padding-bottom: 3cqi;"
      >
        {@render warehouseAnchor("right")}
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
        {@render warehouseAnchor("center")}
        {@render warehouseCard()}
        {@render warehouseGrid()}
      </div>
    </div>
  </svelte:fragment>
</MobileCarousel>
