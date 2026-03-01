<script lang="ts">
    import { ArrowLeft, ExternalLink, Github, Terminal } from "lucide-svelte";
    import Navigation from "$lib/components/Navigation.svelte";

    export let data;
    const { item, type } = data;
</script>

<svelte:head>
    <title>{item.title} | {type === "project" ? "Project" : "Blog"}</title>
    <meta name="description" content={item.description} />
</svelte:head>

<div
    class="min-h-screen bg-background selection:bg-primary/30 selection:text-primary-foreground font-sans bg-grid-pattern relative"
>
    <!-- Dynamic 3D/Gradient Background -->
    <div
        class="fixed inset-0 bg-gradient-to-br from-background via-background to-blue-900/10 pointer-events-none z-0"
    ></div>

    <Navigation />

    <main
        class="relative z-10 pt-32 pb-24 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto"
    >
        <!-- Back Button -->
        <a
            href="/"
            class="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12 group"
        >
            <ArrowLeft
                size={16}
                class="transition-transform group-hover:-translate-x-1"
            />
            Back to Portfolio
        </a>

        <!-- Header / Hero -->
        <header class="mb-16">
            <div
                class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm mb-6"
            >
                <span class="relative flex h-2 w-2">
                    <span
                        class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"
                    ></span>
                    <span
                        class="relative inline-flex rounded-full h-2 w-2 bg-blue-500"
                    ></span>
                </span>
                <span
                    class="font-mono text-[10px] font-semibold text-blue-200 tracking-widest uppercase"
                >
                    {type === "project" ? "Featured Work" : "Technical Article"}
                </span>
            </div>

            <h1
                class="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight"
            >
                {item.title}
            </h1>

            <p
                class="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed mb-8"
            >
                {item.description}
            </p>

            <!-- Tech Stack Tags -->
            {#if item.technologies && item.technologies.length > 0}
                <div class="flex flex-wrap gap-2 mb-8">
                    {#each item.technologies as tech}
                        <span
                            class="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-muted-foreground backdrop-blur-sm"
                        >
                            {tech}
                        </span>
                    {/each}
                </div>
            {/if}

            <!-- Action Links -->
            <div class="flex flex-wrap gap-4">
                {#if item.demoUrl}
                    <a
                        href={item.demoUrl}
                        target="_blank"
                        class="inline-flex items-center gap-2 h-11 px-6 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
                    >
                        <ExternalLink size={18} />
                        View Live
                    </a>
                {/if}
                {#if item.githubUrl}
                    <a
                        href={item.githubUrl}
                        target="_blank"
                        class="inline-flex items-center gap-2 h-11 px-6 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-foreground font-medium transition-colors"
                    >
                        <Github size={18} />
                        Source Code
                    </a>
                {/if}
            </div>
        </header>

        <div
            class="w-full h-px bg-gradient-to-r from-border via-border/50 to-transparent mb-16"
        ></div>

        <!-- Content Area -->
        <article class="prose prose-invert prose-blue max-w-none">
            {#if item.longDescription}
                <div
                    class="whitespace-pre-line text-lg text-muted-foreground/90 leading-loose"
                >
                    {item.longDescription}
                </div>
            {:else}
                <div
                    class="p-8 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center"
                >
                    <Terminal size={48} class="text-muted-foreground/50 mb-4" />
                    <p class="text-muted-foreground">
                        Detailed elaboration coming soon.
                    </p>
                </div>
            {/if}

            <!-- Metrics Section (if applicable) -->
            {#if type === "project" && item.metrics && item.metrics.length > 0}
                <div class="mt-16">
                    <h3 class="text-2xl font-bold mb-8">
                        Impact & Architecture Metrics
                    </h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {#each item.metrics as metric}
                            <div
                                class="p-6 rounded-xl bg-gradient-to-br from-blue-900/20 to-transparent border border-blue-500/20"
                            >
                                <p class="font-medium text-blue-100">
                                    {metric}
                                </p>
                            </div>
                        {/each}
                    </div>
                </div>
            {/if}
        </article>
    </main>
</div>

<style>
    .bg-grid-pattern {
        background-size: 50px 50px;
        background-image: linear-gradient(
                to right,
                rgba(255, 255, 255, 0.05) 1px,
                transparent 1px
            ),
            linear-gradient(
                to bottom,
                rgba(255, 255, 255, 0.05) 1px,
                transparent 1px
            );
    }
</style>
