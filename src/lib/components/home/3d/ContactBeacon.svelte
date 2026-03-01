<!-- src/lib/components/home/3d/ContactBeacon.svelte -->
<!-- STORY: A communication beacon — a central pulsing core emitting
     expanding signal rings outward, like a radio tower broadcasting
     a connection signal. Small particles orbit like incoming/outgoing messages. -->
<script>
    import { T, useTask } from "@threlte/core";
    import { BufferGeometry, Float32BufferAttribute } from "three";

    let time = 0;
    useTask((delta) => {
        time += delta;
    });

    // Signal rings that expand outward (3 rings at different life stages)
    const ringCount = 4;

    // Message particles orbiting the beacon
    const msgCount = 30;
    const msgPos = new Float32Array(msgCount * 3);
    for (let i = 0; i < msgCount; i++) {
        const angle = (i / msgCount) * Math.PI * 2;
        const r = 0.5 + Math.random() * 0.4;
        msgPos[i * 3] = Math.cos(angle) * r;
        msgPos[i * 3 + 1] = (Math.random() - 0.5) * 0.8;
        msgPos[i * 3 + 2] = Math.sin(angle) * r;
    }
    const msgGeo = new BufferGeometry();
    msgGeo.setAttribute("position", new Float32BufferAttribute(msgPos, 3));

    // Antenna structure lines
    const antennaHeight = 0.8;
</script>

<T.Group>
    <!-- Central beacon core (pulsing) -->
    <T.Mesh>
        <T.SphereGeometry args={[0.12 + Math.sin(time * 3) * 0.02, 16, 16]} />
        <T.MeshStandardMaterial
            color="#ec4899"
            emissive="#ec4899"
            emissiveIntensity={0.8 + Math.sin(time * 3) * 0.4}
            transparent
            opacity={0.95}
        />
    </T.Mesh>

    <!-- Beacon glow halo -->
    <T.Mesh>
        <T.SphereGeometry args={[0.25, 12, 12]} />
        <T.MeshBasicMaterial
            color="#ec4899"
            transparent
            opacity={0.1 + Math.sin(time * 3) * 0.06}
        />
    </T.Mesh>

    <!-- Antenna mast (vertical line upward) -->
    <T.Mesh position={[0, antennaHeight / 2 + 0.12, 0]}>
        <T.CylinderGeometry args={[0.012, 0.02, antennaHeight, 6]} />
        <T.MeshStandardMaterial
            color="#f472b6"
            emissive="#f472b6"
            emissiveIntensity={0.3}
            transparent
            opacity={0.6}
        />
    </T.Mesh>

    <!-- Antenna tip -->
    <T.Mesh position={[0, antennaHeight + 0.15, 0]}>
        <T.SphereGeometry args={[0.04, 8, 8]} />
        <T.MeshStandardMaterial
            color="#f9a8d4"
            emissive="#f9a8d4"
            emissiveIntensity={1.0 + Math.sin(time * 4) * 0.5}
            transparent
            opacity={0.9}
        />
    </T.Mesh>

    <!-- Expanding signal rings -->
    {#each Array(ringCount) as _, i}
        {@const phase = (time * 0.5 + i * 0.7) % 3}
        {@const ringR = 0.2 + phase * 0.4}
        {@const ringOpacity = Math.max(0, 0.3 - phase * 0.1)}
        <T.Mesh position={[0, 0, 0]} rotation.x={Math.PI / 2}>
            <T.TorusGeometry args={[ringR, 0.008, 8, 48]} />
            <T.MeshStandardMaterial
                color="#f472b6"
                emissive="#f472b6"
                emissiveIntensity={0.5}
                transparent
                opacity={ringOpacity}
            />
        </T.Mesh>
    {/each}

    <!-- Orbiting message particles -->
    <T.Points geometry={msgGeo} rotation.y={time * 0.4}>
        <T.PointsMaterial
            size={0.03}
            color="#f9a8d4"
            transparent
            opacity={0.5}
            sizeAttenuation={true}
        />
    </T.Points>

    <!-- Base platform -->
    <T.Mesh position={[0, -0.15, 0]} rotation.x={Math.PI / 2}>
        <T.CylinderGeometry args={[0.25, 0.25, 0.03, 6]} />
        <T.MeshStandardMaterial
            color="#831843"
            emissive="#ec4899"
            emissiveIntensity={0.1}
            transparent
            opacity={0.4}
            metalness={0.8}
            roughness={0.3}
        />
    </T.Mesh>
</T.Group>
