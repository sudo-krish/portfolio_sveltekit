<!-- src/lib/components/content/ContentLayout.svelte -->
<!-- Shared page layout for all content pages: back link, breadcrumbs, sidebar -->
<script lang="ts">
    import { ArrowLeft, Tag, Link, Calendar } from 'lucide-svelte';

    let {
        title,
        backHref,
        backLabel = 'Back',
        tags = [],
        related = [],
        created,
        children,
    } = $props<{
        title: string;
        backHref: string;
        backLabel?: string;
        tags?: string[];
        related?: string[];
        created?: string;
        children?: any;
    }>();
</script>

<div class="min-h-screen bg-background">
    <!-- Subtle gradient background -->
    <div class="fixed inset-0 pointer-events-none z-0">
        <div class="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[120px] opacity-10 bg-primary"></div>
        <div class="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-[100px] opacity-5 bg-primary"></div>
    </div>

    <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <!-- Back link -->
        <a href={backHref}
           class="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground
                  transition-colors duration-200 mb-6 group">
            <ArrowLeft size={16} class="group-hover:-translate-x-1 transition-transform duration-200" />
            <span class="font-mono text-xs uppercase tracking-wider">{backLabel}</span>
        </a>

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

        <!-- Related items -->
        {#if related.length > 0}
            <div class="mt-12 pt-8 border-t border-border/20">
                <h3 class="text-sm font-mono uppercase tracking-[0.2em] text-muted-foreground mb-4 flex items-center gap-2">
                    <Link size={14} />
                    Related
                </h3>
                <div class="flex flex-wrap gap-2">
                    {#each related as item}
                        <span class="text-sm text-foreground/60 bg-muted/40 px-3 py-1.5 rounded-lg border border-border/30
                                     hover:border-primary/30 hover:text-primary transition-colors duration-200 cursor-pointer">
                            {item.replace('.md', '')}
                        </span>
                    {/each}
                </div>
            </div>
        {/if}
    </div>
</div>
