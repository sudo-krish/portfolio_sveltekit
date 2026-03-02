<!-- src/lib/components/home/pipeline/PipelineContent.svelte -->
<script lang="ts">
  import { Activity, Zap } from "lucide-svelte";
  import TechMarquee from "./TechMarquee.svelte";
  import { onMount } from "svelte";
  import gsap from "gsap";
  import GlassPanel from "$lib/components/ui/GlassPanel.svelte";
  import StatusBadge from "$lib/components/ui/StatusBadge.svelte";
  import GlowAccent from "$lib/components/ui/GlowAccent.svelte";
  import MobileCarousel from "$lib/components/ui/MobileCarousel.svelte";
  import CtaLink from "$lib/components/ui/CtaLink.svelte";

  onMount(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        ".pipeline-panel",
        { x: 50, opacity: 0, scale: 0.95 },
        {
          x: 0,
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
  layout="right"
  sectionTitle="Data Ingestion"
  sectionDescription="Explore the Pipeline Architecture"
  accentColor="#f59e0b"
>
  <!-- DESKTOP / TABLET (Original Preserved floating layout) -->
  <svelte:fragment slot="content-pc">
    <GlowAccent color="#06b6d4" position="top-[20%] right-[10%]" size={384} />

    <!-- MAIN CONTENT CARD (RIGHT SIDE PC) -->
    <div
      class="absolute top-[20%] right-[8%] w-full max-w-xl z-20 pointer-events-auto"
    >
      <!-- MAIN NARRATIVE -->
      <GlassPanel
        glow="#06b6d4"
        className="pipeline-panel w-full max-w-lg lg:max-w-xl p-8 rounded-3xl z-10"
      >
        <div class="mb-6 flex items-center gap-4">
          <StatusBadge
            color="#06b6d4"
            label="Data Ingestion & Transformation"
          />
        </div>
        <h3
          class="text-4xl lg:text-5xl font-black mb-6 leading-[1.1] text-white tracking-tighter"
        >
          High-Speed Data <br />
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-500"
            >Pipelines.</span
          >
        </h3>
        <p
          class="text-base lg:text-lg text-white/70 leading-relaxed font-light"
        >
          Like high-velocity plumbing for the digital age. I build robust,
          <strong class="text-white font-medium"
            >fault-tolerant ETL/ELT pipelines</strong
          >
          that filter, transform, and route
          <span class="text-cyan-300 font-medium tracking-wide"
            >millions of events per second</span
          >, ensuring data reaches its destination seamlessly.
        </p>

        <div class="mt-8">
          <CtaLink href="#datalake" label="Follow the flow" color="#06b6d4" />
        </div>
      </GlassPanel>

      <div class="flex flex-row gap-4 w-full h-48 mt-4">
        <!-- TELEMETRY -->
        <GlassPanel
          className="pipeline-panel flex-1 p-5 rounded-2xl flex flex-col"
        >
          <div class="flex items-center justify-between mb-2">
            <span
              class="font-mono text-[10px] text-muted-foreground uppercase tracking-widest flex items-center gap-2"
            >
              <Activity size={12} /> Live Telemetry
            </span>
            <div
              class="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_rgba(6,182,212,1)]"
            ></div>
          </div>
          <div
            class="flex-1 w-full relative mt-2 rounded-xl border border-white/5 bg-black/20 overflow-hidden flex items-center justify-center p-4"
          >
            <div
              class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.15)_0%,transparent_70%)]"
            ></div>
            <svg
              viewBox="0 0 200 100"
              class="w-full h-full opacity-80"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient
                  id="flow-grad-1"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stop-color="transparent" />
                  <stop offset="50%" stop-color="#22d3ee" stop-opacity="0.8" />
                  <stop offset="100%" stop-color="#06b6d4" />
                </linearGradient>
                <linearGradient
                  id="flow-grad-2"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stop-color="transparent" />
                  <stop offset="50%" stop-color="#2dd4bf" stop-opacity="0.8" />
                  <stop offset="100%" stop-color="#0d9488" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              <path
                d="M 0,20 C 50,50 150,10 200,40"
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                stroke-width="1.5"
              />
              <path
                d="M 0,80 C 80,80 120,40 200,60"
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                stroke-width="1.5"
              />
              <path
                d="M 0,20 C 50,50 150,10 200,40"
                fill="none"
                stroke="url(#flow-grad-1)"
                stroke-width="2"
                filter="url(#glow)"
                stroke-dasharray="40 160"
                class="animate-svgFlow1"
              />
              <path
                d="M 0,80 C 80,80 120,40 200,60"
                fill="none"
                stroke="url(#flow-grad-2)"
                stroke-width="2"
                filter="url(#glow)"
                stroke-dasharray="30 170"
                class="animate-svgFlow2"
              />
            </svg>
          </div>
        </GlassPanel>

        <!-- TECH STACK -->
        <GlassPanel
          className="pipeline-panel w-48 p-6 rounded-3xl flex flex-col justify-center relative"
        >
          <span
            class="absolute top-5 left-5 font-mono text-[10px] text-white/50 uppercase tracking-[0.2em] flex items-center gap-2 font-bold"
          >
            <Zap size={12} class="text-cyan-400" /> Stack
          </span>
          <div
            class="mt-4 -ml-2 scale-[0.85] opacity-80 hover:opacity-100 transition-opacity"
          >
            <TechMarquee />
          </div>
        </GlassPanel>
      </div>
    </div>
  </svelte:fragment>

  <!-- MOBILE / SMALL TABLET (Carousel Slide Layout) -->
  <svelte:fragment slot="content-mobile">
    <div class="z-20 w-full max-w-lg mx-auto pointer-events-auto">
      <!-- MAIN NARRATIVE -->
      <GlassPanel
        glow="#06b6d4"
        className="pipeline-panel w-full p-6 sm:p-8 rounded-3xl z-10"
      >
        <div class="mb-5 flex items-center gap-3">
          <StatusBadge
            color="#06b6d4"
            label="Data Ingestion & Transformation"
          />
        </div>
        <h3
          class="text-3xl sm:text-4xl font-black mb-4 leading-[1.15] text-white tracking-tighter"
        >
          High-Speed Data <br />
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-500"
            >Pipelines.</span
          >
        </h3>
        <p
          class="text-sm sm:text-base text-white/70 leading-relaxed font-light"
        >
          Like high-velocity plumbing for the digital age. I build robust,
          <strong class="text-white font-medium"
            >fault-tolerant ETL/ELT pipelines</strong
          >
          that filter, transform, and route
          <span class="text-cyan-300 font-medium tracking-wide"
            >millions of events per second</span
          >, ensuring data reaches its destination seamlessly.
        </p>
      </GlassPanel>

      <div class="flex flex-col sm:flex-row gap-4 w-full h-auto mt-6">
        <!-- TELEMETRY -->
        <GlassPanel
          className="pipeline-panel flex-1 p-5 rounded-2xl flex flex-col min-h-[120px]"
        >
          <div class="flex items-center justify-between mb-3">
            <span
              class="font-mono text-[10px] text-white/50 uppercase tracking-[0.2em] flex items-center gap-2 font-bold"
            >
              <Activity size={12} class="text-cyan-400" /> Live Telemetry
            </span>
            <div
              class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.8)]"
            ></div>
          </div>
          <div
            class="flex-1 w-full relative mt-1 rounded-xl border border-white/5 bg-black/40 overflow-hidden flex items-center justify-center p-2 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]"
          >
            <div
              class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.15)_0%,transparent_70%)]"
            ></div>
            <svg
              viewBox="0 0 200 100"
              class="w-full h-full opacity-80"
              preserveAspectRatio="none"
            >
              <path
                d="M 0,20 C 50,50 150,10 200,40"
                fill="none"
                class="animate-svgFlow1"
                stroke="#22d3ee"
                stroke-width="2"
                stroke-dasharray="40 160"
              />
              <path
                d="M 0,80 C 80,80 120,40 200,60"
                fill="none"
                class="animate-svgFlow2"
                stroke="#2dd4bf"
                stroke-width="2"
                stroke-dasharray="30 170"
              />
            </svg>
          </div>
        </GlassPanel>

        <!-- TECH STACK -->
        <GlassPanel
          className="pipeline-panel w-full sm:w-48 p-5 rounded-2xl flex flex-col justify-center min-h-[80px]"
        >
          <span
            class="absolute top-4 left-5 font-mono text-[10px] text-white/50 uppercase tracking-[0.2em] flex items-center gap-2 font-bold"
          >
            <Zap size={12} class="text-cyan-400" /> Stack
          </span>
          <div
            class="mt-6 sm:mt-4 -ml-2 scale-[0.8] opacity-80 hover:opacity-100 transition-opacity"
          >
            <TechMarquee />
          </div>
        </GlassPanel>
      </div>
    </div>
  </svelte:fragment>
</MobileCarousel>

<style>
  .animate-svgFlow1 {
    animation: svgFlow 3s linear infinite;
  }
  .animate-svgFlow2 {
    animation: svgFlow 4s linear infinite;
    animation-delay: 1.5s;
  }
  @keyframes svgFlow {
    from {
      stroke-dashoffset: 200;
    }
    to {
      stroke-dashoffset: -200;
    }
  }
</style>
