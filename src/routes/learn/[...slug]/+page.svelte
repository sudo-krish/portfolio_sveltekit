<!-- src/routes/learn/[...slug]/+page.svelte -->
<script lang="ts">
    import ContentLayout from '$lib/components/content/ContentLayout.svelte';
    import ContentRenderer from '$lib/components/content/ContentRenderer.svelte';

    let { data } = $props();
    const { item } = data;
</script>

<svelte:head>
    <title>{item.meta.title} — Learning Path</title>
    <meta name="description" content={item.meta.description || `Notes on ${item.meta.title}`} />
</svelte:head>

<ContentLayout
    title={item.meta.title}
    backHref="/learn"
    backLabel="Learning Path"
    tags={item.meta.tags}
    related={item.meta.related}
    created={item.meta.created}
>
    <ContentRenderer html={item.html} />
</ContentLayout>
