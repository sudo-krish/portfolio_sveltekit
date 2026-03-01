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
    class="group/cta inline-flex items-center gap-2 text-[11px] font-bold transition-colors"
    style="color: color-mix(in srgb, {color} 70%, transparent);"
    on:mouseenter={(e) => (e.currentTarget.style.color = color)}
    on:mouseleave={(e) =>
        (e.currentTarget.style.color = `color-mix(in srgb, ${color} 70%, transparent)`)}
>
    <span>{label}</span>
    <ArrowRight
        size={12}
        class="group-hover/cta:translate-x-1 transition-transform"
    />
</a>
