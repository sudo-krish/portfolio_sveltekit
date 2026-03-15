<script lang="ts">
  import { browser } from "$app/environment";
  import { Canvas } from "@threlte/core";
  import { onMount, onDestroy, tick } from "svelte";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
  import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin"; // MUST IMPORT THIS
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
  import { scrollTriggerTarget } from "$lib/stores/scroll-store";

  let observer: any;
  let keydownHandler: any;

  onMount(() => {
    // 1. SCROLL RESET LOGIC
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    // 2. GSAP INITIALIZATION
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // Keep the defaults exactly as they were so HomeScene tracks correctly
    ScrollTrigger.defaults({
      scroller: ".snap-container",
    });

    let ro: ResizeObserver | null = null;

    tick().then(() => {
      const container = document.querySelector(
        ".snap-container",
      ) as HTMLElement;
      const sections = gsap.utils.toArray(".snap-section") as HTMLElement[];

      if (container && sections.length > 0) {
        let currentIndex = 0;
        let isAnimating = false;

        // Reset scroll position on load
        container.scrollTo(0, 0);

        // 3. The Controlled Slow Snap Function
        function gotoSection(index: number) {
          if (index < 0 || index >= sections.length) return;

          isAnimating = true;
          currentIndex = index;

          // We animate the container's scroll position, which triggers HomeScene perfectly
          gsap.to(container, {
            scrollTo: { y: sections[currentIndex], autoKill: false },
            duration: 1.5, // THIS IS THE SPEED (1.2 seconds is beautifully slow)
            ease: "power2.inOut",
            onComplete: () => {
              // Add a tiny 50ms buffer before allowing the next scroll
              setTimeout(() => {
                isAnimating = false;
              }, 50);
            },
          });
        }

        // Guard: if a touch/pointer started inside a scrollable child, don't snap.
        // Also exempt touches inside any content-mobile slide or horizontal carousel
        // to prevent section-snapping from stealing touch events on content pages.
        function isInsideScrollableChild(self: any): boolean {
          const evt = self.event as TouchEvent | PointerEvent;
          const target = evt?.target as HTMLElement;
          if (!target) return false;

          // If inside a vertical scrollable container that actually overflows, exempt
          const scroller = target.closest(
            ".overflow-y-auto, .overflow-y-scroll",
          ) as HTMLElement;
          if (scroller && scroller.scrollHeight > scroller.clientHeight)
            return true;

          // If inside a horizontal snap carousel (MobileCarousel content area), exempt
          // This prevents GSAP from eating touch events on content slides even when
          // the content fits without scrolling
          const snapCarousel = target.closest(".snap-x") as HTMLElement;
          if (snapCarousel) return true;

          // If inside an overscroll-contain element (content-mobile wrapper), exempt
          const overscrollContained = target.closest(
            ".overscroll-contain",
          ) as HTMLElement;
          if (overscrollContained) return true;

          return false;
        }

        // 4. Intercept the user's mouse wheel / trackpad
        observer = ScrollTrigger.observe({
          target: container,
          type: "wheel,touch,pointer",
          wheelSpeed: -1,
          tolerance: 10,
          preventDefault: true, // Blocks the fast native browser scrolling
          onUp: (self) => {
            // Must be distinctly scrolling UP, not swiping left/right
            if (Math.abs(self.deltaX) > Math.abs(self.deltaY)) return;
            if (isInsideScrollableChild(self)) return;
            if (!isAnimating) gotoSection(currentIndex + 1);
          },
          onDown: (self) => {
            // Must be distinctly scrolling DOWN, not swiping left/right
            if (Math.abs(self.deltaX) > Math.abs(self.deltaY)) return;
            if (isInsideScrollableChild(self)) return;
            if (!isAnimating) gotoSection(currentIndex - 1);
          },
        });

        // 5. Intercept the keyboard keys
        keydownHandler = (e: KeyboardEvent) => {
          if (["ArrowDown", "PageDown", " "].includes(e.key)) {
            e.preventDefault();
            if (!isAnimating) gotoSection(currentIndex + 1);
          } else if (["ArrowUp", "PageUp"].includes(e.key)) {
            e.preventDefault();
            if (!isAnimating) gotoSection(currentIndex - 1);
          }
        };
        window.addEventListener("keydown", keydownHandler, { passive: false });

        // Refresh and realign on window resize
        ro = new ResizeObserver(() => {
          ScrollTrigger.refresh();
          gotoSection(currentIndex); // Snap back strictly to current section
        });
        ro.observe(container);
        // Subscribe to global mobile CTA events
        const unsubscribe = scrollTriggerTarget.subscribe((targetId) => {
          if (targetId && !isAnimating) {
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
              const targetIndex = sections.indexOf(targetSection);
              if (targetIndex !== -1 && targetIndex !== currentIndex) {
                // Instantly sync the store's desired location with GSAP's controlled linked-list
                gotoSection(targetIndex);
              }
            }
            // Clear the store after consumption so subsequent identical clicks work
            scrollTriggerTarget.set(null); 
          }
        });

        // Add unsubscribe to the observer cleanup later
        observer.unsubscribeStore = unsubscribe;
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
    if (observer) {
        observer.kill();
        if (observer.unsubscribeStore) observer.unsubscribeStore();
    }
    if (typeof window !== "undefined" && keydownHandler) {
      window.removeEventListener("keydown", keydownHandler);
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
  {#if browser}
    <Canvas>
      <HomeScene />
    </Canvas>
  {/if}
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

    /* VERY IMPORTANT: Keep overflow-y: auto so GSAP can scroll it! */
    overflow-y: auto;

    /* REMOVED scroll-snap-type and smooth behavior so they don't fight GSAP */
    position: relative;
    z-index: 10;

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
    /* REMOVED scroll-snap-align and stop. GSAP handles the locking entirely */
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
    opacity: 1;
    pointer-events: none;
    background: transparent;
  }

  .hero-bg-layer {
    position: absolute;
    inset: 0;
    z-index: 5;
    opacity: 0.4;
    pointer-events: none;
  }
</style>
