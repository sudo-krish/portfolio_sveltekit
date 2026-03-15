<!-- src/routes/articles/[slug]/+page.svelte -->
<script lang="ts">
    import ContentLayout from '$lib/components/content/ContentLayout.svelte';
    import ContentRenderer from '$lib/components/content/ContentRenderer.svelte';
    import { ExternalLink } from 'lucide-svelte';

    let { data } = $props();
    const { item } = data;
</script>

<svelte:head>
    <title>{item.meta.title} — Articles</title>
    <meta name="description" content={item.meta.description || `Article: ${item.meta.title}`} />
</svelte:head>

<ContentLayout
    title={item.meta.title}
    backHref="/articles"
    backLabel="Articles"
    tags={item.meta.tags}
    related={item.meta.related}
    created={item.meta.published || item.meta.created}
>
    <!-- External link -->
    {#if item.meta.url}
        <a href={item.meta.url} target="_blank" rel="noopener"
           class="inline-flex items-center gap-2 text-sm text-foreground bg-card/60 px-4 py-2 rounded-xl
                  border border-border/30 hover:border-primary/40 hover:text-primary transition-colors mb-6">
            Read on {item.meta.platform || 'External'}
            <ExternalLink size={14} />
        </a>
    {/if}

    <ContentRenderer html={item.html} />
</ContentLayout>
