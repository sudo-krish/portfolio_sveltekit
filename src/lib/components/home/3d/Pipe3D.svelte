<script lang="ts">
  import { theme } from "$lib/stores/theme";
  import { T, useTask } from "@threlte/core";
  import { glassMaterial, waterDropletMaterial } from "./materials";

  export let drainProgress = 0;

  // 3 droplets spaced evenly for a marquee effect
  let droplets = [
    { id: 1, y: -5 },
    { id: 2, y: 0 },
    { id: 3, y: 5 },
  ];

  useTask((dt) => {
    const speed = 2.5; // Steady marquee flow
    droplets.forEach((d) => {
      d.y -= speed * dt;
      if (d.y < -7.5) {
        d.y += 15; // Loop back exactly to maintain perfectly even spacing
      }
    });
    droplets = droplets;
  });

  // Calculate dynamic scale based on drain progress
  $: scaleMultiplier = Math.max(0, 1 - drainProgress);
</script>

<T.Group>
  <!-- OUTER GLASS CONDUIT -->
  <T.Mesh material={glassMaterial}>
    <T.CylinderGeometry args={[2.2, 2.2, 10.2, 32, 1, true]} />
  </T.Mesh>

  <!-- MOVING 3D DROPLETS (Reusing the wobbling Hero droplet geometry) -->
  {#each droplets as d (d.id)}
    <T.Mesh material={waterDropletMaterial} position={[0, d.y, 0]} scale={[0.7 * scaleMultiplier, 0.9 * scaleMultiplier, 0.7 * scaleMultiplier]}>
      <!-- Use the exact same high-poly geometry as Hero3D so the water blob shader works! -->
      <T.IcosahedronGeometry args={[1.5, 64]} />
    </T.Mesh>
  {/each}

  <!-- INTERNAL GLOW RINGS (Structural accents) -->
  {#each Array(5) as _, i}
    <T.Mesh position={[0, (i - 2) * 2, 0]} scale={[1.8, 0.05, 1.8]}>
      <T.TorusGeometry args={[1, 0.05, 16, 64]} />
      <T.MeshBasicMaterial
        color={$theme === 'light' ? '#0ea5e9' : '#0369a1'}
        transparent
        opacity={0.6}
      />
    </T.Mesh>
  {/each}
</T.Group>
