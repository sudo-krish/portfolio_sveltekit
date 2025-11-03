<!-- PageWrapper.svelte -->
<script lang="ts">
  import Navigation from '$lib/components/Navigation.svelte';
  import SplashScreen from '$lib/components/SplashScreen.svelte';
  import { splashComplete } from '$lib/stores/splash';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { theme } from '$lib/stores/theme';
  
  let showSplash = false;
  let contentReady = false;
  
  onMount(() => {
    theme.init();
    
    // Check if this is the first visit to homepage
    const hasVisited = sessionStorage.getItem('visited');
    
    if ($page.url.pathname === '/' && !hasVisited) {
      // First visit to homepage - show splash
      showSplash = true;
      sessionStorage.setItem('visited', 'true');
      
      // Subscribe to splash completion
      const unsubscribe = splashComplete.subscribe(value => {
        if (value) {
          // ✅ Content only becomes ready AFTER splash completes
          contentReady = true;
        }
      });
      
      return unsubscribe;
    } else {
      // Not homepage or already visited - load immediately
      showSplash = false;
      contentReady = true;
    }
  });
</script>

<svelte:head>
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="alternate icon" href="/favicon.ico" type="image/x-icon" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
</svelte:head>

{#if showSplash && !contentReady}
  <SplashScreen />
{/if}

{#if contentReady}
  <div class="content-wrapper" class:loaded={contentReady}>
    <Navigation />

    <slot />
  </div>
{/if}

<style>
  .content-wrapper {
    min-height: 100vh;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
