<!-- src/lib/components/home/SpecialtyCard.svelte -->
<script lang="ts">
  import type { ComponentType } from 'svelte';
  
  export let icon: ComponentType;
  export let title: string;
  export let highlight: string;
  export let description: string;
  export let tags: string[] = [];
</script>

<div class="specialty-card">
  <div class="card-header">
    <div class="icon-wrapper">
      <svelte:component this={icon} size={16} />
    </div>
    <div class="header-badge">{highlight}</div>
  </div>
  
  <div class="card-body">
    <h3 class="card-title">{title}</h3>
    <p class="card-description">{description}</p>
    
    {#if tags.length > 0}
      <div class="tags-row">
        {#each tags.slice(0, 3) as tag}
          <span class="tag">{tag}</span>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
  .specialty-card {
    padding: 0.875rem;
    background: hsl(var(--card));
    border: 1px solid hsl(var(--border));
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
    width: 100%;
    max-width: 280px;
    height: 200px;
    /* REMOVED: transition */
  }
  
  .specialty-card:hover {
    border-color: hsl(var(--primary));
    /* REMOVED: transform and box-shadow to prevent flicker */
  }
  
  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    flex-shrink: 0;
  }
  
  .icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: hsl(var(--primary) / 0.1);
    border-radius: 6px;
    color: hsl(var(--primary));
    flex-shrink: 0;
  }
  
  .header-badge {
    font-family: var(--font-mono);
    font-size: 0.625rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: hsl(var(--primary));
    padding: 0.1875rem 0.4375rem;
    background: hsl(var(--primary) / 0.1);
    border: 1px solid hsl(var(--primary) / 0.2);
    border-radius: 4px;
  }
  
  .card-body {
    display: flex;
    flex-direction: column;
    gap: 0.4375rem;
    flex: 1;
  }
  
  .card-title {
    font-size: 0.875rem;
    font-weight: 700;
    color: hsl(var(--foreground));
    margin: 0;
    line-height: 1.3;
  }
  
  .card-description {
    font-size: 0.75rem;
    color: hsl(var(--muted-foreground));
    line-height: 1.4;
    margin: 0;
  }
  
  .tags-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3125rem;
    margin-top: auto;
  }
  
  .tag {
    font-size: 0.625rem;
    font-weight: 500;
    color: hsl(var(--muted-foreground));
    padding: 0.1875rem 0.4375rem;
    background: hsl(var(--muted) / 0.3);
    border-radius: 4px;
  }
  
  /* Responsive */
  @media (max-width: 280px) {
    .specialty-card {
      max-width: 100%;
    }
  }
</style>
