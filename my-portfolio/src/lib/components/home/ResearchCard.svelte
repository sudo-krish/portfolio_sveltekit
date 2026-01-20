<!-- src/lib/components/home/ResearchCard.svelte -->
<script lang="ts">
  import { FileText, Award, ExternalLink, Calendar, BookOpen } from 'lucide-svelte';
  import { getResearchPapers } from '$lib/data/portfolio-data';
  
  const papers = getResearchPapers();
</script>

<div class="relative w-full h-full min-h-[300px] flex flex-col rounded-xl border border-white/10 bg-background/40 backdrop-blur-md overflow-hidden group">
  
  <!-- Header: Digital Archive -->
  <div class="flex items-center justify-between px-5 py-4 border-b border-white/5 bg-white/5 relative z-10">
    <div class="flex items-center gap-3">
        <div class="p-2 rounded-lg bg-violet-500/10 text-violet-400 border border-violet-500/20">
            <BookOpen size={18} />
        </div>
        <div>
            <h3 class="text-sm font-bold text-foreground tracking-tight">Research Archive</h3>
            <div class="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Peer-Reviewed</div>
        </div>
    </div>
    
    <div class="px-2 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center gap-1.5">
        <span class="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse"></span>
        <span class="text-[9px] font-bold text-violet-400 tracking-wider uppercase">Published</span>
    </div>
  </div>

  <!-- Body: Papers List -->
  <div class="flex-1 p-4 flex flex-col gap-3 overflow-y-auto relative z-10">
    {#each papers as paper, i}
      <a 
        href={paper.url} 
        target="_blank" 
        class="group/item relative flex flex-col gap-2 p-3 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 hover:border-violet-500/30 transition-all duration-300"
      >
        <!-- Paper ID & Link -->
        <div class="flex items-center justify-between">
            <span class="px-1.5 py-0.5 rounded text-[9px] font-mono text-violet-300 bg-violet-500/10 border border-violet-500/20">
                PAPER-{i + 1}
            </span>
            <ExternalLink size={12} class="text-muted-foreground opacity-0 group-hover/item:opacity-100 transition-opacity" />
        </div>

        <!-- Title -->
        <h4 class="text-xs font-bold text-foreground group-hover/item:text-violet-100 leading-relaxed transition-colors">
            {paper.title}
        </h4>

        <!-- Meta -->
        <div class="flex items-center gap-3 mt-1 pt-2 border-t border-white/5 group-hover/item:border-white/10 transition-colors">
            <div class="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                <Award size={10} class="text-violet-400" />
                <span>{paper.journal}</span>
            </div>
            <div class="flex items-center gap-1.5 text-[10px] text-muted-foreground ml-auto">
                <Calendar size={10} />
                <span class="font-mono">{new Date(paper.datePublished).getFullYear()}</span>
            </div>
        </div>
        
      </a>
    {/each}
  </div>

  <!-- Footer: Catalog Stats -->
  <div class="px-5 py-3 border-t border-white/5 bg-white/5 grid grid-cols-3 gap-2 divide-x divide-white/10 text-center">
      <div>
          <div class="text-[10px] text-muted-foreground uppercase tracking-wider">Count</div>
          <div class="text-xs font-bold text-foreground font-mono">{papers.length}</div>
      </div>
      <div>
          <div class="text-[10px] text-muted-foreground uppercase tracking-wider">Impact</div>
          <div class="text-xs font-bold text-foreground font-mono">High</div>
      </div>
      <div>
          <div class="text-[10px] text-muted-foreground uppercase tracking-wider">Status</div>
          <div class="text-xs font-bold text-violet-400 font-mono">Active</div>
      </div>
  </div>

</div>
