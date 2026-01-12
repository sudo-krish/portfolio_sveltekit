<!-- src/lib/components/home/PipelineSection.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import { Canvas, T } from "@threlte/core";
  import { Environment } from "@threlte/extras";
  import { Database, GitMerge, Server, Zap } from "lucide-svelte";
  
  import LiquidMascot from "$lib/components/home/3d/GlassPipe.svelte";

  let sectionRef: HTMLElement;
  let pipelinePath: SVGPathElement;
  let fillLevel = 0; // Bound to the 3D component

  const pipelineFeatures = [
    { icon: Database, title: "Data Ingestion", desc: "Batch & Streaming (Kafka/Spark)" },
    { icon: GitMerge, title: "Transformation", desc: "dbt Modeling & Airflow Orchestration" },
    { icon: Server, title: "Warehousing", desc: "Snowflake / BigQuery Optimization" },
    { icon: Zap, title: "Real-time Serving", desc: "Sub-second API Latency" }
  ];

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef,
        start: "top center", // When top of section hits center of screen
        end: "bottom bottom",
        scrub: 1, // Smoothly animate with scroll
      }
    });

    // 1. Draw the SVG Pipe line
    const pathLength = pipelinePath.getTotalLength();
    gsap.set(pipelinePath, { strokeDasharray: pathLength, strokeDashoffset: pathLength });
    
    tl.to(pipelinePath, {
      strokeDashoffset: 0,
      ease: "none",
      duration: 1
    })
    
    // 2. "Fill" the mascot with water as the pipe finishes drawing
    .to(sectionRef, {
      onUpdate: () => {
        // Map animation progress to fill level (0 to 1)
        fillLevel = tl.progress(); 
      }
    }, "<") // Start at same time

    // 3. Reveal Text Content Staggered
    .from(".pipeline-item", {
      y: 30,
      opacity: 0,
      stagger: 0.2,
      duration: 0.5
    }, "-=0.5");
  });
</script>

<section bind:this={sectionRef} class="relative w-full min-h-screen bg-background flex flex-col justify-center py-20 overflow-hidden">

  <!-- BACKGROUND: Visual Grid -->
  <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

  <!-- SVG CONNECTION LINE -->
  <!-- This visually connects the top of the screen to the mascot -->
  <svg class="absolute top-0 left-0 w-full h-full pointer-events-none z-10 hidden lg:block" preserveAspectRatio="none">
    <!-- Path starts top-center, curves to left-center where mascot is -->
    <path 
      bind:this={pipelinePath}
      d="M 50% 0 V 10 Q 50% 50% 25% 50%" 
      fill="none" 
      stroke="hsl(var(--primary))" 
      stroke-width="2"
      class="opacity-50"
    />
    <!-- Glowing effect for the pipe -->
    <path 
      d="M 50% 0 V 10 Q 50% 50% 25% 50%" 
      fill="none" 
      stroke="hsl(var(--primary))" 
      stroke-width="6"
      class="opacity-10 blur-md"
    />
  </svg>

  <div class="container mx-auto px-6 relative z-20">
    <div class="flex flex-col lg:flex-row items-center gap-12 lg:gap-0">

      <!-- LEFT: 3D WATER MASCOT -->
      <div class="w-full lg:w-1/2 h-[50vh] lg:h-[80vh] relative order-2 lg:order-1">
        
        <!-- Connection Node (Visual entry point for pipe) -->
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[120%] hidden lg:block text-primary animate-pulse">
          <div class="w-4 h-4 bg-primary rounded-full blur-[2px]"></div>
        </div>

        <Canvas>
          <T.PerspectiveCamera makeDefault position={[0, 0, 6]} fov={45} />
          
          <Environment preset="city" />
          <T.AmbientLight intensity={0.5} />
          <T.DirectionalLight position={[5, 10, 5]} intensity={2} />
          
          <!-- The Custom Component we built above -->
          <LiquidMascot {fillLevel} />
          
        </Canvas>
      </div>

      <!-- RIGHT: CONTENT -->
      <div class="w-full lg:w-1/2 order-1 lg:order-2">
        <div class="max-w-xl pl-0 lg:pl-12">
          
          <h2 class="text-primary font-mono text-sm tracking-widest mb-4 uppercase pipeline-item">
            // The Architecture
          </h2>
          
          <h3 class="text-4xl md:text-5xl font-bold mb-6 text-foreground pipeline-item">
            Fluid Data <br />
            <span class="text-muted-foreground">Pipelines.</span>
          </h3>

          <p class="text-muted-foreground text-lg mb-10 leading-relaxed pipeline-item">
            I design fault-tolerant ETL/ELT pipelines that treat data like water—it flows continuously, adapts to the shape of the container, and remains pure from source to destination.
          </p>

          <!-- EXPERTISE GRID -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {#each pipelineFeatures as feat}
              <div class="pipeline-item p-4 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors hover:border-primary/50 group">
                <div class="mb-3 text-primary group-hover:scale-110 transition-transform origin-left">
                  <svelte:component this={feat.icon} size={28} />
                </div>
                <h4 class="font-bold text-foreground mb-1">{feat.title}</h4>
                <p class="text-sm text-muted-foreground">{feat.desc}</p>
              </div>
            {/each}
          </div>

        </div>
      </div>

    </div>
  </div>
</section>
