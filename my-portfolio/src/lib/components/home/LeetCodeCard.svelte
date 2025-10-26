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
      <AlertCircle size={18} />
      <span>Failed to load</span>
    </div>
  {:else if stats}
    <!-- Header -->
    <div class="header">
      <div class="header-left">
        <img src={leetcodeLogo} alt="LeetCode" class="logo" />
        <span class="title">LeetCode</span>
      </div>
      <a href="https://leetcode.com/user8673j" target="_blank" rel="noopener" class="link-btn">
        <ExternalLink size={14} />
      </a>
    </div>
    
    <!-- Stats Grid -->
    <div class="stats-grid">
      <!-- Total Solved -->
      <div class="stat-card primary">
        <div class="stat-content">
          <span class="stat-value">{stats.totalSolved}</span>
          <span class="stat-label">Solved</span>
        </div>
      </div>
      
      <!-- Easy -->
      <div class="stat-card">
        <div class="stat-content">
          <span class="stat-value easy-text">{stats.easySolved}</span>
          <span class="stat-label">Easy</span>
        </div>
        <div class="indicator easy"></div>
      </div>
      
      <!-- Medium -->
      <div class="stat-card">
        <div class="stat-content">
          <span class="stat-value medium-text">{stats.mediumSolved}</span>
          <span class="stat-label">Medium</span>
        </div>
        <div class="indicator medium"></div>
      </div>
      
      <!-- Hard -->
      <div class="stat-card">
        <div class="stat-content">
          <span class="stat-value hard-text">{stats.hardSolved}</span>
          <span class="stat-label">Hard</span>
        </div>
        <div class="indicator hard"></div>
      </div>
      
      <!-- Acceptance -->
      <div class="stat-card">
        <div class="stat-content">
          <span class="stat-value">{stats.acceptanceRate}%</span>
          <span class="stat-label">Acceptance</span>
        </div>
      </div>
      
      <!-- Ranking -->
      <div class="stat-card">
        <div class="stat-content">
          <span class="stat-value">{stats.ranking?.toLocaleString() || 'N/A'}</span>
          <span class="stat-label">Ranking</span>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  /* LeetCode Authentic Theme Variables */
  .leetcode-card {
    /* Light Mode (Default) */
    --bg-base: #ffffff;
    --bg-card: #fafafa;
    --bg-card-hover: #f5f5f5;
    --border: #e3e3e3;
    --text-primary: #262626;
    --text-secondary: #737373;
    --shadow: rgba(0, 0, 0, 0.04);
  }
  
  :global(.dark) .leetcode-card {
    /* Dark Mode */
    --bg-base: #1a1a1a;
    --bg-card: #262626;
    --bg-card-hover: #2d2d2d;
    --border: #3a3a3a;
    --text-primary: #eff2f6;
    --text-secondary: #a3a3a3;
    --shadow: rgba(0, 0, 0, 0.3);
  }
  
  .leetcode-card {
    background: var(--bg-base);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 1rem;
    width: 100%;
    max-width: 480px;
    transition: all 0.3s ease;
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
    min-height: 120px;
    color: var(--text-secondary);
    font-size: 0.875rem;
  }
  
  .spinner {
    width: 18px;
    height: 18px;
    border: 2px solid var(--border);
    border-top-color: #ffa116;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  /* Header */
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.875rem;
  }
  
  .header-left {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .logo {
    width: 20px;
    height: 20px;
  }
  
  .title {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-primary);
  }
  
  .link-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 6px;
    background: var(--bg-card);
    color: var(--text-secondary);
    transition: all 0.2s ease;
  }
  
  .link-btn:hover {
    background: #ffa116;
    color: #ffffff;
  }
  
  /* Stats Grid */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.625rem;
  }
  
  .stat-card {
    position: relative;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 0.75rem;
    overflow: hidden;
    transition: all 0.2s ease;
  }
  
  .stat-card:hover {
    background: var(--bg-card-hover);
  }
  
  /* Primary Card (Total Solved) */
  .stat-card.primary {
    grid-column: span 3;
    background: linear-gradient(135deg, rgba(255, 161, 22, 0.08) 0%, rgba(255, 161, 22, 0.04) 100%);
    border-color: rgba(255, 161, 22, 0.2);
  }
  
  :global(.dark) .stat-card.primary {
    background: linear-gradient(135deg, rgba(255, 161, 22, 0.15) 0%, rgba(255, 161, 22, 0.05) 100%);
    border-color: rgba(255, 161, 22, 0.25);
  }
  
  .stat-card.primary:hover {
    background: linear-gradient(135deg, rgba(255, 161, 22, 0.12) 0%, rgba(255, 161, 22, 0.06) 100%);
    border-color: rgba(255, 161, 22, 0.3);
  }
  
  .stat-card.primary .stat-value {
    font-size: 1.625rem;
    color: #ffa116;
  }
  
  /* Content */
  .stat-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
  }
  
  .stat-value {
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--text-primary);
    line-height: 1;
    font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', 'Droid Sans Mono', monospace;
  }
  
  /* Difficulty Colors */
  .stat-value.easy-text {
    color: #00b8a3;
  }
  
  .stat-value.medium-text {
    color: #ffc01e;
  }
  
  .stat-value.hard-text {
    color: #ef4743;
  }
  
  .stat-label {
    font-size: 0.6875rem;
    color: var(--text-secondary);
    font-weight: 500;
    text-align: center;
  }
  
  /* Difficulty Indicators */
  .indicator {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    border-radius: 0 0 7px 7px;
  }
  
  .indicator.easy {
    background: #00b8a3;
  }
  
  .indicator.medium {
    background: #ffc01e;
  }
  
  .indicator.hard {
    background: #ef4743;
  }
  
  /* Responsive */
  @media (max-width: 480px) {
    .leetcode-card {
      padding: 0.875rem;
      max-width: 100%;
    }
    
    .stats-grid {
      gap: 0.5rem;
    }
    
    .stat-card {
      padding: 0.625rem 0.5rem;
    }
    
    .stat-value {
      font-size: 1rem;
    }
    
    .stat-card.primary .stat-value {
      font-size: 1.375rem;
    }
  }
</style>
