<script lang="ts">
  import { Canvas } from "@threlte/core";
  import { browser } from "$app/environment";
  import HomeScene from "./HomeScene.svelte";
  
  // Cap DPR at 1.5 for desktop to avoid massive 4K/8K rendering loads
  // Cap at 1.0 for mobile where raw pixel processing power is lower
  const getDpr = () => {
    if (!browser) return 1;
    const isMobile = window.innerWidth < 1024;
    return Math.min(window.devicePixelRatio, isMobile ? 1.0 : 1.5);
  };
</script>

<Canvas dpr={getDpr()}>
  <HomeScene />
</Canvas>
