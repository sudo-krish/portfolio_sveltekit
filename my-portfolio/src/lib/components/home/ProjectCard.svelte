<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { Badge } from '$lib/components/ui/badge';
  import { Github, Calendar, Sparkles, Star, GitFork, Code2 } from 'lucide-svelte';
  
  export let project: any;
  let cardElement: HTMLElement;
  let titleElement: HTMLElement;
  let codeButtonRef: HTMLButtonElement;
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short',
      day: 'numeric'
    });
  };

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);

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
    
    cardElement.addEventListener('mouseenter', () => {
      gsap.to(icon, { scale: 1.1, rotate: 5, duration: 0.5, ease: 'power3.out', overwrite: 'auto' });
      gsap.to(cardElement, { scale: 1.02, duration: 0.5, ease: 'power3.out', overwrite: 'auto' });
      gsap.to(codeButtonRef, { scale: 1.15, rotate: -15, duration: 0.6, ease: 'power2.out', overwrite: 'auto' });
      titleElement?.classList.add('title-active');
    });

    cardElement.addEventListener('mouseleave', () => {
      gsap.to(icon, { scale: 1, rotate: 0, duration: 0.5, ease: 'power3.out', overwrite: 'auto' });
      gsap.to(cardElement, { scale: 1, duration: 0.5, ease: 'power3.out', overwrite: 'auto' });
      gsap.to(codeButtonRef, { scale: 1, rotate: 0, duration: 0.6, ease: 'power2.out', overwrite: 'auto' });
      titleElement?.classList.remove('title-active');
    });
  });

  onDestroy(() => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  });

  const handleCodeClick = (e: Event) => {
    e.stopPropagation();
    if (project.repository) {
      window.open(project.repository, '_blank');
    }
  };
</script>

<svg style="visibility: hidden; position: absolute" width="0" height="0">
  <defs>
    <filter id="round-project">
      <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
      <feComposite in="SourceGraphic" in2="goo" operator="atop" />
    </filter>
    
    <filter id="glow-button">
      <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
      <feComponentTransfer>
        <feFuncA type="linear" slope="0.8"/>
      </feComponentTransfer>
    </filter>
  </defs>
</svg>

<div class="relative">
  <!-- Code Button - Unique Coder Theme -->
  <button
    on:click={handleCodeClick}
    class="code-button"
    title="View Repository"
    bind:this={codeButtonRef}
  >
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <!-- Left bracket < -->
      <path d="M9 7l-5 5 5 5" class="bracket-left" />
      <!-- Right bracket > -->
      <path d="M15 7l5 5-5 5" class="bracket-right" />
      <!-- Vertical line | -->
      <line x1="12" y1="7" x2="12" y2="17" class="code-line" stroke-dasharray="5,3" />
    </svg>
  </button>

  <!-- Filtered wrapper -->
  <div style="filter: url(#round-project); width: 100%;">
    <div
      class="project-card"
      bind:this={cardElement}
    >
      <!-- Shimmer Effect -->
      <div class="shimmer"></div>

      <!-- Card Content -->
      <div class="card-content">
        <!-- Icon & Header -->
        <div class="header-section">
          <div class="project-icon">
            <span class="icon-text">{project.name.slice(0, 2).toUpperCase()}</span>
          </div>

          <div class="header-info">
            <h3 class="project-title" bind:this={titleElement}>{project.name}</h3>
            {#if project.featured}
              <div class="featured-badge">
                <Sparkles size={11} />
                Featured
              </div>
            {/if}
          </div>
        </div>

        <!-- Description -->
        <p class="project-description">{project.description}</p>

        <!-- Stats Section -->
        {#if project.stars || project.forks}
          <div class="stats-section">
            <div class="stats-header">
              <Code2 size={13} />
              <span>Repository Stats</span>
            </div>
            
            <div class="stats-grid">
              {#if project.stars}
                <div class="stat-row">
                  <Star size={12} />
                  <div class="stat-content">
                    <span class="stat-value">{project.stars}</span>
                    <span class="stat-label">Stars</span>
                  </div>
                </div>
              {/if}
              
              {#if project.forks}
                <div class="stat-row">
                  <GitFork size={12} />
                  <div class="stat-content">
                    <span class="stat-value">{project.forks}</span>
                    <span class="stat-label">Forks</span>
                  </div>
                </div>
              {/if}
            </div>
          </div>
        {/if}

        <!-- Tech Stack -->
        <div class="tech-stack">
          {#each project.platforms.slice(0, 3) as platform}
            <Badge class="tech-badge">
              {platform}
            </Badge>
          {/each}
          {#if project.platforms.length > 3}
            <span class="tech-more">+{project.platforms.length - 3}</span>
          {/if}
        </div>

        <!-- Date Info -->
        <div class="date-info">
          <Calendar size={12} />
          <span>{formatDate(project.dateCreated)}</span>
        </div>

        <!-- Action Buttons -->
        <div class="action-buttons">
          {#if project.repository}
            <a 
              href={project.repository} 
              target="_blank" 
              rel="noopener" 
              class="btn-primary"
            >
              <Github size={14} />
              View
            </a>
          {/if}
          
          <a 
            href={project.repository} 
            target="_blank" 
            rel="noopener" 
            class="btn-secondary"
          >
            <span class="code-icon">{'<>'}</span>
            Clone
          </a>
        </div>
      </div>

      <!-- Border Overlay -->
      <div class="border-overlay"></div>
    </div>
  </div>
</div>

<style>
  .relative {
    position: relative;
  }

  /* Code Button - Unique Coder Theme */
  .code-button {
    position: absolute;
    z-index: 20;
    width: 46px;
    height: 46px;
    border-radius: 50%;
    top: -14px;
    right: 2px;
    background: linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%);
    border: 2px solid rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 
      0 8px 24px hsl(var(--primary) / 0.35),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    will-change: transform;
    color: white;
    /* filter: drop-shadow(0 4px 8px hsl(var(--primary) / 0.2)); */
  }

  .code-button:hover {
    box-shadow: 
      0 12px 32px hsl(var(--primary) / 0.45),
      inset 0 1px 0 rgba(255, 255, 255, 0.4);
    filter: drop-shadow(0 6px 12px hsl(var(--primary) / 0.3));
  }

  .code-button:active {
    transform: scale(0.94);
  }

  .code-button svg {
    width: 20px;
    height: 20px;
    stroke-width: 2.5;
  }

  .bracket-left {
    animation: bracketPulse 2s ease-in-out infinite;
    animation-delay: 0s;
  }

  .bracket-right {
    animation: bracketPulse 2s ease-in-out infinite;
    animation-delay: 0.3s;
  }

  .code-line {
    animation: lineBlink 1.5s ease-in-out infinite;
    opacity: 0.8;
  }

  @keyframes bracketPulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.6; }
  }

  @keyframes lineBlink {
    0%, 100% { stroke-opacity: 0.8; stroke-dashoffset: 0; }
    50% { stroke-opacity: 0.3; stroke-dashoffset: 8; }
  }

  /* Card */
  .project-card {
    position: relative;
    overflow: hidden;
    background: hsl(var(--card));
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    padding: 1.25rem;
    padding-top: 2.5rem;
    border-radius: 12px;
    clip-path: polygon(0 0, 86% 0, calc(84% + 20px) 36px, 100% 36px, 100% 100%, 0 100%);
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    cursor: pointer;
    border: 1px solid rgba(255, 255, 255, 0.15);
    will-change: transform;
  }

  .project-card:hover {
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    border-color: rgba(255, 255, 255, 0.2);
  }

  /* Border Overlay */
  .border-overlay {
    position: absolute;
    inset: 0;
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    clip-path: polygon(0 0, 86% 0, calc(84% + 20px) 36px, 100% 36px, 100% 100%, 0 100%);
    pointer-events: none;
    z-index: 1;
  }

  /* Shimmer */
  .shimmer {
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    z-index: 1;
  }

  .project-card:hover .shimmer {
    animation: shimmer 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }

  @keyframes shimmer {
    0% { left: -100%; }
    100% { left: 100%; }
  }

  /* Card Content */
  .card-content {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  /* Header */
  .header-section {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .project-icon {
    width: 56px;
    height: 56px;
    border-radius: 10px;
    background: linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.7) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    box-shadow: 0 6px 16px hsl(var(--primary) / 0.3);
    will-change: transform;
  }

  .icon-text {
    font-family: var(--font-mono);
    font-size: 0.9rem;
    font-weight: 800;
    color: white;
    letter-spacing: 0.1em;
  }

  .header-info {
    flex: 1;
  }

  .project-title {
    font-size: 1.05rem;
    font-weight: 750;
    color: hsl(var(--foreground));
    margin: 0 0 0.2rem 0;
    line-height: 1.3;
    transition: color 0.4s ease;
  }

  :global(.project-title.title-active) {
    color: hsl(var(--primary));
  }

  .featured-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.3rem 0.65rem;
    background: hsl(var(--primary) / 0.12);
    border: 1px solid hsl(var(--primary) / 0.25);
    border-radius: 14px;
    color: hsl(var(--primary));
    font-size: 0.55rem;
    font-weight: 700;
    width: fit-content;
  }

  /* Description */
  .project-description {
    font-size: 0.8rem;
    color: hsl(var(--muted-foreground));
    line-height: 1.5;
    margin: 0;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* Stats */
  .stats-section {
    padding: 0.8rem;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-left: 3px solid hsl(var(--primary) / 0.5);
    border-radius: 9px;
    backdrop-filter: blur(10px);
  }

  .stats-header {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.6rem;
    color: hsl(var(--muted-foreground));
    margin-bottom: 0.6rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: 700;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.8rem;
  }

  .stat-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    background: hsl(var(--primary) / 0.08);
    border: 1px solid hsl(var(--primary) / 0.15);
    border-radius: 7px;
    color: hsl(var(--primary));
  }

  .stat-content {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
  }

  .stat-value {
    font-family: var(--font-mono);
    font-size: 0.85rem;
    font-weight: 700;
    color: hsl(var(--foreground));
  }

  .stat-label {
    font-size: 0.55rem;
    color: hsl(var(--muted-foreground));
    text-transform: uppercase;
    letter-spacing: 0.04em;
    font-weight: 600;
  }

  /* Tech Stack */
  .tech-stack {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    flex-wrap: wrap;
  }

  :global(.tech-badge) {
    font-family: var(--font-mono);
    font-size: 0.55rem;
    font-weight: 600;
    padding: 0.3rem 0.6rem !important;
    background: rgba(255, 255, 255, 0.05) !important;
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
    border-radius: 6px !important;
    color: hsl(var(--muted-foreground)) !important;
  }

  .tech-more {
    font-size: 0.55rem;
    font-weight: 700;
    color: hsl(var(--muted-foreground));
    padding: 0.3rem 0.6rem;
  }

  /* Date */
  .date-info {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.5rem 0.65rem;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 7px;
    font-size: 0.65rem;
    color: hsl(var(--muted-foreground));
  }

  /* Buttons */
  .action-buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
    padding-top: 0.75rem;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    padding: 0.6rem 0.8rem;
    background: hsl(var(--primary));
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 0.7rem;
    font-weight: 700;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: var(--font-mono);
  }

  .btn-primary:hover {
    background: hsl(var(--primary) / 0.85);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px hsl(var(--primary) / 0.4);
  }

  .btn-secondary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    padding: 0.6rem 0.8rem;
    background: rgba(255, 255, 255, 0.08);
    color: hsl(var(--muted-foreground));
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 8px;
    font-size: 0.7rem;
    font-weight: 700;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: var(--font-mono);
  }

  .btn-secondary:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.25);
    color: hsl(var(--foreground));
    transform: translateY(-1px);
  }

  .code-icon {
    font-family: var(--font-mono);
    font-weight: 900;
    font-size: 0.75rem;
    letter-spacing: -0.05em;
  }

  @media (max-width: 768px) {
    .project-card {
      padding: 1rem;
      padding-top: 2.25rem;
    }

    .project-icon {
      width: 48px;
      height: 48px;
    }

    .project-title {
      font-size: 0.95rem;
    }

    .stats-grid {
      grid-template-columns: 1fr;
    }

    .code-button {
      width: 44px;
      height: 44px;
      top: -10px;
    }

    .code-button svg {
      width: 18px;
      height: 18px;
    }
  }
</style>
