<script lang="ts">
    import { personal } from "$lib/data/site";
    import { heroContent, type TechItem } from "$lib/data/hero_content";
    import { onMount } from "svelte";
    import gsap from "gsap";

    import MobileCarousel from "$lib/components/ui/MobileCarousel.svelte";
    import SectionCard from "$lib/components/ui/cards/SectionCard.svelte";
    import InfiniteMarquee from "$lib/components/ui/marquee/InfiniteMarquee.svelte";
    import PillButton from "$lib/components/ui/buttons/PillButton.svelte";

    import {
        TerminalSquare,
        Cpu,
        Zap,
        Github,
        Linkedin,
        FileText,
    } from "lucide-svelte";

    const techStack = heroContent.marquee.techStack;
    const prefix = heroContent.headline.prefix;
    const suffix = heroContent.headline.suffix;
    const metaLabelDesktop = heroContent.headline.metaLabelDesktop;
    const metaLabelMobile = heroContent.headline.metaLabelMobile;
    const payloadLabel = heroContent.marquee.payloadLabel;
    const ctaDesktop = heroContent.actionDock.ctaDesktop;
    const ctaMobile = heroContent.actionDock.cta;
    const links = heroContent.actionDock.links;

    let heroPcRoot: HTMLElement;

    onMount(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const ctx = gsap.context(() => {
            if (heroPcRoot) {
                gsap.fromTo(
                    heroPcRoot.querySelectorAll(".hero-type, .action-dock"),
                    { y: 20, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.75,
                        stagger: 0.07,
                        ease: "expo.out",
                        delay: 0.15,
                        clearProps: "transform,opacity",
                    },
                );
            }
        });
        return () => ctx.revert();
    });
</script>

{#snippet heroHeader(isMobile: boolean)}
    {#if isMobile}
        <div class="w-full relative z-10 flex flex-col gap-3.5">
            <div
                class="flex flex-col items-start w-full max-w-full relative"
                role="presentation"
            >
                <span
                    class="hero-type text-left font-heading font-extrabold text-[clamp(2.75rem,12vw,4.25rem)] leading-[0.88] tracking-[-0.035em] text-muted-foreground w-full block"
                    >{prefix}</span
                >
                <span
                    class="hero-type text-left font-heading font-extrabold text-[clamp(2.75rem,12vw,4.25rem)] leading-[0.88] tracking-[-0.035em] text-foreground w-full block"
                    >{suffix}</span
                >
            </div>

            <!-- Architectural Identity Ledger Bar (placed below heading — no eyebrow above heading) -->
            <div class="hero-type flex flex-wrap items-center justify-between gap-2 w-full pt-2.5 border-t border-border/70">
                <div
                    class="flex items-center gap-2 bg-card/85 border border-border/80 rounded-lg px-3 py-1.5 shadow-2xs shrink-0"
                >
                    <span class="h-1.5 w-1.5 rounded-full bg-primary"></span>
                    <span
                        class="font-mono text-[10px] font-bold tracking-[0.16em] text-foreground uppercase"
                        >{personal.name}</span
                    >
                </div>
                <div
                    class="flex items-center gap-2 bg-card/85 border border-border/80 rounded-lg px-3 py-1.5 shadow-2xs shrink-0"
                >
                    <div
                        class="w-1.5 h-1.5 rounded-full bg-success"
                    ></div>
                    <span
                        class="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground font-semibold"
                        >{metaLabelMobile}</span
                    >
                </div>
            </div>
        </div>
    {:else}
        <div class="relative z-10 w-full flex flex-col justify-center">
            <div class="flex flex-col" role="presentation">
                <span
                    class="hero-type block font-heading font-extrabold leading-[0.86] tracking-[-0.035em] text-[clamp(3.75rem,5.6vw,5.75rem)] text-muted-foreground"
                    >{prefix}</span
                >
                <span
                    class="hero-type block font-heading font-extrabold leading-[0.86] tracking-[-0.035em] text-[clamp(3.75rem,5.6vw,5.75rem)] text-foreground"
                    >{suffix}</span
                >
            </div>

            <!-- Architectural Identity & Status Bar (below primary display title) -->
            <div
                class="hero-type flex items-center border-t border-border/70"
                style="gap: 0.85cqi; margin-top: 1.35cqi; padding-top: 1.1cqi;"
            >
                <div
                    class="flex items-center bg-card/85 border border-border/80 rounded-lg backdrop-blur-md shadow-xs"
                    style="gap: 0.55cqi; padding: 0.42cqi 0.9cqi;"
                >
                    <span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    <span
                        class="font-mono font-bold tracking-[0.2em] text-foreground uppercase"
                        style="font-size: clamp(9px, 0.72cqi, 11px);"
                        >{personal.name}</span
                    >
                </div>
                <div
                    class="flex items-center bg-card/85 border border-border/80 rounded-lg backdrop-blur-md shadow-xs"
                    style="gap: 0.5cqi; padding: 0.42cqi 0.85cqi;"
                >
                    <div
                        class="w-1.5 h-1.5 rounded-full bg-success animate-pulse"
                    ></div>
                    <span
                        class="font-mono uppercase tracking-[0.18em] text-muted-foreground font-semibold"
                        style="font-size: clamp(8px, 0.68cqi, 10px);"
                        >{metaLabelDesktop}</span
                    >
                </div>
            </div>

            <div
                class="hero-type w-full max-w-[95%] pointer-events-auto flex items-center"
                style="margin-top: 1.8cqi; gap: 0.9cqi;"
            >
                <div
                    class="flex items-center border border-border/80 bg-card/85 shadow-xs backdrop-blur-md rounded-xl shrink-0"
                    style="gap: 0.5cqi; padding: 0.45cqi 0.85cqi;"
                >
                    <Cpu
                        size={15}
                        class="text-primary"
                    />
                    <span
                        class="font-mono text-foreground tracking-[0.18em] uppercase font-bold"
                        style="font-size: clamp(8px, 0.7cqi, 10px);"
                        >{payloadLabel}</span
                    >
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
        metrics={[
            { label: "Throughput", value: "50", unit: "M+/day" },
            { label: "Pipeline SLA", value: "99.9", unit: "%" },
        ]}
    />
    {#if isMobile}
        <div
            class="hero-type relative w-full z-20 overflow-hidden pointer-events-auto"
        >
            <InfiniteMarquee items={techStack} />
        </div>
    {/if}
{/snippet}

{#snippet heroActionDock(isMobile: boolean)}
    {#if isMobile}
        <div class="action-dock w-full relative z-30 pointer-events-auto">
            <div
                class="w-full flex items-stretch justify-between gap-2 p-1.5 bg-card/90 backdrop-blur-xl rounded-2xl border border-border/80 shadow-[var(--shadow-lg)]"
            >
                <PillButton
                    href="#pipeline"
                    label={ctaMobile}
                    Icon={Zap}
                    accentColor="primary"
                />
                <div
                    class="flex items-center gap-1 px-1.5 bg-muted/60 rounded-xl border border-border/70"
                >
                    <a
                        class="inline-flex items-center justify-center whitespace-nowrap w-11 h-11 p-0 rounded-lg hover:bg-primary/10 transition-colors"
                        href={links.github}
                        target="_blank"
                        aria-label="GitHub Profile"
                    >
                        <Github size={18} class="text-foreground" />
                    </a>
                    <div class="w-px h-5 bg-border/80"></div>
                    <a
                        class="inline-flex items-center justify-center whitespace-nowrap w-11 h-11 p-0 rounded-lg hover:bg-primary/10 transition-colors"
                        href={links.linkedin}
                        target="_blank"
                        aria-label="LinkedIn Profile"
                    >
                        <Linkedin size={18} class="text-foreground" />
                    </a>
                    <div class="w-px h-5 bg-border/80"></div>
                    <a
                        class="inline-flex items-center justify-center whitespace-nowrap w-11 h-11 p-0 rounded-lg hover:bg-primary/10 transition-colors"
                        href={links.resume}
                        target="_blank"
                        aria-label="View Resume Document"
                    >
                        <FileText
                            size={18}
                            class="text-foreground"
                        />
                    </a>
                </div>
            </div>
        </div>
    {:else}
        <div
            class="action-dock flex items-stretch bg-card/88 backdrop-blur-xl rounded-2xl border border-border/80 shadow-[var(--shadow-lg)]"
            style="gap: 0.55cqi; padding: 0.38cqi;"
        >
            <PillButton
                href="#pipeline"
                label={ctaDesktop}
                Icon={Zap}
                accentColor="primary"
            />
            <div
                class="flex items-center bg-muted/55 border border-border/70 rounded-xl"
                style="gap: 0.3cqi; padding: 0 0.4cqi;"
            >
                <a
                    class="inline-flex items-center justify-center whitespace-nowrap p-0 rounded-lg hover:bg-primary/10 transition-colors"
                    style="width: 2.5cqi; height: 2.5cqi;"
                    href={links.github}
                    target="_blank"
                    aria-label="GitHub Profile"
                >
                    <Github size={18} class="text-foreground" />
                </a>
                <div class="w-px h-5 bg-border/80"></div>
                <a
                    class="inline-flex items-center justify-center whitespace-nowrap p-0 rounded-lg hover:bg-primary/10 transition-colors"
                    style="width: 2.5cqi; height: 2.5cqi;"
                    href={links.linkedin}
                    target="_blank"
                    aria-label="LinkedIn Profile"
                >
                    <Linkedin size={18} class="text-foreground" />
                </a>
                <div class="w-px h-5 bg-border/80"></div>
                <a
                    class="inline-flex items-center justify-center whitespace-nowrap rounded-lg hover:bg-primary/10 font-mono uppercase tracking-wider text-primary transition-colors"
                    style="height: 2.5cqi; padding: 0 0.8cqi; font-size: clamp(9px, 0.72cqi, 11px);"
                    href={links.resume}
                    target="_blank"
                >
                    <FileText
                        size={17}
                        class="text-primary"
                        aria-label="View Resume Document"
                    />
                    <span class="text-foreground font-semibold pl-1.5">Resume</span>
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
    modelLabel="Platform Core"
    briefLabel="Architect Profile"
>
    <svelte:fragment slot="content-pc">
        <div
            bind:this={heroPcRoot}
            class="absolute inset-0 z-20 w-full h-full pointer-events-none flex justify-center overflow-hidden"
            style="container-type: size; padding-left: 3cqi; padding-right: 3cqi;"
        >
            <div class="relative w-full h-full max-w-none">
                <div
                    class="w-full h-full grid grid-cols-12 items-center"
                    style="gap: 2cqi; padding-bottom: 4cqi;"
                >
                    <div
                        class="col-span-6 xl:col-span-5 flex flex-col justify-center items-start pointer-events-auto z-10 w-full"
                    >
                        {@render heroHeader(false)}
                    </div>
                    <div
                        class="col-span-6 col-start-7 relative z-30 flex flex-col justify-center items-start pointer-events-auto"
                    >
                        {@render heroBioCard(false)}
                    </div>
                </div>
                <div
                    class="absolute left-1/2 -translate-x-1/2 z-40 w-full pointer-events-auto flex flex-col items-center justify-center gap-4"
                    style="bottom: 3cqi; max-width: 45cqi;"
                >
                    {@render heroActionDock(false)}
                </div>
            </div>
        </div>
    </svelte:fragment>
    <svelte:fragment slot="content-mobile">
        <div
            class="w-full relative z-20 pointer-events-auto"
        >
            <div
                class="flex flex-col items-start justify-start w-full min-h-[100dvh] max-w-xl md:max-w-2xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-12 relative"
            >
                <div class="w-full flex flex-col items-start relative z-10 gap-4 sm:gap-5">
                    {@render heroHeader(true)}
                    {@render heroBioCard(true)}
                    {@render heroActionDock(true)}
                </div>
            </div>
        </div>
    </svelte:fragment>
</MobileCarousel>
