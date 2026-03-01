<!-- src/lib/components/home/datalake/DataLakeContent.svelte -->
<script lang="ts">
  import {
    Database,
    HardDrive,
    Lock,
    FileJson,
    Archive,
    ShieldCheck,
    Layers,
    Scale,
    CloudCog,
    Search,
  } from "lucide-svelte";

  // STORAGE TECH STACK (Lucide Icons for consistency & scale)
  const lakeTech = [
    { name: "Amazon S3", icon: HardDrive, desc: "Object Store" },
    { name: "Intelligent Tiering", icon: Layers, desc: "Cost Optimization" },
    { name: "Glacier Archive", icon: Archive, desc: "Cold Storage" },
    { name: "Lifecycle Rules", icon: Scale, desc: "Auto Archiving" },
    { name: "Object Lock", icon: Lock, desc: "Immutability" },
    { name: "Glue Crawler", icon: Search, desc: "Discovery" },
    { name: "Parquet/Avro", icon: FileJson, desc: "Columnar Data" },
    { name: "Encryption", icon: ShieldCheck, desc: "SSE-KMS" },
    { name: "S3 Batch", icon: CloudCog, desc: "Bulk Ops" },
  ];
</script>

<div
  class="relative w-full z-20 pointer-events-auto flex flex-col items-start text-left"
>
  <div class="max-w-xl lg:pl-12 relative w-full">
    <!-- DECORATIVE LINES -->
    <div
      class="hidden lg:block absolute left-0 top-2 bottom-4 w-px bg-gradient-to-b from-emerald-500/50 to-transparent"
    ></div>
    <div
      class="hidden lg:block absolute left-[-0.65rem] top-2 text-emerald-500/40"
    >
      <Database size={14} />
    </div>

    <!-- 1. HEADER (Unchanged) -->
    <div class="mb-8">
      <div class="mb-4 flex items-center gap-3">
        <div
          class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-sm shadow-[0_0_10px_rgba(16,185,129,0.1)]"
        >
          <span class="relative flex h-1.5 w-1.5">
            <span
              class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
            ></span>
            <span
              class="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"
            ></span>
          </span>
          <span
            class="font-mono text-[10px] font-semibold text-emerald-200 tracking-widest uppercase"
          >
            Raw Storage Foundation
          </span>
        </div>
      </div>

      <h3 class="main-title mb-6">
        The Central Data <br />
        <span
          class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 bg-300% animate-gradient"
        >
          Reservoir.
        </span>
      </h3>

      <p class="sub-title max-w-lg text-muted-foreground leading-relaxed">
        I architect limitless, secure data lakes that serve as the single source
        of truth. Leveraging <strong>cost-efficient tiered storage</strong> with
        <span class="text-foreground font-medium">S3 Intelligent-Tiering</span>
        and
        <span class="text-foreground font-medium">Glacier</span>, every byte is
        cataloged, governed, and ready for downstream processing.
      </p>
    </div>

    <!-- 2. HIGH-IMPACT EMERALD MARQUEE -->
    <div class="w-full -ml-4 lg:ml-0 overflow-visible">
      <div class="mb-3 pl-4 lg:pl-0 flex items-center gap-2">
        <span
          class="text-[10px] font-mono text-emerald-500 uppercase tracking-widest font-bold glow-text"
        >
          Storage Ecosystem
        </span>
        <div
          class="h-px flex-1 bg-gradient-to-r from-emerald-500/50 to-transparent"
        ></div>
      </div>

      <!-- Infinite Scroll Track -->
      <div class="relative w-full overflow-hidden mask-gradient py-4">
        <div class="flex animate-marquee whitespace-nowrap gap-4">
          <!-- Loop -->
          {#each [...lakeTech, ...lakeTech] as item}
            <!-- EMERALD TECH CARD -->
            <div
              class="group relative flex items-center gap-3 px-5 py-3 rounded-lg border border-emerald-500/20 bg-emerald-950/40 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-emerald-400 hover:bg-emerald-900/60 hover:shadow-[0_0_20px_-5px_rgba(52,211,153,0.4)] cursor-pointer min-w-[200px]"
            >
              <!-- Icon Box with Glow -->
              <div
                class="relative flex items-center justify-center w-10 h-10 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:text-emerald-200 group-hover:bg-emerald-500/20 group-hover:border-emerald-400 transition-all duration-300 shadow-[0_0_10px_rgba(16,185,129,0.1)] group-hover:shadow-[0_0_15px_rgba(52,211,153,0.4)]"
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
                  class="text-sm font-bold text-emerald-100 group-hover:text-white transition-colors tracking-wide"
                >
                  {item.name}
                </span>
                <span
                  class="text-[10px] text-emerald-400/70 group-hover:text-emerald-300 font-mono uppercase tracking-wider"
                >
                  {item.desc}
                </span>
              </div>

              <!-- Animated Scanline Overlay -->
              <div
                class="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-emerald-400/5 to-transparent -translate-x-full group-hover:animate-scanline pointer-events-none"
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
    text-shadow: 0 0 10px rgba(16, 185, 129, 0.4);
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
    animation: marquee 25s linear infinite; /* FASTER SPEED */
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
