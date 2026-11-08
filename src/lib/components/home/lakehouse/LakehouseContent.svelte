<!-- src/lib/components/home/lakehouse/LakehouseContent.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import { ChevronDown, Database } from "lucide-svelte";
  import gsap from "gsap";
  import GlowAccent from "$lib/components/ui/GlowAccent.svelte";
  import MobileCarousel from "$lib/components/ui/MobileCarousel.svelte";
  import { lakehouseData } from "$lib/data/lakehouse";

  import SectionAnchor from "$lib/components/ui/anchors/SectionAnchor.svelte";
  import SectionCard from "$lib/components/ui/cards/SectionCard.svelte";
  import LakehouseGrid from "$lib/components/ui/grids/FeatureGrid.svelte";

  let leftPanel: HTMLElement;
  let rightPanel: HTMLElement;
  let mobilePanel: HTMLElement;
  let scrollHint: HTMLElement;

  onMount(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ctx = gsap.context(() => {});
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            ctx.add(() => {
              if (leftPanel) {
                gsap.fromTo(
                  leftPanel.children,
                  { x: -24, opacity: 0 },
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
              if (rightPanel) {
                gsap.fromTo(
                  rightPanel.children,
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

{#snippet lakehouseAnchor(align: "left" | "center" | "right")}
  <SectionAnchor
    label={lakehouseData.leftAnchor.label}
    title={lakehouseData.leftAnchor.title}
    description={lakehouseData.leftAnchor.description}
    labelColor="text-blue-400/90"
    accentColor="hsl(217 91% 60%)"
    align={align}
  />
{/snippet}

{#snippet lakehouseCard()}
  <SectionCard
    badge={lakehouseData.header.badge}
    subtitle="Transactional Compute"
    Icon={Database}
    iconHoverColor="text-blue-400"
    accentColor="hsl(217 91% 60%)"
    shortDescription={lakehouseData.content.shortDescription}
    detailedPhilosophy={lakehouseData.content.detailedPhilosophy}
    metrics={[
      { label: "Table Formats", value: "Iceberg", unit: "+Delta" },
      { label: "Runtime Drop", value: "-96", unit: "%" },
    ]}
  />
{/snippet}

{#snippet lakehouseGrid()}
  <div class="w-full flex flex-col gap-1.5">
    <div class="w-full flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.16em] px-1 text-blue-400/90">
      <div class="flex items-center gap-1.5">
        <span class="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
        <span>Open Table Compute Core</span>
      </div>
      <span class="font-mono tabular-nums text-muted-foreground/80">Spark & Iceberg ACID</span>
    </div>
    <LakehouseGrid
      items={lakehouseData.lakehouseNodes}
      accent="hsl(217 91% 60%)"
      textHoverClass="group-hover:text-blue-400"
    />
  </div>
{/snippet}

<MobileCarousel
  layout="right"
  sectionTitle={lakehouseData.ui.carousel.sectionTitle}
  sectionDescription={lakehouseData.ui.carousel.sectionDescription}
  accentColor="hsl(217 91% 60%)"
  modelLabel="Compute Engine"
  briefLabel="ACID Lakehouse"
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
      class="absolute inset-0 z-20 pointer-events-none flex relative"
      style="container-type: size; padding: 3cqi 0 1cqi 0;"
    >
      <!-- LEFT 45%: Typographic Anchor & 3D Space -->
      <div
        bind:this={leftPanel}
        class="w-[45%] h-full flex flex-col items-start justify-end pointer-events-auto"
        style="padding-left: 3cqi; padding-bottom: 3cqi;"
      >
        {@render lakehouseAnchor("left")}
      </div>

      <!-- RIGHT 55%: Dense Content & Grid -->
      <div
        bind:this={rightPanel}
        class="w-[55%] h-full flex flex-col items-end justify-center pointer-events-auto"
        style="padding-right: 3cqi;"
      >
        <div class="flex flex-col items-end w-full" style="gap: 1cqi;">
          {@render lakehouseCard()}
          {@render lakehouseGrid()}
        </div>
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
      class="w-full relative z-20 pointer-events-auto"
    >
      <div
        bind:this={mobilePanel}
        class="flex flex-col items-start justify-start w-full min-h-[100dvh] max-w-xl md:max-w-2xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-12 gap-4 sm:gap-5"
      >
        {@render lakehouseAnchor("left")}
        {@render lakehouseCard()}
        {@render lakehouseGrid()}
      </div>
    </div>
  </svelte:fragment>
</MobileCarousel>
