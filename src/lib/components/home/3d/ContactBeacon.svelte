<script lang="ts">
  import { theme, themeColors, modelMaterials } from "$lib/stores/theme";
  import { T, useTask } from "@threlte/core";
  import { Float, useGltf, interactivity, Align } from "@threlte/extras";
  import { Color, DoubleSide, Mesh, ShaderMaterial } from "three";
  import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

  interactivity();

  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");

  const deepColor = new Color(modelMaterials.contactBeacon.dark.deep);
  const surfColor = new Color(modelMaterials.contactBeacon.dark.surf);
  const foamColor = new Color(modelMaterials.contactBeacon.dark.foam);

  // --- SHADER: NO DISPLACEMENT — preserve phone shape ---
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
      vElevation = sin(pos.x * 2.0 + pos.y * 2.0 + uTime * 0.5) * 0.5;
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
      float mixStrength = smoothstep(-0.5, 0.5, vElevation);
      vec3 color = mix(uDeepColor, uSurfColor, mixStrength);
      vec3 viewDir = normalize(vViewPosition);
      float fresnel = pow(1.0 - dot(vNormal, viewDir), 3.0);
      color = mix(color, uFoamColor, fresnel * 0.8);
      gl_FragColor = vec4(color, uOpacity);
    }
  `;

  const uniforms = {
    uTime: { value: 0 },
    uDeepColor: { value: deepColor },
    uSurfColor: { value: surfColor },
    uFoamColor: { value: foamColor },
    uOpacity: { value: 0.9 },
  };

  const customMaterial = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms,
    transparent: true,
    side: DoubleSide,
  });

  $: if ($theme === "light") {
    deepColor.set(modelMaterials.contactBeacon.light.deep);
    surfColor.set(modelMaterials.contactBeacon.light.surf);
    foamColor.set(modelMaterials.contactBeacon.light.foam);
    uniforms.uOpacity.value = 1.0;
    customMaterial.needsUpdate = true;
  } else {
    deepColor.set(modelMaterials.contactBeacon.dark.deep);
    surfColor.set(modelMaterials.contactBeacon.dark.surf);
    foamColor.set(modelMaterials.contactBeacon.dark.foam);
    uniforms.uOpacity.value = 0.9;
    customMaterial.needsUpdate = true;
  }

  const gltf = useGltf("/3d/contact/iphone17.glb", { dracoLoader });

  $: if ($gltf) {
    $gltf.scene.traverse((child) => {
      if ((child as Mesh).isMesh) {
        const mesh = child as Mesh;
        // mesh.material = customMaterial;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  }

  let rotationY = -Math.PI / 4;

  useTask((dt) => {
    uniforms.uTime.value += dt;
    rotationY += dt * 0.2;
  });
</script>

<Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
  <T.Group rotation.y={rotationY} rotation.x={0.2} scale={1.5}>
    {#if $gltf}
      <Align>
        <T is={$gltf.scene} />
      </Align>
    {/if}
  </T.Group>
</Float>
