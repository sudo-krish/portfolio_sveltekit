<!-- src/lib/components/home/ProjectFilter.svelte -->
<script lang="ts">
  import { Filter, ChevronDown, Plus, X } from 'lucide-svelte';
  
  export let categories: string[] = [];
  export let activeCategory: string = 'All';
  export let getCategoryCount: (category: string) => number;
  export let onCategoryChange: (category: string) => void;
  export let onClearFilter: () => void;
  
  let showAllFilters = false;
  
  function toggleFilters() {
    showAllFilters = !showAllFilters;
  }
  
  $: displayedCategories = showAllFilters ? categories : categories.slice(0, 4);
  export let displayedCount: number = 0;
  export let totalCount: number = 0;
  $: progressPercent = totalCount > 0 ? Math.round((displayedCount / totalCount) * 100) : 0;
</script>

<!-- SVG Filter -->
<svg style="visibility: hidden; position: absolute" width="0" height="0">
  <defs>
    <filter id="filter-blur">
      <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" />
    </filter>
    
    <linearGradient id="grad-primary" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color: hsl(var(--primary)); stop-opacity: 1" />
      <stop offset="100%" style="stop-color: hsl(var(--accent)); stop-opacity: 0.8" />
    </linearGradient>
    
    <linearGradient id="grad-progress" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color: hsl(var(--primary)); stop-opacity: 1" />
      <stop offset="100%" style="stop-color: hsl(var(--accent)); stop-opacity: 1" />
    </linearGradient>
  </defs>
</svg>

<div class="filter-container">
  <!-- Header -->
  <div class="filter-header">
    <div class="header-left">
      <svg class="filter-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
      </svg>
      <span class="filter-title">Filters</span>
    </div>
    
    {#if activeCategory !== 'All'}
      <button class="clear-btn" on:click={onClearFilter} title="Clear all filters">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
        <span>Reset</span>
      </button>
    {/if}
  </div>
  
  <!-- Pills Container -->
  <div class="pills-wrapper">
    <div class="filter-pills">
      {#each displayedCategories as category, i}
        {@const count = getCategoryCount(category)}
        {#if count > 0}
          <button
            class="filter-pill"
            class:active={activeCategory === category}
            on:click={() => onCategoryChange(category)}
            style="--delay: {i * 40}ms"
          >
            <span class="pill-label">{category}</span>
            <span class="pill-count">{count}</span>
          </button>
        {/if}
      {/each}
      
      {#if categories.length > 4}
        <button class="filter-pill more-pill" on:click={toggleFilters}>
          <svg class="more-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            {#if showAllFilters}
              <polyline points="18 15 12 9 6 15"></polyline>
            {:else}
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            {/if}
          </svg>
          <span class="pill-label">{showAllFilters ? 'Less' : 'More'}</span>
        </button>
      {/if}
    </div>
  </div>
  
  <!-- Progress Bar -->
  {#if displayedCount > 0 && totalCount > 0}
    <div class="progress-section">
      <svg class="progress-bar" viewBox="0 0 100 6" preserveAspectRatio="none">
        <!-- Track -->
        <rect x="0" y="0" width="100" height="6" rx="3" fill="hsl(var(--muted) / 0.3)" />
        
        <!-- Progress Fill with Shimmer -->
        <defs>
          <mask id="progress-mask">
            <rect x="0" y="0" width="{progressPercent}" height="6" rx="3" fill="white" />
          </mask>
          
          <animate id="shimmer-anim" attributeName="x" values="-100;200" dur="1.5s" repeatCount="indefinite" />
        </defs>
        
        <!-- Fill -->
        <g mask="url(#progress-mask)">
          <rect x="0" y="0" width="100" height="6" fill="url(#grad-progress)" />
          <rect x="-100" y="0" width="100" height="6" fill="url(#grad-progress)" opacity="0.3">
            <animate attributeName="x" values="-100;200" dur="1.5s" repeatCount="indefinite" />
          </rect>
        </g>
      </svg>
      
      <!-- Progress Text -->
      <div class="progress-info">
        <span class="progress-text">{displayedCount} of {totalCount}</span>
        <span class="progress-percent">{progressPercent}%</span>
      </div>
    </div>
  {/if}
</div>

<style>
  .filter-container {
    background: hsl(var(--card) / 0.6);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 14px;
    overflow: hidden;
    margin-bottom: 1.5rem;
    transition: all 0.3s ease;
  }

  .filter-container:hover {
    border-color: rgba(255, 255, 255, 0.18);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  }

  /* Header */
  .filter-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.85rem 1rem;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.03), transparent);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  .filter-icon {
    width: 18px;
    height: 18px;
    color: hsl(var(--primary));
    stroke-width: 2.5;
    opacity: 0.9;
  }

  .filter-title {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    font-weight: 700;
    color: hsl(var(--foreground));
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .clear-btn {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.35rem 0.65rem;
    background: hsl(var(--destructive) / 0.12);
    border: 1px solid hsl(var(--destructive) / 0.25);
    border-radius: 8px;
    color: hsl(var(--destructive));
    font-family: var(--font-mono);
    font-size: 0.7rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
    will-change: transform;
  }

  .clear-btn:active {
    transform: scale(0.95);
  }

  .clear-btn:hover {
    background: hsl(var(--destructive) / 0.15);
    border-color: hsl(var(--destructive) / 0.4);
    transform: translateY(-1px);
  }

  .clear-btn svg {
    width: 13px;
    height: 13px;
  }

  /* Pills Container - Mobile First */
  .pills-wrapper {
    position: relative;
    overflow: hidden;
  }

  .filter-pills {
    display: flex;
    gap: 0.5rem;
    padding: 0.85rem 1rem;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-behavior: smooth;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
    flex-wrap: wrap;
  }

  .filter-pills::-webkit-scrollbar {
    display: none;
  }

  /* Pills */
  .filter-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.5rem 0.85rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 10px;
    color: hsl(var(--muted-foreground));
    font-family: var(--font-mono);
    font-size: 0.75rem;
    font-weight: 600;
    white-space: nowrap;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    flex-shrink: 0;
    opacity: 0;
    transform: scale(0.92) translateY(4px);
    animation: pillIn 0.35s ease-out forwards;
    animation-delay: var(--delay);
  }

  @keyframes pillIn {
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  .filter-pill:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.18);
    transform: translateY(-2px);
  }

  .filter-pill:active {
    transform: translateY(0) scale(0.96);
  }

  .filter-pill.active {
    background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)));
    border-color: transparent;
    color: white;
    box-shadow: 0 8px 20px hsl(var(--primary) / 0.3);
  }

  .filter-pill.active:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 12px 28px hsl(var(--primary) / 0.4);
  }

  .pill-label {
    font-size: 0.75rem;
  }

  .pill-count {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 18px;
    height: 18px;
    padding: 0 0.3rem;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 9px;
    font-size: 0.65rem;
    font-weight: 700;
    color: hsl(var(--foreground));
  }

  .filter-pill.active .pill-count {
    background: rgba(255, 255, 255, 0.25);
    color: white;
  }

  /* More Pill */
  .more-pill {
    background: hsl(var(--primary) / 0.1);
    border-color: hsl(var(--primary) / 0.3);
    border-style: dashed;
    color: hsl(var(--primary));
  }

  .more-pill:hover {
    background: hsl(var(--primary) / 0.15);
    border-style: solid;
  }

  .more-icon {
    width: 14px;
    height: 14px;
    stroke-width: 2.5;
  }

  /* Progress Section */
  .progress-section {
    padding: 0.85rem 1rem;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.02), transparent);
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }

  .progress-bar {
    width: 100%;
    height: 6px;
    margin-bottom: 0.6rem;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  }

  .progress-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .progress-text {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: hsl(var(--muted-foreground));
    font-weight: 500;
  }

  .progress-percent {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    font-weight: 700;
    color: hsl(var(--primary));
  }

  /* Mobile First - Stack on small screens */
  @media (max-width: 480px) {
    .filter-container {
      margin-bottom: 1.25rem;
      border-radius: 12px;
    }

    .filter-header {
      padding: 0.75rem 0.875rem;
    }

    .filter-pills {
      padding: 0.75rem 0.875rem;
      gap: 0.4rem;
    }

    .filter-pill {
      padding: 0.45rem 0.75rem;
      font-size: 0.7rem;
      border-radius: 9px;
    }

    .pill-count {
      min-width: 16px;
      height: 16px;
      font-size: 0.6rem;
    }

    .progress-section {
      padding: 0.75rem 0.875rem;
    }

    .filter-title {
      font-size: 0.7rem;
    }
  }

  /* Tablet & Desktop - Horizontal scroll */
  @media (min-width: 768px) {
    .filter-pills {
      flex-wrap: nowrap;
      overflow-x: auto;
    }

    .filter-pill {
      padding: 0.55rem 0.95rem;
      font-size: 0.8rem;
    }

    .pill-count {
      min-width: 20px;
      height: 20px;
      font-size: 0.65rem;
    }

    .filter-header {
      padding: 1rem 1.25rem;
    }

    .filter-pills {
      padding: 1rem 1.25rem;
    }

    .progress-section {
      padding: 1rem 1.25rem;
    }
  }
</style>
