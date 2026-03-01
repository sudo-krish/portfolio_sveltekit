<!-- src/lib/components/SplashScreen.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { splashComplete } from '$lib/stores/splash';
  import { getPersonalInfo } from '$lib/data/portfolio-data';
  import { Loader, Workflow, Database, ChartBar } from 'lucide-svelte';
  
  const personal = getPersonalInfo();
  
  let visible = true;
  let fadeOut = false;
  let progress = 0;
  let currentPhase = 0;
  
  const phases = [
    { icon: Database, text: 'Collect & Ingest Data', percent: 25 },
    { icon: Workflow, text: 'Cleanse, Transform & Model', percent: 50 },
    { icon: Loader, text: 'Store, Orchestrate & Optimize', percent: 75 },
    { icon: ChartBar, text: 'Generate Insights & Activate AI', percent: 100 }
  ];
  
  onMount(() => {
    const interval = setInterval(() => {
      if (progress < 100) {
        progress += 2;
        
        // Update phase based on progress
        if (progress >= 75) {
          currentPhase = 3;
        } else if (progress >= 50) {
          currentPhase = 2;
        } else if (progress >= 25) {
          currentPhase = 1;
        } else {
          currentPhase = 0;
        }
      } else {
        clearInterval(interval);
        
        setTimeout(() => {
          fadeOut = true;
          setTimeout(() => {
            visible = false;
            // ✅ Signal that splash is complete
            splashComplete.set(true);
          }, 500);
        }, 300);
      }
    }, 30);
    
    return () => clearInterval(interval);
  });
  
  // Reactive statement to get current icon
  $: currentIcon = phases[currentPhase].icon;
  $: currentText = phases[currentPhase].text;
  
  // ✅ Skip function for better UX
  function skipSplash() {
    progress = 100;
    currentPhase = 3;
    fadeOut = true;
    setTimeout(() => {
      visible = false;
      splashComplete.set(true);
    }, 500);
  }
</script>

{#if visible}
  <div class="splash-screen" class:fade-out={fadeOut}>
    <div class="splash-content">
      
      <!-- LIQUID WAVE K WITH DEPTH -->
      <div class="logo-container">
        <svg class="logo-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          
          <defs>
            <!-- Gradient for wave -->
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:hsl(var(--accent));stop-opacity:1" />
              <stop offset="50%" style="stop-color:hsl(var(--primary));stop-opacity:1" />
              <stop offset="100%" style="stop-color:hsl(var(--primary));stop-opacity:0.8" />
            </linearGradient>
            
            <!-- Wave pattern -->
            <pattern id="wave" x="0" y="-5" width="100%" height="100%" patternUnits="userSpaceOnUse">
              <path 
                d="M-40 45 Q-30 38 -20 45 T0 45 T20 45 T40 45 T60 45 T80 45 T100 45 T120 45 T140 45 V100 H-40z" 
                fill="url(#gradient)"
              >
                <animateTransform
                  attributeName="transform"
                  begin="0s"
                  dur="2s"
                  type="translate"
                  from="0,0"
                  to="40,0"
                  repeatCount="indefinite"
                />
              </path>
            </pattern>
          </defs>
          
          <!-- K with strong border/outline (creates depth) -->
          <text 
            text-anchor="middle" 
            x="50" 
            y="75" 
            font-size="80" 
            font-weight="bold"
            stroke="hsl(var(--muted-foreground))"
            stroke-width="2"
            fill="none"
          >K</text>
          
          <!-- K with liquid wave fill -->
          <text 
            text-anchor="middle" 
            x="50" 
            y="75" 
            font-size="80" 
            font-weight="bold"
            fill="url(#wave)"
          >K</text>
          
        </svg>
      </div>
      
      <!-- Phase indicator with key to force re-render -->
      <div class="phase-indicator">
        <div class="phase-icon">
          {#key currentPhase}
            <svelte:component this={currentIcon} class="icon" size={18} strokeWidth={2} />
          {/key}
        </div>
        <p class="phase-text">{currentText}</p>
      </div>
      
      <!-- Progress bar -->
      <div class="progress-container">
        <div class="progress-bar">
          <div class="progress-fill" style="width: {progress}%"></div>
        </div>
        <span class="progress-percent">{Math.round(progress)}%</span>
      </div>
      
      <!-- ✅ Skip button -->
      <button 
        class="skip-button" 
        on:click={skipSplash}
        aria-label="Skip loading animation"
      >
        Skip
      </button>
      
    </div>
  </div>
{/if}

<style>
  .splash-screen {
    position: fixed;
    inset: 0;
    background: hsl(var(--background));
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    animation: fadeIn 0.5s ease-out;
  }
  
  .splash-screen.fade-out {
    animation: fadeOut 0.5s ease-in forwards;
  }
  
  .splash-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3rem;
    text-align: center;
    animation: slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
  }
  
  .logo-container {
    width: 140px;
    height: 140px;
  }
  
  .logo-svg {
    width: 100%;
    height: 100%;
    font-weight: bold;
  }
  
  .phase-indicator {
    display: flex;
    align-items: center;
    gap: 0.875rem;
    padding: 0.75rem 1.25rem;
    background: hsl(var(--muted) / 0.4);
    border-radius: var(--radius-lg);
    border: 1px solid hsl(var(--border));
    backdrop-filter: blur(8px);
  }
  
  .phase-icon {
    display: flex;
    align-items: center;
    color: hsl(var(--accent));
  }
  
  .phase-icon :global(.icon) {
    animation: spin 2s linear infinite;
  }
  
  .phase-text {
    font-family: var(--font-sans);
    font-size: 0.875rem;
    font-weight: 500;
    color: hsl(var(--foreground));
    letter-spacing: -0.01em;
    margin: 0;
  }
  
  .progress-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 300px;
  }
  
  .progress-bar {
    flex: 1;
    height: 6px;
    background: hsl(var(--muted));
    border-radius: 999px;
    overflow: hidden;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
  }
  
  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)));
    border-radius: 999px;
    transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 0 8px hsl(var(--accent) / 0.3);
  }
  
  .progress-percent {
    font-family: var(--font-sans);
    font-size: 0.875rem;
    font-weight: 600;
    color: hsl(var(--muted-foreground));
    font-variant-numeric: tabular-nums;
    min-width: 44px;
    text-align: right;
    letter-spacing: -0.01em;
  }
  
  /* ✅ Skip button */
  .skip-button {
    position: absolute;
    bottom: -4rem;
    padding: 0.5rem 1.25rem;
    background: transparent;
    border: 1px solid hsl(var(--border));
    border-radius: var(--radius);
    color: hsl(var(--muted-foreground));
    font-size: 0.8125rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .skip-button:hover {
    background: hsl(var(--muted));
    color: hsl(var(--foreground));
    border-color: hsl(var(--primary));
    transform: translateY(-2px);
  }
  
  .skip-button:active {
    transform: translateY(0);
  }
  
  /* Animations */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
  
  @keyframes slideUp {
    from {
      transform: translateY(40px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  @media (max-width: 640px) {
    .splash-content {
      gap: 2.5rem;
    }
    
    .logo-container {
      width: 120px;
      height: 120px;
    }
    
    .progress-container {
      width: 260px;
    }
    
    .skip-button {
      bottom: -3rem;
      font-size: 0.75rem;
      padding: 0.4rem 1rem;
    }
  }
</style>
