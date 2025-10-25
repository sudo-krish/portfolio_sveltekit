<!-- src/lib/components/home/ProjectCard.svelte -->
<script lang="ts">
  import { Badge } from '$lib/components/ui/badge';
  import { Button } from '$lib/components/ui/button';
  import { ExternalLink, Github, Calendar } from 'lucide-svelte';
  
  export let project: any;
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };
</script>

<div class="project-card">
  <!-- Card Header -->
  <div class="card-header">
    <div class="header-row">
      <div class="project-icon">
        <span class="icon-text">{project.name.slice(0, 2).toUpperCase()}</span>
      </div>
      <div class="header-actions">
        {#if project.repository}
          <a href={project.repository} target="_blank" rel="noopener" class="icon-link">
            <Github size={18} />
          </a>
        {/if}
        <a href={`/projects/${project.id}`} class="icon-link">
          <ExternalLink size={18} />
        </a>
      </div>
    </div>
  </div>
  
  <!-- Card Content -->
  <div class="card-content">
    <h3 class="project-title">{project.name}</h3>
    <p class="project-description">{project.description}</p>
    
    <!-- Tech Stack -->
    <div class="tech-stack">
      {#each project.platforms.slice(0, 3) as platform}
        <Badge variant="secondary" class="tech-badge">
          {platform}
        </Badge>
      {/each}
      {#if project.platforms.length > 3}
        <Badge variant="outline" class="tech-badge">
          +{project.platforms.length - 3}
        </Badge>
      {/if}
    </div>
  </div>
  
  <!-- Card Footer -->
  <div class="card-footer">
    <div class="footer-meta">
      <Calendar size={14} />
      <span>{formatDate(project.dateCreated)}</span>
    </div>
    <Button variant="ghost" size="sm" class="view-btn">
      View Details
      <ExternalLink size={14} class="ml-1" />
    </Button>
  </div>
</div>

<style>
  .project-card {
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
    background: hsl(var(--card));
    border: 1px solid hsl(var(--border));
    border-radius: 12px;
    transition: all 0.3s ease;
    height: 100%;
  }
  
  .project-card:hover {
    border-color: hsl(var(--primary));
    transform: translateY(-4px);
    box-shadow: 0 8px 24px hsl(var(--primary) / 0.15);
  }
  
  /* Header */
  .card-header {
    margin-bottom: 1rem;
  }
  
  .header-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .project-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.7) 100%);
    border-radius: 10px;
  }
  
  .icon-text {
    font-family: var(--font-mono);
    font-size: 0.875rem;
    font-weight: 700;
    color: white;
  }
  
  .header-actions {
    display: flex;
    gap: 0.5rem;
  }
  
  .icon-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: hsl(var(--muted) / 0.5);
    border-radius: 6px;
    color: hsl(var(--muted-foreground));
    transition: all 0.2s ease;
  }
  
  .icon-link:hover {
    background: hsl(var(--primary) / 0.1);
    color: hsl(var(--primary));
  }
  
  /* Content */
  .card-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }
  
  .project-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: hsl(var(--foreground));
    margin: 0;
    line-height: 1.3;
  }
  
  .project-description {
    font-size: 0.875rem;
    color: hsl(var(--muted-foreground));
    line-height: 1.6;
    margin: 0;
  }
  
  .tech-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: auto;
  }
  
  :global(.tech-badge) {
    font-family: var(--font-mono);
    font-size: 0.6875rem;
    font-weight: 600;
  }
  
  /* Footer */
  .card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 1rem;
    border-top: 1px solid hsl(var(--border));
  }
  
  .footer-meta {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: hsl(var(--muted-foreground));
  }
  
  :global(.view-btn) {
    font-family: var(--font-mono);
    font-size: 0.8125rem;
  }
</style>
