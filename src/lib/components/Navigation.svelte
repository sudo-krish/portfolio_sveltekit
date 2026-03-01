<!-- src/lib/components/Navigation.svelte -->
<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import {
    Menu,
    X,
    Server,
    Briefcase,
    Code,
    Mail,
    User,
    BookOpen,
    PenTool,
    Search,
  } from "lucide-svelte";
  import { onMount, onDestroy } from "svelte";

  let mobileMenuOpen = false;
  let scrolled = false;
  let hidden = false;
  let lastScrollY = 0;
  const scrollThreshold = 100;
  const scrollDelta = 10;

  const navItems = [
    { label: "about", href: "/about", icon: User },
    { label: "research", href: "/research", icon: Search },
    { label: "learning", href: "/learning", icon: BookOpen },
    { label: "articles", href: "/articles", icon: PenTool },
    { label: "projects", href: "/projects", icon: Server },
    { label: "contact", href: "/contact", icon: Mail },
  ];

  const closeMobileMenu = () => {
    mobileMenuOpen = false;
  };
  const handleBackdropKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") closeMobileMenu();
  };
  const handleContentKeyDown = (e: KeyboardEvent) => {
    e.stopPropagation();
  };

  onMount(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollDifference = Math.abs(currentScrollY - lastScrollY);

          if (scrollDifference > scrollDelta) {
            hidden =
              currentScrollY > lastScrollY && currentScrollY > scrollThreshold;
            lastScrollY = currentScrollY;
          }
          scrolled = currentScrollY > 20;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  });
</script>

<nav
  class="nav transition-all duration-300 {scrolled ? 'pt-4' : 'pt-6'} {hidden
    ? '-translate-y-full opacity-0'
    : 'translate-y-0 opacity-100'}"
>
  <div class="container mx-auto px-4 sm:px-6 max-w-7xl">
    <div
      class="glass-panel rounded-2xl flex items-center justify-between px-6 py-3 transition-all duration-300 {scrolled
        ? 'bg-background/80 shadow-lg'
        : 'bg-transparent border-transparent shadow-none'}"
    >
      <!-- Logo -->
      <a
        href="/"
        class="group flex items-center gap-2 font-mono text-sm"
        aria-label="Go to Home"
      >
        <span class="text-primary font-bold group-hover:neon-pulse">sudo</span>
        <span class="text-muted-foreground">_</span>
        <span class="text-foreground font-medium">krish</span>
        <span
          class="w-2 h-4 bg-primary animate-pulse ml-1 opacity-70 group-hover:opacity-100"
        ></span>
      </a>

      <!-- Desktop Links -->
      <div class="hidden md:flex items-center gap-1">
        {#each navItems as { label, href, icon }}
          <a
            {href}
            class="nav-link group relative px-3 py-2 flex items-center gap-2 rounded-lg text-sm font-mono text-muted-foreground hover:text-primary transition-colors"
          >
            <svelte:component
              this={icon}
              size={14}
              class="opacity-70 group-hover:opacity-100 transition-opacity"
            />
            <span>{label}</span>
            <span
              class="absolute inset-x-3 -bottom-1 h-px bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></span>
          </a>
        {/each}
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-4">
        <a href="/contact" class="hidden lg:inline-flex">
          <Button
            size="sm"
            class="relative overflow-hidden bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary border border-primary/20 transition-all duration-300 glow-on-hover"
          >
            <span
              class="font-mono lowercase tracking-wider text-xs font-semibold"
              >Initiate_Contact</span
            >
          </Button>
        </a>
        <button
          class="md:hidden text-foreground hover:text-primary transition-colors p-2 rounded-md hover:bg-white/5"
          on:click={() => (mobileMenuOpen = !mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {#if mobileMenuOpen}
            <X size={20} />
          {:else}
            <Menu size={20} />
          {/if}
        </button>
      </div>
    </div>
  </div>
</nav>

<!-- Mobile Menu Overlay -->
{#if mobileMenuOpen}
  <div
    class="fixed inset-0 z-40 bg-background/80 backdrop-blur-md transition-opacity"
    on:click={closeMobileMenu}
    on:keydown={handleBackdropKeyDown}
    role="dialog"
    tabindex="-1"
  >
    <div
      class="absolute right-4 top-24 w-64 glass-panel rounded-2xl p-4 flex flex-col gap-2 shadow-2xl border border-white/10"
      on:click|stopPropagation
      on:keydown={handleContentKeyDown}
      role="document"
      tabindex="0"
    >
      <div
        class="text-xs font-mono text-primary/70 mb-2 px-2 uppercase tracking-widest border-b border-white/10 pb-2"
      >
        Navigation Matrix
      </div>
      {#each navItems as { label, href, icon }}
        <a
          {href}
          class="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-primary/10 hover:text-primary transition-colors font-mono text-sm"
          on:click={closeMobileMenu}
        >
          <svelte:component this={icon} size={16} />
          <span>{label}</span>
        </a>
      {/each}
      <a href="/contact" class="mt-4" on:click={closeMobileMenu}>
        <Button
          class="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-mono tracking-wider"
        >
          HIRE_ME
        </Button>
      </a>
    </div>
  </div>
{/if}

<style>
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 50;
  }

  .glow-on-hover:hover {
    box-shadow: 0 0 15px hsla(var(--primary), 0.3);
  }

  .neon-pulse {
    text-shadow: 0 0 10px hsla(var(--primary), 0.5);
  }
</style>
