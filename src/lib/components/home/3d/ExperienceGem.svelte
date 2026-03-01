<!-- src/lib/components/home/3d/ExperienceGem.svelte -->
<!-- STORY: A career staircase ascending from below — each step represents a role,
     glowing brighter as it gets higher. Particles drift upward like ambitions rising. -->
<script>
    import { T, useTask } from "@threlte/core";
    import { BufferGeometry, Float32BufferAttribute } from "three";

    let time = 0;
    useTask((delta) => {
        time += delta;
    });

    // Career staircase: 4 ascending steps
    const steps = [
        {
            x: -0.8,
            y: -0.9,
            z: 0,
            w: 0.5,
            h: 0.12,
            d: 0.5,
            color: "#1e40af",
            emissive: 0.1,
        },
        {
            x: -0.3,
            y: -0.45,
            z: 0,
            w: 0.5,
            h: 0.12,
            d: 0.5,
            color: "#2563eb",
            emissive: 0.2,
        },
        {
            x: 0.2,
            y: 0.0,
            z: 0,
            w: 0.5,
            h: 0.12,
            d: 0.5,
            color: "#3b82f6",
            emissive: 0.3,
        },
        {
            x: 0.7,
            y: 0.45,
            z: 0,
            w: 0.5,
            h: 0.12,
            d: 0.5,
            color: "#60a5fa",
            emissive: 0.5,
        },
    ];

    // Rising ambition particles
    const particleCount = 80;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
        particlePositions[i * 3] = (Math.random() - 0.5) * 2.0;
        particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 2.5;
        particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 1.5;
    }
    const particleGeo = new BufferGeometry();
    particleGeo.setAttribute(
        "position",
        new Float32BufferAttribute(particlePositions, 3),
    );
</script>

<!-- Career staircase -->
{#each steps as step, i}
    <T.Mesh
        position={[
            step.x,
            step.y + Math.sin(time * 0.8 + i * 0.5) * 0.03,
            step.z,
        ]}
    >
        <T.BoxGeometry args={[step.w, step.h, step.d]} />
        <T.MeshStandardMaterial
            color={step.color}
            transparent
            opacity={0.6}
            emissive={step.color}
            emissiveIntensity={step.emissive + Math.sin(time * 1.5 + i) * 0.1}
            metalness={0.8}
            roughness={0.2}
        />
    </T.Mesh>
{/each}

<!-- Glowing figure on the top step -->
<T.Mesh position={[0.7, 0.75, 0]}>
    <T.SphereGeometry args={[0.1, 16, 16]} />
    <T.MeshStandardMaterial
        color="#93c5fd"
        emissive="#93c5fd"
        emissiveIntensity={0.8 + Math.sin(time * 2) * 0.3}
        transparent
        opacity={0.9}
    />
</T.Mesh>

<!-- Rising particles (ambitions) -->
<T.Points geometry={particleGeo} position.y={((time * 0.05) % 3) - 1.5}>
    <T.PointsMaterial
        size={0.025}
        color="#60a5fa"
        transparent
        opacity={0.4}
        sizeAttenuation={true}
    />
</T.Points>

<!-- Vertical connecting line (growth trajectory) -->
<T.Mesh position={[0, -0.2, -0.3]} rotation.z={0.48}>
    <T.CylinderGeometry args={[0.008, 0.008, 2.2, 8]} />
    <T.MeshStandardMaterial
        color="#3b82f6"
        emissive="#3b82f6"
        emissiveIntensity={0.3}
        transparent
        opacity={0.25}
    />
</T.Mesh>
