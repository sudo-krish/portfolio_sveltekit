<!-- src/routes/learn/[...slug]/+page.svelte -->
<script lang="ts">
    import ContentLayout from '$lib/components/content/ContentLayout.svelte';
    import ContentRenderer from '$lib/components/content/ContentRenderer.svelte';
    import SEO from "$lib/components/SEO.svelte";

    let { data } = $props();
    const { item } = data;
</script>

<SEO 
    title="{item.meta.title} — Learning Path"
    description={item.meta.description || `Notes on ${item.meta.title}`}
    url="https://krishnanandanil.com/learn/{item.slug}"
    type="article"
    publishedTime={(item.meta.published as string | undefined) || (item.meta.created as string | undefined)}
    modifiedTime={item.meta.lastUpdated as string | undefined}
    keywords={(item.meta.tags as string[] | undefined)?.join(', ')}
/>

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
