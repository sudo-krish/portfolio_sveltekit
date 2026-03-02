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
    class="relative rounded-3xl overflow-hidden transition-all duration-500 {className}"
    {...$$restProps}
>
    <!-- Glass Base Layer -->
    <div
        class="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-black/40 to-black/80 backdrop-blur-3xl"
    ></div>

    <!-- Tactile Borders (Light reflection on top/left) -->
    <div
        class="absolute inset-0 border border-white/5 border-t-white/20 border-l-white/10 rounded-3xl pointer-events-none"
    ></div>

    <!-- Inner Shadow for depth -->
    <div
        class="absolute inset-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] rounded-3xl pointer-events-none"
    ></div>

    {#if glow}
        <div
            class="absolute top-0 right-0 w-48 h-48 blur-[60px] pointer-events-none opacity-40 mix-blend-screen"
            style="background: radial-gradient(circle, {glow} 0%, transparent 70%)"
        ></div>
    {/if}
    <div class="relative z-10 w-full h-full">
        <slot />
    </div>
</svelte:element>
