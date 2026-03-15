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

  const IDLE_TIMEOUT = 2000;

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
  let displayIndex = $derived(hoveredIndex !== -1 ? hoveredIndex : activeIndex());

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
  class="fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] origin-top pb-4 pt-2
         {isShrunk
    ? 'top-2 sm:top-3 scale-75 sm:scale-90 opacity-40 hover:opacity-100'
    : 'top-4 sm:top-6 scale-100 opacity-100 w-[94%] sm:w-max max-w-[560px] sm:max-w-none'}"
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
    <a
      href="/"
      class="relative z-10 flex items-center gap-3 py-1 group shrink-0 active:scale-95 overflow-hidden transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] no-underline
             {isShrunk
        ? 'max-w-0 opacity-0 pl-0 pr-0 ml-0 mr-0 border-0'
        : 'max-w-[150px] opacity-100 pl-1 sm:pl-1.5 pr-2 sm:pr-4 ml-0 mr-2 sm:mr-0'}"
      aria-label="Go to home"
    >
      <div
        class="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-[hsl(var(--border))] group-hover:border-[hsl(var(--primary))] transition-colors duration-500 shadow-sm shrink-0"
      >
        <div
          class="absolute inset-0 bg-[hsl(var(--primary)/0.2)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        ></div>
        <img
          src="https://github.com/sudo-krish.png"
          alt="Krishnanand Anil - Senior Data Engineer, Software Developer, and Tech Enthusiast Profile Picture"
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
    </a>

    <!-- CENTER: Navigation Track -->
    <nav
      class="relative z-10 flex items-center p-1 rounded-full transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]
             {isShrunk
        ? 'mx-0 bg-transparent shadow-none border-transparent'
        : 'bg-[hsl(var(--muted))] shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] border border-[hsl(var(--border)/0.5)] mx-auto sm:mx-0'}"
      onmouseleave={() => (hoveredItem = null)}
    >
      <!-- Sliding Pill -->
      <div
        class="absolute top-1 bottom-1 rounded-full bg-[hsl(var(--card))] border border-[hsl(var(--border))] shadow-[var(--shadow-sm)] transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.1)] pointer-events-none
               {isShrunk
          ? 'opacity-0 scale-75 w-10'
          : 'opacity-100 scale-100 w-11 sm:w-[80px]'}"
        style="transform: translateX(calc({displayIndex} * 100%));"
      >
        <div
          class="absolute inset-x-2 top-0 h-px bg-[hsl(var(--glass-highlight))] opacity-50"
        ></div>
      </div>

      {#each navItems as { label, href, icon: Icon }}
        <a
          {href}
          class="relative z-10 h-8 sm:h-9 flex items-center justify-center transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group rounded-full active:scale-95 no-underline
                 {isShrunk ? 'w-9 gap-0' : 'w-11 sm:w-[80px] gap-1.5'}"
          onmouseenter={() => (hoveredItem = href)}
          aria-label="Go to {label}"
        >
          <Icon
            size={isShrunk ? 18 : 16}
            strokeWidth={(href === "/" ? activePath === "/" : activePath.startsWith(href)) && !isShrunk ? 2.5 : 2}
            class="transition-all duration-500 shrink-0 {(href === '/' ? activePath === '/' : activePath.startsWith(href))
              ? 'text-[hsl(var(--primary))] drop-shadow-[0_0_8px_hsl(var(--primary)/0.6)] scale-105'
              : 'text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--foreground))]/80'}"
          />
          <span
            class="font-sans text-[11px] tracking-wide transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden whitespace-nowrap block
                   {isShrunk
              ? 'max-w-0 opacity-0'
              : 'max-w-[100px] opacity-100 hidden sm:block'}
                   {(href === '/' ? activePath === '/' : activePath.startsWith(href))
              ? 'text-[hsl(var(--foreground))] font-bold'
              : 'text-[hsl(var(--muted-foreground))] font-semibold group-hover:text-[hsl(var(--foreground))]/80'}"
          >
            {label}
          </span>
        </a>
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
