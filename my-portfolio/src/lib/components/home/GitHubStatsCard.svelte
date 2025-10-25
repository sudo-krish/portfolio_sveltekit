<!-- src/lib/components/home/GitHubStatsCard.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { Github, Star, GitFork, AlertCircle, Users, BookOpen } from 'lucide-svelte';
  
  let loading = true;
  let error = false;
  let data = {
    publicRepos: 0,
    totalStars: 0,
    totalForks: 0,
    followers: 0
  };
  
  onMount(async () => {
    try {
      const username = 'sudo-krish';
      const response = await fetch(`https://api.github.com/users/${username}`);
      const userData = await response.json();
      
      data = {
        publicRepos: userData.public_repos,
        totalStars: 0,
        totalForks: 0,
        followers: userData.followers
      };
      loading = false;
    } catch (err) {
      error = true;
      loading = false;
    }
  });
</script>

<div class="github-widget">
  {#if loading}
    <div class="loading-state">
      <div class="spinner"></div>
      <p>Loading stats...</p>
    </div>
  {:else if error}
    <div class="error-state">
      <AlertCircle size={20} />
      <p>Failed to load</p>
    </div>
  {:else}
    <!-- GitHub Header -->
    <div class="logo-header">
      <Github size={20} class="github-icon" />
      <span class="logo-text">GitHub</span>
    </div>
    
    <!-- Main Stats -->
    <div class="main-stats">
      <div class="main-stat">
        <BookOpen size={16} class="stat-icon-main" />
        <div class="stat-content">
          <span class="stat-value-large">{data.publicRepos}</span>
          <span class="stat-label-main">Repositories</span>
        </div>
      </div>
      
      <div class="main-stat">
        <Users size={16} class="stat-icon-main" />
        <div class="stat-content">
          <span class="stat-value-large">{data.followers}</span>
          <span class="stat-label-main">Followers</span>
        </div>
      </div>
    </div>
    
    <!-- Secondary Stats -->
    <div class="secondary-stats">
      <div class="secondary-stat">
        <Star size={14} class="star-icon" />
        <span class="secondary-value">{data.totalStars}</span>
        <span class="secondary-label">Stars</span>
      </div>
      
      <div class="divider-vertical"></div>
      
      <div class="secondary-stat">
        <GitFork size={14} class="fork-icon" />
        <span class="secondary-value">{data.totalForks}</span>
        <span class="secondary-label">Forks</span>
      </div>
    </div>
  {/if}
</div>

<style>
  /* GitHub Dark Theme Colors */
  .github-widget {
    padding: 1rem 1.25rem;
    background: #0d1117;
    border: 1px solid #30363d;
    border-radius: 10px;
    transition: all 0.3s ease;
    width: 100%;
    max-width: 420px;
    min-height: 200px;
  }
  
  .github-widget:hover {
    border-color: #58a6ff;
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(88, 166, 255, 0.25);
  }
  
  /* Logo Header */
  .logo-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid #21262d;
  }
  
  :global(.github-icon) {
    color: #c9d1d9;
  }
  
  .logo-text {
    font-size: 0.9375rem;
    font-weight: 600;
    color: #c9d1d9;
  }
  
  /* Loading & Error States */
  .loading-state, .error-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1.5rem 0;
    gap: 0.5rem;
    color: #8b949e;
  }
  
  .spinner {
    width: 24px;
    height: 24px;
    border: 3px solid #30363d;
    border-top-color: #58a6ff;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  /* Main Stats */
  .main-stats {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  
  .main-stat {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    flex: 1;
    padding: 0.75rem;
    background: #161b22;
    border: 1px solid #21262d;
    border-radius: 6px;
  }
  
  :global(.stat-icon-main) {
    color: #58a6ff;
    margin-top: 0.125rem;
  }
  
  .stat-content {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
  }
  
  .stat-value-large {
    font-size: 1.5rem;
    font-weight: 700;
    color: #c9d1d9;
    line-height: 1;
  }
  
  .stat-label-main {
    font-size: 0.75rem;
    color: #8b949e;
    font-weight: 500;
  }
  
  /* Secondary Stats */
  .secondary-stats {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0.75rem;
    background: #161b22;
    border: 1px solid #21262d;
    border-radius: 6px;
  }
  
  .secondary-stat {
    display: flex;
    align-items: center;
    gap: 0.375rem;
  }
  
  :global(.star-icon) {
    color: #f0bf4c;
  }
  
  :global(.fork-icon) {
    color: #8b949e;
  }
  
  .secondary-value {
    font-size: 0.9375rem;
    font-weight: 700;
    color: #c9d1d9;
  }
  
  .secondary-label {
    font-size: 0.75rem;
    color: #8b949e;
  }
  
  .divider-vertical {
    width: 1px;
    height: 24px;
    background: #21262d;
  }
</style>
