<!-- src/lib/components/home/datalake/mobile/MobileStorageGrid.svelte -->
<script lang="ts">
    import { datalakeData } from "$lib/data/datalake";
</script>

<div class="w-full grid grid-cols-2 gap-3 relative z-10">
    {#each datalakeData.storageNodes as node}
        <div
            class="group relative p-3 sm:p-4 rounded-[1.25rem] bg-[#050505]/60 backdrop-blur-md border border-white/[0.05] flex flex-col gap-2 overflow-hidden"
        >
            <!-- Subtle background accent -->
            <div
                class="absolute -right-6 -top-6 w-20 h-20 bg-emerald-500/10 rounded-full blur-xl pointer-events-none"
            ></div>

            <div
                class="w-6 h-6 shrink-0 flex items-center justify-center opacity-80"
            >
                <img
                    src={node.iconUrl}
                    alt={node.name}
                    class="w-full h-full object-contain filter brightness-110"
                />
            </div>

            <div class="flex flex-col mt-1">
                <span class="text-[13px] font-bold text-white/90 leading-tight"
                    >{node.name}</span
                >
                <span
                    class="text-[9px] uppercase tracking-[0.15em] font-mono text-white/40 mt-0.5 truncate"
                    >{node.desc}</span
                >
            </div>
        </div>
    {/each}
</div>
