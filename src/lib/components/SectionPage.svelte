<!-- src/lib/components/SectionPage.svelte -->
<script lang="ts">
    import {
        ArrowLeft,
        Sparkles,
        MoveRight,
        ArrowUpRight,
    } from "lucide-svelte";
    import type { SectionContent } from "$lib/types/section";
    import { onMount, onDestroy, tick } from "svelte";
    import { page } from "$app/stores";
    import gsap from "gsap";
    import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
    import SEO from "$lib/components/SEO.svelte";
    import Breadcrumbs from "$lib/components/seo/Breadcrumbs.svelte";

    export let content: SectionContent;
    export let accentColor: string = "hsl(var(--primary))";

    let mounted = false;

    // We store triggers to kill them on navigation
    let triggers: ScrollTrigger[] = [];

    // Force scroll to top on mount for SvelteKit routing
    let ctx: gsap.Context;

    onMount(async () => {
        mounted = true;
        window.scrollTo(0, 0);

        // Wait for DOM to fully update layout before measuring
        await tick();

        ctx = gsap.context(() => {
            gsap.registerPlugin(ScrollTrigger);

            // Give a tiny buffer for any images/fonts to settle
            requestAnimationFrame(() => {
                ScrollTrigger.refresh();
            });

            // Hero Animation
            gsap.fromTo(
                ".hero-elem",
                { y: 60, opacity: 0, filter: "blur(10px)" },
                {
                    y: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    duration: 1.2,
                    stagger: 0.15,
                    ease: "expo.out",
                    clearProps: "filter", // prevent filter-related scroll/rendering bugs
                },
            );

            // Bento Grid Animation
            const bentoAnim = gsap.fromTo(
                ".bento-card",
                { y: 80, opacity: 0, scale: 0.9 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    stagger: 0.1,
                    ease: "power4.out",
                    scrollTrigger: { trigger: ".bento-grid", start: "top 85%" },
                },
            );
            triggers.push(bentoAnim.scrollTrigger as ScrollTrigger);

            // Details Section Fade In
            const fadeElems = gsap.utils.toArray(".fade-up");
            fadeElems.forEach((elem) => {
                const anim = gsap.fromTo(
                    elem as Element,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: elem as Element,
                            start: "top 85%",
                        },
                    },
                );
                triggers.push(anim.scrollTrigger as ScrollTrigger);
            });

            // Ambient Orb Movement
            gsap.to(".ambient-orb", {
                x: "random(-50, 50, 5)",
                y: "random(-50, 50, 5)",
                duration: 8,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                stagger: 0.5,
            });
            ScrollTrigger.refresh();
        });
    });

    onDestroy(() => {
        // Kill all scroll triggers associated with this page
        triggers.forEach((t) => t?.kill());
        if (typeof document !== "undefined") {
            document.body.style.overflow = "";
        }
        ScrollTrigger.defaults({ scroller: window });
        ctx?.revert();
    });

    // Helper to determine bento grid sizes
    const getBentoClass = (index: number, total: number) => {
        if (total === 4) {
            if (index === 0) return "col-span-12 md:col-span-8 row-span-2";
            if (index === 1) return "col-span-12 md:col-span-4 row-span-1";
            if (index === 2) return "col-span-12 md:col-span-4 row-span-1";
            if (index === 3)
                return "col-span-12 md:col-span-12 lg:col-span-8 row-span-1";
        }
        return "col-span-12 md:col-span-6";
    };
</script>

<SEO 
    title={content.seoTitle}
    description={content.seoDescription}
    keywords={content.seoKeywords.join(", ")}
    url="https://krishnanandanil.com{content.slug}"
/>

<div
    class="relative min-h-screen bg-background text-foreground overflow-x-hidden"
>
    <!-- Base Grain/Noise Layer -->
    <div
        class="fixed inset-0 pointer-events-none z-50 opacity-[0.03]"
        style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E'); mix-blend-mode: overlay; transform: translateZ(0); will-change: transform;"
    ></div>

    <!-- Animated Ambient Orbs Background -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
        
        
    </div>

    <div
        class="absolute top-24 left-0 right-0 z-40 flex justify-center pointer-events-none px-4"
    >
        <div class="pointer-events-auto flex items-center bg-card/85 backdrop-blur-xl px-5 py-2.5 rounded-xl border border-border/80 shadow-[var(--shadow-md)] hover:border-primary/40 transition-all duration-300">
            <Breadcrumbs crumbs={[{ label: content.id, url: content.slug }]} className="m-0" />
        </div>
    </div>

    <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-36 sm:pt-40 pb-20 sm:pb-24">
        <!-- Hero Section (Heading leads first — no eyebrow above heading, no gradient text) -->
        <header class="mb-16 sm:mb-24 md:mb-28">
            <h1
                class="hero-elem text-3xl sm:text-5xl md:text-6xl font-heading font-extrabold tracking-tight leading-[0.96] mb-6"
            >
                <span class="block text-foreground">{content.headline}</span>
                <span class="block text-primary mt-1.5">
                    {content.subHeadline}
                </span>
            </h1>

            <div
                class="hero-elem flex items-center gap-2.5 mb-8 pb-6 border-b border-border/70"
            >
                <Sparkles size={13} class="text-primary" />
                <span
                    class="text-[11px] font-mono font-semibold tracking-[0.2em] uppercase text-primary"
                    >Architectural Specification // {content.id}</span
                >
            </div>

            <div
                class="hero-elem grid md:grid-cols-12 gap-6 md:gap-12 items-start"
            >
                <div class="md:col-span-4 flex items-center gap-3">
                    <div class="w-8 h-px" style="background-color: {accentColor};"></div>
                    <p
                        class="font-mono text-xs text-muted-foreground tracking-[0.2em] uppercase mb-0"
                    >
                        Overview Synopsis
                    </p>
                </div>
                <div class="md:col-span-8">
                    <p
                        class="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed mb-0"
                    >
                        {@html content.introParagraph}
                    </p>
                </div>
            </div>
        </header>

        <!-- Bento Grid Highlights -->
        <section class="max-w-6xl mx-auto mb-20 md:mb-28">
            <div class="mb-8 fade-up">
                <h2
                    class="text-xs font-mono font-bold tracking-[0.24em] uppercase text-muted-foreground flex items-center gap-4"
                >
                    <span class="w-8 h-px bg-primary/50"></span> Key Metrics
                    <span class="w-full h-px bg-border/70"></span>
                </h2>
            </div>

            <div
                class="bento-grid grid grid-cols-12 gap-4 lg:gap-5"
                style="grid-auto-rows: minmax(175px, auto);"
            >
                {#each content.highlights as h, i}
                    <div
                        class="bento-card group relative overflow-hidden rounded-2xl border border-border/80 bg-card/85 p-6 sm:p-7 flex flex-col justify-between hover:border-primary/45 shadow-[var(--shadow-sm)] transition-all duration-300 {getBentoClass(
                            i,
                            content.highlights.length,
                        )}"
                    >
                        <div class="relative z-10">
                            <h3
                                class="text-sm font-heading font-bold text-foreground mb-1"
                            >
                                {h.label}
                            </h3>
                            <p
                                class="text-xs text-muted-foreground font-mono max-w-[260px] leading-relaxed mb-0"
                            >
                                {h.description}
                            </p>
                        </div>
                        <div
                            class="relative z-10 flex items-end justify-between mt-5 pt-4 border-t border-border/60"
                        >
                            <span
                                class="font-mono tabular-nums font-bold tracking-tight break-words max-w-full leading-none text-primary {h
                                    .value.length > 8
                                    ? 'text-2xl sm:text-4xl'
                                    : h.value.length > 5
                                      ? 'text-3xl sm:text-5xl'
                                      : 'text-4xl sm:text-6xl'}"
                                >{h.value}</span
                            >

                            <div
                                class="w-8 h-8 rounded-lg border border-border/80 flex items-center justify-center bg-muted/60 group-hover:border-primary/40 transition-all duration-300"
                            >
                                <ArrowUpRight
                                    size={14}
                                    class="text-muted-foreground group-hover:text-primary"
                                />
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        </section>

        <!-- Story & Paragraphs -->
        <section class="max-w-4xl mx-auto mb-20 md:mb-28">
            <div class="fade-up mb-10">
                <h2
                    class="text-xs font-mono font-bold tracking-[0.24em] uppercase text-muted-foreground flex items-center gap-4"
                >
                    <span class="w-8 h-px bg-primary/50"></span> Context & Approach
                    <span class="w-full h-px bg-border/70"></span>
                </h2>
            </div>

            <div
                class="space-y-6 pl-0 md:pl-8 border-l-0 md:border-l border-border/80"
            >
                {#each content.paragraphs as para}
                    <p
                        class="fade-up text-base sm:text-lg text-muted-foreground leading-relaxed"
                    >
                        {@html para}
                    </p>
                {/each}
            </div>
        </section>

        <!-- Detailed Experiences/Tools Matrix -->
        <section class="mb-24 md:mb-28">
            <div class="fade-up mb-10">
                <h2
                    class="text-xs font-mono font-bold tracking-[0.24em] uppercase text-muted-foreground flex items-center gap-4"
                >
                    <span class="w-8 h-px bg-primary/50"></span> Technical Deep Dive
                    <span class="w-full h-px bg-border/70"></span>
                </h2>
            </div>

            <div class="space-y-5">
                {#each content.detailSections as section, i}
                    <div
                        class="fade-up group relative rounded-2xl border border-border/80 bg-card/85 p-6 sm:p-8 md:p-10 overflow-hidden hover:border-primary/40 shadow-[var(--shadow-sm)] transition-colors duration-300"
                    >
                        <div
                            class="grid md:grid-cols-12 gap-6 md:gap-12 relative z-10"
                        >
                            <div
                                class="md:col-span-5 flex flex-col justify-between"
                            >
                                <div>
                                    <div class="flex items-start justify-between gap-3 mb-3">
                                        <h3
                                            class="text-xl sm:text-2xl font-heading font-bold tracking-tight text-foreground leading-snug"
                                        >
                                            {section.title}
                                        </h3>
                                        <span
                                            class="font-mono tabular-nums text-xs font-bold text-primary px-2 py-0.5 rounded bg-primary/10 border border-primary/30 shrink-0 mt-1"
                                            >0{i + 1}</span
                                        >
                                    </div>
                                </div>
                                <p
                                    class="text-sm sm:text-base text-muted-foreground leading-relaxed mt-2 md:mt-0 mb-0"
                                >
                                    {section.content}
                                </p>
                            </div>

                            <div class="md:col-span-7 md:border-l md:border-border/70 md:pl-8">
                                {#if section.bullets && section.bullets.length > 0}
                                    <div
                                        class="grid sm:grid-cols-2 gap-x-6 gap-y-3.5"
                                    >
                                        {#each section.bullets as bullet}
                                            <div class="flex items-start gap-2.5">
                                                <div
                                                    class="w-4 h-4 rounded flex items-center justify-center shrink-0 mt-1 bg-primary/12 border border-primary/35"
                                                >
                                                    <div
                                                        class="w-1.5 h-1.5 rounded-xs bg-primary"
                                                    ></div>
                                                </div>
                                                <span
                                                    class="text-sm text-muted-foreground leading-relaxed"
                                                    >{bullet}</span
                                                >
                                            </div>
                                        {/each}
                                    </div>
                                {/if}
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        </section>

        <!-- Footer CTA Banner -->
        <footer
            class="fade-up relative overflow-hidden rounded-2xl border border-border/80 bg-card/85 shadow-[var(--shadow-lg)] p-8 sm:p-12 md:p-14 text-center"
        >
            <div
                class="relative z-10 flex flex-col items-center max-w-2xl mx-auto"
            >
                <div
                    class="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/12 border border-primary/35 text-primary mb-6"
                >
                    <Sparkles size={20} />
                </div>

                <h2
                    class="text-2xl sm:text-4xl font-heading font-extrabold tracking-tight text-foreground mb-4"
                >
                    Ready to engineer data at scale?
                </h2>

                <p class="text-base sm:text-lg text-muted-foreground mb-8">
                    Whether you need to architect a real-time streaming pipeline
                    or design an enterprise data warehouse, let's build
                    something exceptional.
                </p>

                <a
                    href="/#contact"
                    class="group relative inline-flex items-center gap-3 px-7 py-3.5 rounded-xl bg-primary text-primary-foreground font-heading font-bold text-sm tracking-tight transition-all duration-300 hover:-translate-y-0.5 shadow-[var(--shadow-md)] no-underline"
                >
                    <span class="relative z-10">Start a Conversation</span>
                    <MoveRight
                        size={16}
                        class="relative z-10 group-hover:translate-x-1 transition-transform"
                    />
                </a>
            </div>
        </footer>
    </div>
</div>
