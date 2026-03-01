<!-- src/lib/components/home/CareerTimelineCard.svelte -->
<script lang="ts">
  import { Rocket, GitCommit, ArrowUpRight, GitBranch } from 'lucide-svelte';
  import { getAllCompanies, getPersonalInfo } from '$lib/data/portfolio-data';
  
  const companies = getAllCompanies();
  const personal = getPersonalInfo();
  
  // Format data for the "Commit History" view
  const timeline = companies.map((company, i) => ({
    company: company.name.split(' ')[0],
    role: company.position,
    // Convert generic levels to "Version" tags for engineering flair
    version: company.position.includes('Senior') ? 'v3.0' : company.position.includes('Associate') ? 'v1.0' : 'v2.0',
    year: company.duration.split(' ')[1] || new Date().getFullYear(),
    current: company.current,
    promoted: company.roles && company.roles.length > 1
  }));
</script>

<div class="relative w-full h-full min-h-[350px] flex flex-col rounded-xl border border-white/10 bg-background/40 backdrop-blur-md overflow-hidden group">
  
  <!-- Header: Branch Info -->
  <div class="flex items-center justify-between px-5 py-4 border-b border-white/5 bg-white/5 relative z-10">
    <div class="flex items-center gap-3">
        <div class="p-2 rounded-lg bg-pink-500/10 text-pink-400 border border-pink-500/20">
            <GitBranch size={18} />
        </div>
        <div>
            <h3 class="text-sm font-bold text-foreground tracking-tight">Career Branch</h3>
            <div class="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">main/production</div>
        </div>
    </div>
    
    <div class="px-2 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 flex items-center gap-1.5">
        <Rocket size={10} class="text-pink-400" />
        <span class="text-[9px] font-bold text-pink-400 tracking-wider uppercase">{personal.yearsOfExperience}+ YOE</span>
    </div>
  </div>

  <!-- Body: Commit History -->
  <div class="flex-1 p-5 overflow-y-auto relative z-10">
    <!-- Connecting Line (The "Git" Line) -->
    <div class="absolute left-[2.35rem] top-6 bottom-6 w-0.5 bg-white/10"></div>

    <div class="flex flex-col gap-6">
      {#each timeline as stage, i}
        <div class="relative flex gap-4 group/item">
            
            <!-- Timeline Node -->
            <div class="relative z-10 flex-shrink-0 mt-1">
                <div class="w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300
                    {stage.current 
                        ? 'bg-pink-500/20 border-pink-500 text-pink-400 shadow-[0_0_10px_rgba(236,72,153,0.3)]' 
                        : 'bg-background border-white/20 text-muted-foreground group-hover/item:border-white/40'}">
                    <GitCommit size={14} />
                </div>
                {#if stage.current}
                    <div class="absolute -inset-1 rounded-full bg-pink-500/20 animate-ping opacity-75"></div>
                {/if}
            </div>

            <!-- Content Card -->
            <div class="flex-1 min-w-0 p-3 rounded-lg border border-transparent transition-all duration-300 hover:bg-white/5 hover:border-white/10">
                <div class="flex justify-between items-start mb-1">
                    <h4 class="text-sm font-bold text-foreground group-hover/item:text-pink-100 transition-colors">
                        {stage.company}
                    </h4>
                    <span class="text-[10px] font-mono text-muted-foreground/60 bg-white/5 px-1.5 py-0.5 rounded">
                        {stage.year}
                    </span>
                </div>
                
                <p class="text-xs text-muted-foreground mb-2 truncate">{stage.role}</p>

                <div class="flex items-center gap-2">
                    <span class="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold 
                        {stage.current ? 'bg-pink-500/10 text-pink-400 border border-pink-500/20' : 'bg-white/5 text-muted-foreground border border-white/5'}">
                        {stage.version}
                    </span>
                    {#if stage.promoted}
                        <span class="flex items-center gap-1 text-[9px] text-green-400 font-bold">
                            <ArrowUpRight size={10} /> Promoted
                        </span>
                    {/if}
                </div>
            </div>

        </div>
      {/each}
    </div>
  </div>

  <!-- Footer -->
  <div class="px-5 py-3 border-t border-white/5 bg-white/5 flex justify-between text-[10px] text-muted-foreground font-mono">
      <span>HEAD -> origin/master</span>
      <span>{timeline.length} commits</span>
  </div>

</div>
