<!-- src/lib/components/ui/CtaLink.svelte -->
<!-- Reusable CTA link with arrow icon and hover transition -->
<script lang="ts">
    import { ArrowRight } from "lucide-svelte";

    /** Navigation href */
    export let href: string;
    /** Button label text */
    export let label: string;
    /** CSS color value for the link text */
    export let color: string = "#06b6d4";
</script>

<a
    {href}
    class="relative group/cta inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl overflow-hidden shadow-lg transition-all duration-300 active:scale-95 cursor-pointer"
>
    <!-- Base Glass Layer -->
    <div
        class="absolute inset-0 backdrop-blur-md transition-colors duration-300"
        style="background: color-mix(in srgb, {color} 5%, rgba(0,0,0,0.4));"
    ></div>

    <!-- Hover Glow & Gradient -->
    <div
        class="absolute inset-0 opacity-0 group-hover/cta:opacity-100 transition-opacity duration-300"
        style="background: radial-gradient(circle at center, color-mix(in srgb, {color} 25%, transparent) 0%, transparent 100%);"
    ></div>

    <!-- Borders: Static & Hover -->
    <div
        class="absolute inset-0 rounded-xl border border-white/10 border-t-white/20 pointer-events-none group-hover/cta:border-transparent transition-colors duration-300"
    ></div>
    <div
        class="absolute inset-0 rounded-xl border opacity-0 group-hover/cta:opacity-100 pointer-events-none transition-opacity duration-300"
        style="border-color: color-mix(in srgb, {color} 50%, transparent); box-shadow: inset 0 0 15px color-mix(in srgb, {color} 20%, transparent);"
    ></div>

    <span
        class="relative font-bold text-xs sm:text-sm tracking-wide transition-colors duration-300"
        style="color: color-mix(in srgb, {color} 80%, white); text-shadow: 0 1px 3px rgba(0,0,0,0.8);"
    >
        {label}
    </span>
    <ArrowRight
        size={14}
        class="relative group-hover/cta:translate-x-1 transition-transform duration-300"
        style="color: {color}; filter: drop-shadow(0 0 4px {color});"
    />
</a>
