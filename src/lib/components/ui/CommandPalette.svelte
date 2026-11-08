<!-- src/lib/components/ui/CommandPalette.svelte -->
<script lang="ts">
  import { onMount, tick } from "svelte";
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import {
    isCommandPaletteOpen,
    closeCommandPalette,
  } from "$lib/stores/command-palette";
  import { scrollTriggerTarget } from "$lib/stores/scroll-store";
  import { theme } from "$lib/stores/theme";
  import {
    Search,
    Layers,
    FileText,
    Code,
    BookOpen,
    Award,
    Terminal,
    Sun,
    Moon,
    Copy,
    Check,
    ArrowRight,
    ExternalLink,
    X,
    Cpu,
  } from "lucide-svelte";

  let inputEl = $state<HTMLInputElement | null>(null);
  let query = $state("");
  let selectedIndex = $state(0);
  let copyFeedback = $state(false);

  interface CommandItem {
    id: string;
    title: string;
    category: "Architecture Stages" | "Engineering Dossiers" | "Operations";
    subtitle: string;
    icon: any;
    accentColor?: string;
    stageIndex?: string;
    action: () => void;
  }

  const stages = [
    {
      id: "hero",
      title: "Platform Core",
      stage: "01 // 11",
      accent: "hsl(var(--primary))",
      desc: "Architectural profile & live 3D core",
    },
    {
      id: "pipeline",
      title: "Kafka Conduits",
      stage: "02 // 11",
      accent: "hsl(38 92% 50%)",
      desc: "Stream pipeline & CDC event fabric (<50ms)",
    },
    {
      id: "datalake",
      title: "Hydrological Lake",
      stage: "03 // 11",
      accent: "hsl(160 84% 39%)",
      desc: "Medallion strata (Bronze → Silver → Gold)",
    },
    {
      id: "lakehouse",
      title: "Compute Engine",
      stage: "04 // 11",
      accent: "hsl(217 91% 60%)",
      desc: "ACID transactions & open-table compute",
    },
    {
      id: "warehouse",
      title: "OLAP Matrix",
      stage: "05 // 11",
      accent: "hsl(271 91% 65%)",
      desc: "Analytical warehouse & BI serving layer",
    },
    {
      id: "experience",
      title: "Career Ledger",
      stage: "06 // 11",
      accent: "hsl(350 89% 60%)",
      desc: "FinTech data platforms & 50M+ records/day",
    },
    {
      id: "techstack",
      title: "Cluster Nodes",
      stage: "07 // 11",
      accent: "hsl(173 80% 40%)",
      desc: "Distributed systems & infrastructure topology",
    },
    {
      id: "github",
      title: "Code Topology",
      stage: "08 // 11",
      accent: "hsl(142 71% 45%)",
      desc: "Open source repositories & live telemetry",
    },
    {
      id: "impact",
      title: "SLA Proof",
      stage: "09 // 11",
      accent: "hsl(24 95% 53%)",
      desc: "96% latency reduction & verified production impact",
    },
    {
      id: "credentials",
      title: "AWS Vault",
      stage: "10 // 11",
      accent: "hsl(38 92% 50%)",
      desc: "Architectural certifications & professional badges",
    },
    {
      id: "contact",
      title: "Terminal Beacon",
      stage: "11 // 11",
      accent: "hsl(192 91% 48%)",
      desc: "Direct dispatch message & telemetry connect",
    },
  ];

  function navigateToStage(stageId: string) {
    closeCommandPalette();
    if ($page.url.pathname === "/") {
      scrollTriggerTarget.set(stageId);
    } else {
      goto(`/#${stageId}`).then(() => {
        setTimeout(() => scrollTriggerTarget.set(stageId), 250);
      });
    }
  }

  function navigateToRoute(route: string) {
    closeCommandPalette();
    goto(route);
  }

  function copyEmail() {
    if (browser && navigator.clipboard) {
      navigator.clipboard.writeText("krishnanand.anil2010@gmail.com");
      copyFeedback = true;
      setTimeout(() => {
        copyFeedback = false;
        closeCommandPalette();
      }, 1100);
    }
  }

  const baseItems: CommandItem[] = [
    // 11 ARCHITECTURE STAGES
    ...stages.map((st) => ({
      id: `stage-${st.id}`,
      title: st.title,
      category: "Architecture Stages" as const,
      subtitle: `${st.stage} — ${st.desc}`,
      icon: Layers,
      accentColor: st.accent,
      stageIndex: st.stage,
      action: () => navigateToStage(st.id),
    })),

    // ENGINEERING DOSSIERS
    {
      id: "route-experience",
      title: "Career & Production History",
      category: "Engineering Dossiers",
      subtitle: "Yethi Consulting (50M+/day) & Cognizant milestones",
      icon: FileText,
      action: () => navigateToRoute("/experience"),
    },
    {
      id: "route-projects",
      title: "Architecture & Systems Projects",
      category: "Engineering Dossiers",
      subtitle: "CDC streaming pipelines, lakehouse, event telemetry",
      icon: Code,
      action: () => navigateToRoute("/projects"),
    },
    {
      id: "route-articles",
      title: "Technical Publications",
      category: "Engineering Dossiers",
      subtitle: "Deep dives on Apache Kafka, Delta Lake, Snowflake",
      icon: BookOpen,
      action: () => navigateToRoute("/articles"),
    },
    {
      id: "route-credentials",
      title: "AWS & Architecture Credentials",
      category: "Engineering Dossiers",
      subtitle: "Verified cloud engineering certifications & badges",
      icon: Award,
      action: () => navigateToRoute("/credentials"),
    },
    {
      id: "route-learn",
      title: "Interactive Learning Curriculum",
      category: "Engineering Dossiers",
      subtitle: "Structured modules for modern data engineering",
      icon: BookOpen,
      action: () => navigateToRoute("/learn"),
    },
    {
      id: "route-leetcode",
      title: "Algorithm & Complexity Metrics",
      category: "Engineering Dossiers",
      subtitle: "LeetCode solved telemetry, runtime & algorithmic patterns",
      icon: Cpu,
      action: () => navigateToRoute("/leetcode"),
    },
    {
      id: "route-about",
      title: "Atelier Dossier & Retro Terminal",
      category: "Engineering Dossiers",
      subtitle: "Philosophy, background, and retro arcade Easter egg",
      icon: Terminal,
      action: () => navigateToRoute("/about"),
    },

    // OPERATIONS
    {
      id: "op-theme",
      title: "Toggle Visual Mode (Light / Dark)",
      category: "Operations",
      subtitle: "Switch between Prussian Blueprint and Archival Vellum",
      icon: Sun,
      action: () => {
        theme.toggle();
        closeCommandPalette();
      },
    },
    {
      id: "op-email",
      title: "Copy Contact Email",
      category: "Operations",
      subtitle: "krishnanand.anil2010@gmail.com",
      icon: Copy,
      action: copyEmail,
    },
    {
      id: "op-github",
      title: "Open GitHub Profile",
      category: "Operations",
      subtitle: "https://github.com/sudo-krish",
      icon: ExternalLink,
      action: () => {
        if (browser) window.open("https://github.com/sudo-krish", "_blank");
        closeCommandPalette();
      },
    },
  ];

  let filteredItems = $derived(
    baseItems.filter((item) => {
      if (!query.trim()) return true;
      const q = query.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    })
  );

  // Group filtered items by category
  let groupedCategories = $derived(() => {
    const map: Record<string, CommandItem[]> = {};
    for (const item of filteredItems) {
      if (!map[item.category]) {
        map[item.category] = [];
      }
      map[item.category].push(item);
    }
    return Object.entries(map).map(([name, items]) => ({ name, items }));
  });

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Escape") {
      closeCommandPalette();
      return;
    }

    if (filteredItems.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      selectedIndex = (selectedIndex + 1) % filteredItems.length;
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      selectedIndex =
        (selectedIndex - 1 + filteredItems.length) % filteredItems.length;
    } else if (e.key === "Enter") {
      e.preventDefault();
      const current = filteredItems[selectedIndex];
      if (current) current.action();
    }
  }

  // Global keyboard shortcut
  function handleGlobalKeyDown(e: KeyboardEvent) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      if ($isCommandPaletteOpen) {
        closeCommandPalette();
      } else {
        isCommandPaletteOpen.set(true);
      }
    }
  }

  $effect(() => {
    if ($isCommandPaletteOpen) {
      query = "";
      selectedIndex = 0;
      tick().then(() => {
        inputEl?.focus();
      });
    }
  });

  onMount(() => {
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => {
      window.removeEventListener("keydown", handleGlobalKeyDown);
    };
  });
</script>

{#if $isCommandPaletteOpen}
  <div
    class="fixed inset-0 z-[200] flex items-start justify-center p-3 sm:p-6 pt-16 sm:pt-24 bg-background/80 backdrop-blur-xl animate-fade-in"
    onclick={(e) => {
      if (e.target === e.currentTarget) closeCommandPalette();
    }}
    onkeydown={handleKeyDown}
    role="dialog"
    aria-modal="true"
    aria-label="Blueprint Command Palette"
    tabindex="-1"
  >
    <!-- MODAL CHASSIS -->
    <div
      class="w-full max-w-2xl bg-card/95 border border-border/85 rounded-2xl shadow-[var(--shadow-xl)] overflow-hidden flex flex-col relative animate-scale-up"
    >
      <!-- Corner Registration Marks -->
      <div
        class="pointer-events-none absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-primary/50"
      ></div>
      <div
        class="pointer-events-none absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-primary/50"
      ></div>

      <!-- Top Specular Hairline -->
      <div
        class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
      ></div>

      <!-- SEARCH INPUT BAR -->
      <div
        class="flex items-center gap-3 px-4 py-3.5 border-b border-border/80 bg-muted/40 relative z-10"
      >
        <Search size={18} class="text-primary shrink-0" />
        <input
          bind:this={inputEl}
          bind:value={query}
          type="text"
          placeholder="Jump to pipeline stage, explore dossiers, or run command..."
          class="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground/60 text-sm font-sans tracking-tight"
          aria-label="Search command palette"
        />
        {#if copyFeedback}
          <div
            class="flex items-center gap-1.5 px-2 py-1 rounded bg-success/20 border border-success/40 text-success text-[10px] font-mono font-bold"
          >
            <Check size={12} />
            <span>COPIED</span>
          </div>
        {/if}
        <button
          type="button"
          onclick={closeCommandPalette}
          class="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors cursor-pointer"
          aria-label="Close Command Palette"
        >
          <kbd
            class="hidden sm:inline-block font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-background/90 border border-border/70 text-muted-foreground"
            >ESC</kbd
          >
          <span class="sm:hidden"><X size={16} /></span>
        </button>
      </div>

      <!-- RESULTS LIST -->
      <div
        class="max-h-[60vh] overflow-y-auto overscroll-contain p-2 space-y-4"
        tabindex="-1"
      >
        {#if filteredItems.length === 0}
          <div class="py-12 text-center text-muted-foreground">
            <p class="text-sm font-medium">No blueprint matches for "{query}"</p>
            <p class="text-xs text-muted-foreground/70 mt-1">
              Try searching "Kafka", "Lakehouse", "Experience", or "Theme".
            </p>
          </div>
        {:else}
          {#each groupedCategories() as category (category.name)}
            <div>
              <div
                class="px-2.5 py-1 text-[9.5px] font-mono font-bold uppercase tracking-[0.16em] text-muted-foreground/80 flex items-center gap-2"
              >
                <span>{category.name}</span>
                <span class="h-px flex-1 bg-border/40"></span>
              </div>
              <div class="mt-1 space-y-0.5">
                {#each category.items as item (item.id)}
                  {@const Icon = item.icon}
                  {@const globalIdx = filteredItems.findIndex(
                    (fi) => fi.id === item.id
                  )}
                  {@const isSelected = globalIdx === selectedIndex}
                  <button
                    type="button"
                    onclick={item.action}
                    onmouseenter={() => (selectedIndex = globalIdx)}
                    class="w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-150 cursor-pointer
                           {isSelected
                      ? 'bg-primary/12 border border-primary/40 shadow-xs'
                      : 'hover:bg-muted/50 border border-transparent'}"
                  >
                    <div class="flex items-center gap-3 min-w-0">
                      <div
                        class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border"
                        style={item.accentColor
                          ? `background-color: color-mix(in srgb, ${item.accentColor} 12%, transparent); border-color: color-mix(in srgb, ${item.accentColor} 30%, transparent);`
                          : "background-color: hsl(var(--muted)); border-color: hsl(var(--border));"}
                      >
                        <Icon
                          size={15}
                          style={item.accentColor
                            ? `color: ${item.accentColor};`
                            : "color: hsl(var(--foreground));"}
                        />
                      </div>
                      <div class="min-w-0">
                        <div class="flex items-center gap-2">
                          <span
                            class="text-[13px] font-heading font-semibold text-foreground tracking-tight truncate"
                          >
                            {item.title}
                          </span>
                          {#if item.stageIndex}
                            <span
                              class="font-mono text-[9px] font-bold px-1.5 py-0.2 rounded border shrink-0"
                              style="color: {item.accentColor}; border-color: color-mix(in srgb, {item.accentColor} 35%, transparent); background-color: color-mix(in srgb, {item.accentColor} 8%, transparent);"
                            >
                              {item.stageIndex}
                            </span>
                          {/if}
                        </div>
                        <p class="text-[11px] text-muted-foreground truncate mt-0.5">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>

                    <div class="flex items-center gap-1.5 shrink-0">
                      {#if isSelected}
                        <span
                          class="font-mono text-[10px] text-primary hidden sm:inline"
                          >↵ Select</span
                        >
                        <ArrowRight size={13} class="text-primary" />
                      {/if}
                    </div>
                  </button>
                {/each}
              </div>
            </div>
          {/each}
        {/if}
      </div>

      <!-- FOOTER COMMAND SHORTCUTS -->
      <div
        class="flex items-center justify-between px-4 py-2.5 border-t border-border/80 bg-muted/30 text-muted-foreground font-mono text-[10px]"
      >
        <div class="flex items-center gap-3">
          <span class="flex items-center gap-1">
            <kbd class="px-1 py-0.5 rounded bg-background border border-border/70"
              >↑↓</kbd
            >
            <span>Navigate</span>
          </span>
          <span class="flex items-center gap-1">
            <kbd class="px-1 py-0.5 rounded bg-background border border-border/70"
              >↵</kbd
            >
            <span>Execute</span>
          </span>
          <span class="flex items-center gap-1">
            <kbd class="px-1 py-0.5 rounded bg-background border border-border/70"
              >ESC</kbd
            >
            <span>Dismiss</span>
          </span>
        </div>
        <div class="hidden sm:flex items-center gap-1 text-primary">
          <span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
          <span>Hydrological Blueprint Atelier</span>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes scaleUp {
    from {
      opacity: 0;
      transform: scale(0.97) translateY(-6px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  .animate-fade-in {
    animation: fadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .animate-scale-up {
    animation: scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
</style>
