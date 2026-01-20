<!-- src/lib/components/home/ExperienceCard.svelte -->
<script lang="ts">
  import { Briefcase, Cloud, Zap, Sparkles, TrendingUp, Terminal } from 'lucide-svelte';
  import { onMount } from 'svelte';
  
  const milestones = [
    { year: '2020', title: 'Initialized', role: 'Junior Engineer', icon: Terminal, color: '#3b82f6' }, // Blue
    { year: '2022', title: 'Scaled Up', role: 'Data & Cloud', icon: Cloud, color: '#8b5cf6' }, // Violet
    { year: '2023', title: 'Optimized', role: 'Streaming ETL', icon: Zap, color: '#ec4899' }, // Pink
    { year: '2025', title: 'Future State', role: 'AI Architect', icon: Sparkles, color: '#f59e0b' } // Amber
  ];
  
  let mounted = false;
  onMount(() => { mounted = true; });
</script>

<div class="relative w-full z-20 pointer-events-auto flex flex-col items-start text-left">
  
  <div class="w-full relative">
    
    <!-- DECORATIVE: Left Data Line (Matches Pipeline Component) -->
    <div class="hidden lg:block absolute left-0 top-2 bottom-4 w-px bg-gradient-to-b from-blue-500/50 to-transparent"></div>
    
    <!-- 1. HEADER SECTION -->
    <div class="mb-8 pl-0 lg:pl-8">
      <!-- Status Badge -->
      <div class="mb-4 flex items-center gap-3">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm">
           <span class="relative flex h-1.5 w-1.5">
             <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
             <span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
           </span>
           <span class="font-mono text-[10px] font-semibold text-blue-200 tracking-widest uppercase">
             Career Pipeline
           </span>
        </div>
        
        <!-- Experience Counter -->
        <div class="flex items-center gap-2 text-xs font-mono text-muted-foreground/80">
            <TrendingUp size={12} class="text-green-400"/>
            <span>Uptime: 5+ Years</span>
        </div>
      </div>
      
      <!-- Headline -->
      <h3 class="text-3xl font-extrabold leading-tight mb-2">
        Professional <br />
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-300% animate-gradient">
          Evolution.
        </span>
      </h3>
    </div>

    <!-- 2. VERTICAL PIPELINE VISUALIZATION -->
    <div class="relative pl-4 lg:pl-12 pb-4">
        
        <!-- The Vertical Conduit -->
        <div class="absolute left-[1.65rem] lg:left-[3.65rem] top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500/20 via-blue-500/10 to-transparent rounded-full overflow-hidden">
            <!-- Animated Data Packets Flowing Down -->
            {#if mounted}
                <div class="absolute top-0 left-0 w-full h-8 bg-blue-400/50 blur-sm animate-data-flow"></div>
                <div class="absolute top-0 left-0 w-full h-12 bg-cyan-400/30 blur-md animate-data-flow delay-1000"></div>
            {/if}
        </div>

        <!-- Milestones Stack -->
        <div class="flex flex-col gap-8 relative z-10">
            {#each milestones as milestone, i}
                <div class="group relative flex items-center gap-6" style="--accent-color: {milestone.color}">
                    
                    <!-- 1. The Node (Holo-Tile Style) -->
                    <div class="relative flex-shrink-0 w-12 h-12 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:border-[var(--accent-color)] group-hover:shadow-[0_0_15px_var(--accent-color)]">
                        <!-- Glow -->
                        <div class="absolute inset-0 bg-[var(--accent-color)] opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300"></div>
                        <!-- Icon -->
                        <div class="relative z-10 text-muted-foreground group-hover:text-[var(--accent-color)] transition-colors">
                            <svelte:component this={milestone.icon} size={20} />
                        </div>
                    </div>

                    <!-- 2. The Connector Line (Horizontal) -->
                    <div class="w-8 h-px bg-[var(--accent-color)] opacity-30 group-hover:opacity-100 group-hover:w-12 transition-all duration-300"></div>

                    <!-- 3. Content Card -->
                    <div class="flex-1 p-4 rounded-lg border border-border/50 bg-background/20 backdrop-blur-sm transition-all duration-300 group-hover:bg-background/40 group-hover:translate-x-2">
                        <div class="flex justify-between items-start">
                            <div class="flex flex-col">
                                <span class="text-xs font-mono text-[var(--accent-color)] tracking-wider uppercase mb-1">{milestone.year}</span>
                                <h4 class="text-sm font-bold text-foreground group-hover:text-white transition-colors">{milestone.title}</h4>
                                <span class="text-xs text-muted-foreground">{milestone.role}</span>
                            </div>
                        </div>
                    </div>

                </div>
            {/each}
        </div>

    </div>

  </div>
</div>

<style>
  /* Gradient Animation matches your other components */
  .bg-300\% { background-size: 300% 300%; }
  .animate-gradient { animation: animatedgradient 6s ease infinite alternate; }

  @keyframes animatedgradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  /* Data Flow Animation for the conduit */
  @keyframes flow-down {
    0% { top: -10%; opacity: 0; }
    20% { opacity: 1; }
    80% { opacity: 1; }
    100% { top: 110%; opacity: 0; }
  }
  .animate-data-flow {
      animation: flow-down 3s linear infinite;
  }
  .delay-1000 { animation-delay: 1.5s; }
</style>
