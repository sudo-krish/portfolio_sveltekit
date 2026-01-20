<!-- src/lib/components/home/LocationCard.svelte -->
<script lang="ts">
  import { MapPin, Clock, Globe, Wifi } from 'lucide-svelte';
  import { getPersonalInfo } from '$lib/data/portfolio-data';
  import { onMount, onDestroy } from 'svelte';
  
  const personal = getPersonalInfo();
  
  let currentTime = '';
  let interval: ReturnType<typeof setInterval>;
  
  function updateTime() {
    const now = new Date();
    currentTime = now.toLocaleTimeString('en-US', { 
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  }
  
  onMount(() => {
    updateTime();
    interval = setInterval(updateTime, 1000);
  });
  
  onDestroy(() => {
    if (interval) clearInterval(interval);
  });
</script>

<div class="relative w-full h-full min-h-[300px] flex flex-col rounded-xl border border-white/10 bg-background/40 backdrop-blur-md overflow-hidden group">
  
  <!-- Header -->
  <div class="flex items-center justify-between px-5 py-4 border-b border-white/5 bg-white/5 relative z-10">
    <div class="flex items-center gap-3">
        <div class="p-2 rounded-lg bg-green-500/10 text-green-400 border border-green-500/20">
            <Globe size={18} />
        </div>
        <div>
            <h3 class="text-sm font-bold text-foreground tracking-tight">Base of Operations</h3>
            <div class="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Karnataka, IN</div>
        </div>
    </div>
    
    <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
  </div>

  <!-- Body -->
  <div class="flex-1 p-4 flex flex-col gap-4 relative z-10">
    
    <!-- Radar Map Visualization -->
    <div class="relative h-24 w-full rounded-lg bg-black/20 border border-white/10 overflow-hidden flex items-center justify-center">
        <!-- Grid -->
        <div class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
        
        <!-- Radar Sweep Animation -->
        <div class="absolute inset-0 bg-gradient-to-tr from-green-500/20 to-transparent w-full h-full animate-[spin_4s_linear_infinite] origin-bottom-left opacity-30"></div>
        
        <!-- Pin -->
        <div class="relative z-10 flex flex-col items-center">
            <MapPin size={24} class="text-green-500 fill-green-500/20 drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
            <div class="w-2 h-1 bg-green-500/50 rounded-full blur-[2px] mt-1"></div>
        </div>
    </div>

    <!-- Info Stack -->
    <div class="grid grid-cols-2 gap-3">
        
        <!-- Time -->
        <div class="p-3 rounded-lg bg-white/5 border border-white/5 flex flex-col justify-between">
            <div class="flex items-center gap-2 text-[10px] text-muted-foreground uppercase tracking-wider font-bold">
                <Clock size={12} /> Local Time
            </div>
            <div class="text-xl font-mono font-bold text-foreground mt-1">
                {currentTime} <span class="text-[10px] text-muted-foreground">IST</span>
            </div>
        </div>

        <!-- Mode -->
        <div class="p-3 rounded-lg bg-white/5 border border-white/5 flex flex-col justify-between">
            <div class="flex items-center gap-2 text-[10px] text-muted-foreground uppercase tracking-wider font-bold">
                <Wifi size={12} /> Status
            </div>
            <div class="flex items-center gap-2 mt-2">
                <span class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-green-500/10 text-green-400 border border-green-500/20">Remote</span>
                <span class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">Hybrid</span>
            </div>
        </div>

    </div>

    <!-- Footer Availability -->
    <div class="mt-auto pt-3 border-t border-white/5 flex items-center justify-between text-xs">
        <span class="text-muted-foreground">Open to relocation?</span>
        <span class="font-bold text-foreground">Yes (Global)</span>
    </div>

  </div>

</div>
