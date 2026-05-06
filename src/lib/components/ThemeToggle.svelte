<!-- src/lib/components/ThemeToggle.svelte -->
<script lang="ts">
  import { theme } from "$lib/stores/theme";
  import { onMount } from "svelte";
  import { Sun, Moon } from "lucide-svelte";

  let currentTheme: "light" | "dark" = $state("dark");

  onMount(() => {
    theme.init();
    const unsubscribe = theme.subscribe((value) => {
      currentTheme = value;
      if (value === "light") {
        document.documentElement.classList.add("light");
      } else {
        document.documentElement.classList.remove("light");
      }
    });
    return unsubscribe;
  });

  function toggleTheme(event: MouseEvent) {
    if (!document.startViewTransition) {
      // Fallback for older browsers: apply global CSS transition class
      document.documentElement.classList.add("theme-transitioning");
      theme.toggle();
      setTimeout(() => {
        document.documentElement.classList.remove("theme-transitioning");
      }, 500);
      return;
    }

    // Modern Browsers: View Transitions API
    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    );

    // Capture the current theme BEFORE toggling so we know which direction to animate
    const wasLight = document.documentElement.classList.contains("light");

    // Disable heavy blurs right before snapshot
    document.documentElement.classList.add("is-view-transitioning");

    // When collapsing (light→dark), we need the OLD (light) snapshot on top
    // so the shrinking circle reveals the dark view underneath
    if (wasLight) {
      document.documentElement.classList.add("theme-collapsing");
    }

    const transition = document.startViewTransition(() => {
      theme.toggle();
    });

    transition.ready.then(() => {
      const expandClip = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];
      const collapseClip = [
        `circle(${endRadius}px at ${x}px ${y}px)`,
        `circle(0px at ${x}px ${y}px)`,
      ];

      // Dark → Light: clip the NEW (light) view expanding outward
      // Light → Dark: clip the OLD (light) view collapsing inward
      document.documentElement.animate(
        {
          clipPath: wasLight ? collapseClip : expandClip,
        },
        {
          duration: 400,
          easing: "ease-in-out",
          fill: "forwards",
          pseudoElement: wasLight
            ? "::view-transition-old(root)"
            : "::view-transition-new(root)",
        },
      );
    });

    transition.finished.finally(() => {
      document.documentElement.classList.remove("is-view-transitioning");
      document.documentElement.classList.remove("theme-collapsing");
    });
  }
</script>

<button
  onclick={toggleTheme}
  class="relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))] group bg-transparent border-none p-0 cursor-pointer"
  aria-label="Toggle theme"
>
  <!-- Sun icon (Light mode indicator) -->
  <div
    class="absolute inset-0 flex items-center justify-center transition-all duration-[600ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]
    {currentTheme === 'light'
      ? 'rotate-0 scale-100 opacity-100 text-[hsl(var(--foreground))] drop-shadow-[0_0_12px_hsl(var(--foreground)/0.5)]'
      : '-rotate-90 scale-50 opacity-0 text-[hsl(var(--muted-foreground))]/30'}"
  >
    <Sun size={18} strokeWidth={2.5} class="scale-[0.85] sm:scale-100" />
  </div>

  <!-- Moon icon (Dark mode indicator) -->
  <div
    class="absolute inset-0 flex items-center justify-center transition-all duration-[600ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]
    {currentTheme === 'dark'
      ? 'rotate-0 scale-100 opacity-100 text-[hsl(var(--foreground))] drop-shadow-[0_0_12px_hsl(var(--foreground)/0.5)]'
      : 'rotate-90 scale-50 opacity-0 text-[hsl(var(--muted-foreground))]/30'}"
  >
    <Moon size={18} strokeWidth={2.5} class="scale-[0.85] sm:scale-100" />
  </div>
</button>
