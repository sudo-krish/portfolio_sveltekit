<!-- src/lib/components/Navigation.svelte -->
<script lang="ts">
  import { Home, User, BookOpen, Code, FileText } from "lucide-svelte";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import ThemeToggle from "$lib/components/ThemeToggle.svelte";

  let hoveredItem = $state<string | null>(null);

  // Dock interaction states
  let isHoveredDock = $state(false);
  let isIdle = $state(false);
  let idleTimer: ReturnType<typeof setTimeout>;

  const IDLE_TIMEOUT = 8000;

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
    // Exact match for home, prefix match for others
    const idx = navItems.findIndex((n) =>
      n.href === "/" ? activePath === "/" : activePath.startsWith(n.href),
    );
    return idx !== -1 ? idx : 0;
  });

  let hoveredIndex = $derived(
    hoveredItem ? navItems.findIndex((n) => n.href === hoveredItem) : -1,
  );
  let displayIndex = $derived(
    hoveredIndex !== -1 ? hoveredIndex : activeIndex(),
  );

  let isShrunk = $derived(isIdle && !isHoveredDock);

  const resetIdleTimer = () => {
    isIdle = false;
    clearTimeout(idleTimer);
    if (!isHoveredDock) {
      idleTimer = setTimeout(() => {
        isIdle = true;
      }, IDLE_TIMEOUT);
    }
  };

  onMount(() => {
    window.addEventListener("scroll", resetIdleTimer, { passive: true });
    resetIdleTimer();

    return () => {
      window.removeEventListener("scroll", resetIdleTimer);
      clearTimeout(idleTimer);
    };
  });

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
<div
  class="fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] origin-top top-3 sm:top-5 w-[calc(100%-1.5rem)] max-w-[440px] sm:w-max sm:max-w-none
         {isShrunk
    ? 'opacity-85 hover:opacity-100'
    : 'opacity-100'}"
  onmouseenter={() => (isHoveredDock = true)}
  onmouseleave={() => (isHoveredDock = false)}
  role="navigation"
  aria-label="Primary Navigation"
>
  <!-- Main Chassis -->
  <div
    class="card-glass relative flex items-center justify-between sm:justify-center !rounded-full shadow-[0_8px_32px_-4px_rgba(0,0,0,0.24)] border border-[hsl(var(--border)/0.45)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] backdrop-blur-xl bg-[hsl(var(--background)/0.65)] p-1.5 sm:p-2"
  >
    <!-- LEFT: Personal Brand / Avatar -->
    <a
      href="/"
      class="relative z-10 flex items-center gap-2.5 py-0.5 pl-1 sm:pl-1.5 pr-2 sm:pr-3.5 mr-1 sm:mr-0 group shrink-0 active:scale-95 overflow-hidden transition-all duration-300 no-underline"
      aria-label="Go to home"
    >
      <div
        class="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-[hsl(var(--border))] group-hover:border-[hsl(var(--primary))] transition-all duration-300 shadow-sm shrink-0"
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
          class="font-mono text-[13px] font-bold tracking-tight text-[hsl(var(--foreground))] transition-colors group-hover:text-[hsl(var(--primary))] whitespace-nowrap"
        >
          sudo_krish
        </span>
      </div>
    </a>

    <!-- CENTER: Navigation Track -->
    <nav
      class="relative z-10 flex items-center p-1 rounded-full bg-[hsl(var(--muted)/0.35)] shadow-inner border border-[hsl(var(--border)/0.25)] mx-auto sm:mx-0"
      onmouseleave={() => (hoveredItem = null)}
    >
      <!-- Sliding Pill -->
      <div
        class="absolute top-1 bottom-1 rounded-full bg-[hsl(var(--foreground)/0.12)] border border-[hsl(var(--foreground)/0.15)] shadow-[0_2px_8px_rgba(0,0,0,0.12)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none w-10 sm:w-[82px]"
        style="transform: translateX(calc({displayIndex} * 100%));"
      >
        <div
          class="absolute inset-x-2 top-0 h-px bg-[hsl(var(--glass-highlight))] opacity-50"
        ></div>
      </div>

      {#each navItems as { label, href, icon: Icon }}
        {@const isActive = href === "/" ? activePath === "/" : activePath.startsWith(href)}
        <a
          {href}
          class="relative z-10 h-9 w-10 sm:w-[82px] gap-1.5 flex items-center justify-center transition-colors duration-300 group rounded-full active:scale-95 no-underline"
          onmouseenter={() => (hoveredItem = href)}
          aria-label="Go to {label}"
          aria-current={isActive ? "page" : undefined}
        >
          <Icon
            size={16}
            strokeWidth={isActive ? 2.4 : 2}
            class="transition-colors duration-300 shrink-0 {isActive
              ? 'text-[hsl(var(--primary))]'
              : 'text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--foreground))]/85'}"
          />
          <span
            class="font-sans text-[11.5px] tracking-wide transition-colors duration-300 overflow-hidden whitespace-nowrap hidden sm:block
                   {isActive
              ? 'text-[hsl(var(--foreground))] font-bold'
              : 'text-[hsl(var(--muted-foreground))] font-medium group-hover:text-[hsl(var(--foreground))]/90'}"
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
        class="p-1 rounded-full bg-[hsl(var(--background)/0.35)] border border-[hsl(var(--border)/0.35)] hover:border-[hsl(var(--foreground)/0.3)] hover:bg-[hsl(var(--foreground)/0.05)] transition-colors active:scale-95 cursor-pointer shrink-0"
      >
        <ThemeToggle />
      </div>
    </div>
  </div>
</div>
