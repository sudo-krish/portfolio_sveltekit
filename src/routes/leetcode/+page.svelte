<script lang="ts">
    import { onMount } from "svelte";
    import {
        ArrowLeft,
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
    const accentColor = "#ffa116"; // LeetCode Amber

    let stats: any = null;
    let loading = true;
    let error = false;

    // Animation triggers
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

    const difficulties = [
        {
            label: "Easy",
            key: "easySolved",
            color: "#2cbb5d",
            bg: "rgba(44,187,93,0.1)",
        },
        {
            label: "Medium",
            key: "mediumSolved",
            color: "#ffc01e",
            bg: "rgba(255,192,30,0.1)",
        },
        {
            label: "Hard",
            key: "hardSolved",
            color: "#ef4743",
            bg: "rgba(239,71,67,0.1)",
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
    <!-- Base Grain/Noise Layer -->
    <div
        class="fixed inset-0 pointer-events-none z-50 opacity-[0.03]"
        style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E'); mix-blend-mode: overlay;"
    ></div>

    <!-- Animated Ambient Orbs Background -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
        
        
    </div>

    <div
        class="absolute top-28 left-0 right-0 z-40 flex justify-center pointer-events-none"
    >
        <div class="pointer-events-auto flex items-center bg-card/80 backdrop-blur-2xl px-6 py-3 rounded-full border border-border shadow-xl hover:border-primary/30 hover:bg-card transition-all duration-300">
            <Breadcrumbs crumbs={[{ label: 'LeetCode', url: '/leetcode' }]} className="m-0" />
        </div>
    </div>

    <div class="relative z-10 max-w-6xl mx-auto px-6 pt-40 pb-24">
        {#if loading}
            <div
                class="min-h-[60vh] flex flex-col items-center justify-center gap-4"
            >
                <div
                    class="w-12 h-12 border-4 border-foreground/20 border-t-[{accentColor}] rounded-full animate-spin"
                    style="border-top-color: {accentColor}"
                ></div>
                <p
                    class="font-mono text-sm tracking-widest text-muted-foreground uppercase"
                >
                    Loading LeetCode Data...
                </p>
            </div>
        {:else if error || !stats}
            <div
                class="min-h-[60vh] flex flex-col items-center justify-center gap-6 max-w-md mx-auto text-center"
            >
                <div
                    class="w-16 h-16 rounded-full bg-foreground text-background/10 flex items-center justify-center text-muted-foreground/80 mb-2 border border-foreground/20"
                >
                    <ExternalLink size={24} />
                </div>
                <h2 class="text-2xl font-bold text-foreground">
                    API Connection Failed
                </h2>
                <p class="text-muted-foreground font-light leading-relaxed">
                    Unable to load LeetCode data from the external API. This
                    sometimes happens due to rate limits.
                </p>
                <a
                    href="https://leetcode.com/user8673j"
                    target="_blank"
                    class="px-6 py-3 rounded-xl bg-card border border-border text-foreground hover:bg-card/80 transition-colors flex items-center gap-2 text-sm font-bold"
                >
                    View LeetCode Profile Instead <ArrowUpRight size={14} />
                </a>
            </div>
        {:else}
            <!-- Hero Section -->
            <header class="mb-24 md:mb-32">
                <div
                    class="hero-elem inline-flex items-center gap-2 px-3 py-1.5 rounded-full border bg-foreground/[0.02] backdrop-blur-md mb-8"
                    style="border-color: {accentColor}30"
                >
                    <Code2 size={12} style="color: {accentColor}" />
                    <span
                        class="text-[10px] font-mono font-bold tracking-[0.2em] uppercase"
                        style="color: {accentColor}">Live LeetCode Stats</span
                    >
                </div>

                <h1
                    class="hero-elem text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8"
                >
                    <span class="block text-foreground/90"
                        >{content.headline}</span
                    >
                    <span
                        class="block text-transparent bg-clip-text pb-2 lg:pb-4"
                        style="background-image: linear-gradient(135deg, {accentColor}, hsl(var(--foreground)))"
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
                            class="font-mono text-[10px] sm:text-xs text-foreground/40 tracking-widest uppercase mb-4"
                        >
                            Competitor Profile
                        </p>

                        <!-- Mini Profile Card -->
                        <div
                            class="flex items-center gap-4 p-4 rounded-2xl bg-foreground/5 border border-foreground/10 mt-4 backdrop-blur-sm"
                        >
                            {#if stats.avatar}
                                <img
                                    src={stats.avatar}
                                    alt="Profile"
                                    class="w-12 h-12 rounded-full border border-foreground/20"
                                />
                            {/if}
                            <div>
                                <h3 class="font-bold text-foreground/90">
                                    {stats.name || "user8673j"}
                                </h3>
                                <p
                                    class="text-xs text-foreground/50 flex items-center gap-1.5 mt-1 text-[10px] font-mono tracking-widest uppercase"
                                >
                                    <span
                                        class="w-1.5 h-1.5 bg-[{accentColor}] rounded-full"
                                        style="background: {accentColor}"
                                    ></span>
                                    Rank {stats.ranking?.toLocaleString()}
                                </p>
                            </div>
                        </div>
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

            <!-- Metrics Matrix Grid -->
            <section class="max-w-6xl mx-auto mb-24 md:mb-32">
                <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
                    <!-- Global Solved Stats -->
                    <div
                        class="fade-up md:col-span-7 rounded-3xl border border-foreground/[0.06] bg-gradient-to-br from-foreground/[0.04] to-transparent p-8 lg:p-10 relative overflow-hidden group"
                    >
                        

                        <h2
                            class="text-xs font-mono font-bold tracking-[0.3em] uppercase text-muted-foreground mb-8 border-b border-border pb-4"
                        >
                            Problem Solving Statistics
                        </h2>

                        <div
                            class="flex flex-col sm:flex-row items-center gap-8 lg:gap-12"
                        >
                            <div class="shrink-0 flex flex-col items-center">
                                <div
                                    class="relative w-40 h-40 rounded-full border border-foreground/10 flex flex-col items-center justify-center p-4 before:absolute before:inset-2 before:rounded-full before:border before:border-foreground/5 before:-z-10 shadow-inner bg-card/60"
                                >
                                    <div
                                        class="absolute inset-0 rounded-full bg-gradient-to-b from-[{accentColor}]/10 to-transparent pointer-events-none"
                                        style="--tw-gradient-from: {accentColor}10;"
                                    ></div>
                                    <span
                                        class="text-5xl lg:text-6xl font-black font-mono leading-none drop-shadow-[0_0_15px_hsl(var(--warning)/)]"
                                        style="color: {accentColor}"
                                        >{stats.totalSolved}</span
                                    >
                                    <p
                                        class="text-[10px] text-foreground/40 uppercase tracking-widest font-mono mt-2 font-bold flex items-center gap-1"
                                    >
                                        <Code2 size={10} /> Solved
                                    </p>
                                </div>
                            </div>

                            <div class="flex-1 grid gap-3 w-full">
                                {#each difficulties as d}
                                    <div
                                        class="px-6 py-4 rounded-2xl border border-foreground/5 shadow-inner transition-colors flex items-center justify-between"
                                        style="background: {d.bg}; border-color: {d.color}15;"
                                    >
                                        <span
                                            class="text-sm font-mono tracking-widest uppercase font-bold text-foreground/60"
                                            >{d.label}</span
                                        >
                                        <div class="flex items-center gap-4">
                                            <span
                                                class="text-2xl font-black font-mono leading-none drop-shadow-md"
                                                style="color: {d.color}"
                                                >{stats[d.key]}</span
                                            >
                                            <!-- Small visual bar -->
                                            <div
                                                class="hidden sm:block w-32 h-1.5 bg-card/80 rounded-full overflow-hidden"
                                            >
                                                <div
                                                    class="h-full rounded-full"
                                                    style="width: {(stats[
                                                        d.key
                                                    ] /
                                                        Math.max(
                                                            stats.totalSolved,
                                                            1,
                                                        )) *
                                                        100}%; background: {d.color}"
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                {/each}
                            </div>
                        </div>
                    </div>

                    <!-- Side Stats (Streak, Acceptance) -->
                    <div class="fade-up md:col-span-5 grid grid-rows-2 gap-6">
                        <!-- Details -->
                        <div
                            class="rounded-3xl border border-foreground/[0.06] bg-gradient-to-br from-foreground/[0.04] to-transparent p-8 relative overflow-hidden group flex flex-col justify-center"
                        >
                            

                            <div class="flex items-center gap-4 mb-6">
                                <div
                                    class="w-12 h-12 rounded-xl bg-foreground/5 border border-foreground/10 flex items-center justify-center"
                                >
                                    <Flame size={24} class="text-muted-foreground" />
                                </div>
                                <div>
                                    <span
                                        class="text-2xl font-black tracking-tighter text-foreground"
                                        >{stats.streak}
                                        <span
                                            class="text-lg text-foreground/50 font-normal"
                                            >Days</span
                                        ></span
                                    >
                                    <p
                                        class="text-[10px] font-mono tracking-widest uppercase text-foreground/40 font-bold"
                                    >
                                        Active Streak
                                    </p>
                                </div>
                            </div>

                            <div class="grid grid-cols-2 gap-4 mt-2">
                                <div
                                    class="p-4 rounded-xl bg-card/60 border border-foreground/5"
                                >
                                    <span
                                        class="block text-xl font-mono text-foreground mb-1"
                                        >{stats.acceptanceRate}%</span
                                    >
                                    <span
                                        class="block text-[9px] font-mono tracking-widest uppercase text-foreground/40"
                                        >Acceptance Rate</span
                                    >
                                </div>
                                <div
                                    class="p-4 rounded-xl bg-card/60 border border-foreground/5"
                                >
                                    <span
                                        class="block text-xl font-mono text-foreground mb-1"
                                        >{stats.activeDays}</span
                                    >
                                    <span
                                        class="block text-[9px] font-mono tracking-widest uppercase text-foreground/40"
                                        >Active Days</span
                                    >
                                </div>
                            </div>
                        </div>

                        <!-- Skills / Topics -->
                        <div
                            class="rounded-3xl border border-foreground/[0.06] bg-gradient-to-br from-foreground/[0.04] to-transparent p-8 relative overflow-hidden group"
                        >
                            <h2
                                class="text-xs font-mono font-bold tracking-[0.3em] uppercase text-foreground/30 mb-6 flex items-center gap-2"
                            >
                                <Brain size={14} class="text-foreground" /> Topic
                                Proficiency
                            </h2>

                            <div class="space-y-4">
                                <div
                                    class="flex items-center justify-between text-sm font-mono border-b border-foreground/5 pb-2"
                                >
                                    <span class="text-foreground/60"
                                        >Advanced</span
                                    >
                                    <span class="text-foreground font-bold"
                                        >{stats.skillStats?.advanced || 0}</span
                                    >
                                </div>
                                <div
                                    class="flex items-center justify-between text-sm font-mono border-b border-foreground/5 pb-2"
                                >
                                    <span class="text-foreground/60"
                                        >Intermediate</span
                                    >
                                    <span class="text-foreground font-bold"
                                        >{stats.skillStats?.intermediate ||
                                            0}</span
                                    >
                                </div>
                                <div
                                    class="flex items-center justify-between text-sm font-mono"
                                >
                                    <span class="text-foreground/60"
                                        >Fundamental</span
                                    >
                                    <span class="text-foreground font-bold"
                                        >{stats.skillStats?.fundamental ||
                                            0}</span
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Languages and Badges -->
            <section class="max-w-6xl mx-auto mb-32 grid md:grid-cols-2 gap-6">
                <div
                    class="fade-up rounded-3xl border border-foreground/[0.06] bg-foreground/[0.01] p-8 md:p-10"
                >
                    <h2
                        class="text-xs font-mono font-bold tracking-[0.3em] uppercase text-foreground/30 mb-8 border-b border-foreground/10 pb-4 flex items-center gap-2"
                    >
                        <Code2 size={14} /> Languages Used
                    </h2>

                    <div class="flex flex-wrap gap-2">
                        {#if stats.languages && stats.languages.length > 0}
                            {#each stats.languages as lang}
                                <span
                                    class="px-4 py-2 border border-foreground/10 bg-foreground/5 rounded-xl text-sm font-mono text-foreground/70 hover:bg-foreground/10 transition-colors cursor-default"
                                >
                                    {lang}
                                </span>
                            {/each}
                        {:else}
                            <p class="text-foreground/40 text-sm font-mono">
                                No language data available.
                            </p>
                        {/if}
                    </div>
                </div>

                <div
                    class="fade-up rounded-3xl border border-foreground/[0.06] bg-foreground/[0.01] p-8 md:p-10"
                >
                    <h2
                        class="text-xs font-mono font-bold tracking-[0.3em] uppercase text-foreground/30 mb-8 border-b border-foreground/10 pb-4 flex items-center gap-2"
                    >
                        <Award size={14} /> Earned Badges
                    </h2>

                    <div class="flex flex-wrap gap-4">
                        {#if stats.badges && stats.badges.length > 0}
                            {#each stats.badges as badge}
                                <div
                                    class="flex items-center gap-3 p-3 rounded-xl border border-foreground/10 bg-card/80"
                                    title={badge.name}
                                >
                                    <!-- Since some icons might be missing absolute urls, prepend leetcode domain if it's relative -->
                                    <img
                                        src={badge.icon.startsWith("http")
                                            ? badge.icon
                                            : `https://leetcode.com${badge.icon}`}
                                        alt={badge.name}
                                        class="w-10 h-10 object-contain drop-shadow"
                                    />
                                    <span
                                        class="text-xs font-mono text-foreground/60 truncate max-w-[120px]"
                                        >{badge.name}</span
                                    >
                                </div>
                            {/each}
                        {:else}
                            <p
                                class="text-foreground/40 text-sm font-mono italic"
                            >
                                No badges earned yet.
                            </p>
                        {/if}
                    </div>
                </div>
            </section>

            <!-- Story & Paragraphs -->
            <section class="max-w-4xl mx-auto mb-32">
                <div class="fade-up mb-12">
                    <h2
                        class="text-xs font-mono font-bold tracking-[0.3em] uppercase text-foreground/30 flex items-center gap-4"
                    >
                        <span class="w-8 h-px bg-foreground/20"></span> My
                        Philosophy
                        <span class="w-full h-px bg-foreground/10"></span>
                    </h2>
                </div>

                <div
                    class="space-y-8 pl-0 md:pl-12 border-l-0 md:border-l border-foreground/5"
                >
                    {#each content.paragraphs as para}
                        <p
                            class="fade-up text-lg md:text-xl text-foreground/50 leading-relaxed font-light"
                        >
                            {para}
                        </p>
                    {/each}
                </div>
            </section>

            <!-- Footer CTA Banner -->
            <footer
                class="fade-up relative overflow-hidden rounded-[2rem] border border-foreground/[0.08] p-10 md:p-16 text-center"
            >
                <!-- Banner Background -->
                <div class="absolute inset-0 z-0">
                    <div
                        class="absolute inset-0 bg-gradient-to-b from-transparent to-background/80"
                    ></div>
                    
                </div>

                <div
                    class="relative z-10 flex flex-col items-center max-w-2xl mx-auto"
                >
                    <div
                        class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-foreground/[0.03] border border-foreground/10 mb-8 backdrop-blur-md"
                    >
                        <Sparkles size={24} style="color: {accentColor}" />
                    </div>

                    <h2
                        class="text-4xl md:text-5xl font-black tracking-tight text-foreground mb-6"
                    >
                        Algorithms in Action
                    </h2>

                    <p class="text-lg text-foreground/50 mb-10">
                        Interested in discussing problem-solving approaches or
                        seeing my live LeetCode profile directly?
                    </p>

                    <a
                        href={content.ctaSlug}
                        target="_blank"
                        rel="noopener"
                        class="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm tracking-wide transition-all duration-300 hover:scale-105"
                        style="background: {accentColor}; color: #ffffff; text-shadow: 0 1px 2px rgba(0,0,0,0.2);"
                    >
                        <span class="relative z-10">{content.ctaLabel}</span>
                        <ArrowUpRight
                            size={16}
                            class="relative z-10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                        />
                        <div
                            class="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-foreground/20"
                        ></div>
                    </a>
                </div>
            </footer>
        {/if}
    </div>
</div>
