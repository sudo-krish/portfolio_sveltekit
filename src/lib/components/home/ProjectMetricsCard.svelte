<!-- src/lib/components/home/ProjectMetricsCard.svelte -->
<script lang="ts">
  import { Terminal, Activity, Database, Clock, Layers } from 'lucide-svelte';
  
  const metrics = [
    { cmd: 'Throughput', value: '50M+', sub: 'Events / Day', icon: Activity, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    { cmd: 'Latency', value: '<1s', sub: 'Query Speed', icon: Database, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
    { cmd: 'Refresh', value: '5min', sub: 'Data SLA', icon: Clock, color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
    { cmd: 'Uptime', value: '99.9%', sub: 'Pipeline Availability', icon: Layers, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' }
  ];
</script>

<div class="relative w-full h-full min-h-[220px] rounded-xl border border-border/50 bg-background/40 backdrop-blur-md overflow-hidden flex flex-col">
  
  <!-- Technical Grid Pattern Background -->
  <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

  <!-- Header -->
  <div class="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/5 relative z-10">
    <div class="flex items-center gap-2">
       <Terminal size={14} class="text-muted-foreground" />
       <span class="text-[10px] font-mono font-bold tracking-widest text-muted-foreground uppercase">production.stats</span>
    </div>
    
    <div class="flex items-center gap-2 px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20">
       <div class="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
       <span class="text-[9px] font-bold text-blue-400 tracking-wider">PROD</span>
    </div>
  </div>

  <!-- Body -->
  <div class="flex-1 p-4 grid grid-cols-2 gap-3 relative z-10">
    {#each metrics as m}
      <div class="group relative flex flex-col items-center justify-center p-3 rounded-lg border {m.border} {m.bg} hover:bg-opacity-20 transition-all duration-300 cursor-default">
        
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
        <div class="text-[9px] text-muted-foreground/60 text-center">
           {m.sub}
        </div>

      </div>
    {/each}
  </div>

</div>
