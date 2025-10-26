<script lang="ts">
  import { onMount } from 'svelte';
  import { ExternalLink, AlertCircle } from 'lucide-svelte';
  import leetcodeLogo from '$lib/assets/LeetCode_logo.png';
  import { getLeetCodeStatsCached } from '$lib/services/leetcode';
  
  let loading = true;
  let error = false;
  let stats: any = null;
  
  onMount(async () => {
    try {
      stats = await getLeetCodeStatsCached();
      if (!stats) throw new Error('Failed to fetch stats');
      loading = false;
    } catch (err) {
      console.error('LeetCode stats error:', err);
      error = true;
      loading = false;
    }
  });
</script>

<div class="leetcode-card">
  {#if loading}
    <div class="loading">
      <div class="spinner"></div>
    </div>
  {:else if error}
    <div class="error">
      <AlertCircle size={16} />
      <span>Failed to load</span>
    </div>
  {:else if stats}
    <!-- Header -->
    <div class="header">
      <div class="brand">
        <img src={leetcodeLogo} alt="LC" class="logo" />
        <span class="title">LeetCode</span>
      </div>
      <a href="https://leetcode.com/user8673j" target="_blank" rel="noopener" class="link">
        <ExternalLink size={12} />
      </a>
    </div>
    
    <!-- Main Grid -->
    <div class="content-grid">
      <!-- Big Hero Card -->
      <div class="hero-card">
        <div class="hero-content">
          <span class="hero-number">{stats.totalSolved}</span>
          <span class="hero-text">Problems<br/>Solved</span>
        </div>
      </div>
      
      <!-- Compact Tiles -->
      <div class="tiles-grid">
        <div class="tile easy">
          <div class="tile-bar"></div>
          <span class="tile-value">{stats.easySolved}</span>
          <span class="tile-label">Easy</span>
        </div>
        
        <div class="tile medium">
          <div class="tile-bar"></div>
          <span class="tile-value">{stats.mediumSolved}</span>
          <span class="tile-label">Med</span>
        </div>
        
        <div class="tile hard">
          <div class="tile-bar"></div>
          <span class="tile-value">{stats.hardSolved}</span>
          <span class="tile-label">Hard</span>
        </div>
        
        <div class="tile accent">
          <span class="tile-value">{stats.acceptanceRate}%</span>
          <span class="tile-label">Rate</span>
        </div>
        
        <div class="tile accent">
          <span class="tile-value">{Math.floor(stats.ranking / 1000)}k</span>
          <span class="tile-label">Rank</span>
        </div>
        
        <div class="tile accent">
          <span class="tile-value">{stats.contributionPoints || 0}</span>
          <span class="tile-label">Pts</span>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .leetcode-card {
    --bg-base: #ffffff;
    --bg-card: #f8f9fa;
    --border: #e0e0e0;
    --text-primary: #1a1a1a;
    --text-secondary: #6b6b6b;
    width: 100%;
    max-width: 480px;
    height: 240px;
    background: var(--bg-base);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.875rem;
  }
  
  :global(.dark) .leetcode-card {
    --bg-base: #1a1a1a;
    --bg-card: #262626;
    --border: #333333;
    --text-primary: #eff2f6;
    --text-secondary: #a0a0a0;
  }
  
  .leetcode-card:hover {
    border-color: #ffa116;
  }
  
  /* Loading & Error */
  .loading, .error {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    height: 100%;
    color: var(--text-secondary);
    font-size: 0.8125rem;
  }
  
  .spinner {
    width: 16px;
    height: 16px;
    border: 2px solid var(--border);
    border-top-color: #ffa116;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  /* Header */
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
  }
  
  .brand {
    display: flex;
    align-items: center;
    gap: 0.375rem;
  }
  
  .logo {
    width: 16px;
    height: 16px;
  }
  
  .title {
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--text-primary);
  }
  
  .link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 6px;
    background: var(--bg-card);
    color: var(--text-secondary);
    /* REMOVED: transition to prevent repaints */
  }
  
  .link:hover {
    background: #ffa116;
    color: white;
  }
  
  /* Main Grid */
  .content-grid {
    display: grid;
    grid-template-columns: 140px 1fr;
    gap: 0.75rem;
    flex: 1;
  }
  
  /* Hero Card */
  .hero-card {
    background: linear-gradient(135deg, rgba(255, 161, 22, 0.12) 0%, rgba(255, 161, 22, 0.06) 100%);
    border: 1.5px solid rgba(255, 161, 22, 0.25);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }
  
  :global(.dark) .hero-card {
    background: linear-gradient(135deg, rgba(255, 161, 22, 0.18) 0%, rgba(255, 161, 22, 0.08) 100%);
    border-color: rgba(255, 161, 22, 0.3);
  }
  
  /* REMOVED: shine animation that causes repaints */
  
  .hero-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    z-index: 1;
  }
  
  .hero-number {
    font-size: 2.75rem;
    font-weight: 900;
    color: #ffa116;
    line-height: 1;
    font-family: 'SF Mono', monospace;
    letter-spacing: -0.02em;
    /* REMOVED: text-shadow for better performance */
  }
  
  .hero-text {
    font-size: 0.6875rem;
    color: var(--text-secondary);
    margin-top: 0.5rem;
    font-weight: 600;
    line-height: 1.2;
    letter-spacing: 0.02em;
  }
  
  /* Tiles Grid */
  .tiles-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
  }
  
  .tile {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 0.5rem 0.25rem;
    position: relative;
    overflow: hidden;
    /* REMOVED: transition that can cause repaints */
  }
  
  .tile:hover {
    background: var(--bg-card);
    border-color: rgba(255, 161, 22, 0.3);
    /* REMOVED: transform and box-shadow to prevent flicker */
  }
  
  /* Top Color Bar for Difficulty */
  .tile-bar {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    border-radius: 8px 8px 0 0;
  }
  
  .tile.easy .tile-bar {
    background: linear-gradient(90deg, #00b8a3, #00d4b8);
  }
  
  .tile.medium .tile-bar {
    background: linear-gradient(90deg, #ffc01e, #ffd54f);
  }
  
  .tile.hard .tile-bar {
    background: linear-gradient(90deg, #ef4743, #ff6b6b);
  }
  
  .tile-value {
    font-size: 1.125rem;
    font-weight: 800;
    color: var(--text-primary);
    line-height: 1;
    font-family: 'SF Mono', monospace;
  }
  
  .tile.easy .tile-value {
    color: #00b8a3;
  }
  
  .tile.medium .tile-value {
    color: #ffc01e;
  }
  
  .tile.hard .tile-value {
    color: #ef4743;
  }
  
  .tile.accent .tile-value {
    color: #ffa116;
  }
  
  .tile-label {
    font-size: 0.625rem;
    color: var(--text-secondary);
    margin-top: 0.25rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }
  
  /* Responsive */
  @media (max-width: 480px) {
    .leetcode-card {
      max-width: 100%;
    }
    
    .content-grid {
      grid-template-columns: 130px 1fr;
      gap: 0.625rem;
    }
    
    .hero-number {
      font-size: 2.25rem;
    }
    
    .tile-value {
      font-size: 1rem;
    }
  }
</style>
