<!-- src/lib/components/home/ResearchCard.svelte -->
<script lang="ts">
  import { FileText, Award, ExternalLink, Calendar } from 'lucide-svelte';
  import { getResearchPapers } from '$lib/data/portfolio-data';
  
  const papers = getResearchPapers();
</script>

<div class="research-card">
  <!-- Header -->
  <div class="card-header">
    <div class="header-icon">
      <FileText size={16} />
    </div>
    <div class="header-content">
      <h3>Research Publications</h3>
      <span class="subtitle">{papers.length} peer-reviewed papers</span>
    </div>
    <div class="badge">
      <Award size={10} />
    </div>
  </div>
  
  <!-- Papers List -->
  <div class="papers-list">
    {#each papers as paper, i}
      <a 
        href={paper.url} 
        target="_blank" 
        rel="noopener noreferrer"
        class="paper-item"
        style="--delay: {i * 100}ms"
      >
        <div class="paper-content">
          <div class="paper-header">
            <span class="paper-number">#{i + 1}</span>
            <ExternalLink size={12} class="external-icon" />
          </div>
          <h4 class="paper-title">{paper.title}</h4>
          <div class="paper-meta">
            <span class="journal">{paper.journal}</span>
            <span class="divider">•</span>
            <span class="year">
              <Calendar size={10} />
              {new Date(paper.datePublished).getFullYear()}
            </span>
          </div>
        </div>
      </a>
    {/each}
  </div>
  
  <!-- Stats Footer -->
  <div class="stats-footer">
    <div class="stat">
      <span class="stat-value">{papers.length}</span>
      <span class="stat-label">Papers</span>
    </div>
    <div class="stat-divider"></div>
    <div class="stat">
      <Award size={12} class="award-icon" />
      <span class="stat-label">Peer Reviewed</span>
    </div>
    <div class="stat-divider"></div>
    <div class="stat">
      <span class="stat-value">IOP</span>
      <span class="stat-label">Journal</span>
    </div>
  </div>
</div>

<style>
  .research-card {
    background: hsl(var(--card));
    border: 1px solid hsl(var(--border));
    border-radius: 16px;
    width: 100%;
    max-width: 600px;
    overflow: hidden;
    backdrop-filter: blur(20px);
    box-shadow: 0 2px 8px rgb(0 0 0 / 0.04);
  }
  
  /* iOS-style Header */
  .card-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    background: linear-gradient(
      135deg,
      hsl(var(--muted) / 0.3),
      hsl(var(--muted) / 0.1)
    );
    border-bottom: 1px solid hsl(var(--border));
  }
  
  .header-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    background: linear-gradient(135deg, hsl(var(--accent)), hsl(var(--highlight)));
    border-radius: 10px;
    color: white;
    box-shadow: 0 2px 8px hsl(var(--accent) / 0.3);
    flex-shrink: 0;
  }
  
  .header-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
    min-width: 0;
  }
  
  h3 {
    font-size: 0.9375rem;
    font-weight: 700;
    color: hsl(var(--foreground));
    margin: 0;
    letter-spacing: -0.01em;
  }
  
  .subtitle {
    font-size: 0.6875rem;
    color: hsl(var(--muted-foreground));
    font-family: var(--font-mono);
  }
  
  .badge {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: hsl(var(--accent) / 0.1);
    border: 1px solid hsl(var(--accent) / 0.2);
    border-radius: 10px;
    color: hsl(var(--accent));
    flex-shrink: 0;
  }
  
  /* Papers List */
  .papers-list {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .paper-item {
    display: block;
    padding: 1rem;
    background: hsl(var(--muted) / 0.3);
    border: 1px solid hsl(var(--border));
    border-radius: 12px;
    text-decoration: none;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 0;
    transform: translateY(10px);
    animation: slideUp 0.4s ease-out forwards;
    animation-delay: var(--delay);
    position: relative;
    overflow: hidden;
  }
  
  @keyframes slideUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .paper-item::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: linear-gradient(180deg, hsl(var(--accent)), hsl(var(--highlight)));
    transform: scaleY(0);
    transition: transform 0.2s ease;
  }
  
  .paper-item:hover {
    background: hsl(var(--muted) / 0.5);
    border-color: hsl(var(--accent) / 0.3);
    transform: translateX(4px);
  }
  
  .paper-item:hover::before {
    transform: scaleY(1);
  }
  
  .paper-content {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .paper-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .paper-number {
    font-size: 0.6875rem;
    font-weight: 700;
    color: hsl(var(--accent));
    font-family: var(--font-mono);
    padding: 0.1875rem 0.5rem;
    background: hsl(var(--accent) / 0.1);
    border-radius: 6px;
  }
  
  :global(.external-icon) {
    color: hsl(var(--muted-foreground));
    opacity: 0;
    transition: opacity 0.2s ease;
  }
  
  .paper-item:hover :global(.external-icon) {
    opacity: 1;
    color: hsl(var(--accent));
  }
  
  .paper-title {
    font-size: 0.875rem;
    font-weight: 600;
    color: hsl(var(--foreground));
    line-height: 1.4;
    margin: 0;
    display: -webkit-box;
    /* -webkit-line-clamp: 2; */
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .paper-meta {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.6875rem;
    color: hsl(var(--muted-foreground));
  }
  
  .journal {
    font-weight: 600;
    color: hsl(var(--accent));
  }
  
  .divider {
    color: hsl(var(--border));
  }
  
  .year {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-family: var(--font-mono);
  }
  
  /* Stats Footer */
  .stats-footer {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0.875rem 1rem;
    background: hsl(var(--muted) / 0.3);
    border-top: 1px solid hsl(var(--border));
  }
  
  .stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.125rem;
  }
  
  .stat-value {
    font-size: 0.9375rem;
    font-weight: 800;
    color: hsl(var(--foreground));
    font-family: var(--font-mono);
    letter-spacing: -0.02em;
  }
  
  .stat-label {
    font-size: 0.625rem;
    color: hsl(var(--muted-foreground));
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: 600;
  }
  
  :global(.award-icon) {
    color: hsl(var(--accent));
    margin-bottom: 0.125rem;
  }
  
  .stat-divider {
    width: 1px;
    height: 24px;
    background: hsl(var(--border));
  }
  
  /* Dark Mode Enhancements */
  :global(.dark) .research-card {
    box-shadow: 0 0 40px hsl(var(--accent) / 0.1);
  }
  
  :global(.dark) .header-icon {
    box-shadow: 0 4px 12px hsl(var(--accent) / 0.4);
  }
  
  :global(.dark) .paper-item:hover {
    box-shadow: 0 0 20px hsl(var(--accent) / 0.15);
  }
  
  /* Responsive */
  @media (max-width: 640px) {
    .research-card {
      max-width: 100%;
    }
    
    .card-header {
      padding: 0.875rem;
    }
    
    .papers-list {
      padding: 0.875rem;
      gap: 0.625rem;
    }
    
    .paper-item {
      padding: 0.875rem;
    }
    
    .paper-title {
      font-size: 0.8125rem;
    }
    
    .paper-meta {
      flex-wrap: wrap;
    }
  }
</style>
