<!-- src/lib/components/SectionPage.svelte -->
<script lang="ts">
    import {
        ArrowLeft,
        Sparkles,
        MoveRight,
        ArrowUpRight,
    } from "lucide-svelte";
    import type { SectionContent } from "$lib/data/section-content";
    import { onMount, onDestroy, tick } from "svelte";
    import { page } from "$app/stores";
    import gsap from "gsap";
    import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

    export let content: SectionContent;
    export let accentColor: string = "#3b82f6";

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

<svelte:head>
    <title>{content.seoTitle}</title>
    <meta name="description" content={content.seoDescription} />
    <meta name="keywords" content={content.seoKeywords.join(", ")} />
    <meta property="og:title" content={content.seoTitle} />
    <meta property="og:description" content={content.seoDescription} />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={content.seoTitle} />
    <meta name="twitter:description" content={content.seoDescription} />
    <link rel="canonical" href="https://krishnanandanil.com{content.slug}" />
</svelte:head>

<div
    class="relative min-h-screen bg-[#03060c] text-white selection:bg-white/20 overflow-x-hidden"
>
    <!-- Base Grain/Noise Layer -->
    <div
        class="fixed inset-0 pointer-events-none z-50 opacity-[0.03]"
        style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E'); mix-blend-mode: overlay;"
    ></div>

    <!-- Animated Ambient Orbs Background -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div
            class="ambient-orb absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full blur-[120px] opacity-20"
            style="background: {accentColor}"
        ></div>
        <div
            class="ambient-orb absolute bottom-1/4 right-[-10%] w-[40vw] h-[40vw] rounded-full blur-[140px] opacity-10"
            style="background: {accentColor}"
        ></div>
    </div>

    <!-- Navigation (Floating Pill) -->
    <div
        class="fixed top-6 left-0 right-0 z-40 flex justify-center pointer-events-none"
    >
        <nav
            class="pointer-events-auto flex items-center justify-between gap-12 px-6 py-3 rounded-full border border-white/[0.08] bg-black/50 backdrop-blur-2xl shadow-2xl transition-all duration-300 hover:border-white/20 hover:bg-black/60"
        >
            <a
                href="/"
                class="group flex items-center gap-2 text-xs font-bold text-white/60 hover:text-white transition-colors"
            >
                <ArrowLeft
                    size={14}
                    class="group-hover:-translate-x-1 transition-transform"
                />
                <span>Return to Overview</span>
            </a>
            <div class="flex items-center gap-2">
                <div
                    class="w-1.5 h-1.5 rounded-full animate-pulse"
                    style="background: {accentColor}"
                ></div>
                <span
                    class="font-mono text-[9px] text-white/50 tracking-[0.2em] uppercase"
                    >{content.id}</span
                >
            </div>
        </nav>
    </div>

    <div class="relative z-10 max-w-6xl mx-auto px-6 pt-40 pb-24">
        <!-- Hero Section -->
        <header class="mb-24 md:mb-32">
            <div
                class="hero-elem inline-flex items-center gap-2 px-3 py-1.5 rounded-full border bg-white/[0.02] backdrop-blur-md mb-8"
                style="border-color: {accentColor}30"
            >
                <Sparkles size={12} style="color: {accentColor}" />
                <span
                    class="text-[10px] font-mono font-bold tracking-[0.2em] uppercase"
                    style="color: {accentColor}">Deep Dive Module</span
                >
            </div>

            <h1
                class="hero-elem text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8"
            >
                <span class="block text-white/90">{content.headline}</span>
                <span
                    class="block text-transparent bg-clip-text pb-2 lg:pb-4"
                    style="background-image: linear-gradient(135deg, {accentColor}, #ffffff)"
                >
                    {content.subHeadline}
                </span>
            </h1>

            <div
                class="hero-elem grid md:grid-cols-12 gap-8 md:gap-16 items-start"
            >
                <div class="md:col-span-4">
                    <div
                        class="w-12 h-1 rounded-full mb-6"
                        style="background: {accentColor}"
                    ></div>
                    <p
                        class="font-mono text-xs text-white/40 tracking-widest uppercase"
                    >
                        Overview Synopsis
                    </p>
                </div>
                <div class="md:col-span-8">
                    <p
                        class="text-xl md:text-2xl text-white/70 leading-relaxed font-light"
                    >
                        {content.introParagraph}
                    </p>
                </div>
            </div>
        </header>

        <!-- Bento Grid Highlights -->
        <section class="max-w-6xl mx-auto mb-24 md:mb-32">
            <div class="mb-10 fade-up">
                <h2
                    class="text-xs font-mono font-bold tracking-[0.3em] uppercase text-white/30 flex items-center gap-4"
                >
                    <span class="w-8 h-px bg-white/20"></span> Key Metrics
                    <span class="w-full h-px bg-white/10"></span>
                </h2>
            </div>

            <div
                class="bento-grid grid grid-cols-12 gap-4 lg:gap-6"
                style="grid-auto-rows: minmax(200px, auto);"
            >
                {#each content.highlights as h, i}
                    <div
                        class="bento-card group relative overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-transparent p-8 flex flex-col justify-between hover:border-white/15 transition-all duration-500 {getBentoClass(
                            i,
                            content.highlights.length,
                        )}"
                    >
                        <!-- Card Hover Glow -->
                        <div
                            class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                            style="background: radial-gradient(circle at center, {accentColor}15 0%, transparent 60%);"
                        ></div>

                        <div class="relative z-10">
                            <h3 class="text-sm font-bold text-white/60 mb-1">
                                {h.label}
                            </h3>
                            <p
                                class="text-[11px] text-white/30 font-mono max-w-[200px] leading-relaxed"
                            >
                                {h.description}
                            </p>
                        </div>
                        <div
                            class="relative z-10 flex items-end justify-between mt-6"
                        >
                            <span
                                class="font-black tracking-tighter break-words max-w-full leading-none {h
                                    .value.length > 8
                                    ? 'text-3xl md:text-5xl'
                                    : h.value.length > 5
                                      ? 'text-4xl md:text-6xl'
                                      : 'text-5xl md:text-7xl'}"
                                style="color: {accentColor}">{h.value}</span
                            >

                            <div
                                class="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-300 bg-white/5"
                            >
                                <ArrowUpRight size={14} class="text-white/70" />
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        </section>

        <!-- Story & Paragraphs -->
        <section class="max-w-4xl mx-auto mb-24 md:mb-32">
            <div class="fade-up mb-12">
                <h2
                    class="text-xs font-mono font-bold tracking-[0.3em] uppercase text-white/30 flex items-center gap-4"
                >
                    <span class="w-8 h-px bg-white/20"></span> Context &
                    Approach <span class="w-full h-px bg-white/10"></span>
                </h2>
            </div>

            <div
                class="space-y-8 pl-0 md:pl-12 border-l-0 md:border-l border-white/5"
            >
                {#each content.paragraphs as para}
                    <p
                        class="fade-up text-lg md:text-xl text-white/50 leading-relaxed font-light"
                    >
                        {para}
                    </p>
                {/each}
            </div>
        </section>

        <!-- Detailed Experiences/Tools Matrix -->
        <section class="mb-32">
            <div class="fade-up mb-16">
                <h2
                    class="text-xs font-mono font-bold tracking-[0.3em] uppercase text-white/30 flex items-center gap-4"
                >
                    <span class="w-8 h-px bg-white/20"></span> Technical Deep
                    Dive <span class="w-full h-px bg-white/10"></span>
                </h2>
            </div>

            <div class="space-y-6">
                {#each content.detailSections as section, i}
                    <div
                        class="fade-up group relative rounded-3xl border border-white/[0.06] bg-white/[0.01] p-8 md:p-12 overflow-hidden hover:bg-white/[0.02] transition-colors duration-500"
                    >
                        <!-- Geometric Accent -->
                        <div
                            class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none rounded-bl-[100px]"
                            style="from-color: {accentColor}; to-color: transparent;"
                        ></div>

                        <div
                            class="grid md:grid-cols-12 gap-8 md:gap-16 relative z-10"
                        >
                            <div
                                class="md:col-span-5 flex flex-col justify-between"
                            >
                                <div>
                                    <span
                                        class="font-mono text-xs mb-3 block"
                                        style="color: {accentColor}"
                                        >0{i + 1}</span
                                    >
                                    <h3
                                        class="text-2xl md:text-3xl font-bold tracking-tight text-white/90 mb-4"
                                    >
                                        {section.title}
                                    </h3>
                                </div>
                                <p
                                    class="text-white/50 leading-relaxed font-light mt-4 md:mt-0"
                                >
                                    {section.content}
                                </p>
                            </div>

                            <div class="md:col-span-7">
                                {#if section.bullets && section.bullets.length > 0}
                                    <div
                                        class="grid sm:grid-cols-2 gap-x-6 gap-y-4"
                                    >
                                        {#each section.bullets as bullet}
                                            <div class="flex items-start gap-3">
                                                <div
                                                    class="w-4 h-4 rounded flex items-center justify-center shrink-0 mt-0.5 bg-white/[0.03] border border-white/[0.08]"
                                                >
                                                    <div
                                                        class="w-1.5 h-1.5 rounded-sm"
                                                        style="background: {accentColor}"
                                                    ></div>
                                                </div>
                                                <span
                                                    class="text-sm text-white/60 leading-normal"
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
            class="fade-up relative overflow-hidden rounded-[2rem] border border-white/[0.08] p-10 md:p-16 text-center"
        >
            <!-- Banner Background -->
            <div class="absolute inset-0 z-0">
                <div
                    class="absolute inset-0 bg-gradient-to-b from-transparent to-black/80"
                ></div>
                <div
                    class="absolute inset-0 opacity-20"
                    style="background: radial-gradient(circle at bottom, {accentColor}, transparent 70%);"
                ></div>
            </div>

            <div
                class="relative z-10 flex flex-col items-center max-w-2xl mx-auto"
            >
                <div
                    class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 mb-8 backdrop-blur-md"
                >
                    <Sparkles size={24} style="color: {accentColor}" />
                </div>

                <h2
                    class="text-4xl md:text-5xl font-black tracking-tight text-white mb-6"
                >
                    Ready to engineer data at scale?
                </h2>

                <p class="text-lg text-white/50 mb-10">
                    Whether you need to architect a real-time streaming pipeline
                    or design an enterprise data warehouse, let's build
                    something exceptional.
                </p>

                <a
                    href="/contact"
                    class="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm tracking-wide transition-all duration-300 hover:scale-105"
                    style="background: {accentColor}; color: #ffffff; text-shadow: 0 1px 2px rgba(0,0,0,0.2);"
                >
                    <span class="relative z-10">Start a Conversation</span>
                    <MoveRight
                        size={16}
                        class="relative z-10 group-hover:translate-x-1 transition-transform"
                    />
                    <!-- Inner glow -->
                    <div
                        class="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-white/20"
                    ></div>
                </a>
            </div>
        </footer>
    </div>
</div>
