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
  />
{/snippet}

{#snippet marquee(isMobile: boolean)}
  {#if isMobile}
    <div
      class="w-[110%] -ml-[5%] relative overflow-hidden mask-edges-fade opacity-90 scale-90"
    >
      <InfiniteMarquee
        items={pipelineData.techStack}
        baseSpeed={0.5}
        direction="left"
      />
    </div>
  {:else}
    <div
      class="w-full relative overflow-hidden mask-edges-fade opacity-80 hover:opacity-100 transition-opacity duration-500"
    >
      <InfiniteMarquee
        items={pipelineData.techStack}
        baseSpeed={0.8}
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
      class="h-full w-full overflow-y-auto overscroll-contain no-scrollbar touch-pan-y relative z-20 pointer-events-auto"
    >
      <div
        class="flex flex-col items-center justify-center w-full min-h-[100dvh] max-w-lg mx-auto gap-6 px-4 pt-[12dvh] pb-[20dvh] relative"
      >
        <div class="w-full flex flex-col items-center relative z-10">
          {@render pipelineAnchor("center")}
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
