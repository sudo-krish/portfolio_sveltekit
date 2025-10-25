<!-- src/lib/components/Navbar.svelte -->
<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Menu, X, Cloud, Database, Boxes, Mail } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import ThemeToggle from '$lib/components/ThemeToggle.svelte';
  
  let mobileMenuOpen = false;
  let scrolled = false;
  let hidden = false;
  let lastScrollY = 0;
  
  const navItems = [
    { label: 'about', href: '/about', icon: Cloud },
    { label: 'projects', href: '/work', icon: Database },
    { label: 'experience', href: '/experience', icon: Boxes },
    { label: 'contact', href: '/contact', icon: Mail }
  ];
  
  const closeMobileMenu = () => {
    mobileMenuOpen = false;
  };
  
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      closeMobileMenu();
    }
  };
  
  onMount(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          hidden = currentScrollY > lastScrollY && currentScrollY > 100;
          scrolled = currentScrollY > 10;
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

<nav class="nav" class:scrolled class:hidden>
  <div class="container">
    
    <!-- Terminal-style logo -->
    <a href="/" class="logo">
      <span class="prompt">$</span>
      <span class="cursor">_</span>
      <span class="name">sudo_krish</span>
    </a>
    
    <!-- Command-style links with icons -->
    <div class="links">
      {#each navItems as { label, href, icon }}
        <a {href} class="link">
          <svelte:component this={icon} size={14} class="link-icon" />
          <span class="label">{label}</span>
        </a>
      {/each}
    </div>
    
    <!-- Simple actions -->
    <div class="actions">
      <ThemeToggle />
      <Button size="sm" class="cta">deploy</Button>
      <button class="menu-toggle" on:click={() => mobileMenuOpen = !mobileMenuOpen} aria-label="Menu">
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

{#if mobileMenuOpen}
  <div 
    class="mobile" 
    role="dialog"
    aria-modal="true"
    on:click={closeMobileMenu}
    on:keydown={handleKeyDown}
    tabindex="0"
  >
    <div class="mobile-content">
      <div class="mobile-header">
        <span>$ navigation</span>
      </div>
      {#each navItems as { label, href, icon }}
        <a {href} class="mobile-link">
          <svelte:component this={icon} size={18} />
          <span>{label}</span>
        </a>
      {/each}
      <Button class="mobile-cta">deploy</Button>
    </div>
  </div>
{/if}

<style>
  .nav {
    position: sticky;
    top: 0;
    z-index: 100;
    width: 100%;
    transition: transform 0.3s ease;
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
    text-decoration: none;
    font-family: var(--font-mono);
    font-size: 0.9375rem;
    transition: opacity 0.2s ease;
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
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
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
    text-decoration: none;
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
    text-decoration: none;
    font-family: var(--font-mono);
    font-size: 1rem;
    font-weight: 600;
    transition: all 0.2s ease;
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
    from { opacity: 0; }
    to { opacity: 1; }
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
