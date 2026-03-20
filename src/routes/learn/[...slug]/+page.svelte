<!-- src/routes/learn/[...slug]/+page.svelte -->
<script lang="ts">
    import ContentLayout from "$lib/components/content/ContentLayout.svelte";
    import ContentRenderer from "$lib/components/content/ContentRenderer.svelte";
    import SEO from "$lib/components/SEO.svelte";
    import type { PageData } from "./$types";

    let { data } = $props<{ data: PageData }>();
    const { item } = data;
</script>

<SEO
    title="{item.meta.title} — Learning Path"
    description={item.meta.description || `Notes on ${item.meta.title}`}
    url="https://krishnanandanil.com/learn/{item.slug}"
    type="article"
    publishedTime={(item.meta.published as string | undefined) ||
        (item.meta.created as string | undefined)}
    modifiedTime={item.meta.lastUpdated as string | undefined}
    keywords={(item.meta.tags as string[] | undefined)?.join(", ")}
/>

<!-- This renders inside the Right Canvas of the +layout.svelte -->
<div class="px-4 py-8 sm:px-10 sm:py-12 lg:px-16 max-w-4xl mx-auto">
    <ContentLayout
        title={item.meta.title}
        backHref="/learn"
        backLabel="Back to Overview"
        tags={item.meta.tags}
        related={item.meta.related}
        created={item.meta.created}
    >
        <ContentRenderer html={item.html} />
    </ContentLayout>
</div>
