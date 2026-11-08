<!-- src/lib/components/Navigation.svelte -->
<script lang="ts">
  import {
    Home,
    User,
    BookOpen,
    Code,
    FileText,
    ChevronDown,
  } from "lucide-svelte";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import ThemeToggle from "$lib/components/ThemeToggle.svelte";

  let hoveredItem = $state<string | null>(null);

  // Auto-hide & hover-reveal state
  let isHoveredDock = $state(false);
  let isTopZoneHovered = $state(false);
  let isFocusedWithin = $state(false);
  let isPinnedMobile = $state(false);
  let isInitialBrief = $state(true);

  let hideTimer: ReturnType<typeof setTimeout>;
  let initialTimer: ReturnType<typeof setTimeout>;

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "About", href: "/about", icon: User },
    { label: "Learn", href: "/learn", icon: BookOpen },
    { label: "Projects", href: "/projects", icon: Code },
    { label: "Articles", href: "/articles", icon: FileText },
  ];

  // Determine which item is active based on current path
  let activePath = $derived($page.url.pathname);
  let activeIndex = $derived(() => {
    const idx = navItems.findIndex((n) =>
      n.href === "/" ? activePath === "/" : activePath.startsWith(n.href),
    );
    return idx !== -1 ? idx : 0;
  });

  let activeLabel = $derived(navItems[activeIndex()]?.label ?? "Home");

  let hoveredIndex = $derived(
    hoveredItem ? navItems.findIndex((n) => n.href === hoveredItem) : -1,
  );
  let displayIndex = $derived(
    hoveredIndex !== -1 ? hoveredIndex : activeIndex(),
  );

  let isVisible = $derived(
    isHoveredDock ||
      isTopZoneHovered ||
      isFocusedWithin ||
      isPinnedMobile ||
      isInitialBrief,
  );

  function revealNav() {
    clearTimeout(hideTimer);
    isTopZoneHovered = true;
  }

  function scheduleHide() {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      if (!isHoveredDock && !isFocusedWithin) {
        isTopZoneHovered = false;
        isPinnedMobile = false;
      }
    }, 420);
  }

  function handleMouseMove(e: MouseEvent) {
    if (e.clientY <= 36) {
      revealNav();
    } else if (e.clientY > 96 && isTopZoneHovered && !isHoveredDock) {
      scheduleHide();
    }
  }

  onMount(() => {
    // Show briefly on initial page arrival, then smoothly stow away
    initialTimer = setTimeout(() => {
      isInitialBrief = false;
    }, 1800);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(hideTimer);
      clearTimeout(initialTimer);
    };
  });
</script>

<!-- TOP HOVER REGION & RETRACTED PULL-TAB -->
<div
  class="fixed top-0 left-0 right-0 h-8 z-50 flex justify-center items-start pointer-events-auto"
  onmouseenter={revealNav}
  onmouseleave={scheduleHide}
  role="presentation"
>
  <button
    type="button"
    onclick={() => (isPinnedMobile = !isPinnedMobile)}
    aria-label="Toggle navigation bar"
    aria-expanded={isVisible}
    class="group relative flex items-center gap-2 px-3.5 py-1 rounded-b-xl bg-card/90 backdrop-blur-xl border-x border-b border-border/80 shadow-2xs transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer
           {isVisible
      ? '-translate-y-full opacity-0 pointer-events-none'
      : 'translate-y-0 opacity-95 hover:opacity-100 hover:border-primary/50'}"
  >
    <span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
    <span
      class="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground group-hover:text-foreground transition-colors"
    >
      {activeLabel}
    </span>
    <ChevronDown
      size={12}
      class="text-primary transition-transform duration-300 group-hover:translate-y-0.5"
    />
  </button>
</div>

<!-- AUTO-HIDING FLOATING PREMIUM BLUEPRINT DOCK -->
<div
  class="fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-top top-2.5 sm:top-4 w-[calc(100%-1.5rem)] max-w-[440px] sm:w-max sm:max-w-none
         {isVisible
    ? 'translate-y-0 opacity-100 scale-100 pointer-events-auto'
    : '-translate-y-[140%] opacity-0 scale-95 pointer-events-none'}"
  onmouseenter={() => {
    clearTimeout(hideTimer);
    isHoveredDock = true;
  }}
  onmouseleave={() => {
    isHoveredDock = false;
    scheduleHide();
  }}
  onfocusin={() => (isFocusedWithin = true)}
  onfocusout={() => {
    isFocusedWithin = false;
    scheduleHide();
  }}
  role="navigation"
  aria-label="Primary Navigation"
>
  <!-- Main Chassis -->
  <div
    class="card-glass relative flex items-center justify-between sm:justify-center !rounded-2xl shadow-[var(--shadow-lg)] border border-border/85 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] backdrop-blur-xl bg-card/90 p-1.5 sm:p-2"
  >
    <!-- Top Specular Line -->
    <div
      class="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent"
    ></div>

    <!-- LEFT: Personal Brand / Avatar -->
    <a
      href="/"
      onclick={() => (isPinnedMobile = false)}
      class="relative z-10 flex items-center gap-2.5 py-0.5 pl-1 sm:pl-1.5 pr-2 sm:pr-3.5 mr-1 sm:mr-0 group shrink-0 active:scale-95 overflow-hidden transition-all duration-300 no-underline"
      aria-label="Go to home"
    >
      <div
        class="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden border border-border group-hover:border-primary transition-all duration-300 shadow-xs shrink-0"
      >
        <img
          src="https://github.com/sudo-krish.png"
          alt="Krishnanand Anil - Senior Data Engineer Profile Avatar"
          class="relative z-10 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          fetchpriority="high"
          width="36"
          height="36"
        />
        <div
          class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[hsl(var(--success))] rounded-full border border-[hsl(var(--background))] z-20"
        ></div>
      </div>

      <div class="flex-col items-start hidden sm:flex shrink-0">
        <span
          class="font-mono text-[12px] font-bold tracking-tight text-foreground transition-colors group-hover:text-primary whitespace-nowrap"
        >
          sudo_krish
        </span>
      </div>
    </a>

    <!-- CENTER: Navigation Track -->
    <nav
      class="relative z-10 flex items-center p-1 rounded-xl bg-muted/60 border border-border/70 mx-auto sm:mx-0"
      onmouseleave={() => (hoveredItem = null)}
    >
      <!-- Sliding Pill -->
      <div
        class="absolute top-1 bottom-1 rounded-lg bg-primary/15 border border-primary/40 shadow-2xs transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none w-10 sm:w-[84px]"
        style="transform: translateX(calc({displayIndex} * 100%));"
      >
        <div
          class="absolute inset-x-2 top-0 h-px bg-[hsl(var(--glass-highlight))] opacity-60"
        ></div>
      </div>

      {#each navItems as { label, href, icon: Icon }}
        {@const isActive =
          href === "/" ? activePath === "/" : activePath.startsWith(href)}
        <a
          {href}
          onclick={() => (isPinnedMobile = false)}
          class="relative z-10 h-9 w-10 sm:w-[84px] gap-1.5 flex items-center justify-center transition-colors duration-300 group rounded-lg active:scale-95 no-underline"
          onmouseenter={() => (hoveredItem = href)}
          aria-label="Go to {label}"
          aria-current={isActive ? "page" : undefined}
        >
          <Icon
            size={15}
            strokeWidth={isActive ? 2.4 : 2}
            class="transition-colors duration-300 shrink-0 {isActive
              ? 'text-primary'
              : 'text-muted-foreground group-hover:text-foreground'}"
          />
          <span
            class="font-sans text-[11.5px] tracking-tight transition-colors duration-300 overflow-hidden whitespace-nowrap hidden sm:block
                   {isActive
              ? 'text-foreground font-bold'
              : 'text-muted-foreground font-medium group-hover:text-foreground'}"
          >
            {label}
          </span>
        </a>
      {/each}
    </nav>

    <!-- RIGHT: Theme Toggle -->
    <div
      class="relative z-10 flex items-center shrink-0 pl-1 sm:pl-2.5 pr-0.5 sm:pr-1 ml-1 sm:ml-0"
    >
      <div
        class="p-1 rounded-xl bg-muted/55 border border-border/75 hover:border-primary/45 hover:bg-primary/10 transition-colors active:scale-95 cursor-pointer shrink-0"
      >
        <ThemeToggle />
      </div>
    </div>
  </div>
</div>
