<!-- src/lib/components/ui/StatusBadge.svelte -->
<!-- Reusable animated status badge with ping dot + label pill -->
<script lang="ts">
    /** Label text displayed in the badge */
    export let label: string;
    /** CSS color value for the badge (e.g. "#3b82f6", "rgb(6,182,212)", etc.) */
    export let color: string = "#06b6d4";
</script>

<div
    class="inline-flex items-center gap-2 px-3 py-1 rounded-full backdrop-blur-sm border"
    style="border-color: color-mix(in srgb, {color} 30%, transparent); background: color-mix(in srgb, {color} 10%, transparent);"
>
    <span class="relative flex h-1.5 w-1.5">
        <span
            class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
            style="background: {color}"
        ></span>
        <span
            class="relative inline-flex rounded-full h-1.5 w-1.5"
            style="background: {color}"
        ></span>
    </span>
    <span
        class="font-mono text-[10px] font-semibold tracking-widest uppercase"
        style="color: color-mix(in srgb, {color} 80%, white)"
    >
        {label}
    </span>
</div>
