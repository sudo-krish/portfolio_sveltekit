<script lang="ts">
    import { T, useTask } from "@threlte/core";
    import { Float, interactivity } from "@threlte/extras";
    import { Color, DoubleSide, MathUtils } from "three";
    import * as THREE from "three";

    interactivity();

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

    // (Standard Noise Function Omitted for brevity, assumed same as before)
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

      // Reduced noise amplitude (0.02) to keep edges sharp, increased frequency (3.0) for "ripples"
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
      
      // Sharper Fresnel for "Metallic Liquid" look
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

    // --- 3. MECHANICS ---
    const crankRadius = 0.35;
    const rodLength = 1.0;
    let crankAngle = 0;

    function getPistonData(angleOffset: number) {
        const theta = crankAngle + angleOffset;
        const sinTheta = Math.sin(theta);
        const cosTheta = Math.cos(theta);
        const pistonLocalY =
            crankRadius * cosTheta +
            Math.sqrt(rodLength ** 2 - (crankRadius * sinTheta) ** 2);
        const rodRock = Math.asin((crankRadius * sinTheta) / rodLength);
        return { y: pistonLocalY - 1.0, rot: rodRock };
    }

    useTask((dt) => {
        crankAngle -= dt * 4;
        uniforms.uTime.value += dt;
    });
</script>

<Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
    <!-- SCALING: 0.65 for compact but detailed look -->
    <T.Group rotation.y={-Math.PI / 4} rotation.x={0.2} scale={0.65}>
        <!-- === 1. ENGINE BLOCK (Structural) === -->

        <!-- The "V" Valley -->
        <T.Mesh position={[0, -0.4, 0]} rotation.x={Math.PI / 2}>
            <T.CylinderGeometry args={[0.4, 0.6, 3.8, 4]} />
            <!-- 4 segments = Diamond/V shape -->
            <T.ShaderMaterial
                {vertexShader}
                {fragmentShader}
                {uniforms}
                transparent
            />
        </T.Mesh>

        <!-- Oil Pan (Squared off bottom) -->
        <T.Mesh position={[0, -0.9, 0]}>
            <T.BoxGeometry args={[0.9, 0.4, 3.0]} />
            <T.ShaderMaterial
                {vertexShader}
                {fragmentShader}
                {uniforms}
                transparent
            />
        </T.Mesh>

        <!-- === 2. CYLINDER HEADS & INTAKE === -->

        <!-- Left Head -->
        <T.Group rotation.z={Math.PI / 4} position={[-0.45, 0.2, 0]}>
            <!-- Head Casting -->
            <T.Mesh position={[0, 0.6, 0]}>
                <T.BoxGeometry args={[0.6, 1.2, 3.6]} />
                <T.ShaderMaterial
                    {vertexShader}
                    {fragmentShader}
                    {uniforms}
                    transparent
                />
            </T.Mesh>
            <!-- Valve Cover (Beveled look via scaled cylinder) -->
            <T.Mesh position={[0, 1.3, 0]} scale={[1, 0.3, 1]}>
                <T.CylinderGeometry args={[0.3, 0.4, 3.5, 16]} />
                <T.ShaderMaterial
                    {vertexShader}
                    {fragmentShader}
                    {uniforms}
                    transparent
                />
            </T.Mesh>
            <!-- Exhaust Headers (Curved Tubes) -->
            {#each Array(4) as _, i}
                <T.Mesh
                    position={[-0.4, 0.6, (i - 1.5) * 0.9]}
                    rotation.z={Math.PI / 2}
                >
                    <T.TorusGeometry args={[0.3, 0.08, 16, 16, Math.PI / 2]} />
                    <T.ShaderMaterial
                        {vertexShader}
                        {fragmentShader}
                        {uniforms}
                        transparent
                    />
                </T.Mesh>
            {/each}
        </T.Group>

        <!-- Right Head -->
        <T.Group rotation.z={-Math.PI / 4} position={[0.45, 0.2, 0]}>
            <T.Mesh position={[0, 0.6, 0]}>
                <T.BoxGeometry args={[0.6, 1.2, 3.6]} />
                <T.ShaderMaterial
                    {vertexShader}
                    {fragmentShader}
                    {uniforms}
                    transparent
                />
            </T.Mesh>
            <T.Mesh position={[0, 1.3, 0]} scale={[1, 0.3, 1]}>
                <T.CylinderGeometry args={[0.3, 0.4, 3.5, 16]} />
                <T.ShaderMaterial
                    {vertexShader}
                    {fragmentShader}
                    {uniforms}
                    transparent
                />
            </T.Mesh>
            <!-- Exhaust Headers -->
            {#each Array(4) as _, i}
                <T.Mesh
                    position={[0.4, 0.6, (i - 1.5) * 0.9]}
                    rotation.z={-Math.PI / 2}
                    rotation.y={Math.PI}
                >
                    <T.TorusGeometry args={[0.3, 0.08, 16, 16, Math.PI / 2]} />
                    <T.ShaderMaterial
                        {vertexShader}
                        {fragmentShader}
                        {uniforms}
                        transparent
                    />
                </T.Mesh>
            {/each}
        </T.Group>

        <!-- Intake Manifold (The "Spider") -->
        <T.Group position={[0, 1.0, 0]}>
            <!-- Plenum -->
            <T.Mesh>
                <T.BoxGeometry args={[0.5, 0.2, 2.8]} />
                <T.ShaderMaterial
                    {vertexShader}
                    {fragmentShader}
                    {uniforms}
                    transparent
                />
            </T.Mesh>
            <!-- Runners -->
            {#each Array(4) as _, i}
                <T.Mesh
                    position={[0, -0.2, (i - 1.5) * 0.7]}
                    rotation.z={Math.PI / 2}
                >
                    <T.CylinderGeometry args={[0.06, 0.06, 0.8, 8]} />
                    <T.ShaderMaterial
                        {vertexShader}
                        {fragmentShader}
                        {uniforms}
                        transparent
                    />
                </T.Mesh>
            {/each}
        </T.Group>

        <!-- === 3. ROTATING INTERNALS === -->
        <T.Group rotation.z={crankAngle}>
            <!-- Crank Shaft -->
            <T.Mesh rotation.x={Math.PI / 2}>
                <T.CylinderGeometry args={[0.08, 0.08, 4.0, 16]} />
                <T.ShaderMaterial
                    {vertexShader}
                    {fragmentShader}
                    {uniforms}
                    transparent
                />
            </T.Mesh>
            <!-- Counterweights -->
            {#each Array(4) as _, i}
                <T.Group position={[0, 0, (i - 1.5) * 1.0]}>
                    <T.Mesh position.y={-0.2}>
                        <T.BoxGeometry args={[0.15, 0.35, 0.1]} />
                        <T.ShaderMaterial
                            {vertexShader}
                            {fragmentShader}
                            {uniforms}
                            transparent
                        />
                    </T.Mesh>
                </T.Group>
            {/each}
        </T.Group>

        <!-- Front Pulleys -->
        <T.Group position={[0, 0, 2.1]}>
            <!-- Main Pulley -->
            <T.Mesh rotation.x={Math.PI / 2} rotation.y={crankAngle}>
                <T.CylinderGeometry args={[0.3, 0.3, 0.1, 32]} />
                <T.ShaderMaterial
                    {vertexShader}
                    {fragmentShader}
                    {uniforms}
                    transparent
                />
            </T.Mesh>
            <!-- Top Fan/Pulley -->
            <T.Mesh
                position={[0, 1.0, 0]}
                rotation.x={Math.PI / 2}
                rotation.y={crankAngle * 1.5}
            >
                <T.CylinderGeometry args={[0.2, 0.2, 0.1, 32]} />
                <T.ShaderMaterial
                    {vertexShader}
                    {fragmentShader}
                    {uniforms}
                    transparent
                />
            </T.Mesh>
            <!-- Belt (Simplified Ring) -->
            <T.Mesh position={[0, 0.5, 0]} scale={[1, 1.8, 1]}>
                <T.RingGeometry args={[0.28, 0.32, 32]} />
                <T.ShaderMaterial
                    {vertexShader}
                    {fragmentShader}
                    {uniforms}
                    transparent
                    side={DoubleSide}
                />
            </T.Mesh>
        </T.Group>

        <!-- === 4. PISTONS (Visible through "Liquid" block) === -->

        <!-- Left Bank Pistons -->
        <T.Group rotation.z={Math.PI / 4} position={[-0.45, 0.2, 0]}>
            {#each [0, 90, 270, 180] as degrees, i}
                {@const offset = degrees * (Math.PI / 180)}
                {@const data = getPistonData(offset)}
                <T.Group position={[0, 0, (i - 1.5) * 0.9]}>
                    <T.Mesh position.y={data.y + 1.2}>
                        <T.CylinderGeometry args={[0.33, 0.33, 0.4, 32]} />
                        <T.ShaderMaterial
                            {vertexShader}
                            {fragmentShader}
                            {uniforms}
                            transparent
                        />
                    </T.Mesh>
                    <T.Mesh
                        position.y={data.y + 0.9}
                        rotation.z={data.rot}
                        position.x={-Math.sin(data.rot) * 0.4}
                    >
                        <T.CylinderGeometry args={[0.07, 0.09, rodLength, 8]} />
                        <T.ShaderMaterial
                            {vertexShader}
                            {fragmentShader}
                            {uniforms}
                            transparent
                        />
                    </T.Mesh>
                </T.Group>
            {/each}
        </T.Group>

        <!-- Right Bank Pistons -->
        <T.Group rotation.z={-Math.PI / 4} position={[0.45, 0.2, 0]}>
            {#each [0, 90, 270, 180] as degrees, i}
                {@const offset = (degrees + 90) * (Math.PI / 180)}
                {@const data = getPistonData(offset)}
                <T.Group position={[0, 0, (i - 1.5) * 0.9 + 0.15]}>
                    <T.Mesh position.y={data.y + 1.2}>
                        <T.CylinderGeometry args={[0.33, 0.33, 0.4, 32]} />
                        <T.ShaderMaterial
                            {vertexShader}
                            {fragmentShader}
                            {uniforms}
                            transparent
                        />
                    </T.Mesh>
                    <T.Mesh
                        position.y={data.y + 0.9}
                        rotation.z={-data.rot}
                        position.x={Math.sin(data.rot) * 0.4}
                    >
                        <T.CylinderGeometry args={[0.07, 0.09, rodLength, 8]} />
                        <T.ShaderMaterial
                            {vertexShader}
                            {fragmentShader}
                            {uniforms}
                            transparent
                        />
                    </T.Mesh>
                </T.Group>
            {/each}
        </T.Group>
    </T.Group>
</Float>
