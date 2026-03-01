<!-- src/lib/components/home/hero/HeroContent.svelte -->
<script lang="ts">
  import {
    ArrowRight,
    Github,
    Linkedin,
    FileText,
    Terminal,
    Database,
  } from "lucide-svelte";
  import { getPersonalInfo } from "$lib/data/portfolio-data";
  import { onMount } from "svelte";
  import gsap from "gsap";
  import GlassPanel from "$lib/components/ui/GlassPanel.svelte";
  import GlowAccent from "$lib/components/ui/GlowAccent.svelte";

  const personal = getPersonalInfo();
  const RESUME_URL =
    "https://drive.google.com/file/d/1-HcNEDahb4LZHz2QR1g_hNq4_Pk3mkVw/view?usp=drive_link";

  const techTags = [
    "Apache Spark",
    "Airflow",
    "Kafka",
    "AWS EMR",
    "Terraform",
    "Snowflake",
  ];

  let mounted = false;

  onMount(() => {
    let ctx = gsap.context(() => {
      mounted = true;
      gsap.fromTo(
        ".float-panel",
        { y: 30, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          delay: 0.2,
        },
      );
      gsap.fromTo(
        ".massive-text",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "expo.out", delay: 0.1 },
      );
    });
    return () => ctx.revert();
  });
</script>

<div
  class="relative w-full h-[100dvh] overflow-hidden pointer-events-none z-20"
>
  <!-- BACKGROUND AMBIENT GLOWS -->
  <GlowAccent
    color="#2563eb"
    position="top-1/4 -left-32"
    size={384}
    opacity={0.2}
  />
  <GlowAccent
    color="#06b6d4"
    position="bottom-1/4 right-10"
    size={320}
    opacity={0.1}
  />

  <!-- MASSIVE TYPOGRAPHY WATERMARK -->
  <div
    class="absolute top-[18%] left-[5%] md:left-[8%] lg:left-[10%] z-0 opacity-20 pointer-events-none"
  >
    <div class="massive-text">
      <div class="flex items-center gap-4 mb-6">
        <div class="h-px w-12 bg-blue-500/50"></div>
        <span
          class="font-mono text-[10px] md:text-xs font-bold text-blue-400 tracking-[0.3em] uppercase"
        >
          System Genesis
        </span>
      </div>

      <h1
        class="font-black leading-[0.85] tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/40 drop-shadow-2xl"
        style="font-size: clamp(6rem, 15vw, 12rem);"
      >
        RAW <br />
        <span
          class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500"
        >
          DATA
        </span>
      </h1>
    </div>
  </div>

  <!-- BIO PANEL -->
  <GlassPanel
    className="float-panel pointer-events-auto absolute top-[55%] lg:top-[45%] left-[5%] md:left-[8%] lg:left-[10%] max-w-[280px] sm:max-w-sm p-6 rounded-2xl"
  >
    <div
      class="absolute -top-3 -left-3 border border-white/20 bg-background/80 backdrop-blur-md w-8 h-8 rounded-full flex items-center justify-center z-20"
    >
      <Terminal size={12} class="text-blue-400" />
    </div>

    <p class="text-sm md:text-base text-muted-foreground leading-relaxed">
      Every great insight starts as a single raw event. I'm <strong
        class="text-white">{personal.name}</strong
      >, a Data Engineer specializing in capturing, harnessing, and hyperscaling
      petabytes of unstructured data into autonomous business intelligence
      frameworks.
    </p>

    <div class="mt-6 flex gap-3">
      <button
        onclick={() =>
          document
            .getElementById("projects")
            ?.scrollIntoView({ behavior: "smooth" })}
        class="flex-1 bg-white/10 hover:bg-white/20 border border-white/10 text-white text-xs font-semibold py-2.5 rounded-lg transition-all flex items-center justify-center gap-2"
      >
        Core Logic <ArrowRight size={14} />
      </button>
    </div>
  </GlassPanel>

  <!-- TELEMETRY PANEL (Right Side, Desktop Only) -->
  <div
    class="float-panel hidden lg:flex pointer-events-auto absolute top-[25%] right-[8%] w-64 flex-col gap-4"
  >
    <!-- Mini Status Panel -->
    <GlassPanel className="p-4 rounded-xl">
      <div class="flex items-center justify-between mb-4">
        <span
          class="font-mono text-[10px] text-muted-foreground tracking-wider uppercase"
          >Node Status</span
        >
        <div class="flex items-center gap-1.5">
          <span class="relative flex h-2 w-2">
            <span
              class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
            ></span>
            <span
              class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"
            ></span>
          </span>
          <span class="font-mono text-[9px] text-emerald-400">ONLINE</span>
        </div>
      </div>

      <div class="space-y-3">
        <div class="flex justify-between items-end">
          <span class="text-xs text-white/70 flex items-center gap-1.5">
            <Database size={12} class="text-blue-400" /> Throughput
          </span>
          <span class="font-mono text-sm font-semibold text-white"
            >4.2 TB/s</span
          >
        </div>
        <div class="h-1 w-full bg-white/10 rounded-full overflow-hidden">
          <div
            class="h-full bg-blue-500 w-[85%] rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
          ></div>
        </div>
      </div>
    </GlassPanel>

    <!-- Social Terminal -->
    <GlassPanel
      className="p-2 rounded-xl flex justify-between items-center px-4"
    >
      <a
        href={personal.socialLinks.github}
        target="_blank"
        class="hover:text-white text-white/50 transition-colors p-2"
      >
        <Github size={16} />
      </a>
      <div class="w-px h-4 bg-white/10"></div>
      <a
        href={personal.socialLinks.linkedin}
        target="_blank"
        class="hover:text-blue-400 text-white/50 transition-colors p-2"
      >
        <Linkedin size={16} />
      </a>
      <div class="w-px h-4 bg-white/10"></div>
      <a
        href={RESUME_URL}
        target="_blank"
        class="flex items-center gap-2 hover:text-white text-white/50 transition-colors p-2 font-mono text-[10px] uppercase"
      >
        <FileText size={14} /> Resume
      </a>
    </GlassPanel>
  </div>

  <!-- FLOATING DATA TAGS -->
  <div
    class="float-panel absolute bottom-[15%] left-[5%] md:left-[8%] lg:left-[10%] max-w-2xl flex flex-wrap gap-2 pointer-events-auto"
  >
    {#each techTags as tag}
      <div
        class="px-3 py-1.5 rounded-lg border border-white/10 bg-black/40 backdrop-blur-md flex items-center gap-2 group hover:border-blue-500/50 hover:bg-blue-500/10 transition-all cursor-default"
      >
        <div
          class="w-1.5 h-1.5 rounded-full bg-white/30 group-hover:bg-blue-400 group-hover:shadow-[0_0_8px_rgba(96,165,250,0.8)] transition-all"
        ></div>
        <span
          class="font-mono text-[10px] font-medium text-white/70 group-hover:text-white transition-colors uppercase tracking-wider"
          >{tag}</span
        >
      </div>
    {/each}
  </div>
</div>

<style>
  h1 {
    font-size: clamp(4rem, 12vw, 9rem);
  }
</style>
