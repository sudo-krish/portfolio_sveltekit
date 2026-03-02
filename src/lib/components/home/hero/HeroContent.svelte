<!-- src/lib/components/home/hero/HeroContent.svelte -->
<script lang="ts">
  import {
    ArrowRight,
    Github,
    Linkedin,
    FileText,
    TerminalSquare,
    Zap,
    Cpu,
  } from "lucide-svelte";
  import { getPersonalInfo } from "$lib/data/portfolio-data";
  import { onMount } from "svelte";
  import gsap from "gsap";

  import { Button } from "$lib/components/ui/button";
  import MobileCarousel from "$lib/components/ui/MobileCarousel.svelte";

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

  let mounted = $state(false);

  onMount(() => {
    let ctx = gsap.context(() => {
      mounted = true;

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        ".vfx-flare",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2, stagger: 0.2 },
      )
        .fromTo(
          ".hero-type",
          { y: 60, opacity: 0, rotationX: -10, transformPerspective: 1000 },
          { y: 0, opacity: 1, rotationX: 0, duration: 1.5, stagger: 0.1 },
          "-=1.5",
        )
        .fromTo(
          ".glass-shard",
          { x: -30, opacity: 0, backdropFilter: "blur(0px)" },
          { x: 0, opacity: 1, backdropFilter: "blur(30px)", duration: 1.2 },
          "-=1.2",
        )
        .fromTo(
          ".action-dock",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: "elastic.out(1, 0.8)" },
          "-=0.8",
        );
    });
    return () => ctx.revert();
  });
</script>

<MobileCarousel
  layout="left"
  sectionTitle="Data Engine"
  sectionDescription="Initialize Core"
  accentColor="hsl(var(--primary))"
>
  <!-- ========================================================= -->
  <!-- 🖥️ DESKTOP: REFINED BRUTALIST VOLUMETRICS                 -->
  <!-- ========================================================= -->
  <svelte:fragment slot="content-pc">
    <!-- VFX Lighting -->
    <div
      class="vfx-flare absolute top-[10%] left-[5%] w-[40vw] h-[40vw] rounded-full bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.25)_0%,transparent_60%)] mix-blend-screen pointer-events-none z-0"
    ></div>
    <div
      class="vfx-flare absolute bottom-[-10%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-[radial-gradient(ellipse_at_center,hsl(var(--accent)/0.15)_0%,transparent_60%)] mix-blend-color-dodge blur-[40px] pointer-events-none z-0"
    ></div>

    <!-- Master Grid Container -->
    <div
      class="absolute inset-0 z-20 flex items-center justify-center w-full h-full pointer-events-none"
    >
      <div
        class="w-full max-w-[1400px] px-8 lg:px-16 flex items-center justify-between"
      >
        <!-- LEFT COLUMN: Typography & Marquee -->
        <div class="relative z-10 w-3/5 flex flex-col justify-center">
          <div class="hero-type flex items-center gap-4 mb-6 pl-2">
            <div class="h-[2px] w-12 bg-white/40"></div>
            <span
              class="font-mono text-[11px] font-bold tracking-[0.4em] text-white/80 uppercase"
            >
              {personal.name}
            </span>
            <div
              class="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1"
            >
              <div
                class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_currentColor]"
              ></div>
              <span
                class="font-mono text-[9px] uppercase tracking-widest text-emerald-400 font-bold"
                >Node Live</span
              >
            </div>
          </div>

          <!-- Fluid Typography ensures no overflow on narrow desktop screens -->
          <h1
            class="hero-type font-black text-[clamp(5rem,8vw,9rem)] leading-[0.85] tracking-tighter text-white drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] mix-blend-overlay"
          >
            DATA
          </h1>
          <h1
            class="hero-type font-black text-[clamp(5rem,8vw,9rem)] leading-[0.85] tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-accent relative"
          >
            ENGINEER
          </h1>

          <!-- Refined Tech Marquee -->
          <div class="hero-type mt-10 flex flex-wrap gap-2.5 max-w-[90%] pl-2">
            <div
              class="flex items-center gap-2 mr-3 border border-white/5 bg-white/[0.02] px-3 py-1.5 rounded-lg"
            >
              <Cpu size={14} class="text-primary" />
              <span
                class="font-mono text-[10px] text-primary tracking-widest uppercase font-bold"
                >Payload</span
              >
            </div>
            {#each techTags as tag}
              <div
                class="px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white/90 font-mono text-[11px] uppercase tracking-widest shadow-lg transition-colors hover:bg-primary/20 hover:border-primary/50 cursor-default"
              >
                {tag}
              </div>
            {/each}
          </div>
        </div>

        <!-- RIGHT COLUMN: Glass Bio & Dock -->
        <div
          class="relative z-30 w-2/5 flex flex-col justify-center items-start pointer-events-auto -ml-12"
        >
          <!-- Structurally Sound Glass Shard -->
          <div
            class="glass-shard w-full mb-6 rounded-2xl rounded-tl-none p-8 xl:p-10 bg-white/[0.03] backdrop-blur-[40px] border border-white/10 border-t-primary/50 shadow-[-20px_20px_60px_rgba(0,0,0,0.6)] relative overflow-hidden"
          >
            <!-- Architectural light leak -->
            <div
              class="absolute top-0 left-0 w-32 h-[1px] bg-gradient-to-r from-primary to-transparent"
            ></div>

            <TerminalSquare
              size={28}
              class="text-primary mb-5 drop-shadow-[0_0_15px_currentColor]"
            />
            <p
              class="text-xl xl:text-2xl leading-relaxed text-white/90 font-light"
            >
              I don't just move data—I forge <strong
                class="text-white font-bold drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                >hyperscaled, autonomous intelligence systems.</strong
              > Specializing in high-velocity capture and petabyte-scale pipelines.
            </p>
          </div>

          <!-- Refined Action Dock -->
          <div
            class="action-dock flex items-stretch gap-3 w-full p-2 bg-black/40 backdrop-blur-xl rounded-[1.5rem] border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)]"
          >
            <Button
              variant="default"
              class="flex-1 h-14 text-base font-bold rounded-[1.2rem] shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_0_15px_hsl(var(--primary)/0.3)] group overflow-hidden relative"
              onclick={() =>
                document
                  .getElementById("pipeline")
                  ?.scrollIntoView({ behavior: "smooth" })}
            >
              <div
                class="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-[150%] transition-transform duration-1000 ease-out"
              ></div>
              Deploy Core <Zap class="ml-2 fill-white" size={18} />
            </Button>

            <div
              class="flex items-center gap-1.5 px-2 bg-white/5 rounded-[1.2rem]"
            >
              <Button
                variant="ghost"
                class="w-12 h-12 p-0 rounded-xl hover:bg-white/10 transition-colors"
                href={personal.socialLinks.github}
                target="_blank"
              >
                <Github size={20} class="text-white/80" />
              </Button>
              <div class="w-[1px] h-6 bg-white/10"></div>
              <Button
                variant="ghost"
                class="w-12 h-12 p-0 rounded-xl hover:bg-white/10 transition-colors"
                href={personal.socialLinks.linkedin}
                target="_blank"
              >
                <Linkedin size={20} class="text-white/80" />
              </Button>
              <div class="w-[1px] h-6 bg-white/10"></div>
              <Button
                variant="ghost"
                class="h-12 px-4 rounded-xl hover:bg-white/10 font-mono text-[11px] uppercase tracking-widest text-primary transition-colors"
                href={RESUME_URL}
                target="_blank"
              >
                Resume
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </svelte:fragment>

  <!-- ========================================================= -->
  <!-- 📱 MOBILE: CAROUSEL-SAFE DYNAMIC LAYOUT                   -->
  <!-- ========================================================= -->
  <svelte:fragment slot="content-mobile">
    <!-- 
      FIX APPLIED: No more 'fixed' bottom elements. 
      Uses flex-col and 'mt-auto' to push the dock to the bottom of the slide, 
      respecting the Carousel's internal scrolling logic and safe areas.
    -->
    <div
      class="z-20 w-full min-h-[100svh] pointer-events-auto flex flex-col pt-[12vh] pb-[calc(env(safe-area-inset-bottom)+1.5rem)] relative overflow-hidden"
    >
      <!-- VFX Flares -->
      <div
        class="vfx-flare absolute top-[15%] right-[-20%] w-[120vw] h-[120vw] rounded-full bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.6)_0%,transparent_60%)] mix-blend-screen pointer-events-none z-0"
      ></div>

      <!-- Typography Block -->
      <div class="w-full px-6 z-10 pointer-events-none mb-6">
        <div class="hero-type flex items-center gap-3 mb-5">
          <div class="h-[1px] w-8 bg-white/50"></div>
          <span
            class="font-mono text-[9px] font-bold tracking-[0.4em] text-white/70 uppercase"
          >
            {personal.name}
          </span>
          <div
            class="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_currentColor]"
          ></div>
        </div>

        <h1
          class="hero-type font-black text-[20vw] leading-[0.8] tracking-tighter text-white drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] mix-blend-overlay"
        >
          DATA
        </h1>
        <h1
          class="hero-type font-black text-[20vw] leading-[0.8] tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-accent relative z-10"
        >
          ENGINEER
        </h1>
      </div>

      <!-- Bleeding Glass Bio -->
      <div
        class="glass-shard w-[92%] ml-auto relative z-20 mb-8 pl-6 py-6 rounded-l-3xl bg-white/[0.03] backdrop-blur-[30px] border-y border-l border-white/10 shadow-[-15px_15px_40px_rgba(0,0,0,0.6)]"
      >
        <div
          class="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-transparent via-primary to-transparent"
        ></div>
        <TerminalSquare size={22} class="text-primary mb-3" />
        <p class="text-[4vw] leading-relaxed text-white/90 font-light pr-4">
          Forging <strong
            class="text-white font-bold drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
            >hyperscaled, autonomous intelligence systems.</strong
          > Specializing in petabyte-scale pipelines.
        </p>
      </div>

      <!-- Scrolling Tech Ribbon -->
      <div
        class="hero-type w-full relative z-20 mb-6 overflow-hidden pointer-events-auto"
      >
        <div
          class="absolute inset-0 w-full h-full bg-gradient-to-r from-background via-transparent to-background z-10 pointer-events-none"
        ></div>
        <div
          class="flex gap-2.5 w-max px-6 overflow-x-auto no-scrollbar snap-x snap-mandatory"
        >
          {#each techTags as tag}
            <div
              class="snap-center flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/5 rounded-full px-4 py-2.5 shadow-lg"
            >
              <Cpu size={12} class="text-primary/70" />
              <span
                class="font-mono text-[10px] font-bold uppercase tracking-widest text-white/90"
                >{tag}</span
              >
            </div>
          {/each}
        </div>
      </div>

      <!-- 
        Dynamic Action Dock 
        Uses mt-auto to naturally rest at the bottom of this specific slide.
      -->
      <div
        class="action-dock mt-auto w-full px-5 relative z-30 pointer-events-auto"
      >
        <div
          class="w-full flex items-stretch gap-2 p-1.5 bg-white/5 backdrop-blur-2xl rounded-[1.5rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.1)]"
        >
          <Button
            variant="default"
            class="flex-1 h-14 text-[14px] font-bold rounded-xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_0_15px_hsl(var(--primary)/0.4)] group overflow-hidden relative"
            onclick={() =>
              document
                .getElementById("pipeline")
                ?.scrollIntoView({ behavior: "smooth" })}
          >
            <div
              class="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/20 to-transparent group-active:translate-x-[150%] transition-transform duration-700 ease-out"
            ></div>
            Deploy <Zap class="ml-2 fill-white" size={16} />
          </Button>

          <div class="flex items-center gap-1 px-1 bg-black/40 rounded-xl">
            <Button
              variant="ghost"
              class="w-12 h-12 p-0 rounded-lg hover:bg-white/10"
              href={personal.socialLinks.github}
              target="_blank"
            >
              <Github size={20} class="text-white/70" />
            </Button>
            <div class="w-[1px] h-6 bg-white/10"></div>
            <Button
              variant="ghost"
              class="w-12 h-12 p-0 rounded-lg hover:bg-white/10"
              href={RESUME_URL}
              target="_blank"
            >
              <FileText size={20} class="text-primary" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  </svelte:fragment>
</MobileCarousel>

<style>
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>
