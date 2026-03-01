<!-- src/lib/components/home/warehouse/WarehouseContent.svelte -->
<script lang="ts">
  import {
    Database,
    Table,
    Zap,
    FileJson,
    AreaChart,
    Binary,
    LayoutDashboard,
    Key,
    Terminal,
  } from "lucide-svelte";

  // WAREHOUSE FEATURES
  const warehouseFeatures = [
    { name: "Structured Data", icon: Database, desc: "Optimized Schemas" },
    { name: "Columnar Store", icon: Table, desc: "Redshift / Snowflake" },
    { name: "High Performance", icon: Zap, desc: "Sub-second Latency" },
    { name: "Semi-Structured", icon: FileJson, desc: "SUPER / Variant" },
    { name: "Materialized Views", icon: AreaChart, desc: "Pre-computed" },
    { name: "Vectorized Exec", icon: Binary, desc: "SIMD Processing" },
    { name: "BI Integration", icon: LayoutDashboard, desc: "Direct Reporting" },
    { name: "RBAC Security", icon: Key, desc: "Row Level Access" },
  ];
</script>

<div class="relative w-full z-20 flex flex-col h-full justify-between">
  <!-- 1. HEADER SECTION -->
  <div class="mb-8">
    <!-- Status Badge -->
    <div
      class="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5"
    >
      <Database size={12} class="text-purple-500 animate-pulse" />
      <span
        class="font-mono text-[10px] font-bold text-purple-500 tracking-widest uppercase"
      >
        Analytics Serving Layer
      </span>
    </div>

    <!-- Headline -->
    <h3 class="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
      Enterprise Data<br />
      <span
        class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400"
        >Warehouse.</span
      >
    </h3>

    <!-- Bio -->
    <p
      class="text-muted-foreground text-sm lg:text-base leading-relaxed mb-8 max-w-sm"
    >
      Designed a unified source of truth for Finance & Business analytics on <span
        class="text-foreground font-medium">Amazon Redshift</span
      >. Automated ETL workflows with DBT, reducing manual reporting effort by
      <strong>80%</strong>.
    </p>

    <!-- Action -->
    <a
      href="/projects/enterprise-data-warehouse"
      class="group inline-flex items-center gap-2 text-sm font-mono font-semibold text-purple-500 hover:text-purple-300 transition-colors"
    >
      <span
        class="border-b border-purple-500/30 pb-0.5 group-hover:border-purple-300 transition-colors"
        >EXPLORE_WAREHOUSE</span
      >
      <Terminal
        size={14}
        class="group-hover:translate-x-1 transition-transform"
      />
    </a>
  </div>

  <!-- 2. HIGH-IMPACT PURPLE MARQUEE -->
  <div
    class="w-full mt-auto pt-4 border-t border-white/5 mx-[-2rem] px-[2rem] w-[calc(100%+4rem)] overflow-hidden"
  >
    <div class="mb-3 flex items-center gap-2">
      <span
        class="text-[10px] font-mono text-purple-500/70 uppercase tracking-widest font-bold"
      >
        Warehouse Capabilities
      </span>
      <div
        class="h-px flex-1 bg-gradient-to-r from-purple-500/20 to-transparent"
      ></div>
    </div>

    <!-- Infinite Scroll Track -->
    <div
      class="relative w-full mask-gradient py-2 opacity-70 group-hover:opacity-100 transition-opacity duration-500"
    >
      <div class="flex animate-marquee whitespace-nowrap gap-3">
        <!-- Loop -->
        {#each [...warehouseFeatures, ...warehouseFeatures] as item}
          <!-- PURPLE TECH CARD -->
          <div
            class="group/card relative flex items-center gap-3 px-4 py-2 rounded-lg border border-purple-500/10 bg-purple-950/20 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/50 hover:bg-purple-900/40 cursor-pointer min-w-[180px]"
          >
            <div
              class="text-purple-500/70 group-hover/card:text-purple-400 transition-colors"
            >
              <svelte:component this={item.icon} size={16} strokeWidth={1.5} />
            </div>

            <div class="flex flex-col">
              <span
                class="text-xs font-bold text-purple-100/80 group-hover/card:text-purple-100 transition-colors"
              >
                {item.name}
              </span>
              <span
                class="text-[9px] text-purple-500/50 font-mono uppercase tracking-wider"
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
