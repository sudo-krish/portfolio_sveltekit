<!-- src/lib/components/home/3d/TechCube.svelte -->
<!-- STORY: An interconnected neural network — nodes represent technologies,
     edges show how they connect. The whole mesh slowly breathes and pulses,
     showing a living, evolving tech ecosystem. -->
<script>
    import { T, useTask } from "@threlte/core";
    import { BufferGeometry, Float32BufferAttribute } from "three";

    let time = 0;
    useTask((delta) => {
        time += delta;
    });

    // Technology nodes positioned in 3D space (like a constellation)
    const nodes = [
        { pos: [0, 0.8, 0], color: "#06b6d4", label: "AWS" }, // top center
        { pos: [-0.9, 0.3, 0.3], color: "#22d3ee", label: "Kafka" }, // left
        { pos: [0.9, 0.3, -0.3], color: "#0891b2", label: "Spark" }, // right
        { pos: [-0.5, -0.5, 0.5], color: "#67e8f9", label: "Python" }, // bottom left
        { pos: [0.5, -0.5, -0.5], color: "#0e7490", label: "K8s" }, // bottom right
        { pos: [0, -0.9, 0], color: "#155e75", label: "Terraform" }, // bottom center
        { pos: [0, 0, 0.7], color: "#a5f3fc", label: "Airflow" }, // front
    ];

    // Connections between nodes (edges of the network)
    const edges = [
        [0, 1],
        [0, 2],
        [0, 6],
        [1, 3],
        [1, 6],
        [2, 4],
        [2, 6],
        [3, 5],
        [4, 5],
        [3, 6],
        [4, 6],
    ];

    // Create edge line geometry
    const edgePositions = new Float32Array(edges.length * 6);
    edges.forEach((edge, i) => {
        const a = nodes[edge[0]].pos;
        const b = nodes[edge[1]].pos;
        edgePositions[i * 6] = a[0];
        edgePositions[i * 6 + 1] = a[1];
        edgePositions[i * 6 + 2] = a[2];
        edgePositions[i * 6 + 3] = b[0];
        edgePositions[i * 6 + 4] = b[1];
        edgePositions[i * 6 + 5] = b[2];
    });
    const edgeGeo = new BufferGeometry();
    edgeGeo.setAttribute(
        "position",
        new Float32BufferAttribute(edgePositions, 3),
    );
</script>

<!-- Whole network rotates slowly -->
<T.Group rotation.y={time * 0.15}>
    <!-- Node spheres -->
    {#each nodes as node, i}
        <T.Mesh
            position={[
                node.pos[0],
                node.pos[1] + Math.sin(time * 1.2 + i * 0.8) * 0.04,
                node.pos[2],
            ]}
        >
            <T.SphereGeometry
                args={[0.08 + Math.sin(time * 2 + i) * 0.015, 16, 16]}
            />
            <T.MeshStandardMaterial
                color={node.color}
                emissive={node.color}
                emissiveIntensity={0.5 + Math.sin(time * 1.5 + i * 1.2) * 0.3}
                transparent
                opacity={0.85}
            />
        </T.Mesh>

        <!-- Glow halo around each node -->
        <T.Mesh position={node.pos}>
            <T.SphereGeometry args={[0.15, 8, 8]} />
            <T.MeshBasicMaterial
                color={node.color}
                transparent
                opacity={0.08 + Math.sin(time * 2 + i) * 0.04}
            />
        </T.Mesh>
    {/each}

    <!-- Network edges (connections) -->
    <T.LineSegments geometry={edgeGeo}>
        <T.LineBasicMaterial
            color="#06b6d4"
            transparent
            opacity={0.15 + Math.sin(time) * 0.05}
        />
    </T.LineSegments>
</T.Group>
