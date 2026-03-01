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

  // NEW V9: Full-Viewport Metric Sections
  import ExperienceSection from "$lib/components/home/experience/ExperienceSection.svelte";
  import TechStackSection from "$lib/components/home/techstack/TechStackSection.svelte";
  import GithubSection from "$lib/components/home/github/GithubSection.svelte";
  import ImpactSection from "$lib/components/home/impact/ImpactSection.svelte";
  import CredentialsSection from "$lib/components/home/credentials/CredentialsSection.svelte";
  import ContactSection from "$lib/components/home/contact/ContactSection.svelte";

  onMount(async () => {
    // --- 1. ROBUST SCROLL RESET LOGIC ---
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // Lock body scroll for the home page (it uses .snap-container)
    document.body.style.overflow = "hidden";

    const resetScroll = () => {
      window.scrollTo(0, 0);
      const container = document.querySelector(".snap-container");
      if (container) {
        container.scrollTop = 0;
      }
    };

    resetScroll();
    requestAnimationFrame(resetScroll);
    setTimeout(resetScroll, 10);

    // --- 2. GSAP INITIALIZATION ---
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.defaults({
      scroller: ".snap-container",
    });

    // Wait for Svelte to finish rendering children
    await tick();

    // Give 3D canvas and components time to mount
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    // Fallback refresh for slower renders
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);
  });

  onDestroy(() => {
    // Restore normal body scroll when leaving the home page
    if (typeof document !== "undefined") {
      document.body.style.overflow = "";
    }

    // CRITICAL: Reset the global GSAP scroller default so it doesn't break slug pages!
    ScrollTrigger.defaults({ scroller: window });

    // Clean up all ScrollTriggers created on the home page when navigating away
    // This prevents scroll math errors when returning back from a slug route
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
<main class="snap-container" style="scroll-snap-type: y mandatory;">
  <!-- 1. HERO -->
  <section id="hero" class="snap-section">
    <div class="hero-bg-layer"><HeroBackground /></div>
    <div class="absolute inset-0 w-full h-full pointer-events-none z-10">
      <HeroContent />
    </div>
  </section>

  <!-- 2. PIPELINE -->
  <section id="pipeline" class="snap-section">
    <div class="absolute inset-0 w-full h-full pointer-events-none z-10">
      <PipelineContent />
    </div>
  </section>

  <!-- 3. DATA LAKE -->
  <section id="datalake" class="snap-section">
    <div class="absolute inset-0 w-full h-full pointer-events-none z-10">
      <DataLakeContent />
    </div>
  </section>

  <!-- 4. LAKEHOUSE -->
  <section id="lakehouse" class="snap-section">
    <div class="absolute inset-0 w-full h-full pointer-events-none z-10">
      <LakehouseContent />
    </div>
  </section>

  <!-- 5. WAREHOUSE -->
  <section id="warehouse" class="snap-section">
    <div class="absolute inset-0 w-full h-full pointer-events-none z-10">
      <WarehouseContent />
    </div>
  </section>

  <!-- ============================================= -->
  <!-- V9: NEW FULL-VIEWPORT METRIC SECTIONS         -->
  <!-- ============================================= -->

  <!-- 6. EXPERIENCE -->
  <section id="experience" class="snap-section">
    <div class="absolute inset-0 w-full h-full pointer-events-none z-10">
      <ExperienceSection />
    </div>
  </section>

  <!-- 7. TECH STACK -->
  <section id="techstack" class="snap-section">
    <div class="absolute inset-0 w-full h-full pointer-events-none z-10">
      <TechStackSection />
    </div>
  </section>

  <!-- 8. GITHUB -->
  <section id="github" class="snap-section">
    <div class="absolute inset-0 w-full h-full pointer-events-none z-10">
      <GithubSection />
    </div>
  </section>

  <!-- 9. IMPACT -->
  <section id="impact" class="snap-section">
    <div class="absolute inset-0 w-full h-full pointer-events-none z-10">
      <ImpactSection />
    </div>
  </section>

  <!-- 10. CREDENTIALS -->
  <section id="credentials" class="snap-section">
    <div class="absolute inset-0 w-full h-full pointer-events-none z-10">
      <CredentialsSection />
    </div>
  </section>

  <!-- 11. CONTACT -->
  <section id="contact" class="snap-section">
    <div class="absolute inset-0 w-full h-full pointer-events-none z-10">
      <ContactSection />
    </div>
  </section>
</main>

<style>
  /* PARENT CONTAINER */
  .snap-container {
    height: 100dvh;
    width: 100%;
    overflow-y: scroll;
    scroll-behavior: smooth;
    position: relative;
    z-index: 10;
  }

  /* STANDARD SECTIONS — All sections are now uniform snap sections */
  .snap-section {
    height: 100dvh;
    width: 100%;
    scroll-snap-align: start;
    scroll-snap-stop: always;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
  }

  :global(body) {
    background-color: hsl(var(--background));
    margin: 0;
  }
  .fixed-canvas {
    position: fixed;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    background: hsl(var(--background));
  }
  .hero-bg-layer {
    position: absolute;
    inset: 0;
    z-index: -1;
    opacity: 0.3;
    pointer-events: none;
  }
</style>
