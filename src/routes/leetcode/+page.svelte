<!-- src/routes/leetcode/+page.svelte -->
<script lang="ts">
    import { onMount } from "svelte";
    import {
        Sparkles,
        ExternalLink,
        Brain,
        Code2,
        Flame,
        ArrowUpRight,
        Award,
    } from "lucide-svelte";
    import SEO from "$lib/components/SEO.svelte";
    import Breadcrumbs from "$lib/components/seo/Breadcrumbs.svelte";
    import { leetcodeSectionContent } from "$lib/data/leetcode-content";
    import { getLeetCodeStatsCached } from "$lib/services/leetcode";
    import gsap from "gsap";
    import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

    const content = leetcodeSectionContent;

    let stats: any = null;
    let loading = true;
    let error = false;

    let ctx: gsap.Context;

    onMount(() => {
        window.scrollTo(0, 0);

        const loadData = async () => {
            try {
                const data = await getLeetCodeStatsCached();
                if (data && !data.error) {
                    stats = data;
                } else {
                    error = true;
                }
            } catch (e) {
                console.error("Failed to load LeetCode page data", e);
                error = true;
            } finally {
                loading = false;
                setTimeout(() => {
                    initAnimations();
                }, 80);
            }
        };

        loadData();

        return () => {
            ctx?.revert();
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    });

    function initAnimations() {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        ctx = gsap.context(() => {
            gsap.registerPlugin(ScrollTrigger);

            gsap.fromTo(
                ".hero-elem",
                { y: 24, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "expo.out",
                    clearProps: "transform,opacity",
                },
            );

            const fadeElems = gsap.utils.toArray(".fade-up");
            fadeElems.forEach((elem) => {
                gsap.fromTo(
                    elem as Element,
                    { y: 24, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.75,
                        ease: "expo.out",
                        scrollTrigger: {
                            trigger: elem as Element,
                            start: "top 88%",
                        },
                        clearProps: "transform,opacity",
                    },
                );
            });
        });
    }

    const difficulties = [
        {
            label: "Easy",
            key: "easySolved",
            textClass: "text-success",
            barClass: "bg-success",
        },
        {
            label: "Medium",
            key: "mediumSolved",
            textClass: "text-warning",
            barClass: "bg-warning",
        },
        {
            label: "Hard",
            key: "hardSolved",
            textClass: "text-primary",
            barClass: "bg-primary",
        },
    ];
</script>

<SEO
    title={content.seoTitle}
    description={content.seoDescription}
    keywords={content.seoKeywords.join(", ")}
    url="https://krishnanandanil.com/leetcode"
/>

<div
    class="relative min-h-screen bg-background text-foreground overflow-x-hidden"
>
    <!-- Subtle Atmospheric Radial Wash -->
    <div
        class="pointer-events-none fixed inset-0 z-0"
        style="background: radial-gradient(circle at 82% 14%, hsl(var(--warning) / 0.07), transparent 48%), radial-gradient(circle at 18% 82%, hsl(var(--primary) / 0.06), transparent 50%);"
    ></div>

    <div
        class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-20 sm:pt-28 pb-20 sm:pb-24"
    >
        <!-- Breadcrumb Bar -->
        <div class="mb-8 flex items-center justify-between">
            <div
                class="inline-flex items-center bg-card/85 backdrop-blur-xl px-4 py-2 rounded-xl border border-border/80 shadow-2xs"
            >
                <Breadcrumbs
                    crumbs={[{ label: "LeetCode", url: "/leetcode" }]}
                    className="m-0"
                />
            </div>
        </div>

        {#if loading}
            <div
                class="min-h-[60vh] flex flex-col items-center justify-center gap-4"
            >
                <div
                    class="w-10 h-10 border-2 border-border border-t-warning rounded-full animate-spin"
                ></div>
                <p
                    class="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase"
                >
                    Synchronizing Algorithmic Benchmarks...
                </p>
            </div>
        {:else if error || !stats}
            <div
                class="min-h-[60vh] flex flex-col items-center justify-center gap-5 max-w-md mx-auto text-center"
            >
                <div
                    class="w-14 h-14 rounded-2xl bg-card border border-border/80 flex items-center justify-center text-warning"
                >
                    <ExternalLink size={22} />
                </div>
                <h1 class="text-2xl font-heading font-bold text-foreground">
                    Live Telemetry Temporarily Rate-Limited
                </h1>
                <p class="text-sm text-muted-foreground leading-relaxed">
                    Unable to fetch live LeetCode metrics right now. You can
                    inspect the full verified profile directly on LeetCode.
                </p>
                <a
                    href="https://leetcode.com/user8673j"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="px-5 py-3 rounded-xl bg-primary text-primary-foreground font-heading font-bold text-sm flex items-center gap-2 no-underline"
                >
                    Open LeetCode Profile <ArrowUpRight size={15} />
                </a>
            </div>
        {:else}
            <!-- Hero Section (Heading leads first — no eyebrow above heading, no gradient text) -->
            <header class="mb-16 sm:mb-20">
                <h1
                    class="hero-elem text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold tracking-tight leading-[0.95] mb-5"
                >
                    <span class="block text-foreground">{content.headline}</span>
                    <span class="block text-warning mt-1"
                        >{content.subHeadline}</span
                    >
                </h1>

                <!-- Specification Bar Below Heading -->
                <div
                    class="hero-elem flex flex-wrap items-center gap-3 mb-8 pb-6 border-b border-border/75"
                >
                    <span class="h-[2px] w-7 bg-warning rounded-full"></span>
                    <Code2 size={14} class="text-warning" />
                    <span
                        class="text-[11px] font-mono font-bold tracking-[0.18em] uppercase text-warning"
                    >
                        ALGORITHMIC BENCHMARKS // LEETCODE TELEMETRY
                    </span>
                </div>

                <div
                    class="hero-elem grid md:grid-cols-12 gap-6 md:gap-12 items-center"
                >
                    <div class="md:col-span-5">
                        <div
                            class="flex items-center gap-4 p-4 rounded-2xl bg-card/88 border border-border/80 shadow-[var(--shadow-sm)]"
                        >
                            {#if stats.avatar}
                                <img
                                    src={stats.avatar}
                                    alt={stats.name || "user8673j"}
                                    class="w-12 h-12 rounded-xl border border-border/80 shrink-0"
                                />
                            {/if}
                            <div class="min-w-0">
                                <h2
                                    class="text-base font-heading font-bold text-foreground leading-tight break-words"
                                >
                                    {stats.name || "user8673j"}
                                </h2>
                                <p
                                    class="text-xs font-mono tabular-nums text-warning mt-0.5 mb-0 flex items-center gap-1.5 uppercase tracking-wider"
                                >
                                    <span
                                        class="w-1.5 h-1.5 bg-warning rounded-full"
                                    ></span>
                                    Global Rank #{stats.ranking?.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="md:col-span-7">
                        <p
                            class="text-base sm:text-lg text-muted-foreground leading-relaxed mb-0"
                        >
                            {content.introParagraph}
                        </p>
                    </div>
                </div>
            </header>

            <!-- Metrics Matrix Grid (Single-Sheet Ledgers — Zero Nested Cards) -->
            <section class="mb-16 sm:mb-20">
                <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
                    <!-- Global Solved Ledger -->
                    <div
                        class="fade-up md:col-span-7 rounded-2xl border border-border/85 bg-card/88 p-6 sm:p-8 shadow-[var(--shadow-md)] flex flex-col justify-between"
                    >
                        <div
                            class="flex items-center justify-between pb-4 mb-6 border-b border-border/70"
                        >
                            <h2
                                class="text-lg font-heading font-bold text-foreground tracking-tight mb-0"
                            >
                                Problem Solving Distribution
                            </h2>
                            <span
                                class="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-warning"
                            >
                                VERIFIED SOLVES
                            </span>
                        </div>

                        <div
                            class="grid sm:grid-cols-12 gap-6 items-center my-auto"
                        >
                            <div
                                class="sm:col-span-4 flex flex-col items-start sm:items-center justify-center sm:border-r border-border/70 sm:pr-4"
                            >
                                <span
                                    class="text-5xl sm:text-6xl font-bold font-mono tabular-nums text-warning leading-none"
                                >
                                    {stats.totalSolved}
                                </span>
                                <span
                                    class="text-[10px] text-muted-foreground uppercase tracking-[0.18em] font-mono font-bold mt-2 flex items-center gap-1.5"
                                >
                                    <Code2 size={12} class="text-warning" /> Total
                                    Solved
                                </span>
                            </div>

                            <div
                                class="sm:col-span-8 flex flex-col divide-y divide-border/60"
                            >
                                {#each difficulties as d}
                                    <div
                                        class="py-3 first:pt-0 last:pb-0 flex flex-col gap-2"
                                    >
                                        <div
                                            class="flex items-center justify-between"
                                        >
                                            <span
                                                class="text-xs font-mono tracking-[0.16em] uppercase font-bold text-muted-foreground"
                                            >
                                                {d.label}
                                            </span>
                                            <span
                                                class="text-xl font-bold font-mono tabular-nums {d.textClass} leading-none"
                                            >
                                                {stats[d.key]}
                                            </span>
                                        </div>
                                        <div
                                            class="w-full h-1.5 bg-muted rounded-full overflow-hidden"
                                        >
                                            <div
                                                class="h-full rounded-full {d.barClass}"
                                                style="width: {(stats[d.key] /
                                                    Math.max(
                                                        stats.totalSolved,
                                                        1,
                                                    )) *
                                                    100}%;"
                                            ></div>
                                        </div>
                                    </div>
                                {/each}
                            </div>
                        </div>
                    </div>

                    <!-- Side Telemetry Ledger (Streak, Acceptance, Topic Proficiency) -->
                    <div
                        class="fade-up md:col-span-5 rounded-2xl border border-border/85 bg-card/88 p-6 sm:p-8 shadow-[var(--shadow-md)] flex flex-col justify-between"
                    >
                        <div>
                            <div
                                class="flex items-center justify-between pb-4 mb-5 border-b border-border/70"
                            >
                                <h2
                                    class="text-lg font-heading font-bold text-foreground tracking-tight mb-0"
                                >
                                    Consistency & Mastery
                                </h2>
                                <Flame size={16} class="text-warning" />
                            </div>

                            <!-- 3-Column Hairline Ledger -->
                            <div
                                class="grid grid-cols-3 divide-x divide-border/70 pb-5 mb-5 border-b border-border/70"
                            >
                                <div class="pr-3">
                                    <span
                                        class="block text-xl sm:text-2xl font-bold font-mono tabular-nums text-warning leading-none"
                                    >
                                        {stats.streak}d
                                    </span>
                                    <span
                                        class="block text-[9.5px] font-mono tracking-wider uppercase text-muted-foreground mt-1.5"
                                    >
                                        Streak
                                    </span>
                                </div>
                                <div class="px-3">
                                    <span
                                        class="block text-xl sm:text-2xl font-bold font-mono tabular-nums text-foreground leading-none"
                                    >
                                        {stats.acceptanceRate}%
                                    </span>
                                    <span
                                        class="block text-[9.5px] font-mono tracking-wider uppercase text-muted-foreground mt-1.5"
                                    >
                                        Acceptance
                                    </span>
                                </div>
                                <div class="pl-3">
                                    <span
                                        class="block text-xl sm:text-2xl font-bold font-mono tabular-nums text-foreground leading-none"
                                    >
                                        {stats.activeDays}
                                    </span>
                                    <span
                                        class="block text-[9.5px] font-mono tracking-wider uppercase text-muted-foreground mt-1.5"
                                    >
                                        Active Days
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div
                                class="text-[10px] font-mono font-bold tracking-[0.18em] uppercase text-muted-foreground mb-3 flex items-center gap-2"
                            >
                                <Brain size={13} class="text-primary" /> Topic Proficiency
                            </div>
                            <div class="space-y-2.5">
                                <div
                                    class="flex items-center justify-between text-xs font-mono border-b border-border/60 pb-2"
                                >
                                    <span class="text-muted-foreground"
                                        >Advanced</span
                                    >
                                    <span
                                        class="text-foreground font-bold tabular-nums"
                                        >{stats.skillStats?.advanced || 0}</span
                                    >
                                </div>
                                <div
                                    class="flex items-center justify-between text-xs font-mono border-b border-border/60 pb-2"
                                >
                                    <span class="text-muted-foreground"
                                        >Intermediate</span
                                    >
                                    <span
                                        class="text-foreground font-bold tabular-nums"
                                        >{stats.skillStats?.intermediate ||
                                            0}</span
                                    >
                                </div>
                                <div
                                    class="flex items-center justify-between text-xs font-mono"
                                >
                                    <span class="text-muted-foreground"
                                        >Fundamental</span
                                    >
                                    <span
                                        class="text-foreground font-bold tabular-nums"
                                        >{stats.skillStats?.fundamental ||
                                            0}</span
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Languages and Badges (Zero truncation on badge titles) -->
            <section class="mb-20 grid md:grid-cols-2 gap-6">
                <div
                    class="fade-up rounded-2xl border border-border/85 bg-card/88 p-6 sm:p-8 shadow-[var(--shadow-sm)]"
                >
                    <h2
                        class="text-lg font-heading font-bold text-foreground mb-5 pb-3.5 border-b border-border/70 flex items-center justify-between"
                    >
                        <span>Languages Used</span>
                        <Code2 size={16} class="text-primary" />
                    </h2>

                    <div class="flex flex-wrap gap-2">
                        {#if stats.languages && stats.languages.length > 0}
                            {#each stats.languages as lang}
                                <span
                                    class="px-3.5 py-1.5 border border-border/80 bg-muted/55 rounded-lg text-xs font-mono text-foreground"
                                >
                                    {lang}
                                </span>
                            {/each}
                        {:else}
                            <p class="text-muted-foreground text-xs font-mono">
                                No language data available.
                            </p>
                        {/if}
                    </div>
                </div>

                <div
                    class="fade-up rounded-2xl border border-border/85 bg-card/88 p-6 sm:p-8 shadow-[var(--shadow-sm)]"
                >
                    <h2
                        class="text-lg font-heading font-bold text-foreground mb-5 pb-3.5 border-b border-border/70 flex items-center justify-between"
                    >
                        <span>Earned Badges</span>
                        <Award size={16} class="text-warning" />
                    </h2>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {#if stats.badges && stats.badges.length > 0}
                            {#each stats.badges as badge}
                                <div
                                    class="flex items-center gap-3 p-3 rounded-xl border border-border/75 bg-muted/45"
                                >
                                    <img
                                        src={badge.icon.startsWith("http")
                                            ? badge.icon
                                            : `https://leetcode.com${badge.icon}`}
                                        alt={badge.name}
                                        class="w-9 h-9 object-contain shrink-0"
                                    />
                                    <span
                                        class="text-xs font-mono text-foreground leading-snug break-words"
                                    >
                                        {badge.name}
                                    </span>
                                </div>
                            {/each}
                        {:else}
                            <p class="text-muted-foreground text-xs font-mono">
                                No badges earned yet.
                            </p>
                        {/if}
                    </div>
                </div>
            </section>

            <!-- Engineering Philosophy -->
            <section class="max-w-4xl mx-auto mb-20">
                <div class="fade-up mb-8">
                    <h2
                        class="text-2xl sm:text-3xl font-heading font-extrabold text-foreground tracking-tight mb-2"
                    >
                        Algorithmic Philosophy
                    </h2>
                    <div class="flex items-center gap-2">
                        <span
                            class="h-[2px] w-6 bg-warning rounded-full"
                        ></span>
                        <span
                            class="text-[10px] font-mono font-bold tracking-[0.18em] uppercase text-warning"
                        >
                            COMPUTATIONAL FOUNDATIONS
                        </span>
                    </div>
                </div>

                <div
                    class="space-y-6 pl-0 md:pl-8 border-l-0 md:border-l border-border/80"
                >
                    {#each content.paragraphs as para}
                        <p
                            class="fade-up text-base sm:text-lg text-muted-foreground leading-relaxed"
                        >
                            {para}
                        </p>
                    {/each}
                </div>
            </section>

            <!-- Footer CTA Banner -->
            <footer
                class="fade-up relative overflow-hidden rounded-2xl border border-border/85 bg-card/88 p-8 sm:p-12 text-center shadow-[var(--shadow-lg)]"
            >
                <div
                    class="relative z-10 flex flex-col items-center max-w-2xl mx-auto"
                >
                    <div
                        class="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-warning/15 border border-warning/35 mb-5 text-warning"
                    >
                        <Sparkles size={20} />
                    </div>

                    <h2
                        class="text-2xl sm:text-4xl font-heading font-extrabold tracking-tight text-foreground mb-3"
                    >
                        Algorithms in Action
                    </h2>

                    <p
                        class="text-sm sm:text-base text-muted-foreground mb-7 max-w-xl"
                    >
                        Interested in discussing distributed problem-solving
                        approaches or inspecting my live LeetCode submissions?
                    </p>

                    <a
                        href={content.ctaSlug}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="group inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-warning text-warning-foreground font-heading font-bold text-sm tracking-tight transition-all duration-300 hover:-translate-y-0.5 shadow-[var(--shadow-sm)] no-underline"
                    >
                        <span>{content.ctaLabel}</span>
                        <ArrowUpRight
                            size={15}
                            class="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                        />
                    </a>
                </div>
            </footer>
        {/if}
    </div>
</div>
