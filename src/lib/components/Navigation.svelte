<!-- src/lib/components/Navigation.svelte -->
<script lang="ts">
  import { Briefcase, Code, Mail, Home } from "lucide-svelte";
  import { onMount } from "svelte";
  import ThemeToggle from "$lib/components/ThemeToggle.svelte";

  let activeSection = "hero";

  const navItems = [
    { label: "Home", id: "hero", icon: Home },
    { label: "Metrics", id: "metrics", icon: Briefcase },
    { label: "Contact", id: "contact", icon: Mail },
  ];

  const scrollToSection = (sectionId: string) => {
    if (sectionId === "hero") {
      document
        .querySelector(".snap-container")
        ?.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  onMount(() => {
    // Observe sections to update active state
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activeSection = entry.target.id;
          }
        });
      },
      { threshold: 0.3 },
    );

    const sections = ["hero", "metrics", "contact"].map((id) =>
      document.getElementById(id),
    );
    sections.forEach((s) => s && observer.observe(s));

    return () => observer.disconnect();
  });
</script>

<!-- TOP DOCKED COMMAND PALETTE -->
<div
  class="fixed top-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto transition-all duration-500 hover:translate-y-1"
>
  <div
    class="flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/10 bg-black/60 backdrop-blur-3xl shadow-[0_10px_40px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.1)]"
  >
    <!-- Logo -->
    <button
      class="flex items-center gap-2 pr-4 border-r border-white/10 hover:text-blue-400 transition-colors group"
      onclick={() => scrollToSection("hero")}
      aria-label="Go to top"
    >
      <div
        class="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/40 transition-colors"
      >
        <span class="font-mono text-xs font-bold text-blue-400">_</span>
      </div>
      <span
        class="font-mono text-xs font-semibold text-white/90 hidden sm:block"
        >sudo_krish</span
      >
    </button>

    <!-- Nav Links -->
    <div class="flex items-center gap-1 sm:gap-2 px-2">
      {#each navItems as { label, id, icon }}
        <button
          class="p-2 sm:px-4 sm:py-2 rounded-full transition-all flex items-center gap-2 group {activeSection ===
          id
            ? 'text-white bg-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]'
            : 'text-white/50 hover:text-white hover:bg-white/5'}"
          onclick={() => scrollToSection(id)}
          aria-label="Go to {label}"
        >
          <svelte:component
            this={icon}
            size={16}
            class="transition-transform {activeSection === id
              ? 'scale-110 text-cyan-400'
              : 'group-hover:scale-110'}"
          />
          <span class="text-xs font-medium hidden sm:block">{label}</span>
        </button>
      {/each}
    </div>

    <!-- Right Side Tools -->
    <div class="flex items-center pl-2 border-l border-white/10">
      <ThemeToggle />
    </div>
  </div>
</div>

<style>
</style>
