<!-- src/lib/components/3d/LiquidMascot.svelte -->
<script lang="ts">
  import { T } from "@threlte/core";
  import { Float } from "@threlte/extras";
  import { Spring } from "svelte/motion";

  // PROP: Controls how "full" the liquid is (0 to 1)
  export let fillLevel = 0;

  // Spring animation for smooth water level changes
  const liquidHeight = new Spring(0, { stiffness: 0.1, damping: 0.4 });

  $: liquidHeight.set(fillLevel);
</script>

<!-- Floating Animation Container -->
<Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
  <!-- 1. OUTER SHELL (GLASS CONTAINER) -->
  <T.Mesh>
    <!-- Replace this with your actual mascot geometry -->
    <T.IcosahedronGeometry args={[1.5, 0]} />

    <!-- 
       FIX: Use T.MeshPhysicalMaterial for native Three.js glass.
       - transmission: 1 = fully transmissive (like glass)
       - roughness: 0 = perfectly smooth
       - thickness: Controls the refraction volume
    -->
    <T.MeshPhysicalMaterial
      transmission={1.0}
      roughness={0.0}
      metalness={0.1}
      ior={1.5}
      thickness={1.5}
      transparent={true}
      color="#38bdf8"
    />
  </T.Mesh>

  <!-- 2. INNER LIQUID (WATER) -->
  <!-- 
      - scale-y: Animate based on scroll (fillLevel)
      - position-y: Move up as it scales so it grows from the bottom 
  -->
  <T.Mesh
    scale.x={0.9}
    scale.y={Math.max(0.01, $liquidHeight * 0.9)}
    scale.z={0.9}
    position.y={-0.7 + $liquidHeight * 0.7}
  >
    <!-- Use the same geometry so the liquid matches the bottle shape -->
    <T.IcosahedronGeometry args={[1.5, 0]} />

    <T.MeshStandardMaterial
      color="#0ea5e9"
      emissive="#0284c7"
      emissiveIntensity={0.8}
      roughness={0.2}
      metalness={0.3}
    />
  </T.Mesh>
</Float>
