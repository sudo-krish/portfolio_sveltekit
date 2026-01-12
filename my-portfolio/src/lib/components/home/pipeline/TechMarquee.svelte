<!-- src/lib/components/home/pipeline/TechMarquee.svelte -->
<script lang="ts">
  interface TechItem {
    name: string;
    color: string;
    logoUrl: string; 
  }

  const techStack: TechItem[] = [
    { name: "Spark", color: "#E25A1C", logoUrl: "https://cdn.simpleicons.org/apachespark/E25A1C" },
    { name: "Kafka", color: "#ffffff", logoUrl: "https://cdn.simpleicons.org/apachekafka/ffffff" },
    { name: "dbt", color: "#FF694B", logoUrl: "https://cdn.simpleicons.org/dbt/FF694B" },
    { name: "Airflow", color: "#017CEE", logoUrl: "https://cdn.simpleicons.org/apacheairflow/017CEE" },
    { name: "Snowflake", color: "#29B5E8", logoUrl: "https://cdn.simpleicons.org/snowflake/29B5E8" },
    { name: "BigQuery", color: "#669DF6", logoUrl: "https://cdn.simpleicons.org/googlebigquery/669DF6" },
    { name: "Python", color: "#3776AB", logoUrl: "https://cdn.simpleicons.org/python/3776AB" },
    { name: "SQL", color: "#00BCF2", logoUrl: "https://cdn.simpleicons.org/postgresql/4169E1" },
    { name: "Docker", color: "#2496ED", logoUrl: "https://cdn.simpleicons.org/docker/2496ED" },
    { name: "K8s", color: "#326CE5", logoUrl: "https://cdn.simpleicons.org/kubernetes/326CE5" },
    { name: "AWS", color: "#FF9900", logoUrl: "https://cdn.simpleicons.org/amazonwebservices/FF9900" },
    { name: "Terraform", color: "#7B42BC", logoUrl: "https://cdn.simpleicons.org/terraform/7B42BC" },
    { name: "Databricks", color: "#FF3621", logoUrl: "https://cdn.simpleicons.org/databricks/FF3621" }
  ];
</script>

<div class="w-full overflow-hidden relative py-10 mask-gradient">
  
  <!-- BACKGROUND TRACK LINE -->
  <div class="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent -translate-y-1/2 opacity-20"></div>

  <!-- SCROLLING CONTENT -->
  <div class="marquee-track flex gap-6 w-max px-4">
    {#each [...techStack, ...techStack] as tech}
      <!-- 
         HOLO-TILE CARD 
         - Square Aspect Ratio
         - Glassmorphism
         - Neon Hover 
      -->
      <div 
        class="group relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-2xl border border-white/5 bg-white/5 backdrop-blur-md transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-110 hover:border-[var(--brand-color)] hover:shadow-[0_0_30px_-5px_var(--brand-color)] cursor-pointer"
        style="--brand-color: {tech.color}"
        title={tech.name}
      >
        
        <!-- Inner Glow Blob (Subtle Ambient Light) -->
        <div class="absolute inset-0 rounded-2xl bg-[var(--brand-color)] opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500"></div>
        
        <!-- Reflection Shine -->
        <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <!-- The Logo -->
        <div class="relative w-10 h-10 md:w-12 md:h-12 transition-transform duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_var(--brand-color)]">
          <img 
            src={tech.logoUrl} 
            alt={tech.name} 
            class="w-full h-full object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
            loading="lazy"
          />
        </div>
        
        <!-- Tooltip Label (Visible on Hover) -->
        <div class="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 pointer-events-none">
           <span class="text-[10px] font-mono tracking-widest uppercase text-[var(--brand-color)] font-bold bg-background/80 backdrop-blur-sm px-2 py-1 rounded-full border border-[var(--brand-color)]/20 shadow-sm whitespace-nowrap">
             {tech.name}
           </span>
        </div>

      </div>
    {/each}
  </div>
</div>

<style>
  .mask-gradient {
    /* Strong fade on edges to make them disappear into the void */
    mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
    -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
  }

  .marquee-track {
    animation: scroll 60s linear infinite; /* Slower, majestic scroll */
    will-change: transform;
    padding-left: 2rem; /* Initial offset */
  }

  @keyframes scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  .marquee-track:hover {
    animation-play-state: paused;
  }
</style>
