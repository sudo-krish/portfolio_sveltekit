<script lang="ts">
  import { theme, themeColors } from "$lib/stores/theme";
  import { T, useTask } from "@threlte/core";

  import { Color, DoubleSide } from "three";

  // --- SEA WATER PIPE COLORS ---
  const deepColor = new Color(themeColors.dark.deep);
  const surfColor = new Color(themeColors.dark.surf);
  const foamColor = new Color(themeColors.dark.foam);

  // In light mode: opaque, high-contrast, saturated sea colors
  // In dark mode: semi-transparent, glowing bioluminescent pipe
  $: if ($theme === "light") {
    deepColor.set(themeColors.light.deep);
    surfColor.set(themeColors.light.surf);
    foamColor.set(themeColors.light.foam);
  } else {
    deepColor.set(themeColors.dark.deep);
    surfColor.set(themeColors.dark.surf);
    foamColor.set(themeColors.dark.foam);
  }

  // --- LIQUID SHADER (Tube Version) ---
  const vertexShader = `
    uniform float uTime;
    varying vec2 vUv;
    varying float vElevation;
    varying vec3 vNormal;
    varying vec3 vViewPosition;

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vec3 pos = position;

      // "Peristaltic" Pulse (Pumping effect along the length)
      float flow = sin(pos.y * 2.0 + uTime * 4.0) * 0.05;
      
      // Expand/Contract radius based on flow
      pos += normal * flow;

      // Pass flow intensity for color
      vElevation = flow;

      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_Position = projectionMatrix * mvPosition;
      vViewPosition = -mvPosition.xyz;
    }
  `;

  const fragmentShader = `
    uniform vec3 uDeepColor;
    uniform vec3 uSurfColor;
    uniform vec3 uFoamColor;
    uniform float uOpacity;
    
    varying float vElevation;
    varying vec3 vNormal;
    varying vec3 vViewPosition;

    void main() {
      // 1. COLOR GRADIENT (Pulse based)
      float mixStrength = smoothstep(-0.05, 0.05, vElevation);
      vec3 color = mix(uDeepColor, uSurfColor, mixStrength);

      // 2. FRESNEL RIM (Edge highlight)
      vec3 viewDir = normalize(vViewPosition);
      float fresnel = pow(1.0 - dot(vNormal, viewDir), 3.0);
      
      // Highlight edges with foam color
      color = mix(color, uFoamColor, fresnel * 0.7);

      // 3. ALPHA: Controlled by uOpacity uniform
      float alpha = uOpacity + fresnel * 0.3;

      gl_FragColor = vec4(color, alpha);
    }
  `;

  // Dark mode: semi-transparent glowing tube. Light mode: fully opaque solid tube.
  const uniforms = {
    uTime: { value: 0 },
    uDeepColor: { value: deepColor },
    uSurfColor: { value: surfColor },
    uFoamColor: { value: foamColor },
    uOpacity: { value: 0.6 },
  };

  $: uniforms.uOpacity.value = $theme === "light" ? 1.0 : 0.6;

  useTask((dt) => {
    uniforms.uTime.value += dt;
  });
</script>

<T.Group>
  <!-- THE LIQUID CONDUIT -->
  <T.Mesh>
    <T.CylinderGeometry args={[2.0, 2.0, 10, 64, 32, true]} />

    <T.ShaderMaterial
      {vertexShader}
      {fragmentShader}
      {uniforms}
      transparent={true}
      side={DoubleSide}
    />
  </T.Mesh>

  <!-- INTERNAL GLOW RINGS (Visual Speed) -->
  {#each Array(5) as _, i}
    <T.Mesh position={[0, (i - 2) * 2, 0]} scale={[1.8, 0.05, 1.8]}>
      <T.TorusGeometry args={[1, 0.05, 16, 64]} />
      <T.MeshBasicMaterial
        color={surfColor}
        transparent
        opacity={$theme === "light" ? 0.9 : 0.5}
      />
    </T.Mesh>
  {/each}
</T.Group>
