<script lang="ts">
  import { onMount } from 'svelte';
  import { 
    Github, 
    Star, 
    GitFork, 
    AlertCircle, 
    Users, 
    BookOpen,
    TrendingUp,
    ExternalLink
  } from 'lucide-svelte';
  import { getGitHubStatsCached } from '$lib/services/github';
  
  let loading = true;
  let error = false;
  let stats: any = null;
  
  onMount(async () => {
    try {
      stats = await getGitHubStatsCached();
      if (!stats) throw new Error('Failed to fetch stats');
      loading = false;
    } catch (err) {
      console.error('GitHub stats error:', err);
      error = true;
      loading = false;
    }
  });
</script>

<div class="github-card">
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
        <Github size={16} />
        <span class="title">GitHub</span>
        <div class="status-dot"></div>
      </div>
      <a href="https://github.com/sudo-krish" target="_blank" rel="noopener" class="link">
        <ExternalLink size={12} />
      </a>
    </div>
    
    <!-- Compact 2x4 Stats Grid -->
    <div class="stats-grid">
      <!-- Row 1 -->
      <div class="stat primary">
        <BookOpen size={14} class="icon" />
        <div class="data">
          <span class="value">{stats.totalRepos}</span>
          <span class="label">Repos</span>
        </div>
      </div>
      
      <div class="stat star">
        <Star size={14} class="icon" />
        <div class="data">
          <span class="value">{stats.totalStars}</span>
          <span class="label">Stars</span>
        </div>
      </div>
      
      <div class="stat">
        <GitFork size={14} class="icon" />
        <div class="data">
          <span class="value">{stats.totalForks}</span>
          <span class="label">Forks</span>
        </div>
      </div>
      
      <div class="stat">
        <Users size={14} class="icon" />
        <div class="data">
          <span class="value">{stats.user.followers}</span>
          <span class="label">Follow</span>
        </div>
      </div>
      
      <!-- Row 2 -->
      <div class="stat mini">
        <span class="value">{stats.totalWatchers}</span>
        <span class="label">Watch</span>
      </div>
      
      <div class="stat mini">
        <span class="value">{stats.totalIssues}</span>
        <span class="label">Issues</span>
      </div>
      
      <div class="stat mini">
        <span class="value">{Math.floor(stats.totalSize / 1000)}k</span>
        <span class="label">KB</span>
      </div>
      
      <div class="stat mini success">
        <TrendingUp size={12} class="icon-inline" />
        <span class="value">{stats.contributionStreak}d</span>
      </div>
    </div>
    
    <!-- Languages Footer -->
    {#if stats.topLanguages && stats.topLanguages.length > 0}
      <div class="languages">
        {#each stats.topLanguages.slice(0, 4) as lang}
          <span class="lang-tag">{lang}</span>
        {/each}
      </div>
    {/if}
  {/if}
</div>

<style>
  .github-card {
    --bg-primary: #ffffff;
    --bg-secondary: #f6f8fa;
    --bg-hover: #eaeef2;
    --border: #d0d7de;
    --text-primary: #1f2328;
    --text-secondary: #656d76;
    --accent: #0969da;
    --star: #bf8700;
    --success: #1a7f37;
    width: 100%;
    max-width: 480px;
    height: 240px;
    background: var(--bg-primary);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  :global(.dark) .github-card {
    --bg-primary: #0d1117;
    --bg-secondary: #161b22;
    --bg-hover: #1c2128;
    --border: #30363d;
    --text-primary: #e6edf3;
    --text-secondary: #7d8590;
    --accent: #58a6ff;
    --star: #d29922;
    --success: #3fb950;
  }
  
  .github-card:hover {
    border-color: var(--accent);
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
    border-top-color: var(--accent);
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
    color: var(--text-primary);
  }
  
  .title {
    font-size: 0.8125rem;
    font-weight: 600;
  }
  
  .status-dot {
    width: 6px;
    height: 6px;
    background: var(--success);
    border-radius: 50%;
    opacity: 1;
  }
  
  @media (prefers-reduced-motion: no-preference) {
    .status-dot {
      animation: pulse 2s ease-in-out infinite;
    }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
  
  .link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 6px;
    background: var(--bg-secondary);
    color: var(--text-secondary);
  }
  
  .link:hover {
    background: var(--accent);
    color: white;
  }
  
  /* Stats Grid */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem;
    flex: 1;
  }
  
  /* Stats */
  .stat {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.5rem;
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    border-radius: 6px;
  }
  
  .stat:hover {
    background: var(--bg-hover);
  }
  
  .stat :global(.icon) {
    flex-shrink: 0;
    color: var(--text-secondary);
  }
  
  .stat.primary :global(.icon) {
    color: var(--accent);
  }
  
  .stat.star :global(.icon) {
    color: var(--star);
  }
  
  .data {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
    min-width: 0;
    flex: 1;
  }
  
  .value {
    font-size: 1rem;
    font-weight: 700;
    color: var(--text-primary);
    line-height: 1;
    font-family: 'SF Mono', monospace;
  }
  
  .label {
    font-size: 0.625rem;
    color: var(--text-secondary);
    font-weight: 500;
  }
  
  /* Mini Stats */
  .stat.mini {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    padding: 0.375rem;
  }
  
  .stat.mini .value {
    font-size: 0.9375rem;
  }
  
  .stat.mini.success {
    flex-direction: row;
    gap: 0.25rem;
  }
  
  .stat.mini.success :global(.icon-inline) {
    color: var(--success);
  }
  
  /* Languages */
  .languages {
    display: flex;
    gap: 0.5rem;
    padding-top: 0.5rem;
    border-top: 1px solid var(--border);
    flex-shrink: 0;
  }
  
  .lang-tag {
    font-size: 0.625rem;
    color: var(--accent);
    font-weight: 600;
    font-family: 'SF Mono', monospace;
    padding: 0.1875rem 0.5rem;
    background: var(--bg-secondary);
    border-radius: 4px;
  }
  
  /* Responsive */
  @media (max-width: 480px) {
    .github-card {
      max-width: 100%;
      height: auto;
      min-height: 240px;
    }
    
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
