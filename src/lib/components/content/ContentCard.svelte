<!-- src/lib/components/content/ContentCard.svelte -->
<!-- Reusable card for content index pages (learning, projects, articles) -->
<script lang="ts">
    import { ArrowRight, BookOpen, Code, FileText, ExternalLink } from 'lucide-svelte';

    let {
        title,
        description = '',
        tags = [],
        category,
        difficulty,
        tech = [],
        platform,
        url,
        href,
        status,
        featured = false,
    } = $props<{
        title: string;
        description?: string;
        tags?: string[];
        category?: string;
        difficulty?: string;
        tech?: string[];
        platform?: string;
        url?: string;
        href: string;
        status?: string;
        featured?: boolean;
    }>();

    const difficultyColors: Record<string, string> = {
        beginner: 'bg-foreground/5 text-muted-foreground border-foreground/10',
        intermediate: 'bg-foreground/10 text-muted-foreground border-foreground/20',
        advanced: 'bg-foreground/15 text-muted-foreground border-foreground/30',
    };

    const statusColors: Record<string, string> = {
        production: 'bg-foreground/10 text-muted-foreground',
        'in-progress': 'bg-foreground/5 text-muted-foreground',
        archived: 'bg-gray-500/20 text-muted-foreground',
    };
</script>

<a
    {href}
    class="group relative flex flex-col rounded-2xl border border-foreground/10
           bg-card/60 backdrop-blur-xl overflow-hidden
           shadow-[0_8px_32px_rgba(0,0,0,0.4)]
           hover:shadow-[0_16px_48px_rgba(0,0,0,0.6)]
           hover:border-primary/30
           transition-all duration-500 hover:-translate-y-1"
>
    <!-- Glow effect -->
    {#if featured}
        <div class="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-[60px] opacity-30
                    bg-primary pointer-events-none group-hover:opacity-50 transition-opacity duration-500"></div>
    {/if}

    <div class="relative z-10 p-5 flex flex-col gap-3 flex-1">
        <!-- Top row: category/platform + badges -->
        <div class="flex items-center justify-between gap-2 flex-wrap">
            <div class="flex items-center gap-2">
                {#if category}
                    <span class="font-mono text-[10px] uppercase tracking-[0.2em] text-primary/80 font-bold">
                        {category}
                    </span>
                {/if}
                {#if platform}
                    <span class="flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.15em]
                                 text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full border border-border/50">
                        <ExternalLink size={10} />
                        {platform}
                    </span>
                {/if}
            </div>
            <div class="flex items-center gap-1.5">
                {#if difficulty}
                    <span class="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border
                                 {difficultyColors[difficulty] || ''}">
                        {difficulty}
                    </span>
                {/if}
                {#if status}
                    <span class="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full
                                 {statusColors[status] || 'bg-muted text-muted-foreground'}">
                        {status}
                    </span>
                {/if}
            </div>
        </div>

        <!-- Title -->
        <h3 class="text-lg font-bold text-foreground tracking-tight leading-snug
                   group-hover:text-primary transition-colors duration-300">
            {title}
        </h3>

        <!-- Description -->
        {#if description}
            <p class="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                {description}
            </p>
        {/if}

        <!-- Tech stack pills -->
        {#if tech.length > 0}
            <div class="flex flex-wrap gap-1.5 mt-auto pt-2">
                {#each tech.slice(0, 5) as t}
                    <span class="text-[11px] font-mono text-foreground/60 bg-muted/50 px-2 py-0.5 rounded-md
                                 border border-border/30">
                        {t}
                    </span>
                {/each}
                {#if tech.length > 5}
                    <span class="text-[11px] font-mono text-muted-foreground px-1">
                        +{tech.length - 5}
                    </span>
                {/if}
            </div>
        {/if}

        <!-- Tags -->
        {#if tags.length > 0 && tech.length === 0}
            <div class="flex flex-wrap gap-1.5 mt-auto pt-2">
                {#each tags.slice(0, 4) as tag}
                    <span class="text-[11px] font-mono text-primary/60 bg-primary/5 px-2 py-0.5 rounded-md
                                 border border-primary/10">
                        #{tag}
                    </span>
                {/each}
            </div>
        {/if}
    </div>

    <!-- Bottom action bar -->
    <div class="flex items-center justify-between px-5 py-3 border-t border-border/20
                bg-muted/20 group-hover:bg-primary/5 transition-colors duration-300">
        <span class="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
            {url ? 'Read on ' + platform : 'Read more'}
        </span>
        <ArrowRight size={14} class="text-muted-foreground group-hover:text-primary
                                      group-hover:translate-x-1 transition-all duration-300" />
    </div>
</a>
