<!-- src/lib/components/home/pipeline/PipelineContent.svelte -->
<script lang="ts">
  import { Activity, Zap } from "lucide-svelte";
  import TechMarquee from "./TechMarquee.svelte";
  import { onMount } from "svelte";
  import gsap from "gsap";
  import GlassPanel from "$lib/components/ui/GlassPanel.svelte";
  import StatusBadge from "$lib/components/ui/StatusBadge.svelte";
  import GlowAccent from "$lib/components/ui/GlowAccent.svelte";

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

<div
  class="relative w-full h-[100dvh] overflow-hidden pointer-events-none z-20"
>
  <GlowAccent color="#06b6d4" position="top-[20%] right-[10%]" size={384} />

  <div
    class="absolute top-[10%] md:top-[15%] left-[5%] right-[5%] lg:left-auto lg:right-[8%] w-auto lg:w-full lg:max-w-lg flex flex-col gap-4"
  >
    <!-- MAIN NARRATIVE -->
    <GlassPanel
      glow="#06b6d4"
      className="pipeline-panel pointer-events-auto w-full p-8"
    >
      <div class="mb-6 flex items-center gap-3">
        <StatusBadge color="#06b6d4" label="Data Ingestion & Transformation" />
      </div>

      <h3
        class="text-4xl lg:text-5xl font-black mb-4 leading-tight text-white tracking-tight"
      >
        High-Speed Data <br />
        <span
          class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-500"
        >
          Pipelines.
        </span>
      </h3>

      <p class="text-sm text-muted-foreground leading-relaxed">
        Like high-velocity plumbing for the digital age. I build robust,
        <strong class="text-white">fault-tolerant ETL/ELT pipelines</strong>
        that filter, transform, and route
        <span class="text-cyan-300 font-medium tracking-wide"
          >millions of events per second</span
        >, ensuring data reaches its destination seamlessly.
      </p>
    </GlassPanel>

    <div class="flex flex-col sm:flex-row gap-4 w-full h-48">
      <!-- TELEMETRY -->
      <GlassPanel
        className="pipeline-panel pointer-events-auto flex-1 p-5 flex flex-col"
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
        className="pipeline-panel pointer-events-auto w-full sm:w-48 p-5 flex flex-col justify-center"
      >
        <span
          class="absolute top-4 left-5 font-mono text-[10px] text-muted-foreground uppercase tracking-widest flex items-center gap-2"
        >
          <Zap size={12} /> Stack
        </span>
        <div
          class="mt-4 -ml-2 scale-[0.85] opacity-80 hover:opacity-100 transition-opacity"
        >
          <TechMarquee />
        </div>
      </GlassPanel>
    </div>
  </div>
</div>

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
