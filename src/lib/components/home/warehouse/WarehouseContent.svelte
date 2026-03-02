<!-- src/lib/components/home/warehouse/WarehouseContent.svelte -->
<script lang="ts">
  import { TerminalSquare, BarChart3 } from "lucide-svelte";
  import { onMount } from "svelte";
  import gsap from "gsap";
  import GlassPanel from "$lib/components/ui/GlassPanel.svelte";
  import StatusBadge from "$lib/components/ui/StatusBadge.svelte";
  import GlowAccent from "$lib/components/ui/GlowAccent.svelte";
  import MobileCarousel from "$lib/components/ui/MobileCarousel.svelte";

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

<MobileCarousel
  layout="left"
  sectionTitle="Data Warehouse"
  sectionDescription="Explore the Analytics Engine"
  accentColor="#a855f7"
>
  <!-- DESKTOP / TABLET (Original Preserved floating layout) -->
  <svelte:fragment slot="content-pc">
    <GlowAccent
      color="#a855f7"
      position="top-[10%] right-[15%]"
      size={400}
      opacity={0.15}
    />

    <!-- MAIN CONTENT CARD (LEFT SIDE PC) -->
    <div
      class="absolute top-[20%] left-[8%] w-full max-w-xl z-20 pointer-events-auto flex flex-col gap-4"
    >
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <!-- MAIN NARRATIVE (spans 2 cols) -->
        <GlassPanel
          glow="#a855f7"
          className="warehouse-panel sm:col-span-2 w-full p-8 lg:p-10 flex flex-col justify-center rounded-3xl z-10"
        >
          <div class="mb-6 flex items-center gap-4">
            <StatusBadge color="#a855f7" label="Analytics Serving Engine" />
          </div>

          <h3
            class="text-4xl lg:text-5xl font-black mb-6 leading-[1.1] text-white tracking-tighter"
          >
            The Refined Analytics <br />
            <span
              class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500"
              >Engine.</span
            >
          </h3>

          <p
            class="text-base lg:text-lg text-white/70 leading-relaxed font-light mb-2"
          >
            The final, refined product. I design high-performance data
            warehouses that serve
            <strong class="text-white font-medium">sub-second latency</strong>
            analytics using advanced
            <span class="text-purple-300 font-medium tracking-wide"
              >columnar compression</span
            >
            and
            <span class="text-purple-300 font-medium tracking-wide"
              >materialized views</span
            >.
          </p>
        </GlassPanel>

        <!-- METRICS -->
        <GlassPanel
          className="warehouse-panel w-full p-6 lg:p-8 flex flex-col justify-between rounded-3xl relative overflow-hidden"
        >
          <!-- Ambient inner glow -->
          <div
            class="absolute -bottom-6 -right-6 w-32 h-32 bg-pink-500/10 blur-[40px] rounded-full pointer-events-none mix-blend-screen"
          ></div>

          <div class="flex items-center gap-2 mb-6 opacity-80 relative z-10">
            <BarChart3 size={16} class="text-pink-400" />
            <span
              class="font-mono text-[11px] uppercase tracking-[0.2em] font-bold text-pink-400/80"
              >BI Layer</span
            >
          </div>
          <div class="space-y-6 relative z-10">
            <div>
              <div
                class="text-[11px] text-white/40 uppercase font-mono tracking-wider mb-2"
              >
                Query Latency
              </div>
              <div
                class="text-3xl font-black text-white flex items-baseline gap-1"
              >
                0.24<span class="text-base text-purple-400/80 font-semibold"
                  >s</span
                >
              </div>
            </div>
            <div class="w-full h-px bg-white/10"></div>
            <div>
              <div
                class="text-[11px] text-white/40 uppercase font-mono tracking-wider mb-2"
              >
                Concurrency
              </div>
              <div
                class="text-3xl font-black text-white flex items-baseline gap-1"
              >
                10<span class="text-base text-purple-400/80 font-semibold"
                  >k+</span
                >
              </div>
            </div>
          </div>
        </GlassPanel>
      </div>

      <!-- SQL TERMINAL -->
      <GlassPanel
        className="warehouse-panel w-full p-6 lg:p-8 rounded-3xl shadow-2xl shadow-purple-900/10"
      >
        <div
          class="flex items-center justify-between mb-4 border-b border-white/[0.06] pb-4"
        >
          <div class="flex items-center gap-2">
            <TerminalSquare size={14} class="text-white/40" />
            <span
              class="font-mono text-[11px] uppercase tracking-[0.2em] font-bold text-white/40"
              >SQL Execution</span
            >
          </div>
          <div class="flex gap-1.5">
            <div
              class="w-2.5 h-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            ></div>
            <div
              class="w-2.5 h-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            ></div>
            <div
              class="w-2.5 h-2.5 rounded-full bg-purple-500/80 shadow-[0_0_8px_rgba(168,85,247,0.6)] animate-pulse"
            ></div>
          </div>
        </div>
        <div
          class="font-mono text-xs sm:text-sm text-purple-200/90 leading-[1.8] overflow-x-auto whitespace-pre no-scrollbar p-2 bg-black/20 rounded-xl border border-white/5"
        >
          <span class="text-pink-400 font-semibold">SELECT</span>
          DATE_TRUNC('hour', event_time)
          <span class="text-pink-400 font-semibold">AS</span>
          ts, COUNT(DISTINCT user_id)
          <span class="text-pink-400 font-semibold">AS</span>
          active_users, SUM(revenue)
          <span class="text-pink-400 font-semibold">AS</span>
          total_volume
          <span class="text-pink-400 font-semibold">FROM</span>
          core_events.user_activity
          <span class="text-pink-400 font-semibold">WHERE</span> event_type =
          'purchase'
          <span class="text-pink-400 font-semibold">GROUP BY</span> 1
          <span class="text-pink-400 font-semibold">ORDER BY</span> 1 DESC;
        </div>
      </GlassPanel>
    </div>
  </svelte:fragment>

  <!-- MOBILE / SMALL TABLET (Carousel Slide Layout) -->
  <svelte:fragment slot="content-mobile">
    <div
      class="z-20 w-full max-w-lg mx-auto pointer-events-auto flex flex-col gap-3 mt-8"
    >
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <!-- MAIN NARRATIVE (spans 2 cols) -->
        <GlassPanel
          glow="#a855f7"
          className="warehouse-panel sm:col-span-2 w-full p-6 sm:p-8 flex flex-col justify-center rounded-3xl z-10"
        >
          <div class="mb-5 flex items-center gap-3">
            <StatusBadge color="#a855f7" label="Analytics Serving Engine" />
          </div>

          <h3
            class="text-3xl sm:text-4xl font-black mb-4 leading-[1.15] text-white tracking-tighter"
          >
            The Refined Analytics <br />
            <span
              class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500"
              >Engine.</span
            >
          </h3>

          <p
            class="text-sm sm:text-base text-white/70 leading-relaxed font-light"
          >
            The final, refined product. I design high-performance data
            warehouses that serve
            <strong class="text-white font-medium">sub-second latency</strong>
            analytics using advanced
            <span class="text-purple-300 font-medium tracking-wide"
              >columnar compression</span
            >
            and
            <span class="text-purple-300 font-medium tracking-wide"
              >materialized views</span
            >.
          </p>
        </GlassPanel>

        <!-- METRICS -->
        <GlassPanel
          className="warehouse-panel w-full p-5 sm:p-6 flex flex-col justify-between rounded-3xl relative overflow-hidden"
        >
          <!-- Ambient inner glow -->
          <div
            class="absolute -bottom-4 -right-4 w-24 h-24 bg-pink-500/10 blur-[30px] rounded-full pointer-events-none mix-blend-screen"
          ></div>

          <div class="flex items-center gap-2 mb-5 opacity-80 relative z-10">
            <BarChart3 size={14} class="text-pink-400" />
            <span
              class="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold text-pink-400/80"
              >BI Layer</span
            >
          </div>
          <div class="space-y-4 sm:space-y-5 relative z-10">
            <div>
              <div
                class="text-[10px] sm:text-[11px] text-white/40 uppercase font-mono tracking-wider mb-1.5"
              >
                Query Latency
              </div>
              <div
                class="text-2xl sm:text-3xl font-black text-white flex items-baseline gap-1"
              >
                0.24<span
                  class="text-sm sm:text-base text-purple-400/80 font-semibold"
                  >s</span
                >
              </div>
            </div>
            <div class="w-full h-px bg-white/10"></div>
            <div>
              <div
                class="text-[10px] sm:text-[11px] text-white/40 uppercase font-mono tracking-wider mb-1.5"
              >
                Concurrency
              </div>
              <div
                class="text-2xl sm:text-3xl font-black text-white flex items-baseline gap-1"
              >
                10<span
                  class="text-sm sm:text-base text-purple-400/80 font-semibold"
                  >k+</span
                >
              </div>
            </div>
          </div>
        </GlassPanel>
      </div>

      <!-- SQL TERMINAL -->
      <GlassPanel
        className="warehouse-panel w-full p-5 lg:p-6 rounded-3xl shadow-xl shadow-purple-900/10"
      >
        <div
          class="flex items-center justify-between mb-4 border-b border-white/[0.06] pb-3"
        >
          <div class="flex items-center gap-2">
            <TerminalSquare size={13} class="text-white/40" />
            <span
              class="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold text-white/40"
              >SQL Execution</span
            >
          </div>
          <div class="flex gap-1.5">
            <div
              class="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            ></div>
            <div
              class="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            ></div>
            <div
              class="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-purple-500/80 shadow-[0_0_8px_rgba(168,85,247,0.6)] animate-pulse"
            ></div>
          </div>
        </div>
        <div
          class="font-mono text-[10px] sm:text-xs text-purple-200/90 leading-[1.7] overflow-x-auto whitespace-pre no-scrollbar p-2.5 bg-black/20 rounded-xl border border-white/5"
        >
          <span class="text-pink-400 font-semibold">SELECT</span>
          DATE_TRUNC('hour', event_time)
          <span class="text-pink-400 font-semibold">AS</span>
          ts, COUNT(DISTINCT user_id)
          <span class="text-pink-400 font-semibold">AS</span>
          active_users, SUM(revenue)
          <span class="text-pink-400 font-semibold">AS</span>
          total_volume
          <span class="text-pink-400 font-semibold">FROM</span>
          core_events.user_activity
          <span class="text-pink-400 font-semibold">WHERE</span> event_type =
          'purchase'
          <span class="text-pink-400 font-semibold">GROUP BY</span> 1
          <span class="text-pink-400 font-semibold">ORDER BY</span> 1 DESC;
        </div>
      </GlassPanel>
    </div>
  </svelte:fragment>
</MobileCarousel>
