<!-- src/lib/components/home/datalake/DataLakeContent.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import { ChevronDown, HardDrive } from "lucide-svelte";
  import gsap from "gsap";
  import GlowAccent from "$lib/components/ui/GlowAccent.svelte";
  import MobileCarousel from "$lib/components/ui/MobileCarousel.svelte";
  import { datalakeData } from "$lib/data/datalake";

  import SectionAnchor from "$lib/components/ui/anchors/SectionAnchor.svelte";
  import SectionCard from "$lib/components/ui/cards/SectionCard.svelte";
  import FeatureGrid from "$lib/components/ui/grids/FeatureGrid.svelte";

  let rightPanel: HTMLElement;
  let leftPanel: HTMLElement;
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

{#snippet datalakeAnchor(align: "left" | "center" | "right")}
  <SectionAnchor
    label={datalakeData.rightAnchor.label}
    title={datalakeData.rightAnchor.title}
    description={datalakeData.rightAnchor.description}
    labelColor="text-primary/80"
    align={align}
  />
{/snippet}

{#snippet datalakeCard()}
  <SectionCard
    badge={datalakeData.header.badge}
    subtitle="Storage Architecture"
    Icon={HardDrive}
    iconHoverColor="text-primary"
    accentColor="hsl(var(--primary))"
    shortDescription={datalakeData.content.shortDescription}
    detailedPhilosophy={datalakeData.content.detailedPhilosophy}
    metrics={[
      { label: "Zones", value: "3", unit: "Tier ACID" },
      { label: "Cost Saved", value: "60", unit: "%" },
    ]}
  />
{/snippet}

{#snippet storageGrid()}
  <FeatureGrid
    items={datalakeData.storageNodes}
    accent="hsl(var(--primary))"
    textHoverClass="group-hover:text-primary"
  />
{/snippet}

<MobileCarousel
  layout="left"
  sectionTitle={datalakeData.ui.carousel.sectionTitle}
  sectionDescription={datalakeData.ui.carousel.sectionDescription}
  accentColor={datalakeData.ui.carousel.accentColor}
>
  <!-- ========================================== -->
  <!-- DESKTOP / TABLET                           -->
  <!-- ========================================== -->
  <svelte:fragment slot="content-pc">
    <GlowAccent
      color={datalakeData.ui.carousel.accentColor}
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
        class="w-[55%] h-full flex flex-col items-start justify-center pointer-events-auto"
        style="padding-left: 3cqi;"
      >
        <div class="flex flex-col items-start w-full" style="gap: 1cqi;">
          {@render datalakeCard()}
          {@render storageGrid()}
        </div>
      </div>

      <!-- RIGHT 45%: Typographic Anchor & 3D Space -->
      <div
        bind:this={rightPanel}
        class="w-[45%] h-full flex flex-col items-end justify-end text-right pointer-events-auto"
        style="padding-right: 3cqi; padding-bottom: 3cqi;"
      >
        {@render datalakeAnchor("right")}
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
        {@render datalakeAnchor("left")}
        {@render datalakeCard()}
        {@render storageGrid()}
      </div>
    </div>
  </svelte:fragment>
</MobileCarousel>
