<!-- src/routes/learn/+page.svelte -->
<script lang="ts">
    import ContentCard from '$lib/components/content/ContentCard.svelte';
    import { ArrowLeft, BookOpen, Search } from 'lucide-svelte';

    let { data } = $props();
    let searchQuery = $state('');
    let selectedCategory = $state<string | null>(null);

    // Extract unique categories
    let categories = $derived(
        [...new Set(data.items.map((i: any) => i.category).filter(Boolean))]
    );

    // Filter items
    let filteredItems = $derived(
        data.items.filter((item: any) => {
            const matchesSearch = !searchQuery ||
                item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.tags?.some((t: string) => t.toLowerCase().includes(searchQuery.toLowerCase()));
            const matchesCategory = !selectedCategory || item.category === selectedCategory;
            return matchesSearch && matchesCategory;
        })
    );
</script>

<svelte:head>
    <title>Learning Path — Second Brain</title>
    <meta name="description" content="My learning journey — curated notes on data engineering, cloud architecture, and software development." />
</svelte:head>

<div class="min-h-screen bg-background">
    <div class="fixed inset-0 pointer-events-none z-0">
        <div class="absolute top-20 left-1/4 w-96 h-96 rounded-full blur-[150px] opacity-10 bg-primary"></div>
    </div>

    <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <a href="/" class="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group">
            <ArrowLeft size={16} class="group-hover:-translate-x-1 transition-transform" />
            <span class="font-mono text-xs uppercase tracking-wider">Home</span>
        </a>

        <div class="flex items-center gap-3 mb-2">
            <BookOpen size={28} class="text-primary" />
            <h1 class="text-3xl sm:text-4xl font-black text-foreground tracking-tighter">Learning Path</h1>
        </div>
        <p class="text-muted-foreground mb-8 max-w-2xl">
            My second brain — curated notes on everything I've learned about data engineering, cloud architecture, and software development.
        </p>

        <!-- Search + Filters -->
        <div class="flex flex-col sm:flex-row gap-3 mb-8">
            <div class="relative flex-1">
                <Search size={16} class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                    type="text"
                    bind:value={searchQuery}
                    placeholder="Search topics..."
                    class="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card/60 border border-border/30
                           text-foreground placeholder:text-muted-foreground/50
                           focus:border-primary/50 focus:outline-none transition-colors text-sm"
                />
            </div>
            <div class="flex gap-2 flex-wrap">
                <button
                    type="button"
                    onclick={() => selectedCategory = null}
                    class="text-xs font-mono uppercase tracking-wider px-3 py-2 rounded-lg border transition-colors
                           {!selectedCategory ? 'bg-primary/20 border-primary/40 text-primary' : 'bg-muted/30 border-border/30 text-muted-foreground hover:text-foreground'}"
                >All</button>
                {#each categories as cat}
                    <button
                        type="button"
                        onclick={() => selectedCategory = cat}
                        class="text-xs font-mono uppercase tracking-wider px-3 py-2 rounded-lg border transition-colors
                               {selectedCategory === cat ? 'bg-primary/20 border-primary/40 text-primary' : 'bg-muted/30 border-border/30 text-muted-foreground hover:text-foreground'}"
                    >{cat}</button>
                {/each}
            </div>
        </div>

        <!-- Content grid -->
        {#if filteredItems.length > 0}
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {#each filteredItems as item}
                    <ContentCard
                        title={item.title}
                        description={item.description}
                        tags={item.tags}
                        category={item.category}
                        difficulty={item.difficulty}
                        href="/learn/{item.slug}"
                    />
                {/each}
            </div>
        {:else if data.items.length === 0}
            <div class="text-center py-20 text-muted-foreground">
                <BookOpen size={48} class="mx-auto mb-4 opacity-30" />
                <p class="text-lg font-medium">No learning notes yet</p>
                <p class="text-sm mt-1">Push markdown files to the <code class="text-primary">second-brain</code> repo to see them here.</p>
            </div>
        {:else}
            <div class="text-center py-20 text-muted-foreground">
                <p class="text-lg">No results for "{searchQuery}"</p>
            </div>
        {/if}
    </div>
</div>
