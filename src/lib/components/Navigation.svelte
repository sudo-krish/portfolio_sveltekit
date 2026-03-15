<!-- src/lib/components/Navigation.svelte -->
<script lang="ts">
  import { Briefcase, Mail, Home } from "lucide-svelte";
  import { onMount, onDestroy } from "svelte";
  import ThemeToggle from "$lib/components/ThemeToggle.svelte";

  let activeSection = $state("hero");
  let hoveredSection = $state<string | null>(null);

  // Dock interaction states
  let isHoveredDock = $state(false);
  let isIdle = $state(false);
  let idleTimer: ReturnType<typeof setTimeout>;

  const IDLE_TIMEOUT = 2000; // 2 seconds of no scrolling shrinks the dock

  const navItems = [
    { label: "Home", id: "hero", icon: Home },
    { label: "Metrics", id: "metrics", icon: Briefcase },
    { label: "Contact", id: "contact", icon: Mail },
  ];

  let targetSection = $derived(hoveredSection || activeSection);
  let activeIndex = $derived(navItems.findIndex((n) => n.id === targetSection));
  let safeIndex = $derived(activeIndex !== -1 ? activeIndex : 0);

  // The dock shrinks if the user is idle (not scrolling) AND not hovering over the dock.
  let isShrunk = $derived(isIdle && !isHoveredDock);

  const resetIdleTimer = () => {
    isIdle = false; // Wake up immediately on scroll
    clearTimeout(idleTimer);

    // Start countdown to sleep, UNLESS we are currently hovering over the dock
    if (!isHoveredDock) {
      idleTimer = setTimeout(() => {
        isIdle = true;
      }, IDLE_TIMEOUT);
    }
  };

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
        const y = section.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
    resetIdleTimer();
  };

  onMount(() => {
    // ONLY listen to scroll events to wake up the dock globally.
    // Removed mousemove/touchstart so it ignores random screen interactions.
    window.addEventListener("scroll", resetIdleTimer, { passive: true });

    // Start initial timer so it hides after page load if no action happens
    resetIdleTimer();

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) activeSection = visible.target.id;
      },
      { threshold: 0.5, rootMargin: "-100px 0px -40% 0px" },
    );

    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", resetIdleTimer);
      clearTimeout(idleTimer);
    };
  });

  // Keep dock awake indefinitely while hovering over it.
  // When hover ends, start the sleep timer.
  $effect(() => {
    if (isHoveredDock) {
      isIdle = false;
      clearTimeout(idleTimer);
    } else {
      resetIdleTimer();
    }
  });
</script>

<!-- FLOATING PREMIUM DOCK -->
<!-- Hover area is expanded slightly using padding to make it easier to "catch" with the mouse -->
<div
  class="fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] origin-top pb-4 pt-2
         {isShrunk
    ? 'top-2 sm:top-3 scale-75 sm:scale-90 opacity-40 hover:opacity-100'
    : 'top-4 sm:top-6 scale-100 opacity-100 w-[94%] sm:w-max max-w-[480px] sm:max-w-none'}"
  onmouseenter={() => (isHoveredDock = true)}
  onmouseleave={() => (isHoveredDock = false)}
  role="navigation"
>
  <!-- Main Chassis -->
  <div
    class="card-glass relative flex items-center justify-between sm:justify-center !rounded-full shadow-[var(--shadow-xl)] transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]
           {isShrunk ? 'p-1 px-3' : 'p-1.5 sm:p-2'}"
  >
    <!-- LEFT: Personal Brand / Avatar -->
    <button
      class="relative z-10 flex items-center gap-3 py-1 group shrink-0 active:scale-95 overflow-hidden transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]
             {isShrunk
        ? 'max-w-0 opacity-0 pl-0 pr-0 ml-0 mr-0 border-0'
        : 'max-w-[150px] opacity-100 pl-1 sm:pl-1.5 pr-2 sm:pr-4 ml-0 mr-2 sm:mr-0'}"
      onclick={() => scrollToSection("hero")}
      aria-label="Go to top"
    >
      <div
        class="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-[hsl(var(--border))] group-hover:border-[hsl(var(--primary))] transition-colors duration-500 shadow-sm shrink-0"
      >
        <div
          class="absolute inset-0 bg-[hsl(var(--primary)/0.2)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
        ></div>
        <img
          src="https://github.com/sudo-krish.png"
          alt="sudo_krish avatar"
          class="relative z-10 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div
          class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[hsl(var(--success))] rounded-full border-2 border-[hsl(var(--background))] z-20 shadow-[0_0_8px_hsl(var(--success)/0.8)]"
        ></div>
      </div>

      <div class="flex-col items-start hidden sm:flex shrink-0">
        <span
          class="font-mono text-[13px] font-bold tracking-tight text-[hsl(var(--foreground))] transition-colors group-hover:text-[hsl(var(--primary))] whitespace-nowrap"
        >
          sudo_krish
        </span>
      </div>
    </button>

    <!-- CENTER: The Recessed Navigation Track -->
    <nav
      class="relative z-10 flex items-center p-1 rounded-full transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]
             {isShrunk
        ? 'mx-0 bg-transparent shadow-none border-transparent'
        : 'bg-[hsl(var(--muted))] shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] border border-[hsl(var(--border)/0.5)] mx-auto sm:mx-0'}"
      onmouseleave={() => (hoveredSection = null)}
    >
      <!-- The Magic Sliding Pill -->
      <div
        class="absolute top-1 bottom-1 rounded-full bg-[hsl(var(--card))] border border-[hsl(var(--border))] shadow-[var(--shadow-sm)] transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.1)] pointer-events-none
               {isShrunk
          ? 'opacity-0 scale-75 w-10'
          : 'opacity-100 scale-100 w-11 sm:w-[92px]'}"
        style="transform: translateX(calc({safeIndex} * 100%));"
      >
        <div
          class="absolute inset-x-2 top-0 h-px bg-[hsl(var(--glass-highlight))] opacity-50"
        ></div>
      </div>

      {#each navItems as { label, id, icon: Icon }}
        <button
          class="relative z-10 h-8 sm:h-9 flex items-center justify-center transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group rounded-full active:scale-95
                 {isShrunk ? 'w-9 gap-0' : 'w-11 sm:w-[92px] gap-2'}"
          onclick={() => scrollToSection(id)}
          onmouseenter={() => (hoveredSection = id)}
          aria-label="Go to {label}"
        >
          <Icon
            size={isShrunk ? 18 : 16}
            strokeWidth={targetSection === id && !isShrunk ? 2.5 : 2}
            class="transition-all duration-500 shrink-0 {targetSection === id
              ? 'text-[hsl(var(--primary))] drop-shadow-[0_0_8px_hsl(var(--primary)/0.6)] scale-105'
              : 'text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--foreground))]/80'}"
          />
          <span
            class="font-sans text-[12px] tracking-wide transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden whitespace-nowrap block
                   {isShrunk
              ? 'max-w-0 opacity-0'
              : 'max-w-[100px] opacity-100 hidden sm:block'}
                   {targetSection === id
              ? 'text-[hsl(var(--foreground))] font-bold'
              : 'text-[hsl(var(--muted-foreground))] font-semibold group-hover:text-[hsl(var(--foreground))]/80'}"
          >
            {label}
          </span>
        </button>
      {/each}
    </nav>

    <!-- RIGHT: Theme Toggle -->
    <div
      class="relative z-10 flex items-center shrink-0 overflow-hidden transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]
             {isShrunk
        ? 'max-w-0 opacity-0 pl-0 pr-0 ml-0 border-0'
        : 'max-w-[100px] opacity-100 pl-1 sm:pl-3 pr-1 sm:pr-1.5 ml-2 sm:ml-0'}"
    >
      <div
        class="p-1 rounded-full bg-[hsl(var(--muted))] border border-[hsl(var(--border)/0.5)] hover:border-[hsl(var(--border))] transition-colors shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] active:scale-95 cursor-pointer shrink-0"
      >
        <ThemeToggle />
      </div>
    </div>
  </div>
</div>
