<script lang="ts">
  import { theme } from "$lib/stores/theme";
  import { T, useTask } from "@threlte/core";
  import { Float, useGltf, interactivity, Align } from "@threlte/extras";
  import { Mesh } from "three";
  import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
  import { glassMaterial } from "./materials";

  interactivity();

  // --- Draco Decompression ---
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");

  const gltf = useGltf("/3d/contact/samsung_s24_ultra.glb", { dracoLoader });

  $: if ($gltf) {
    $gltf.scene.traverse((child) => {
      if ((child as Mesh).isMesh) {
        const mesh = child as Mesh;
        mesh.material = glassMaterial;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  }

  let rotationY = -Math.PI / 4;

  useTask((dt) => {
    rotationY += dt * 0.2;
  });
</script>

<Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
  <T.Group
    rotation.y={rotationY}
    rotation.x={0.2}
    scale={0.8}
    position.y={-0.4}
  >
    {#if $gltf}
      <Align>
        <T is={$gltf.scene} />
      </Align>
    {/if}
  </T.Group>
</Float>
