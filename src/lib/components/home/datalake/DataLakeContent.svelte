<!-- src/lib/components/home/datalake/DataLakeContent.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import { ChevronDown } from "lucide-svelte";
  import gsap from "gsap";
  import GlowAccent from "$lib/components/ui/GlowAccent.svelte";
  import MobileCarousel from "$lib/components/ui/MobileCarousel.svelte";
  import { datalakeData } from "$lib/data/datalake";

  import SectionAnchor from "$lib/components/ui/anchors/SectionAnchor.svelte";
  import SectionCard from "$lib/components/ui/cards/SectionCard.svelte";
  import StorageGrid from "./desktop/StorageGrid.svelte";
  import { HardDrive } from "lucide-svelte";





  let rightPanel: HTMLElement;
  let leftPanel: HTMLElement;
  let mobilePanel: HTMLElement;
  let scrollHint: HTMLElement;

  onMount(() => {
    let ctx = gsap.context(() => {
      // Right Anchor Animation (Desktop)
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

      // Left Content Panel Animation (Desktop)
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
          <SectionCard
            badge={datalakeData.header.badge}
            subtitle="Central Data Reservoir"
            Icon={HardDrive}
            iconHoverColor="text-emerald-400"
            accentColor="border-emerald-400/40"
            gradientFrom="from-emerald-400"
            shortDescription={datalakeData.content.shortDescription}
            detailedPhilosophy={datalakeData.content.detailedPhilosophy}
          />
          <StorageGrid />
        </div>
      </div>

      <!-- RIGHT 45%: Typographic Anchor & 3D Space -->
      <div
        bind:this={rightPanel}
        class="w-[45%] h-full flex flex-col items-end justify-end text-right pointer-events-auto"
        style="padding-right: 3cqi; padding-bottom: 3cqi;"
      >
        <SectionAnchor
          label={datalakeData.rightAnchor.label}
          title={datalakeData.rightAnchor.title}
          description={datalakeData.rightAnchor.description}
          labelColor="text-emerald-400/80"
          align="right"
        />
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
      class="h-full w-full overflow-y-auto overscroll-contain no-scrollbar touch-pan-y relative z-20 pointer-events-auto"
    >
      <div
        bind:this={mobilePanel}
        class="flex flex-col items-center justify-center w-full min-h-[100dvh] max-w-lg mx-auto gap-6 px-4 pt-[12dvh] pb-[20dvh]"
      >
        <SectionAnchor
          label={datalakeData.rightAnchor.label}
          title={datalakeData.rightAnchor.title}
          description={datalakeData.rightAnchor.description}
          labelColor="text-emerald-400/80"
          align="center"
        />

        <SectionCard
          badge={datalakeData.header.badge}
          subtitle="Storage Architecture"
          Icon={HardDrive}
          iconHoverColor="text-emerald-400"
          accentColor="border-emerald-400/40"
          gradientFrom="from-emerald-400"
          shortDescription={datalakeData.content.shortDescription}
          detailedPhilosophy={datalakeData.content.detailedPhilosophy}
        />
        <StorageGrid />
      </div>
    </div>
  </svelte:fragment>
</MobileCarousel>
