<!-- src/lib/components/home/3d/CredentialShield.svelte -->
<!-- STORY: A floating achievement badge — a shield shape with orbiting
     certification stars. Each star pulses when it passes the front,
     like badges being validated. A protective aura surrounds the whole structure. -->
<script>
    import { T, useTask } from "@threlte/core";
    import { BufferGeometry, Float32BufferAttribute } from "three";

    let time = 0;
    useTask((delta) => {
        time += delta;
    });

    // Orbiting certification stars (3 certs = 3 orbiting objects)
    const certCount = 3;
    const certColors = ["#f97316", "#fb923c", "#fdba74"];

    // Shield aura particles
    const auraCount = 100;
    const auraPos = new Float32Array(auraCount * 3);
    for (let i = 0; i < auraCount; i++) {
        const r = 0.7 + Math.random() * 0.3;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        auraPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        auraPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
        auraPos[i * 3 + 2] = r * Math.cos(phi) * 0.3;
    }
    const auraGeo = new BufferGeometry();
    auraGeo.setAttribute("position", new Float32BufferAttribute(auraPos, 3));
</script>

<T.Group rotation.y={time * 0.08}>
    <!-- Central shield (dodecahedron = multi-faceted like a gem) -->
    <T.Mesh>
        <T.DodecahedronGeometry args={[0.4, 0]} />
        <T.MeshStandardMaterial
            color="#f97316"
            emissive="#f97316"
            emissiveIntensity={0.4 + Math.sin(time * 1.5) * 0.15}
            transparent
            opacity={0.7}
            metalness={0.9}
            roughness={0.1}
        />
    </T.Mesh>

    <!-- Shield wireframe outer layer -->
    <T.Mesh rotation.y={-time * 0.15}>
        <T.DodecahedronGeometry args={[0.55, 0]} />
        <T.MeshStandardMaterial
            color="#fb923c"
            wireframe
            transparent
            opacity={0.2}
            emissive="#fb923c"
            emissiveIntensity={0.2}
        />
    </T.Mesh>

    <!-- Orbiting certification badges -->
    {#each Array(certCount) as _, i}
        {@const angle = time * 0.6 + (i * Math.PI * 2) / certCount}
        {@const orbitR = 0.85}
        <T.Mesh
            position={[
                Math.cos(angle) * orbitR,
                Math.sin(angle * 0.5) * 0.2,
                Math.sin(angle) * orbitR,
            ]}
        >
            <T.SphereGeometry
                args={[0.06 + Math.sin(time * 3 + i * 2) * 0.01, 8, 8]}
            />
            <T.MeshStandardMaterial
                color={certColors[i]}
                emissive={certColors[i]}
                emissiveIntensity={0.7 + Math.sin(time * 2 + i * 1.5) * 0.3}
                transparent
                opacity={0.9}
            />
        </T.Mesh>

        <!-- Trail glow behind each orbiting cert -->
        <T.Mesh
            position={[
                Math.cos(angle - 0.3) * orbitR,
                Math.sin((angle - 0.3) * 0.5) * 0.2,
                Math.sin(angle - 0.3) * orbitR,
            ]}
        >
            <T.SphereGeometry args={[0.04, 6, 6]} />
            <T.MeshBasicMaterial
                color={certColors[i]}
                transparent
                opacity={0.2}
            />
        </T.Mesh>
    {/each}

    <!-- Protective aura -->
    <T.Points geometry={auraGeo} rotation.y={time * 0.2}>
        <T.PointsMaterial
            size={0.02}
            color="#fdba74"
            transparent
            opacity={0.25}
            sizeAttenuation={true}
        />
    </T.Points>
</T.Group>
