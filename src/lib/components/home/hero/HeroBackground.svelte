<!-- src/lib/components/home/hero/HeroBackground.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import gsap from "gsap";

  onMount(() => {
    // Select all rows
    const rows = document.querySelectorAll(".marquee-row");

    rows.forEach((row, i) => {
      // Alternating directions and slightly different speeds for depth
      const direction = i % 2 === 0 ? 1 : -1;
      const duration = 25 + i * 5; // 25s, 30s, 35s...

      const inner = row.querySelector(".marquee-inner");

      // We animate from 0 to -50% (or 0 to 50% depending on direction)
      // Assuming the inner content is duplicated to ensure seamless looping
      gsap.to(inner, {
        xPercent: direction * -50,
        ease: "none",
        duration: duration,
        repeat: -1,
      });
    });
  });
</script>

<div class="kinetic-bg">
  <!-- Gradient Overlay: Ensures the center is readable and edges fade out -->
  <div class="overlay-mask"></div>

  <div class="content-wrapper">
    <!-- ROW 1: Fast, Faint -->
    <div class="marquee-row opacity-30">
      <div class="marquee-inner">
        <span>DATA</span> <span class="stroke">ENGINEERING</span>
        <span class="sep">///</span>
        <span>CLOUD</span> <span class="stroke">NATIVE</span>
        <span class="sep">///</span>
        <span>DATA</span> <span class="stroke">ENGINEERING</span>
        <span class="sep">///</span>
        <span>CLOUD</span> <span class="stroke">NATIVE</span>
        <span class="sep">///</span>
      </div>
    </div>

    <!-- ROW 2: Main, Bold -->
    <div class="marquee-row opacity-60">
      <div class="marquee-inner">
        <span class="stroke">SYSTEM</span> <span>ARCHITECT</span>
        <span class="sep">+++</span>
        <span class="stroke">BIG</span> <span>DATA</span>
        <span class="sep">+++</span>
        <span class="stroke">SYSTEM</span> <span>ARCHITECT</span>
        <span class="sep">+++</span>
        <span class="stroke">BIG</span> <span>DATA</span>
        <span class="sep">+++</span>
      </div>
    </div>

    <!-- ROW 3: Slower, Bottom -->
    <div class="marquee-row opacity-40">
      <div class="marquee-inner">
        <span>PYTHON</span> <span class="stroke">SQL</span>
        <span class="sep">::</span>
        <span>KAFKA</span> <span class="stroke">SPARK</span>
        <span class="sep">::</span>
        <span>PYTHON</span> <span class="stroke">SQL</span>
        <span class="sep">::</span>
        <span>KAFKA</span> <span class="stroke">SPARK</span>
        <span class="sep">::</span>
      </div>
    </div>
  </div>
</div>

<style>
  .kinetic-bg {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
    user-select: none;
    z-index: 0;
    /* Background color fallback */
    background: transparent;
  }

  /* 
     This wrapper holds the slanted text.
     We make it larger than the screen so the rotation doesn't leave empty corners.
  */
  .content-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 150vw;
    height: 150vh;
    transform: translate(-50%, -50%) rotate(-6deg);
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 4rem; /* Vertical spacing between rows */
  }

  /* 
     CSS MASKING: 
     1. Fade out left/right edges (linear-gradient)
     2. Fade out the CENTER circle (radial-gradient) so hero text pops
  */
  .kinetic-bg {
    mask-image: radial-gradient(circle at center, transparent 10%, black 80%);
    -webkit-mask-image: radial-gradient(
      circle at center,
      transparent 10%,
      black 80%
    );
  }

  .marquee-row {
    width: 100%;
    display: flex;
    overflow: visible; /* Allow GSAP to push content outside without clipping locally */
  }

  .marquee-inner {
    display: flex;
    white-space: nowrap;
    /* IMPORTANT: Hardware acceleration for smooth text movement */
    will-change: transform;
  }

  /* TEXT STYLING */
  .marquee-inner span {
    font-family: "JetBrains Mono", "Fira Code", monospace; /* Tech feel */
    font-size: 8vw; /* Slightly smaller than 12vw for better density */
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.05em;
    color: hsl(var(--foreground));
    margin-right: 2rem; /* Gap between words */
  }

  /* OUTLINE STYLE */
  .marquee-inner span.stroke {
    color: transparent;
    -webkit-text-stroke: 1.5px hsl(var(--foreground));
    opacity: 0.8;
  }

  /* SEPARATOR STYLE */
  .marquee-inner span.sep {
    color: hsl(var(--primary));
    opacity: 0.4;
    font-weight: 400;
  }

  /* MOBILE ADJUSTMENTS */
  @media (max-width: 768px) {
    .content-wrapper {
      gap: 2rem;
    }
    .marquee-inner span {
      font-size: 15vw; /* Larger relative text on mobile */
    }
  }
</style>
