<script lang="ts">
  import { T, useTask } from "@threlte/core";

  import { Color, DoubleSide } from "three";

  // Configuration
  const deepColor = new Color("#1e3a8a"); // Deep Ocean Blue
  const surfColor = new Color("#38bdf8"); // Cyan Surface
  const foamColor = new Color("#38bdf8"); // White foam tips

  // Custom Shader Material Logic
  const vertexShader = `
    uniform float uTime;
    varying vec2 vUv;
    varying float vElevation;

    // Simplex Noise (Included for brevity, usually imported)
    // Simple pseudo-random function
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vUv = uv;
      vec3 pos = position;

      // 1. Large Swells (Low frequency)
      float bigWaves = snoise(pos.xy * 0.2 + uTime * 0.3) * 0.5;

      // 2. Small Ripples (High frequency)
      float smallWaves = snoise(pos.xy * 1.5 - uTime * 0.5) * 0.15;

      // Combine
      float elevation = bigWaves + smallWaves;
      
      // Update Z (Height)
      pos.z += elevation;
      
      vElevation = elevation;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    uniform vec3 uDeepColor;
    uniform vec3 uSurfColor;
    uniform vec3 uFoamColor;
    
    varying vec2 vUv;
    varying float vElevation;

    void main() {
      // 1. Color Mixing based on height
      // Map elevation (-0.6 to 0.6) to (0.0 to 1.0)
      float mixStrength = (vElevation + 0.5) * 0.8;
      
      // Base Gradient (Deep -> Surf)
      vec3 color = mix(uDeepColor, uSurfColor, mixStrength);
      
      // Foam Tips (High elevation only)
      float foamMix = smoothstep(0.4, 0.6, vElevation);
      color = mix(color, uFoamColor, foamMix);

      // 2. Circular Alpha Mask (Fade edges)
      // Distance from center (0.5, 0.5)
      float dist = distance(vUv, vec2(0.5));
      // Fade out starting at radius 0.3, fully transparent at 0.5
      float alpha = 1.0 - smoothstep(0.3, 0.5, dist);

      gl_FragColor = vec4(color, alpha * 0.8); // 0.8 base opacity
    }
  `;

  // Shader Uniforms
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

<T.Mesh rotation.x={-Math.PI / 2}>
  <!-- 
    PlaneGeometry args: [width, height, widthSegments, heightSegments]
    128x128 segments = 16k vertices (very cheap for GPU) 
    Gives ultra-smooth water look.
  -->
  <T.PlaneGeometry args={[14, 14, 128, 128]} />
  
  <T.ShaderMaterial
    {vertexShader}
    {fragmentShader}
    {uniforms}
    transparent={true}
    side={DoubleSide}
  />
</T.Mesh>
