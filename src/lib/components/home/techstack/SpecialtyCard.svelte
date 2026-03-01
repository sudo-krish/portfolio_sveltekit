<!-- src/lib/components/home/techstack/SpecialtyCard.svelte -->
<script lang="ts">
    import type { ComponentType } from "svelte";

    export let icon: ComponentType;
    export let title: string;
    export let highlight: string;
    export let description: string;
    export let tags: string[] = [];
</script>

<div
    class="group relative w-full h-full p-5 rounded-2xl border border-white/[0.06] bg-black/40 backdrop-blur-2xl transition-all duration-500 hover:border-cyan-500/20 overflow-hidden flex flex-col justify-between"
>
    <!-- Ambient glow -->
    <div
        class="absolute -right-8 -top-8 w-20 h-20 bg-cyan-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
    ></div>

    <!-- Top -->
    <div class="flex items-start justify-between mb-3 relative z-10">
        <div
            class="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/30 group-hover:text-cyan-400 group-hover:border-cyan-500/20 transition-all"
        >
            <svelte:component this={icon} size={16} strokeWidth={1.5} />
        </div>
        <span
            class="px-2 py-1 rounded-md text-[9px] font-mono font-bold tracking-wider text-cyan-400/70 bg-cyan-500/[0.06] border border-cyan-500/10 group-hover:border-cyan-500/20 transition-colors"
        >
            {highlight}
        </span>
    </div>

    <!-- Body -->
    <div class="relative z-10 flex-1 flex flex-col gap-1">
        <h4
            class="text-sm font-bold text-white/80 group-hover:text-white transition-colors"
        >
            {title}
        </h4>
        <p class="text-[11px] text-white/30 leading-relaxed line-clamp-2">
            {description}
        </p>
    </div>

    <!-- Tags -->
    {#if tags.length > 0}
        <div
            class="relative z-10 flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-white/[0.04]"
        >
            {#each tags.slice(0, 3) as tag}
                <span
                    class="px-2 py-0.5 rounded text-[9px] font-mono text-white/25 bg-white/[0.03] border border-white/[0.04] group-hover:text-cyan-300/60 group-hover:bg-cyan-500/[0.06] group-hover:border-cyan-500/10 transition-colors"
                >
                    {tag}
                </span>
            {/each}
        </div>
    {/if}
</div>
