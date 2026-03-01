<!-- src/lib/components/home/hero/HeroContent.svelte -->
<script lang="ts">
  import {
    ArrowRight,
    Github,
    Linkedin,
    FileText,
    Terminal,
    Database,
    Server,
    Cpu,
  } from "lucide-svelte";
  import { getPersonalInfo } from "$lib/data/portfolio-data";

  const personal = getPersonalInfo();
  const RESUME_URL =
    "https://drive.google.com/file/d/1-HcNEDahb4LZHz2QR1g_hNq4_Pk3mkVw/view?usp=drive_link";

  // SEO & Technical Keywords
  const techTags = [
    "Apache Spark",
    "Airflow",
    "Kafka",
    "AWS EMR",
    "Terraform",
    "Snowflake",
  ];
</script>

<div
  class="hero-content relative flex flex-col items-center lg:items-start text-center lg:text-left z-20"
>
  <!-- DECORATIVE LINE (Left) -->
  <div
    class="hidden lg:block absolute -left-8 top-2 bottom-4 w-px bg-gradient-to-b from-blue-500/50 to-transparent"
  ></div>
  <div class="hidden lg:block absolute -left-[2.15rem] top-2 text-blue-500/40">
    <Terminal size={14} />
  </div>

  <!-- 1. SYSTEM STATUS -->
  <div class="overflow-hidden mb-5 w-full flex justify-center lg:justify-start">
    <div
      class="hero-line inline-flex items-center gap-2.5 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm"
    >
      <span class="relative flex h-2 w-2">
        <span
          class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"
        ></span>
        <span class="relative inline-flex rounded-full h-2 w-2 bg-blue-500"
        ></span>
      </span>
      <span
        class="font-mono text-[10px] font-semibold text-blue-200 tracking-widest uppercase"
      >
        Data Source Generation
      </span>
    </div>
  </div>

  <!-- 2. HEADLINE (SEO Optimized) -->
  <div class="overflow-hidden mb-6 max-w-3xl">
    <h1 class="hero-line main-title">
      Capturing Raw <br />
      <span
        class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-300% animate-gradient"
      >
        Data Potential.
      </span>
    </h1>
  </div>

  <!-- 3. TECH CONTEXT STRIP (Keywords) -->
  <div class="overflow-hidden mb-8 w-full">
    <div class="hero-line flex flex-wrap gap-2 justify-center lg:justify-start">
      {#each techTags as tag}
        <span
          class="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 backdrop-blur-sm text-[11px] font-mono text-muted-foreground font-medium hover:text-blue-400 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all cursor-default flex items-center gap-1.5"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"
          ></span>
          {tag}
        </span>
      {/each}
    </div>
  </div>

  <!-- 4. BIO DESCRIPTION (Technical Value Prop) -->
  <div class="overflow-hidden mb-10 max-w-lg">
    <p class="hero-line sub-title pl-0 lg:pl-1">
      Every great insight starts as a single raw event. I'm <span
        class="font-semibold text-foreground">{personal.name}</span
      >, a <strong>Big Data Engineer</strong> who specializes in capturing, harnessing,
      and scaling these raw signals into an unstoppable flow of business intelligence.
    </p>
  </div>

  <!-- 5. ACTIONS -->
  <div
    class="hero-line flex flex-col sm:flex-row gap-4 w-full items-center lg:items-start"
  >
    <!-- Primary CTA -->
    <button
      class="group relative inline-flex h-11 items-center justify-center overflow-hidden rounded-md bg-blue-600 px-8 font-medium text-white transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-background"
      onclick={() =>
        document
          .getElementById("projects")
          ?.scrollIntoView({ behavior: "smooth" })}
    >
      <div
        class="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]"
      >
        <div class="relative h-full w-8 bg-white/20"></div>
      </div>
      <span class="mr-2 text-sm font-semibold">View Case Studies</span>
      <ArrowRight
        size={16}
        class="transition-transform group-hover:translate-x-1"
      />
    </button>

    <!-- Secondary: Social Cluster -->
    <div class="flex items-center gap-3">
      <a
        href={personal.socialLinks.github}
        target="_blank"
        class="social-btn group"
        aria-label="Github Profile"
      >
        <Github size={18} />
        <span class="tooltip">Github</span>
      </a>
      <a
        href={personal.socialLinks.linkedin}
        target="_blank"
        class="social-btn group"
        aria-label="LinkedIn Profile"
      >
        <Linkedin size={18} />
        <span class="tooltip">LinkedIn</span>
      </a>
      <a
        href={RESUME_URL}
        target="_blank"
        class="social-btn group resume"
        aria-label="Download Resume"
      >
        <FileText size={18} />
        <span class="ml-2 font-mono text-[10px] font-bold tracking-wider"
          >RESUME</span
        >
      </a>
    </div>
  </div>
</div>

<style>
  /* --- TYPOGRAPHY --- */
  .main-title {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: hsl(var(--foreground));
  }

  .sub-title {
    font-size: clamp(1rem, 1.1vw, 1.125rem);
    line-height: 1.6;
    color: hsl(var(--muted-foreground));
  }

  /* --- ANIMATED GRADIENT --- */
  .bg-300\% {
    background-size: 300% 300%;
  }
  .animate-gradient {
    animation: animatedgradient 6s ease infinite alternate;
  }

  @keyframes animatedgradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  /* --- SOCIAL BUTTONS --- */
  .social-btn {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    color: hsl(var(--muted-foreground));
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .social-btn:hover {
    border-color: #3b82f6;
    color: #3b82f6;
    transform: translateY(-2px);
    box-shadow:
      0 4px 20px rgba(59, 130, 246, 0.2),
      0 0 10px rgba(59, 130, 246, 0.1);
    background: rgba(59, 130, 246, 0.1);
  }

  .social-btn.resume {
    width: auto;
    padding: 0 1.25rem;
  }

  /* Tooltip logic */
  .tooltip {
    position: absolute;
    top: -36px;
    left: 50%;
    transform: translateX(-50%) translateY(8px);
    background: hsl(var(--foreground));
    color: hsl(var(--background));
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 10px;
    font-weight: 600;
    opacity: 0;
    pointer-events: none;
    transition: all 0.2s ease;
    white-space: nowrap;
    z-index: 30;
  }

  .social-btn:hover .tooltip {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }

  @media (max-width: 768px) {
    .main-title {
      line-height: 1.15;
    }
  }
</style>
