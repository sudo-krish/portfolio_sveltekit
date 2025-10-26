<script lang="ts">
  import Navigation from '$lib/components/Navigation.svelte';
  import SplashScreen from '$lib/components/SplashScreen.svelte';
  import { onMount } from 'svelte';
  import { theme } from '$lib/stores/theme';
  
  onMount(() => {
    theme.init();
  });
</script>
<svelte:head>
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="alternate icon" href="/favicon.ico" type="image/x-icon" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
</svelte:head>
<!-- Splash Screen -->
<SplashScreen />

<!-- Navigation -->
<Navigation />

<!-- Page content -->
<slot />
