<!-- src/lib/components/home/warehouse/WarehouseContent.svelte -->
<script lang="ts">
  import { TerminalSquare, BarChart3 } from "lucide-svelte";
  import { onMount } from "svelte";
  import gsap from "gsap";
  import GlassPanel from "$lib/components/ui/GlassPanel.svelte";
  import StatusBadge from "$lib/components/ui/StatusBadge.svelte";
  import GlowAccent from "$lib/components/ui/GlowAccent.svelte";

  onMount(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        ".warehouse-panel",
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.1,
        },
      );
    });
    return () => ctx.revert();
  });
</script>

<div
  class="relative w-full h-[100dvh] overflow-hidden pointer-events-none z-20"
>
  <GlowAccent
    color="#a855f7"
    position="top-[10%] right-[15%]"
    size={400}
    opacity={0.15}
  />

  <div
    class="absolute top-[15%] md:top-[20%] left-[5%] md:left-[10%] w-full max-w-sm md:max-w-xl lg:max-w-2xl lg:w-[45%] grid grid-cols-1 lg:grid-cols-3 gap-4"
  >
    <!-- MAIN NARRATIVE (spans 2 cols) -->
    <GlassPanel
      glow="#a855f7"
      className="warehouse-panel lg:col-span-2 pointer-events-auto w-full p-8 flex flex-col justify-center"
    >
      <div class="mb-6 flex items-center gap-3">
        <StatusBadge color="#a855f7" label="Analytics Serving Engine" />
      </div>

      <h3
        class="text-3xl lg:text-5xl font-black mb-4 leading-tight text-white tracking-tight"
      >
        The Refined Analytics <br />
        <span
          class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500"
        >
          Engine.
        </span>
      </h3>

      <p class="text-sm text-muted-foreground leading-relaxed shadow-sm">
        The final, refined product. I design high-performance data warehouses
        that serve
        <strong class="text-white">sub-second latency</strong> analytics using
        advanced
        <span class="text-purple-300 font-medium">columnar compression</span>
        and
        <span class="text-purple-300 font-medium">materialized views</span>.
      </p>
    </GlassPanel>

    <!-- METRICS -->
    <GlassPanel
      className="warehouse-panel pointer-events-auto p-6 flex flex-col justify-between"
    >
      <div class="flex items-center gap-2 mb-4 opacity-70">
        <BarChart3 size={16} class="text-pink-400" />
        <span
          class="font-mono text-[10px] uppercase tracking-widest text-pink-400"
          >BI Layer</span
        >
      </div>
      <div class="space-y-4">
        <div>
          <div
            class="text-[10px] text-muted-foreground uppercase font-mono mb-1"
          >
            Query Latency
          </div>
          <div class="text-2xl font-black text-white flex items-baseline gap-1">
            0.24<span class="text-sm text-purple-400">s</span>
          </div>
        </div>
        <div class="w-full h-px bg-white/10"></div>
        <div>
          <div
            class="text-[10px] text-muted-foreground uppercase font-mono mb-1"
          >
            Concurrency
          </div>
          <div class="text-2xl font-black text-white flex items-baseline gap-1">
            10<span class="text-sm text-purple-400">k+</span>
          </div>
        </div>
      </div>
    </GlassPanel>

    <!-- SQL TERMINAL -->
    <GlassPanel
      className="warehouse-panel lg:col-span-3 pointer-events-auto p-5"
    >
      <div
        class="flex items-center justify-between mb-3 border-b border-white/5 pb-3"
      >
        <div class="flex items-center gap-2">
          <TerminalSquare size={14} class="text-muted-foreground" />
          <span
            class="font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
            >SQL Execution</span
          >
        </div>
        <div class="flex gap-1.5">
          <div class="w-2 h-2 rounded-full bg-white/20"></div>
          <div class="w-2 h-2 rounded-full bg-white/20"></div>
          <div class="w-2 h-2 rounded-full bg-purple-500"></div>
        </div>
      </div>
      <div class="font-mono text-xs text-purple-300/80 leading-relaxed">
        <span class="text-pink-400">SELECT</span> DATE_TRUNC('hour', event_time)
        <span class="text-pink-400">AS</span>
        ts,<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;COUNT(DISTINCT user_id)
        <span class="text-pink-400">AS</span>
        active_users,<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SUM(revenue)
        <span class="text-pink-400">AS</span>
        total_volume<br />
        <span class="text-pink-400">FROM</span> core_events.user_activity<br />
        <span class="text-pink-400">WHERE</span> event_type = 'purchase'<br />
        <span class="text-pink-400">GROUP BY</span> 1
        <span class="text-pink-400">ORDER BY</span> 1 DESC;
      </div>
    </GlassPanel>
  </div>
</div>
