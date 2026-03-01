<!-- src/lib/components/home/3d/ImpactTorus.svelte -->
<!-- STORY: A data pipeline fountain — particles flow upward through a central
     channel, hit the top, and cascade outward in rings. Represents the upward
     trajectory of impact metrics: data in → processed → value out. -->
<script>
    import { T, useTask } from "@threlte/core";
    import { BufferGeometry, Float32BufferAttribute } from "three";

    let time = 0;
    useTask((delta) => {
        time += delta;
    });

    // Central upward stream particles
    const streamCount = 60;
    const streamPos = new Float32Array(streamCount * 3);
    for (let i = 0; i < streamCount; i++) {
        streamPos[i * 3] = (Math.random() - 0.5) * 0.15;
        streamPos[i * 3 + 1] = Math.random() * 2;
        streamPos[i * 3 + 2] = (Math.random() - 0.5) * 0.15;
    }
    const streamGeo = new BufferGeometry();
    streamGeo.setAttribute(
        "position",
        new Float32BufferAttribute(streamPos, 3),
    );

    // Cascade ring particles (spread outward at top)
    const cascadeCount = 120;
    const cascadePos = new Float32Array(cascadeCount * 3);
    for (let i = 0; i < cascadeCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const r = 0.3 + Math.random() * 0.8;
        cascadePos[i * 3] = Math.cos(angle) * r;
        cascadePos[i * 3 + 1] = 0.8 - Math.random() * 0.4;
        cascadePos[i * 3 + 2] = Math.sin(angle) * r;
    }
    const cascadeGeo = new BufferGeometry();
    cascadeGeo.setAttribute(
        "position",
        new Float32BufferAttribute(cascadePos, 3),
    );

    // Impact rings at different heights
    const rings = [
        { y: 0.5, r: 0.5, color: "#a855f7", opacity: 0.2 },
        { y: 0.2, r: 0.7, color: "#c084fc", opacity: 0.15 },
        { y: -0.1, r: 0.9, color: "#d8b4fe", opacity: 0.1 },
    ];
</script>

<T.Group rotation.y={time * 0.1}>
    <!-- Central data stream (particles going up) -->
    <T.Points geometry={streamGeo} position.y={((time * 0.5) % 2) - 1}>
        <T.PointsMaterial
            size={0.035}
            color="#a855f7"
            transparent
            opacity={0.7}
            sizeAttenuation={true}
        />
    </T.Points>

    <!-- Value cascade (particles spreading outward at top) -->
    <T.Points geometry={cascadeGeo} rotation.y={time * 0.3}>
        <T.PointsMaterial
            size={0.025}
            color="#c084fc"
            transparent
            opacity={0.35 + Math.sin(time * 1.5) * 0.1}
            sizeAttenuation={true}
        />
    </T.Points>

    <!-- Impact rings (ripples of influence) -->
    {#each rings as ring, i}
        <T.Mesh position={[0, ring.y, 0]} rotation.x={Math.PI / 2}>
            <T.TorusGeometry
                args={[ring.r + Math.sin(time * 0.8 + i) * 0.05, 0.015, 8, 48]}
            />
            <T.MeshStandardMaterial
                color={ring.color}
                emissive={ring.color}
                emissiveIntensity={0.4}
                transparent
                opacity={ring.opacity + Math.sin(time * 1.2 + i * 1) * 0.05}
            />
        </T.Mesh>
    {/each}

    <!-- Central core (the engine) -->
    <T.Mesh position={[0, -0.5, 0]}>
        <T.OctahedronGeometry args={[0.15, 0]} />
        <T.MeshStandardMaterial
            color="#a855f7"
            emissive="#a855f7"
            emissiveIntensity={0.8 + Math.sin(time * 3) * 0.3}
            transparent
            opacity={0.9}
        />
    </T.Mesh>
</T.Group>
