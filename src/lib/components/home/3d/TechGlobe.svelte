<!-- src/lib/components/home/3d/TechGlobe.svelte -->
<script>
  import { T, useTask } from "@threlte/core";
  import { BufferGeometry, Float32BufferAttribute } from "three";

  // Create a sphere of points
  const count = 3000;
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const r = 4; // radius
    const theta = 2 * Math.PI * Math.random();
    const phi = Math.acos(2 * Math.random() - 1);

    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));

  let rotation = 0;

  // FIXED: Replaced useFrame with useTask
  useTask((delta) => {
    rotation += delta * 0.1;
  });
</script>

<T.Points {geometry} rotation.y={rotation}>
  <T.PointsMaterial
    size={0.05}
    color="#4f46e5"
    transparent
    opacity={0.8}
    sizeAttenuation={true}
  />
</T.Points>

<!-- Inner Core wireframe -->
<T.Mesh rotation.y={-rotation}>
  <T.IcosahedronGeometry args={[3.8, 2]} />
  <T.MeshBasicMaterial color="#ec4899" wireframe transparent opacity={0.1} />
</T.Mesh>
