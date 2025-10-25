<!-- src/lib/components/home/LeetCodeCard.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { Trophy, AlertCircle } from 'lucide-svelte';
  import leetcodeLogo from '$lib/assets/LeetCode_logo.png';
  
  const LEETCODE_USERNAME = 'user8673j';
  
  let loading = true;
  let error = false;
  let data = {
    totalSolved: 0,
    easy: 0,
    medium: 0,
    hard: 0,
    totalSubmissions: 0,
    acceptanceRate: 0
  };
  
  async function fetchLeetCodeStats() {
    try {
      const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${LEETCODE_USERNAME}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch LeetCode stats');
      }
      
      const result = await response.json();
      
      data = {
        totalSolved: result.totalSolved || 0,
        easy: result.easySolved || 0,
        medium: result.mediumSolved || 0,
        hard: result.hardSolved || 0,
        totalSubmissions: result.totalSubmissions || 0,
        acceptanceRate: result.acceptanceRate || 0
      };
      
      loading = false;
    } catch (err) {
      console.error('LeetCode API Error:', err);
      error = true;
      loading = false;
    }
  }
  
  onMount(() => {
    fetchLeetCodeStats();
  });
</script>

<div class="leetcode-widget">
  {#if loading}
    <div class="loading-state">
      <div class="spinner"></div>
      <p>Loading stats...</p>
    </div>
  {:else if error}
    <div class="error-state">
      <AlertCircle size={20} />
      <p>Failed to load</p>
      <button class="retry-btn" on:click={fetchLeetCodeStats}>
        Retry
      </button>
    </div>
  {:else}
    <!-- LeetCode Logo Header -->
    <div class="logo-header">
      <img src={leetcodeLogo} alt="LeetCode" class="leetcode-logo" />
      <span class="logo-text">LeetCode</span>
    </div>
    
    <!-- Top Row: Header + Main Stat -->
    <div class="top-section">
      <div class="left-column">
        <span class="header-title">Total Solved</span>
        <div class="total-count">
          <span class="count-number">{data.totalSolved}</span>
          <span class="count-label">Problems</span>
        </div>
      </div>
      
      <div class="right-column">
        <div class="beats-badge">
          <Trophy size={14} />
          <span>Beats 54.7%</span>
        </div>
        
        <!-- Difficulty Pills -->
        <div class="difficulty-row">
          <div class="pill easy">
            <span class="pill-text">Easy</span>
            <span class="pill-count">{data.easy}</span>
          </div>
          <div class="pill medium">
            <span class="pill-text">Med.</span>
            <span class="pill-count">{data.medium}</span>
          </div>
          <div class="pill hard">
            <span class="pill-text">Hard</span>
            <span class="pill-count">{data.hard}</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Divider -->
    <div class="divider"></div>
    
    <!-- Bottom Stats -->
    <div class="bottom-row">
      <div class="stat">
        <span class="stat-title">Submissions</span>
        <span class="stat-number">{data.totalSubmissions || 128}</span>
      </div>
      <div class="stat">
        <span class="stat-title">Acceptance</span>
        <span class="stat-number acceptance-rate">{data.acceptanceRate || 58.6}%</span>
      </div>
    </div>
  {/if}
</div>

<style>
  /* LeetCode Widget Container */
  .leetcode-widget {
    padding: 1rem 1.25rem;
    background: #282828;
    border: 1px solid #3a3a3a;
    border-radius: 10px;
    transition: all 0.3s ease;
    width: 100%;
    max-width: 420px;
    box-sizing: border-box;
  }
  
  .leetcode-widget:hover {
    border-color: #ffa116;
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(255, 161, 22, 0.2);
  }
  
  /* Logo Header */
  .logo-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid #3a3a3a;
  }
  
  .leetcode-logo {
    width: 20px;
    height: 20px;
    object-fit: contain;
    flex-shrink: 0;
  }
  
  .logo-text {
    font-size: 0.9375rem;
    font-weight: 600;
    color: #eff2f699;
  }
  
  /* Loading & Error States */
  .loading-state, .error-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1.5rem 0;
    gap: 0.5rem;
  }
  
  .loading-state p, .error-state p {
    font-size: 0.875rem;
    color: #b3b3b3;
    margin: 0;
  }
  
  .spinner {
    width: 24px;
    height: 24px;
    border: 3px solid #3a3a3a;
    border-top-color: #ffa116;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  .retry-btn {
    margin-top: 0.5rem;
    padding: 0.375rem 0.875rem;
    background: #ffa116;
    color: #1a1a1a;
    border: none;
    border-radius: 6px;
    font-size: 0.8125rem;
    font-weight: 600;
    cursor: pointer;
  }
  
  /* Top Section */
  .top-section {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 0.875rem;
  }
  
  .left-column {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex: 1;
    min-width: 0;
  }
  
  .header-title {
    font-size: 0.8125rem;
    font-weight: 500;
    color: #b3b3b3;
  }
  
  .total-count {
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
  
  .count-number {
    font-size: 2.25rem;
    font-weight: 700;
    color: #3d95d8;
    line-height: 1;
  }
  
  .count-label {
    font-size: 0.9375rem;
    font-weight: 500;
    color: #eff2f699;
  }
  
  .right-column {
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
    align-items: flex-end;
    flex-shrink: 0;
  }
  
  .beats-badge {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.25rem 0.5rem;
    background: #3a3a3a;
    border-radius: 4px;
    font-size: 0.75rem;
    color: #eff2f699;
    white-space: nowrap;
  }
  
  .beats-badge :global(svg) {
    color: #ffa116;
    flex-shrink: 0;
  }
  
  /* Difficulty Pills */
  .difficulty-row {
    display: flex;
    gap: 0.375rem;
    flex-wrap: wrap;
  }
  
  .pill {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.25rem 0.5rem;
    border-radius: 5px;
    font-size: 0.75rem;
    font-weight: 600;
    white-space: nowrap;
  }
  
  .pill.easy {
    background: rgba(0, 184, 163, 0.15);
    color: #00b8a3;
  }
  
  .pill.medium {
    background: rgba(255, 192, 30, 0.15);
    color: #ffc01e;
  }
  
  .pill.hard {
    background: rgba(239, 71, 67, 0.15);
    color: #ef4743;
  }
  
  .pill-text {
    font-weight: 500;
  }
  
  .pill-count {
    font-weight: 700;
  }
  
  /* Divider */
  .divider {
    height: 1px;
    background: #3a3a3a;
    margin: 0.75rem 0;
  }
  
  /* Bottom Stats */
  .bottom-row {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }
  
  .stat {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    flex: 1;
    min-width: 0;
  }
  
  .stat-title {
    font-size: 0.75rem;
    color: #b3b3b3;
    font-weight: 500;
  }
  
  .stat-number {
    font-size: 1rem;
    font-weight: 700;
    color: #eff2f699;
  }
  
  .acceptance-rate {
    color: #00b8a3;
  }
  
  /* Mobile Responsive */
  @media (max-width: 640px) {
    .leetcode-widget {
      padding: 0.875rem 1rem;
    }
    
    .top-section {
      flex-direction: column;
      gap: 0.75rem;
    }
    
    .right-column {
      align-items: flex-start;
      width: 100%;
    }
    
    .difficulty-row {
      justify-content: flex-start;
    }
    
    .count-number {
      font-size: 2rem;
    }
  }
  
  @media (max-width: 380px) {
    .leetcode-widget {
      padding: 0.75rem 0.875rem;
    }
    
    .count-number {
      font-size: 1.75rem;
    }
    
    .pill {
      font-size: 0.6875rem;
      padding: 0.2rem 0.4rem;
    }
  }
</style>
