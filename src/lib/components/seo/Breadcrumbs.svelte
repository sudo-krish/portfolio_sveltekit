<!-- src/lib/components/seo/Breadcrumbs.svelte -->
<script lang="ts">
    import { ChevronRight, Home } from "lucide-svelte";
    import { siteConfig } from "$lib/data/site";
    
    export let crumbs: { label: string, url: string }[] = [];
    export let className: string = "mb-6";
    
    // Generate JSON-LD Breadcrumb Schema
    $: schema = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": crumbs.map((crumb, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": crumb.label,
            "item": `${siteConfig.baseUrl}${crumb.url}`
        }))
    });
</script>

<svelte:head>
    {#if crumbs.length > 0}
        <script type="application/ld+json">
            {@html schema}
        </script>
    {/if}
</svelte:head>

<nav aria-label="Breadcrumb" class="flex items-center text-xs sm:text-sm text-muted-foreground/80 overflow-x-auto whitespace-nowrap hide-scrollbar {className}">
    <ol class="flex items-center gap-2">
        <li>
            <a href="/" class="hover:text-primary transition-colors flex items-center gap-1.5" aria-label="Home">
                <Home size={14} />
                <span class="sr-only">Home</span>
            </a>
        </li>
        
        {#if crumbs.length > 0}
            {#each crumbs as crumb, i}
                <li class="flex items-center gap-2">
                    <ChevronRight size={14} class="text-muted-foreground/40" />
                    {#if i === crumbs.length - 1}
                        <span class="text-foreground font-medium truncate max-w-[200px] sm:max-w-xs">{crumb.label}</span>
                    {:else}
                        <a href={crumb.url} class="hover:text-primary transition-colors truncate max-w-[150px]">{crumb.label}</a>
                    {/if}
                </li>
            {/each}
        {/if}
    </ol>
</nav>

<style>
    .hide-scrollbar::-webkit-scrollbar {
        display: none;
    }
    .hide-scrollbar {
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
    }
</style>
