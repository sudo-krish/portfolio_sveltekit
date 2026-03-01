<!-- src/lib/components/home/lakehouse/LakehouseContent.svelte -->
<script lang="ts">
  import {
    Layers,
    Box,
    Table2,
    ShieldAlert,
    GitBranch,
    History,
    Shuffle,
    FileCheck,
    Lock,
    Database,
    Terminal,
  } from "lucide-svelte";

  // LAKEHOUSE TECH STACK
  const lakehouseTech = [
    { name: "Apache Iceberg", icon: Box, desc: "Open Format" },
    { name: "Delta Lake", icon: Layers, desc: "ACID Layer" },
    { name: "Transactions", icon: FileCheck, desc: "Atomic Commits" },
    { name: "Lake Formation", icon: ShieldAlert, desc: "Access Control" },
    { name: "Data Mesh", icon: GitBranch, desc: "Federation" },
    { name: "Schema Evo", icon: Table2, desc: "Evolution" },
    { name: "Time Travel", icon: History, desc: "Versioning" },
    { name: "Compaction", icon: Shuffle, desc: "Optimization" },
    { name: "Row Security", icon: Lock, desc: "Fine-Grained" },
    { name: "Catalog", icon: Database, desc: "Unified Meta" },
  ];
</script>

<div class="relative w-full z-20 flex flex-col h-full justify-between">
  <!-- 1. HEADER SECTION -->
  <div class="mb-8">
    <!-- Status Badge -->
    <div
      class="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5"
    >
      <Layers size={12} class="text-cyan-500 animate-pulse" />
      <span
        class="font-mono text-[10px] font-bold text-cyan-500 tracking-widest uppercase"
      >
        Modern Data Engineering
      </span>
    </div>

    <!-- Headline -->
    <h3 class="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
      AI-Ready Analytics<br />
      <span
        class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400"
        >& Vector Intelligence.</span
      >
    </h3>

    <!-- Bio -->
    <p
      class="text-muted-foreground text-sm lg:text-base leading-relaxed mb-8 max-w-sm"
    >
      Built the data foundation for GenAI enabling <span
        class="text-foreground font-medium">contextual retrieval</span
      >
      and NLQ. Abstracted vector databases behind GraphQL, reducing
      time-to-insight by <strong>70%</strong>.
    </p>

    <!-- Action -->
    <a
      href="/projects/ai-analytics-platform"
      class="group inline-flex items-center gap-2 text-sm font-mono font-semibold text-cyan-500 hover:text-cyan-300 transition-colors"
    >
      <span
        class="border-b border-cyan-500/30 pb-0.5 group-hover:border-cyan-300 transition-colors"
        >EXPLORE_PLATFORM</span
      >
      <Terminal
        size={14}
        class="group-hover:translate-x-1 transition-transform"
      />
    </a>
  </div>

  <!-- 2. HIGH-IMPACT CYAN MARQUEE -->
  <div
    class="w-full mt-auto pt-4 border-t border-white/5 mx-[-2rem] px-[2rem] w-[calc(100%+4rem)] overflow-hidden"
  >
    <div class="mb-3 flex items-center gap-2">
      <span
        class="text-[10px] font-mono text-cyan-500/70 uppercase tracking-widest font-bold"
      >
        Lakehouse Stack
      </span>
      <div
        class="h-px flex-1 bg-gradient-to-r from-cyan-500/20 to-transparent"
      ></div>
    </div>

    <!-- Infinite Scroll Track -->
    <div
      class="relative w-full mask-gradient py-2 opacity-70 group-hover:opacity-100 transition-opacity duration-500"
    >
      <div class="flex animate-marquee whitespace-nowrap gap-3">
        <!-- Loop -->
        {#each [...lakehouseTech, ...lakehouseTech] as item}
          <!-- CYAN TECH CARD -->
          <div
            class="group/card relative flex items-center gap-3 px-4 py-2 rounded-lg border border-cyan-500/10 bg-cyan-950/20 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/50 hover:bg-cyan-900/40 cursor-pointer min-w-[180px]"
          >
            <div
              class="text-cyan-500/70 group-hover/card:text-cyan-400 transition-colors"
            >
              <svelte:component this={item.icon} size={16} strokeWidth={1.5} />
            </div>

            <div class="flex flex-col">
              <span
                class="text-xs font-bold text-cyan-100/80 group-hover/card:text-cyan-100 transition-colors"
              >
                {item.name}
              </span>
              <span
                class="text-[9px] text-cyan-500/50 font-mono uppercase tracking-wider"
              >
                {item.desc}
              </span>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>

<style>
  /* Marquee Logic */
  .mask-gradient {
    mask-image: linear-gradient(
      to right,
      transparent,
      black 5%,
      black 95%,
      transparent
    );
    -webkit-mask-image: linear-gradient(
      to right,
      transparent,
      black 5%,
      black 95%,
      transparent
    );
  }

  .animate-marquee {
    animation: marquee 20s linear infinite;
  }

  .animate-marquee:hover {
    animation-play-state: paused;
  }

  @keyframes marquee {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
</style>
