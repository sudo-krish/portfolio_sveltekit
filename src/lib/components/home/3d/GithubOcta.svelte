<!-- src/lib/components/home/3d/GithubOcta.svelte -->
<!-- STORY: A git branch tree — a central trunk with branches forking outward,
     each branch tipped with a glowing commit node. Small particles flow along
     the branches like data/code being pushed. -->
<script>
    import { T, useTask } from "@threlte/core";
    import { BufferGeometry, Float32BufferAttribute } from "three";

    let time = 0;
    useTask((delta) => {
        time += delta;
    });

    // Branch structure: trunk + 3 branches forking off
    const branches = [
        // Main trunk (vertical)
        {
            from: [0, -1.0, 0],
            to: [0, 0.8, 0],
            color: "#10b981",
            thickness: 0.025,
        },
        // Feature branch 1 (left)
        {
            from: [0, 0.0, 0],
            to: [-0.8, 0.6, 0.3],
            color: "#34d399",
            thickness: 0.018,
        },
        // Feature branch 2 (right)
        {
            from: [0, 0.3, 0],
            to: [0.7, 0.9, -0.2],
            color: "#6ee7b7",
            thickness: 0.018,
        },
        // Hotfix branch
        {
            from: [0, -0.3, 0],
            to: [-0.6, -0.1, -0.4],
            color: "#a7f3d0",
            thickness: 0.015,
        },
    ];

    // Commit nodes (glowing dots at branch tips and key points)
    const commits = [
        { pos: [0, -1.0, 0], color: "#10b981", size: 0.06 },
        { pos: [0, -0.3, 0], color: "#10b981", size: 0.05 },
        { pos: [0, 0.0, 0], color: "#10b981", size: 0.05 },
        { pos: [0, 0.3, 0], color: "#10b981", size: 0.05 },
        { pos: [0, 0.8, 0], color: "#34d399", size: 0.07 }, // HEAD
        { pos: [-0.8, 0.6, 0.3], color: "#34d399", size: 0.06 }, // branch tip
        { pos: [0.7, 0.9, -0.2], color: "#6ee7b7", size: 0.06 }, // branch tip
        { pos: [-0.6, -0.1, -0.4], color: "#a7f3d0", size: 0.05 }, // branch tip
    ];

    // Flow particles along the trunk
    const flowCount = 40;
    const flowPositions = new Float32Array(flowCount * 3);
    for (let i = 0; i < flowCount; i++) {
        flowPositions[i * 3] = (Math.random() - 0.5) * 0.1;
        flowPositions[i * 3 + 1] = Math.random() * 2 - 1;
        flowPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.1;
    }
    const flowGeo = new BufferGeometry();
    flowGeo.setAttribute(
        "position",
        new Float32BufferAttribute(flowPositions, 3),
    );
</script>

<T.Group rotation.y={time * 0.1}>
    <!-- Branch lines -->
    {#each branches as branch}
        {@const dx = branch.to[0] - branch.from[0]}
        {@const dy = branch.to[1] - branch.from[1]}
        {@const dz = branch.to[2] - branch.from[2]}
        {@const length = Math.sqrt(dx * dx + dy * dy + dz * dz)}
        {@const mx = (branch.from[0] + branch.to[0]) / 2}
        {@const my = (branch.from[1] + branch.to[1]) / 2}
        {@const mz = (branch.from[2] + branch.to[2]) / 2}
        <T.Mesh
            position={[mx, my, mz]}
            rotation.z={Math.atan2(dx, dy) * -1}
            rotation.x={Math.atan2(dz, Math.sqrt(dx * dx + dy * dy))}
        >
            <T.CylinderGeometry
                args={[branch.thickness, branch.thickness, length, 6]}
            />
            <T.MeshStandardMaterial
                color={branch.color}
                emissive={branch.color}
                emissiveIntensity={0.3}
                transparent
                opacity={0.5}
            />
        </T.Mesh>
    {/each}

    <!-- Commit nodes -->
    {#each commits as c, i}
        <T.Mesh position={c.pos}>
            <T.SphereGeometry
                args={[c.size + Math.sin(time * 2 + i * 0.7) * 0.01, 12, 12]}
            />
            <T.MeshStandardMaterial
                color={c.color}
                emissive={c.color}
                emissiveIntensity={0.6 + Math.sin(time * 2.5 + i) * 0.3}
                transparent
                opacity={0.9}
            />
        </T.Mesh>
    {/each}

    <!-- HEAD label glow (brightest commit) -->
    <T.Mesh position={[0, 0.8, 0]}>
        <T.SphereGeometry args={[0.14, 8, 8]} />
        <T.MeshBasicMaterial
            color="#34d399"
            transparent
            opacity={0.12 + Math.sin(time * 3) * 0.06}
        />
    </T.Mesh>

    <!-- Flow particles (code being pushed) -->
    <T.Points geometry={flowGeo} position.y={((time * 0.3) % 2) - 1}>
        <T.PointsMaterial
            size={0.02}
            color="#6ee7b7"
            transparent
            opacity={0.5}
            sizeAttenuation={true}
        />
    </T.Points>
</T.Group>
