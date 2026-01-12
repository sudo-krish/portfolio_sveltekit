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

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);
    setTimeout(() => ScrollTrigger.refresh(), 500);
  });
</script>

<svelte:head>
  <title>Krishnanand Anil | AWS Data Engineer</title>
</svelte:head>

<div class="fixed-canvas">
  <Canvas>
    <HomeScene />
  </Canvas>
</div>

<main class="snap-container">
  
  <!-- SLIDE 1: HERO (Text Top, 3D Bottom) -->
  <section id="hero" class="snap-section">
    <div class="hero-bg-layer"><HeroBackground /></div>
    <div class="container mx-auto px-6 h-full flex flex-col lg:flex-row items-center justify-center lg:justify-between pointer-events-none">
      <!-- Text First on Mobile (order-1) -->
      <div class="w-full lg:w-1/2 pointer-events-auto flex justify-center lg:justify-start order-1"><HeroContent /></div>
      <!-- Spacer Second on Mobile (order-2) -->
      <div class="w-full lg:w-1/2 h-[30vh] lg:h-auto order-2"></div>
    </div>
  </section>

  <!-- SLIDE 2: PIPELINE (3D Top, Text Bottom) -->
  <section id="pipeline" class="snap-section">
    <div class="container mx-auto px-6 h-full flex flex-col lg:flex-row items-center justify-center lg:justify-between pointer-events-none">
      <!-- Spacer First on Mobile (order-1) -->
      <div class="w-full lg:w-1/2 h-[35vh] lg:h-auto order-1 lg:order-1"></div>
      <!-- Text Second on Mobile (order-2) -->
      <div class="w-full lg:w-1/2 pointer-events-auto flex justify-center lg:justify-start order-2 lg:order-2"><PipelineContent /></div>
    </div>
  </section>

  <!-- SLIDE 3: DATA LAKE (Text Top, 3D Bottom) -->
  <section id="datalake" class="snap-section">
    <div class="container mx-auto px-6 h-full flex flex-col lg:flex-row items-center justify-center lg:justify-between pointer-events-none">
      <!-- FIXED: Text First on Mobile (order-1), Left on Desktop (lg:order-1) -->
      <div class="w-full lg:w-1/2 pointer-events-auto flex justify-center lg:justify-start order-1 lg:order-1"><DataLakeContent /></div>
      <!-- FIXED: Spacer Second on Mobile (order-2), Right on Desktop (lg:order-2) -->
      <div class="w-full lg:w-1/2 h-[35vh] lg:h-auto order-2 lg:order-2"></div>
    </div>
  </section>

  <!-- SLIDE 4: LAKEHOUSE (3D Top, Text Bottom) -->
  <section id="lakehouse" class="snap-section">
    <div class="container mx-auto px-6 h-full flex flex-col lg:flex-row items-center justify-center lg:justify-between pointer-events-none">
      <!-- Spacer First on Mobile (order-1) -->
      <div class="w-full lg:w-1/2 h-[35vh] lg:h-auto order-1 lg:order-1"></div>
      <!-- Text Second on Mobile (order-2) -->
      <div class="w-full lg:w-1/2 pointer-events-auto flex justify-center lg:justify-start order-2 lg:order-2"><LakehouseContent /></div>
    </div>
  </section>

  <!-- SLIDE 5: WAREHOUSE (Text Top, 3D Bottom) -->
  <section id="warehouse" class="snap-section">
    <div class="container mx-auto px-6 h-full flex flex-col lg:flex-row items-center justify-center lg:justify-between pointer-events-none">
      <!-- FIXED: Text First on Mobile (order-1), Left on Desktop (lg:order-1) -->
      <div class="w-full lg:w-1/2 pointer-events-auto flex justify-center lg:justify-start order-1 lg:order-1"><WarehouseContent /></div>
      <!-- FIXED: Spacer Second on Mobile (order-2), Right on Desktop (lg:order-2) -->
      <div class="w-full lg:w-1/2 h-[35vh] lg:h-auto order-2 lg:order-2"></div>
    </div>
  </section>

  <!-- SLIDE 6: COMING SOON -->
  <section class="snap-section bg-background/90 backdrop-blur-md">
    <div class="container mx-auto px-6 h-full flex items-center justify-center">
      <div class="text-center">
        <h3 class="text-3xl font-bold mb-4">More Coming Soon</h3>
        <p class="text-muted-foreground">Metrics, Projects & Contact</p>
      </div>
    </div>
  </section>
</main>

<style>
  .snap-container {
    height: 100dvh; 
    width: 100%;
    overflow-y: scroll;
    scroll-snap-type: y mandatory;
    scroll-behavior: smooth;
    position: relative;
    z-index: 10;
  }
  .snap-section {
    height: 100dvh;
    width: 100%;
    scroll-snap-align: start;
    scroll-snap-stop: always;
    position: relative;
    background: transparent;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  :global(body) {
    background-color: transparent !important;
    overflow: hidden; 
    margin: 0;
  }
  .fixed-canvas {
    position: fixed;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    background: hsl(var(--background));
    transform: translateZ(0); 
  }
  .hero-bg-layer {
    position: absolute;
    inset: 0;
    z-index: -1;
    opacity: 0.3;
    pointer-events: none;
  }
</style>
