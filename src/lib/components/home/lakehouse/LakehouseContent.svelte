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

<div
  class="relative w-full h-[100dvh] overflow-hidden pointer-events-none z-20"
>
  <GlowAccent color="#3b82f6" position="top-[30%] left-[10%]" />

  <div
    class="absolute top-[15%] md:top-[20%] right-[5%] md:right-[10%] w-full max-w-sm md:max-w-xl lg:max-w-2xl lg:w-[45%] flex flex-col gap-4"
  >
    <!-- PRIMARY NARRATIVE -->
    <GlassPanel
      glow="#06b6d4"
      className="pointer-events-auto w-full p-6 lg:p-8"
    >
      <div class="mb-6 flex items-center gap-3">
        <StatusBadge color="#06b6d4" label="Transactional Data Layer" />
      </div>

      <h3
        class="text-3xl lg:text-4xl font-black mb-4 leading-tight text-white tracking-tight"
      >
        Bringing Order To <br />
        <span
          class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-blue-500"
        >
          The Ocean.
        </span>
      </h3>

      <p class="text-sm text-muted-foreground leading-relaxed mb-6">
        I build decentralized <strong class="text-white">Data Mesh</strong>
        architectures bringing warehouse-level ACID transactions directly to the
        data lake using
        <span class="text-blue-300 font-medium">Apache Iceberg</span> and
        <span class="text-blue-300 font-medium">Delta Lake</span>, eliminating
        fragile ETL silos.
      </p>

      <div class="flex items-center gap-4 border-t border-white/10 pt-6">
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
    <GlassPanel className="pointer-events-auto w-full p-5 lg:p-6">
      <div class="flex items-center justify-between mb-4 opacity-70">
        <div class="flex items-center gap-2">
          <Layers size={14} class="text-blue-400" />
          <span
            class="font-mono text-[10px] uppercase tracking-widest text-blue-400"
            >Foundation Layer</span
          >
        </div>
        <div class="w-1.5 h-1.5 rounded-full bg-blue-500/50"></div>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
        {#each lakehouseTech as tech}
          <div
            class="flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors"
          >
            <svelte:component
              this={tech.icon}
              size={14}
              class="text-blue-400"
            />
            <span class="font-mono text-[10px] text-white/80">{tech.name}</span>
          </div>
        {/each}
      </div>
    </GlassPanel>
  </div>
</div>
