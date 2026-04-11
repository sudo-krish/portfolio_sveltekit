<script lang="ts">
  import { browser } from "$app/environment";
  import { onMount, onDestroy, tick } from "svelte";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
  import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";

  // 3D Canvas dynamically imported to prevent main thread blocking
  let DeferredScene: any = null;

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

        // Fire asynchronous deferred scene load after GSAP is ready
        setTimeout(async () => {
          try {
            const module = await import(
              "$lib/components/home/3d/LazySceneWrapper.svelte"
            );
            DeferredScene = module.default;
          } catch (e) {
            console.error("Failed to lazy load the 3D canvas context:", e);
          }
        }, 300);
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
          const evt = self.event as TouchEvent | PointerEvent | WheelEvent;
          const target = evt?.target as HTMLElement;
          if (!target) return false;

          // Ignore GSAP observer for TOUCH/PEN events inside a carousel (carousel manages its own touch section nav).
          // We allow physical mouse wheels to pass through so the user can still wheel-scroll to the next section.
          const isTouch = evt.type?.startsWith("touch") || (evt as PointerEvent).pointerType === "touch" || (evt as PointerEvent).pointerType === "pen";
          if (isTouch && target.closest("[data-carousel-touch-zone]")) return true;

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

        // 5. MOBILE: Touch handling for section snapping.
        // MobileCarousel areas handle their own touch logic and signal
        // section changes via scrollDirection store. We skip them here.
        let touchStartY = 0;
        let touchStartX = 0;
        let touchAxis: "none" | "h" | "v" = "none";
        let insideCarousel = false;

        function onTouchStart(e: TouchEvent) {
          const target = e.target as HTMLElement;
          insideCarousel = !!target.closest("[data-carousel-touch-zone]");
          if (insideCarousel) return;

          touchStartY = e.touches[0].clientY;
          touchStartX = e.touches[0].clientX;
          touchAxis = "none";
        }

        function onTouchMove(e: TouchEvent) {
          if (insideCarousel) return;

          const cy = e.touches[0].clientY;
          const cx = e.touches[0].clientX;

          if (touchAxis === "none") {
            const ax = Math.abs(cx - touchStartX);
            const ay = Math.abs(cy - touchStartY);
            if (ax + ay >= 10) {
              touchAxis = ax > ay ? "h" : "v";
            }
          }

          // Only handle vertical swipes for section snapping
          if (touchAxis === "v") {
            if (e.cancelable) e.preventDefault();
          }
        }

        function onTouchEnd(e: TouchEvent) {
          if (insideCarousel) { insideCarousel = false; return; }
          if (touchAxis !== "v" || isAnimating) { touchAxis = "none"; return; }

          const endY = e.changedTouches[0].clientY;
          const delta = touchStartY - endY; // +ve = swiped up
          const TOLERANCE = 40;

          if (Math.abs(delta) >= TOLERANCE) {
            if (delta > 0) gotoSection(currentIndex + 1);
            else gotoSection(currentIndex - 1);
          }

          touchAxis = "none";
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

<!-- BACKGROUND CANVAS (Lazy Hydrated) -->
<div class="fixed-canvas">
  {#if browser && DeferredScene}
    <svelte:component this={DeferredScene} />
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

  <!-- 🔗 CRAWLABLE INTERNAL LINKS — Visible to search engines and LLM crawlers -->
  <nav
    aria-label="Site Navigation"
    class="w-full py-8 px-6 text-center text-xs text-muted-foreground/50 border-t border-border/20"
  >
    <p class="mb-3 font-medium text-muted-foreground/60">
      Explore Krishnanand Anil's Data Engineering Portfolio
    </p>
    <div class="flex flex-wrap justify-center gap-x-4 gap-y-2">
      <a href="/experience" class="hover:text-foreground transition-colors"
        >Data Engineering Experience</a
      >
      <a href="/about" class="hover:text-foreground transition-colors"
        >About Krishnanand Anil</a
      >
      <a href="/credentials" class="hover:text-foreground transition-colors"
        >AWS Certifications & Credentials</a
      >
      <a href="/projects" class="hover:text-foreground transition-colors"
        >Data Engineering Projects</a
      >
      <a href="/articles" class="hover:text-foreground transition-colors"
        >Technical Articles & Research</a
      >
      <a href="/learning-path" class="hover:text-foreground transition-colors"
        >Learning Path</a
      >
    </div>
    <div class="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-2">
      <a
        href="https://www.linkedin.com/in/krishnanand-anil/"
        rel="noopener noreferrer"
        target="_blank"
        class="hover:text-foreground transition-colors">LinkedIn Profile</a
      >
      <a
        href="https://github.com/sudo-krish"
        rel="noopener noreferrer"
        target="_blank"
        class="hover:text-foreground transition-colors">GitHub Projects</a
      >
    </div>
  </nav>
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
