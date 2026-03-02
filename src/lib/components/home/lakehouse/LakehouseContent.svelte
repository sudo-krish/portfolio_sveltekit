<!-- src/lib/components/home/lakehouse/LakehouseContent.svelte -->
<script lang="ts">
  import {
    Layers,
    Box,
    Table2,
    ShieldAlert,
    GitBranch,
    History,
  } from "lucide-svelte";
  import { onMount } from "svelte";
  import gsap from "gsap";
  import GlassPanel from "$lib/components/ui/GlassPanel.svelte";
  import StatusBadge from "$lib/components/ui/StatusBadge.svelte";
  import GlowAccent from "$lib/components/ui/GlowAccent.svelte";
  import MobileCarousel from "$lib/components/ui/MobileCarousel.svelte";
  import CtaLink from "$lib/components/ui/CtaLink.svelte";

  const lakehouseTech = [
    { name: "Apache Iceberg", icon: Box },
    { name: "Delta Lake", icon: Layers },
    { name: "Lake Formation", icon: ShieldAlert },
    { name: "Data Mesh", icon: GitBranch },
    { name: "Time Travel", icon: History },
    { name: "Schema Evo", icon: Table2 },
  ];

  onMount(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        ".lakehouse-bento-wrapper",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.1 },
      );
    });
    return () => ctx.revert();
  });
</script>

<MobileCarousel
  layout="right"
  sectionTitle="Lakehouse"
  sectionDescription="Discover the Transactional Data Layer"
  accentColor="#06b6d4"
>
  <!-- DESKTOP / TABLET (Original Preserved floating layout) -->
  <svelte:fragment slot="content-pc">
    <GlowAccent color="#3b82f6" position="top-[30%] left-[10%]" />

    <!-- MAIN CONTENT CARD (RIGHT SIDE PC) -->
    <div
      class="absolute top-[20%] right-[8%] w-full max-w-xl z-20 pointer-events-auto"
    >
      <!-- PRIMARY NARRATIVE -->
      <GlassPanel
        glow="#06b6d4"
        className="w-full max-w-lg lg:max-w-xl p-8 rounded-3xl z-10"
      >
        <div class="mb-6 flex items-center gap-4">
          <StatusBadge color="#06b6d4" label="Transactional Data Layer" />
        </div>

        <h3
          class="text-4xl lg:text-5xl font-black mb-6 leading-[1.1] text-white tracking-tighter"
        >
          Bringing Order To <br />
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-blue-500"
            >The Ocean.</span
          >
        </h3>

        <p
          class="text-base lg:text-lg text-white/70 leading-relaxed font-light mb-8"
        >
          I build decentralized <strong class="text-white font-medium"
            >Data Mesh</strong
          >
          architectures bringing warehouse-level ACID transactions directly to the
          data lake using
          <span class="text-blue-300 font-medium tracking-wide"
            >Apache Iceberg</span
          >
          and
          <span class="text-blue-300 font-medium tracking-wide">Delta Lake</span
          >, eliminating fragile ETL silos.
        </p>

        <div class="flex items-center gap-6 border-t border-white/10 pt-6">
          <div class="flex-1">
            <div
              class="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-1"
            >
              Architecture
            </div>
            <div class="text-sm font-semibold text-white">Data Mesh Ready</div>
          </div>
          <div class="w-px h-8 bg-white/10"></div>
          <div class="flex-1">
            <div
              class="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-1"
            >
              Performance
            </div>
            <div class="text-sm font-semibold text-white">Sub-second Query</div>
          </div>
        </div>
      </GlassPanel>

      <!-- TECH STACK -->
      <GlassPanel
        className="w-full p-6 mt-6 rounded-3xl relative overflow-hidden"
      >
        <div class="flex items-center justify-between mb-6 opacity-70">
          <div class="flex items-center gap-2 relative z-10">
            <Layers size={14} class="text-blue-400" />
            <span
              class="font-mono text-[10px] uppercase tracking-[0.2em] font-bold text-white/50"
              >Foundation Layer</span
            >
          </div>
          <div
            class="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)] relative z-10"
          ></div>
        </div>

        <div class="grid grid-cols-2 lg:grid-cols-3 gap-3 relative z-10">
          {#each lakehouseTech as tech}
            <div
              class="flex items-center gap-3 p-3 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300"
            >
              <svelte:component
                this={tech.icon}
                size={16}
                class="text-blue-400"
              />
              <span
                class="font-mono text-[11px] font-bold text-white/80 tracking-wide"
                >{tech.name}</span
              >
            </div>
          {/each}
        </div>

        <div class="mt-8 relative z-10">
          <CtaLink
            href="#certifications"
            label="View Certifications"
            color="#06b6d4"
          />
        </div>
      </GlassPanel>
    </div>
  </svelte:fragment>

  <!-- MOBILE / SMALL TABLET (Carousel Slide Layout) -->
  <svelte:fragment slot="content-mobile">
    <div class="z-20 w-full max-w-lg mx-auto pointer-events-auto mt-4">
      <!-- PRIMARY NARRATIVE -->
      <GlassPanel glow="#06b6d4" className="w-full p-6 sm:p-8 rounded-3xl z-10">
        <div class="mb-5 flex items-center gap-3">
          <StatusBadge color="#06b6d4" label="Transactional Data Layer" />
        </div>

        <h3
          class="text-3xl sm:text-4xl font-black mb-4 leading-[1.15] text-white tracking-tighter"
        >
          Bringing Order To <br />
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-blue-500"
            >The Ocean.</span
          >
        </h3>

        <p
          class="text-sm sm:text-base text-white/70 leading-relaxed font-light mb-6"
        >
          I build decentralized <strong class="text-white font-medium"
            >Data Mesh</strong
          >
          architectures bringing warehouse-level ACID transactions directly to the
          data lake using
          <span class="text-blue-300 font-medium tracking-wide"
            >Apache Iceberg</span
          >
          and
          <span class="text-blue-300 font-medium tracking-wide">Delta Lake</span
          >, eliminating fragile ETL silos.
        </p>

        <div
          class="flex items-center gap-4 border-t border-white/10 pt-4 lg:pt-6"
        >
          <div class="flex-1">
            <div
              class="font-mono text-[9px] sm:text-[10px] text-muted-foreground uppercase tracking-widest mb-1"
            >
              Architecture
            </div>
            <div class="text-xs sm:text-sm font-semibold text-white">
              Data Mesh Ready
            </div>
          </div>
          <div class="w-px h-8 bg-white/10"></div>
          <div class="flex-1">
            <div
              class="font-mono text-[9px] sm:text-[10px] text-muted-foreground uppercase tracking-widest mb-1"
            >
              Performance
            </div>
            <div class="text-xs sm:text-sm font-semibold text-white">
              Sub-second Query
            </div>
          </div>
        </div>
      </GlassPanel>

      <!-- TECH STACK -->
      <GlassPanel
        className="w-full p-6 mt-6 rounded-3xl relative overflow-hidden"
      >
        <div class="flex items-center justify-between mb-6 opacity-70">
          <div class="flex items-center gap-2 relative z-10">
            <Layers size={14} class="text-blue-400" />
            <span
              class="font-mono text-[10px] uppercase tracking-[0.2em] font-bold text-white/50"
              >Foundation Layer</span
            >
          </div>
          <div
            class="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)] relative z-10"
          ></div>
        </div>

        <div class="grid grid-cols-2 gap-3 relative z-10">
          {#each lakehouseTech as tech}
            <div
              class="flex items-center gap-3 p-3 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300"
            >
              <svelte:component
                this={tech.icon}
                size={16}
                class="text-blue-400"
              />
              <span
                class="font-mono text-[11px] font-bold text-white/80 tracking-wide"
                >{tech.name}</span
              >
            </div>
          {/each}
        </div>

        <div class="mt-8 relative z-10">
          <CtaLink
            href="#certifications"
            label="View Certifications"
            color="#06b6d4"
          />
        </div>
      </GlassPanel>
    </div>
  </svelte:fragment>
</MobileCarousel>
