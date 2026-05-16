<script lang="ts">
  import { theme } from "$lib/stores/theme";
  import { T, useTask } from "@threlte/core";
  import { DoubleSide } from "three";

  const uniforms = {
    uTime: { value: 0 },
    uColorShallow: { value: [0.055, 0.647, 0.914] }, // #0ea5e9
    uColorDeep: { value: [0.012, 0.412, 0.631] },     // #0369a1
    uColorFoam: { value: [0.85, 0.95, 1.0] },         // white foam highlights
  };

  // Theme reactivity
  $: {
    if ($theme === 'light') {
      uniforms.uColorShallow.value = [0.055, 0.647, 0.914];
      uniforms.uColorDeep.value = [0.012, 0.412, 0.631];
      uniforms.uColorFoam.value = [0.85, 0.95, 1.0];
    } else {
      uniforms.uColorShallow.value = [0.035, 0.420, 0.620];
      uniforms.uColorDeep.value = [0.010, 0.220, 0.400];
      uniforms.uColorFoam.value = [0.6, 0.8, 0.9];
    }
  }

  useTask((dt) => {
    uniforms.uTime.value += dt;
  });

  const vertexShader = `
    uniform float uTime;
    varying vec2 vUv;
    varying float vElevation;
    varying vec3 vWorldNormal;
    varying vec3 vViewDir;

    void main() {
      vUv = uv;

      vec3 pos = position;

      // --- Multiple wave layers for realistic water ---
      // Large slow rolling waves
      float wave1 = sin(pos.x * 0.6 + uTime * 1.2) * 0.35;
      float wave2 = sin(pos.y * 0.5 - uTime * 0.9) * 0.25;

      // Medium cross-waves
      float wave3 = sin((pos.x + pos.y) * 0.8 + uTime * 1.6) * 0.15;

      // Small ripples
      float wave4 = sin(pos.x * 2.5 + uTime * 3.0) * 0.05;
      float wave5 = sin(pos.y * 3.0 - uTime * 2.5) * 0.04;

      float elevation = wave1 + wave2 + wave3 + wave4 + wave5;
      vElevation = elevation;

      pos.z += elevation;

      // Compute analytical normal from wave derivatives
      float dx = cos(pos.x * 0.6 + uTime * 1.2) * 0.6 * 0.35
               + cos((position.x + position.y) * 0.8 + uTime * 1.6) * 0.8 * 0.15
               + cos(position.x * 2.5 + uTime * 3.0) * 2.5 * 0.05;

      float dy = cos(position.y * 0.5 - uTime * 0.9) * 0.5 * 0.25
               + cos((position.x + position.y) * 0.8 + uTime * 1.6) * 0.8 * 0.15
               + cos(position.y * 3.0 - uTime * 2.5) * 3.0 * 0.04;

      vec3 perturbedNormal = normalize(vec3(-dx, -dy, 1.0));
      vWorldNormal = normalize(normalMatrix * perturbedNormal);

      vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
      vViewDir = normalize(-mvPos.xyz);
      gl_Position = projectionMatrix * mvPos;
    }
  `;

  const fragmentShader = `
    uniform vec3 uColorShallow;
    uniform vec3 uColorDeep;
    uniform vec3 uColorFoam;
    uniform float uTime;
    varying float vElevation;
    varying vec2 vUv;
    varying vec3 vWorldNormal;
    varying vec3 vViewDir;

    void main() {
      // --- Depth coloring based on wave height ---
      float depthMix = smoothstep(-0.5, 0.5, vElevation);
      vec3 waterColor = mix(uColorDeep, uColorShallow, depthMix);

      // --- Foam on wave crests ---
      float foamMask = smoothstep(0.3, 0.6, vElevation);
      waterColor = mix(waterColor, uColorFoam, foamMask * 0.35);

      // --- Fresnel rim for that glassy water edge ---
      float fresnel = pow(1.0 - max(dot(vWorldNormal, vViewDir), 0.0), 4.0);
      waterColor = mix(waterColor, uColorFoam, fresnel * 0.5);

      // --- Subtle specular highlight (fake sun reflection) ---
      vec3 lightDir = normalize(vec3(0.5, 1.0, 0.8));
      vec3 halfDir = normalize(lightDir + vViewDir);
      float spec = pow(max(dot(vWorldNormal, halfDir), 0.0), 64.0);
      waterColor += vec3(1.0) * spec * 0.3;

      // --- Circular edge fade for bounded lake shape ---
      float dist = distance(vUv, vec2(0.5));
      float edgeAlpha = 1.0 - smoothstep(0.35, 0.5, dist);

      gl_FragColor = vec4(waterColor, 0.88 * edgeAlpha);
    }
  `;
</script>

<T.Mesh rotation.x={-Math.PI / 2}>
  <T.PlaneGeometry args={[18, 18, 200, 200]} />
  <T.ShaderMaterial
    {vertexShader}
    {fragmentShader}
    {uniforms}
    transparent={true}
    side={DoubleSide}
    depthWrite={false}
  />
</T.Mesh>
