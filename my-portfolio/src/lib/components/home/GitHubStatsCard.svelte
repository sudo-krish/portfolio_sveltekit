<script lang="ts">
  import { onMount } from 'svelte';
  import { 
    Github, 
    Star, 
    GitFork, 
    AlertCircle, 
    Users, 
    BookOpen,
    Code2,
    TrendingUp,
    Eye,
    AlertTriangle
  } from 'lucide-svelte';
  import { getGitHubStatsCached } from '$lib/services/github';
  
  let loading = true;
  let error = false;
  let stats: any = null;
  
  function formatNumber(num: number): string {
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
  }
  
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

<div class="github-widget">
  {#if loading}
    <div class="loading-state">
      <div class="spinner"></div>
      <span>Loading GitHub stats...</span>
    </div>
  {:else if error}
    <div class="error-state">
      <AlertCircle size={18} />
      <span>Failed to load GitHub stats</span>
    </div>
  {:else if stats}
    <!-- Header Section -->
    <div class="header-section">
      <div class="header-left">
        <Github size={24} class="github-logo" />
        <div class="header-info">
          <h3 class="header-title">GitHub Activity</h3>
          <div class="status-badge">
            <div class="status-dot"></div>
            <span>Active Developer</span>
          </div>
        </div>
      </div>
      
      <a 
        href="https://github.com/sudo-krish" 
        target="_blank" 
        rel="noopener noreferrer"
        class="profile-button"
      >
        View Profile
        <svg width="10" height="10" viewBox="0 0 12 12" fill="currentColor">
          <path d="M3.5 3C3.22386 3 3 3.22386 3 3.5C3 3.77614 3.22386 4 3.5 4H7.29289L3.14645 8.14645C2.95118 8.34171 2.95118 8.65829 3.14645 8.85355C3.34171 9.04882 3.65829 9.04882 3.85355 8.85355L8 4.70711V8.5C8 8.77614 8.22386 9 8.5 9C8.77614 9 9 8.77614 9 8.5V3.5C9 3.22386 8.77614 3 8.5 3H3.5Z"/>
        </svg>
      </a>
    </div>
    
    <!-- Stats Grid -->
    <div class="stats-grid">
      <!-- Primary Stats -->
      <div class="stat-item primary">
        <BookOpen size={16} class="stat-icon primary-icon" />
        <div class="stat-data">
          <span class="stat-value">{stats.totalRepos}</span>
          <span class="stat-label">Repos</span>
        </div>
      </div>
      
      <div class="stat-item primary">
        <Star size={16} class="stat-icon star-icon" />
        <div class="stat-data">
          <span class="stat-value">{stats.totalStars}</span>
          <span class="stat-label">Stars</span>
        </div>
      </div>
      
      <div class="stat-item primary">
        <GitFork size={16} class="stat-icon fork-icon" />
        <div class="stat-data">
          <span class="stat-value">{stats.totalForks}</span>
          <span class="stat-label">Forks</span>
        </div>
      </div>
      
      <div class="stat-item primary">
        <Users size={16} class="stat-icon primary-icon" />
        <div class="stat-data">
          <span class="stat-value">{stats.user.followers}</span>
          <span class="stat-label">Followers</span>
        </div>
      </div>
      
      <!-- Secondary Stats -->
      <div class="stat-item secondary">
        <Eye size={14} class="stat-icon secondary-icon" />
        <div class="stat-data">
          <span class="stat-value small">{stats.totalWatchers}</span>
          <span class="stat-label">Watchers</span>
        </div>
      </div>
      
      <div class="stat-item secondary">
        <AlertTriangle size={14} class="stat-icon secondary-icon" />
        <div class="stat-data">
          <span class="stat-value small">{stats.totalIssues}</span>
          <span class="stat-label">Issues</span>
        </div>
      </div>
      
      <div class="stat-item secondary">
        <Code2 size={14} class="stat-icon secondary-icon" />
        <div class="stat-data">
          <span class="stat-value small">{formatNumber(stats.totalSize)}</span>
          <span class="stat-label">KB</span>
        </div>
      </div>
      
      <div class="stat-item secondary">
        <TrendingUp size={14} class="stat-icon success-icon" />
        <div class="stat-data">
          <span class="stat-value small">{stats.contributionStreak}d</span>
          <span class="stat-label">Streak</span>
        </div>
      </div>
    </div>
    
    <!-- Languages Bar -->
    {#if stats.topLanguages && stats.topLanguages.length > 0}
      <div class="languages-section">
        <span class="languages-label">Top Languages:</span>
        <div class="languages-list">
          {#each stats.topLanguages as lang, i}
            <span class="language-tag">{lang}</span>
            {#if i < stats.topLanguages.length - 1}
              <span class="separator">•</span>
            {/if}
          {/each}
        </div>
      </div>
    {/if}
  {/if}
</div>

<style>
  /* GitHub Authentic Theme Variables */
  .github-widget {
    /* Light Mode (Default) */
    --bg-primary: #ffffff;
    --bg-secondary: #f6f8fa;
    --bg-hover: #eaeef2;
    --border: #d0d7de;
    --text-primary: #1f2328;
    --text-secondary: #656d76;
    --shadow: rgba(31, 35, 40, 0.04);
    --success: #1a7f37;
  }
  
  :global(.dark) .github-widget {
    /* Dark Mode */
    --bg-primary: #0d1117;
    --bg-secondary: #161b22;
    --bg-hover: #1c2128;
    --border: #30363d;
    --text-primary: #e6edf3;
    --text-secondary: #7d8590;
    --shadow: rgba(1, 4, 9, 0.3);
    --success: #3fb950;
  }
  
  .github-widget {
    padding: 1.25rem 1.5rem;
    background: var(--bg-primary);
    border: 1px solid var(--border);
    border-radius: 12px;
    transition: all 0.3s ease;
    width: 100%;
    max-width: 900px;
    min-height: 200px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    box-shadow: 0 1px 3px var(--shadow);
  }
  
  .github-widget:hover {
    border-color: #0969da;
    box-shadow: 0 4px 12px var(--shadow);
  }
  
  :global(.dark) .github-widget:hover {
    border-color: #58a6ff;
  }
  
  /* Header */
  .header-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
  }
  
  .header-left {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  
  :global(.github-logo) {
    color: var(--text-primary);
  }
  
  .header-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .header-title {
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
    line-height: 1;
  }
  
  .status-badge {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    font-size: 0.6875rem;
    color: var(--text-secondary);
  }
  
  .status-dot {
    width: 6px;
    height: 6px;
    background: var(--success);
    border-radius: 50%;
    animation: pulse 2s ease-in-out infinite;
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  
  .profile-button {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.5rem 0.875rem;
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    border-radius: 6px;
    font-size: 0.75rem;
    font-weight: 600;
    color: #0969da;
    text-decoration: none;
    transition: all 0.2s ease;
    flex-shrink: 0;
  }
  
  :global(.dark) .profile-button {
    color: #58a6ff;
  }
  
  .profile-button:hover {
    background: var(--bg-hover);
    border-color: #0969da;
  }
  
  :global(.dark) .profile-button:hover {
    border-color: #58a6ff;
  }
  
  /* Loading & Error */
  .loading-state, .error-state {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    min-height: 200px;
    color: var(--text-secondary);
    font-size: 0.875rem;
  }
  
  .spinner {
    width: 20px;
    height: 20px;
    border: 2px solid var(--border);
    border-top-color: #0969da;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
  
  :global(.dark) .spinner {
    border-top-color: #58a6ff;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  /* Stats Grid */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 0.75rem;
    flex: 1;
    align-content: start;
  }
  
  .stat-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.625rem 0.75rem;
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    border-radius: 8px;
    transition: all 0.2s ease;
  }
  
  .stat-item:hover {
    background: var(--bg-hover);
    transform: translateY(-2px);
  }
  
  .stat-item.primary {
    grid-column: span 2;
  }
  
  .stat-item.secondary {
    grid-column: span 2;
  }
  
  :global(.stat-icon) {
    flex-shrink: 0;
  }
  
  :global(.primary-icon) {
    color: #0969da;
  }
  
  :global(.dark .primary-icon) {
    color: #58a6ff;
  }
  
  :global(.star-icon) {
    color: #bf8700;
  }
  
  :global(.dark .star-icon) {
    color: #d29922;
  }
  
  :global(.fork-icon) {
    color: var(--text-secondary);
  }
  
  :global(.secondary-icon) {
    color: var(--text-secondary);
  }
  
  :global(.success-icon) {
    color: var(--success);
  }
  
  .stat-data {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
    min-width: 0;
    flex: 1;
  }
  
  .stat-value {
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--text-primary);
    line-height: 1;
    font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', monospace;
  }
  
  .stat-value.small {
    font-size: 0.9375rem;
  }
  
  .stat-label {
    font-size: 0.6875rem;
    color: var(--text-secondary);
    font-weight: 500;
    white-space: nowrap;
  }
  
  /* Languages Section */
  .languages-section {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding-top: 0.75rem;
    border-top: 1px solid var(--border);
    flex-shrink: 0;
  }
  
  .languages-label {
    font-size: 0.75rem;
    color: var(--text-secondary);
    font-weight: 500;
    white-space: nowrap;
  }
  
  .languages-list {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
  
  .language-tag {
    font-size: 0.6875rem;
    color: #0969da;
    font-weight: 500;
    font-family: 'SF Mono', 'Monaco', 'Inconsolata', monospace;
  }
  
  :global(.dark) .language-tag {
    color: #58a6ff;
  }
  
  .separator {
    font-size: 0.625rem;
    color: var(--border);
  }
  
  /* Responsive */
  @media (max-width: 900px) {
    .github-widget {
      max-width: 100%;
      min-height: auto;
    }
    
    .stats-grid {
      grid-template-columns: repeat(4, 1fr);
    }
    
    .stat-item.primary,
    .stat-item.secondary {
      grid-column: span 1;
    }
  }
  
  @media (max-width: 640px) {
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .header-section {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.75rem;
    }
  }
</style>
