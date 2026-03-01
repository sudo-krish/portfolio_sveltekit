<!-- src/lib/components/home/pipeline/PipelineContent.svelte -->
<script lang="ts">
  import { Activity, Terminal } from "lucide-svelte";
  import TechMarquee from "./TechMarquee.svelte";
</script>

<div class="relative w-full z-20 flex flex-col h-full justify-between">
  <!-- 1. HEADER SECTION -->
  <div class="mb-8">
    <!-- Status Badge -->
    <div
      class="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5"
    >
      <Activity size={12} class="text-primary animate-pulse" />
      <span
        class="font-mono text-[10px] font-bold text-primary tracking-widest uppercase"
      >
        Data Ingestion & Streaming
      </span>
    </div>

    <!-- Headline -->
    <h3 class="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
      Real-Time Tracking<br />
      <span class="text-gradient-cyan">Data Platform.</span>
    </h3>

    <!-- Bio -->
    <p
      class="text-muted-foreground text-sm lg:text-base leading-relaxed mb-8 max-w-lg"
    >
      Architected an <span class="text-foreground font-medium"
        >event-driven streaming pipeline</span
      >
      processing <strong>50M+ payload events daily</strong>. Migrated from
      legacy batch, dropping median latency from 4 hours to sub-second.
    </p>

    <!-- Action -->
    <a
      href="/projects/realtime-tracking-platform"
      class="group inline-flex items-center gap-2 text-sm font-mono font-semibold text-primary hover:text-white transition-colors"
    >
      <span
        class="border-b border-primary/30 pb-0.5 group-hover:border-white transition-colors"
        >EXPLORE_ARCHITECTURE</span
      >
      <Terminal
        size={14}
        class="group-hover:translate-x-1 transition-transform"
      />
    </a>
  </div>

  <!-- 2. TECH STACK MARQUEE -->
  <div
    class="w-full mt-auto pt-4 border-t border-white/5 mx-[-2rem] px-[2rem] w-[calc(100%+4rem)] overflow-hidden"
  >
    <div class="mb-3">
      <span
        class="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-widest"
      >
        Core Stack
      </span>
    </div>
    <div
      class="opacity-70 group-hover:opacity-100 transition-opacity duration-500"
    >
      <TechMarquee />
    </div>
  </div>
</div>
