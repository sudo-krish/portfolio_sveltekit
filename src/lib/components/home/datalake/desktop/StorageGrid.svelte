<!-- src/lib/components/home/datalake/desktop/StorageGrid.svelte -->
<script lang="ts">
    import { datalakeData } from "$lib/data/datalake";
</script>

<div class="w-full max-w-[800px] grid grid-cols-3 gap-4 relative z-10">
    {#each datalakeData.storageNodes as node}
        <div
            class="group relative p-4 rounded-2xl bg-[#050505]/60 backdrop-blur-md border border-white/[0.05] hover:bg-emerald-950/20 hover:border-emerald-500/30 transition-all duration-300 overflow-hidden flex items-center gap-4"
        >
            <!-- Subtle hover glow behind the item -->
            <div
                class="absolute -right-4 -top-4 w-16 h-16 bg-emerald-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"
            ></div>

            <div
                class="w-8 h-8 shrink-0 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity"
            >
                <img
                    src={node.iconUrl}
                    alt={node.name}
                    class="w-full h-full object-contain"
                />
            </div>

            <div class="flex flex-col">
                <span
                    class="text-sm font-bold text-white/90 group-hover:text-emerald-400 transition-colors"
                    >{node.name}</span
                >
                <span
                    class="text-[10px] uppercase tracking-widest font-mono text-white/40"
                    >{node.desc}</span
                >
            </div>
        </div>
    {/each}
</div>
