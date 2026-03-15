<!-- src/lib/components/content/ContentRenderer.svelte -->
<!-- Renders parsed markdown HTML with consistent typography and code styling -->
<script lang="ts">
    let { html, class: className = '' } = $props<{
        html: string;
        class?: string;
    }>();
</script>

<article class="prose-content {className}">
    {@html html}
</article>

<style>
    .prose-content {
        color: hsl(var(--foreground));
        line-height: 1.8;
        font-size: clamp(0.95rem, 1.5vw, 1.1rem);
    }

    /* Headings */
    .prose-content :global(h1) {
        font-size: clamp(1.8rem, 3vw, 2.5rem);
        font-weight: 900;
        letter-spacing: -0.03em;
        margin: 2.5rem 0 1rem;
        color: hsl(var(--foreground));
        border-bottom: 1px solid hsl(var(--border) / 0.3);
        padding-bottom: 0.5rem;
    }

    .prose-content :global(h2) {
        font-size: clamp(1.4rem, 2.5vw, 1.8rem);
        font-weight: 800;
        letter-spacing: -0.02em;
        margin: 2rem 0 0.75rem;
        color: hsl(var(--foreground));
    }

    .prose-content :global(h3) {
        font-size: clamp(1.1rem, 2vw, 1.35rem);
        font-weight: 700;
        margin: 1.5rem 0 0.5rem;
        color: hsl(var(--foreground) / 0.9);
    }

    /* Paragraphs */
    .prose-content :global(p) {
        margin: 0.75rem 0;
        color: hsl(var(--foreground) / 0.8);
    }

    /* Links */
    .prose-content :global(a) {
        color: hsl(var(--primary));
        text-decoration: underline;
        text-underline-offset: 3px;
        transition: color 0.2s, text-underline-offset 0.2s;
    }
    .prose-content :global(a:hover) {
        color: hsl(var(--primary) / 0.8);
        text-underline-offset: 5px;
    }

    /* Lists */
    .prose-content :global(ul),
    .prose-content :global(ol) {
        margin: 0.75rem 0;
        padding-left: 1.5rem;
        color: hsl(var(--foreground) / 0.8);
    }
    .prose-content :global(li) {
        margin: 0.3rem 0;
    }
    .prose-content :global(li::marker) {
        color: hsl(var(--primary) / 0.6);
    }

    /* Code blocks */
    .prose-content :global(pre) {
        background: hsl(var(--card));
        border: 1px solid hsl(var(--border));
        border-radius: 0.75rem;
        padding: 1.25rem;
        margin: 1.25rem 0;
        overflow-x: auto;
        font-size: 0.875rem;
        line-height: 1.7;
    }
    .prose-content :global(code) {
        font-family: 'JetBrains Mono', 'Fira Code', monospace;
        font-size: 0.85em;
    }
    .prose-content :global(:not(pre) > code) {
        background: hsl(var(--muted));
        padding: 0.15rem 0.4rem;
        border-radius: 0.3rem;
        border: 1px solid hsl(var(--border) / 0.5);
        color: hsl(var(--primary));
    }

    /* Blockquotes */
    .prose-content :global(blockquote) {
        border-left: 3px solid hsl(var(--primary) / 0.5);
        padding: 0.5rem 1rem;
        margin: 1rem 0;
        background: hsl(var(--muted) / 0.3);
        border-radius: 0 0.5rem 0.5rem 0;
        color: hsl(var(--foreground) / 0.7);
        font-style: italic;
    }

    /* Tables */
    .prose-content :global(table) {
        width: 100%;
        border-collapse: collapse;
        margin: 1.25rem 0;
        font-size: 0.9rem;
    }
    .prose-content :global(th) {
        background: hsl(var(--muted));
        font-weight: 700;
        text-align: left;
        padding: 0.75rem 1rem;
        border-bottom: 2px solid hsl(var(--border));
        color: hsl(var(--foreground) / 0.9);
    }
    .prose-content :global(td) {
        padding: 0.6rem 1rem;
        border-bottom: 1px solid hsl(var(--border) / 0.3);
        color: hsl(var(--foreground) / 0.7);
    }
    .prose-content :global(tr:hover td) {
        background: hsl(var(--muted) / 0.2);
    }

    /* Images */
    .prose-content :global(img) {
        border-radius: 0.75rem;
        max-width: 100%;
        height: auto;
        margin: 1.5rem 0;
        border: 1px solid hsl(var(--border) / 0.3);
    }

    /* Horizontal rule */
    .prose-content :global(hr) {
        border: none;
        height: 1px;
        background: hsl(var(--border) / 0.3);
        margin: 2rem 0;
    }

    /* Strong / Bold */
    .prose-content :global(strong) {
        color: hsl(var(--foreground));
        font-weight: 700;
    }
</style>
