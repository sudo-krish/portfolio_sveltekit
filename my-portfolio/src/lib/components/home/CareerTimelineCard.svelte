<!-- src/lib/components/home/CareerTimelineCard.svelte -->
<script lang="ts">
  import { Rocket, TrendingUp, Award } from 'lucide-svelte';
  import { getAllCompanies, getPersonalInfo } from '$lib/data/portfolio-data';
  
  const companies = getAllCompanies();
  const personal = getPersonalInfo();
  
  // Career progression with compact data
  const timeline = companies.map((company, i) => ({
    company: company.name.split(' ')[0],
    level: company.position.includes('Senior') ? 'L3' : company.position.includes('Associate') ? 'L2' : 'L1',
    year: parseInt(company.duration.split(' ')[1]),
    current: company.current,
    promoted: company.roles && company.roles.length > 1
  }));
</script>

<div class="journey-card">
  <!-- Header -->
  <div class="card-header">
    <div class="header-icon">
      <Rocket size={14} />
    </div>
    <div class="header-content">
      <h3>Career Journey</h3>
      <span class="subtitle">{personal.yearsOfExperience}+ years • 3 companies</span>
    </div>
    <div class="badge">
      <TrendingUp size={9} />
      <span>↑</span>
    </div>
  </div>
  
  <!-- Timeline -->
  <div class="timeline">
    {#each timeline as stage, i}
      <div class="stage-row" class:current={stage.current}>
        <!-- Year marker -->
        <div class="year-marker">{stage.year}</div>
        
        <!-- Level badge with line connector -->
        <div class="badge-wrapper">
          <div class="level-badge {stage.current ? 'active' : ''}">
            <span class="level">{stage.level}</span>
            {#if stage.promoted}
              <Award size={7} class="promotion-star" />
            {/if}
          </div>
          {#if i < timeline.length - 1}
            <div class="progress-line"></div>
          {/if}
        </div>
        
        <!-- Company info -->
        <div class="company-info">
          <span class="company-name">{stage.company}</span>
          {#if stage.current}
            <span class="current-tag">Now</span>
          {/if}
        </div>
      </div>
    {/each}
  </div>
  
  <!-- Stats Footer -->
  <div class="stats-footer">
    <div class="stat">
      <span class="stat-value">3</span>
      <span class="stat-label">Companies</span>
    </div>
    <div class="stat-divider"></div>
    <div class="stat">
      <span class="stat-value">4</span>
      <span class="stat-label">Promotions</span>
    </div>
    <div class="stat-divider"></div>
    <div class="stat">
      <span class="stat-value">L1→L3</span>
      <span class="stat-label">Growth</span>
    </div>
  </div>
</div>

<style>
  .journey-card {
    background: hsl(var(--card));
    border: 1px solid hsl(var(--border));
    border-radius: 12px;
    width: 100%;
    max-width: 480px;
    height: 320px;
    display: flex;
    flex-direction: column;
  }
  
  .journey-card:hover {
    border-color: hsl(var(--primary));
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
    background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)));
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
    gap: 0.25rem;
    padding: 0.3125rem 0.5rem;
    background: hsl(var(--success) / 0.1);
    border: 1px solid hsl(var(--success) / 0.2);
    border-radius: 8px;
    color: hsl(var(--success));
    font-size: 0.6875rem;
    font-weight: 700;
    flex-shrink: 0;
  }
  
  /* Timeline */
  .timeline {
    padding: 0.875rem;
    display: flex;
    flex-direction: column;
    gap: 0;
    flex: 1;
    overflow-y: auto;
  }
  
  .stage-row {
    display: grid;
    grid-template-columns: 48px 52px 1fr;
    align-items: start;
    gap: 0.625rem;
    padding: 0.5rem 0;
    position: relative;
  }
  
  .stage-row:not(:last-child) {
    padding-bottom: 1rem;
  }
  
  .stage-row.current {
    background: linear-gradient(
      90deg,
      hsl(var(--primary) / 0.05),
      transparent
    );
    margin: 0 -0.875rem;
    padding-left: 0.875rem;
    padding-right: 0.875rem;
    border-radius: 6px;
  }
  
  /* Year Marker */
  .year-marker {
    font-size: 0.75rem;
    font-weight: 700;
    color: hsl(var(--muted-foreground));
    font-family: var(--font-mono);
    text-align: right;
    padding-top: 0.3125rem;
  }
  
  .stage-row.current .year-marker {
    color: hsl(var(--primary));
  }
  
  /* Badge Wrapper */
  .badge-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  /* Level Badge */
  .level-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 28px;
    width: 44px;
    background: hsl(var(--muted) / 0.5);
    border: 1.5px solid hsl(var(--border));
    border-radius: 14px;
    position: relative;
    z-index: 2;
    flex-shrink: 0;
    /* REMOVED: transition to prevent flicker */
  }
  
  .level-badge.active {
    background: hsl(var(--primary) / 0.15);
    border-color: hsl(var(--primary));
    /* REMOVED: box-shadow to prevent GPU load */
  }
  
  .level {
    font-size: 0.6875rem;
    font-weight: 800;
    color: hsl(var(--foreground));
    font-family: var(--font-mono);
    letter-spacing: -0.02em;
  }
  
  .level-badge.active .level {
    color: hsl(var(--primary));
  }
  
  :global(.promotion-star) {
    position: absolute;
    top: -3px;
    right: -3px;
    color: hsl(var(--highlight));
    background: hsl(var(--card));
    border-radius: 50%;
    padding: 1px;
    z-index: 3;
  }
  
  /* Progress Line */
  .progress-line {
    position: absolute;
    top: 28px;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: calc(100% + 0.875rem);
    background: linear-gradient(
      180deg,
      hsl(var(--border)),
      hsl(var(--border) / 0.3)
    );
    z-index: 1;
  }
  
  /* Company Info */
  .company-info {
    display: flex;
    align-items: center;
    gap: 0.4375rem;
    padding-top: 0.3125rem;
    min-width: 0;
  }
  
  .company-name {
    font-size: 0.8125rem;
    font-weight: 600;
    color: hsl(var(--foreground));
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .current-tag {
    padding: 0.1875rem 0.4375rem;
    background: hsl(var(--primary) / 0.15);
    border: 1px solid hsl(var(--primary) / 0.3);
    border-radius: 6px;
    font-size: 0.5625rem;
    font-weight: 700;
    color: hsl(var(--primary));
    text-transform: uppercase;
    letter-spacing: 0.05em;
    flex-shrink: 0;
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
  
  .stat-divider {
    width: 1px;
    height: 20px;
    background: hsl(var(--border));
  }
  
  /* Responsive */
  @media (max-width: 480px) {
    .journey-card {
      max-width: 100%;
      height: auto;
      min-height: 320px;
    }
  }
</style>
