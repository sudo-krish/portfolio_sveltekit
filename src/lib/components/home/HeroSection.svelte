<!-- src/lib/components/home/HeroSection.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import { Canvas, T } from "@threlte/core";
  import { Float, OrbitControls, ContactShadows } from "@threlte/extras";

  // Component Imports
  import HeroBackground from "./hero/HeroBackground.svelte";
  import HeroContent from "./hero/HeroContent.svelte";
  import DataMascot from "./3d/DataMascot.svelte";

  let heroSection: HTMLElement;

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Entrance Animation
    const tl = gsap.timeline();

    tl.from(".hero-line", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
    })
      .from(".hero-btn", { opacity: 0, scale: 0.9, duration: 0.5 }, "-=0.5")
      .from(
        ".mascot-wrapper",
        { opacity: 0, scale: 0.8, duration: 1.2, ease: "back.out(1.2)" },
        "-=1.0",
      );
  });
</script>

<section class="hero-wrapper" bind:this={heroSection} id="hero">
  <!-- 1. Background -->
  <HeroBackground />

  <!-- 2. Main Grid 
       - flex-col: Stacks Text on Top, Mascot on Bottom (Mobile)
       - lg:flex-row: Text on Left, Mascot on Right (Desktop)
       - flex-grow: Ensures this container takes up available space for centering
  -->
  <div
    class="container relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-center lg:justify-between flex-grow gap-10 lg:gap-0 pb-16 lg:pb-0"
  >
    <!-- Left/Top: Text Content -->
    <div class="w-full lg:w-1/2 flex justify-center lg:justify-start">
      <HeroContent />
    </div>

    <!-- Right/Bottom: 3D Mascot -->
    <div
      class="mascot-wrapper w-full lg:w-1/2 h-[40vh] lg:h-[75vh] relative flex items-center justify-center"
    >
      <Canvas>
        <T.PerspectiveCamera position={[5, 2, 8]} fov={35}>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={2}
          />
        </T.PerspectiveCamera>

        <!-- Lighting -->
        <T.AmbientLight intensity={0.7} />
        <T.DirectionalLight
          position={[5, 10, 5]}
          intensity={2.5}
          color="#ffffff"
        />
        <T.PointLight position={[-5, -5, -5]} intensity={4} color="#38bdf8" />

        <Float speed={2.5} rotationIntensity={0.5} floatIntensity={0.5}>
          <DataMascot />
        </Float>

        <ContactShadows
          opacity={0.35}
          scale={10}
          blur={2.5}
          far={4}
          color="#000000"
        />
      </Canvas>
    </div>
  </div>

  <!-- 3. Scroll Indicator -->
  <div class="scroll-hint">
    <span class="scroll-text">Scroll Down</span>
    <div class="mouse">
      <div class="wheel"></div>
    </div>
  </div>
</section>

<style>
  :global(:root) {
    --nav-height: 70px;
  }

  .hero-wrapper {
    position: relative;
    width: 100vw;
    /* Use svh (Small Viewport Height) for better mobile browser support */
    min-height: 100svh;
    /* Padding Top offsets the navbar so content is truly centered in the "visible" area */
    padding-top: var(--nav-height);
    display: flex;
    flex-direction: column; /* Allows content to stack naturally inside wrapper */
    overflow: hidden;
    background: hsl(var(--background));
  }

  /* --- MASCOT --- */
  .mascot-wrapper {
    pointer-events: none;
    z-index: 5;
  }

  .mascot-wrapper :global(canvas) {
    pointer-events: auto;
    outline: none; /* Removes focus outline on click */
  }

  /* --- SCROLL HINT --- */
  .scroll-hint {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0.6;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    pointer-events: none;
    z-index: 10;
  }

  .scroll-text {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: hsl(var(--muted-foreground));
    font-weight: 600;
  }

  .mouse {
    width: 20px;
    height: 32px;
    border: 2px solid hsl(var(--foreground));
    border-radius: 20px;
    display: flex;
    justify-content: center;
    padding-top: 6px;
  }

  .wheel {
    width: 3px;
    height: 3px;
    background: hsl(var(--foreground));
    border-radius: 50%;
    animation: scroll 1.5s infinite;
  }

  @keyframes scroll {
    0% {
      transform: translateY(0);
      opacity: 1;
    }
    100% {
      transform: translateY(12px);
      opacity: 0;
    }
  }

  @media (max-width: 1024px) {
    .scroll-hint {
      bottom: 1.5rem; /* Tighter to bottom on mobile to maximize content space */
    }
  }
</style>
