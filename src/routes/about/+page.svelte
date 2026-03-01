<!-- src/routes/about/+page.svelte -->
<script lang="ts">
    import Navigation from "$lib/components/Navigation.svelte";
    import { personal } from "$lib/data/modules/personal";
    import { companies } from "$lib/data/modules/experience";
    import { education } from "$lib/data/modules/education";
    import { Zap } from "lucide-svelte";

    // Combine education and experience into a unified timeline
    const timelineItems = [
        {
            year: "Future",
            title: "Mastering Distributed AI Systems",
            description:
                "My overarching goal is to bridge the gap between heavy data engineering and true Agentic GenAI intelligence at planetary scale.",
            type: "future",
            current: false,
            icon: "⚡",
        },
        ...companies.map((c) => ({
            year: c.duration.split(" - ")[0],
            title: c.position,
            organization: c.name,
            description: c.description,
            type: "work",
            current: c.current,
            icon: "💼",
        })),
        ...education.map((e) => ({
            year: e.graduationYear,
            title: e.degree,
            organization: e.university,
            description: `Graduated with ${e.gpa} GPA in ${e.field}.`,
            type: "education",
            current: false,
            icon: "🎓",
        })),
    ];
</script>

<svelte:head>
    <title>About Me | Krishnanand Anil</title>
    <meta name="description" content={personal.shortBio} />
</svelte:head>

<div
    class="min-h-screen bg-background selection:bg-primary/30 selection:text-primary-foreground font-sans bg-grid-pattern relative overflow-hidden"
>
    <!-- Background Glows -->
    <div class="fixed inset-0 pointer-events-none z-0 bg-radial-gradient"></div>

    <Navigation />

    <main
        class="relative z-10 pt-32 pb-24 px-6 md:px-12 lg:px-24 max-w-4xl mx-auto"
    >
        <header
            class="mb-24 text-center max-w-3xl mx-auto flex flex-col items-center"
        >
            <div
                class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 mb-6"
            >
                <Zap size={12} class="text-blue-400" />
                <span
                    class="font-mono text-[10px] font-bold text-blue-300 tracking-widest uppercase"
                >
                    The Origin Story
                </span>
            </div>

            <h1
                class="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-8"
            >
                Story & <br class="hidden md:block" />
                <span
                    class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-300% animate-gradient"
                    >Ambition.</span
                >
            </h1>
            <p class="text-lg md:text-xl text-muted-foreground leading-relaxed">
                {personal.shortBio}
            </p>
        </header>

        <!-- Unified Timeline -->
        <div class="relative border-l border-white/5 ml-6 md:ml-12 space-y-12">
            {#each timelineItems as item}
                <div class="relative pl-10 md:pl-16 group">
                    <!-- Timeline Node Glow Effect -->
                    {#if item.type === "future" || item.current}
                        <div
                            class={`absolute -left-[20px] md:-left-[24px] top-6 w-10 h-10 md:w-12 md:h-12 rounded-full blur-xl opacity-50 transition-opacity duration-500 group-hover:opacity-100 ${item.type === "future" ? "bg-blue-500" : "bg-emerald-500"}`}
                        ></div>
                    {/if}

                    <!-- Timeline Node -->
                    <div
                        class={`absolute -left-6 md:-left-8 top-4 w-12 h-12 md:w-16 md:h-16 rounded-full border-4 border-background flex items-center justify-center text-xl md:text-2xl shadow-xl transition-all duration-500 group-hover:scale-110 z-10 ${item.type === "future" ? "bg-blue-950/80 text-blue-400 border-blue-500/30" : item.current ? "bg-emerald-950/80 text-emerald-400 border-emerald-500/30" : "bg-black/80 text-muted-foreground border-white/10"}`}
                    >
                        {item.icon}
                    </div>

                    <!-- Content Card -->
                    <div
                        class={`relative p-8 rounded-2xl border backdrop-blur-md transition-all duration-500 overflow-hidden ${item.type === "future" ? "bg-blue-500/5 border-blue-500/20 hover:border-blue-500/40 hover:bg-blue-500/10 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.2)]" : item.current ? "bg-emerald-500/5 border-emerald-500/20 hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.15)]" : "bg-white/5 border-white/5 hover:border-white/15 hover:bg-white/10"}`}
                    >
                        <span
                            class={`inline-block px-3 py-1 rounded-md text-[11px] font-mono tracking-wider font-semibold uppercase mb-5 ${item.type === "future" ? "bg-blue-500/20 text-blue-300 border border-blue-500/20" : item.current ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/20" : "bg-white/5 text-muted-foreground border border-white/10"}`}
                        >
                            {item.year}
                            {item.current ? " (Present)" : ""}
                        </span>

                        <h3
                            class={`text-2xl font-bold mb-2 transition-colors ${item.type === "future" ? "text-blue-100" : item.current ? "text-emerald-100" : "text-foreground group-hover:text-blue-100"}`}
                        >
                            {item.title}
                        </h3>

                        {#if item.organization}
                            <h4
                                class="text-sm md:text-base text-muted-foreground/80 mb-6 font-mono font-medium"
                            >
                                @ {item.organization}
                            </h4>
                        {/if}

                        <p
                            class="text-muted-foreground leading-relaxed text-sm md:text-base"
                        >
                            {item.description}
                        </p>
                    </div>
                </div>
            {/each}
        </div>
    </main>
</div>

<style>
    /* Background Grid Pattern */
    .bg-grid-pattern {
        background-size: 50px 50px;
        background-image: linear-gradient(
                to right,
                rgba(255, 255, 255, 0.03) 1px,
                transparent 1px
            ),
            linear-gradient(
                to bottom,
                rgba(255, 255, 255, 0.03) 1px,
                transparent 1px
            );
    }

    /* Ambient Glow */
    .bg-radial-gradient {
        background: radial-gradient(
            circle at 50% 0%,
            rgba(59, 130, 246, 0.12) 0%,
            transparent 60%
        );
    }

    /* Gradient Animation */
    .bg-300\% {
        background-size: 300% 300%;
    }
    .animate-gradient {
        animation: animatedgradient 6s ease infinite alternate;
    }

    @keyframes animatedgradient {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }
</style>
