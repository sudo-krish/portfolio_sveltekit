<!-- src/lib/components/content/RelatedContent.svelte -->
<script lang="ts">
    import { FileText, Code, BookOpen, ArrowRight } from "lucide-svelte";
    
    export let relatedProjects: string[] = [];
    export let relatedLearn: string[] = [];
    export let relatedArticles: string[] = [];

    // Helper to format slugs into readable titles
    function formatTitle(slug: string) {
        return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
</script>

{#if relatedProjects.length > 0 || relatedLearn.length > 0 || relatedArticles.length > 0}
<div class="mt-16 pt-8 border-t border-border/30">
    <h3 class="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
        <div class="w-1.5 h-6 bg-primary rounded-full"></div>
        Explore Related Content
    </h3>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {#if relatedProjects && relatedProjects.length > 0}
            <div class="flex flex-col gap-3">
                <h4 class="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                    <Code size={16} /> Related Projects
                </h4>
                {#each relatedProjects as slug}
                    <a href="/projects/{slug}" class="group bg-card/40 border border-border/40 hover:border-primary/50 hover:bg-card/80 p-4 rounded-xl transition-all">
                        <span class="text-sm text-foreground font-medium group-hover:text-primary transition-colors line-clamp-2">{formatTitle(slug)}</span>
                        <div class="mt-2 flex items-center text-xs text-muted-foreground group-hover:text-primary/70 transition-colors">
                            View Case Study <ArrowRight size={12} class="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </div>
                    </a>
                {/each}
            </div>
        {/if}

        {#if relatedLearn && relatedLearn.length > 0}
            <div class="flex flex-col gap-3">
                <h4 class="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                    <BookOpen size={16} /> Related Concepts
                </h4>
                {#each relatedLearn as slug}
                    <a href="/learn/{slug}" class="group bg-card/40 border border-border/40 hover:border-primary/50 hover:bg-card/80 p-4 rounded-xl transition-all">
                        <span class="text-sm text-foreground font-medium group-hover:text-primary transition-colors line-clamp-2">{formatTitle(slug)}</span>
                        <div class="mt-2 flex items-center text-xs text-muted-foreground group-hover:text-primary/70 transition-colors">
                            Explore Concept <ArrowRight size={12} class="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </div>
                    </a>
                {/each}
            </div>
        {/if}

        {#if relatedArticles && relatedArticles.length > 0}
            <div class="flex flex-col gap-3">
                <h4 class="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                    <FileText size={16} /> Related Articles
                </h4>
                {#each relatedArticles as slug}
                    <a href="/articles/{slug}" class="group bg-card/40 border border-border/40 hover:border-primary/50 hover:bg-card/80 p-4 rounded-xl transition-all">
                        <span class="text-sm text-foreground font-medium group-hover:text-primary transition-colors line-clamp-2">{formatTitle(slug)}</span>
                        <div class="mt-2 flex items-center text-xs text-muted-foreground group-hover:text-primary/70 transition-colors">
                            Read Article <ArrowRight size={12} class="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </div>
                    </a>
                {/each}
            </div>
        {/if}

    </div>
</div>
{/if}
