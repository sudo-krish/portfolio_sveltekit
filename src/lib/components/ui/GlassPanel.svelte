<!-- src/lib/components/ui/GlassPanel.svelte -->
<!-- Reusable frosted glass panel — wraps GlassCard for legacy slot-based components -->
<script lang="ts">
    import GlassCard from "$lib/components/ui/cards/GlassCard.svelte";
    import type { Snippet } from "svelte";

    let {
        class: className = "",
        glow = "",
        as = "div",
        children,
    } = $props<{
        /** Extra CSS classes to append */
        class?: string;
        /** Color for the corner glow accent. Empty = default primary */
        glow?: string;
        /** HTML element to render as (unused now — GlassCard always renders a div) */
        as?: string;
        children?: Snippet;
    }>();
</script>

<GlassCard
    variant="default"
    accent={glow || "hsl(var(--primary))"}
    class="rounded-3xl {className}"
>
    {#if children}
        {@render children()}
    {/if}
</GlassCard>
