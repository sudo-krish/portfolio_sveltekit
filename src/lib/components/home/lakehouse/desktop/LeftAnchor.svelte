<script lang="ts">
    import { lakehouseData } from "$lib/data/lakehouse";
</script>

<span
    class="text-[10px] font-mono text-blue-400/80 uppercase tracking-[0.3em] mb-4"
>
    {lakehouseData.leftAnchor.label}
</span>
<h2
    class="text-6xl xl:text-7xl font-black text-muted-foreground/30 leading-[0.9] tracking-tighter whitespace-pre-line mb-6 block"
>
    {lakehouseData.leftAnchor.title}
</h2>
<p
    class="text-sm text-muted-foreground font-light leading-relaxed max-w-[280px]"
>
    {lakehouseData.leftAnchor.description}
</p>
