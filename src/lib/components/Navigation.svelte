<!-- src/lib/components/Navigation.svelte -->
<script lang="ts">
  import { Briefcase, Code, Mail, Home } from "lucide-svelte";
  import { onMount } from "svelte";
  import ThemeToggle from "$lib/components/ThemeToggle.svelte";

  // Svelte 5 Runes for highly optimized reactivity
  let activeSection = $state("hero");
  let isScrolled = $state(false);

  const navItems = [
    { label: "Home", id: "hero", icon: Home },
    { label: "Metrics", id: "metrics", icon: Briefcase },
    { label: "Contact", id: "contact", icon: Mail },
  ];

  const scrollToSection = (sectionId: string) => {
    activeSection = sectionId;

    if (sectionId === "hero") {
      document
        .querySelector(".snap-container")
        ?.scrollTo({ top: 0, behavior: "smooth" });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        // Offset perfectly accounts for the floating heavy-glass navbar
        const y = section.getBoundingClientRect().top + window.scrollY - 120;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  onMount(() => {
    const handleScroll = () => {
      // Add a slight scroll threshold to trigger the "docked" physical state
      isScrolled = window.scrollY > 60;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.reduce((prev, current) => {
          return prev.intersectionRatio > current.intersectionRatio
            ? prev
            : current;
        });

        if (visibleEntry.isIntersecting) {
          activeSection = visibleEntry.target.id;
        }
      },
      {
        threshold: [0.2, 0.5, 0.8],
        rootMargin: "-120px 0px -40% 0px",
      },
    );

    const sections = ["hero", "metrics", "contact"].map((id) =>
      document.getElementById(id),
    );
    sections.forEach((s) => s && observer.observe(s));

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  });
</script>

<!-- TOP DOCKED VOLUMETRIC COMMAND PALETTE -->
<div
  class="fixed left-1/2 -translate-x-1/2 z-50 pointer-events-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] w-[95%] sm:w-max max-w-3xl {isScrolled
    ? 'top-3 scale-95'
    : 'top-6 scale-100'}"
>
  <!-- 
    The Volumetric Glass Container 
    Notice the layered shadows: one for ambient glow, one for physical depth, one for inner light reflection.
  -->
  <div
    class="volumetric-glass flex items-center gap-2 sm:gap-4 p-1.5 sm:p-2 rounded-full w-full justify-between sm:justify-center"
  >
    <!-- Logo / Brand Lens -->
    <button
      class="flex items-center gap-3 pl-2 pr-4 sm:pr-6 hover:text-primary transition-colors group shrink-0 h-full relative"
      onclick={() => scrollToSection("hero")}
      aria-label="Go to top"
    >
      <!-- Glowing core inside the logo -->
      <div
        class="relative w-9 h-9 rounded-full flex items-center justify-center overflow-hidden"
      >
        <div
          class="absolute inset-0 bg-primary/20 group-hover:bg-primary/40 transition-colors duration-500"
        ></div>
        <div
          class="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"
        ></div>
        <!-- Inner glass reflection -->
        <div
          class="absolute top-0 left-1/4 right-1/4 h-[1px] bg-white/50"
        ></div>
        <span
          class="font-mono text-sm font-extrabold text-primary drop-shadow-[0_0_8px_var(--color-primary)] z-10"
          >_</span
        >
      </div>
      <span
        class="font-mono text-sm font-bold tracking-wider text-foreground hidden sm:block"
        >sudo<span class="text-primary opacity-80">_</span>krish</span
      >
    </button>

    <!-- Refractive Separator -->
    <div
      class="w-[1px] h-8 bg-gradient-to-b from-transparent via-border to-transparent opacity-50 hidden sm:block"
    ></div>

    <!-- Nav Links (Dynamic Svelte 5 Syntax) -->
    <nav
      class="flex items-center gap-1 sm:gap-2 px-1 flex-grow justify-center relative"
    >
      <!-- 
        Notice the uppercase aliasing (icon: Icon) here. 
        This elegantly solves the <svelte:component> deprecation.
      -->
      {#each navItems as { label, id, icon: Icon }}
        <button
          class="relative px-3 py-2 sm:px-6 sm:py-2.5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] flex items-center gap-2.5 group overflow-hidden {activeSection ===
          id
            ? 'text-primary scale-100'
            : 'text-muted-foreground hover:text-foreground hover:scale-105'}"
          onclick={() => scrollToSection(id)}
          aria-label="Go to {label}"
        >
          <!-- Active State: A Carved-Out Light Chamber -->
          {#if activeSection === id}
            <!-- Chamber background -->
            <div
              class="absolute inset-0 bg-primary/15 dark:bg-primary/25 rounded-full shadow-[inset_0_2px_8px_rgba(0,0,0,0.2)]"
            ></div>
            <!-- Top edge rim light -->
            <div
              class="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/60 to-transparent"
            ></div>
            <!-- Bottom edge glow bounce -->
            <div
              class="absolute bottom-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent blur-[1px]"
            ></div>
          {/if}

          <!-- Hover ambient backlight -->
          <div
            class="absolute inset-0 bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full {activeSection ===
            id
              ? 'hidden'
              : ''}"
          ></div>

          <!-- Component Rendering (Svelte 5 Native) -->
          <div class="relative z-10 flex items-center gap-2.5">
            <Icon
              size={18}
              class="transition-all duration-500 {activeSection === id
                ? 'drop-shadow-[0_0_10px_hsl(var(--primary)/0.6)] stroke-[2.5px]'
                : 'group-hover:-translate-y-0.5 stroke-2'}"
            />
            <span
              class="text-sm font-semibold tracking-wide hidden sm:block {activeSection ===
              id
                ? 'drop-shadow-[0_0_8px_hsl(var(--primary)/0.4)]'
                : ''}">{label}</span
            >
          </div>
        </button>
      {/each}
    </nav>

    <!-- Refractive Separator -->
    <div
      class="w-[1px] h-8 bg-gradient-to-b from-transparent via-border to-transparent opacity-50 hidden sm:block"
    ></div>

    <!-- Right Side Tools -->
    <div
      class="flex items-center pr-1 sm:pr-2 pl-2 sm:pl-4 shrink-0 h-full relative"
    >
      <!-- Glow behind the theme toggle area to unify it with the bar -->
      <div
        class="absolute inset-0 bg-gradient-to-r from-transparent to-primary/5 dark:to-accent/5 rounded-full pointer-events-none"
      ></div>
      <ThemeToggle />
    </div>
  </div>
</div>

<style>
  /* 
    The Masterpiece: Volumetric Glass 
    We layer backdrop filters, precise border coloring, and multi-tier shadows to create a physical object, not just a flat CSS element.
  */
  .volumetric-glass {
    background: linear-gradient(
      135deg,
      hsl(var(--glass-bg)),
      hsl(var(--glass-bg) / 0.8)
    );
    backdrop-filter: blur(var(--glass-blur)) saturate(180%);
    -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(180%);

    /* The physical thickness is simulated by an ultra-thin translucent border */
    border: 1px solid hsl(var(--glass-border) / 0.8);
    border-top-color: hsl(var(--glass-highlight));
    border-bottom-color: transparent; /* Light hits top, shadow at bottom */

    box-shadow: 
      /* Inner rim light */
      inset 0 1px 0 0 hsl(var(--glass-highlight)),
      /* Outer ambient glow based on primary theme color */ 0 0 40px -10px hsl(var(
              --primary
            ) / 0.15),
      /* Deep structural shadow pulling it off the page */ 0 20px 40px -15px rgba(0, 0, 0, 0.5);
  }

  /* Light mode adjustments to ensure shadows aren't too heavy but still volumetric */
  :global(.light) .volumetric-glass {
    box-shadow:
      inset 0 1px 0 0 hsl(var(--glass-highlight)),
      0 0 30px -10px hsl(var(--primary) / 0.1),
      0 15px 30px -10px rgba(0, 0, 0, 0.1);
  }
</style>
