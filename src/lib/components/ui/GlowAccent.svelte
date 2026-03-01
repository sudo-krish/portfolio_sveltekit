<!-- src/lib/components/ui/GlowAccent.svelte -->
<!-- Reusable ambient glow background effect -->
<script lang="ts">
    /** CSS color for the glow (e.g. "#3b82f6", "rgb(168,85,247)") */
    export let color: string = "#06b6d4";
    /** Position classes (e.g. "top-[20%] right-[10%]") */
    export let position: string = "top-[20%] right-[10%]";
    /** Size in pixels */
    export let size: number = 500;
    /** Opacity (0-1, will be applied as percentage) */
    export let opacity: number = 0.1;
</script>

<div
    class="absolute rounded-full blur-[120px] pointer-events-none {position}"
    style="width: {size}px; height: {size}px; background: color-mix(in srgb, {color} {opacity *
        100}%, transparent);"
></div>
