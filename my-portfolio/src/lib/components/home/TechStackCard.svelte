<!-- src/lib/components/home/TechStackCard.svelte -->
<script lang="ts">
  import { Code2, Cloud, Database, GitBranch, Layers } from 'lucide-svelte';
  
  const categories = [
    {
      icon: Cloud,
      name: 'Cloud Infra',
      skills: ['AWS', 'Redshift', 'Glue', 'Lambda', 'Kinesis'],
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20'
    },
    {
      icon: Database,
      name: 'Data Plane',
      skills: ['Kafka', 'Debezium', 'Airflow', 'DBT', 'Spark'],
      color: 'text-violet-400',
      bg: 'bg-violet-500/10',
      border: 'border-violet-500/20'
    },
    {
      icon: Code2,
      name: 'Core Logic',
      skills: ['Python', 'Go', 'SQL', 'PySpark'],
      color: 'text-green-400',
      bg: 'bg-green-500/10',
      border: 'border-green-500/20'
    },
    {
      icon: GitBranch,
      name: 'DevOps',
      skills: ['Docker', 'K8s', 'Terraform', 'CI/CD'],
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20'
    }
  ];
  
  const totalSkills = categories.reduce((sum, cat) => sum + cat.skills.length, 0);
</script>

<div class="relative w-full h-full min-h-[300px] flex flex-col rounded-xl border border-white/10 bg-background/40 backdrop-blur-md overflow-hidden group">
  
  <!-- Header -->
  <div class="flex items-center justify-between px-5 py-4 border-b border-white/5 bg-white/5 relative z-10">
    <div class="flex items-center gap-3">
        <div class="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Layers size={18} />
        </div>
        <div>
            <h3 class="text-sm font-bold text-foreground tracking-tight">Full Stack Architecture</h3>
            <div class="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">{totalSkills} Core Technologies</div>
        </div>
    </div>
  </div>

  <!-- Body: Modular Grid -->
  <div class="flex-1 p-4 grid grid-cols-2 md:grid-cols-4 gap-4 overflow-y-auto relative z-10">
    {#each categories as category}
      <div class="flex flex-col gap-3 group/col">
        
        <!-- Column Header -->
        <div class="flex items-center gap-2 pb-2 border-b border-white/5">
           <svelte:component this={category.icon} size={14} class="{category.color}" />
           <span class="text-xs font-bold text-foreground">{category.name}</span>
        </div>

        <!-- Skills List -->
        <div class="flex flex-col gap-2">
          {#each category.skills as skill}
            <div class="px-3 py-1.5 rounded-md border text-[10px] font-mono font-medium text-muted-foreground bg-white/5 border-white/5 hover:bg-white/10 hover:text-white transition-all duration-300 cursor-default flex items-center justify-between group/skill">
               <span>{skill}</span>
               <div class="w-1.5 h-1.5 rounded-full {category.bg} opacity-50 group-hover/skill:opacity-100 transition-opacity"></div>
            </div>
          {/each}
        </div>
        
      </div>
    {/each}
  </div>

</div>
