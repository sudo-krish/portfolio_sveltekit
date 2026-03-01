<!-- src/lib/components/home/3d/HomeScene.svelte -->
<script lang="ts">
  import { T, useThrelte } from "@threlte/core";
  import { Environment, Float } from "@threlte/extras";
  import gsap from "gsap";
  import { onMount } from "svelte";

  import DataMascot from "./DataMascot.svelte";
  import GlassPipe from "./GlassPipe.svelte";
  import DataLake from "./DataLake.svelte";
  import DataHouse from "./DataHouse.svelte";
  import DataWarehouse from "./DataWarehouse.svelte";

  // V9: Metric section 3D models
  import ExperienceGem from "./ExperienceGem.svelte";
  import TechCube from "./TechCube.svelte";
  import GithubOcta from "./GithubOcta.svelte";
  import ImpactTorus from "./ImpactTorus.svelte";
  import CredentialShield from "./CredentialShield.svelte";
  import ContactBeacon from "./ContactBeacon.svelte";

  let mascotGroup: any;
  let pipeGroup: any;
  let lakeGroup: any;
  let houseGroup: any;
  let warehouseGroup: any;

  // V9: Metric section 3D objects
  let expGroup: any;
  let techGroup: any;
  let ghGroup: any;
  let impactGroup: any;
  let credGroup: any;
  let contactGroup: any;

  // --- RESPONSIVE STATE ---
  let isMobile = false;
  let cameraZ = 10;
  let cameraFov = 35;

  // --- SCROLL DAMPING ---
  let scrollY_target = 0;
  let scrollY_current = 0;
  let innerHeight = 1000;

  // --- CONFIGURATION OBJECTS ---
  const DESKTOP_POS = {
    start: { x: 3.5, y: 0.2, z: 0 },
    pipe: { x: -3.5, y: -0.5, z: 0 },
    lake: { x: 3.5, y: -1.0, z: 0 },
    house: { x: -3.5, y: 0.2, z: 0 },
    ware: { x: 3.5, y: 0.0, z: 0 },
  };

  const MOBILE_POS = {
    start: { x: 0, y: -2.0, z: 0 },
    pipe: { x: 0, y: 1.8, z: 0 },
    lake: { x: 0, y: -2.0, z: 0 },
    house: { x: 0, y: 1.8, z: 0 },
    ware: { x: 0, y: -2.0, z: 0 },
  };

  let pos = DESKTOP_POS;

  $: HERO_SCALE = isMobile ? 1.1 : 1.2;
  $: PIPE_SCALE = isMobile ? 0.45 : 0.5;
  $: COMPACT_SCALE = 0.35;
  $: HOUSE_SCALE = isMobile ? 0.4 : 0.45;
  $: WAREHOUSE_SCALE = isMobile ? 1.0 : 1.4;

  function updateLayout() {
    if (typeof window === "undefined") return;
    const width = window.innerWidth;
    isMobile = width < 1024;
    innerHeight = window.innerHeight;
    pos = isMobile ? MOBILE_POS : DESKTOP_POS;

    if (width < 768) {
      cameraZ = 14;
      cameraFov = 40;
    } else {
      cameraZ = 10;
      cameraFov = 35;
    }
  }

  // --- HELPER: EASE FUNCTIONS ---
  // Simple cubic ease for smoother movement than linear
  const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  // --- THE ANIMATION LOOP ---
  const tick = () => {
    if (!mascotGroup) return;

    // 1. Damping: Slightly tighter (0.08) for better responsiveness
    scrollY_current += (scrollY_target - scrollY_current) * 0.08;

    // 2. Progress
    const rawProgress = scrollY_current / innerHeight;

    // 3. Optimization — extended for V9 metric sections (11 total sections)
    const isVisible = rawProgress <= 12;

    // Original pipeline models: visible only in phases 0-4.5
    const pipelineVisible = rawProgress < 4.6;
    mascotGroup.visible = pipelineVisible;
    if (pipeGroup) pipeGroup.visible = pipelineVisible;
    if (lakeGroup) lakeGroup.visible = pipelineVisible;
    if (houseGroup) houseGroup.visible = pipelineVisible;
    if (warehouseGroup) warehouseGroup.visible = pipelineVisible;

    // V9: Metric section 3D objects — each appears in its own phase
    const metricGroups = [
      expGroup,
      techGroup,
      ghGroup,
      impactGroup,
      credGroup,
      contactGroup,
    ];
    metricGroups.forEach((g, i) => {
      if (!g) return;
      const phaseStart = 4.8 + i;
      const phaseEnd = phaseStart + 1.2;
      const inPhase = rawProgress >= phaseStart && rawProgress < phaseEnd;
      g.visible = inPhase;
      if (inPhase) {
        const localP = Math.min((rawProgress - phaseStart) / 0.5, 1);
        const s = localP * 0.8;
        g.scale.set(s, s, s);
        g.rotation.y += 0.005;
        g.rotation.x += 0.002;
      }
    });

    if (!isVisible) return;

    // --- PHASE 1: HERO -> PIPELINE (0.0 - 1.0) ---
    if (rawProgress <= 1.0) {
      const p1 = Math.max(0, rawProgress);

      // MOVEMENT: Ease the mascot movement
      const rawMoveP = gsap.utils.clamp(
        0,
        1,
        gsap.utils.mapRange(0, 0.6, 0, 1, p1),
      ); // End movement slightly later
      const moveP = easeInOutCubic(rawMoveP);

      mascotGroup.position.x = gsap.utils.interpolate(
        pos.start.x,
        pos.pipe.x,
        moveP,
      );
      mascotGroup.position.y = gsap.utils.interpolate(
        pos.start.y,
        pos.pipe.y,
        moveP,
      );
      mascotGroup.position.z = gsap.utils.interpolate(
        pos.start.z,
        pos.pipe.z,
        moveP,
      );

      const mScale = gsap.utils.interpolate(HERO_SCALE, PIPE_SCALE, moveP);
      mascotGroup.scale.set(mScale, mScale, mScale);

      // PIPE RISE: Start earlier (0.3) for overlap
      const rawPipeRise = gsap.utils.clamp(
        0,
        1,
        gsap.utils.mapRange(0.3, 0.8, 0, 1, p1),
      );
      const pipeRiseP = easeInOutCubic(rawPipeRise);

      pipeGroup.position.x = pos.pipe.x;
      pipeGroup.position.y = gsap.utils.interpolate(-20, pos.pipe.y, pipeRiseP);

      // ROTATION: Happen near end of movement
      const rotP = gsap.utils.clamp(
        0,
        1,
        gsap.utils.mapRange(0.7, 1.0, 0, 1, p1),
      );
      pipeGroup.rotation.z = gsap.utils.interpolate(0, Math.PI / 2, rotP);

      // SHRINK: "Pop" into the pipe
      const finalShrink = gsap.utils.interpolate(
        PIPE_SCALE,
        COMPACT_SCALE,
        rotP,
      );
      pipeGroup.scale.set(finalShrink, finalShrink, finalShrink);
      if (rotP > 0)
        mascotGroup.scale.set(finalShrink, finalShrink, finalShrink);

      // --- PHASE 2: PIPELINE -> DATA LAKE (1.0 - 2.0) ---
    } else if (rawProgress <= 2.0) {
      const p2 = rawProgress - 1;
      houseGroup.scale.set(0, 0, 0);

      // PIPE MOVE: Move quickly to lake position
      const rawPipeMove = gsap.utils.clamp(
        0,
        1,
        gsap.utils.mapRange(0, 0.4, 0, 1, p2),
      );
      const pipeMoveP = easeInOutCubic(rawPipeMove);

      const pourX = gsap.utils.interpolate(pos.pipe.x, pos.lake.x, pipeMoveP);
      // On mobile, keep pipe higher longer, then drop
      const pourY = gsap.utils.interpolate(
        pos.pipe.y,
        pos.lake.y + (isMobile ? 3 : 2),
        pipeMoveP,
      );

      pipeGroup.position.x = pourX;
      pipeGroup.position.y = isMobile ? pourY : pos.pipe.y;
      pipeGroup.rotation.z = gsap.utils.interpolate(
        Math.PI / 2,
        Math.PI,
        pipeMoveP,
      );

      if (p2 < 0.4) {
        mascotGroup.position.x = pourX;
        mascotGroup.position.y = pipeGroup.position.y;
      }

      // FALL: Gravity effect (Ease In Quad)
      const fallP = gsap.utils.clamp(
        0,
        1,
        gsap.utils.mapRange(0.4, 0.6, 0, 1, p2),
      );
      const easeFall = fallP * fallP; // Quadratic ease in

      if (p2 >= 0.4) {
        mascotGroup.position.x = pos.lake.x;
        const startFallY = pipeGroup.position.y;
        mascotGroup.position.y = gsap.utils.interpolate(
          startFallY,
          pos.lake.y,
          easeFall,
        );
      }

      // PIPE EXIT: Leave quickly after drop
      const pipeExitP = gsap.utils.clamp(
        0,
        1,
        gsap.utils.mapRange(0.6, 0.9, 0, 1, p2),
      );
      pipeGroup.position.y = gsap.utils.interpolate(
        pipeGroup.position.y,
        20,
        pipeExitP,
      );

      // LAKE RISE: Start rising AS the mascot falls (Overlap)
      const rawLakeRise = gsap.utils.clamp(
        0,
        1,
        gsap.utils.mapRange(0.5, 0.9, 0, 1, p2),
      );
      const lakeRiseP = easeInOutCubic(rawLakeRise);

      lakeGroup.position.x = pos.lake.x;
      lakeGroup.position.y = gsap.utils.interpolate(-20, pos.lake.y, lakeRiseP);
      lakeGroup.scale.set(1, 1, 1);

      // MASK DISSOLVE
      const dissolveP = gsap.utils.clamp(
        0,
        1,
        gsap.utils.mapRange(0.55, 0.7, 0, 1, p2),
      );
      const mScale = gsap.utils.interpolate(COMPACT_SCALE, 0.0, dissolveP);
      mascotGroup.scale.set(mScale, mScale, mScale);

      // --- PHASE 3: DATA LAKE -> LAKEHOUSE (2.0 - 3.0) ---
    } else if (rawProgress <= 3.0) {
      const p3 = rawProgress - 2;
      mascotGroup.scale.set(0, 0, 0);
      warehouseGroup.scale.set(0, 0, 0);

      // MOVEMENT: Smooth slide
      const rawMove = gsap.utils.clamp(
        0,
        1,
        gsap.utils.mapRange(0, 0.6, 0, 1, p3),
      );
      const moveP = easeInOutCubic(rawMove);

      const targetX = gsap.utils.interpolate(pos.lake.x, pos.house.x, moveP);
      const lakeTargetY = pos.house.y - 1.2;
      const targetY = gsap.utils.interpolate(pos.lake.y, lakeTargetY, moveP);

      lakeGroup.position.x = targetX;
      lakeGroup.position.y = targetY;
      lakeGroup.scale.set(1, 1, 1);

      // HOUSE GROW: Pop in (Elastic-ish feel via BackOut)
      const rawGrow = gsap.utils.clamp(
        0,
        1,
        gsap.utils.mapRange(0.4, 0.9, 0, 1, p3),
      );
      // Custom overshoot ease
      const easeBackOut = (t: number) => {
        const c1 = 1.70158;
        const c3 = c1 + 1;
        return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
      };
      const growP = easeBackOut(rawGrow);

      const hScale = gsap.utils.interpolate(0, HOUSE_SCALE, Math.min(growP, 1)); // Clamp scale to prevent too much overshoot
      houseGroup.scale.set(hScale, hScale, hScale);
      houseGroup.position.x = targetX;

      const riseStart = lakeTargetY - 0.5;
      houseGroup.position.y = gsap.utils.interpolate(
        riseStart,
        pos.house.y,
        rawGrow,
      ); // Use linear y for stability

      // --- PHASE 4: LAKEHOUSE -> WAREHOUSE (3.0 - 4.0+) ---
    } else {
      const p4 = Math.min(Math.max(rawProgress - 3, 0), 1);

      // HOUSE EXIT: Fast up
      const houseExitP = gsap.utils.clamp(
        0,
        1,
        gsap.utils.mapRange(0, 0.3, 0, 1, p4),
      );
      houseGroup.position.y = gsap.utils.interpolate(
        pos.house.y,
        pos.house.y + 8,
        houseExitP,
      );
      houseGroup.position.x = pos.house.x;
      const hScale = gsap.utils.interpolate(HOUSE_SCALE, 0, houseExitP);
      houseGroup.scale.set(hScale, hScale, hScale);

      // LAKE MOVE
      const rawLakeMove = gsap.utils.clamp(
        0,
        1,
        gsap.utils.mapRange(0.1, 0.5, 0, 1, p4),
      ); // Overlap with house exit
      const lakeMoveP = easeInOutCubic(rawLakeMove);

      const lakeTargetX = pos.ware.x;
      const lakeTargetY = pos.ware.y - 1.2;
      const lakeCurrentY = gsap.utils.interpolate(
        pos.house.y - 1.2,
        lakeTargetY,
        lakeMoveP,
      );

      lakeGroup.position.x = gsap.utils.interpolate(
        pos.house.x,
        lakeTargetX,
        lakeMoveP,
      );
      lakeGroup.position.y = lakeCurrentY;

      // WAREHOUSE DROP: Heavy Impact
      const rawDrop = gsap.utils.clamp(
        0,
        1,
        gsap.utils.mapRange(0.4, 0.8, 0, 1, p4),
      );
      // Bounce ease for heavy object
      const easeBounce = (x: number): number => {
        const n1 = 7.5625;
        const d1 = 2.75;
        if (x < 1 / d1) return n1 * x * x;
        else if (x < 2 / d1) return n1 * (x -= 1.5 / d1) * x + 0.75;
        else if (x < 2.5 / d1) return n1 * (x -= 2.25 / d1) * x + 0.9375;
        else return n1 * (x -= 2.625 / d1) * x + 0.984375;
      };
      // Use regular EaseOut for position, bounce might jitter too much on scroll
      const easeDrop = 1 - Math.pow(1 - rawDrop, 3);

      const dropYStart = pos.ware.y + 12;
      const dropYEnd = pos.ware.y;

      warehouseGroup.position.x = pos.ware.x;
      warehouseGroup.position.y = gsap.utils.interpolate(
        dropYStart,
        dropYEnd,
        easeDrop,
      );

      const wScale = rawDrop > 0.01 ? WAREHOUSE_SCALE : 0;
      warehouseGroup.scale.set(wScale, wScale, wScale);

      // ABSORB
      const absorbP = gsap.utils.clamp(
        0,
        1,
        gsap.utils.mapRange(0.7, 0.9, 0, 1, p4),
      );
      const lScale = gsap.utils.interpolate(1, 0, absorbP);
      lakeGroup.scale.set(lScale, lScale, lScale);
    }
  };

  onMount(() => {
    updateLayout();
    window.addEventListener("resize", updateLayout);

    const container = document.querySelector(".snap-container");
    if (container) {
      scrollY_target = container.scrollTop;
      scrollY_current = container.scrollTop;
      innerHeight = container.clientHeight || window.innerHeight;
      container.addEventListener("scroll", () => {
        scrollY_target = container.scrollTop;
      });
    }

    gsap.ticker.add(tick);

    return () => {
      window.removeEventListener("resize", updateLayout);
      gsap.ticker.remove(tick);
    };
  });
</script>

<Environment preset="city" />

<T.PerspectiveCamera makeDefault position={[0, 0, cameraZ]} fov={cameraFov}>
  <T.DirectionalLight position={[5, 5, 5]} intensity={2} />
  <T.AmbientLight intensity={0.5} />
</T.PerspectiveCamera>

<!-- MASCOT -->
<T.Group
  bind:ref={mascotGroup}
  position={[pos.start.x, pos.start.y, pos.start.z]}
>
  <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
    <DataMascot />
  </Float>
</T.Group>

<!-- PIPE -->
<T.Group
  bind:ref={pipeGroup}
  position={[pos.pipe.x, -15, 0]}
  rotation.z={0}
  scale={PIPE_SCALE}
>
  <GlassPipe />
</T.Group>

<!-- DATA LAKE -->
<T.Group bind:ref={lakeGroup} position={[pos.lake.x, -20, 0]}>
  <DataLake />
</T.Group>

<!-- LAKE HOUSE -->
<T.Group bind:ref={houseGroup} position={[pos.house.x, -20, 0]} scale={0}>
  <DataHouse />
</T.Group>

<!-- WAREHOUSE -->
<T.Group bind:ref={warehouseGroup} position={[pos.ware.x, -20, 0]} scale={0}>
  <DataWarehouse />
</T.Group>

<!-- V9: METRIC SECTION 3D OBJECTS -->
<!-- Experience: LEFT (content RIGHT) — continues from Warehouse RIGHT -->
<T.Group
  bind:ref={expGroup}
  position={[isMobile ? 0 : -4.5, 0, 0]}
  visible={false}
>
  <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
    <ExperienceGem />
  </Float>
</T.Group>

<!-- TechStack: RIGHT (content LEFT) -->
<T.Group
  bind:ref={techGroup}
  position={[isMobile ? 0 : 4.5, 0, 0]}
  visible={false}
>
  <Float speed={1.2} rotationIntensity={0.6} floatIntensity={0.4}>
    <TechCube />
  </Float>
</T.Group>

<!-- GitHub: LEFT (content RIGHT) -->
<T.Group
  bind:ref={ghGroup}
  position={[isMobile ? 0 : -4.5, 0, 0]}
  visible={false}
>
  <Float speed={1.8} rotationIntensity={0.5} floatIntensity={0.5}>
    <GithubOcta />
  </Float>
</T.Group>

<!-- Impact: RIGHT (content LEFT) -->
<T.Group
  bind:ref={impactGroup}
  position={[isMobile ? 0 : 4.5, 0, 0]}
  visible={false}
>
  <Float speed={1} rotationIntensity={0.3} floatIntensity={0.7}>
    <ImpactTorus />
  </Float>
</T.Group>

<!-- Credentials: LEFT (content RIGHT) -->
<T.Group
  bind:ref={credGroup}
  position={[isMobile ? 0 : -4.5, 0, 0]}
  visible={false}
>
  <Float speed={1.3} rotationIntensity={0.4} floatIntensity={0.5}>
    <CredentialShield />
  </Float>
</T.Group>

<!-- Contact: RIGHT (content LEFT) -->
<T.Group
  bind:ref={contactGroup}
  position={[isMobile ? 0 : 4.5, 0, 0]}
  visible={false}
>
  <Float speed={2} rotationIntensity={0.2} floatIntensity={0.8}>
    <ContactBeacon />
  </Float>
</T.Group>
