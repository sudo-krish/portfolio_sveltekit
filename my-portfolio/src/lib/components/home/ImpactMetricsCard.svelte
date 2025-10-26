<!-- src/lib/components/home/ImpactMetricsCard.svelte -->
<script lang="ts">
  import { Terminal, TrendingUp, Zap, Target, Award } from 'lucide-svelte';
  import { onMount } from 'svelte';
  
  let typing = false;
  
  const metrics = [
    { cmd: 'latency', value: '99%', label: '3h→sec', icon: TrendingUp, color: 'accent' },
    { cmd: 'accuracy', value: '98%', label: '60→98%', icon: Target, color: 'success' },
    { cmd: 'efficiency', value: '80%', label: 'auto', icon: Zap, color: 'primary' },
    { cmd: 'insights', value: '70%', label: 'AI', icon: Award, color: 'highlight' }
  ];
  
  onMount(() => {
    typing = true;
  });
</script>

<div class="terminal-card">
  <!-- Compact Header -->
  <div class="terminal-header">
    <div class="dots">
      <span class="dot red"></span>
      <span class="dot yellow"></span>
      <span class="dot green"></span>
    </div>
    <div class="title">
      <Terminal size={10} />
      <span>impact.log</span>
    </div>
    <div class="status">
      <span class="pulse"></span>
      LIVE
    </div>
  </div>
  
  <!-- Terminal Body -->
  <div class="terminal-body">
    <!-- 4 Column Metrics Grid -->
    <div class="metrics-grid">
      {#each metrics as m}
        <div class="metric-box {m.color}">
          <div class="metric-icon">
            <svelte:component this={m.icon} size={10} strokeWidth={2.5} />
          </div>
          <div class="metric-value">{m.value}</div>
          <div class="metric-cmd">{m.cmd}</div>
          <div class="metric-label">{m.label}</div>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .terminal-card {
    background: hsl(var(--card));
    border: 1px solid hsl(var(--border));
    border-radius: 10px;
    width: 100%;
    max-width: 480px;
    height: 240px;
    overflow: hidden;
    font-family: var(--font-mono);
    display: flex;
    flex-direction: column;
  }
  
  .terminal-card:hover {
    border-color: hsl(var(--primary));
  }
  
  /* Compact Header */
  .terminal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 0.75rem;
    background: hsl(var(--muted) / 0.5);
    border-bottom: 1px solid hsl(var(--border));
    flex-shrink: 0;
  }
  
  .dots {
    display: flex;
    gap: 0.3125rem;
  }
  
  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
  }
  
  .dot.red { background: #ff5f57; }
  .dot.yellow { background: #ffbd2e; }
  .dot.green { background: #28ca42; }
  
  .title {
    display: flex;
    align-items: center;
    gap: 0.3125rem;
    font-size: 0.625rem;
    color: hsl(var(--muted-foreground));
    flex: 1;
    justify-content: center;
  }
  
  .status {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.5rem;
    font-weight: 700;
    color: hsl(var(--success));
    letter-spacing: 0.05em;
  }
  
  .pulse {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: hsl(var(--success));
    /* REMOVED: animation to prevent flicker */
  }
  
  /* Terminal Body */
  .terminal-body {
    padding: 0.75rem;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  /* 4 Column Compact Grid */
  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem;
    width: 100%;
  }
  
  .metric-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.5rem 0.25rem;
    background: hsl(var(--muted) / 0.3);
    border: 1px solid hsl(var(--border));
    border-radius: 6px;
    text-align: center;
    position: relative;
    overflow: hidden;
    /* REMOVED: all animations */
  }
  
  /* Thin top border */
  .metric-box::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
  }
  
  .metric-box.primary::before {
    background: hsl(var(--primary));
  }
  
  .metric-box.accent::before {
    background: hsl(var(--accent));
  }
  
  .metric-box.success::before {
    background: hsl(var(--success));
  }
  
  .metric-box.highlight::before {
    background: hsl(var(--highlight));
  }
  
  .metric-box:hover {
    background: hsl(var(--muted) / 0.5);
    /* REMOVED: transform and box-shadow to prevent flicker */
  }
  
  /* Compact Icon */
  .metric-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 4px;
    margin-bottom: 0.3125rem;
  }
  
  .metric-box.primary .metric-icon {
    background: hsl(var(--primary) / 0.15);
    color: hsl(var(--primary));
  }
  
  .metric-box.accent .metric-icon {
    background: hsl(var(--accent) / 0.15);
    color: hsl(var(--accent));
  }
  
  .metric-box.success .metric-icon {
    background: hsl(var(--success) / 0.15);
    color: hsl(var(--success));
  }
  
  .metric-box.highlight .metric-icon {
    background: hsl(var(--highlight) / 0.15);
    color: hsl(var(--highlight));
  }
  
  /* Compact Metric Value */
  .metric-value {
    font-size: 1.125rem;
    font-weight: 800;
    line-height: 1;
    margin-bottom: 0.125rem;
    background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .metric-cmd {
    font-size: 0.625rem;
    font-weight: 600;
    color: hsl(var(--foreground));
    margin-bottom: 0.0625rem;
  }
  
  .metric-label {
    font-size: 0.5625rem;
    color: hsl(var(--muted-foreground));
  }
  
  /* Responsive */
  @media (max-width: 480px) {
    .terminal-card {
      max-width: 100%;
      height: auto;
      min-height: 240px;
    }
    
    .metrics-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
