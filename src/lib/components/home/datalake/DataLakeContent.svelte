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
  import MobileCarousel from "$lib/components/ui/MobileCarousel.svelte";
  import CtaLink from "$lib/components/ui/CtaLink.svelte";

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

<MobileCarousel
  layout="left"
  sectionTitle="Data Reservoir"
  sectionDescription="Discover the infinite storage lake"
  accentColor="#10b981"
>
  <!-- DESKTOP / TABLET (Original Preserved floating layout) -->
  <svelte:fragment slot="content-pc">
    <GlowAccent
      color="#10b981"
      position="top-0 left-1/2 -translate-x-1/2"
      size={600}
      opacity={0.1}
    />

    <!-- MAIN CONTENT CARD (LEFT SIDE PC) -->
    <div
      class="absolute top-[20%] left-[8%] w-full max-w-xl z-20 pointer-events-auto"
    >
      <!-- CENTER-TOP STORAGE CONSOLE -->
      <GlassPanel
        glow="#10b981"
        className="lake-panel w-full max-w-lg lg:max-w-xl p-8 rounded-3xl z-10"
      >
        <!-- Narrative -->
        <div class="w-full">
          <div class="mb-6 flex items-center gap-4">
            <StatusBadge color="#10b981" label="Raw Storage Foundation" />
          </div>

          <h3
            class="text-4xl lg:text-5xl font-black mb-6 leading-[1.1] text-white tracking-tighter"
          >
            The Central Data <br />
            <span
              class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500"
              >Reservoir.</span
            >
          </h3>

          <p
            class="text-base lg:text-lg text-white/70 leading-relaxed font-light"
          >
            I architect limitless, secure data lakes designed for petabyte-scale
            aggregation. By meticulously configuring <strong
              class="text-white font-medium">intelligent tiering</strong
            >
            and
            <span class="text-emerald-300 font-medium tracking-wide"
              >Iceberg tables</span
            >, every byte is cataloged, cost-optimized, and instantly queryable.
          </p>
        </div>

        <!-- Storage Nodes Grid -->
        <div class="w-full grid grid-cols-2 sm:grid-cols-3 gap-3">
          {#each lakeTech as tech}
            <div
              class="group border border-white/5 bg-white/5 hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all duration-300 rounded-2xl p-4 flex flex-col gap-3 relative overflow-hidden"
            >
              <div
                class="absolute -top-10 -right-10 w-24 h-24 bg-emerald-500/10 blur-xl group-hover:bg-emerald-500/30 transition-all rounded-full"
              ></div>
              <svelte:component
                this={tech.icon}
                size={18}
                class="text-emerald-400"
              />
              <div>
                <div
                  class="font-mono text-xs font-bold text-white tracking-wide"
                >
                  {tech.name}
                </div>
                <div class="text-[10px] text-white/50 uppercase mt-1">
                  {tech.desc}
                </div>
              </div>
            </div>
          {/each}
        </div>

        <div class="mt-8">
          <CtaLink href="#lakehouse" label="Enter the layer" color="#10b981" />
        </div>
      </GlassPanel>
    </div>
  </svelte:fragment>

  <!-- MOBILE / SMALL TABLET (Carousel Slide Layout) -->
  <svelte:fragment slot="content-mobile">
    <div class="z-20 w-full max-w-lg mx-auto pointer-events-auto mt-4">
      <!-- CENTER-TOP STORAGE CONSOLE -->
      <GlassPanel
        glow="#10b981"
        className="lake-panel w-full p-6 sm:p-8 rounded-3xl z-10"
      >
        <!-- Narrative -->
        <div class="w-full">
          <div class="mb-5 flex items-center gap-3">
            <StatusBadge color="#10b981" label="Raw Storage Foundation" />
          </div>

          <h3
            class="text-3xl sm:text-4xl font-black mb-4 leading-[1.15] text-white tracking-tighter"
          >
            The Central Data <br />
            <span
              class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500"
              >Reservoir.</span
            >
          </h3>

          <p
            class="text-sm sm:text-base text-white/70 leading-relaxed font-light"
          >
            I architect limitless, secure data lakes designed for petabyte-scale
            aggregation. By meticulously configuring <strong
              class="text-white font-medium">intelligent tiering</strong
            >
            and
            <span class="text-emerald-300 font-medium tracking-wide"
              >Iceberg tables</span
            >, every byte is cataloged, cost-optimized, and instantly queryable.
          </p>
        </div>

        <!-- Storage Nodes Grid -->
        <div class="w-full grid grid-cols-2 gap-3 mt-8">
          {#each lakeTech as tech}
            <div
              class="group border border-white/5 bg-white/5 hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all duration-300 rounded-2xl p-4 flex flex-col gap-3 relative overflow-hidden"
            >
              <div
                class="absolute -top-10 -right-10 w-20 h-20 bg-emerald-500/10 blur-xl rounded-full pointer-events-none"
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
                <div class="text-[9px] text-white/50 uppercase mt-1">
                  {tech.desc}
                </div>
              </div>
            </div>
          {/each}
        </div>

        <div class="mt-8">
          <CtaLink href="#lakehouse" label="Enter the layer" color="#10b981" />
        </div>
      </GlassPanel>
    </div>
  </svelte:fragment>
</MobileCarousel>
