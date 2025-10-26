<script lang="ts">
  import { Badge } from '$lib/components/ui/badge';
  import IOSTabs from '$lib/components/ui/ios-tabs.svelte';
  import { 
    Database, Cloud, Sparkles, Code2, Workflow, Server, Container,
    HardDrive, GitBranch, Layers, Search, Brain, Zap, FileCode,
    Terminal, Globe, Activity, BarChart
  } from 'lucide-svelte';
  
  const techCategories = {
    data: {
      name: 'Data Engineering',
      icon: Database,
      technologies: [
        { name: 'Apache Kafka', icon: Workflow },
        { name: 'Apache Airflow', icon: GitBranch },
        { name: 'Prefect', icon: Workflow },
        { name: 'dbt', icon: Layers },
        { name: 'Amazon Redshift', icon: Database },
        { name: 'TiDB', icon: Database },
        { name: 'Google BigQuery', icon: BarChart },
        { name: 'Aurora PostgreSQL', icon: Database },
        { name: 'DynamoDB', icon: HardDrive },
        { name: 'ETL/ELT', icon: Workflow },
        { name: 'Data Pipelines', icon: GitBranch },
        { name: 'Real-Time Streaming', icon: Zap }
      ]
    },
    cloud: {
      name: 'Cloud',
      icon: Cloud,
      technologies: [
        { name: 'AWS', icon: Cloud },
        { name: 'GCP', icon: Cloud },
        { name: 'Amazon S3', icon: HardDrive },
        { name: 'AWS Lambda', icon: Zap },
        { name: 'Docker', icon: Container },
        { name: 'Kubernetes', icon: Container },
        { name: 'Linux', icon: Terminal }
      ]
    },
    ai: {
      name: 'AI & Innovation',
      icon: Sparkles,
      technologies: [
        { name: 'Vector Databases', icon: Database },
        { name: 'Vector Search', icon: Search },
        { name: 'Semantic Search', icon: Brain },
        { name: 'GenAI Architecture', icon: Sparkles },
        { name: 'GraphQL APIs', icon: Globe },
        { name: 'CI/CD', icon: GitBranch }
      ]
    },
    code: {
      name: 'Programming',
      icon: Code2,
      technologies: [
        { name: 'Python', icon: FileCode },
        { name: 'SQL', icon: Database },
        { name: 'Shell Scripting', icon: Terminal },
        { name: 'GraphQL', icon: Globe },
        { name: 'REST APIs', icon: Globe }
      ]
    }
  };
  
  let activeTab = 'data';
  
  const tabs = Object.entries(techCategories).map(([key, cat]) => ({
    id: key,
    label: cat.name,
    icon: cat.icon
  }));
</script>

<section class="tech-section">
  <!-- Background Lines -->
  <div class="lines-bg">
    <svg class="flow-lines" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
      <line x1="200" y1="0" x2="200" y2="800" stroke="currentColor" stroke-width="1" opacity="0.1" />
      <line x1="400" y1="0" x2="400" y2="800" stroke="currentColor" stroke-width="1" opacity="0.1" />
      <line x1="600" y1="0" x2="600" y2="800" stroke="currentColor" stroke-width="1" opacity="0.1" />
      <line x1="800" y1="0" x2="800" y2="800" stroke="currentColor" stroke-width="1" opacity="0.1" />
      <line x1="1000" y1="0" x2="1000" y2="800" stroke="currentColor" stroke-width="1" opacity="0.1" />
      
      <circle class="data-dot" r="4" fill="currentColor">
        <animateMotion dur="4s" repeatCount="indefinite">
          <mpath href="#path1"/>
        </animateMotion>
      </circle>
      <circle class="data-dot" r="4" fill="currentColor">
        <animateMotion dur="5s" repeatCount="indefinite" begin="1s">
          <mpath href="#path2"/>
        </animateMotion>
      </circle>
      <circle class="data-dot" r="4" fill="currentColor">
        <animateMotion dur="6s" repeatCount="indefinite" begin="2s">
          <mpath href="#path3"/>
        </animateMotion>
      </circle>
      
      <path id="path1" d="M 200 0 L 200 800" fill="none" />
      <path id="path2" d="M 600 0 L 600 800" fill="none" />
      <path id="path3" d="M 1000 0 L 1000 800" fill="none" />
    </svg>
  </div>

  <div class="container">
    <!-- Header -->
    <div class="header">
      <Badge class="inline-flex items-center gap-2 mb-4">
        <Activity size={14} />
        <span>TECH STACK</span>
      </Badge>
      <h2 class="title">
        Technologies & Tools
      </h2>
      <p class="subtitle">
        Production-grade stack powering enterprise infrastructure
      </p>
    </div>

    <!-- Tabs -->
    <IOSTabs {tabs} {activeTab} onChange={(id) => activeTab = id} />

    <!-- Tech Grid -->
    <div class="tech-content">
      {#each Object.entries(techCategories) as [key, cat]}
        {#if activeTab === key}
          <div class="tech-grid">
            {#each cat.technologies as tech, i}
              <div class="tech-node" style="animation-delay: {i * 0.05}s">
                <div class="node-connector top"></div>
                <div class="node-content">
                  <div class="node-icon">
                    <svelte:component this={tech.icon} size={18} />
                  </div>
                  <span class="node-label">{tech.name}</span>
                </div>
                <div class="node-connector bottom"></div>
              </div>
            {/each}
          </div>
        {/if}
      {/each}
    </div>

    <!-- Stats -->
    <div class="stats-grid">
      <div class="stat-card">
        <Database size={24} class="text-primary" />
        <span class="stat-value">50+</span>
        <span class="stat-label">Technologies</span>
      </div>
      <div class="stat-card">
        <Cloud size={24} class="text-primary" />
        <span class="stat-value">AWS & GCP</span>
        <span class="stat-label">Cloud Platforms</span>
      </div>
      <div class="stat-card">
        <Sparkles size={24} class="text-primary" />
        <span class="stat-value">5+ Years</span>
        <span class="stat-label">Experience</span>
      </div>
    </div>
  </div>
</section>

<style>
  .tech-section {
    position: relative;
    padding: 5rem 0;
    background: hsl(var(--background));
    overflow: hidden;
  }
  
  /* Background */
  .lines-bg {
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0.4;
  }
  
  .flow-lines {
    width: 100%;
    height: 100%;
    color: hsl(var(--primary));
  }
  
  .data-dot {
    opacity: 0.6;
  }
  
  .container {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }
  
  /* Header */
  .header {
    text-align: center;
    margin-bottom: 3rem;
  }
  
  .title {
    font-size: 2.5rem;
    font-weight: 800;
    color: hsl(var(--foreground));
    margin: 0 0 0.75rem;
  }
  
  .gradient {
    background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)));
    /* -webkit-background-clip: text; */
    -webkit-text-fill-color: transparent;
  }
  
  .subtitle {
    font-size: 0.9375rem;
    color: hsl(var(--muted-foreground));
    margin: 0;
  }
  
  /* Tech Content */
  .tech-content {
    margin: 3rem 0;
  }
  
  .tech-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 2rem 1.5rem;
  }
  
  .tech-node {
    position: relative;
    animation: node-fade 0.5s ease forwards;
    opacity: 0;
  }
  
  @keyframes node-fade {
    to { opacity: 1; transform: translateY(0); }
    from { opacity: 0; transform: translateY(10px); }
  }
  
  .node-content {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.875rem;
    padding: 1rem 1.25rem;
    background: hsl(var(--card));
    border: 1px solid hsl(var(--border));
    border-radius: calc(var(--radius) - 2px);
    transition: all 0.3s ease;
    z-index: 2;
  }
  
  .node-content:hover {
    transform: translateY(-4px);
    border-color: hsl(var(--primary));
    box-shadow: 0 8px 24px hsl(var(--foreground) / 0.08);
  }
  
  .node-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: hsl(var(--muted));
    border-radius: calc(var(--radius) - 4px);
    color: hsl(var(--primary));
    flex-shrink: 0;
    transition: all 0.3s ease;
  }
  
  .node-content:hover .node-icon {
    background: hsl(var(--primary));
    color: white;
  }
  
  .node-label {
    font-size: 0.875rem;
    font-weight: 600;
    color: hsl(var(--foreground));
  }
  
  /* Connectors */
  .node-connector {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 1rem;
    z-index: 1;
  }
  
  .node-connector.top {
    top: -1rem;
    background: linear-gradient(180deg, transparent, hsl(var(--border)));
  }
  
  .node-connector.bottom {
    bottom: -1rem;
    background: linear-gradient(180deg, hsl(var(--border)), transparent);
  }
  
  .node-connector::after {
    content: '';
    position: absolute;
    width: 6px;
    height: 6px;
    background: hsl(var(--primary));
    border-radius: 50%;
    left: 50%;
    transform: translateX(-50%);
    animation: data-flow 2s ease-in-out infinite;
    opacity: 0;
  }
  
  @keyframes data-flow {
    0% { top: 0; opacity: 0; }
    50% { opacity: 0.8; }
    100% { top: 100%; opacity: 0; }
  }
  
  .node-connector.top::after {
    animation-delay: 0s;
  }
  
  .node-connector.bottom::after {
    animation-delay: 1s;
  }
  
  /* Stats */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    margin-top: 4rem;
  }
  
  .stat-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 1.5rem;
    background: hsl(var(--card));
    border: 1px solid hsl(var(--border));
    border-radius: var(--radius);
    text-align: center;
    transition: transform 0.2s;
  }
  
  .stat-card:hover {
    transform: translateY(-4px);
  }
  
  .stat-value {
    font-family: var(--font-mono);
    font-size: 1.5rem;
    font-weight: 700;
    color: hsl(var(--foreground));
  }
  
  .stat-label {
    font-size: 0.875rem;
    color: hsl(var(--muted-foreground));
  }
  
  /* Responsive */
  @media (max-width: 768px) {
    .container {
      padding: 0 1rem;
    }
    
    .title {
      font-size: 2rem;
    }
    
    .tech-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    
    .stats-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
