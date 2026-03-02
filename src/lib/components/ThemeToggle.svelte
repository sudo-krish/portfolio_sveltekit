<!-- src/lib/components/ThemeToggle.svelte -->
<script lang="ts">
  import { theme } from "$lib/stores/theme";
  import { Button } from "$lib/components/ui/button";
  import { onMount } from "svelte";

  // Default to our new primary Dark (Glassmorphism) theme
  let currentTheme: "light" | "dark" = $state("dark");

  onMount(() => {
    theme.init();
    const unsubscribe = theme.subscribe((value) => {
      currentTheme = value;
      // Ensure the DOM reflects our new app.css architecture
      // The default :root is dark, so we only add '.light' when needed
      if (value === "light") {
        document.documentElement.classList.add("light");
      } else {
        document.documentElement.classList.remove("light");
      }
    });
    return unsubscribe;
  });

  function toggleTheme() {
    theme.toggle();
  }
</script>

<Button
  variant="ghost"
  size="icon"
  onclick={toggleTheme}
  class="theme-toggle-btn card-glass group relative overflow-hidden transition-all duration-500 hover:scale-105"
  aria-label="Toggle theme"
>
  <!-- Ambient background glow behind the icon -->
  <div
    class="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 {currentTheme ===
    'light'
      ? 'bg-amber-400/20'
      : 'bg-cyan-400/20'}"
  ></div>

  <div class="relative flex items-center justify-center w-full h-full">
    {#if currentTheme === "light"}
      <!-- Moon icon: Entering Dark Mode -->
      <!-- We use custom transition classes to make the icons spin and fade elegantly -->
      <svg
        class="w-5 h-5 text-indigo-900 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] rotate-0 scale-100"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    {:else}
      <!-- Sun icon: Entering Light Mode -->
      <svg
        class="w-5 h-5 text-cyan-300 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] rotate-0 scale-100"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        style="filter: drop-shadow(0 0 6px hsl(var(--primary) / 0.8));"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    {/if}
  </div>
</Button>

<style>
  /* 
    We apply our new global glassmorphism styles directly to the button 
    to ensure it matches the 2026 Neo-Premium aesthetic.
  */
  :global(.theme-toggle-btn) {
    border-radius: 50% !important; /* Make it perfectly circular */
    width: 2.75rem !important;
    height: 2.75rem !important;
    padding: 0 !important;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid hsl(var(--glass-border) / 0.5) !important;
    box-shadow:
      inset 0 1px 0 0 hsl(var(--glass-highlight)),
      0 4px 6px -1px rgb(0 0 0 / 0.1) !important;
  }

  :global(.theme-toggle-btn:hover) {
    box-shadow:
      inset 0 1px 0 0 hsl(var(--glass-highlight)),
      0 0 15px hsl(var(--primary) / 0.3) !important;
    border-color: hsl(var(--primary) / 0.4) !important;
  }

  /* Animate the SVG entering/leaving */
  svg {
    animation: spin-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  @keyframes spin-in {
    0% {
      transform: rotate(-90deg) scale(0.5);
      opacity: 0;
    }
    100% {
      transform: rotate(0) scale(1);
      opacity: 1;
    }
  }
</style>
