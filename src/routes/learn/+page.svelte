<!-- src/routes/learn/+page.svelte -->
<script lang="ts">
    import ContentCard from "$lib/components/content/ContentCard.svelte";
    import SEO from "$lib/components/SEO.svelte";
    import { learnPageContent } from "$lib/data/learn-page";
    import { Search, Command, Sparkles, BookOpen, ExternalLink, ArrowUpRight, FileText, Boxes, Tag } from "lucide-svelte";
    import { fade } from "svelte/transition";
    import type { PageData } from "./$types";

    let { data } = $props<{ data: PageData }>();
    const { item } = data;
    let searchQuery = $state("");

    // Filter items based on search
    let filteredItems = $derived(
        data.items.filter((item: any) => {
            if (!searchQuery) return true;
            return (
                item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.tags?.some((t: string) =>
                    t.toLowerCase().includes(searchQuery.toLowerCase()),
                )
            );
        }),
    );
</script>

<SEO
    title={learnPageContent.seo.title}
    description={learnPageContent.seo.description}
    keywords={learnPageContent.seo.keywords}
    url={learnPageContent.seo.url}
/>

<div class="px-4 py-8 sm:px-10 sm:py-12 lg:px-16 lg:py-16 max-w-6xl mx-auto">
    <!-- Main Header & Search Bar -->
    <div class="mb-12 sm:mb-16">
        <h1
            class="text-3xl sm:text-5xl font-black tracking-tight mb-4 flex items-center gap-3"
        >
            <Sparkles class="text-primary" size={32} />
            {learnPageContent.h1}
        </h1>
        <p class="text-muted-foreground text-lg mb-8 max-w-2xl">
            {learnPageContent.introParagraph}
        </p>

        <!-- Command Palette style Search -->
        <div class="relative group max-w-3xl">
            <div
                class="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"
            ></div>
            <div
                class="relative flex items-center bg-[#151518] border border-border/20 rounded-2xl overflow-hidden shadow-2xl transition-all group-focus-within:border-primary/50 group-focus-within:bg-[#1a1a1f]"
            >
                <Search
                    size={20}
                    class="absolute left-5 text-muted-foreground group-focus-within:text-primary transition-colors"
                />
                <input
                    type="text"
                    bind:value={searchQuery}
                    placeholder="Search by keyword, concept, or tag..."
                    class="w-full bg-transparent pl-14 pr-16 py-4 sm:py-5 text-foreground placeholder:text-muted-foreground/40 focus:outline-none text-lg"
                />
                <div
                    class="absolute right-5 hidden sm:flex items-center gap-1 text-muted-foreground/30 bg-foreground/5 px-2 py-1 rounded-md border border-border font-mono text-xs"
                >
                    <Command size={12} />
                    <span>K</span>
                </div>
            </div>
        </div>
    </div>

    <!-- Cards Grid -->
    {#if filteredItems.length > 0}
        <div
            class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6"
            in:fade={{ duration: 200 }}
        >
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
    {:else}
        <div
            class="flex flex-col items-center justify-center py-24 text-center border border-dashed border-border/20 rounded-3xl bg-[#151518]/50"
        >
            <Search size={40} class="text-muted-foreground/30 mb-6" />
            <h3 class="text-xl font-bold text-foreground mb-2">
                No results found
            </h3>
            <p class="text-muted-foreground mb-6">
                We couldn't find anything matching "{searchQuery}"
            </p>
            <button
                class="px-5 py-2.5 bg-foreground/5 hover:bg-foreground/10 rounded-xl transition-colors text-sm font-medium"
                onclick={() => (searchQuery = "")}
            >
                Clear search
            </button>
        </div>
    {/if}
</div>
