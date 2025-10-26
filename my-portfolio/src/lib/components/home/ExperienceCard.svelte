<!-- src/lib/components/home/ExperienceCard.svelte -->
<script lang="ts">
  import { Briefcase, Cloud, Zap, Sparkles, Timer, Award, Rocket } from 'lucide-svelte';
  import { onMount } from 'svelte';
  
  const milestones = [
    { year: '2020', title: 'Started Journey', icon: Briefcase, color: '#3b82f6' },
    { year: '2022', title: 'Data and Cloud Expert', icon: Cloud, color: '#8b5cf6' },
    { year: '2023', title: 'Real-Time Streaming', icon: Zap, color: '#ec4899' },
    { year: '2025', title: 'Cutting Edge AI Solutions', icon: Sparkles, color: '#f59e0b' }
  ];
  
  let mounted = false;
  
  onMount(() => {
    mounted = true;
  });
</script>

<div class="experience-pipeline">
  <div class="pipeline-header">
    <div class="header-badge">
      <Briefcase size={16} />
      <span>CAREER_PIPELINE</span>
    </div>
  </div>
  
  <div class="pipeline-content">
    <!-- Data Pipeline Visualization -->
    <div class="data-flow">
      <!-- Straight Pipeline Line -->
      <div class="pipeline-track">
        <!-- Animated data packets flowing straight -->
        {#if mounted}
          <div class="data-packet packet-1"></div>
          <div class="data-packet packet-2"></div>
          <div class="data-packet packet-3"></div>
        {/if}
      </div>
      
      <!-- Milestone Nodes -->
      <div class="milestones">
        {#each milestones as milestone, index}
          <div class="milestone-node" style="animation-delay: {index * 0.15}s">
            <!-- Data node -->
            <div class="data-node" style="--node-color: {milestone.color}">
              <div class="node-ring"></div>
              <div class="node-core">
                <svelte:component this={milestone.icon} size={18} />
              </div>
              <div class="node-pulse"></div>
            </div>
            
            <!-- Node info -->
            <div class="node-info">
              <span class="node-year">{milestone.year}</span>
              <span class="node-label">{milestone.title}</span>
            </div>
          </div>
        {/each}
      </div>
    </div>
    
    <!-- Pipeline Stats -->
    <div class="pipeline-stats">
      <div class="stat-block">
        <div class="stat-icon">
          <Timer size={20} />
        </div>
        <div class="stat-data">
          <span class="stat-value">5+</span>
          <span class="stat-label">Years Exp</span>
        </div>
      </div>
      
      <div class="stat-divider">→</div>
      
      <div class="stat-block">
        <div class="stat-icon">
          <Award size={20} />
        </div>
        <div class="stat-data">
          <span class="stat-value">100%</span>
          <span class="stat-label">Quality Code</span>
        </div>
      </div>
      
      <div class="stat-divider">→</div>
      
      <div class="stat-block">
        <div class="stat-icon">
          <Rocket size={20} />
        </div>
        <div class="stat-data">
          <span class="stat-value">50+</span>
          <span class="stat-label">Live Systems</span>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .experience-pipeline {
    padding: 1.25rem 1.5rem;
    background: hsl(var(--card));
    border: 1px solid hsl(var(--border));
    border-radius: 12px;
    transition: all 0.3s ease;
    width: 100%;
    max-width: 900px;
    overflow: hidden;
  }
  
  .experience-pipeline:hover {
    border-color: hsl(var(--primary));
    transform: translateY(-2px);
    box-shadow: 0 8px 24px hsl(var(--primary) / 0.12);
  }
  
  /* Header */
  .pipeline-header {
    margin-bottom: 1.5rem;
  }
  
  .header-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.375rem 0.75rem;
    background: hsl(var(--muted) / 0.5);
    border: 1px solid hsl(var(--border));
    border-radius: 6px;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    font-weight: 600;
    color: hsl(var(--muted-foreground));
    letter-spacing: 0.05em;
  }
  
  .pipeline-content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  /* Data Flow Visualization */
  .data-flow {
    position: relative;
    padding: 1rem 0;
  }
  
  /* Straight Pipeline Track */
  .pipeline-track {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(
      90deg,
      hsl(var(--border)) 0%,
      hsl(var(--primary) / 0.3) 50%,
      hsl(var(--border)) 100%
    );
    border-radius: 2px;
    z-index: 0;
    overflow: hidden;
  }
  
  .pipeline-track::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: repeating-linear-gradient(
      90deg,
      transparent,
      transparent 8px,
      hsl(var(--primary) / 0.2) 8px,
      hsl(var(--primary) / 0.2) 12px
    );
    animation: track-flow 2s linear infinite;
  }
  
  @keyframes track-flow {
    0% { transform: translateX(0); }
    100% { transform: translateX(20px); }
  }
  
  /* Animated Data Packets */
  .data-packet {
    position: absolute;
    top: 50%;
    width: 8px;
    height: 8px;
    background: hsl(var(--primary));
    border-radius: 50%;
    box-shadow: 0 0 8px hsl(var(--primary));
    transform: translateY(-50%);
  }
  
  .packet-1 {
    animation: flow-straight 8s linear infinite;
  }
  
  .packet-2 {
    animation: flow-straight 6s linear infinite;
    animation-delay: 2s;
    opacity: 0.7;
  }
  
  .packet-3 {
    animation: flow-straight 10s linear infinite;
    animation-delay: 4s;
    opacity: 0.5;
  }
  
  @keyframes flow-straight {
    0% {
      left: -10px;
      opacity: 0;
    }
    5% {
      opacity: 1;
    }
    95% {
      opacity: 1;
    }
    100% {
      left: calc(100% + 10px);
      opacity: 0;
    }
  }
  
  /* Milestones */
  .milestones {
    display: flex;
    justify-content: space-between;
    position: relative;
    z-index: 1;
    padding: 1rem 0;
  }
  
  .milestone-node {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    animation: fade-in-up 0.6s ease-out backwards;
  }
  
  /* Data Node */
  .data-node {
    position: relative;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .node-core {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: hsl(var(--card));
    border: 2px solid var(--node-color);
    border-radius: 50%;
    color: var(--node-color);
    position: relative;
    z-index: 3;
    transition: all 0.3s ease;
  }
  
  .milestone-node:hover .node-core {
    background: var(--node-color);
    color: white;
    transform: scale(1.1);
    box-shadow: 0 0 20px var(--node-color);
  }
  
  .node-ring {
    position: absolute;
    inset: 0;
    border: 2px solid var(--node-color);
    border-radius: 50%;
    opacity: 0.3;
    animation: pulse-ring 2s ease-out infinite;
  }
  
  .node-pulse {
    position: absolute;
    inset: -4px;
    border: 2px solid var(--node-color);
    border-radius: 50%;
    opacity: 0;
    animation: pulse-wave 3s ease-out infinite;
  }
  
  @keyframes pulse-ring {
    0%, 100% { transform: scale(1); opacity: 0.3; }
    50% { transform: scale(1.1); opacity: 0.5; }
  }
  
  @keyframes pulse-wave {
    0% { transform: scale(1); opacity: 0.5; }
    100% { transform: scale(1.5); opacity: 0; }
  }
  
  /* Node Info */
  .node-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
  }
  
  .node-year {
    font-family: var(--font-mono);
    font-size: 0.875rem;
    font-weight: 700;
    color: hsl(var(--foreground));
  }
  
  .node-label {
    font-size: 0.75rem;
    color: hsl(var(--muted-foreground));
    text-align: center;
    line-height: 1.2;
    max-width: 90px;
  }
  
  /* Pipeline Stats */
  .pipeline-stats {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: hsl(var(--muted) / 0.3);
    border: 1px solid hsl(var(--border));
    border-radius: 8px;
  }
  
  .stat-block {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  
  .stat-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: hsl(var(--primary));
  }
  
  .stat-data {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
  }
  
  .stat-value {
    font-family: var(--font-mono);
    font-size: 1.25rem;
    font-weight: 700;
    color: hsl(var(--foreground));
    line-height: 1;
  }
  
  .stat-label {
    font-size: 0.75rem;
    color: hsl(var(--muted-foreground));
  }
  
  .stat-divider {
    font-family: var(--font-mono);
    font-size: 1.25rem;
    color: hsl(var(--primary));
    opacity: 0.5;
  }
  
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Tablet Responsive (768px - 1024px) */
  @media (max-width: 1024px) {
    .experience-pipeline {
      max-width: 100%;
    }
  }
  
  @media (max-width: 920px) {
    .experience-pipeline {
      padding: 1rem 1.25rem;
    }
    
    .milestones {
      gap: 0.5rem;
    }
    
    .data-node {
      width: 52px;
      height: 52px;
    }
    
    .node-core {
      width: 42px;
      height: 42px;
    }
    
    .node-label {
      font-size: 0.6875rem;
      max-width: 80px;
    }
    
    .pipeline-stats {
      gap: 0.75rem;
      padding: 0.875rem;
    }
    
    .stat-icon {
      font-size: 1.25rem;
    }
    
    .stat-value {
      font-size: 1.125rem;
    }
    
    .stat-label {
      font-size: 0.6875rem;
    }
  }
  
  /* Mobile Responsive */
  @media (max-width: 640px) {
    .experience-pipeline {
      padding: 1rem;
    }
    
    .milestones {
      flex-wrap: wrap;
      gap: 1.5rem;
      justify-content: center;
    }
    
    .milestone-node {
      flex-basis: calc(50% - 0.75rem);
      max-width: 150px;
    }
    
    .pipeline-track {
      display: none;
    }
    
    .data-node {
      width: 56px;
      height: 56px;
    }
    
    .node-core {
      width: 44px;
      height: 44px;
    }
    
    .pipeline-stats {
      flex-direction: column;
      gap: 0.75rem;
    }
    
    .stat-divider {
      transform: rotate(90deg);
    }
  }
</style>
