<!-- src/lib/components/home/SpecialtyCard.svelte -->
<script lang="ts">
  import type { ComponentType } from 'svelte';
  
  export let icon: ComponentType;
  export let title: string;
  export let highlight: string;
  export let description: string;
  export let tags: string[] = [];
</script>

<div class="group relative w-full h-full min-h-[160px] p-4 rounded-xl border border-white/5 bg-background/40 backdrop-blur-md transition-all duration-300 hover:bg-background/60 hover:border-blue-500/30 hover:shadow-[0_0_20px_-5px_rgba(59,130,246,0.15)] overflow-hidden flex flex-col justify-between">
  
  <!-- Ambient Hover Glow -->
  <div class="absolute -right-10 -top-10 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

  <!-- Header -->
  <div class="flex items-start justify-between mb-3 relative z-10">
    <div class="relative flex items-center justify-center w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 group-hover:text-blue-200 group-hover:bg-blue-500/20 transition-colors">
      <svelte:component this={icon} size={20} strokeWidth={1.5} />
    </div>
    
    <div class="px-2 py-1 rounded text-[10px] font-mono font-bold tracking-wider uppercase text-blue-300 bg-blue-500/10 border border-blue-500/20 group-hover:border-blue-400/30 transition-colors">
      {highlight}
    </div>
  </div>
  
  <!-- Body -->
  <div class="relative z-10 flex flex-col gap-1 flex-1">
    <h3 class="text-sm font-bold text-foreground group-hover:text-white transition-colors leading-tight">
      {title}
    </h3>
    <p class="text-xs text-muted-foreground leading-relaxed line-clamp-2 group-hover:text-muted-foreground/80">
      {description}
    </p>
  </div>
    
  <!-- Footer Tags -->
  {#if tags.length > 0}
    <div class="relative z-10 flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-white/5 group-hover:border-white/10 transition-colors">
      {#each tags.slice(0, 3) as tag}
        <span class="px-1.5 py-0.5 rounded text-[9px] font-medium text-muted-foreground bg-white/5 border border-white/5 group-hover:text-blue-200 group-hover:bg-blue-500/10 group-hover:border-blue-500/10 transition-colors cursor-default">
          {tag}
        </span>
      {/each}
    </div>
  {/if}

</div>
