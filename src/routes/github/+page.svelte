<!-- src/routes/github/+page.svelte -->
<script lang="ts">
    import { onMount } from "svelte";
    import {
        ArrowUpRight,
        Github,
        Star,
        GitFork,
        Terminal,
        Calendar,
        Sparkles,
    } from "lucide-svelte";
    import SEO from "$lib/components/SEO.svelte";
    import Breadcrumbs from "$lib/components/seo/Breadcrumbs.svelte";
    import { githubSectionContent } from "$lib/data/github-content";
    import {
        getGitHubStatsCached,
        getGitHubProjectsCached,
        getGitHubEventsCached,
    } from "$lib/services/github";
    import gsap from "gsap";
    import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

    const content = githubSectionContent;

    let stats: any = null;
    let projects: any[] = [];
    let events: any[] = [];
    let loading = true;

    let ctx: gsap.Context;

    onMount(() => {
        window.scrollTo(0, 0);

        const loadData = async () => {
            try {
                const [statsData, projectsData, eventsData] = await Promise.all(
                    [
                        getGitHubStatsCached(),
                        getGitHubProjectsCached(),
                        getGitHubEventsCached(),
                    ],
                );

                stats = statsData;
                projects = projectsData.slice(0, 6);
                events = eventsData;
            } catch (e) {
                console.error("Failed to load GitHub page data", e);
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

            gsap.fromTo(
                ".bento-card",
                { y: 28, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.75,
                    stagger: 0.08,
                    ease: "expo.out",
                    scrollTrigger: { trigger: ".bento-grid", start: "top 88%" },
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

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        }).format(date);
    };
</script>

<SEO
    title="GitHub Projects and Repositories | Krishnanand Anil"
    description="Browse Krishnanand Anil's GitHub repositories, data engineering projects, technical experiments, and open source work."
    keywords="data engineering github, github repositories data engineer, kafka cdc project github, python data pipeline project, aws automation scripts"
    url="https://krishnanandanil.com/github"
/>

<div
    class="relative min-h-screen bg-background text-foreground overflow-x-hidden"
>
    <!-- Subtle Atmospheric Radial Wash -->
    <div
        class="pointer-events-none fixed inset-0 z-0"
        style="background: radial-gradient(circle at 80% 12%, hsl(var(--success) / 0.07), transparent 48%), radial-gradient(circle at 15% 80%, hsl(var(--primary) / 0.06), transparent 50%);"
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
                    crumbs={[{ label: "GitHub", url: "/github" }]}
                    className="m-0"
                />
            </div>
        </div>

        {#if loading}
            <div
                class="min-h-[60vh] flex flex-col items-center justify-center gap-4"
            >
                <div
                    class="w-10 h-10 border-2 border-border border-t-success rounded-full animate-spin"
                ></div>
                <p
                    class="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase"
                >
                    Synchronizing GitHub Telemetry...
                </p>
            </div>
        {:else}
            <!-- Hero Section (Heading leads first — no eyebrow above heading, no gradient text) -->
            <header class="mb-16 sm:mb-20">
                <h1
                    class="hero-elem text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold tracking-tight leading-[0.95] mb-5"
                >
                    <span class="block text-foreground">Open Source</span>
                    <span class="block text-success mt-1">Engineering</span>
                </h1>

                <!-- Specification Bar Below Heading -->
                <div
                    class="hero-elem flex flex-wrap items-center gap-3 mb-8 pb-6 border-b border-border/75"
                >
                    <span class="h-[2px] w-7 bg-success rounded-full"></span>
                    <Github size={14} class="text-success" />
                    <span
                        class="text-[11px] font-mono font-bold tracking-[0.18em] uppercase text-success"
                    >
                        LIVE REPOSITORY TELEMETRY // GITHUB API
                    </span>
                </div>

                <div
                    class="hero-elem grid md:grid-cols-12 gap-6 md:gap-12 items-center"
                >
                    <div class="md:col-span-5">
                        {#if stats?.user}
                            <div
                                class="flex items-center gap-4 p-4 rounded-2xl bg-card/88 border border-border/80 shadow-[var(--shadow-sm)]"
                            >
                                <img
                                    src={stats.user.avatar_url}
                                    alt={stats.user.name || stats.user.login}
                                    class="w-12 h-12 rounded-xl border border-border/80 shrink-0"
                                />
                                <div class="min-w-0">
                                    <h2
                                        class="text-base font-heading font-bold text-foreground leading-tight break-words"
                                    >
                                        {stats.user.name || stats.user.login}
                                    </h2>
                                    <p
                                        class="text-xs font-mono text-success mt-0.5 mb-0"
                                    >
                                        @{stats.user.login}
                                    </p>
                                </div>
                                <a
                                    href="https://github.com/sudo-krish"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Open GitHub profile"
                                    class="ml-auto w-9 h-9 rounded-xl bg-muted/65 border border-border/80 flex items-center justify-center text-muted-foreground hover:text-success hover:border-success/40 transition-colors shrink-0"
                                >
                                    <ArrowUpRight size={15} />
                                </a>
                            </div>
                        {/if}
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

            <!-- Single-Sheet 4-Column Telemetry Ledger -->
            <section class="mb-16 sm:mb-20 fade-up">
                <div
                    class="rounded-2xl border border-border/85 bg-card/88 backdrop-blur-xl shadow-[var(--shadow-md)] overflow-hidden"
                >
                    <div
                        class="px-5 py-3 border-b border-border/70 flex items-center justify-between"
                    >
                        <span
                            class="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground"
                        >
                            AGGREGATE TELEMETRY LEDGER
                        </span>
                        <span
                            class="w-1.5 h-1.5 rounded-full bg-success animate-pulse"
                        ></span>
                    </div>
                    <div
                        class="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 divide-x divide-border/70"
                    >
                        {#each [{ label: "Total Repos", value: stats?.totalRepos || 0, icon: Github }, { label: "Total Stars", value: stats?.totalStars || 0, icon: Star }, { label: "Day Streak", value: stats?.contributionStreak || 0, icon: Terminal }, { label: "Top Language", value: stats?.topLanguages?.[0] || "Python", icon: Sparkles }] as h}
                            <div class="p-5 sm:p-6 flex flex-col justify-between">
                                <div
                                    class="flex items-center justify-between gap-2 mb-3"
                                >
                                    <span
                                        class="text-[10px] font-mono font-bold tracking-[0.16em] uppercase text-muted-foreground"
                                    >
                                        {h.label}
                                    </span>
                                    <svelte:component
                                        this={h.icon}
                                        size={15}
                                        class="text-success shrink-0"
                                    />
                                </div>
                                <span
                                    class="text-2xl sm:text-4xl font-mono tabular-nums font-bold tracking-tight text-foreground leading-none break-words"
                                >
                                    {h.value}
                                </span>
                            </div>
                        {/each}
                    </div>
                </div>
            </section>

            <!-- Repositories and Activity Stream Split -->
            <section
                class="mb-20 grid md:grid-cols-12 gap-8 lg:gap-10 items-start"
            >
                <!-- Top Public Repositories -->
                <div class="md:col-span-7 lg:col-span-8">
                    <div class="fade-up mb-6">
                        <h2
                            class="text-2xl sm:text-3xl font-heading font-extrabold text-foreground tracking-tight mb-2"
                        >
                            Code Contributions
                        </h2>
                        <div class="flex items-center gap-2 mb-2">
                            <span
                                class="h-[2px] w-6 bg-success rounded-full"
                            ></span>
                            <span
                                class="text-[10px] font-mono font-bold tracking-[0.18em] uppercase text-success"
                            >
                                TOP PUBLIC REPOSITORIES
                            </span>
                        </div>
                        <p
                            class="text-sm sm:text-base text-muted-foreground leading-relaxed mb-0"
                        >
                            Open-source data infrastructure, streaming engines,
                            and developer automation.
                        </p>
                    </div>

                    <div class="bento-grid grid sm:grid-cols-2 gap-4">
                        {#each projects as project}
                            <a
                                href={project.repository}
                                target="_blank"
                                rel="noopener noreferrer"
                                class="bento-card group relative overflow-hidden rounded-2xl border border-border/85 bg-card/88 p-5 sm:p-6 hover:border-success/50 hover:-translate-y-0.5 shadow-[var(--shadow-sm)] transition-all duration-300 flex flex-col justify-between min-h-[200px] no-underline"
                            >
                                <div>
                                    <div
                                        class="flex items-start justify-between gap-3 mb-3"
                                    >
                                        <h3
                                            class="text-lg font-heading font-bold tracking-tight text-foreground group-hover:text-success transition-colors leading-snug break-words"
                                        >
                                            {project.name}
                                        </h3>
                                        <ArrowUpRight
                                            size={16}
                                            class="text-muted-foreground group-hover:text-success transition-colors shrink-0 mt-0.5"
                                        />
                                    </div>

                                    <p
                                        class="text-xs sm:text-[13px] text-muted-foreground leading-relaxed mb-5 line-clamp-3"
                                    >
                                        {project.description}
                                    </p>
                                </div>

                                <div
                                    class="flex flex-wrap items-center gap-3 pt-3 border-t border-border/60 text-[10.5px] font-mono tabular-nums text-muted-foreground mt-auto"
                                >
                                    {#if project.languages?.[0]}
                                        <span
                                            class="px-2 py-0.5 rounded-md border border-border/80 bg-muted/60 text-foreground font-semibold"
                                        >
                                            {project.languages[0]}
                                        </span>
                                    {/if}
                                    <span class="flex items-center gap-1">
                                        <Star size={12} class="text-warning" />
                                        {project.stars}
                                    </span>
                                    <span class="flex items-center gap-1">
                                        <GitFork size={12} />
                                        {project.forks}
                                    </span>
                                    <span
                                        class="flex items-center gap-1 ml-auto"
                                    >
                                        <Calendar size={11} />
                                        {formatDate(project.dateCreated)}
                                    </span>
                                </div>
                            </a>
                        {/each}
                    </div>
                </div>

                <!-- Recent Events Activity Stream -->
                <div class="md:col-span-5 lg:col-span-4">
                    <div class="fade-up mb-6">
                        <h2
                            class="text-2xl sm:text-3xl font-heading font-extrabold text-foreground tracking-tight mb-2"
                        >
                            Commit Trail
                        </h2>
                        <div class="flex items-center gap-2 mb-2">
                            <span
                                class="h-[2px] w-6 bg-success rounded-full"
                            ></span>
                            <span
                                class="text-[10px] font-mono font-bold tracking-[0.18em] uppercase text-success"
                            >
                                RECENT ACTIVITY STREAM
                            </span>
                        </div>
                        <p
                            class="text-sm text-muted-foreground leading-relaxed mb-0"
                        >
                            Latest verified pushes across public repositories.
                        </p>
                    </div>

                    <div
                        class="fade-up relative rounded-2xl border border-border/85 bg-card/88 p-5 sm:p-6 shadow-[var(--shadow-md)] overflow-hidden"
                    >
                        <div class="flex flex-col divide-y divide-border/60">
                            {#each events.slice(0, 5) as event}
                                <div class="py-3.5 first:pt-0 last:pb-0 flex flex-col gap-1.5">
                                    <div
                                        class="flex flex-wrap items-center justify-between gap-2"
                                    >
                                        <span
                                            class="font-mono text-xs text-foreground font-bold leading-snug break-words"
                                        >
                                            {event.repo}
                                        </span>
                                        <span
                                            class="font-mono tabular-nums text-[10px] text-muted-foreground shrink-0"
                                        >
                                            {event.time}
                                        </span>
                                    </div>
                                    <div class="flex items-start gap-2">
                                        <span
                                            class="font-mono tabular-nums text-[10px] text-success font-semibold shrink-0 px-1.5 py-0.5 rounded bg-success/10 border border-success/30 mt-0.5"
                                        >
                                            {event.sha}
                                        </span>
                                        <p
                                            class="text-xs text-muted-foreground line-clamp-2 leading-snug mb-0"
                                        >
                                            {event.msg}
                                        </p>
                                    </div>
                                </div>
                            {:else}
                                <div class="text-center py-8">
                                    <p
                                        class="text-muted-foreground font-mono text-xs tracking-widest uppercase mb-0"
                                    >
                                        No recent activity found
                                    </p>
                                </div>
                            {/each}
                        </div>

                        <div class="mt-5 pt-4 border-t border-border/70">
                            <a
                                href="https://github.com/sudo-krish"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-muted/65 border border-border/80 text-foreground text-xs font-heading font-bold hover:border-success/50 hover:text-success transition-colors no-underline"
                            >
                                View Full GitHub Profile
                                <ArrowUpRight size={14} />
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        {/if}
    </div>
</div>
