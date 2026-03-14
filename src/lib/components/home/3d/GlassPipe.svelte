<script lang="ts">
  import { T, useTask } from "@threlte/core";
  import * as THREE from "three";
  import { Color, DoubleSide } from "three";

  // --- 1. UNIFIED THEME COLORS ---
  const deepColor = new Color("#1e3a8a"); // Deep Blue
  const surfColor = new Color("#38bdf8"); // Cyan
  const foamColor = new Color("#38bdf8"); // White Edge Glow

  // --- 2. LIQUID SHADER (Tube Version) ---
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
      // pos.y is the length of the cylinder (-5 to +5)
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
    
    varying float vElevation;
    varying vec3 vNormal;
    varying vec3 vViewPosition;

    void main() {
      // 1. COLOR GRADIENT (Pulse based)
      // Map flow (-0.05 to 0.05) to color mix
      float mixStrength = smoothstep(-0.05, 0.05, vElevation);
      vec3 color = mix(uDeepColor, uSurfColor, mixStrength);

      // 2. FRESNEL GLOW (The Pipe Walls)
      vec3 viewDir = normalize(vViewPosition);
      float fresnel = pow(1.0 - dot(vNormal, viewDir), 3.0);
      
      // Highlight edges
      color = mix(color, uFoamColor, fresnel * 0.9);

      // 3. TRANSPARENCY
      // Make the center more transparent so we can see the mascot inside
      float alpha = 0.3 + fresnel * 0.6; 

      gl_FragColor = vec4(color, alpha);
    }
  `;

  const uniforms = {
    uTime: { value: 0 },
    uDeepColor: { value: deepColor },
    uSurfColor: { value: surfColor },
    uFoamColor: { value: foamColor },
  };

  useTask((dt) => {
    uniforms.uTime.value += dt;
  });
</script>

<T.Group>
  <!-- THE LIQUID CONDUIT -->
  <T.Mesh>
    <!-- 
       Radius: 2.0, Height: 10.0
       OpenEnded: true
    -->
    <T.CylinderGeometry args={[2.0, 2.0, 10, 64, 32, true]} />
    <!-- 32 height segments for smooth waves -->

    <T.ShaderMaterial
      {vertexShader}
      {fragmentShader}
      {uniforms}
      transparent={false}
      side={DoubleSide}
    />
  </T.Mesh>

  <!-- INTERNAL GLOW RINGS (Visual Speed) -->
  <!-- Moving rings inside to emphasize flow direction -->
  {#each Array(5) as _, i}
    <T.Mesh position={[0, (i - 2) * 2, 0]} scale={[1.8, 0.05, 1.8]}>
      <T.TorusGeometry args={[1, 0.05, 16, 64]} />
      <T.MeshBasicMaterial color={surfColor} transparent opacity={0.5} />
    </T.Mesh>
  {/each}
</T.Group>
