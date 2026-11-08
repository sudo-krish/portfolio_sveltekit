<!-- src/routes/learn/+page.svelte -->
<script lang="ts">
    import ContentCard from "$lib/components/content/ContentCard.svelte";
    import SEO from "$lib/components/SEO.svelte";
    import { learnPageContent } from "$lib/data/learn-page";
    import { Search, Command, Sparkles, BookOpen, ExternalLink, ArrowUpRight, FileText, Boxes, Tag } from "lucide-svelte";
    import { fade } from "svelte/transition";
    import type { PageData } from "./$types";

    let { data } = $props<{ data: PageData }>();
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

<div class="px-4 pt-24 pb-16 sm:px-10 sm:pt-28 sm:pb-20 lg:px-16 max-w-6xl mx-auto">
    <!-- Main Header & Search Bar -->
    <div class="mb-10 sm:mb-14">
        <div class="flex items-center gap-3 mb-3">
            <div class="w-10 h-10 rounded-xl bg-primary/12 border border-primary/35 flex items-center justify-center shrink-0">
                <Sparkles class="text-primary shrink-0" size={22} />
            </div>
            <h1
                class="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight"
            >
                {learnPageContent.h1}
            </h1>
        </div>
        <p class="text-muted-foreground text-base sm:text-lg mb-8 max-w-2xl leading-relaxed">
            {learnPageContent.introParagraph}
        </p>

        <!-- Command Palette style Search -->
        <div class="relative group max-w-3xl">
            <div
                class="relative flex items-center bg-card/85 backdrop-blur-xl border border-border/80 rounded-xl overflow-hidden shadow-[var(--shadow-sm)] transition-all group-focus-within:border-primary/60 group-focus-within:bg-card"
            >
                <Search
                    size={18}
                    class="absolute left-4 text-muted-foreground group-focus-within:text-primary transition-colors"
                />
                <input
                    type="text"
                    bind:value={searchQuery}
                    placeholder="Search by keyword, concept, or tag..."
                    class="w-full bg-transparent pl-12 pr-16 py-3 sm:py-3.5 text-foreground placeholder:text-muted-foreground/50 focus:outline-none text-sm sm:text-base"
                />
                <div
                    class="absolute right-4 hidden sm:flex items-center gap-1 text-muted-foreground bg-muted/70 px-2 py-1 rounded-md border border-border/80 font-mono text-xs"
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
            class="flex flex-col items-center justify-center py-20 text-center border border-dashed border-border/40 rounded-3xl bg-card/40"
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
