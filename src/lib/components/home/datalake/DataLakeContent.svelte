<!-- src/lib/components/home/datalake/DataLakeContent.svelte -->
<script lang="ts">
  import {
    HardDrive,
    Lock,
    FileJson,
    Archive,
    Search,
    Layers,
  } from "lucide-svelte";
  import { onMount } from "svelte";
  import gsap from "gsap";
  import GlassPanel from "$lib/components/ui/GlassPanel.svelte";
  import StatusBadge from "$lib/components/ui/StatusBadge.svelte";
  import GlowAccent from "$lib/components/ui/GlowAccent.svelte";

  const lakeTech = [
    { name: "Amazon S3", icon: HardDrive, desc: "Object Store" },
    { name: "Intelligent Tiering", icon: Layers, desc: "Cost Optimization" },
    { name: "Glacier Archive", icon: Archive, desc: "Cold Storage" },
    { name: "Object Lock", icon: Lock, desc: "Immutability" },
    { name: "Glue Crawler", icon: Search, desc: "Discovery" },
    { name: "Parquet/Avro", icon: FileJson, desc: "Columnar Data" },
  ];

  onMount(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        ".lake-panel",
        { y: 50, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
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
    color="#10b981"
    position="top-0 left-1/2 -translate-x-1/2"
    size={600}
    opacity={0.1}
  />

  <!-- CENTER-TOP STORAGE CONSOLE -->
  <GlassPanel
    glow="#10b981"
    className="lake-panel absolute top-[12%] md:top-[15%] left-[5%] right-[5%] max-w-4xl mx-auto pointer-events-auto p-6 lg:p-8 flex flex-col lg:flex-row gap-8 items-center shadow-emerald-500/10 ring-1 ring-white/10"
  >
    <!-- Left: Narrative -->
    <div class="flex-1 w-full">
      <div class="mb-4 flex items-center gap-3">
        <StatusBadge color="#10b981" label="Raw Storage Foundation" />
      </div>

      <h3
        class="text-3xl font-black mb-3 leading-tight text-white tracking-tight"
      >
        The Central Data <br />
        <span
          class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500"
        >
          Reservoir.
        </span>
      </h3>

      <p class="text-sm text-muted-foreground leading-relaxed max-w-md">
        I architect limitless, secure data lakes designed for petabyte-scale
        aggregation. By meticulously configuring <strong
          class="text-emerald-100">intelligent tiering</strong
        >
        and <span class="text-emerald-300">Iceberg tables</span>, every byte is
        cataloged, cost-optimized, and instantly queryable.
      </p>
    </div>

    <!-- Right: Storage Nodes Grid -->
    <div class="w-full lg:w-[500px] grid grid-cols-2 sm:grid-cols-3 gap-3">
      {#each lakeTech as tech}
        <div
          class="group border border-white/5 bg-white/5 hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all duration-300 rounded-xl p-3 flex flex-col gap-2 relative overflow-hidden"
        >
          <div
            class="absolute -top-10 -right-10 w-20 h-20 bg-emerald-500/10 blur-xl group-hover:bg-emerald-500/30 transition-all rounded-full"
          ></div>
          <svelte:component
            this={tech.icon}
            size={16}
            class="text-emerald-400"
          />
          <div>
            <div
              class="font-mono text-[11px] font-bold text-white tracking-wide"
            >
              {tech.name}
            </div>
            <div class="text-[9px] text-muted-foreground uppercase">
              {tech.desc}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </GlassPanel>
</div>
