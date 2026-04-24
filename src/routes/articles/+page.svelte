<!-- src/routes/articles/+page.svelte -->
<script lang="ts">
    import ContentCard from '$lib/components/content/ContentCard.svelte';
    import SEO from "$lib/components/SEO.svelte";
    import { articlesPageContent } from "$lib/data/articles-page";
    import { ArrowLeft, FileText, Search } from 'lucide-svelte';

    let { data } = $props();
    let searchQuery = $state('');

    let filteredItems = $derived(
        data.items.filter((item: any) => {
            if (!searchQuery) return true;
            const q = searchQuery.toLowerCase();
            return item.title.toLowerCase().includes(q) ||
                item.tags?.some((t: string) => t.toLowerCase().includes(q));
        })
    );

    let sortedItems = $derived(
        [...filteredItems].sort((a: any, b: any) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    );
</script>

<SEO 
    title={articlesPageContent.seo.title}
    description={articlesPageContent.seo.description}
    keywords={articlesPageContent.seo.keywords}
    url={articlesPageContent.seo.url}
/>

<div class="min-h-screen bg-background">
    <div class="fixed inset-0 pointer-events-none z-0">
        
    </div>

    <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <a href="/" class="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group">
            <ArrowLeft size={16} class="group-hover:-translate-x-1 transition-transform" />
            <span class="font-mono text-xs uppercase tracking-wider">Home</span>
        </a>

        <div class="flex items-center gap-3 mb-2">
            <FileText size={28} class="text-primary" />
            <h1 class="text-3xl sm:text-4xl font-black text-foreground tracking-tighter">{articlesPageContent.h1}</h1>
        </div>
        <p class="text-muted-foreground mb-8 max-w-2xl">
            {articlesPageContent.introParagraph}
        </p>

        <!-- Search -->
        <div class="relative max-w-md mb-8">
            <Search size={16} class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
                type="text"
                bind:value={searchQuery}
                placeholder="Search articles..."
                class="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card/60 border border-border/30
                       text-foreground placeholder:text-muted-foreground/50
                       focus:border-primary/50 focus:outline-none transition-colors text-sm"
            />
        </div>

        {#if sortedItems.length > 0}
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                {#each sortedItems as item}
                    <ContentCard
                        title={item.title}
                        description={item.description}
                        tags={item.tags}
                        platform={item.platform}
                        url={item.url}
                        featured={item.featured}
                        href={item.url || `/articles/${item.slug}`}
                    />
                {/each}
            </div>
        {:else if data.items.length === 0}
            <div class="text-center py-20 text-muted-foreground">
                <FileText size={48} class="mx-auto mb-4 opacity-30" />
                <p class="text-lg font-medium">No articles yet</p>
                <p class="text-sm mt-1">Push markdown files to the <code class="text-primary">articles</code> repo to see them here.</p>
            </div>
        {:else}
            <div class="text-center py-20 text-muted-foreground">
                <p class="text-lg">No results for "{searchQuery}"</p>
            </div>
        {/if}
    </div>
</div>
