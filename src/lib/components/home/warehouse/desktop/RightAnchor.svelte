<!-- src/lib/components/home/warehouse/desktop/RightAnchor.svelte -->
<script lang="ts">
    import { warehouseData } from "$lib/data/warehouse";
</script>

<span
    class="text-[10px] font-mono text-purple-400/80 uppercase tracking-[0.3em] mb-4"
>
    {warehouseData.rightAnchor.label}
</span>
<div
    class="text-6xl xl:text-7xl font-black text-muted-foreground/30 leading-[0.9] tracking-tighter whitespace-pre-line mb-6"
>
    {warehouseData.rightAnchor.title}
</div>
<p
    class="text-sm text-muted-foreground font-light leading-relaxed max-w-[280px]"
>
    {warehouseData.rightAnchor.description}
</p>
