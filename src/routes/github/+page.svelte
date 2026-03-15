<script lang="ts">
    import { onMount } from "svelte";
    import {
        ArrowLeft,
        Sparkles,
        MoveRight,
        ArrowUpRight,
        Github,
        Star,
        GitFork,
        Eye,
        Terminal,
        Calendar,
    } from "lucide-svelte";
    import SEO from "$lib/components/SEO.svelte";
    import { getSectionContent } from "$lib/data/section-content";
    import {
        getGitHubStatsCached,
        getGitHubProjectsCached,
        getGitHubEventsCached,
    } from "$lib/services/github";
    import gsap from "gsap";
    import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

    const content = getSectionContent("github")!;
    const accentColor = "#22c55e"; // Github Green

    let stats: any = null;
    let projects: any[] = [];
    let events: any[] = [];
    let loading = true;

    // Animation triggers
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
                projects = projectsData.slice(0, 6); // Top 6 projects
                events = eventsData;
            } catch (e) {
                console.error("Failed to load GitHub page data", e);
            } finally {
                loading = false;

                // Wait for DOM to update with loaded data before animating
                setTimeout(() => {
                    initAnimations();
                }, 100);
            }
        };

        loadData();

        return () => {
            ctx?.revert();
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    });

    function initAnimations() {
        ctx = gsap.context(() => {
            gsap.registerPlugin(ScrollTrigger);

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
                    clearProps: "filter",
                },
            );

            gsap.fromTo(
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

            const fadeElems = gsap.utils.toArray(".fade-up");
            fadeElems.forEach((elem) => {
                gsap.fromTo(
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
            });

            gsap.to(".ambient-orb", {
                x: "random(-50, 50, 5)",
                y: "random(-50, 50, 5)",
                duration: 8,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                stagger: 0.5,
            });
        });
    }

    // Helper to format date
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
    title="{content.seoTitle} - Live Stats"
    description="Live GitHub activity, repositories, and open source contributions."
    keywords="github, open source, repos, commits, developer, code"
    url="https://krishnanandanil.com/github"
/>

<div
    class="relative min-h-screen bg-background text-foreground overflow-x-hidden"
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
            class="pointer-events-auto flex items-center justify-between gap-12 px-6 py-3 rounded-full border border-border bg-card/80 backdrop-blur-2xl shadow-xl transition-all duration-300 hover:border-primary/30 hover:bg-card"
        >
            <a
                href="/"
                class="group flex items-center gap-2 text-xs font-bold text-foreground/60 hover:text-foreground transition-colors"
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
                    class="font-mono text-[9px] text-muted-foreground tracking-[0.2em] uppercase"
                    >Statistics</span
                >
            </div>
        </nav>
    </div>

    <div class="relative z-10 max-w-6xl mx-auto px-6 pt-40 pb-24">
        {#if loading}
            <div
                class="min-h-[60vh] flex flex-col items-center justify-center gap-4"
            >
                <div
                    class="w-12 h-12 border-4 border-foreground/20 border-t-{accentColor} rounded-full animate-spin"
                    style="border-top-color: {accentColor}"
                ></div>
                <p
                    class="font-mono text-sm tracking-widest text-muted-foreground uppercase"
                >
                    Open Source Loading GitHub Data...
                </p>
            </div>
        {:else}
            <!-- Hero Section -->
            <header class="mb-24 md:mb-32">
                <div
                    class="hero-elem inline-flex items-center gap-2 px-3 py-1.5 rounded-full border bg-foreground/[0.02] backdrop-blur-md mb-8"
                    style="border-color: {accentColor}30"
                >
                    <Github size={12} style="color: {accentColor}" />
                    <span
                        class="text-[10px] font-mono font-bold tracking-[0.2em] uppercase"
                        style="color: {accentColor}">Live API Stats</span
                    >
                </div>

                <h1
                    class="hero-elem text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8"
                >
                    <span class="block text-foreground/90">Building in</span>
                    <span
                        class="block text-transparent bg-clip-text pb-2 lg:pb-4"
                        style="background-image: linear-gradient(135deg, {accentColor}, hsl(var(--foreground)))"
                    >
                        The Open
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
                            class="font-mono text-[10px] sm:text-xs text-foreground/40 tracking-widest uppercase mb-4"
                        >
                            Profile Overview
                        </p>

                        {#if stats?.user}
                            <div
                                class="flex items-center gap-4 p-4 rounded-2xl bg-foreground/5 border border-foreground/10 mt-4 backdrop-blur-sm"
                            >
                                <img
                                    src={stats.user.avatar_url}
                                    alt="Profile"
                                    class="w-12 h-12 rounded-full border border-foreground/20"
                                />
                                <div>
                                    <h3 class="font-bold text-foreground/90">
                                        {stats.user.name || stats.user.login}
                                    </h3>
                                    <p class="text-xs text-foreground/50">
                                        @{stats.user.login}
                                    </p>
                                </div>
                            </div>
                        {/if}
                    </div>
                    <div
                        class="md:col-span-8 flex flex-col justify-center h-full"
                    >
                        <p
                            class="text-xl md:text-2xl text-foreground/70 leading-relaxed font-light"
                        >
                            {content.introParagraph}
                        </p>
                    </div>
                </div>
            </header>

            <!-- Live Metrics Highlights -->
            <section class="max-w-6xl mx-auto mb-24 md:mb-32">
                <div class="mb-10 fade-up">
                    <h2
                        class="text-xs font-mono font-bold tracking-[0.3em] uppercase text-muted-foreground flex items-center gap-4"
                    >
                        <span class="w-8 h-px bg-foreground/20"></span>
                        Aggregate Metrics
                        <span class="w-full h-px bg-foreground/10"></span>
                    </h2>
                </div>

                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
                    {#each [{ label: "Total Repos", value: stats?.totalRepos || 0, icon: Github }, { label: "Total Stars", value: stats?.totalStars || 0, icon: Star }, { label: "Day Streak", value: stats?.contributionStreak || 0, icon: Terminal }, { label: "Top Lang", value: stats?.topLanguages?.[0] || "Code", icon: Sparkles }] as h, i}
                        <div
                            class="fade-up group relative overflow-hidden rounded-3xl border border-foreground/[0.06] bg-gradient-to-br from-foreground/[0.04] to-transparent p-6 flex flex-col justify-between hover:border-foreground/15 transition-all duration-500 min-h-[160px]"
                        >
                            <div
                                class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                                style="background: radial-gradient(circle at center, {accentColor}15 0%, transparent 60%);"
                            ></div>

                            <div
                                class="relative z-10 flex items-center justify-between mb-4"
                            >
                                <h3
                                    class="text-xs font-mono font-bold tracking-widest uppercase text-foreground/40"
                                >
                                    {h.label}
                                </h3>
                                <svelte:component
                                    this={h.icon}
                                    size={16}
                                    class="text-foreground/20 group-hover:text-[{accentColor}] transition-colors"
                                />
                            </div>

                            <div class="relative z-10">
                                <span
                                    class="text-4xl md:text-5xl font-black tracking-tighter leading-none"
                                    style="color: {accentColor}">{h.value}</span
                                >
                            </div>
                        </div>
                    {/each}
                </div>
            </section>

            <!-- Projects and Events Split -->
            <section
                class="max-w-6xl mx-auto mb-32 grid md:grid-cols-12 gap-12 lg:gap-16"
            >
                <!-- Top Repositories -->
                <div class="md:col-span-7 lg:col-span-8">
                    <div class="fade-up mb-10">
                        <h2
                            class="text-xs font-mono font-bold tracking-[0.3em] uppercase text-foreground/30 flex items-center gap-4"
                        >
                            <span class="w-8 h-px bg-foreground/20"></span> Top
                            Public Repositories
                            <span class="w-full h-px bg-foreground/10"></span>
                        </h2>
                        <h2 class="text-2xl font-bold text-foreground">
                            Code Contributions
                        </h2>
                        <p
                            class="text-muted-foreground font-light leading-relaxed"
                        >
                            A history of open-source projects and infrastructure
                            development.
                        </p>
                    </div>

                    <div class="bento-grid grid sm:grid-cols-2 gap-4">
                        {#each projects as project}
                            <a
                                href={project.repository}
                                target="_blank"
                                rel="noopener"
                                class="bento-card group relative overflow-hidden rounded-3xl border border-foreground/[0.06] bg-foreground/[0.02] p-6 hover:bg-foreground/[0.05] transition-colors duration-500 flex flex-col min-h-[220px]"
                            >
                                <div
                                    class="flex items-start justify-between mb-4 relative z-10"
                                >
                                    <div class="flex items-center gap-2">
                                        {#if project.languages?.[0]}
                                            <span
                                                class="px-2 py-0.5 rounded-full border border-foreground/10 bg-foreground/5 text-[9px] font-mono text-foreground/60"
                                            >
                                                {project.languages[0]}
                                            </span>
                                        {/if}
                                    </div>
                                    <ArrowUpRight
                                        size={16}
                                        class="text-foreground/30 group-hover:text-foreground transition-colors"
                                    />
                                </div>

                                <h3
                                    class="text-xl font-bold tracking-tight text-foreground/90 mb-2 relative z-10 group-hover:text-[{accentColor}] transition-colors"
                                >
                                    {project.name}
                                </h3>

                                <p
                                    class="text-[13px] text-foreground/50 leading-relaxed font-light mb-6 flex-1 relative z-10 line-clamp-3"
                                >
                                    {project.description}
                                </p>

                                <div
                                    class="flex items-center gap-4 text-[10px] font-mono text-foreground/40 mt-auto relative z-10"
                                >
                                    <span class="flex items-center gap-1.5"
                                        ><Star
                                            size={12}
                                            class="text-[#facc15]/70"
                                        />
                                        {project.stars}</span
                                    >
                                    <span class="flex items-center gap-1.5"
                                        ><GitFork size={12} />
                                        {project.forks}</span
                                    >
                                    <span
                                        class="flex items-center gap-1.5 ml-auto"
                                        ><Calendar size={12} />
                                        {formatDate(project.dateCreated)}</span
                                    >
                                </div>
                            </a>
                        {/each}
                    </div>
                </div>

                <!-- Recent Events Activity Stream -->
                <div class="md:col-span-5 lg:col-span-4">
                    <div class="fade-up mb-10">
                        <h2
                            class="text-xs font-mono font-bold tracking-[0.3em] uppercase text-foreground/30 flex items-center gap-4"
                        >
                            <span class="w-8 h-px bg-foreground/20"></span>
                            Activity Stream
                            <span class="w-full h-px bg-foreground/10"></span>
                        </h2>
                    </div>

                    <div
                        class="fade-up relative rounded-3xl border border-border bg-card p-6 sm:p-8 overflow-hidden h-full"
                    >
                        <div
                            class="absolute inset-0 bg-gradient-to-b from-transparent to-background/80 pointer-events-none z-0"
                        ></div>

                        <div class="relative z-10 flex flex-col gap-6">
                            {#each events.slice(0, 5) as event, index}
                                <div
                                    class="relative pl-6 {index !==
                                    events.length - 1
                                        ? 'pb-6'
                                        : ''}"
                                >
                                    <!-- Timeline line -->
                                    {#if index !== Math.min(events.length, 5) - 1}
                                        <div
                                            class="absolute left-[7px] top-6 bottom-0 w-px bg-foreground/10"
                                        ></div>
                                    {/if}

                                    <!-- Timeline dot -->
                                    <div
                                        class="absolute left-0 top-1.5 w-4 h-4 rounded-full border border-foreground/20 bg-card flex items-center justify-center"
                                    >
                                        <div
                                            class="w-1.5 h-1.5 rounded-full"
                                            style="background: {accentColor}"
                                        ></div>
                                    </div>

                                    <div class="flex flex-col gap-1">
                                        <div
                                            class="flex items-center justify-between gap-2"
                                        >
                                            <span
                                                class="font-mono text-xs text-foreground/80 font-bold truncate"
                                                >{event.repo}</span
                                            >
                                            <span
                                                class="font-mono text-[10px] text-foreground/30 shrink-0"
                                                >{event.time}</span
                                            >
                                        </div>
                                        <div
                                            class="flex items-start gap-2 mt-1"
                                        >
                                            <span
                                                class="font-mono text-[10px] text-foreground/40 shrink-0 px-1 py-0.5 rounded bg-foreground/5 border border-foreground/10"
                                                style="color: {accentColor}"
                                                >{event.sha}</span
                                            >
                                            <p
                                                class="text-xs text-foreground/60 line-clamp-2 leading-relaxed"
                                            >
                                                {event.msg}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            {:else}
                                <div class="text-center py-10">
                                    <p
                                        class="text-foreground/40 font-mono text-sm tracking-widest uppercase"
                                    >
                                        No recent activity found
                                    </p>
                                </div>
                            {/each}
                        </div>

                        <div
                            class="relative z-10 mt-8 pt-6 border-t border-foreground/10"
                        >
                            <a
                                href="https://github.com/sudo-krish"
                                target="_blank"
                                rel="noopener"
                                class="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-foreground/5 border border-foreground/10 text-foreground/70 text-sm font-bold hover:bg-foreground/10 hover:text-foreground transition-colors"
                            >
                                View Full History <ArrowUpRight size={14} />
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        {/if}
    </div>
</div>
