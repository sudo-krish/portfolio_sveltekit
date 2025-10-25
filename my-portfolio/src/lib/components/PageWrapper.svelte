<script lang="ts">
  import Navigation from '$lib/components/Navigation.svelte';
  import SplashScreen from '$lib/components/SplashScreen.svelte';
  import { onMount } from 'svelte';
  import { theme } from '$lib/stores/theme';
  
  onMount(() => {
    theme.init();
  });
</script>

<!-- Splash Screen -->
<SplashScreen />

<!-- Navigation -->
<Navigation />

<!-- Page content -->
<slot />
