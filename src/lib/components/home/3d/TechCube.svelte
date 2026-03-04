<script lang="ts">
    import { T, useTask } from "@threlte/core";
    import { Float, useGltf, interactivity, Align } from "@threlte/extras";
    import { Color, DoubleSide, Mesh, ShaderMaterial } from "three";
    import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
    import * as THREE from "three";

    interactivity();

    // --- Draco Decompression ---
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");

    // --- 1. THEME: OCEANIC MACHINERY ---
    const deepColor = new Color("#1e3a8a"); // Deep Blue
    const surfColor = new Color("#38bdf8"); // Cyan
    const foamColor = new Color("#ffffff"); // White Foam

    // --- 2. SHADER (TIGHTER DISPLACEMENT) ---
    const vertexShader = `
    uniform float uTime;
    varying vec2 vUv;
    varying float vElevation;
    varying vec3 vNormal;
    varying vec3 vViewPosition;

    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
    float snoise(vec3 v) {
      const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
      const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i  = floor(v + dot(v, C.yyy) );
      vec3 x0 = v - i + dot(i, C.xxx) ;
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min( g.xyz, l.zxy );
      vec3 i2 = max( g.xyz, l.zxy );
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      i = mod289(i);
      vec4 p = permute( permute( permute( 
                 i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
               + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
               + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
      float n_ = 0.142857142857;
      vec3  ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_ );
      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4( x.xy, y.xy );
      vec4 b1 = vec4( x.zw, y.zw );
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
      vec3 p0 = vec3(a0.xy,h.x);
      vec3 p1 = vec3(a0.zw,h.y);
      vec3 p2 = vec3(a1.xy,h.z);
      vec3 p3 = vec3(a1.zw,h.w);
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
    }

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vec3 pos = position;

      float noise = snoise(pos * 3.0 + uTime * 0.8); 
      pos += normal * noise * 0.02; 

      vElevation = noise;
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
      float mixStrength = smoothstep(-0.5, 0.5, vElevation);
      vec3 color = mix(uDeepColor, uSurfColor, mixStrength);
      
      vec3 viewDir = normalize(vViewPosition);
      float fresnel = pow(1.0 - dot(vNormal, viewDir), 3.0);
      
      color = mix(color, uFoamColor, fresnel * 0.8);
      gl_FragColor = vec4(color, 0.9); 
    }
  `;

    const uniforms = {
        uTime: { value: 0 },
        uDeepColor: { value: deepColor },
        uSurfColor: { value: surfColor },
        uFoamColor: { value: foamColor },
    };

    const customMaterial = new ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms,
        transparent: true,
        side: DoubleSide,
    });

    // Load the GLTF File (Ensure this path is exactly correct relative to your static folder)
    const gltf = useGltf("/3d/skill/skill_card.glb", { dracoLoader });

    // We use Svelte's reactive statement. When the GLTF loads, we manually traverse and overwrite the materials.
    $: if ($gltf) {
        $gltf.scene.traverse((child) => {
            if ((child as Mesh).isMesh) {
                const mesh = child as Mesh;
                // Overwrite the original materials from the GLB
                // mesh.material = customMaterial;
                // Optional: Ensure shadows work
                mesh.castShadow = true;
                mesh.receiveShadow = true;
            }
        });
    }

    let rotationY = -Math.PI / 4;

    useTask((dt) => {
        uniforms.uTime.value += dt;
        // Rotate the entire GLB to simulate mechanics
        rotationY += dt * 0.2;
    });
</script>

<Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
    <T.Group rotation.y={rotationY} rotation.x={0.2} scale={0.005}>
        <!-- Reduced scale to 0.02 since the model is ~100 units wide and wrap it in Align so it spins from its center -->

        <!-- Render the GLB strictly once it exists -->
        {#if $gltf}
            <Align>
                <T is={$gltf.scene} />
            </Align>
        {/if}
    </T.Group>
</Float>
