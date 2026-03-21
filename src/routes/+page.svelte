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
  import {
    scrollTriggerTarget,
    scrollDirection,
  } from "$lib/stores/scroll-store";
  import { siteDefaults } from "$lib/data/site";

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

        // Guard: desktop wheel/pointer inside scrollable content should not snap
        function isInsideScrollableChild(self: any): boolean {
          const evt = self.event as TouchEvent | PointerEvent;
          const target = evt?.target as HTMLElement;
          if (!target) return false;
          const scroller = target.closest(
            ".overflow-y-auto, .overflow-y-scroll",
          ) as HTMLElement;
          return !!(scroller && scroller.scrollHeight > scroller.clientHeight);
        }

        // 4. DESKTOP: GSAP observer for wheel & pointer (no touch)
        observer = ScrollTrigger.observe({
          target: container,
          type: "wheel,pointer",
          wheelSpeed: -1,
          tolerance: 10,
          preventDefault: true,
          onUp: (self) => {
            if (Math.abs(self.deltaX) > Math.abs(self.deltaY)) return;
            if (isInsideScrollableChild(self)) return;
            if (!isAnimating) gotoSection(currentIndex + 1);
          },
          onDown: (self) => {
            if (Math.abs(self.deltaX) > Math.abs(self.deltaY)) return;
            if (isInsideScrollableChild(self)) return;
            if (!isAnimating) gotoSection(currentIndex - 1);
          },
        });

        // 5. MOBILE: Custom touch handling with boundary-aware snapping
        //
        // Rules:
        //  - Horizontal gestures → pass through (carousel CSS snap)
        //  - Vertical in non-scrollable area → block native scroll, snap section
        //  - Vertical in scrollable area → native scroll until boundary,
        //    then block overscroll and snap on touchend
        let touchStartY = 0;
        let touchStartX = 0;
        let lastTouchY = 0;
        let touchAxis: "none" | "h" | "v" = "none";
        let touchScroller: HTMLElement | null = null;
        let hitBoundary = false;
        let boundaryY = 0;

        function onTouchStart(e: TouchEvent) {
          touchStartY = e.touches[0].clientY;
          touchStartX = e.touches[0].clientX;
          lastTouchY = touchStartY;
          touchAxis = "none";
          hitBoundary = false;
          boundaryY = 0;

          const target = e.target as HTMLElement;
          const el = target.closest(
            ".overflow-y-auto, .overflow-y-scroll, .hide-scroll",
          ) as HTMLElement | null;

          // STRICT CHECK: Ensure it actually HAS scrollable content
          if (el && el.scrollHeight > el.clientHeight) {
            touchScroller = el;
          } else {
            touchScroller = null;
          }
        }

        function onTouchMove(e: TouchEvent) {
          const cy = e.touches[0].clientY;
          const cx = e.touches[0].clientX;

          // Lock axis on first significant movement
          if (touchAxis === "none") {
            const ax = Math.abs(cx - touchStartX);
            const ay = Math.abs(cy - touchStartY);
            if (ax + ay >= 10) {
              touchAxis = ax > ay ? "h" : "v";
            }
          }

          if (touchAxis !== "v") {
            lastTouchY = cy;
            return; // horizontal → carousel handles it
          }

          const incDelta = lastTouchY - cy; // +ve = finger moving up
          lastTouchY = cy;

          if (!touchScroller) {
            // Non-scrollable (3D model, etc.) → block scroll entirely
            if (e.cancelable) e.preventDefault();
            return;
          }

          // Scrollable content: check boundaries
          const atTop = touchScroller.scrollTop <= 0;
          // Use Math.ceil to prevent sub-pixel rounding errors on mobile
          const atBottom =
            Math.ceil(touchScroller.scrollTop + touchScroller.clientHeight) >=
            touchScroller.scrollHeight;

          // Block overscroll past boundary
          if ((atBottom && incDelta > 0) || (atTop && incDelta < 0)) {
            if (!hitBoundary) {
              hitBoundary = true;
              boundaryY = cy;
            }
            // Stop the native scroll here so it doesn't rubber-band the whole page
            if (e.cancelable) e.preventDefault();
          } else {
            // **LET IT SCROLL!** Reset hit boundary because they are scrolling freely inside the content
            hitBoundary = false;
            // IMPORTANT: e.stopPropagation() ensures GSAP doesn't try to steal the event
            e.stopPropagation();
          }
        }

        function onTouchEnd(e: TouchEvent) {
          if (touchAxis !== "v" || isAnimating) {
            touchAxis = "none";
            return;
          }

          const endY = e.changedTouches[0].clientY;
          const overallDelta = touchStartY - endY; // +ve = swiped up
          const TOLERANCE = 40; // Increased tolerance slightly so mobile doesn't snap accidentally prev 20

          if (!touchScroller) {
            // Non-scrollable: any vertical swipe beyond tolerance → snap
            if (Math.abs(overallDelta) >= TOLERANCE) {
              if (overallDelta > 0) gotoSection(currentIndex + 1);
              else gotoSection(currentIndex - 1);
            }
          } else if (hitBoundary) {
            // Scrollable content at boundary: check past-boundary movement
            const pastDelta = boundaryY - endY;
            if (Math.abs(pastDelta) >= TOLERANCE) {
              if (pastDelta > 0) gotoSection(currentIndex + 1);
              else gotoSection(currentIndex - 1);
            }
          }

          touchAxis = "none";
          hitBoundary = false;
        }

        container.addEventListener("touchstart", onTouchStart, {
          passive: true,
        });
        container.addEventListener("touchmove", onTouchMove, {
          passive: false,
        });
        container.addEventListener("touchend", onTouchEnd);

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
        const unsubscribeTarget = scrollTriggerTarget.subscribe((targetId) => {
          if (targetId && !isAnimating) {
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
              const targetIndex = sections.indexOf(targetSection);
              if (targetIndex !== -1 && targetIndex !== currentIndex) {
                gotoSection(targetIndex);
              }
            }
            scrollTriggerTarget.set(null);
          }
        });

        // Subscribe to relative up/down navigation (e.g., from mobilecarousel arrows)
        const unsubscribeDir = scrollDirection.subscribe((dir) => {
          if (dir !== 0 && !isAnimating) {
            // Determine new index and clamp to boundaries
            const newIndex = Math.max(
              0,
              Math.min(currentIndex + dir, sections.length - 1),
            );
            if (newIndex !== currentIndex) {
              gotoSection(newIndex);
            }
            scrollDirection.set(0); // Consumption
          }
        });

        // Add unsubscribes to the observer cleanup later
        observer.unsubscribeTarget = unsubscribeTarget;
        observer.unsubscribeDir = unsubscribeDir;
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
      if (observer.unsubscribeTarget) observer.unsubscribeTarget();
      if (observer.unsubscribeDir) observer.unsubscribeDir();
    }
    if (typeof window !== "undefined" && keydownHandler) {
      window.removeEventListener("keydown", keydownHandler);
    }
    ScrollTrigger.defaults({ scroller: window });
    ScrollTrigger.getAll().forEach((t) => t.kill());
  });
</script>



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
  
  <!-- 🤖 UNIFIED CRAWLER H1 (Screen-Reader / Bot Only) -->
  <!-- Resolves duplicate semantic splits and literal '_' renders by providing one absolutely pristine string -->
  <h1 class="sr-only">
    {siteDefaults.srOnlyHomePageH1}
  </h1>

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
