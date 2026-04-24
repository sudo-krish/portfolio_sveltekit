<!-- src/lib/components/content/ContentLayout.svelte -->
<!-- Shared page layout for all content pages: back link, breadcrumbs, sidebar -->
<script lang="ts">
    import { ArrowLeft, Tag, Link, Calendar } from 'lucide-svelte';

    import Breadcrumbs from '$lib/components/seo/Breadcrumbs.svelte';
    import RelatedContent from '$lib/components/content/RelatedContent.svelte';

    let {
        title,
        backHref,
        backLabel = 'Back',
        tags = [],
        relatedProjects = [],
        relatedLearn = [],
        relatedArticles = [],
        crumbs = [],
        created,
        children,
    } = $props<{
        title: string;
        backHref: string;
        backLabel?: string;
        tags?: string[];
        relatedProjects?: string[];
        relatedLearn?: string[];
        relatedArticles?: string[];
        crumbs?: { label: string, url: string }[];
        created?: string;
        children?: any;
    }>();
</script>

<div class="min-h-screen bg-background">
    <!-- Subtle gradient background -->
    <div class="fixed inset-0 pointer-events-none z-0">
        
        
    </div>

    <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <!-- Back link & Breadcrumbs -->
        <div class="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <a href={backHref}
               class="inline-flex flex-shrink-0 items-center gap-2 text-sm text-muted-foreground hover:text-foreground
                      transition-colors duration-200 group">
                <ArrowLeft size={16} class="group-hover:-translate-x-1 transition-transform duration-200" />
                <span class="font-mono text-xs uppercase tracking-wider">{backLabel}</span>
            </a>
            <Breadcrumbs {crumbs} />
        </div>

        <!-- Page title -->
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tighter leading-tight mb-6">
            {title}
        </h1>

        <!-- Meta bar -->
        {#if created || tags.length > 0}
            <div class="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b border-border/20">
                {#if created}
                    <div class="flex items-center gap-1.5 text-muted-foreground">
                        <Calendar size={14} />
                        <span class="text-xs font-mono">{new Date(created).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                {/if}
                {#if tags.length > 0}
                    <div class="flex items-center gap-1.5 flex-wrap">
                        <Tag size={14} class="text-primary/60" />
                        {#each tags as tag}
                            <span class="text-[11px] font-mono text-primary/70 bg-primary/5 px-2 py-0.5 rounded-md border border-primary/10">
                                #{tag}
                            </span>
                        {/each}
                    </div>
                {/if}
            </div>
        {/if}

        <!-- Main content slot -->
        <div class="mb-12">
            {@render children?.()}
        </div>

        <!-- Semantic Related Content Widget -->
        <RelatedContent {relatedProjects} {relatedLearn} {relatedArticles} />
    </div>
</div>
