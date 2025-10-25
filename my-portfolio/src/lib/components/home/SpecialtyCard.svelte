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
      <svelte:component this={icon} size={20} />
    </div>
    <div class="header-badge">{highlight}</div>
  </div>
  
  <div class="card-body">
    <h3 class="card-title">{title}</h3>
    <p class="card-description">{description}</p>
    
    {#if tags.length > 0}
      <div class="tags-row">
        {#each tags as tag}
          <span class="tag">{tag}</span>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
  .specialty-card {
    padding: 1rem;
    background: hsl(var(--card));
    border: 1px solid hsl(var(--border));
    border-radius: 10px;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    height: 100%;
  }
  
  .specialty-card:hover {
    border-color: hsl(var(--primary));
    transform: translateY(-4px);
    box-shadow: 0 8px 24px hsl(var(--primary) / 0.12);
  }
  
  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
  }
  
  .icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: hsl(var(--primary) / 0.1);
    border-radius: 8px;
    color: hsl(var(--primary));
    flex-shrink: 0;
  }
  
  .header-badge {
    font-family: var(--font-mono);
    font-size: 0.6875rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: hsl(var(--primary));
    padding: 0.25rem 0.5rem;
    background: hsl(var(--primary) / 0.1);
    border: 1px solid hsl(var(--primary) / 0.2);
    border-radius: 4px;
  }
  
  .card-body {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .card-title {
    font-size: 0.9375rem;
    font-weight: 700;
    color: hsl(var(--foreground));
    margin: 0;
    line-height: 1.3;
  }
  
  .card-description {
    font-size: 0.8125rem;
    color: hsl(var(--muted-foreground));
    line-height: 1.5;
    margin: 0;
  }
  
  .tags-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.375rem;
    margin-top: 0.25rem;
  }
  
  .tag {
    font-size: 0.6875rem;
    font-weight: 500;
    color: hsl(var(--muted-foreground));
    padding: 0.2rem 0.5rem;
    background: hsl(var(--muted) / 0.3);
    border-radius: 4px;
  }
</style>
