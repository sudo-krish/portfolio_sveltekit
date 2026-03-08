<!-- src/lib/components/home/datalake/desktop/RightAnchor.svelte -->
<script lang="ts">
    import { datalakeData } from "$lib/data/datalake";
</script>

<span
    class="text-[10px] font-mono text-emerald-400/80 uppercase tracking-[0.3em] mb-4"
>
    {datalakeData.rightAnchor.label}
</span>
<h2
    class="text-6xl xl:text-7xl font-black text-white/10 leading-[0.9] tracking-tighter whitespace-pre-line mb-6"
>
    {datalakeData.rightAnchor.title}
</h2>
<p class="text-sm text-white/40 font-light leading-relaxed max-w-[280px]">
    {datalakeData.rightAnchor.description}
</p>
