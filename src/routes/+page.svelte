<!-- src/routes/+page.svelte -->
<script lang="ts">
  import { Canvas } from "@threlte/core";
  import { onMount } from "svelte"; 
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import HomeScene from "$lib/components/home/3d/HomeScene.svelte";

  // Content Components
  import HeroContent from "$lib/components/home/hero/HeroContent.svelte";
  import HeroBackground from "$lib/components/home/hero/HeroBackground.svelte";
  import PipelineContent from "$lib/components/home/pipeline/PipelineContent.svelte";
  import DataLakeContent from "$lib/components/home/datalake/DataLakeContent.svelte";
  import LakehouseContent from "$lib/components/home/lakehouse/LakehouseContent.svelte";
  import WarehouseContent from "$lib/components/home/warehouse/WarehouseContent.svelte";
  import MetricsGrid from "$lib/components/home/MetricsGrid.svelte";
  import ContactCTA from "$lib/components/home/ContactCTA.svelte"; 

  // REACTIVE STATE FOR SCROLL BEHAVIOR
  let snapType = 'mandatory';

  onMount(() => {
    // --- 1. ROBUST SCROLL RESET LOGIC ---
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    const resetScroll = () => {
        window.scrollTo(0, 0);
        const container = document.querySelector('.snap-container');
        if (container) {
            container.scrollTop = 0;
        }
    };

    // Attempt 1: Immediate
    resetScroll();

    // Attempt 2: Next Frame (beats rendering lag)
    requestAnimationFrame(resetScroll);

    // Attempt 3: Small Delay (beats browser restoration logic)
    setTimeout(resetScroll, 10);


    // --- 2. GSAP INITIALIZATION ---
    gsap.registerPlugin(ScrollTrigger);
    
    ScrollTrigger.defaults({
        scroller: ".snap-container"
    });

    // Dynamic Scroll Switching (Mandatory <-> Proximity)
    ScrollTrigger.create({
        trigger: "#metrics",
        scroller: ".snap-container",
        start: "top bottom", 
        end: "top top",
        onEnter: () => {
            snapType = 'proximity';
        },
        onLeaveBack: () => {
            snapType = 'mandatory';
        }
    });

    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 500);
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
<main class="snap-container" style="scroll-snap-type: y {snapType};">
  
  <!-- 1. HERO -->
  <section id="hero" class="snap-section">
    <div class="hero-bg-layer"><HeroBackground /></div>
    <div class="container mx-auto px-6 h-full flex flex-col lg:flex-row items-center justify-center lg:justify-between pointer-events-none">
      <div class="w-full lg:w-1/2 pointer-events-auto flex justify-center lg:justify-start order-1"><HeroContent /></div>
      <div class="w-full lg:w-1/2 h-[30vh] lg:h-auto order-2"></div>
    </div>
  </section>

  <!-- 2. PIPELINE -->
  <section id="pipeline" class="snap-section">
    <div class="container mx-auto px-6 h-full flex flex-col lg:flex-row items-center justify-center lg:justify-between pointer-events-none">
      <div class="w-full lg:w-1/2 h-[35vh] lg:h-auto order-1 lg:order-1"></div>
      <div class="w-full lg:w-1/2 pointer-events-auto flex justify-center lg:justify-start order-2 lg:order-2"><PipelineContent /></div>
    </div>
  </section>

  <!-- 3. DATA LAKE -->
  <section id="datalake" class="snap-section">
    <div class="container mx-auto px-6 h-full flex flex-col lg:flex-row items-center justify-center lg:justify-between pointer-events-none">
      <div class="w-full lg:w-1/2 pointer-events-auto flex justify-center lg:justify-start order-1 lg:order-1"><DataLakeContent /></div>
      <div class="w-full lg:w-1/2 h-[35vh] lg:h-auto order-2 lg:order-2"></div>
    </div>
  </section>

  <!-- 4. LAKEHOUSE -->
  <section id="lakehouse" class="snap-section">
    <div class="container mx-auto px-6 h-full flex flex-col lg:flex-row items-center justify-center lg:justify-between pointer-events-none">
      <div class="w-full lg:w-1/2 h-[35vh] lg:h-auto order-1 lg:order-1"></div>
      <div class="w-full lg:w-1/2 pointer-events-auto flex justify-center lg:justify-start order-2 lg:order-2"><LakehouseContent /></div>
    </div>
  </section>

  <!-- 5. WAREHOUSE -->
  <section id="warehouse" class="snap-section">
    <div class="container mx-auto px-6 h-full flex flex-col lg:flex-row items-center justify-center lg:justify-between pointer-events-none">
      <div class="w-full lg:w-1/2 pointer-events-auto flex justify-center lg:justify-start order-1 lg:order-1"><WarehouseContent /></div>
      <div class="w-full lg:w-1/2 h-[35vh] lg:h-auto order-2 lg:order-2"></div>
    </div>
  </section>

  <!-- 6. METRICS -->
  <section id="metrics" class="snap-section metrics-section z-10 pointer-events-none">
    <div class="container mx-auto px-6 py-20 lg:py-0 w-full max-w-7xl flex flex-col justify-center min-h-[inherit]">
        <div class="pointer-events-auto w-full rounded-3xl border border-white/10 bg-background/50 backdrop-blur-md shadow-2xl p-6 lg:p-10">
            <h2 class="text-3xl font-bold mb-8 text-white/90">System Performance</h2>
            <MetricsGrid />
        </div>
    </div>
  </section>

  <!-- 7. CONTACT -->
  <section id="contact" class="snap-section contact-section z-10 pointer-events-none">
    <div class="container mx-auto px-6 w-full max-w-7xl flex flex-col justify-center h-full">
         <div class="pointer-events-auto w-full max-w-3xl mx-auto rounded-3xl border border-white/10 bg-background/50 backdrop-blur-md shadow-2xl p-8 lg:p-12">
            <ContactCTA />
        </div>
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

  /* STANDARD SECTIONS */
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

  /* METRICS & CONTACT */
  .metrics-section, .contact-section {
    height: auto !important;      
    min-height: 100dvh;          
    overflow: visible !important; 
    
    scroll-snap-align: start; 
    scroll-snap-stop: normal; 
    
    padding-top: 5vh;
    padding-bottom: 5vh;
  }

  @media (max-width: 768px) {
    .metrics-section, .contact-section {
      scroll-snap-stop: normal; 
    }
  }

  :global(body) {
    background-color: hsl(var(--background));
    overflow: hidden; 
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
