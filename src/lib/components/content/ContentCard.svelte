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
    class="group relative flex flex-col rounded-2xl border border-border/80
           bg-card/85 backdrop-blur-xl overflow-hidden
           shadow-[var(--shadow-sm)]
           hover:shadow-[var(--shadow-md)]
           hover:border-primary/45
           transition-all duration-300 hover:-translate-y-0.5 no-underline"
>
    <!-- Blueprint Corner Registration Marks -->
    <div class="pointer-events-none absolute top-2 left-2 w-2 h-2 border-t border-l border-primary/40 opacity-70"></div>
    <div class="pointer-events-none absolute bottom-2 right-2 w-2 h-2 border-b border-r border-primary/40 opacity-70"></div>

    <!-- Top Specular Hairline -->
    <div class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent"></div>
    <div class="relative z-10 p-5 sm:p-6 flex flex-col gap-3 flex-1">
        <!-- Title leads first (No eyebrow above heading, never truncated) -->
        <h3 class="text-[1.08rem] sm:text-lg font-heading font-bold text-foreground tracking-tight leading-snug
                   group-hover:text-primary transition-colors duration-200 break-words">
            {title}
        </h3>

        <!-- Specification Metadata Row (Below title) -->
        {#if category || platform || difficulty || status}
            <div class="flex items-center justify-between gap-2 flex-wrap">
                <div class="flex items-center gap-2 flex-wrap">
                    {#if category}
                        <span class="font-mono text-[10px] uppercase tracking-[0.16em] text-primary font-semibold">
                            {category}
                        </span>
                    {/if}
                    {#if platform}
                        <span class="flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.12em]
                                     text-muted-foreground bg-muted/60 px-2 py-0.5 rounded-md border border-border/70">
                            <ExternalLink size={10} />
                            {platform}
                        </span>
                    {/if}
                </div>
                <div class="flex items-center gap-1.5 flex-wrap">
                    {#if difficulty}
                        <span class="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md border
                                     {difficultyColors[difficulty] || ''}">
                            {difficulty}
                        </span>
                    {/if}
                    {#if status}
                        <span class="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md
                                     {statusColors[status] || 'bg-muted text-muted-foreground'}">
                            {status}
                        </span>
                    {/if}
                </div>
            </div>
        {/if}

        <!-- Description -->
        {#if description}
            <p class="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-0">
                {description}
            </p>
        {/if}

        <!-- Tech stack pills -->
        {#if tech.length > 0}
            <div class="flex flex-wrap gap-1.5 mt-auto pt-2">
                {#each tech.slice(0, 6) as t}
                    <span class="text-[11px] font-mono text-muted-foreground bg-muted/55 px-2 py-0.5 rounded-md
                                 border border-border/70">
                        {t}
                    </span>
                {/each}
                {#if tech.length > 6}
                    <span class="text-[11px] font-mono tabular-nums text-muted-foreground px-1">
                        +{tech.length - 6}
                    </span>
                {/if}
            </div>
        {/if}

        <!-- Tags -->
        {#if tags.length > 0 && tech.length === 0}
            <div class="flex flex-wrap gap-1.5 mt-auto pt-2">
                {#each tags.slice(0, 4) as tag}
                    <span class="text-[11px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded-md
                                 border border-primary/25">
                        #{tag}
                    </span>
                {/each}
            </div>
        {/if}
    </div>

    <!-- Bottom action bar -->
    <div class="flex items-center justify-between px-5 sm:px-6 py-3 border-t border-border/60
                bg-muted/35 group-hover:bg-primary/10 transition-colors duration-200">
        <span class="text-[10.5px] font-mono font-semibold text-muted-foreground group-hover:text-primary uppercase tracking-wider">
            {url ? 'Read on ' + platform : 'Explore Case Study'}
        </span>
        <ArrowRight size={14} class="text-muted-foreground group-hover:text-primary
                                      group-hover:translate-x-1 transition-all duration-200" />
    </div>
</a>
