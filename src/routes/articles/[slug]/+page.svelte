<script lang="ts">
    import Navigation from "$lib/components/Navigation.svelte";
    import { ArrowLeft } from "lucide-svelte";

    export let data;
    const { article, htmlContent } = data;
</script>

<svelte:head>
    <title>{article.title} | Krishnanand Anil</title>
    <meta name="description" content={article.description} />

    <!-- Conceptual JSON-LD -->
    <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "TechArticle",
      "headline": article.title,
      "description": article.description,
      "author": {
        "@type": "Person",
        "name": article.author,
        "url": article.authorUrl
      },
      "datePublished": article.datePublished
    })}
    </script>
</svelte:head>

<div
    class="min-h-screen bg-background selection:bg-primary/30 selection:text-primary-foreground font-sans bg-grid-pattern relative"
>
    <Navigation />

    <main
        class="relative z-10 pt-32 pb-24 px-6 md:px-12 lg:px-24 max-w-4xl mx-auto"
    >
        <a
            href="/articles"
            class="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12 group"
        >
            <ArrowLeft
                size={16}
                class="transition-transform group-hover:-translate-x-1"
            />
            Back to Articles
        </a>

        <header class="mb-16">
            <div
                class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 mb-6 font-mono text-xs text-blue-200 uppercase tracking-wider"
            >
                {article.category}
            </div>
            <h1
                class="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight"
            >
                {article.title}
            </h1>
            <p class="text-xl text-muted-foreground mb-8">
                {article.description}
            </p>

            <div
                class="flex items-center gap-4 text-sm font-mono text-muted-foreground"
            >
                <span
                    >{new Date(
                        article.datePublished,
                    ).toLocaleDateString()}</span
                >
                <span>•</span>
                <span>{article.readTime}</span>
            </div>
        </header>

        <div
            class="w-full h-px bg-gradient-to-r from-border via-border/50 to-transparent mb-16"
        ></div>

        <article
            class="prose prose-invert prose-blue prose-headings:text-white prose-p:text-muted-foreground prose-a:text-blue-400 prose-strong:text-white prose-code:text-blue-200 prose-code:bg-blue-900/30 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/10 prose-li:text-muted-foreground max-w-none lg:prose-lg font-sans"
        >
            {@html htmlContent}
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
