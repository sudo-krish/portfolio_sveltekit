<!-- src/routes/learning/+page.svelte -->
<script lang="ts">
    import Navigation from "$lib/components/Navigation.svelte";
    import { learningPaths } from "$lib/data/modules/learning";
    import { CheckCircle2, PlayCircle, Clock } from "lucide-svelte";

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "in-progress":
                return PlayCircle;
            case "completed":
                return CheckCircle2;
            case "upcoming":
                return Clock;
            default:
                return Clock;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "in-progress":
                return "text-blue-400 border-blue-500/50 bg-blue-500/10";
            case "completed":
                return "text-emerald-400 border-emerald-500/50 bg-emerald-500/10";
            case "upcoming":
                return "text-slate-400 border-white/10 bg-white/5";
            default:
                return "text-slate-400 border-white/10 bg-white/5";
        }
    };
</script>

<svelte:head>
    <title>Learning Paths & Study Plan | Krishnanand Anil</title>
    <meta
        name="description"
        content="Absolute transparency in growth. Discover what specific data architectures and pipelines I am studying right now."
    />
</svelte:head>

<div
    class="min-h-screen bg-background selection:bg-primary/30 selection:text-primary-foreground font-sans bg-grid-pattern relative overflow-hidden"
>
    <!-- Background Glows -->
    <div class="fixed inset-0 pointer-events-none z-0 bg-radial-gradient"></div>

    <Navigation />

    <main
        class="relative z-10 pt-32 pb-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto"
    >
        <header class="mb-16 max-w-3xl">
            <div
                class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 mb-6"
            >
                <Clock size={12} class="text-blue-400" />
                <span
                    class="font-mono text-[10px] font-bold text-blue-300 tracking-widest uppercase"
                >
                    Continuous Growth
                </span>
            </div>

            <h1
                class="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6"
            >
                Learning <br class="hidden md:block" />
                <span
                    class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-300% animate-gradient"
                    >Roadmaps.</span
                >
            </h1>
            <p
                class="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
            >
                A transparent look at my study plans, current focus areas, and
                continuous evolution in Data Engineering & Distributed Systems.
            </p>
        </header>

        <!-- Kanban Board -->
        <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start"
        >
            {#each learningPaths as column}
                <!-- Column -->
                <div class="flex flex-col gap-6">
                    <!-- Column Header -->
                    <div
                        class="sticky top-24 z-20 pb-4 backdrop-blur-md bg-background/80 border-b border-white/5"
                    >
                        <h2 class="text-xl font-bold flex items-center gap-3">
                            <span
                                class={`p-1.5 rounded-lg border ${getStatusColor(column.status)}`}
                            >
                                <svelte:component
                                    this={getStatusIcon(column.status)}
                                    size={18}
                                />
                            </span>
                            {column.category}
                            <span
                                class="ml-auto px-2 py-0.5 rounded-md text-xs font-mono bg-white/5 border border-white/10 text-muted-foreground"
                                >{column.items.length}</span
                            >
                        </h2>
                    </div>

                    <!-- Cards -->
                    <div class="flex flex-col gap-4">
                        {#each column.items as item}
                            <div
                                class="relative p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/5 hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.2)] group overflow-hidden"
                            >
                                <!-- Hover Glow -->
                                <div
                                    class="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                ></div>

                                <div class="relative z-10">
                                    <h3
                                        class="text-lg font-bold mb-3 text-foreground group-hover:text-blue-100 transition-colors"
                                    >
                                        {item.title}
                                    </h3>
                                    <p
                                        class="text-sm text-muted-foreground mb-6 leading-relaxed"
                                    >
                                        {item.description}
                                    </p>

                                    <div class="flex flex-wrap gap-2 mb-4">
                                        {#each item.technologies as tech}
                                            <span
                                                class="px-2.5 py-1 text-[10px] font-mono font-semibold uppercase tracking-wider rounded-md bg-black/40 text-muted-foreground border border-white/5 group-hover:border-white/10 transition-colors"
                                            >
                                                {tech}
                                            </span>
                                        {/each}
                                    </div>

                                    {#if item.link}
                                        <div
                                            class="pt-4 mt-auto border-t border-white/5 group-hover:border-blue-500/20 transition-colors"
                                        >
                                            <a
                                                href={item.link}
                                                class="inline-flex text-[11px] font-mono font-medium text-blue-400/80 hover:text-blue-300 transition-colors items-center gap-1"
                                            >
                                                READ ARTICLE
                                                <span
                                                    class="group-hover:translate-x-1 transition-transform inline-block"
                                                    >→</span
                                                >
                                            </a>
                                        </div>
                                    {/if}
                                </div>
                            </div>
                        {/each}
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
            rgba(59, 130, 246, 0.15) 0%,
            transparent 50%
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
