<!-- src/lib/components/Navbar.svelte -->
<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Menu, X, Server, Briefcase, Code, Mail } from "lucide-svelte";
  import { onMount } from "svelte";
  import ThemeToggle from "$lib/components/ThemeToggle.svelte";

  let mobileMenuOpen = false;
  let scrolled = false;
  let hidden = false;
  let lastScrollY = 0;
  let scrollThreshold = 100; // Minimum scroll before hiding
  let scrollDelta = 10; // Minimum scroll delta to trigger hide/show

  const navItems = [
    { label: "experience", id: "metrics", icon: Briefcase },
    { label: "projects", id: "projects", icon: Server },
    { label: "skills", id: "tech-stack", icon: Code },
    { label: "contact", id: "contact", icon: Mail },
  ];

  const scrollToSection = (sectionId: string) => {
    if (sectionId === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    closeMobileMenu();
  };

  const closeMobileMenu = () => {
    mobileMenuOpen = false;
  };

  const handleBackdropKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      closeMobileMenu();
    }
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
          
          // Only update if scroll difference is significant (prevents micro-scrolls)
          if (scrollDifference > scrollDelta) {
            // Hide navbar when scrolling down past threshold
            hidden = currentScrollY > lastScrollY && currentScrollY > scrollThreshold;
            
            // Update last scroll position
            lastScrollY = currentScrollY;
          }
          
          // Update scrolled state
          scrolled = currentScrollY > 10;
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  });
</script>

<nav class="nav" class:scrolled class:hidden>
  <div class="container">
    <!-- Terminal-style logo -->
    <button
      class="logo"
      on:click={() => scrollToSection("hero")}
      aria-label="Go to top"
    >
      <span class="prompt">$</span>
      <span class="cursor">_</span>
      <span class="name">sudo_krish</span>
    </button>

    <!-- Command-style links with icons -->
    <div class="links">
      {#each navItems as { label, id, icon }}
        <button
          class="link"
          on:click={() => scrollToSection(id)}
          aria-label="Go to {label}"
        >
          <svelte:component this={icon} size={14} class="link-icon" />
          <span class="label">{label}</span>
        </button>
      {/each}
    </div>

    <!-- Simple actions -->
    <div class="actions">
      <ThemeToggle />
      <!-- Wrap button in a div to handle click -->
      <div
        on:click={() => scrollToSection("contact")}
        role="button"
        tabindex="0"
        on:keydown={(e) => e.key === "Enter" && scrollToSection("contact")}
      >
        <Button size="sm" class="cta">hire me</Button>
      </div>
      <button
        class="menu-toggle"
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

  <!-- Data flow visualization -->
  <div class="flow-line" class:active={scrolled}>
    <div class="flow-particle"></div>
  </div>
</nav>

<!-- Mobile CTA -->
{#if mobileMenuOpen}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div 
    class="mobile" 
    on:click={closeMobileMenu}
    on:keydown={handleBackdropKeyDown}
  >
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div 
      class="mobile-content" 
      on:click={(e) => e.stopPropagation()}
      on:keydown={handleContentKeyDown}
    >
      <div class="mobile-header">
        <span>$ menu</span>
      </div>
      {#each navItems as { label, id, icon }}
        <button 
          class="mobile-link" 
          on:click={() => scrollToSection(id)}
          aria-label="Go to {label}"
        >
          <svelte:component this={icon} size={18} />
          <span>{label}</span>
        </button>
      {/each}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div class="mobile-cta-wrapper" on:click={() => scrollToSection('contact')}>
        <Button class="mobile-cta">hire me</Button>
      </div>
    </div>
  </div>
{/if}

<style>
  .nav {
    position: sticky;
    top: 0;
    z-index: 100;
    width: 100%;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform;
  }

  .nav.hidden {
    transform: translateY(-100%);
  }

  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0.75rem 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background: hsl(var(--background));
    transition: all 0.3s ease;
  }

  /* Terminal-style logo */
  .logo {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    background: transparent;
    border: none;
    cursor: pointer;
    font-family: var(--font-mono);
    font-size: 0.9375rem;
    transition: opacity 0.2s ease;
    padding: 0;
  }

  .logo:hover {
    opacity: 0.8;
  }

  .prompt {
    color: hsl(var(--accent));
    font-weight: 700;
  }

  .cursor {
    color: hsl(var(--primary));
    font-weight: 700;
    animation: blink 1.5s step-end infinite;
  }

  @keyframes blink {
    0%,
    50% {
      opacity: 1;
    }
    51%,
    100% {
      opacity: 0;
    }
  }

  .name {
    color: hsl(var(--foreground));
    font-weight: 500;
  }

  /* Command-style links with icons */
  .links {
    display: none;
    gap: 0.5rem;
    flex: 1;
  }

  @media (min-width: 768px) {
    .links {
      display: flex;
    }
  }

  .link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    background: transparent;
    border: none;
    cursor: pointer;
    font-family: var(--font-mono);
    font-size: 0.875rem;
    transition: all 0.15s ease;
  }

  .link:hover {
    background: hsl(var(--muted));
  }

  .label {
    color: hsl(var(--muted-foreground));
    font-weight: 500;
  }

  .link:hover .label {
    color: hsl(var(--foreground));
  }

  /* Simple actions */
  .actions {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  :global(.cta) {
    display: none;
    background: hsl(var(--primary)) !important;
    color: white !important;
    font-family: var(--font-mono) !important;
    text-transform: lowercase !important;
    letter-spacing: 0.02em !important;
  }

  @media (min-width: 1024px) {
    :global(.cta) {
      display: inline-flex;
    }
  }

  .menu-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    padding: 0;
    background: none;
    border: none;
    color: hsl(var(--foreground));
    cursor: pointer;
    border-radius: 6px;
    transition: background 0.15s ease;
  }

  .menu-toggle:hover {
    background: hsl(var(--muted));
  }

  @media (min-width: 768px) {
    .menu-toggle {
      display: none;
    }
  }

  /* Data flow visualization */
  .flow-line {
    position: relative;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      hsl(var(--primary)) 50%,
      transparent 100%
    );
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }

  .flow-line.active {
    transform: scaleX(1);
  }

  .flow-particle {
    position: absolute;
    top: -2px;
    left: 0;
    width: 6px;
    height: 6px;
    background: hsl(var(--primary));
    border-radius: 50%;
    box-shadow: 0 0 8px hsl(var(--primary));
    animation: flowMove 3s linear infinite;
  }

  @keyframes flowMove {
    0% {
      left: 0;
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      left: 100%;
      opacity: 0;
    }
  }

  /* Mobile menu */
  .mobile {
    position: fixed;
    inset: 0;
    z-index: 90;
    background: hsl(var(--background) / 0.98);
    backdrop-filter: blur(20px);
    animation: fadeIn 0.2s ease;
    cursor: pointer;
  }

  .mobile:focus {
    outline: none;
  }

  .mobile-content {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 5rem 1.5rem 2rem;
    max-width: 400px;
    margin: 0 auto;
    cursor: default;
  }

  .mobile-header {
    padding: 0 0.5rem 1rem;
    color: hsl(var(--accent));
    font-family: var(--font-mono);
    font-size: 0.875rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    border-bottom: 1px solid hsl(var(--border));
  }

  .mobile-link {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.25rem;
    background: hsl(var(--muted) / 0.5);
    border: 1px solid hsl(var(--border));
    border-left: 3px solid hsl(var(--primary));
    border-radius: 6px;
    color: hsl(var(--foreground));
    font-family: var(--font-mono);
    font-size: 1rem;
    font-weight: 600;
    transition: all 0.2s ease;
    cursor: pointer;
    width: 100%;
    text-align: left;
  }

  .mobile-link:hover {
    background: hsl(var(--muted));
    border-left-width: 5px;
    transform: translateX(2px);
  }

  :global(.mobile-cta) {
    margin-top: 1rem;
    width: 100%;
    padding: 1rem;
    font-family: var(--font-mono) !important;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (max-width: 767px) {
    .container {
      padding: 0.75rem 1.5rem;
    }

    .logo {
      flex: 1;
    }
  }

  @media (min-width: 768px) {
    .mobile {
      display: none;
    }
  }
</style>
