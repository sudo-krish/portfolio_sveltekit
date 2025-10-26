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
      <FileText size={14} />
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
      >
        <div class="paper-content">
          <div class="paper-header">
            <span class="paper-number">#{i + 1}</span>
            <ExternalLink size={10} class="external-icon" />
          </div>
          <h4 class="paper-title">{paper.title}</h4>
          <div class="paper-meta">
            <span class="journal">{paper.journal}</span>
            <span class="divider">•</span>
            <span class="year">
              <Calendar size={9} />
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
      <Award size={11} class="award-icon" />
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
    border-radius: 12px;
    width: 100%;
    max-width: 680px;
    height: 100%; /* EXPANDS TO FILL PARENT HEIGHT */
    display: flex;
    flex-direction: column;
  }
  
  .research-card:hover {
    border-color: hsl(var(--accent));
  }
  
  /* Header */
  .card-header {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    padding: 0.875rem 1rem;
    background: hsl(var(--muted) / 0.3);
    border-bottom: 1px solid hsl(var(--border));
    flex-shrink: 0;
  }
  
  .header-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: linear-gradient(135deg, hsl(var(--accent)), hsl(var(--highlight)));
    border-radius: 8px;
    color: white;
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
    font-size: 0.875rem;
    font-weight: 700;
    color: hsl(var(--foreground));
    margin: 0;
    letter-spacing: -0.01em;
  }
  
  .subtitle {
    font-size: 0.625rem;
    color: hsl(var(--muted-foreground));
    font-family: var(--font-mono);
  }
  
  .badge {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    background: hsl(var(--accent) / 0.1);
    border: 1px solid hsl(var(--accent) / 0.2);
    border-radius: 8px;
    color: hsl(var(--accent));
    flex-shrink: 0;
  }
  
  /* Papers List - EXPANDS TO FILL SPACE */
  .papers-list {
    padding: 0.875rem;
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
    flex: 1; /* GROWS TO FILL AVAILABLE SPACE */
    overflow-y: auto; /* Scrollable if too many papers */
  }
  
  .paper-item {
    display: block;
    padding: 0.75rem;
    background: hsl(var(--muted) / 0.3);
    border: 1px solid hsl(var(--border));
    border-radius: 8px;
    text-decoration: none;
    position: relative;
    flex-shrink: 0; /* Don't compress papers */
  }
  
  /* Accent bar on left */
  .paper-item::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: linear-gradient(180deg, hsl(var(--accent)), hsl(var(--highlight)));
    opacity: 0;
  }
  
  .paper-item:hover {
    background: hsl(var(--muted) / 0.5);
    border-color: hsl(var(--accent) / 0.3);
  }
  
  .paper-item:hover::before {
    opacity: 1;
  }
  
  .paper-content {
    display: flex;
    flex-direction: column;
    gap: 0.4375rem;
  }
  
  .paper-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .paper-number {
    font-size: 0.625rem;
    font-weight: 700;
    color: hsl(var(--accent));
    font-family: var(--font-mono);
    padding: 0.1875rem 0.4375rem;
    background: hsl(var(--accent) / 0.1);
    border-radius: 4px;
  }
  
  :global(.external-icon) {
    color: hsl(var(--muted-foreground));
    opacity: 0;
  }
  
  .paper-item:hover :global(.external-icon) {
    opacity: 1;
    color: hsl(var(--accent));
  }
  
  .paper-title {
    font-size: 0.8125rem;
    font-weight: 600;
    color: hsl(var(--foreground));
    line-height: 1.4;
    margin: 0;
  }
  
  .paper-meta {
    display: flex;
    align-items: center;
    gap: 0.4375rem;
    font-size: 0.625rem;
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
    padding: 0.75rem 0.875rem;
    background: hsl(var(--muted) / 0.3);
    border-top: 1px solid hsl(var(--border));
    flex-shrink: 0;
  }
  
  .stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.125rem;
  }
  
  .stat-value {
    font-size: 0.875rem;
    font-weight: 800;
    color: hsl(var(--foreground));
    font-family: var(--font-mono);
    letter-spacing: -0.02em;
  }
  
  .stat-label {
    font-size: 0.5625rem;
    color: hsl(var(--muted-foreground));
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: 600;
  }
  
  :global(.award-icon) {
    color: hsl(var(--accent));
    margin-bottom: 0.0625rem;
  }
  
  .stat-divider {
    width: 1px;
    height: 20px;
    background: hsl(var(--border));
  }
  
  /* Responsive */
  @media (max-width: 680px) {
    .research-card {
      max-width: 100%;
      height: auto; /* Natural height on mobile */
    }
    
    .papers-list {
      padding: 0.75rem;
      overflow-y: visible; /* No scroll on mobile */
    }
  }
</style>
