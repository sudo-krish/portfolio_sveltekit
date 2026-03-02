<!-- src/routes/+page.svelte -->
<script lang="ts">
  import { Canvas } from "@threlte/core";
  import { onMount, onDestroy, tick } from "svelte";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
  import HomeScene from "$lib/components/home/3d/HomeScene.svelte";

  // Existing Content Components
  import HeroContent from "$lib/components/home/hero/HeroContent.svelte";
  import HeroBackground from "$lib/components/home/hero/HeroBackground.svelte";
  import PipelineContent from "$lib/components/home/pipeline/PipelineContent.svelte";
  import DataLakeContent from "$lib/components/home/datalake/DataLakeContent.svelte";
  import LakehouseContent from "$lib/components/home/lakehouse/LakehouseContent.svelte";
  import WarehouseContent from "$lib/components/home/warehouse/WarehouseContent.svelte";

  // Full-Viewport Metric Sections
  import ExperienceSection from "$lib/components/home/experience/ExperienceSection.svelte";
  import TechStackSection from "$lib/components/home/techstack/TechStackSection.svelte";
  import GithubSection from "$lib/components/home/github/GithubSection.svelte";
  import ImpactSection from "$lib/components/home/impact/ImpactSection.svelte";
  import CredentialsSection from "$lib/components/home/credentials/CredentialsSection.svelte";
  import ContactSection from "$lib/components/home/contact/ContactSection.svelte";

  onMount(() => {
    // 1. SCROLL RESET LOGIC
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // Lock body scroll - handled smoothly
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    // 2. GSAP INITIALIZATION
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.defaults({
      scroller: ".snap-container",
      // Important for scroll-snap compatibility
      fastScrollEnd: true,
    });

    let ro: ResizeObserver | null = null;

    tick().then(() => {
      // Use a ResizeObserver to trigger GSAP refresh only when the DOM actually settles
      const container = document.querySelector(".snap-container");
      if (container) {
        ro = new ResizeObserver(() => {
          ScrollTrigger.refresh();
        });
        ro.observe(container);
      }
    });

    return () => {
      if (ro) ro.disconnect();
    };
  });

  onDestroy(() => {
    if (typeof document !== "undefined") {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    ScrollTrigger.defaults({ scroller: window });
    ScrollTrigger.getAll().forEach((t) => t.kill());
  });
</script>

<svelte:head>
  <title>Krishnanand Anil | AWS Data Engineer</title>
</svelte:head>

<!-- BACKGROUND CANVAS -->
<div class="fixed-canvas">
  <Canvas>
    <HomeScene />
  </Canvas>
</div>

<!-- MAIN SCROLL CONTAINER -->
<main class="snap-container">
  <section id="hero" class="snap-section">
    <div class="hero-bg-layer"><HeroBackground /></div>
    <div class="absolute inset-0 w-full h-full z-20 pointer-events-none">
      <HeroContent />
    </div>
  </section>

  <section id="pipeline" class="snap-section">
    <div class="absolute inset-0 w-full h-full z-20 pointer-events-none">
      <PipelineContent />
    </div>
  </section>

  <section id="datalake" class="snap-section">
    <div class="absolute inset-0 w-full h-full z-20 pointer-events-none">
      <DataLakeContent />
    </div>
  </section>

  <section id="lakehouse" class="snap-section">
    <div class="absolute inset-0 w-full h-full z-20 pointer-events-none">
      <LakehouseContent />
    </div>
  </section>

  <section id="warehouse" class="snap-section">
    <div class="absolute inset-0 w-full h-full z-20 pointer-events-none">
      <WarehouseContent />
    </div>
  </section>

  <section id="experience" class="snap-section">
    <div class="absolute inset-0 w-full h-full z-20 pointer-events-none">
      <ExperienceSection />
    </div>
  </section>

  <section id="techstack" class="snap-section">
    <div class="absolute inset-0 w-full h-full z-20 pointer-events-none">
      <TechStackSection />
    </div>
  </section>

  <section id="github" class="snap-section">
    <div class="absolute inset-0 w-full h-full z-20 pointer-events-none">
      <GithubSection />
    </div>
  </section>

  <section id="impact" class="snap-section">
    <div class="absolute inset-0 w-full h-full z-20 pointer-events-none">
      <ImpactSection />
    </div>
  </section>

  <section id="credentials" class="snap-section">
    <div class="absolute inset-0 w-full h-full z-20 pointer-events-none">
      <CredentialsSection />
    </div>
  </section>

  <section id="contact" class="snap-section">
    <div class="absolute inset-0 w-full h-full z-20 pointer-events-none">
      <ContactSection />
    </div>
  </section>
</main>

<style>
  /* PARENT CONTAINER */
  .snap-container {
    height: 100dvh;
    height: 100vh; /* Fallback */
    width: 100%;
    overflow-y: auto; /* Changed from scroll to auto for cleaner OS handling */
    scroll-behavior: smooth;
    scroll-snap-type: y mandatory;
    position: relative;
    z-index: 10;
    /* Hide scrollbar for a seamless app-like feel */
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .snap-container::-webkit-scrollbar {
    display: none;
  }

  /* STANDARD SECTIONS */
  .snap-section {
    height: 100dvh;
    height: 100vh;
    width: 100%;
    scroll-snap-align: start;
    scroll-snap-stop: always;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
  }

  .fixed-canvas {
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background: transparent;
  }

  .hero-bg-layer {
    position: absolute;
    inset: 0;
    z-index: 5;
    opacity: 0.3;
    pointer-events: none;
  }
</style>
