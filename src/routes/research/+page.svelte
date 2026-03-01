<!-- src/routes/research/+page.svelte -->
<script lang="ts">
    import Navigation from "$lib/components/Navigation.svelte";
    import { researchPapers } from "$lib/data/modules/research";
    import { BookOpen, ExternalLink, Cpu, Beaker } from "lucide-svelte";
</script>

<svelte:head>
    <title>Deep Tech Research | Krishnanand Anil</title>
    <meta
        name="description"
        content="Academic research, papers, and ongoing explorations in Vector Intelligence, GenAI, and Data Architecture."
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
                <Cpu size={12} class="text-blue-400" />
                <span
                    class="font-mono text-[10px] font-bold text-blue-300 tracking-widest uppercase"
                >
                    Academic & Applied AI
                </span>
            </div>

            <h1
                class="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight"
            >
                Deep Tech <br class="hidden md:block" />
                <span
                    class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-300% animate-gradient"
                    >Research.</span
                >
            </h1>
            <p
                class="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
            >
                Proving academic depth and cutting-edge experimentation. I don't
                just operationalize systems; I research their mathematical
                foundations.
            </p>
        </header>

        <div class="space-y-24">
            <!-- Published Papers -->
            <section>
                <div
                    class="flex items-center gap-4 border-b border-white/5 pb-6 mb-10"
                >
                    <div
                        class="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400"
                    >
                        <BookOpen size={20} />
                    </div>
                    <h2 class="text-2xl font-bold text-foreground">
                        Published Papers
                    </h2>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {#each researchPapers as paper}
                        <div
                            class="group relative flex flex-col justify-between p-8 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-md transition-all duration-500 hover:border-blue-500/30 hover:bg-blue-950/20 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.2)] hover:-translate-y-1 block h-full overflow-hidden"
                        >
                            <!-- Animated Hover Gradient -->
                            <div
                                class="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                            ></div>

                            <div class="relative z-10">
                                <div
                                    class="text-[11px] font-mono font-semibold tracking-widest uppercase text-blue-400 mb-4 inline-flex items-center gap-2"
                                >
                                    <span
                                        class="w-1.5 h-1.5 rounded-full bg-blue-500"
                                    ></span>
                                    {new Date(
                                        paper.datePublished,
                                    ).toLocaleDateString(undefined, {
                                        year: "numeric",
                                        month: "long",
                                    })}
                                </div>
                                <h3
                                    class="text-2xl font-bold mb-3 text-foreground group-hover:text-blue-100 transition-colors leading-tight"
                                >
                                    {paper.title}
                                </h3>
                                <p
                                    class="text-sm font-mono text-muted-foreground/70 mb-6"
                                >
                                    {paper.journal}
                                </p>

                                <p
                                    class="text-muted-foreground leading-relaxed mb-8"
                                >
                                    {paper.abstract}
                                </p>
                            </div>

                            <div
                                class="relative z-10 mt-auto pt-6 border-t border-white/5 group-hover:border-blue-500/20 transition-colors"
                            >
                                <div class="flex flex-wrap gap-2 mb-6">
                                    {#each paper.keywords as keyword}
                                        <span
                                            class="px-2.5 py-1 text-[10px] font-mono font-semibold uppercase tracking-wider rounded-md bg-white/5 text-muted-foreground border border-white/10 group-hover:border-white/20 transition-colors"
                                            >{keyword}</span
                                        >
                                    {/each}
                                </div>

                                {#if paper.url}
                                    <a
                                        href={paper.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="inline-flex flex-row items-center gap-2 text-[11px] font-mono font-semibold text-blue-100 hover:text-white transition-colors bg-blue-600 hover:bg-blue-500 px-4 py-2.5 rounded-lg border border-blue-500 shadow-lg shadow-blue-900/50"
                                    >
                                        READ PUBLICATION
                                        <ExternalLink size={14} />
                                    </a>
                                {/if}
                            </div>
                        </div>
                    {/each}
                </div>
            </section>

            <!-- Ongoing Experiments -->
            <section>
                <div
                    class="flex items-center gap-4 border-b border-white/5 pb-6 mb-10"
                >
                    <div
                        class="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                    >
                        <Beaker size={20} />
                    </div>
                    <h2 class="text-2xl font-bold text-muted-foreground">
                        Ongoing Sandbox Experiments
                    </h2>
                </div>

                <div
                    class="relative p-10 rounded-2xl bg-blue-950/20 border border-blue-500/20 text-center border-dashed overflow-hidden group hover:bg-blue-900/20 transition-colors"
                >
                    <!-- Pulse glow behind -->
                    <div
                        class="absolute inset-0 bg-blue-500/5 opacity-50 pointer-events-none group-hover:bg-blue-500/10 transition-colors"
                    ></div>

                    <div class="relative z-10">
                        <div
                            class="inline-flex p-3 rounded-full bg-blue-500/10 mb-6 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                        >
                            <Cpu size={24} class="text-blue-400" />
                        </div>
                        <h3 class="text-xl font-bold text-foreground mb-3">
                            Retrieval-Augmented Generation (RAG) at Scale
                        </h3>
                        <p
                            class="text-muted-foreground max-w-xl mx-auto text-sm md:text-base leading-relaxed"
                        >
                            Testing advanced chunking strategies and hybrid
                            search (sparse + dense) against 1M+ document corpora
                            using localized LLMs.
                        </p>
                    </div>
                </div>
            </section>
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
