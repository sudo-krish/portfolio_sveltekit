<script lang="ts">
  import { personal } from "$lib/data/site";
  import { heroContent, type TechItem } from "$lib/data/hero_content";
  import { onMount } from "svelte";
  import gsap from "gsap";

  import MobileCarousel from "$lib/components/ui/MobileCarousel.svelte";
  import SectionCard from "$lib/components/ui/cards/SectionCard.svelte";
  import InfiniteMarquee from "$lib/components/ui/marquee/InfiniteMarquee.svelte";
  import PillButton from "$lib/components/ui/buttons/PillButton.svelte";
  
  import { TerminalSquare, Cpu, Zap, Github, Linkedin, FileText } from "lucide-svelte";

  const techStack = heroContent.marquee.techStack;
  const prefix = heroContent.headline.prefix;
  const suffix = heroContent.headline.suffix;
  const metaLabelDesktop = heroContent.headline.metaLabelDesktop;
  const metaLabelMobile = heroContent.headline.metaLabelMobile;
  const payloadLabel = heroContent.marquee.payloadLabel;
  const ctaDesktop = heroContent.actionDock.ctaDesktop;
  const ctaMobile = heroContent.actionDock.cta;
  const links = heroContent.actionDock.links;
</script>

{#snippet heroHeader(isMobile: boolean)}
    {#if isMobile}
        <div class="w-full relative z-10 mb-8 flex flex-col gap-6">
            <div class="hero-type flex items-center justify-between w-full">
                <div class="flex items-center gap-3 bg-foreground/[0.03] border border-foreground/5 rounded-full pl-1 pr-4 py-1 backdrop-blur-md shrink-0">
                    <div class="h-6 w-6 rounded-full bg-foreground/10 flex items-center justify-center">
                        <div class="h-1 w-2.5 bg-foreground/60 rounded-full"></div>
                    </div>
                    <span class="font-mono text-[9px] font-bold tracking-[0.25em] text-foreground/70 uppercase pt-px">{personal.name}</span>
                </div>
                <div class="flex items-center gap-2 bg-foreground/5 border border-foreground/10 rounded-full px-3 py-1.5 backdrop-blur-md shadow-[0_0_15px_hsl(var(--foreground)/0.1)] shrink-0">
                    <div class="w-1.5 h-1.5 rounded-full bg-foreground animate-pulse shadow-[0_0_8px_currentColor]"></div>
                    <span class="font-mono text-[9px] uppercase tracking-widest text-accent font-bold pt-px">{metaLabelMobile}</span>
                </div>
            </div>

            <div class="flex flex-col items-center w-full max-w-full relative mt-4 mb-2" role="presentation">
                <span class="hero-type text-center font-black text-[clamp(3.5rem,17vw,6rem)] leading-[0.78] tracking-[-0.04em] text-foreground/95 mix-blend-plus-lighter w-full block">{prefix}</span>
                <span class="hero-type text-center font-black text-[clamp(3.5rem,17vw,6rem)] leading-[0.78] tracking-[-0.04em] w-full block">{suffix}</span>
            </div>

            <div class="hero-type flex flex-wrap justify-center items-center gap-2 mt-4 pointer-events-auto relative z-50">
                <a href="/projects" class="btn-hero-nav"><span class="text-primary font-bold">01</span> Explore Projects</a>
                <a href="/learn" class="btn-hero-nav"><span class="text-primary font-bold">02</span> Learn Concepts</a>
                <a href="/articles" class="btn-hero-nav"><span class="text-primary font-bold">03</span> Read Articles</a>
                <a href="/experience" class="btn-hero-nav"><span class="text-primary font-bold">04</span> View Experience</a>
            </div>
        </div>
    {:else}
        <div class="relative z-10 w-full flex flex-col justify-center">
            <div class="hero-type flex items-center" style="gap: 1.2cqi; margin-bottom: 1.5cqi; padding-left: 0.2cqi;">
                <div class="flex items-center bg-foreground/[0.03] border border-foreground/[0.08] rounded-full backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.2)]" style="gap: 0.6cqi; padding: 0.5cqi 1cqi 0.5cqi 0.3cqi;">
                    <div class="rounded-full bg-foreground/10 flex items-center justify-center" style="width: 1.2cqi; height: 1.2cqi;">
                        <div class="h-1 w-2.5 bg-foreground/60 rounded-full"></div>
                    </div>
                    <span class="font-mono font-bold tracking-[0.3em] text-foreground/70 uppercase" style="font-size: clamp(8px, 0.7cqi, 10px);">{personal.name}</span>
                </div>
                <div class="flex items-center bg-foreground/5 border border-foreground/10 rounded-full backdrop-blur-md shadow-[0_0_15px_hsl(var(--foreground)/0.1)]" style="gap: 0.5cqi; padding: 0.5cqi 0.8cqi;">
                    <div class="w-1.5 h-1.5 rounded-full bg-foreground animate-pulse shadow-[0_0_10px_currentColor]"></div>
                    <span class="font-mono uppercase tracking-[0.25em] text-accent font-bold" style="font-size: clamp(7px, 0.6cqi, 9px);">{metaLabelDesktop}</span>
                </div>
            </div>

            <div class="flex flex-col" role="presentation">
                <span class="hero-type block font-black leading-[0.82] tracking-[-0.04em] text-[clamp(6rem,9vw,11rem)] text-foreground/72">{prefix}</span>
                <span class="hero-type block font-black leading-[0.82] tracking-[-0.04em] text-[clamp(6rem,9vw,11rem)] text-foreground">{suffix}</span>
            </div>

            <div class="hero-type w-full max-w-[95%] flex flex-wrap items-center gap-3 mt-6 mb-2 pointer-events-auto">
                <a href="/projects" class="btn-hero-nav"><span class="hero-index">01</span><span>Explore Projects</span></a>
                <a href="/learn" class="btn-hero-nav"><span class="hero-index">02</span><span>Learn Concepts</span></a>
                <a href="/articles" class="btn-hero-nav"><span class="hero-index">03</span><span>Read Articles</span></a>
                <a href="/experience" class="btn-hero-nav"><span class="hero-index">04</span><span>View Experience</span></a>
            </div>

            <div class="hero-type w-full max-w-[95%] pointer-events-auto flex items-center" style="margin-top: 2.5cqi; gap: 1.2cqi;">
                <div class="flex items-center border border-foreground/10 bg-foreground/[0.03] shadow-[0_8px_16px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.15)] backdrop-blur-md rounded-xl shrink-0" style="gap: 0.5cqi; padding: 0.4cqi 0.8cqi;">
                    <Cpu size={16} class="text-primary drop-shadow-[0_0_8px_hsl(var(--primary)/0.6)]" />
                    <span class="font-mono text-foreground/90 tracking-[0.2em] uppercase font-bold" style="font-size: clamp(8px, 0.7cqi, 10px);">{payloadLabel}</span>
                </div>
                <div class="flex-1 overflow-hidden mask-fade-edges">
                    <InfiniteMarquee items={techStack} />
                </div>
            </div>
        </div>
    {/if}
{/snippet}

{#snippet heroBioCard(isMobile: boolean)}
    <SectionCard
        badge={heroContent.bioCard.metaLabel}
        subtitle={heroContent.bioCard.metaTitle}
        Icon={TerminalSquare}
        shortDescription={heroContent.bioCard.main}
        detailedPhilosophy={heroContent.bioCard.details}
    />
    {#if isMobile}
        <div class="hero-type relative w-[100vw] z-20 mb-10 -ml-4 pointer-events-auto">
            <InfiniteMarquee items={techStack} />
        </div>
    {/if}
{/snippet}

{#snippet heroActionDock(isMobile: boolean)}
    {#if isMobile}
        <div class="action-dock w-full relative z-30 pointer-events-auto">
            <div class="w-full flex items-stretch justify-between gap-2 p-1.5 bg-card/90 backdrop-blur-2xl rounded-[1.5rem] border border-foreground/10 shadow-[0_20px_40px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.15)]">
                <PillButton href="#pipeline" label={ctaMobile} Icon={Zap} accentColor="primary" />
                <div class="flex items-center gap-1 px-1.5 bg-foreground/5 rounded-xl border border-foreground/5">
                    <a class="inline-flex items-center justify-center whitespace-nowrap w-11 h-11 p-0 rounded-lg hover:bg-foreground/10 transition-colors" href={links.github} target="_blank" aria-label="GitHub Profile">
                        <Github size={18} class="text-foreground/80" />
                    </a>
                    <div class="w-[1px] h-5 bg-foreground/10"></div>
                    <a class="inline-flex items-center justify-center whitespace-nowrap w-11 h-11 p-0 rounded-lg hover:bg-foreground/10 transition-colors" href={links.linkedin} target="_blank" aria-label="LinkedIn Profile">
                        <Linkedin size={18} class="text-foreground/80" />
                    </a>
                    <div class="w-[1px] h-5 bg-foreground/10"></div>
                    <a class="inline-flex items-center justify-center whitespace-nowrap w-11 h-11 p-0 rounded-lg hover:bg-foreground/10 transition-colors" href={links.resume} target="_blank" aria-label="View Resume Document">
                        <FileText size={18} class="text-primary drop-shadow-[0_0_8px_currentColor]" />
                    </a>
                </div>
            </div>
        </div>
    {:else}
        <div class="action-dock flex items-stretch bg-card/80 backdrop-blur-xl rounded-[1.5rem] border border-foreground/10 shadow-[0_20px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)]" style="gap: 0.6cqi; padding: 0.4cqi;">
            <PillButton href="#pipeline" label={ctaDesktop} Icon={Zap} accentColor="primary" />
            <div class="flex items-center bg-foreground/5 rounded-[1.2rem]" style="gap: 0.3cqi; padding: 0 0.4cqi;">
                <a class="inline-flex items-center justify-center whitespace-nowrap p-0 rounded-xl hover:bg-foreground/10 transition-colors" style="width: 2.5cqi; height: 2.5cqi;" href={links.github} target="_blank" aria-label="GitHub Profile">
                    <Github size={20} class="text-foreground/80" />
                </a>
                <div class="w-[1px] h-6 bg-foreground/10"></div>
                <a class="inline-flex items-center justify-center whitespace-nowrap p-0 rounded-xl hover:bg-foreground/10 transition-colors" style="width: 2.5cqi; height: 2.5cqi;" href={links.linkedin} target="_blank" aria-label="LinkedIn Profile">
                    <Linkedin size={20} class="text-foreground/80" />
                </a>
                <div class="w-[1px] h-6 bg-foreground/10"></div>
                <a class="inline-flex items-center justify-center whitespace-nowrap rounded-xl hover:bg-foreground/10 font-mono uppercase tracking-widest text-primary transition-colors" style="height: 2.5cqi; padding: 0 0.8cqi; font-size: clamp(8px, 0.7cqi, 11px);" href={links.resume} target="_blank">
                    Resume
                </a>
            </div>
        </div>
    {/if}
{/snippet}

<MobileCarousel
  layout="left"
  sectionTitle={heroContent.identity.sectionTitle}
  sectionDescription={heroContent.identity.sectionDescription}
  accentColor="hsl(var(--primary))"
>
  <svelte:fragment slot="content-pc">
    <div class="absolute inset-0 z-20 w-full h-full pointer-events-none flex justify-center overflow-hidden" style="container-type: size; padding-left: 3cqi; padding-right: 3cqi;">
      <div class="relative w-full h-full max-w-none">
        <div class="w-full h-full grid grid-cols-12 items-center" style="gap: 2cqi; padding-bottom: 4cqi;">
          <div class="col-span-6 xl:col-span-5 flex flex-col justify-center items-start pointer-events-auto z-10 w-full">
            {@render heroHeader(false)}
          </div>
          <div class="col-span-6 col-start-7 relative z-30 flex flex-col justify-center items-start pointer-events-auto">
            {@render heroBioCard(false)}
          </div>
        </div>
        <div class="absolute left-1/2 -translate-x-1/2 z-40 w-full pointer-events-auto flex flex-col items-center justify-center gap-4" style="bottom: 3cqi; max-width: 45cqi;">
            {@render heroActionDock(false)}
        </div>
      </div>
    </div>
  </svelte:fragment>
  <svelte:fragment slot="content-mobile">
    <div class="h-full w-full overflow-y-auto overscroll-contain no-scrollbar touch-pan-y relative z-20 pointer-events-auto">
      <div class="flex flex-col items-center w-full min-h-max px-4 pt-[14vh] pb-[18vh] mx-auto relative">
        <div class="w-full flex flex-col items-center relative z-10">
          {@render heroHeader(true)}
          {@render heroBioCard(true)}
          {@render heroActionDock(true)}
        </div>
      </div>
    </div>
  </svelte:fragment>
</MobileCarousel>

<style>
    .btn-hero-nav {
        display: inline-flex;
        align-items: center;
        gap: 0.7rem;
        padding: 0.78rem 1rem;
        border-radius: 9999px;
        border: 1px solid hsl(var(--foreground) / 0.08);
        background: linear-gradient(
            180deg,
            hsl(var(--foreground) / 0.045),
            hsl(var(--foreground) / 0.025)
        );
        color: hsl(var(--foreground) / 0.78);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        box-shadow:
            0 8px 24px rgba(0, 0, 0, 0.18),
            inset 0 1px 0 rgba(255, 255, 255, 0.04);
        font-size: 0.92rem;
        font-weight: 520;
        letter-spacing: -0.01em;
        transition:
            transform 180ms ease,
            border-color 180ms ease,
            background 180ms ease,
            color 180ms ease,
            box-shadow 180ms ease;
    }

    .btn-hero-nav:hover {
        transform: translateY(-1px);
        color: hsl(var(--foreground) / 0.96);
        border-color: hsl(var(--primary) / 0.28);
        background: linear-gradient(
            180deg,
            hsl(var(--foreground) / 0.07),
            hsl(var(--foreground) / 0.035)
        );
        box-shadow:
            0 12px 30px rgba(0, 0, 0, 0.22),
            0 0 0 1px hsl(var(--primary) / 0.08) inset;
    }

    .btn-hero-nav:active {
        transform: translateY(0);
    }

    .hero-index {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 1.9rem;
        height: 1.9rem;
        padding: 0 0.45rem;
        border-radius: 9999px;
        background: hsl(var(--foreground) / 0.06);
        border: 1px solid hsl(var(--foreground) / 0.08);
        color: hsl(var(--primary) / 0.9);
        font-size: 0.72rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
            monospace;
    }

    .btn-hero-nav:hover .hero-index {
        background: hsl(var(--primary) / 0.12);
        border-color: hsl(var(--primary) / 0.2);
        color: hsl(var(--primary));
    }
</style>
