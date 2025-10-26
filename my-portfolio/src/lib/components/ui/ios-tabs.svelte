<script lang="ts">
  import type { ComponentType } from 'svelte';
  import { onMount } from 'svelte';
  
  type TabItem = {
    id: string;
    label: string;
    icon?: ComponentType;
  };
  
  export let tabs: TabItem[] = [];
  export let activeTab: string = '';
  export let onChange: (tabId: string) => void = () => {};
  
  let tabsContainer: HTMLDivElement;
  let glassIndicator: HTMLDivElement;
  let tabButtons: HTMLButtonElement[] = [];
  
  function updateGlassPosition() {
    if (!glassIndicator || !tabsContainer) return;
    
    const activeIndex = tabs.findIndex(t => t.id === activeTab);
    const activeButton = tabButtons[activeIndex];
    
    if (activeButton) {
      const containerRect = tabsContainer.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();
      
      const left = buttonRect.left - containerRect.left;
      const width = buttonRect.width;
      
      glassIndicator.style.transform = `translateX(${left}px)`;
      glassIndicator.style.width = `${width}px`;
    }
  }
  
  $: if (activeTab && glassIndicator) {
    updateGlassPosition();
  }
  
  onMount(() => {
    updateGlassPosition();
    window.addEventListener('resize', updateGlassPosition);
    return () => window.removeEventListener('resize', updateGlassPosition);
  });
</script>

<div class="ios-tabs-container">
  <div class="ios-tabs" bind:this={tabsContainer}>
    <!-- Sliding Glass Indicator -->
    <div class="glass-indicator" bind:this={glassIndicator}></div>
    
    {#each tabs as tab, i}
      <button
        bind:this={tabButtons[i]}
        class="ios-tab"
        class:active={activeTab === tab.id}
        on:click={() => onChange(tab.id)}
      >
        {#if tab.icon}
          <svelte:component this={tab.icon} size={20} />
        {/if}
        <span class="ios-tab-label">{tab.label}</span>
      </button>
    {/each}
  </div>
</div>

<style>
  .ios-tabs-container {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 3rem;
  }
  
  .ios-tabs {
    position: relative;
    display: inline-flex;
    padding: 0.5rem;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }
  
  /* Sliding Glass Indicator */
  .glass-indicator {
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    height: calc(100% - 1rem);
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border-radius: 12px;
    box-shadow: 
      0 4px 16px rgba(0, 0, 0, 0.1),
      0 2px 4px rgba(0, 0, 0, 0.06),
      inset 0 1px 0 rgba(255, 255, 255, 0.8);
    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), 
                width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    z-index: 1;
  }
  
  .ios-tab {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 1.75rem;
    background: transparent;
    border: none;
    border-radius: 12px;
    font-size: 0.9375rem;
    font-weight: 600;
    color: hsl(var(--muted-foreground));
    transition: color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    z-index: 2;
    white-space: nowrap;
  }
  
  .ios-tab:hover {
    color: hsl(var(--foreground));
  }
  
  .ios-tab.active {
    color: hsl(var(--foreground));
  }
  
  .ios-tab-label {
    transition: font-weight 0.3s ease;
  }
  
  .ios-tab.active .ios-tab-label {
    font-weight: 700;
  }
  
  /* Dark mode */
  :global(.dark) .ios-tabs {
    background: rgba(0, 0, 0, 0.2);
    border-color: rgba(255, 255, 255, 0.08);
  }
  
  :global(.dark) .glass-indicator {
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 
      0 4px 16px rgba(0, 0, 0, 0.4),
      0 2px 4px rgba(0, 0, 0, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }
  
  /* Mobile responsive */
  @media (max-width: 768px) {
    .ios-tabs-container {
      padding: 0;
    }
    
    .ios-tabs {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.5rem;
      padding: 0.5rem;
    }
    
    .glass-indicator {
      top: 0.5rem;
      left: 0.5rem;
      height: calc(50% - 0.75rem);
    }
    
    .ios-tab {
      flex-direction: column;
      padding: 1.25rem 0.5rem;
      gap: 0.5rem;
      text-align: center;
    }
    
    .ios-tab-label {
      font-size: 0.8125rem;
      line-height: 1.2;
    }
  }
</style>
