<script lang="ts">
  import { Briefcase, Mail, Home } from "lucide-svelte";
  import { onMount } from "svelte";
  import ThemeToggle from "$lib/components/ThemeToggle.svelte";

  // Svelte 5 Runes
  let activeSection = $state("hero");
  let isScrolled = $state(false);
  let hoveredSection = $state<string | null>(null);

  const navItems = [
    { label: "Home", id: "hero", icon: Home },
    { label: "Metrics", id: "metrics", icon: Briefcase },
    { label: "Contact", id: "contact", icon: Mail },
  ];

  // Dynamically calculate the active index for the sliding pill
  let targetSection = $derived(hoveredSection || activeSection);
  let activeIndex = $derived(navItems.findIndex((n) => n.id === targetSection));
  let safeIndex = $derived(activeIndex !== -1 ? activeIndex : 0);

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
  };

  onMount(() => {
    const handleScroll = () => (isScrolled = window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });

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
      window.removeEventListener("scroll", handleScroll);
    };
  });
</script>

<!-- FLOATING PREMIUM DOCK -->
<div
  class="fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
         w-[94%] sm:w-max max-w-[480px] sm:max-w-none
         {isScrolled
    ? 'top-4 sm:top-5 scale-[0.98] sm:scale-100'
    : 'top-6 sm:top-8 scale-100'}"
>
  <!-- Main Chassis -->
  <div
    class="card-glass relative flex items-center justify-between sm:justify-center p-1.5 sm:p-2 !rounded-full shadow-[var(--shadow-xl)]"
  >
    <!-- LEFT: Personal Brand / Avatar -->
    <!-- Removed buggy 'xxs' logic. Now it's always flex, but the text hides on mobile. -->
    <button
      class="relative z-10 flex items-center gap-3 pl-1 sm:pl-1.5 pr-2 sm:pr-4 py-1 group shrink-0 active:scale-95 transition-transform"
      onclick={() => scrollToSection("hero")}
      aria-label="Go to top"
    >
      <!-- Avatar with Dynamic Glow -->
      <div
        class="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-[hsl(var(--border))] group-hover:border-[hsl(var(--primary))] transition-colors duration-500 shadow-sm shrink-0"
      >
        <!-- Ambient back-glow inside the ring -->
        <div
          class="absolute inset-0 bg-[hsl(var(--primary)/0.2)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
        ></div>

        <img
          src="https://github.com/sudo-krish.png"
          alt="sudo_krish avatar"
          class="relative z-10 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onerror={(e) =>
            ((e.currentTarget as HTMLImageElement).src =
              "https://ui-avatars.com/api/?name=Krishnanand+Anil&background=random")}
        />
        <!-- Online Status Dot -->
        <div
          class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[hsl(var(--success))] rounded-full border-2 border-[hsl(var(--background))] z-20 shadow-[0_0_8px_hsl(var(--success)/0.8)]"
        ></div>
      </div>

      <!-- Typography -->
      <!-- Only shows on sm (640px) screens and up to save space on mobile -->
      <div class="flex-col items-start hidden sm:flex">
        <span
          class="font-mono text-[13px] font-bold tracking-tight text-[hsl(var(--foreground))] transition-colors group-hover:text-[hsl(var(--primary))]"
        >
          sudo_krish
        </span>
      </div>
    </button>

    <!-- CENTER: The Recessed Navigation Track -->
    <nav
      class="relative z-10 flex items-center p-1 rounded-full bg-[hsl(var(--muted))] shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] border border-[hsl(var(--border)/0.5)] mx-auto sm:mx-0"
      onmouseleave={() => (hoveredSection = null)}
    >
      <!-- The Magic Sliding Pill -->
      <div
        class="absolute top-1 bottom-1 w-11 sm:w-[92px] rounded-full bg-[hsl(var(--card))] border border-[hsl(var(--border))] shadow-[var(--shadow-sm)] transition-transform duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.1)] pointer-events-none"
        style="transform: translateX(calc({safeIndex} * 100%));"
      >
        <!-- Subtle top highlight for the pill -->
        <div
          class="absolute inset-x-2 top-0 h-px bg-[hsl(var(--glass-highlight))] opacity-50"
        ></div>
      </div>

      {#each navItems as { label, id, icon: Icon }}
        <button
          class="relative z-10 w-11 sm:w-[92px] h-8 sm:h-9 flex items-center justify-center gap-2 transition-all duration-300 group rounded-full active:scale-95"
          onclick={() => scrollToSection(id)}
          onmouseenter={() => (hoveredSection = id)}
          aria-label="Go to {label}"
        >
          <Icon
            size={16}
            strokeWidth={targetSection === id ? 2.5 : 2}
            class="transition-all duration-300 {targetSection === id
              ? 'text-[hsl(var(--primary))] drop-shadow-[0_0_8px_hsl(var(--primary)/0.6)] scale-105'
              : 'text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--foreground))]/80'}"
          />
          <span
            class="font-sans text-[12px] tracking-wide transition-all duration-300 hidden sm:block
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
      class="relative z-10 flex items-center pl-1 sm:pl-3 pr-1 sm:pr-1.5 shrink-0"
    >
      <div
        class="p-1 rounded-full bg-[hsl(var(--muted))] border border-[hsl(var(--border)/0.5)] hover:border-[hsl(var(--border))] transition-colors shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] active:scale-95 cursor-pointer"
      >
        <ThemeToggle />
      </div>
    </div>
  </div>
</div>
