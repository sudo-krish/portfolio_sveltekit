<!-- src/lib/components/ui/StatusBadge.svelte -->
<!-- Reusable animated status badge with ping dot + label pill -->
<script lang="ts">
    /** Label text displayed in the badge */
    export let label: string;
    /** CSS color value for the badge (e.g. "#3b82f6", "rgb(6,182,212)", etc.) */
    export let color: string = "#06b6d4";
</script>

<div
    class="relative inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full overflow-hidden shadow-lg group transition-transform duration-300 hover:scale-[1.02]"
>
    <!-- Glass Base Layer -->
    <div
        class="absolute inset-0 backdrop-blur-md"
        style="background: linear-gradient(135deg, color-mix(in srgb, {color} 15%, transparent), color-mix(in srgb, {color} 5%, transparent));"
    ></div>

    <!-- Light Reflection / Border -->
    <div
        class="absolute inset-0 rounded-full border border-foreground/10 border-t-white/30 pointer-events-none"
    ></div>

    <span class="relative flex h-2 w-2">
        <span
            class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
            style="background: {color}; box-shadow: 0 0 10px {color};"
        ></span>
        <span
            class="relative inline-flex rounded-full h-2 w-2"
            style="background: {color}; box-shadow: 0 0 8px {color};"
        ></span>
    </span>

    <span
        class="relative font-mono text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase"
        style="color: color-mix(in srgb, {color} 90%, white); text-shadow: 0 1px 2px rgba(0,0,0,0.5);"
    >
        {label}
    </span>
</div>
