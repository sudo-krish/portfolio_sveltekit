<!-- src/lib/components/home/ProjectFilter.svelte -->
<script lang="ts">
  import { Filter, ChevronDown, Plus, X } from 'lucide-svelte';
  import { Card } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  
  export let categories: string[] = [];
  export let activeCategory: string = 'All';
  export let getCategoryCount: (category: string) => number;
  export let onCategoryChange: (category: string) => void;
  export let onClearFilter: () => void;
  
  let showAllFilters = false;
  
  function toggleFilters() {
    showAllFilters = !showAllFilters;
  }
  
  // Get displayed categories (top 7 or all if expanded)
  $: displayedCategories = showAllFilters ? categories : categories.slice(0, 7);
  
  // Calculate progress
  export let displayedCount: number = 0;
  export let totalCount: number = 0;
  $: progressPercent = totalCount > 0 ? Math.round((displayedCount / totalCount) * 100) : 0;
</script>

<div class="filter-container">
  <!-- iOS-style Compact Header -->
  <div class="filter-header">
    <div class="header-left">
      <div class="filter-icon">
        <Filter size={14} />
      </div>
      <span class="filter-title">Filter</span>
    </div>
    
    {#if activeCategory !== 'All'}
      <button class="clear-btn" on:click={onClearFilter}>
        <X size={14} />
        <span>Clear</span>
      </button>
    {/if}
  </div>
  
  <!-- Horizontal Scrollable Pills (iOS style) -->
  <div class="filter-scroll-container">
    <div class="filter-pills">
      {#each displayedCategories as category, i}
        {@const count = getCategoryCount(category)}
        {#if count > 0}
          <button
            class="filter-pill"
            class:active={activeCategory === category}
            on:click={() => onCategoryChange(category)}
            style="--delay: {i * 30}ms"
          >
            <span class="pill-label">{category}</span>
            <span class="pill-count">{count}</span>
          </button>
        {/if}
      {/each}
      
      <!-- Show More Button -->
      {#if categories.length > 7}
        <button class="filter-pill more-pill" on:click={toggleFilters}>
          {#if showAllFilters}
            <ChevronDown size={14} class="rotate-180" />
            <span class="pill-label">Less</span>
          {:else}
            <Plus size={14} />
            <span class="pill-label">More</span>
          {/if}
        </button>
      {/if}
    </div>
    
    <!-- Scroll Fade Edges -->
    <div class="scroll-fade-left"></div>
    <div class="scroll-fade-right"></div>
  </div>
  
  <!-- Material UI Progress Bar -->
  {#if displayedCount > 0 && totalCount > 0}
    <div class="progress-section">
      <div class="progress-bar-container">
        <div class="progress-track">
          <div 
            class="progress-fill" 
            style="width: {progressPercent}%"
            class:complete={progressPercent === 100}
          >
            <div class="progress-shimmer"></div>
          </div>
        </div>
      </div>
      <div class="progress-info">
        <span class="progress-text">{displayedCount} of {totalCount}</span>
        <span class="progress-percent">{progressPercent}%</span>
      </div>
    </div>
  {/if}
</div>

<style>
  .filter-container {
    background: hsl(var(--card));
    border: 1px solid hsl(var(--border) / 0.5);
    border-radius: 16px;
    overflow: hidden;
    backdrop-filter: blur(20px);
    box-shadow: 
      0 1px 3px rgb(0 0 0 / 0.04),
      0 1px 2px rgb(0 0 0 / 0.02);
    margin-bottom: 2rem;
  }
  
  /* iOS-style Header */
  .filter-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.875rem 1rem;
    background: linear-gradient(
      135deg,
      hsl(var(--muted) / 0.3),
      hsl(var(--muted) / 0.1)
    );
    border-bottom: 1px solid hsl(var(--border) / 0.5);
  }
  
  .header-left {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .filter-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    background: hsl(var(--primary) / 0.15);
    border-radius: 6px;
    color: hsl(var(--primary));
  }
  
  .filter-title {
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    font-weight: 700;
    color: hsl(var(--foreground));
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .clear-btn {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.375rem 0.75rem;
    background: hsl(var(--destructive) / 0.1);
    border: 1px solid hsl(var(--destructive) / 0.3);
    border-radius: 8px;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    font-weight: 600;
    color: hsl(var(--destructive));
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
  }
  
  .clear-btn:hover {
    background: hsl(var(--destructive) / 0.15);
    transform: scale(1.02);
  }
  
  .clear-btn:active {
    transform: scale(0.98);
  }
  
  /* Horizontal Scrollable Pills */
  .filter-scroll-container {
    position: relative;
    overflow: hidden;
  }
  
  .filter-pills {
    display: flex;
    gap: 0.5rem;
    padding: 1rem;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-behavior: smooth;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
  }
  
  .filter-pills::-webkit-scrollbar {
    display: none;
  }
  
  /* iOS-style Pills */
  .filter-pill {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.5rem 0.875rem;
    background: hsl(var(--muted) / 0.4);
    border: 1.5px solid hsl(var(--border));
    border-radius: 12px;
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    font-weight: 600;
    color: hsl(var(--foreground));
    white-space: nowrap;
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    flex-shrink: 0;
    opacity: 0;
    transform: scale(0.9);
    animation: pillFadeIn 0.3s ease-out forwards;
    animation-delay: var(--delay);
  }
  
  @keyframes pillFadeIn {
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  .filter-pill:hover {
    background: hsl(var(--muted) / 0.6);
    border-color: hsl(var(--primary) / 0.5);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px hsl(var(--primary) / 0.15);
  }
  
  .filter-pill:active {
    transform: translateY(0) scale(0.96);
  }
  
  .filter-pill.active {
    background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)));
    border-color: transparent;
    color: white;
    box-shadow: 
      0 4px 12px hsl(var(--primary) / 0.4),
      0 0 0 2px hsl(var(--primary) / 0.1);
  }
  
  .filter-pill.active:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 
      0 6px 16px hsl(var(--primary) / 0.5),
      0 0 0 2px hsl(var(--primary) / 0.2);
  }
  
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
  
  .pill-label {
    font-size: 0.8125rem;
  }
  
  .pill-count {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 20px;
    height: 20px;
    padding: 0 0.375rem;
    background: hsl(var(--background) / 0.8);
    border-radius: 10px;
    font-size: 0.6875rem;
    font-weight: 700;
    color: hsl(var(--foreground));
  }
  
  .filter-pill.active .pill-count {
    background: white;
    color: hsl(var(--primary));
  }
  
  /* Scroll Fade Edges */
  .scroll-fade-left,
  .scroll-fade-right {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 40px;
    pointer-events: none;
    z-index: 1;
  }
  
  .scroll-fade-left {
    left: 0;
    background: linear-gradient(90deg, hsl(var(--card)), transparent);
  }
  
  .scroll-fade-right {
    right: 0;
    background: linear-gradient(270deg, hsl(var(--card)), transparent);
  }
  
  /* Material UI Progress */
  .progress-section {
    padding: 0.875rem 1rem 1rem;
    background: linear-gradient(
      135deg,
      hsl(var(--muted) / 0.2),
      hsl(var(--muted) / 0.05)
    );
    border-top: 1px solid hsl(var(--border) / 0.5);
  }
  
  .progress-bar-container {
    margin-bottom: 0.5rem;
  }
  
  .progress-track {
    height: 6px;
    background: hsl(var(--muted) / 0.5);
    border-radius: 3px;
    overflow: hidden;
    position: relative;
  }
  
  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)));
    border-radius: 3px;
    transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }
  
  .progress-fill.complete {
    background: linear-gradient(90deg, hsl(var(--success)), hsl(var(--success) / 0.7));
  }
  
  /* Material Shimmer Effect */
  .progress-shimmer {
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    animation: shimmer 1.5s infinite;
  }
  
  @keyframes shimmer {
    0% { left: -100%; }
    100% { left: 200%; }
  }
  
  .progress-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .progress-text {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: hsl(var(--muted-foreground));
    font-weight: 500;
  }
  
  .progress-percent {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    font-weight: 700;
    color: hsl(var(--primary));
  }
  
  /* Dark Mode */
  :global(.dark) .filter-container {
    box-shadow: 
      0 0 40px hsl(var(--primary) / 0.08),
      0 1px 3px rgb(0 0 0 / 0.1);
  }
  
  :global(.dark) .filter-pill.active {
    box-shadow: 
      0 4px 16px hsl(var(--primary) / 0.5),
      0 0 0 2px hsl(var(--primary) / 0.15);
  }
  
  :global(.dark) .progress-shimmer {
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
  }
  
  /* Mobile Responsive */
  @media (max-width: 640px) {
    .filter-header {
      padding: 0.75rem 0.875rem;
    }
    
    .filter-pills {
      padding: 0.875rem;
      gap: 0.375rem;
    }
    
    .filter-pill {
      padding: 0.4375rem 0.75rem;
      font-size: 0.75rem;
    }
    
    .pill-count {
      min-width: 18px;
      height: 18px;
      font-size: 0.625rem;
    }
    
    .progress-section {
      padding: 0.75rem 0.875rem 0.875rem;
    }
    
    .progress-text,
    .progress-percent {
      font-size: 0.6875rem;
    }
  }
  
  /* Tablet Landscape */
  @media (min-width: 768px) {
    .scroll-fade-left,
    .scroll-fade-right {
      display: none;
    }
    
    .filter-pills {
      flex-wrap: wrap;
      overflow-x: visible;
    }
  }
</style>
