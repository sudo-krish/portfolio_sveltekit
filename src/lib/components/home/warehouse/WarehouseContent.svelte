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
  } from "lucide-svelte";

  // WAREHOUSE FEATURES (Expanded slightly for Marquee flow)
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

<div
  class="relative w-full z-20 pointer-events-auto flex flex-col items-start text-left"
>
  <div class="max-w-xl lg:pl-12 relative w-full">
    <!-- DECORATIVE LINES (Purple/Violet Theme) -->
    <div
      class="hidden lg:block absolute left-0 top-2 bottom-4 w-px bg-gradient-to-b from-purple-500/50 to-transparent"
    ></div>
    <div
      class="hidden lg:block absolute left-[-0.65rem] top-2 text-purple-500/40"
    >
      <Database size={14} />
    </div>

    <!-- 1. HEADER SECTION -->
    <div class="mb-8">
      <!-- Status Badge -->
      <div class="mb-4 flex items-center gap-3">
        <div
          class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-sm shadow-[0_0_10px_rgba(168,85,247,0.1)]"
        >
          <span class="relative flex h-1.5 w-1.5">
            <span
              class="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"
            ></span>
            <span
              class="relative inline-flex rounded-full h-1.5 w-1.5 bg-purple-500"
            ></span>
          </span>
          <span
            class="font-mono text-[10px] font-semibold text-purple-200 tracking-widest uppercase"
          >
            Analytics Serving Engine
          </span>
        </div>
      </div>

      <!-- Headline -->
      <h3 class="main-title mb-6">
        The Refined Analytics <br />
        <span
          class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-300% animate-gradient"
        >
          Engine.
        </span>
      </h3>

      <!-- Bio -->
      <p class="sub-title max-w-lg text-muted-foreground leading-relaxed">
        The final, refined product. I design high-performance data warehouses
        that serve
        <strong>sub-second latency</strong> analytics using advanced
        <span class="text-foreground font-medium">columnar compression</span>
        and
        <span class="text-foreground font-medium">materialized views</span>,
        powering real-time BI dashboards at enterprise scale.
      </p>
    </div>

    <!-- 2. HIGH-IMPACT PURPLE MARQUEE -->
    <div class="w-full -ml-4 lg:ml-0 overflow-visible">
      <div class="mb-3 pl-4 lg:pl-0 flex items-center gap-2">
        <span
          class="text-[10px] font-mono text-purple-500 uppercase tracking-widest font-bold glow-text"
        >
          Warehouse Capabilities
        </span>
        <div
          class="h-px flex-1 bg-gradient-to-r from-purple-500/50 to-transparent"
        ></div>
      </div>

      <!-- Infinite Scroll Track -->
      <div class="relative w-full overflow-hidden mask-gradient py-4">
        <div class="flex animate-marquee whitespace-nowrap gap-4">
          <!-- Loop (Duplicated to ensure length) -->
          {#each [...warehouseFeatures, ...warehouseFeatures] as item}
            <!-- PURPLE TECH CARD -->
            <div
              class="group relative flex items-center gap-3 px-5 py-3 rounded-lg border border-purple-500/20 bg-purple-950/40 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-purple-400 hover:bg-purple-900/60 hover:shadow-[0_0_20px_-5px_rgba(168,85,247,0.4)] cursor-pointer min-w-[200px]"
            >
              <!-- Icon Box with Glow -->
              <div
                class="relative flex items-center justify-center w-10 h-10 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-400 group-hover:text-purple-200 group-hover:bg-purple-500/20 group-hover:border-purple-400 transition-all duration-300 shadow-[0_0_10px_rgba(168,85,247,0.1)] group-hover:shadow-[0_0_15px_rgba(168,85,247,0.4)]"
              >
                <svelte:component
                  this={item.icon}
                  size={20}
                  strokeWidth={1.5}
                />
              </div>

              <!-- Text Info -->
              <div class="flex flex-col">
                <span
                  class="text-sm font-bold text-purple-100 group-hover:text-white transition-colors tracking-wide"
                >
                  {item.name}
                </span>
                <span
                  class="text-[10px] text-purple-400/70 group-hover:text-purple-300 font-mono uppercase tracking-wider"
                >
                  {item.desc}
                </span>
              </div>

              <!-- Animated Scanline Overlay -->
              <div
                class="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-purple-400/5 to-transparent -translate-x-full group-hover:animate-scanline pointer-events-none"
              ></div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  /* Typography */
  .main-title {
    font-size: clamp(2rem, 3.5vw, 3rem);
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: hsl(var(--foreground));
  }

  .sub-title {
    font-size: clamp(0.95rem, 1vw, 1.05rem);
    line-height: 1.6;
    color: hsl(var(--muted-foreground));
  }

  .glow-text {
    text-shadow: 0 0 10px rgba(168, 85, 247, 0.4);
  }

  /* Gradient Animation */
  .bg-300\% {
    background-size: 300% 300%;
  }
  .animate-gradient {
    animation: animatedgradient 6s ease infinite alternate;
  }

  @keyframes animatedgradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

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
    animation: marquee 25s linear infinite;
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

  /* Scanline Effect */
  @keyframes scanline {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
  .group:hover .group-hover\:animate-scanline {
    animation: scanline 1s ease-in-out;
  }
</style>
