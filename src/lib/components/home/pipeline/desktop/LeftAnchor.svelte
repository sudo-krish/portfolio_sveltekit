<!-- src/lib/components/home/pipeline/desktop/LeftAnchor.svelte -->
<script lang="ts">
    import { pipelineData } from "$lib/data/pipeline";
</script>

<span
    class="text-[10px] font-mono text-cyan-400/80 uppercase tracking-[0.3em] mb-4"
>
    {pipelineData.leftAnchor.label}
</span>
<h2
    class="text-6xl xl:text-7xl font-black text-white/10 leading-[0.9] tracking-tighter whitespace-pre-line mb-6"
>
    {pipelineData.leftAnchor.title}
</h2>
<p class="text-sm text-white/40 font-light leading-relaxed max-w-[280px]">
    {pipelineData.leftAnchor.description}
</p>
