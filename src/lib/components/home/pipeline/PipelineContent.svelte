<!-- src/lib/components/home/pipeline/PipelineContent.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import gsap from "gsap";
  import GlowAccent from "$lib/components/ui/GlowAccent.svelte";
  import MobileCarousel from "$lib/components/ui/MobileCarousel.svelte";
  import { pipelineData } from "$lib/data/pipeline";

  import SectionAnchor from "$lib/components/ui/anchors/SectionAnchor.svelte";
  import SectionCard from "$lib/components/ui/cards/SectionCard.svelte";
  import InfiniteMarquee from "$lib/components/ui/marquee/InfiniteMarquee.svelte";
  import { Database } from "lucide-svelte";

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

{#snippet pipelineAnchor(align: "left" | "center" | "right")}
  <SectionAnchor
    label={pipelineData.leftAnchor.label}
    title={pipelineData.leftAnchor.title}
    description={pipelineData.leftAnchor.description}
    labelColor="text-primary/80"
    align={align}
  />
{/snippet}

{#snippet pipelineCard()}
  <SectionCard
    badge={pipelineData.header.badge}
    subtitle="System Architecture"
    Icon={Database}
    iconHoverColor="text-primary"
    accentColor="hsl(var(--primary))"
    shortDescription={pipelineData.content.shortDescription}
    detailedPhilosophy={pipelineData.content.detailedPhilosophy}
    metrics={[
      { label: "Events", value: "50", unit: "M+/day" },
      { label: "Delivery", value: "99.9", unit: "%" },
    ]}
  />
{/snippet}

{#snippet marquee(isMobile: boolean)}
  {#if isMobile}
    <div
      class="w-full relative overflow-hidden mask-edges-fade opacity-95"
    >
      <InfiniteMarquee
        items={pipelineData.techStack}
        baseSpeed={0.5}
        direction="left"
      />
    </div>
  {:else}
    <div
      class="w-full relative overflow-hidden mask-edges-fade opacity-85 hover:opacity-100 transition-opacity duration-500"
    >
      <InfiniteMarquee
        items={pipelineData.techStack}
        baseSpeed={0.6}
        direction="left"
      />
    </div>
  {/if}
{/snippet}

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
      class="absolute inset-0 z-20 pointer-events-none flex relative"
      style="container-type: size; padding: 3cqi 0 1cqi 0;"
    >
      <!-- LEFT 45% -->
      <div
        bind:this={leftPanel}
        class="w-[45%] h-full flex flex-col items-start justify-end pointer-events-auto"
        style="padding-left: 3cqi; padding-bottom: 3cqi;"
      >
        {@render pipelineAnchor("left")}
      </div>

      <!-- RIGHT 55% -->
      <div
        bind:this={rightPanel}
        class="w-[55%] h-full flex flex-col items-end justify-center pointer-events-auto"
        style="padding-right: 3cqi;"
      >
        <div class="flex flex-col items-end w-full" style="gap: 0.8cqi;">
          {@render pipelineCard()}
          {@render marquee(false)}
        </div>
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
        class="flex flex-col items-start justify-start w-full min-h-[100dvh] max-w-xl md:max-w-2xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-12 relative">
        <div class="w-full flex flex-col items-start relative z-10 gap-4 sm:gap-5">
          {@render pipelineAnchor("left")}
          {@render pipelineCard()}
          {@render marquee(true)}
        </div>
      </div>
    </div>
  </svelte:fragment>
</MobileCarousel>

<style>
  .mask-edges-fade {
    mask-image: linear-gradient(
      to right,
      transparent,
      black 15%,
      black 85%,
      transparent
    );
    -webkit-mask-image: linear-gradient(
      to right,
      transparent,
      black 15%,
      black 85%,
      transparent
    );
  }
</style>
