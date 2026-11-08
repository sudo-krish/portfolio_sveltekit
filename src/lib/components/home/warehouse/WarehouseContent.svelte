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
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ctx = gsap.context(() => {});
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            ctx.add(() => {
              if (rightPanel) {
                gsap.fromTo(
                  rightPanel.children,
                  { x: 24, opacity: 0 },
                  {
                    x: 0,
                    opacity: 1,
                    duration: 0.75,
                    stagger: 0.1,
                    ease: "expo.out",
                    clearProps: "transform,opacity",
                  },
                );
              }
              if (leftPanel) {
                gsap.fromTo(
                  leftPanel.children,
                  { y: 24, opacity: 0 },
                  {
                    y: 0,
                    opacity: 1,
                    duration: 0.85,
                    stagger: 0.12,
                    ease: "expo.out",
                    delay: 0.06,
                    clearProps: "transform,opacity",
                  },
                );
              }
            });
          }
        });
      },
      { threshold: 0.25 },
    );
    if (leftPanel) observer.observe(leftPanel);
    return () => {
      observer.disconnect();
      ctx.revert();
    };
  });
</script>

{#snippet warehouseAnchor(align: "left" | "center" | "right")}
  <SectionAnchor
    label={warehouseData.rightAnchor.label}
    title={warehouseData.rightAnchor.title}
    description={warehouseData.rightAnchor.description}
    labelColor="text-primary/80"
    {align}
  />
{/snippet}

{#snippet warehouseCard()}
  <SectionCard
    badge={warehouseData.header.badge}
    subtitle="BI & Serving Layer"
    Icon={BarChart3}
    iconHoverColor="text-primary"
    accentColor="hsl(var(--primary))"
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
    accent="hsl(var(--primary))"
    textHoverClass="group-hover:text-primary"
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
      class="w-full relative z-20 pointer-events-auto"
    >
      <div
        bind:this={mobilePanel}
        class="flex flex-col items-start justify-start w-full min-h-[100dvh] max-w-xl md:max-w-2xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-12 gap-4 sm:gap-5"
      >
        {@render warehouseAnchor("left")}
        {@render warehouseCard()}
        {@render warehouseGrid()}
      </div>
    </div>
  </svelte:fragment>
</MobileCarousel>
