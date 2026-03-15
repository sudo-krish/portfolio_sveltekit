<!-- src/routes/projects/[slug]/+page.svelte -->
<script lang="ts">
    import ContentLayout from '$lib/components/content/ContentLayout.svelte';
    import ContentRenderer from '$lib/components/content/ContentRenderer.svelte';
    import { Github, ExternalLink } from 'lucide-svelte';

    let { data } = $props();
    const { item } = data;
</script>

<svelte:head>
    <title>{item.meta.title} — Projects</title>
    <meta name="description" content={item.meta.description || `Project: ${item.meta.title}`} />
</svelte:head>

<ContentLayout
    title={item.meta.title}
    backHref="/projects"
    backLabel="Projects"
    tags={item.meta.tags}
    related={item.meta.related}
    created={item.meta.created}
>
    <!-- GitHub link -->
    {#if item.meta.github}
        <a href={item.meta.github} target="_blank" rel="noopener"
           class="inline-flex items-center gap-2 text-sm text-foreground bg-card/60 px-4 py-2 rounded-xl
                  border border-border/30 hover:border-primary/40 hover:text-primary transition-colors mb-6">
            <Github size={16} />
            View on GitHub
            <ExternalLink size={12} />
        </a>
    {/if}

    <!-- Tech stack -->
    {#if item.meta.tech && item.meta.tech.length > 0}
        <div class="flex flex-wrap gap-2 mb-8">
            {#each item.meta.tech as t}
                <span class="text-xs font-mono text-primary/70 bg-primary/5 px-2.5 py-1 rounded-lg border border-primary/10">
                    {t}
                </span>
            {/each}
        </div>
    {/if}

    <ContentRenderer html={item.html} />
</ContentLayout>
