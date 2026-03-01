<!-- src/routes/projects/+page.svelte -->
<script lang="ts">
    import Navigation from "$lib/components/Navigation.svelte";
    import { projects } from "$lib/data/modules/projects";
    import { ExternalLink, Database, Cpu, Activity } from "lucide-svelte";
</script>

<svelte:head>
    <title>Engineering Proof | Krishnanand Anil</title>
    <meta
        name="description"
        content="Detailed architectural breakdowns of 50M+ scale distributed systems, real-time tracking pipelines, and vector intelligence platforms."
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
        <header class="mb-20 max-w-3xl">
            <div
                class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 mb-6"
            >
                <Database size={12} class="text-blue-400" />
                <span
                    class="font-mono text-[10px] font-bold text-blue-300 tracking-widest uppercase"
                >
                    Production Grade Systems
                </span>
            </div>

            <h1
                class="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight"
            >
                Execution<br />
                <span
                    class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-300% animate-gradient"
                    >Proof.</span
                >
            </h1>
            <p
                class="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
            >
                Talk is cheap. Here are the architectures, the metrics, and the
                code for the systems I've scaled.
            </p>
        </header>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            {#each projects as project}
                <a
                    href={`/projects/${project.id}`}
                    class="group relative flex flex-col justify-between p-8 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-md transition-all duration-500 hover:border-blue-500/30 hover:bg-blue-950/20 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.2)] hover:-translate-y-1 block h-full overflow-hidden"
                >
                    <!-- Animated Hover Gradient -->
                    <div
                        class="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    ></div>

                    <div
                        class="relative z-10 flex justify-between items-start mb-6"
                    >
                        <h3
                            class="text-2xl font-bold text-foreground group-hover:text-blue-100 transition-colors"
                        >
                            {project.name}
                        </h3>
                        <div
                            class="p-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-blue-500/20 group-hover:border-blue-500/40 transition-colors"
                        >
                            <ExternalLink
                                size={16}
                                class="text-muted-foreground group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                            />
                        </div>
                    </div>

                    <p
                        class="relative z-10 text-sm md:text-base text-muted-foreground leading-relaxed mb-8 flex-grow"
                    >
                        {project.description}
                    </p>

                    {#if project.metrics}
                        <div
                            class="relative z-10 grid grid-cols-2 gap-4 mb-8 p-4 rounded-xl bg-black/40 border border-white/5 group-hover:border-blue-500/20 transition-colors"
                        >
                            {#each Object.entries(project.metrics).slice(0, 2) as [key, value]}
                                <div>
                                    <div
                                        class="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-1"
                                    >
                                        {key.replace(/([A-Z])/g, " $1").trim()}
                                    </div>
                                    <div
                                        class="font-bold text-blue-300 text-lg"
                                    >
                                        {value}
                                    </div>
                                </div>
                            {/each}
                        </div>
                    {/if}

                    <div
                        class="relative z-10 mt-auto pt-4 border-t border-white/5 group-hover:border-blue-500/20 transition-colors"
                    >
                        <div class="flex flex-wrap gap-2">
                            {#each project.platforms.slice(0, 3) as platform}
                                <span
                                    class="px-2.5 py-1 text-[10px] font-mono font-semibold uppercase tracking-wider rounded-md bg-blue-900/20 text-blue-200 border border-blue-500/20"
                                    >{platform}</span
                                >
                            {/each}
                            {#if project.platforms.length > 3}
                                <span
                                    class="px-2.5 py-1 text-[10px] font-mono font-semibold uppercase tracking-wider rounded-md bg-white/5 text-muted-foreground border border-white/10"
                                >
                                    +{project.platforms.length - 3}
                                </span>
                            {/if}
                        </div>
                    </div>
                </a>
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
