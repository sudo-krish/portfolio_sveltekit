<script lang="ts">
  import { Canvas } from "@threlte/core";
  import { browser } from "$app/environment";
  import HomeScene from "./HomeScene.svelte";
</script>

<Canvas dpr={browser ? window.devicePixelRatio : 1}>
  <HomeScene />
</Canvas>
