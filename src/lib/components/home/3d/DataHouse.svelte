<script lang="ts">
  import { T, useTask } from "@threlte/core";
  import { Float } from "@threlte/extras";
  import * as THREE from "three";
  import { Color, Vector2 } from "three";

  // --- 1. GEOMETRY: HOUSE PROFILE ---
  const points = [];
  points.push(new Vector2(0.0, 0.0));     // Center Bottom
  points.push(new Vector2(0.8, 0.0));     // Floor radius
  points.push(new Vector2(1.0, 0.2));     // Rounded corner
  points.push(new Vector2(1.0, 1.2));     // Wall top
  points.push(new Vector2(1.4, 1.25));    // Eaves start
  points.push(new Vector2(1.4, 1.35));    // Eaves thick
  points.push(new Vector2(0.6, 2.2));     // Roof curve control
  points.push(new Vector2(0.0, 2.8));     // Tip

  // --- 2. SHADER CONFIG (Matching the Lake) ---
  const deepColor = new Color("#1e3a8a"); // Deep Ocean Blue
  const surfColor = new Color("#38bdf8"); // Cyan Surface
  const foamColor = new Color("#ffffff"); // White Highlights

  const vertexShader = `
    uniform float uTime;
    varying vec2 vUv;
    varying float vElevation;
    varying vec3 vNormal;
    varying vec3 vViewPosition;

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);

      // --- WATER WOBBLE ANIMATION ---
      vec3 pos = position;
      
      // Vertical Pulse (breathing)
      float pulse = sin(pos.y * 2.0 - uTime * 2.0) * 0.05;
      
      // Horizontal Ripple (twist)
      float twist = sin(pos.y * 3.0 + uTime) * 0.1;
      float tx = pos.x * cos(twist) - pos.z * sin(twist);
      float tz = pos.x * sin(twist) + pos.z * cos(twist);
      
      pos.x = tx + normal.x * pulse;
      pos.z = tz + normal.z * pulse;

      // Pass elevation for color mixing
      vElevation = pos.y + pulse; // Height based

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
      // 1. VERTICAL GRADIENT (Deep at bottom, Cyan at top)
      // Map height (0.0 to 2.8) to (0.0 to 1.0)
      float mixStrength = smoothstep(0.0, 2.5, vElevation);
      vec3 color = mix(uDeepColor, uSurfColor, mixStrength);

      // 2. FRESNEL GLOW (The "Gel" Look)
      // Makes edges glow like the lake foam
      vec3 viewDir = normalize(vViewPosition);
      float fresnel = pow(1.0 - dot(vNormal, viewDir), 2.0);
      
      // Mix foam color on edges
      color = mix(color, uFoamColor, fresnel * 0.6);

      // 3. INNER GLOW (Fake subsurface scattering)
      // Add extra brightness to the center of the volume
      color += uSurfColor * 0.2;

      gl_FragColor = vec4(color, 0.85); // Slight transparency
    }
  `;

  const uniforms = {
    uTime: { value: 0 },
    uDeepColor: { value: deepColor },
    uSurfColor: { value: surfColor },
    uFoamColor: { value: foamColor }
  };

  useTask((dt) => {
    uniforms.uTime.value += dt;
  });

</script>

<Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
  <T.Group position.y={-1.5}>
    
    <!-- THE WATER HOUSE -->
    <T.Mesh>
      <T.LatheGeometry args={[points, 64]} />
      
      <T.ShaderMaterial
        {vertexShader}
        {fragmentShader}
        {uniforms}
        transparent={true}
        side={THREE.DoubleSide}
      />
    </T.Mesh>

    <!-- INNER SOUL (Optional, keeps the core concept) -->
    <T.Mesh position.y={1.0}>
       <T.IcosahedronGeometry args={[0.4, 1]} />
       <T.MeshBasicMaterial color="#ffffff" transparent opacity={0.6} />
    </T.Mesh>

  </T.Group>
</Float>
