<!-- src/lib/components/home/ExperienceCard.svelte -->
<script lang="ts">
  import { Briefcase, Cloud, Zap, Sparkles, Timer, Award, Rocket, TrendingUp } from 'lucide-svelte';
  import { onMount } from 'svelte';
  
  const milestones = [
    { year: '2020', title: 'Started Journey', icon: Briefcase, color: '#3b82f6' },
    { year: '2022', title: 'Data & Cloud Expert', icon: Cloud, color: '#8b5cf6' },
    { year: '2023', title: 'Real-Time Streaming', icon: Zap, color: '#ec4899' },
    { year: '2025', title: 'AI Solutions', icon: Sparkles, color: '#f59e0b' }
  ];
  
  let mounted = false;
  
  onMount(() => {
    mounted = true;
  });
</script>

<div class="experience-card">
  <!-- Header -->
  <div class="card-header">
    <div class="header-badge">
      <Briefcase size={14} />
      <span>CAREER_PIPELINE</span>
    </div>
    <div class="trending-badge">
      <TrendingUp size={12} />
      <span>5+ Years</span>
    </div>
  </div>
  
  <!-- Vertical Timeline -->
  <div class="timeline-container">
    <!-- Vertical Pipeline Line -->
    <div class="pipeline-line">
      {#if mounted}
        <div class="data-flow packet-1"></div>
        <div class="data-flow packet-2"></div>
        <div class="data-flow packet-3"></div>
      {/if}
    </div>
    
    <!-- Milestones (Centered) -->
    <div class="milestones">
      {#each milestones as milestone, i}
        <div class="milestone" style="--delay: {i * 0.1}s; --color: {milestone.color}">
          <div class="milestone-node">
            <div class="node-ring"></div>
            <div class="node-core">
              <svelte:component this={milestone.icon} size={16} />
            </div>
          </div>
          
          <div class="milestone-content">
            <span class="milestone-year">{milestone.year}</span>
            <span class="milestone-title">{milestone.title}</span>
          </div>
        </div>
      {/each}
    </div>
  </div>
  
  <!-- Stats Footer -->
  <div class="stats-footer">
    <div class="stat">
      <Timer size={16} />
      <div class="stat-info">
        <span class="stat-value">5+</span>
        <span class="stat-label">Years</span>
      </div>
    </div>
    
    <div class="stat-divider"></div>
    
    <div class="stat">
      <Award size={16} />
      <div class="stat-info">
        <span class="stat-value">100%</span>
        <span class="stat-label">Quality</span>
      </div>
    </div>
    
    <div class="stat-divider"></div>
    
    <div class="stat">
      <Rocket size={16} />
      <div class="stat-info">
        <span class="stat-value">50+</span>
        <span class="stat-label">Systems</span>
      </div>
    </div>
  </div>
</div>

<style>
  .experience-card {
    width: 100%;
    max-width: 680px;
    min-height: 480px;
    background: hsl(var(--card));
    border: 1px solid hsl(var(--border));
    border-radius: 12px;
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }
  
  .experience-card:hover {
    border-color: hsl(var(--primary));
  }
  
  /* Header */
  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
  }
  
  .header-badge {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.375rem 0.75rem;
    background: hsl(var(--muted) / 0.5);
    border: 1px solid hsl(var(--border));
    border-radius: 6px;
    font-family: var(--font-mono);
    font-size: 0.6875rem;
    font-weight: 600;
    color: hsl(var(--muted-foreground));
    letter-spacing: 0.05em;
  }
  
  .trending-badge {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.3125rem 0.625rem;
    background: hsl(var(--primary) / 0.1);
    border: 1px solid hsl(var(--primary) / 0.2);
    border-radius: 6px;
    font-family: var(--font-mono);
    font-size: 0.6875rem;
    font-weight: 600;
    color: hsl(var(--primary));
  }
  
  /* Timeline Container - CENTERED */
  .timeline-container {
    position: relative;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  /* Vertical Pipeline Line */
  .pipeline-line {
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 3px;
    background: linear-gradient(
      180deg,
      hsl(var(--primary) / 0.3) 0%,
      hsl(var(--primary) / 0.6) 50%,
      hsl(var(--primary) / 0.3) 100%
    );
    border-radius: 2px;
    transform: translateX(-50%);
  }
  
  /* REMOVED: animated background pattern to prevent flicker */
  
  /* Animated Data Packets - OPTIMIZED */
  .data-flow {
    position: absolute;
    left: 50%;
    width: 6px;
    height: 6px;
    background: hsl(var(--primary));
    border-radius: 50%;
    transform: translateX(-50%);
    /* REMOVED: box-shadow to reduce GPU load */
  }
  
  @media (prefers-reduced-motion: no-preference) {
    .packet-1 {
      animation: flow-vertical 5s linear infinite;
    }
    
    .packet-2 {
      animation: flow-vertical 7s linear infinite 2s;
      opacity: 0.7;
    }
    
    .packet-3 {
      animation: flow-vertical 6s linear infinite 4s;
      opacity: 0.5;
    }
  }
  
  @keyframes flow-vertical {
    0% {
      top: -10px;
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      top: calc(100% + 10px);
      opacity: 0;
    }
  }
  
  /* Milestones - CENTERED */
  .milestones {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    z-index: 1;
    width: 100%;
    max-width: 480px;
  }
  
  .milestone {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    opacity: 0;
    animation: fade-in 0.4s ease-out forwards;
    animation-delay: var(--delay);
  }
  
  /* SIMPLIFIED: fade-in only (no transform to prevent flicker) */
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  /* Milestone Node */
  .milestone-node {
    position: relative;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  
  .node-core {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: hsl(var(--card));
    border: 2px solid var(--color);
    border-radius: 50%;
    color: var(--color);
    z-index: 2;
    position: relative;
    /* REMOVED: transition to prevent repaints */
  }
  
  .milestone:hover .node-core {
    background: var(--color);
    color: white;
    /* REMOVED: transform to prevent flicker */
  }
  
  .node-ring {
    position: absolute;
    inset: 0;
    border: 2px solid var(--color);
    border-radius: 50%;
    opacity: 0.3;
  }
  
  /* SIMPLIFIED: pulse only changes opacity (GPU friendly) */
  @media (prefers-reduced-motion: no-preference) {
    .node-ring {
      animation: pulse-ring 2.5s ease-in-out infinite;
    }
  }
  
  @keyframes pulse-ring {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.6; }
  }
  
  /* Milestone Content */
  .milestone-content {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    flex: 1;
  }
  
  .milestone-year {
    font-family: var(--font-mono);
    font-size: 0.875rem;
    font-weight: 700;
    color: hsl(var(--foreground));
  }
  
  .milestone-title {
    font-size: 0.8125rem;
    color: hsl(var(--muted-foreground));
    line-height: 1.3;
  }
  
  /* Stats Footer */
  .stats-footer {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0.875rem;
    background: hsl(var(--muted) / 0.3);
    border: 1px solid hsl(var(--border));
    border-radius: 8px;
    flex-shrink: 0;
  }
  
  .stat {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    color: hsl(var(--primary));
  }
  
  .stat-info {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
  }
  
  .stat-value {
    font-family: var(--font-mono);
    font-size: 1.125rem;
    font-weight: 700;
    color: hsl(var(--foreground));
    line-height: 1;
  }
  
  .stat-label {
    font-size: 0.625rem;
    color: hsl(var(--muted-foreground));
    font-weight: 500;
  }
  
  .stat-divider {
    width: 1px;
    height: 32px;
    background: hsl(var(--border));
  }
  
  /* Responsive */
  @media (max-width: 680px) {
    .experience-card {
      max-width: 100%;
    }
    
    .milestones {
      max-width: 100%;
    }
  }
</style>
