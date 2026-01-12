<!-- src/lib/components/home/pipeline/PipelineContent.svelte -->
<script lang="ts">
  import { Terminal } from "lucide-svelte";
  import TechMarquee from "./TechMarquee.svelte"; 
</script>

<div class="relative w-full z-20 pointer-events-auto flex flex-col items-start text-left">
  
  <div class="max-w-xl lg:pl-12 relative w-full">
    
    <!-- DECORATIVE: Left Data Line -->
    <div class="hidden lg:block absolute left-0 top-2 bottom-4 w-px bg-gradient-to-b from-primary/50 to-transparent"></div>
    <div class="hidden lg:block absolute left-[-0.65rem] top-2 text-primary/40">
      <Terminal size={14} />
    </div>

    <!-- 1. HEADER SECTION -->
    <div class="mb-10">
      <!-- Status Badge -->
      <div class="mb-4 flex items-center gap-3">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/60 bg-background/50 backdrop-blur-sm">
           <span class="relative flex h-1.5 w-1.5">
             <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
             <span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
           </span>
           <span class="font-mono text-[10px] font-semibold text-muted-foreground tracking-widest uppercase">
             Infrastructure
           </span>
        </div>
      </div>
      
      <!-- Headline: SEO Optimized -->
      <h3 class="main-title mb-6">
        Scalable Data <br />
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-primary bg-300% animate-gradient">
          Architecture.
        </span>
      </h3>

      <!-- Bio: Technical & SEO Rich -->
      <p class="sub-title max-w-lg text-muted-foreground leading-relaxed">
        I engineer <strong>high-throughput ETL/ELT pipelines</strong> that drive decision-making. 
        Specializing in <span class="text-foreground font-medium">distributed computing (Spark)</span> 
        and <span class="text-foreground font-medium">cloud-native warehousing</span>, 
        I build systems that ensure data integrity, minimize latency, and optimize cloud costs at petabyte scale.
      </p>
    </div>

    <!-- 2. TECH STACK MARQUEE -->
    <div class="w-full -ml-4 lg:ml-0"> 
      <div class="mb-4 pl-4 lg:pl-0">
         <span class="text-xs font-mono text-muted-foreground/60 uppercase tracking-widest">
           Modern Data Stack
         </span>
      </div>
      
      <TechMarquee />
      
    </div>

  </div>
</div>

<style>
  /* Reuse Typography Styles */
  .main-title {
    font-size: clamp(2rem, 3.5vw, 3rem); 
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: hsl(var(--foreground));
  }

  .sub-title {
    font-size: clamp(0.95rem, 1vw, 1.05rem);
    line-height: 1.6;
    color: hsl(var(--muted-foreground));
  }

  .bg-300\% { background-size: 300% 300%; }
  .animate-gradient { animation: animatedgradient 6s ease infinite alternate; }

  @keyframes animatedgradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
</style>
