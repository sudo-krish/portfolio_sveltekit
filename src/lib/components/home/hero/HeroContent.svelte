<!-- src/lib/components/home/hero/HeroContent.svelte -->
<script lang="ts">
  import {
    ArrowRight,
    Github,
    Linkedin,
    FileText,
    Terminal,
    Activity,
  } from "lucide-svelte";
  import { getPersonalInfo } from "$lib/data/portfolio-data";
  import { onMount } from "svelte";
  import gsap from "gsap";

  const personal = getPersonalInfo();
  const RESUME_URL =
    "https://drive.google.com/file/d/1-HcNEDahb4LZHz2QR1g_hNq4_Pk3mkVw/view?usp=drive_link";

  onMount(() => {
    // Kinetic Typography Entrance Animation
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo(
      ".hero-decor",
      { opacity: 0, height: 0 },
      { opacity: 1, height: "100%", duration: 1 },
    )
      .fromTo(
        ".hero-status",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.5",
      )
      .fromTo(
        ".hero-title-line",
        { opacity: 0, y: 40, rotationX: -20 },
        { opacity: 1, y: 0, rotationX: 0, duration: 0.8, stagger: 0.15 },
        "-=0.4",
      )
      .fromTo(
        ".hero-pill",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.4, stagger: 0.05 },
        "-=0.4",
      )
      .fromTo(
        ".hero-desc",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.2",
      )
      .fromTo(
        ".hero-action",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.4",
      );
  });
</script>

<div
  class="relative flex flex-col items-center lg:items-start text-center lg:text-left z-20 w-full perspective-1000"
>
  <!-- DECORATIVE LINE (Left) -->
  <div
    class="hero-decor hidden lg:block absolute -left-8 top-0 bottom-4 w-px bg-gradient-to-b from-primary via-primary/20 to-transparent shadow-[0_0_10px_hsla(var(--primary),0.5)]"
  ></div>
  <div
    class="hidden lg:block absolute -left-[2.15rem] top-0 text-primary animate-pulse"
  >
    <Activity size={14} />
  </div>

  <!-- 1. SYSTEM STATUS -->
  <div class="hero-status mb-8">
    <div
      class="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-md shadow-[0_0_15px_hsla(var(--primary),0.1)]"
    >
      <span class="relative flex h-2 w-2">
        <span
          class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"
        ></span>
        <span class="relative inline-flex rounded-full h-2 w-2 bg-primary"
        ></span>
      </span>
      <span
        class="font-mono text-[10px] font-bold text-primary tracking-widest uppercase"
      >
        System Telemetry: Online
      </span>
    </div>
  </div>

  <!-- 2. KINETIC HEADLINE -->
  <div class="mb-6 w-full flex flex-col gap-2">
    <div style="perspective: 400px;">
      <h1
        class="hero-title-line text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground m-0"
      >
        Hi, I'm <span class="text-gradient-cyan">{personal.name}.</span>
      </h1>
    </div>
    <div style="perspective: 400px;">
      <h1
        class="hero-title-line text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight m-0"
      >
        I Build <span class="text-gradient-violet">Real-Time Systems.</span>
      </h1>
    </div>
  </div>

  <!-- 3. TECH CONTEXT STRIP -->
  <div class="mb-8 w-full">
    <div class="flex flex-wrap gap-2 justify-center lg:justify-start">
      {#each personal.topSkills.slice(0, 5) as tag}
        <span
          class="hero-pill px-3 py-1.5 rounded-lg bg-card/60 backdrop-blur-sm border border-white/5 text-[11px] font-mono text-muted-foreground font-medium hover:text-primary hover:border-primary/50 transition-all cursor-default flex items-center gap-2 shadow-sm hover:shadow-[0_0_10px_hsla(var(--primary),0.2)]"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
          {tag}
        </span>
      {/each}
    </div>
  </div>

  <!-- 4. BIO DESCRIPTION -->
  <div class="mb-10 max-w-xl">
    <p
      class="hero-desc text-lg md:text-xl text-muted-foreground leading-relaxed pl-0 lg:pl-1 border-l-0 lg:border-l border-white/10"
    >
      {personal.bio}
    </p>
  </div>

  <!-- 5. ACTIONS -->
  <div
    class="hero-action flex flex-col sm:flex-row gap-5 w-full items-center lg:items-start"
  >
    <!-- Primary CTA -->
    <button
      class="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-xl bg-primary px-8 font-medium text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_hsla(var(--primary),0.4)]"
      onclick={() =>
        document
          .getElementById("section-pipeline")
          ?.scrollIntoView({ behavior: "smooth" })}
    >
      <div
        class="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]"
      >
        <div class="relative h-full w-8 bg-white/20"></div>
      </div>
      <span class="mr-2 font-mono text-sm font-bold tracking-wider uppercase"
        >View Architecture</span
      >
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
        class="glass-btn group"
        aria-label="Github Profile"
      >
        <Github size={20} class="group-hover:text-primary transition-colors" />
      </a>
      <a
        href={personal.socialLinks.linkedin}
        target="_blank"
        class="glass-btn group"
        aria-label="LinkedIn Profile"
      >
        <Linkedin
          size={20}
          class="group-hover:text-primary transition-colors"
        />
      </a>
      <a
        href={RESUME_URL}
        target="_blank"
        class="glass-btn group px-5"
        aria-label="Download Resume"
      >
        <FileText
          size={18}
          class="group-hover:text-primary transition-colors"
        />
        <span
          class="ml-2 font-mono text-[11px] font-bold tracking-widest uppercase group-hover:text-primary transition-colors"
          >Resume</span
        >
      </a>
    </div>
  </div>
</div>

<style>
  /* --- SOCIAL BUTTONS (Glassmorphism) --- */
  .glass-btn {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 48px;
    min-width: 48px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: hsl(var(--muted-foreground));
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .glass-btn:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: hsl(var(--primary) / 0.5);
    transform: translateY(-3px);
    box-shadow: 0 10px 20px -10px hsla(var(--primary), 0.3);
  }

  .perspective-1000 {
    perspective: 1000px;
  }
</style>
