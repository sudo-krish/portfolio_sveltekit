<!-- src/lib/components/ui/GlassPanel.svelte -->
<!-- Reusable frosted glass panel — wraps GlassCard for legacy slot-based components -->
<script lang="ts">
    import GlassCard from "$lib/components/ui/cards/GlassCard.svelte";

    /** Extra CSS classes to append */
    export let className: string = "";
    /** Color for the corner glow accent. Empty = default primary */
    export let glow: string = "";
    /** HTML element to render as (unused now — GlassCard always renders a div) */
    export let as: string = "div";
</script>

<GlassCard
    variant="default"
    accent={glow || "hsl(var(--primary))"}
    class="rounded-3xl {className}"
>
    <slot />
</GlassCard>
