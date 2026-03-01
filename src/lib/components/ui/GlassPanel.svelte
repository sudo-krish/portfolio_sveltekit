<!-- src/lib/components/ui/GlassPanel.svelte -->
<!-- Reusable frosted glass panel — the core card DNA used across all home sections -->
<script lang="ts">
    /** Extra CSS classes to append */
    export let className: string = "";
    /** Color for the corner glow accent (e.g. "cyan", "purple", "blue"). Empty = no glow */
    export let glow: string = "";
    /** HTML element to render as */
    export let as: string = "div";
</script>

<svelte:element
    this={as}
    class="relative border border-white/10 bg-black/40 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden {className}"
    {...$$restProps}
>
    {#if glow}
        <div
            class="absolute top-0 right-0 w-32 h-32 blur-[50px] pointer-events-none"
            style="background: color-mix(in srgb, {glow} 20%, transparent)"
        ></div>
    {/if}
    <div class="relative z-10">
        <slot />
    </div>
</svelte:element>
