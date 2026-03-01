<!-- src/routes/+page.svelte -->
<script lang="ts">
  import { Canvas } from "@threlte/core";
  import { onMount } from "svelte";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import HomeScene from "$lib/components/home/3d/HomeScene.svelte";

  // Content Components
  import HeroContent from "$lib/components/home/hero/HeroContent.svelte";
  import PipelineContent from "$lib/components/home/pipeline/PipelineContent.svelte";
  import DataLakeContent from "$lib/components/home/datalake/DataLakeContent.svelte";
  import LakehouseContent from "$lib/components/home/lakehouse/LakehouseContent.svelte";
  import WarehouseContent from "$lib/components/home/warehouse/WarehouseContent.svelte";
  import MetricsGrid from "$lib/components/home/MetricsGrid.svelte";
  import ContactCTA from "$lib/components/home/ContactCTA.svelte";

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Scroll Restoration
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    // Fade-up animations for content sections
    const sections = gsap.utils.toArray(".story-section");
    sections.forEach((section: any) => {
      const content = section.querySelector(".story-content");
      if (!content) return;

      gsap.fromTo(
        content,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            end: "top 20%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });

    // Fade-up for post-story sections
    const postSections = gsap.utils.toArray(".gsap-fade-up");
    postSections.forEach((section: any) => {
      gsap.fromTo(
        section,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });

    setTimeout(() => ScrollTrigger.refresh(), 200);
  });
</script>

<svelte:head>
  <title>Krishnanand Anil | Data Architecture & Engineering</title>
  <meta
    name="description"
    content="Senior Data Engineer specializing in real-time pipelines, data lakes, and enterprise warehouses. Processing 50M+ events daily."
  />
</svelte:head>

<!-- FIXED 3D CANVAS (Background) -->
<div class="fixed inset-0 z-0 pointer-events-none w-full h-full">
  <Canvas>
    <HomeScene />
  </Canvas>
  <!-- Subtle overlay – keep transparent so 3D shines through -->
  <div
    class="absolute inset-0 bg-gradient-to-b from-transparent via-background/10 to-background/40 z-0"
  ></div>
</div>

<!-- ══════════════════════════════════════════════════════ -->
<!-- MAIN SCROLL CONTAINER – THE NARRATIVE                 -->
<!-- ══════════════════════════════════════════════════════ -->
<main class="relative z-10 w-full overflow-x-hidden">
  <!-- ─── CHAPTER 0: THE HERO ─── -->
  <!-- 3D: DataMascot floats on the RIGHT (x: 3.5) -->
  <!-- Text: LEFT -->
  <section id="hero" class="story-section min-h-screen flex items-center">
    <div class="container mx-auto px-6 lg:px-12 w-full">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div
          class="story-content lg:col-span-1 relative z-20 order-1 lg:order-1"
        >
          <HeroContent />
        </div>
        <!-- Right side: empty space for 3D model -->
        <div class="hidden lg:block lg:col-span-1 order-2 lg:order-2"></div>
      </div>
    </div>
  </section>

  <!-- ─── Scroll-down invitation ─── -->
  <div class="relative z-20 flex justify-center -mt-24 mb-8">
    <div
      class="scroll-indicator flex flex-col items-center gap-3 text-muted-foreground/50"
    >
      <span class="text-[10px] font-mono uppercase tracking-[0.3em]"
        >Scroll to explore</span
      >
      <div
        class="w-px h-8 bg-gradient-to-b from-primary/50 to-transparent animate-pulse"
      ></div>
    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════ -->
  <!-- THE ARCHITECTURE STORY (Wrapper for 3D tracking)    -->
  <!-- ═══════════════════════════════════════════════════ -->
  <div id="architecture-story">
    <!-- ─── CHAPTER 1: THE PIPELINE ─── -->
    <!-- 3D: GlassPipe rises on the LEFT (x: -3.5) -->
    <!-- Text: RIGHT -->
    <section
      id="section-pipeline"
      class="story-section min-h-screen flex items-center relative"
    >
      <!-- Ambient glow -->
      <div class="absolute inset-0 pointer-events-none z-0">
        <div
          class="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]"
        ></div>
      </div>

      <div class="container mx-auto px-6 lg:px-12 w-full relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <!-- Left: empty for 3D pipe -->
          <div class="hidden lg:block lg:col-span-1 order-1 lg:order-1"></div>
          <!-- Right: content -->
          <div class="story-content lg:col-span-1 order-2 lg:order-2">
            <div class="narrative-connector mb-6">
              <span
                class="font-mono text-[10px] text-primary/60 tracking-[0.3em] uppercase"
                >Chapter 01</span
              >
              <div class="h-px w-16 bg-primary/20 mt-2"></div>
            </div>
            <PipelineContent />
          </div>
        </div>
      </div>
    </section>

    <!-- ─── CHAPTER 2: THE DATA LAKE ─── -->
    <!-- 3D: DataLake rises on the RIGHT (x: 3.5) -->
    <!-- Text: LEFT -->
    <section
      id="section-datalake"
      class="story-section min-h-screen flex items-center relative"
    >
      <div class="absolute inset-0 pointer-events-none z-0">
        <div
          class="absolute top-1/3 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px]"
        ></div>
      </div>

      <div class="container mx-auto px-6 lg:px-12 w-full relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <!-- Left: content -->
          <div class="story-content lg:col-span-1 order-1 lg:order-1">
            <div class="narrative-connector mb-6">
              <span
                class="font-mono text-[10px] text-emerald-500/60 tracking-[0.3em] uppercase"
                >Chapter 02</span
              >
              <div class="h-px w-16 bg-emerald-500/20 mt-2"></div>
            </div>
            <DataLakeContent />
          </div>
          <!-- Right: empty for 3D lake -->
          <div class="hidden lg:block lg:col-span-1 order-2 lg:order-2"></div>
        </div>
      </div>
    </section>

    <!-- ─── CHAPTER 3: THE LAKEHOUSE ─── -->
    <!-- 3D: DataHouse grows on the LEFT (x: -3.5) -->
    <!-- Text: RIGHT -->
    <section
      id="section-lakehouse"
      class="story-section min-h-screen flex items-center relative"
    >
      <div class="absolute inset-0 pointer-events-none z-0">
        <div
          class="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px]"
        ></div>
      </div>

      <div class="container mx-auto px-6 lg:px-12 w-full relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <!-- Left: empty for 3D house -->
          <div class="hidden lg:block lg:col-span-1 order-1 lg:order-1"></div>
          <!-- Right: content -->
          <div class="story-content lg:col-span-1 order-2 lg:order-2">
            <div class="narrative-connector mb-6">
              <span
                class="font-mono text-[10px] text-cyan-500/60 tracking-[0.3em] uppercase"
                >Chapter 03</span
              >
              <div class="h-px w-16 bg-cyan-500/20 mt-2"></div>
            </div>
            <LakehouseContent />
          </div>
        </div>
      </div>
    </section>

    <!-- ─── CHAPTER 4: THE WAREHOUSE ─── -->
    <!-- 3D: DataWarehouse drops on the RIGHT (x: 3.5) -->
    <!-- Text: LEFT -->
    <section
      id="section-warehouse"
      class="story-section min-h-screen flex items-center relative"
    >
      <div class="absolute inset-0 pointer-events-none z-0">
        <div
          class="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px]"
        ></div>
      </div>

      <div class="container mx-auto px-6 lg:px-12 w-full relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <!-- Left: content -->
          <div class="story-content lg:col-span-1 order-1 lg:order-1">
            <div class="narrative-connector mb-6">
              <span
                class="font-mono text-[10px] text-purple-500/60 tracking-[0.3em] uppercase"
                >Chapter 04</span
              >
              <div class="h-px w-16 bg-purple-500/20 mt-2"></div>
            </div>
            <WarehouseContent />
          </div>
          <!-- Right: empty for 3D warehouse -->
          <div class="hidden lg:block lg:col-span-1 order-2 lg:order-2"></div>
        </div>
      </div>
    </section>
  </div>
  <!-- END architecture-story -->

  <!-- ═══════════════════════════════════════════════════ -->
  <!-- POST-STORY: METRICS & CONTACT                      -->
  <!-- ═══════════════════════════════════════════════════ -->

  <!-- METRICS -->
  <section
    id="metrics"
    class="container mx-auto px-6 lg:px-12 w-full max-w-7xl pt-24 pb-12"
  >
    <div
      class="glass-panel rounded-3xl p-8 lg:p-12 relative overflow-hidden gsap-fade-up"
    >
      <div
        class="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 rounded-3xl pointer-events-none"
      ></div>
      <div class="relative z-10">
        <h2
          class="text-3xl font-bold mb-10 text-foreground flex items-center gap-3"
        >
          <span class="w-3 h-3 rounded-full bg-primary animate-pulse"></span>
          System Performance
        </h2>
        <MetricsGrid />
      </div>
    </div>
  </section>

  <!-- CONTACT -->
  <section
    id="contact"
    class="container mx-auto px-6 lg:px-12 w-full max-w-4xl py-24 pb-32"
  >
    <div
      class="glass-panel rounded-3xl p-8 lg:p-16 text-center gsap-fade-up border border-white/10 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] bg-card/40 relative overflow-hidden"
    >
      <div
        class="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-50 pointer-events-none"
      ></div>
      <div class="relative z-10 w-full flex justify-center">
        <ContactCTA />
      </div>
    </div>
  </section>
</main>

<style>
  :global(body) {
    overflow-y: auto !important;
    overflow-x: hidden;
  }

  /* Narrative connector – the chapter labels */
  .narrative-connector {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  /* Glass-panel backdrop behind text content for readability over 3D */
  :global(.story-content) {
    background: rgba(2, 6, 23, 0.6);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 1.5rem;
    padding: 2.5rem;
  }

  @media (max-width: 1023px) {
    :global(.story-content) {
      background: rgba(2, 6, 23, 0.8);
      padding: 1.5rem;
      border-radius: 1rem;
    }
  }
</style>
