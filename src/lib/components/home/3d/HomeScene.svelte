<!-- src/lib/components/home/3d/HomeScene.svelte -->
<script lang="ts">
  import { T, useThrelte } from "@threlte/core";
  import { Float } from "@threlte/extras";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import { onMount } from "svelte";

  import DataMascot from "./DataMascot.svelte";
  import GlassPipe from "./GlassPipe.svelte";
  import DataLake from "./DataLake.svelte";
  import DataHouse from "./DataHouse.svelte";
  import DataWarehouse from "./DataWarehouse.svelte";

  let mascotGroup: any = $state(null);
  let pipeGroup: any = $state(null);
  let lakeGroup: any = $state(null);
  let houseGroup: any = $state(null);
  let warehouseGroup: any = $state(null);

  // --- RESPONSIVE STATE ---
  let isMobile = $state(false);
  let cameraZ = $state(10);
  let cameraFov = $state(35);

  // --- SCROLL DAMPING CONTEXT FOR STORYTELLING ---
  let targetProgress = $state(0);
  let currentProgress = $state(0);
  let innerHeight = $state(1000);

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

  let pos = $state(DESKTOP_POS);

  let HERO_SCALE = $derived(isMobile ? 1.1 : 1.2);
  let PIPE_SCALE = $derived(isMobile ? 0.45 : 0.5);
  let COMPACT_SCALE = 0.35;
  let HOUSE_SCALE = $derived(isMobile ? 0.4 : 0.45);
  let WAREHOUSE_SCALE = $derived(isMobile ? 0.6 : 0.7);

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
  const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  // --- THE ANIMATION LOOP ---
  const tick = () => {
    if (!mascotGroup) return;

    // Smooth physics Damping (Tighter follow since we use page progress)
    currentProgress += (targetProgress - currentProgress) * 0.08;
    const rawProgress = currentProgress;

    // 3. Optimization
    const isVisible = rawProgress <= 5.5;

    mascotGroup.visible = isVisible;
    if (pipeGroup) pipeGroup.visible = isVisible;
    if (lakeGroup) lakeGroup.visible = isVisible;
    if (houseGroup) houseGroup.visible = isVisible;
    if (warehouseGroup) warehouseGroup.visible = isVisible;

    if (!isVisible) return;

    // --- PHASE 1: HERO -> PIPELINE (0.0 - 1.0) ---
    if (rawProgress <= 1.0) {
      const p1 = Math.max(0, rawProgress);

      // MOVEMENT
      const rawMoveP = gsap.utils.clamp(
        0,
        1,
        gsap.utils.mapRange(0, 0.6, 0, 1, p1),
      );
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

      // PIPE RISE
      const rawPipeRise = gsap.utils.clamp(
        0,
        1,
        gsap.utils.mapRange(0.3, 0.8, 0, 1, p1),
      );
      const pipeRiseP = easeInOutCubic(rawPipeRise);

      pipeGroup.position.x = pos.pipe.x;
      pipeGroup.position.y = gsap.utils.interpolate(-20, pos.pipe.y, pipeRiseP);

      // ROTATION
      const rotP = gsap.utils.clamp(
        0,
        1,
        gsap.utils.mapRange(0.7, 1.0, 0, 1, p1),
      );
      pipeGroup.rotation.z = gsap.utils.interpolate(0, Math.PI / 2, rotP);

      // SHRINK
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

      // PIPE MOVE
      const rawPipeMove = gsap.utils.clamp(
        0,
        1,
        gsap.utils.mapRange(0, 0.4, 0, 1, p2),
      );
      const pipeMoveP = easeInOutCubic(rawPipeMove);

      const pourX = gsap.utils.interpolate(pos.pipe.x, pos.lake.x, pipeMoveP);
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

      // FALL
      const fallP = gsap.utils.clamp(
        0,
        1,
        gsap.utils.mapRange(0.4, 0.6, 0, 1, p2),
      );
      const easeFall = fallP * fallP;

      if (p2 >= 0.4) {
        mascotGroup.position.x = pos.lake.x;
        const startFallY = pipeGroup.position.y;
        mascotGroup.position.y = gsap.utils.interpolate(
          startFallY,
          pos.lake.y,
          easeFall,
        );
      }

      // PIPE EXIT
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

      // LAKE RISE
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

      // MOVEMENT
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

      // HOUSE GROW
      const rawGrow = gsap.utils.clamp(
        0,
        1,
        gsap.utils.mapRange(0.4, 0.9, 0, 1, p3),
      );
      const easeBackOut = (t: number) => {
        const c1 = 1.70158;
        const c3 = c1 + 1;
        return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
      };
      const growP = easeBackOut(rawGrow);

      const hScale = gsap.utils.interpolate(0, HOUSE_SCALE, Math.min(growP, 1));
      houseGroup.scale.set(hScale, hScale, hScale);
      houseGroup.position.x = targetX;

      const riseStart = lakeTargetY - 0.5;
      houseGroup.position.y = gsap.utils.interpolate(
        riseStart,
        pos.house.y,
        rawGrow,
      );

      // --- PHASE 4: LAKEHOUSE -> WAREHOUSE (3.0 - 4.0+) ---
    } else {
      const p4 = Math.min(Math.max(rawProgress - 3, 0), 1);

      // HOUSE EXIT
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
      );
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

      // WAREHOUSE DROP
      const rawDrop = gsap.utils.clamp(
        0,
        1,
        gsap.utils.mapRange(0.4, 0.8, 0, 1, p4),
      );
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

    gsap.registerPlugin(ScrollTrigger);

    // BIND 3D STORY TO THE ARCHITECTURE SECTIONS
    // The hero section contributes to Phase 1 (0→1), and the 4 architecture
    // sections map to Phases 1→4. We use #hero as the start and the bottom
    // of #architecture-story as the end, giving ~5 viewport heights of scroll.
    const st = ScrollTrigger.create({
      trigger: "#hero",
      start: "top top",
      endTrigger: "#architecture-story",
      end: "bottom bottom",
      onUpdate: (self) => {
        targetProgress = self.progress * 4.2;
      },
    });

    gsap.ticker.add(tick);

    return () => {
      window.removeEventListener("resize", updateLayout);
      gsap.ticker.remove(tick);
      st.kill();
    };
  });
</script>

<T.PerspectiveCamera makeDefault position={[0, 0, cameraZ]} fov={cameraFov}>
  <T.DirectionalLight position={[5, 5, 5]} intensity={2} />
  <T.DirectionalLight position={[-3, 3, -2]} intensity={0.8} color="#38bdf8" />
  <T.AmbientLight intensity={0.6} />
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
