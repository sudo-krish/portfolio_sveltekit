<!-- src/lib/components/home/ProjectCard.svelte -->
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { Badge } from '$lib/components/ui/badge';
  import { ExternalLink, Github, Calendar, Sparkles, ArrowRight, Code2 } from 'lucide-svelte';
  
  export let project: any;
  
  let cardElement: HTMLElement;
  let titleElement: HTMLElement;
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Entrance animation
    gsap.from(cardElement, {
      opacity: 0,
      y: 40,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: cardElement,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });

    const icon = cardElement.querySelector('.project-icon') as HTMLElement;
    const viewBtn = cardElement.querySelector('.view-btn') as HTMLElement;

    cardElement.addEventListener('mouseenter', () => {
      gsap.to(icon, { scale: 1.12, duration: 0.5, ease: 'power3.out', overwrite: 'auto' });
      gsap.to(cardElement, { scale: 1.02, duration: 0.5, ease: 'power3.out', overwrite: 'auto' });
      gsap.to(viewBtn, { x: 3, duration: 0.5, ease: 'power3.out', overwrite: 'auto' });
      
      titleElement?.classList.add('title-active');
    });

    cardElement.addEventListener('mouseleave', () => {
      gsap.to(icon, { scale: 1, duration: 0.5, ease: 'power3.out', overwrite: 'auto' });
      gsap.to(cardElement, { scale: 1, duration: 0.5, ease: 'power3.out', overwrite: 'auto' });
      gsap.to(viewBtn, { x: 0, duration: 0.5, ease: 'power3.out', overwrite: 'auto' });
      
      titleElement?.classList.remove('title-active');
    });
  });

  onDestroy(() => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  });
</script>

<div class="project-card" bind:this={cardElement}>
  <div class="card-bg"></div>

  <!-- Top Section with Icon & Links -->
  <div class="card-top">
    <div class="project-icon">
      <span class="icon-text">{project.name.slice(0, 2).toUpperCase()}</span>
    </div>
    
    <div class="header-actions">
      {#if project.repository}
        <a href={project.repository} target="_blank" rel="noopener" class="icon-btn" title="GitHub">
          <Github size={16} />
        </a>
      {/if}
      <a href={project.repository} target="_blank" rel="noopener" class="icon-btn" title="Open">
        <ExternalLink size={16} />
      </a>
    </div>
  </div>

  <!-- Main Content -->
  <div class="card-main">
    <div>
      <h3 class="project-title" bind:this={titleElement}>{project.name}</h3>
      {#if project.featured}
        <div class="featured-tag">
          <Sparkles size={13} />
          Featured
        </div>
      {/if}
    </div>

    <p class="project-description">{project.description}</p>

    <!-- Stats -->
    {#if project.stars || project.forks}
      <div class="stats">
        {#if project.stars}
          <div class="stat-item">
            <span class="stat-num">{project.stars}</span>
            <span class="stat-label">Stars</span>
          </div>
        {/if}
        {#if project.forks}
          <div class="stat-item">
            <span class="stat-num">{project.forks}</span>
            <span class="stat-label">Forks</span>
          </div>
        {/if}
      </div>
    {/if}
  </div>

  <!-- Tech Stack -->
  <div class="tech-stack">
    {#each project.platforms.slice(0, 2) as platform}
      <Badge class="tech-badge">
        {platform}
      </Badge>
    {/each}
    {#if project.platforms.length > 2}
      <span class="tech-more">+{project.platforms.length - 2}</span>
    {/if}
  </div>

  <!-- Footer -->
  <div class="card-footer">
    <div class="footer-left">
      <Calendar size={13} />
      <span>{formatDate(project.dateCreated)}</span>
    </div>
    {#if project.repository}
      <a href={project.repository} target="_blank" rel="noopener" class="view-btn">
        View Project
        <ArrowRight size={13} />
      </a>
    {/if}
  </div>
</div>

<style>
  .project-card {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
    height: 100%;
    border-radius: 20px;
    overflow: hidden;
    cursor: pointer;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: hsl(var(--card) / 0.55);
    backdrop-filter: blur(25px);
    -webkit-backdrop-filter: blur(25px);
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .card-bg {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at top right, hsl(var(--primary) / 0.08) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: 0;
    pointer-events: none;
  }

  .project-card:hover {
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }

  .project-card:hover .card-bg {
    opacity: 1;
  }

  /* Top Section */
  .card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
    position: relative;
    z-index: 1;
  }

  .project-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.6) 100%);
    border-radius: 14px;
    box-shadow: 0 8px 20px hsl(var(--primary) / 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15);
    flex-shrink: 0;
    will-change: transform;
  }

  .icon-text {
    font-family: var(--font-mono);
    font-size: 0.95rem;
    font-weight: 800;
    color: white;
    letter-spacing: 0.08em;
  }

  .header-actions {
    display: flex;
    gap: 0.6rem;
    flex-shrink: 0;
  }

  .icon-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 9px;
    color: hsl(var(--muted-foreground));
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
  }

  .icon-btn:hover {
    background: hsl(var(--primary) / 0.12);
    border-color: hsl(var(--primary) / 0.3);
    color: hsl(var(--primary));
    transform: translateY(-2px);
  }

  /* Main Content */
  .card-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1rem;
    position: relative;
    z-index: 1;
  }

  .project-title {
    font-size: 1.2rem;
    font-weight: 700;
    color: hsl(var(--foreground));
    margin: 0;
    line-height: 1.3;
    transition: color 0.4s ease;
  }

  :global(.project-title.title-active) {
    color: hsl(var(--primary));
  }

  .featured-tag {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    margin-top: 0.5rem;
    padding: 0.4rem 0.8rem;
    background: hsl(var(--primary) / 0.1);
    border: 1px solid hsl(var(--primary) / 0.25);
    border-radius: 18px;
    color: hsl(var(--primary));
    font-size: 0.65rem;
    font-weight: 700;
    width: fit-content;
    backdrop-filter: blur(10px);
  }

  .project-description {
    font-size: 0.85rem;
    color: hsl(var(--muted-foreground));
    line-height: 1.6;
    margin: 0;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* Stats Section */
  .stats {
    display: flex;
    gap: 1.5rem;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    backdrop-filter: blur(10px);
  }

  .stat-item {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  .stat-num {
    font-family: var(--font-mono);
    font-size: 1rem;
    font-weight: 700;
    color: hsl(var(--primary));
  }

  .stat-label {
    font-size: 0.65rem;
    color: hsl(var(--muted-foreground));
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: 600;
  }

  /* Tech Stack */
  .tech-stack {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-bottom: 1rem;
    position: relative;
    z-index: 1;
  }

  :global(.tech-badge) {
    font-family: var(--font-mono);
    font-size: 0.6rem;
    font-weight: 600;
    padding: 0.4rem 0.75rem !important;
    background: rgba(255, 255, 255, 0.05) !important;
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
    backdrop-filter: blur(10px);
    border-radius: 7px !important;
    color: hsl(var(--muted-foreground)) !important;
  }

  .tech-more {
    font-size: 0.6rem;
    font-weight: 700;
    color: hsl(var(--muted-foreground));
    padding: 0.4rem 0.75rem;
  }

  /* Footer */
  .card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    position: relative;
    z-index: 1;
  }

  .footer-left {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: hsl(var(--muted-foreground));
  }

  .view-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 1rem;
    background: hsl(var(--primary) / 0.1);
    border: 1px solid hsl(var(--primary) / 0.3);
    border-radius: 9px;
    color: hsl(var(--primary));
    text-decoration: none;
    font-size: 0.75rem;
    font-weight: 700;
    font-family: var(--font-mono);
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    will-change: transform;
  }

  .view-btn:hover {
    background: hsl(var(--primary) / 0.2);
    border-color: hsl(var(--primary) / 0.5);
    transform: translateX(3px);
  }

  @media (max-width: 768px) {
    .project-card {
      padding: 1.25rem;
    }

    .project-icon {
      width: 52px;
      height: 52px;
    }

    .project-title {
      font-size: 1.05rem;
    }

    .stats {
      gap: 1rem;
    }

    .stat-num {
      font-size: 0.9rem;
    }
  }
</style>
