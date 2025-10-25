<!-- src/lib/components/home/FeaturedProjects.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { Button } from '$lib/components/ui/button';
  import { ArrowRight, Database, Filter, RefreshCw } from 'lucide-svelte';
  import ProjectCard from './ProjectCard.svelte';
  import { getAllProjectsWithGitHub } from '$lib/data/portfolio-data';
  
  export let limit: number = 6;
  
  const categories = ['All', 'Real-Time', 'Cloud', 'Data Lake', 'ETL', 'Production'];
  let activeCategory = 'All';
  let projects: any[] = [];
  let loading = true;
  let error = false;
  
  // Fetch projects on mount
  onMount(async () => {
    try {
      projects = await getAllProjectsWithGitHub();
      loading = false;
    } catch (err) {
      console.error('Failed to load projects:', err);
      error = true;
      loading = false;
    }
  });
  
  $: filteredProjects = activeCategory === 'All' 
    ? projects.slice(0, limit)
    : projects
        .filter(p => p.keywords.some((k: string) => 
          k.toLowerCase().includes(activeCategory.toLowerCase())
        ))
        .slice(0, limit);
</script>

<section class="projects-section">
  <!-- Background Grid Pattern -->
  <div class="grid-pattern"></div>
  
  <div class="container">
    <!-- Section Header -->
    <div class="section-header">
      <div class="header-top">
        <div class="header-badge">
          <Database size={16} />
          <span>PROJECTS</span>
        </div>
        <Button variant="ghost" size="sm" class="view-all-btn">
          View All
          <ArrowRight size={16} class="ml-2" />
        </Button>
      </div>
      
      <h2 class="section-title">
        <span class="title-accent">//</span> Featured Work
      </h2>
      <p class="section-subtitle">
        Production-grade data engineering projects • Real-time pipelines • Cloud architecture
      </p>
    </div>
    
    <!-- Category Filter -->
    <div class="filter-bar">
      <div class="filter-icon">
        <Filter size={18} />
      </div>
      <div class="filter-tabs">
        {#each categories as category}
          <button
            class="filter-tab"
            class:active={activeCategory === category}
            on:click={() => activeCategory = category}
          >
            {category}
          </button>
        {/each}
      </div>
    </div>
    
    <!-- Loading State -->
    {#if loading}
      <div class="loading-state">
        <RefreshCw size={32} class="spinner" />
        <p>Loading projects from GitHub...</p>
      </div>
    
    <!-- Error State -->
    {:else if error}
      <div class="error-state">
        <p>Failed to load some projects. Showing available projects.</p>
      </div>
    
    <!-- Projects Grid -->
    {:else if filteredProjects.length > 0}
      <div class="projects-grid">
        {#each filteredProjects as project (project.id)}
          <ProjectCard {project} />
        {/each}
      </div>
      
      <!-- View More CTA -->
      {#if projects.length > limit}
        <div class="view-more">
          <Button variant="outline" size="lg">
            View All {projects.length} Projects
            <ArrowRight size={18} class="ml-2" />
          </Button>
        </div>
      {/if}
    
    <!-- Empty State - FIXED -->
    {:else}
      <div class="empty-state">
        <Database size={48} />
        <p>No projects found for "{activeCategory}"</p>
        <button 
          class="reset-button" 
          on:click={() => activeCategory = 'All'}
        >
          Show All Projects
        </button>
      </div>
    {/if}
  </div>
</section>

<style>
  .projects-section {
    padding: 6rem 0;
    background: hsl(var(--background));
    position: relative;
    overflow: hidden;
  }
  
  /* Grid Pattern Background */
  .grid-pattern {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(hsl(var(--border)) 1px, transparent 1px),
      linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px);
    background-size: 40px 40px;
    opacity: 0.03;
    pointer-events: none;
  }
  
  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
    position: relative;
    z-index: 1;
  }
  
  /* Section Header */
  .section-header {
    margin-bottom: 3rem;
  }
  
  .header-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
  }
  
  .header-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.375rem 0.75rem;
    background: hsl(var(--primary) / 0.1);
    border: 1px solid hsl(var(--primary) / 0.2);
    border-radius: 6px;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    font-weight: 700;
    color: hsl(var(--primary));
    letter-spacing: 0.1em;
  }
  
  .section-title {
    font-size: 3rem;
    font-weight: 800;
    color: hsl(var(--foreground));
    margin-bottom: 0.75rem;
    line-height: 1.1;
  }
  
  .title-accent {
    font-family: var(--font-mono);
    color: hsl(var(--primary));
    margin-right: 0.5rem;
  }
  
  .section-subtitle {
    font-family: var(--font-mono);
    font-size: 0.9375rem;
    color: hsl(var(--muted-foreground));
    line-height: 1.6;
  }
  
  /* Filter Bar */
  .filter-bar {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2.5rem;
    padding: 0.75rem 1rem;
    background: hsl(var(--card));
    border: 1px solid hsl(var(--border));
    border-radius: 10px;
    overflow-x: auto;
  }
  
  .filter-icon {
    display: flex;
    align-items: center;
    color: hsl(var(--muted-foreground));
    flex-shrink: 0;
  }
  
  .filter-tabs {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
  
  .filter-tab {
    padding: 0.5rem 1rem;
    background: transparent;
    border: 1px solid hsl(var(--border));
    border-radius: 6px;
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    font-weight: 600;
    color: hsl(var(--muted-foreground));
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
  }
  
  .filter-tab:hover {
    background: hsl(var(--muted) / 0.5);
    border-color: hsl(var(--primary) / 0.5);
  }
  
  .filter-tab.active {
    background: hsl(var(--primary) / 0.1);
    border-color: hsl(var(--primary));
    color: hsl(var(--primary));
  }
  
  /* Loading State */
  .loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
    gap: 1rem;
  }
  
  .spinner {
    animation: spin 1s linear infinite;
    color: hsl(var(--primary));
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  .loading-state p {
    font-family: var(--font-mono);
    font-size: 0.875rem;
    color: hsl(var(--muted-foreground));
  }
  
  /* Error State */
  .error-state {
    padding: 2rem;
    text-align: center;
    background: hsl(var(--muted) / 0.3);
    border: 1px solid hsl(var(--border));
    border-radius: 10px;
    margin-bottom: 2rem;
  }
  
  .error-state p {
    font-size: 0.875rem;
    color: hsl(var(--muted-foreground));
  }
  
  /* Empty State */
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
    gap: 1.5rem;
    color: hsl(var(--muted-foreground));
  }
  
  .empty-state p {
    font-size: 1rem;
  }
  
  /* Reset Button (Native HTML button to avoid TypeScript issues) */
  .reset-button {
    padding: 0.5rem 1.5rem;
    background: transparent;
    border: 1px solid hsl(var(--border));
    border-radius: 8px;
    font-size: 0.875rem;
    font-weight: 600;
    color: hsl(var(--foreground));
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .reset-button:hover {
    background: hsl(var(--muted));
    border-color: hsl(var(--primary));
    color: hsl(var(--primary));
  }
  
  /* Projects Grid */
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;
  }
  
  /* View More */
  .view-more {
    display: flex;
    justify-content: center;
  }
  
  /* Responsive */
  @media (max-width: 768px) {
    .projects-section {
      padding: 4rem 0;
    }
    
    .section-title {
      font-size: 2rem;
    }
    
    .header-top {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }
    
    .projects-grid {
      grid-template-columns: 1fr;
    }
    
    .filter-bar {
      overflow-x: scroll;
    }
    
    .filter-tabs {
      flex-wrap: nowrap;
    }
  }
  
  @media (max-width: 480px) {
    .container {
      padding: 0 1rem;
    }
    
    .section-title {
      font-size: 1.75rem;
    }
    
    .section-subtitle {
      font-size: 0.8125rem;
    }
  }
</style>
