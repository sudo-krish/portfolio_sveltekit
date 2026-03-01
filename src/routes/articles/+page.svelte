<!-- src/routes/articles/+page.svelte -->
<script lang="ts">
    import Navigation from "$lib/components/Navigation.svelte";
    import fm from "front-matter";

    // Import all raw markdown files from the CMS folder
    const markdownFiles = import.meta.glob(
        "/src/lib/cms-content/articles/*.md",
        {
            query: "?raw",
            import: "default",
            eager: true,
        },
    );

    // Parse the frontmatter to generate the grid data
    const articles = Object.entries(markdownFiles)
        .map(([filepath, content]) => {
            const parsed = fm(content as string);
            const slug = filepath.split("/").pop()?.replace(".md", "") || "";
            return {
                slug,
                ...(parsed.attributes as any),
            };
        })
        .sort(
            (a, b) =>
                new Date(b.datePublished).getTime() -
                new Date(a.datePublished).getTime(),
        );
</script>

<svelte:head>
    <title>Articles & Thought Leadership | Krishnanand Anil</title>
    <meta
        name="description"
        content="Technical articles on Data Engineering, AWS Architecture, Kafka, and Vector Databases."
    />
</svelte:head>

<div
    class="min-h-screen bg-background selection:bg-primary/30 selection:text-primary-foreground font-sans bg-grid-pattern relative overflow-hidden"
>
    <!-- Background Glows -->
    <div class="fixed inset-0 pointer-events-none z-0 bg-radial-gradient"></div>

    <Navigation />

    <main
        class="relative z-10 pt-32 pb-24 px-6 md:px-12 lg:px-24 lg:max-w-7xl mx-auto"
    >
        <!-- Header -->
        <div class="mb-16">
            <div
                class="mb-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10"
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
                    class="font-mono text-[10px] font-bold text-blue-300 tracking-widest uppercase"
                >
                    Knowledge Base
                </span>
            </div>

            <h1
                class="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6"
            >
                Articles & <br class="hidden md:block" />
                <span
                    class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-300% animate-gradient"
                    >Thoughts.</span
                >
            </h1>
            <p
                class="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
            >
                I solve hard problems, and I write about how I perform the
                surgery. Deep dives into Data Engineering, Cloud Architecture,
                and AI.
            </p>
        </div>

        <!-- Articles Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each articles as post}
                <a
                    href={`/articles/${post.slug}`}
                    class="group relative flex flex-col justify-between p-6 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-md transition-all duration-500 hover:border-blue-500/30 hover:bg-blue-950/20 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)] hover:-translate-y-1 overflow-hidden"
                >
                    <!-- Animated Hover Gradient -->
                    <div
                        class="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    ></div>

                    <div class="relative z-10">
                        <!-- Category Tag -->
                        <div
                            class="mb-5 inline-flex items-center px-2.5 py-1 rounded-md border border-white/10 bg-white/5 text-[10px] font-mono font-semibold text-muted-foreground group-hover:border-blue-500/30 group-hover:text-blue-300 group-hover:bg-blue-500/10 transition-colors uppercase tracking-wider"
                        >
                            {post.category || "Engineering"}
                        </div>

                        <!-- Title & Desc -->
                        <h2
                            class="text-xl md:text-2xl font-bold mb-3 text-foreground group-hover:text-blue-100 transition-colors line-clamp-2"
                        >
                            {post.title}
                        </h2>
                        <p
                            class="text-sm text-muted-foreground mb-8 line-clamp-3 leading-relaxed"
                        >
                            {post.description}
                        </p>
                    </div>

                    <!-- Footer Meta -->
                    <div
                        class="relative z-10 mt-auto flex items-center justify-between border-t border-white/5 pt-5 group-hover:border-blue-500/20 transition-colors"
                    >
                        <div
                            class="text-[11px] font-mono text-muted-foreground/60"
                        >
                            {new Date(post.datePublished).toLocaleDateString(
                                "en-US",
                                {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                },
                            )}
                        </div>
                        <div
                            class="text-[11px] font-mono text-blue-400/50 group-hover:text-blue-400 transition-colors flex items-center gap-1"
                        >
                            {post.readTime || "5 min read"}
                            <span
                                class="group-hover:translate-x-1 transition-transform inline-block"
                                >→</span
                            >
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
