<!-- src/lib/components/home/MetricsGrid.svelte -->
<script lang="ts">
  import { Zap, Database, GitBranch, Globe } from 'lucide-svelte';
  import LeetCodeCard from './LeetCodeCard.svelte';
  import GitHubStatsCard from './GitHubStatsCard.svelte';
  import ExperienceCard from './ExperienceCard.svelte';
  import SpecialtyCard from './SpecialtyCard.svelte';
</script>

<section class="metrics-section">
  <div class="data-pattern">
    <div class="pattern-line"></div>
    <div class="pattern-line"></div>
    <div class="pattern-line"></div>
  </div>
  
  <div class="container">
    <div class="section-header">
      <div class="header-accent">
        <Database size={20} class="accent-icon" />
      </div>
      <h2 class="section-title">
        <span class="title-mono">ENGINEERING</span>
        <span class="title-gradient">Data Solutions</span>
      </h2>
      <p class="section-subtitle">
        Real-time CDC pipelines • Multi-cloud architecture • 5-minute SLA data warehouse
      </p>
    </div>
    
    <div class="metrics-grid">
      <!-- Pipeline Stage 1: Foundation -->
      <div class="pipeline-stage">
        <div class="stage-label">
          <span class="stage-number">01</span>
          <span class="stage-text">Foundation</span>
        </div>
        <div class="grid-row">
          <LeetCodeCard />
          <GitHubStatsCard />
        </div>
      </div>
      
      <!-- Pipeline Stage 2: Journey -->
      <div class="pipeline-stage">
        <div class="stage-label">
          <span class="stage-number">02</span>
          <span class="stage-text">Professional Journey</span>
        </div>
        <div class="grid-row full-width">
          <ExperienceCard />
        </div>
      </div>
      
      <!-- Pipeline Stage 3: Elite Expertise -->
      <div class="pipeline-stage">
        <div class="stage-label">
          <span class="stage-number">03</span>
          <span class="stage-text">Elite Expertise</span>
        </div>
        <div class="grid-row specialties">
          <SpecialtyCard 
            icon={Zap}
            title="Real-Time CDC Pipeline"
            highlight="RARE SKILL"
            description="Kafka + Debezium + Python consumers for instant data propagation"
            tags={['Kafka', 'Debezium', 'CDC', 'Python']}
          />
          
          <SpecialtyCard 
            icon={Database}
            title="Near Real-Time Warehouse"
            highlight="5-MIN SLA"
            description="Sub-5-minute refresh data warehouse with production SLAs"
            tags={['Redshift', 'Glue', 'Lambda', 'PySpark']}
          />
          
          <SpecialtyCard 
            icon={GitBranch}
            title="Multi-Language Transforms"
            highlight="POLYGLOT"
            description="On-the-fly transformations in Python & Go for performance"
            tags={['Python', 'Go', 'ETL', 'Real-time']}
          />
          
          <SpecialtyCard 
            icon={Globe}
            title="Cloud Migration Expert"
            highlight="GCP → AWS"
            description="Kubernetes orchestration + cloud-to-cloud migration expertise"
            tags={['AWS', 'GCP', 'K8s', 'Docker']}
          />
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .metrics-section {
    padding: 5rem 0 6rem;
    background: hsl(var(--background));
    position: relative;
    overflow: hidden;
  }
  
  /* Data Flow Background Pattern */
  .data-pattern {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 300px;
    pointer-events: none;
    opacity: 0.03;
  }
  
  .pattern-line {
    position: absolute;
    width: 100%;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      hsl(var(--foreground)) 50%,
      transparent 100%
    );
  }
  
  .pattern-line:nth-child(1) {
    top: 80px;
    animation: flow 15s linear infinite;
  }
  
  .pattern-line:nth-child(2) {
    top: 150px;
    animation: flow 20s linear infinite reverse;
  }
  
  .pattern-line:nth-child(3) {
    top: 220px;
    animation: flow 18s linear infinite;
  }
  
  @keyframes flow {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    position: relative;
    z-index: 1;
  }
  
  /* Data-Themed Header */
  .section-header {
    text-align: center;
    margin-bottom: 4rem;
  }
  
  .header-accent {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  
  :global(.accent-icon) {
    color: hsl(var(--muted-foreground));
  }
  
  .section-title {
    font-size: 3.5rem;
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 1.25rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
  }
  
  .title-mono {
    font-family: var(--font-mono);
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: hsl(var(--muted-foreground));
  }
  
  .title-gradient {
    background: linear-gradient(
      135deg,
      hsl(var(--foreground)) 0%,
      hsl(var(--muted-foreground)) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .section-subtitle {
    font-family: var(--font-mono);
    font-size: 0.9375rem;
    color: hsl(var(--muted-foreground));
    max-width: 700px;
    margin: 0 auto;
    line-height: 1.8;
  }
  
  /* Pipeline Stages */
  .pipeline-stage {
    margin-bottom: 3rem;
    position: relative;
  }
  
  .stage-label {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }
  
  .stage-number {
    font-family: var(--font-mono);
    font-size: 0.875rem;
    font-weight: 700;
    color: hsl(var(--primary));
    padding: 0.375rem 0.75rem;
    background: hsl(var(--primary) / 0.1);
    border: 1px solid hsl(var(--primary) / 0.2);
    border-radius: 6px;
  }
  
  .stage-text {
    font-family: var(--font-mono);
    font-size: 0.875rem;
    font-weight: 600;
    color: hsl(var(--muted-foreground));
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  
  /* Grid Layout */
  .metrics-grid {
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  
  .grid-row {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
  }
  
  /* Full Width Row */
  .grid-row.full-width {
    max-width: 900px;
    margin: 0 auto;
    width: 100%;
  }
  
  /* Specialties Row - 4 columns */
  .grid-row.specialties {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  /* Responsive */
  @media (max-width: 1200px) {
    .grid-row.specialties {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (max-width: 920px) {
    .grid-row {
      flex-direction: column;
      align-items: center;
    }
  }
  
  @media (max-width: 640px) {
    .metrics-section {
      padding: 4rem 0;
    }
    
    .section-title {
      font-size: 2.5rem;
    }
    
    .title-mono {
      font-size: 0.875rem;
    }
    
    .section-subtitle {
      font-size: 0.8125rem;
    }
    
    .grid-row.specialties {
      grid-template-columns: 1fr;
    }
  }
</style>
