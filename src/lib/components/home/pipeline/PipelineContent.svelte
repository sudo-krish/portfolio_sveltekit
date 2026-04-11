<!-- src/lib/components/home/pipeline/PipelineContent.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import { ChevronDown } from "lucide-svelte";
  import gsap from "gsap";
  import GlowAccent from "$lib/components/ui/GlowAccent.svelte";
  import MobileCarousel from "$lib/components/ui/MobileCarousel.svelte";
  import { pipelineData } from "$lib/data/pipeline";

  import SectionAnchor from "$lib/components/ui/anchors/SectionAnchor.svelte";
  import SectionCard from "$lib/components/ui/cards/SectionCard.svelte";
  import MarqueeRail from "./desktop/MarqueeRail.svelte";
  import { Database } from "lucide-svelte";

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
      class="absolute inset-0 z-20 pointer-events-none flex relative"
      style="container-type: size; padding: 3cqi 0 1cqi 0;"
    >
      <!-- LEFT 45% -->
      <div
        bind:this={leftPanel}
        class="w-[45%] h-full flex flex-col items-start justify-end pointer-events-auto"
        style="padding-left: 3cqi; padding-bottom: 3cqi;"
      >
        <SectionAnchor
          label={pipelineData.leftAnchor.label}
          title={pipelineData.leftAnchor.title}
          description={pipelineData.leftAnchor.description}
          labelColor="text-primary/80"
          align="left"
        />
      </div>

      <!-- RIGHT 55% -->
      <div
        bind:this={rightPanel}
        class="w-[55%] h-full flex flex-col items-end justify-center pointer-events-auto"
        style="padding-right: 3cqi;"
      >
        <div class="flex flex-col items-end w-full" style="gap: 0.8cqi;">
          <SectionCard
            badge={pipelineData.header.badge}
            subtitle="System Architecture"
            Icon={Database}
            iconHoverColor="text-primary"
            accentColor="border-cyan-400/40"
            gradientFrom="from-primary"
            shortDescription={pipelineData.content.shortDescription}
            detailedPhilosophy={pipelineData.content.detailedPhilosophy}
          />
          <MarqueeRail />
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
          <SectionAnchor
            label={pipelineData.leftAnchor.label}
            title={pipelineData.leftAnchor.title}
            description={pipelineData.leftAnchor.description}
            labelColor="text-primary/80"
            align="center"
          />

          <SectionCard
            badge={pipelineData.header.badge}
            subtitle="System Architecture"
            Icon={Database}
            iconHoverColor="text-primary"
            accentColor="border-cyan-400/40"
            gradientFrom="from-primary"
            shortDescription={pipelineData.content.shortDescription}
            detailedPhilosophy={pipelineData.content.detailedPhilosophy}
          />
          <MobileMarquee />
        </div>
      </div>
    </div>
  </svelte:fragment>
</MobileCarousel>
