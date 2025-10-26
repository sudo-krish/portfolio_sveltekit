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
  <!-- Terminal Header -->
  <div class="terminal-header">
    <div class="dots">
      <span class="dot red"></span>
      <span class="dot yellow"></span>
      <span class="dot green"></span>
    </div>
    <div class="title">
      <Terminal size={12} />
      <span>impact.log</span>
    </div>
    <div class="status">
      <span class="pulse"></span>
      LIVE
    </div>
  </div>
  
  <!-- Terminal Body -->
  <div class="terminal-body">
    <div class="prompt-line">
      <span class="prompt">$</span>
      <span class="command">./impact.sh</span>
    </div>
    
    <div class="metrics-grid">
      {#each metrics as m, i}
        <div class="metric-box {m.color}" style="--delay: {i * 80}ms" class:typing>
          <div class="metric-icon">
            <svelte:component this={m.icon} size={12} strokeWidth={2.5} />
          </div>
          <div class="metric-value">{m.value}</div>
          <div class="metric-cmd">{m.cmd}</div>
          <div class="metric-label">{m.label}</div>
        </div>
      {/each}
    </div>
    
    <div class="cursor-line">
      <span class="prompt">$</span>
      <span class="cursor">_</span>
    </div>
  </div>
  
  <!-- Share Footer -->
  <div class="share-bar">
    <span class="share-text">Screenshot & share</span>
    <span class="share-tag">#DE</span>
  </div>
</div>

<style>
  .terminal-card {
    background: hsl(var(--card));
    border: 1px solid hsl(var(--border));
    border-radius: 10px;
    width: 100%;
    max-width: 480px; /* Reduced from 580px */
    overflow: hidden;
    font-family: var(--font-mono);
    box-shadow: 0 2px 4px rgb(0 0 0 / 0.08);
  }
  
  /* Terminal Header - Compact */
  .terminal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 0.875rem; /* Reduced padding */
    background: hsl(var(--muted) / 0.5);
    border-bottom: 1px solid hsl(var(--border));
  }
  
  .dots {
    display: flex;
    gap: 0.375rem; /* Reduced gap */
  }
  
  .dot {
    width: 8px; /* Reduced from 10px */
    height: 8px;
    border-radius: 50%;
  }
  
  .dot.red { background: #ff5f57; }
  .dot.yellow { background: #ffbd2e; }
  .dot.green { background: #28ca42; }
  
  .title {
    display: flex;
    align-items: center;
    gap: 0.375rem; /* Reduced gap */
    font-size: 0.6875rem; /* Smaller font */
    color: hsl(var(--muted-foreground));
    flex: 1;
    justify-content: center;
  }
  
  .status {
    display: flex;
    align-items: center;
    gap: 0.3125rem;
    font-size: 0.5625rem; /* Smaller */
    font-weight: 700;
    color: hsl(var(--success));
    letter-spacing: 0.05em;
  }
  
  .pulse {
    width: 5px; /* Reduced */
    height: 5px;
    border-radius: 50%;
    background: hsl(var(--success));
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; box-shadow: 0 0 0 0 hsl(var(--success) / 0.7); }
    50% { opacity: 0.7; box-shadow: 0 0 0 3px hsl(var(--success) / 0); }
  }
  
  /* Terminal Body - Compact */
  .terminal-body {
    padding: 0.875rem; /* Reduced from 1rem */
    background: hsl(var(--card));
  }
  
  .prompt-line {
    display: flex;
    gap: 0.375rem;
    margin-bottom: 0.75rem; /* Reduced */
    font-size: 0.8125rem; /* Smaller */
  }
  
  .prompt {
    color: hsl(var(--primary));
    font-weight: 700;
  }
  
  .command {
    color: hsl(var(--accent));
  }
  
  /* Metrics Grid - COMPACT 4 COLUMNS */
  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem; /* Reduced from 0.75rem */
    margin-bottom: 0.75rem;
  }
  
  .metric-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.625rem 0.375rem; /* Compact padding */
    background: hsl(var(--muted) / 0.3);
    border: 1px solid hsl(var(--border));
    border-radius: 6px; /* Smaller radius */
    text-align: center;
    position: relative;
    overflow: hidden;
    opacity: 0;
    transform: scale(0.9);
    animation: popIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    animation-delay: var(--delay);
  }
  
  @keyframes popIn {
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  /* Accent Border Top - Thinner */
  .metric-box::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px; /* Reduced from 3px */
  }
  
  .metric-box.primary::before {
    background: linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)));
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
    transform: translateY(-1px);
    box-shadow: 0 2px 4px hsl(var(--primary) / 0.1);
  }
  
  /* Icon - Smaller */
  .metric-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px; /* Reduced from 32px */
    height: 24px;
    border-radius: 6px;
    margin-bottom: 0.375rem; /* Reduced */
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
  
  /* Metric Value - Compact */
  .metric-value {
    font-size: 1.375rem; /* Reduced from 1.75rem */
    font-weight: 800;
    line-height: 1;
    margin-bottom: 0.125rem;
    background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .metric-cmd {
    font-size: 0.6875rem; /* Smaller */
    font-weight: 600;
    color: hsl(var(--foreground));
    margin-bottom: 0.0625rem;
  }
  
  .metric-label {
    font-size: 0.625rem; /* Smaller */
    color: hsl(var(--muted-foreground));
  }
  
  /* Cursor Line - Compact */
  .cursor-line {
    display: flex;
    gap: 0.375rem;
    align-items: center;
    font-size: 0.8125rem;
  }
  
  .cursor {
    color: hsl(var(--primary));
    animation: blink 1s infinite;
  }
  
  @keyframes blink {
    0%, 49% { opacity: 1; }
    50%, 100% { opacity: 0; }
  }
  
  /* Share Bar - Compact */
  .share-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 0.875rem; /* Reduced */
    background: linear-gradient(
      90deg,
      hsl(var(--primary) / 0.1),
      hsl(var(--accent) / 0.1)
    );
    border-top: 1px solid hsl(var(--border));
    font-size: 0.6875rem; /* Smaller */
  }
  
  .share-text {
    color: hsl(var(--muted-foreground));
  }
  
  .share-tag {
    color: hsl(var(--accent));
    font-weight: 700;
    padding: 0.1875rem 0.4375rem;
    background: hsl(var(--accent) / 0.15);
    border-radius: 3px;
  }
  
  /* Dark Mode */
  :global(.dark) .terminal-card {
    box-shadow: 0 0 30px hsl(var(--primary) / 0.12);
  }
  
  :global(.dark) .metric-box:hover {
    box-shadow: 0 0 16px hsl(var(--primary) / 0.15);
  }
  
  :global(.dark) .metric-icon {
    box-shadow: 0 0 10px hsl(var(--primary) / 0.25);
  }
  
  :global(.dark) .metric-value {
    text-shadow: 0 0 8px hsl(var(--primary) / 0.4);
  }
  
  /* Tablet - 2x2 Grid */
  @media (max-width: 920px) {
    .metrics-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 0.5rem;
    }
  }
  
  /* Mobile - Vertical Stack */
  @media (max-width: 640px) {
    .terminal-card {
      max-width: 100%;
    }
    
    .terminal-body {
      padding: 0.75rem;
    }
    
    .metrics-grid {
      grid-template-columns: 1fr;
      gap: 0.5rem;
    }
    
    .metric-box {
      padding: 0.625rem;
    }
    
    .metric-value {
      font-size: 1.25rem;
    }
    
    .metric-icon {
      width: 22px;
      height: 22px;
    }
  }
</style>
