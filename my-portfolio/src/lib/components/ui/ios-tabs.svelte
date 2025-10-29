<script lang="ts">
  import type { ComponentType } from 'svelte';
  import { onMount, tick } from 'svelte';
  import { spring } from 'svelte/motion';
  
  type TabItem = {
    id: string;
    label: string;
    icon?: ComponentType;
  };
  
  export let tabs: TabItem[] = [];
  export let activeTab: string = '';
  export let onChange: (tabId: string) => void = () => {};
  
  let tabsContainer: HTMLDivElement;
  let mounted = false;
  
  // Smooth spring animation for position
  const position = spring(
    { x: 0, y: 0, width: 0, height: 0 },
    { stiffness: 0.15, damping: 0.6 }
  );
  
  async function updateIndicatorPosition() {
    if (!tabsContainer || !mounted) return;
    
    await tick();
    
    const activeButton = tabsContainer.querySelector(`[data-tab="${activeTab}"]`) as HTMLButtonElement;
    
    if (activeButton) {
      const containerRect = tabsContainer.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();
      
      position.set({
        x: buttonRect.left - containerRect.left,
        y: buttonRect.top - containerRect.top,
        width: buttonRect.width,
        height: buttonRect.height
      });
    }
  }
  
  $: if (activeTab && mounted) {
    updateIndicatorPosition();
  }
  
  onMount(() => {
    mounted = true;
    updateIndicatorPosition();
    
    const resizeObserver = new ResizeObserver(() => {
      updateIndicatorPosition();
    });
    
    resizeObserver.observe(tabsContainer);
    
    return () => resizeObserver.disconnect();
  });
</script>

<div class="tabs-wrapper">
  <div class="tabs-container" bind:this={tabsContainer}>
    <div class="tabs-background">
      <div 
        class="tabs-indicator"
        style:transform="translate({$position.x}px, {$position.y}px)"
        style:width="{$position.width}px"
        style:height="{$position.height}px"
      ></div>
    </div>
    
    <div class="tabs-content">
      {#each tabs as tab}
        <button
          data-tab={tab.id}
          class="tab"
          class:active={activeTab === tab.id}
          on:click={() => onChange(tab.id)}
          type="button"
        >
          {#if tab.icon}
            <svelte:component this={tab.icon} size={18} class="tab-icon" />
          {/if}
          <span class="tab-label">{tab.label}</span>
        </button>
      {/each}
    </div>
  </div>
</div>

<style>
  .tabs-wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 3rem;
  }
  
  .tabs-container {
    position: relative;
    display: inline-flex;
    isolation: isolate;
  }
  
  /* ===================================== */
  /* GLASSMORPHISM BACKGROUND              */
  /* ===================================== */
  
  .tabs-background {
    position: absolute;
    inset: 0;
    padding: 5px;
    
    /* Light mode: Subtle frosted glass */
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(12px) saturate(150%);
    -webkit-backdrop-filter: blur(12px) saturate(150%);
    
    border-radius: 14px;
    border: 1px solid rgba(0, 0, 0, 0.06);
    
    /* Black shadow for light mode */
    box-shadow: 
      0 2px 12px rgba(0, 0, 0, 0.06),
      0 1px 4px rgba(0, 0, 0, 0.04),
      inset 0 1px 0 rgba(255, 255, 255, 0.8);
  }
  
  /* Dark mode glassmorphism */
  :global(.dark) .tabs-background {
    /* Dark navy translucent glass */
    background: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    
    border: 1px solid rgba(255, 255, 255, 0.08);
    
    /* Deeper black shadows + subtle teal glow */
    box-shadow: 
      0 4px 20px rgba(0, 0, 0, 0.4),
      0 2px 8px rgba(0, 0, 0, 0.3),
      0 0 40px rgba(76, 185, 172, 0.08),
      inset 0 1px 0 rgba(255, 255, 255, 0.05);
  }
  
  /* ===================================== */
  /* GLASSMORPHISM INDICATOR               */
  /* ===================================== */
  
  .tabs-indicator {
    position: absolute;
    left: 0;
    top: 0;
    
    /* Light mode: Pure white with subtle depth */
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(8px) saturate(120%);
    -webkit-backdrop-filter: blur(8px) saturate(120%);
    
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.04);
    
    /* Black shadow with depth layers */
    box-shadow: 
      0 4px 16px rgba(0, 0, 0, 0.08),
      0 2px 6px rgba(0, 0, 0, 0.04),
      0 1px 2px rgba(0, 0, 0, 0.03),
      inset 0 1px 0 rgba(255, 255, 255, 1);
    
    /* Smooth GPU-accelerated animation */
    transform-origin: top left;
    will-change: transform, width, height;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    perspective: 1000px;
  }
  
  /* Dark mode indicator */
  :global(.dark) .tabs-indicator {
    /* Lighter slate glass with glow */
    background: rgba(30, 41, 59, 0.8);
    backdrop-filter: blur(12px) saturate(180%);
    -webkit-backdrop-filter: blur(12px) saturate(180%);
    
    border: 1px solid rgba(255, 255, 255, 0.12);
    
    /* Deep black shadows + teal glow accent */
    box-shadow: 
      0 6px 24px rgba(0, 0, 0, 0.5),
      0 3px 12px rgba(0, 0, 0, 0.3),
      0 1px 4px rgba(0, 0, 0, 0.2),
      0 0 20px rgba(76, 185, 172, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.08);
  }
  
  /* ===================================== */
  /* TABS CONTENT                          */
  /* ===================================== */
  
  .tabs-content {
    position: relative;
    display: flex;
    padding: 5px;
    gap: 4px;
    z-index: 1;
  }
  
  /* Tab button */
  .tab {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 10px 20px;
    background: transparent;
    border: none;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 500;
    color: hsl(var(--muted-foreground));
    cursor: pointer;
    white-space: nowrap;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    transition: color 0.2s ease;
  }
  
  .tab:hover:not(.active) {
    color: hsl(var(--foreground) / 0.8);
  }
  
  .tab.active {
    color: hsl(var(--foreground));
    font-weight: 600;
  }
  
  
  /* ===================================== */
  /* MOBILE RESPONSIVE                     */
  /* ===================================== */
  
  @media (max-width: 768px) {
    .tabs-wrapper {
      padding: 0;
    }
    
    .tabs-container {
      width: 100%;
    }
    
    .tabs-background {
      padding: 6px;
      border-radius: 16px;
    }
    
    .tabs-content {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 6px;
      padding: 6px;
      width: 100%;
    }
    
    .tabs-indicator {
      border-radius: 12px;
    }
    
    .tab {
      flex-direction: column;
      padding: 16px 8px;
      gap: 6px;
      font-size: 13px;
    }
  }
  
  /* Tablet */
  @media (min-width: 481px) and (max-width: 768px) {
    .tabs-content {
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    }
  }
</style>
