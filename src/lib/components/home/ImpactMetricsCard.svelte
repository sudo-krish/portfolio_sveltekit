<!-- src/lib/components/home/ImpactMetricsCard.svelte -->
<script lang="ts">
  import { Terminal, TrendingUp, Zap, Target, Award, Activity } from 'lucide-svelte';
  
  const metrics = [
    { cmd: 'Latency', value: '99%', sub: '3h → sec', icon: TrendingUp, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
    { cmd: 'Accuracy', value: '98%', sub: '60% → 98%', icon: Target, color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
    { cmd: 'Efficiency', value: '80%', sub: 'Auto-Scaling', icon: Zap, color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
    { cmd: 'Insights', value: '70%', sub: 'AI Driven', icon: Award, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' }
  ];
</script>

<div class="relative w-full h-full min-h-[220px] rounded-xl border border-border/50 bg-background/40 backdrop-blur-md overflow-hidden flex flex-col">
  
  <!-- Grid Background Pattern -->
  <div class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>

  <!-- Header -->
  <div class="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/5 relative z-10">
    <div class="flex items-center gap-2">
       <Terminal size={14} class="text-muted-foreground" />
       <span class="text-[10px] font-mono font-bold tracking-widest text-muted-foreground uppercase">impact_log.sh</span>
    </div>
    
    <div class="flex items-center gap-2 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20">
       <div class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
       <span class="text-[9px] font-bold text-green-400 tracking-wider">LIVE</span>
    </div>
  </div>

  <!-- Body -->
  <div class="flex-1 p-4 grid grid-cols-2 gap-3 relative z-10">
    {#each metrics as m}
      <div class="group relative flex flex-col items-center justify-center p-3 rounded-lg border {m.border} {m.bg} hover:bg-opacity-20 transition-all duration-300">
        
        <!-- Icon -->
        <div class="mb-2 p-1.5 rounded-md bg-background/50 {m.color}">
           <svelte:component this={m.icon} size={16} strokeWidth={2.5} />
        </div>
        
        <!-- Value -->
        <div class="text-xl font-black tracking-tight {m.color} drop-shadow-sm">
           {m.value}
        </div>
        
        <!-- Label -->
        <div class="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-wider mb-0.5">
           {m.cmd}
        </div>
        
        <!-- Subtext -->
        <div class="text-[9px] text-muted-foreground/60">
           {m.sub}
        </div>

      </div>
    {/each}
  </div>

</div>
