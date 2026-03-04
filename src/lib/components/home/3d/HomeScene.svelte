<!-- src/lib/components/home/3d/HomeScene.svelte -->
<script lang="ts">
  import { T, useThrelte } from "@threlte/core";
  import { Environment, Float } from "@threlte/extras";
  import gsap from "gsap";
  import { onMount } from "svelte";
  import { carouselSwipeFraction } from "$lib/stores/carousel-store";

  import DataMascot from "./DataMascot.svelte";
  import GlassPipe from "./GlassPipe.svelte";
  import DataLake from "./DataLake.svelte";
  import DataHouse from "./DataHouse.svelte";
  import DataWarehouse from "./DataWarehouse.svelte";

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

  let expGroup: any;
  let techGroup: any;
  let ghGroup: any;
  let impactGroup: any;
  let credGroup: any;
  let contactGroup: any;

  let isMobile = false;
  let cameraZ = 10;
  let cameraFov = 35;

  let scrollY_target = 0;
  let scrollY_current = 0;
  let innerHeight = 1000;

  // This is now purely the X positional offset (e.g. -10 or +10), already calculated by the carousel
  let calculatedSwipeOffset = 0;
  const unsubFraction = carouselSwipeFraction.subscribe(
    (v) => (calculatedSwipeOffset = v),
  );

  const DESKTOP_POS = {
    start: { x: 3, y: -0.2, z: 0 },
    pipe: { x: -3.5, y: -0.5, z: 0 },
    lake: { x: 3.5, y: -1.0, z: 0 },
    house: { x: -3.5, y: 0.2, z: 0 },
    ware: { x: 3.5, y: 0.0, z: 0 },
  };

  const MOBILE_POS = {
    start: { x: 0, y: 1.5, z: 0 },
    pipe: { x: 0, y: 1.5, z: 0 },
    lake: { x: 0, y: 1.5, z: 0 },
    house: { x: 0, y: 1.5, z: 0 },
    ware: { x: 0, y: 1.5, z: 0 },
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

  const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const tick = () => {
    if (!mascotGroup) return;

    scrollY_current += (scrollY_target - scrollY_current) * 0.08;
    const rawProgress = scrollY_current / innerHeight;
    const isVisible = rawProgress <= 12;

    // Extend pipeline visibility so Warehouse can exit smoothly during scroll index 4 -> 5
    const pipelineVisible = rawProgress < 5.5;

    mascotGroup.visible = pipelineVisible;
    if (pipeGroup) pipeGroup.visible = pipelineVisible;
    if (lakeGroup) lakeGroup.visible = pipelineVisible;
    if (houseGroup) houseGroup.visible = pipelineVisible;
    if (warehouseGroup) warehouseGroup.visible = pipelineVisible;

    // --- 1. PROCESS METRICS MODELS (Sections 5 through 10) ---
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

      // Each metric perfectly centers at index (5 + i)
      // They begin fading in at (index - 0.8) and fade out at (index + 0.8)
      const centerIndex = 5 + i;
      const phaseStart = centerIndex - 0.8;
      const phaseEnd = centerIndex + 0.8;
      const inPhase = rawProgress >= phaseStart && rawProgress <= phaseEnd;

      g.visible = inPhase;

      if (inPhase) {
        // Calculate a bell curve for scale (0 at edges, 1 at center)
        const distanceFromCenter = Math.abs(rawProgress - centerIndex);
        const scaleP = Math.max(0, 1 - distanceFromCenter * 1.5);
        const s = easeInOutCubic(scaleP) * 0.8;

        g.scale.set(s, s, s);

        // Constant predictable rotation based on global time, not scroll speed
        const time = performance.now() * 0.001;
        g.rotation.y = time * 0.5;
        // g.rotation.x = time * 0.2;

        if (isMobile) {
          // Slide cleanly into view based on user swipe
          g.position.x = calculatedSwipeOffset;
          g.position.y = MOBILE_POS.start.y;
        } else {
          // Desktop: Alternate sides, slight Y float for dynamic feel
          const baseOffset = i % 2 === 0 ? -4.5 : 4.5;

          // Allow them to subtly slide vertically into place based on scroll
          const verticalSlide = (rawProgress - centerIndex) * -5;

          g.position.x = baseOffset;
          g.position.y = verticalSlide;
        }
      }
    });

    if (!isVisible) return;

    // --- 2. PROCESS PIPELINE MODELS ---
    if (rawProgress <= 1.0) {
      // Hero to Pipe
      const p1 = Math.max(0, rawProgress);
      const moveP = easeInOutCubic(
        gsap.utils.clamp(0, 1, gsap.utils.mapRange(0, 0.6, 0, 1, p1)),
      );

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

      const pipeRiseP = easeInOutCubic(
        gsap.utils.clamp(0, 1, gsap.utils.mapRange(0.3, 0.8, 0, 1, p1)),
      );
      pipeGroup.position.x = pos.pipe.x;
      pipeGroup.position.y = gsap.utils.interpolate(-20, pos.pipe.y, pipeRiseP);

      const rotP = gsap.utils.clamp(
        0,
        1,
        gsap.utils.mapRange(0.7, 1.0, 0, 1, p1),
      );
      pipeGroup.rotation.z = gsap.utils.interpolate(0, Math.PI / 2, rotP);

      const finalShrink = gsap.utils.interpolate(
        PIPE_SCALE,
        COMPACT_SCALE,
        rotP,
      );
      pipeGroup.scale.set(finalShrink, finalShrink, finalShrink);
      if (rotP > 0)
        mascotGroup.scale.set(finalShrink, finalShrink, finalShrink);
    } else if (rawProgress <= 2.0) {
      // Pipe to Lake
      const p2 = rawProgress - 1;
      houseGroup.scale.set(0, 0, 0);

      const pipeMoveP = easeInOutCubic(
        gsap.utils.clamp(0, 1, gsap.utils.mapRange(0, 0.4, 0, 1, p2)),
      );
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

      const easeFall = Math.pow(
        gsap.utils.clamp(0, 1, gsap.utils.mapRange(0.4, 0.6, 0, 1, p2)),
        2,
      );

      if (p2 >= 0.4) {
        mascotGroup.position.x = pos.lake.x;
        mascotGroup.position.y = gsap.utils.interpolate(
          pipeGroup.position.y,
          pos.lake.y,
          easeFall,
        );
      }

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

      const lakeRiseP = easeInOutCubic(
        gsap.utils.clamp(0, 1, gsap.utils.mapRange(0.5, 0.9, 0, 1, p2)),
      );
      lakeGroup.position.x = pos.lake.x;
      lakeGroup.position.y = gsap.utils.interpolate(-20, pos.lake.y, lakeRiseP);
      lakeGroup.scale.set(1, 1, 1);

      const dissolveP = gsap.utils.clamp(
        0,
        1,
        gsap.utils.mapRange(0.55, 0.7, 0, 1, p2),
      );
      const mScale = gsap.utils.interpolate(COMPACT_SCALE, 0.1, dissolveP);
      mascotGroup.scale.set(mScale, mScale, mScale);
    } else if (rawProgress <= 3.0) {
      // Lake to House
      const p3 = rawProgress - 2;
      mascotGroup.scale.set(0, 0, 0);
      warehouseGroup.scale.set(0, 0, 0);

      const moveP = easeInOutCubic(
        gsap.utils.clamp(0, 1, gsap.utils.mapRange(0, 0.6, 0, 1, p3)),
      );
      const targetX = gsap.utils.interpolate(pos.lake.x, pos.house.x, moveP);
      const lakeTargetY = pos.house.y - 1.2;
      const targetY = gsap.utils.interpolate(pos.lake.y, lakeTargetY, moveP);

      lakeGroup.position.x = targetX;
      lakeGroup.position.y = targetY;
      lakeGroup.scale.set(1, 1, 1);

      const rawGrow = gsap.utils.clamp(
        0,
        1,
        gsap.utils.mapRange(0.4, 0.9, 0, 1, p3),
      );
      const growP =
        1 +
        2.70158 * Math.pow(rawGrow - 1, 3) +
        1.70158 * Math.pow(rawGrow - 1, 2);

      const hScale = gsap.utils.interpolate(
        0,
        HOUSE_SCALE,
        Math.min(Math.max(0, growP), 1),
      );
      houseGroup.scale.set(hScale, hScale, hScale);
      houseGroup.position.x = targetX;
      houseGroup.position.y = gsap.utils.interpolate(
        lakeTargetY - 0.5,
        pos.house.y,
        rawGrow,
      );
    } else if (rawProgress <= 4.0) {
      // House to Warehouse
      const p4 = rawProgress - 3;

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

      const lakeMoveP = easeInOutCubic(
        gsap.utils.clamp(0, 1, gsap.utils.mapRange(0.1, 0.5, 0, 1, p4)),
      );
      const lakeTargetY = pos.ware.y - 1.2;

      lakeGroup.position.x = gsap.utils.interpolate(
        pos.house.x,
        pos.ware.x,
        lakeMoveP,
      );
      lakeGroup.position.y = gsap.utils.interpolate(
        pos.house.y - 1.2,
        lakeTargetY,
        lakeMoveP,
      );

      const rawDrop = gsap.utils.clamp(
        0,
        1,
        gsap.utils.mapRange(0.4, 0.8, 0, 1, p4),
      );
      const easeDrop = 1 - Math.pow(1 - rawDrop, 3);

      warehouseGroup.position.x = pos.ware.x;
      warehouseGroup.position.y = gsap.utils.interpolate(
        pos.ware.y + 12,
        pos.ware.y,
        easeDrop,
      );

      const wScale = rawDrop > 0.01 ? WAREHOUSE_SCALE : 0;
      warehouseGroup.scale.set(wScale, wScale, wScale);

      const absorbP = gsap.utils.clamp(
        0,
        1,
        gsap.utils.mapRange(0.7, 0.9, 0, 1, p4),
      );
      const lScale = gsap.utils.interpolate(1, 0, absorbP);
      lakeGroup.scale.set(lScale, lScale, lScale);
    } else if (rawProgress <= 5.0) {
      // WAREHOUSE EXIT TRANSITION (Scroll section 4 -> 5)
      // Smoothly exits the warehouse model so it doesn't persist into the Experience section
      const p5 = rawProgress - 4;

      const warehouseExitP = easeInOutCubic(
        gsap.utils.clamp(0, 1, gsap.utils.mapRange(0, 0.6, 0, 1, p5)),
      );

      warehouseGroup.position.x = pos.ware.x;
      // Drop it down through the floor as we enter the metrics section
      warehouseGroup.position.y = gsap.utils.interpolate(
        pos.ware.y,
        pos.ware.y - 15,
        warehouseExitP,
      );

      const wScale = gsap.utils.interpolate(WAREHOUSE_SCALE, 0, warehouseExitP);
      warehouseGroup.scale.set(wScale, wScale, wScale);
    }

    // --- 3. GLOBAL MOBILE SWIPE OVERRIDE FOR PIPELINE MODELS ---
    if (isMobile && pipelineVisible) {
      if (mascotGroup.visible)
        mascotGroup.position.x = pos.start.x + calculatedSwipeOffset;
      if (pipeGroup?.visible)
        pipeGroup.position.x = pos.pipe.x + calculatedSwipeOffset;
      if (lakeGroup?.visible)
        lakeGroup.position.x = pos.lake.x + calculatedSwipeOffset;
      if (houseGroup?.visible)
        houseGroup.position.x = pos.house.x + calculatedSwipeOffset;
      if (warehouseGroup?.visible)
        warehouseGroup.position.x = pos.ware.x + calculatedSwipeOffset;
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
      unsubFraction();
    };
  });
</script>

<Environment preset="city" />

<T.PerspectiveCamera makeDefault position={[0, 0, cameraZ]} fov={cameraFov}>
  <T.DirectionalLight position={[5, 5, 5]} intensity={2} />
  <T.AmbientLight intensity={0.7} />
</T.PerspectiveCamera>

<T.Group
  bind:ref={mascotGroup}
  position={[pos.start.x, pos.start.y, pos.start.z]}
>
  <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
    <DataMascot />
  </Float>
</T.Group>

<T.Group
  bind:ref={pipeGroup}
  position={[pos.pipe.x, -15, 0]}
  rotation.z={0}
  scale={PIPE_SCALE}
>
  <GlassPipe />
</T.Group>

<T.Group bind:ref={lakeGroup} position={[pos.lake.x, -20, 0]}>
  <DataLake />
</T.Group>

<T.Group bind:ref={houseGroup} position={[pos.house.x, -20, 0]} scale={0}>
  <DataHouse />
</T.Group>

<T.Group bind:ref={warehouseGroup} position={[pos.ware.x, -20, 0]} scale={0}>
  <DataWarehouse />
</T.Group>

<!-- Metrics Section -->
<T.Group
  bind:ref={expGroup}
  position={[isMobile ? 0 : -4.5, 0, 0]}
  visible={false}
>
  <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
    <ExperienceGem />
  </Float>
</T.Group>
<T.Group
  bind:ref={techGroup}
  position={[isMobile ? 0 : 4.5, 0, 0]}
  visible={false}
>
  <Float speed={1.2} rotationIntensity={0.6} floatIntensity={0.4}>
    <TechCube />
  </Float>
</T.Group>
<T.Group
  bind:ref={ghGroup}
  position={[isMobile ? 0 : -4.5, 0, 0]}
  visible={false}
>
  <Float speed={1.8} rotationIntensity={0.5} floatIntensity={0.5}>
    <GithubOcta />
  </Float>
</T.Group>
<T.Group
  bind:ref={impactGroup}
  position={[isMobile ? 0 : 4.5, 0, 0]}
  visible={false}
>
  <Float speed={1} rotationIntensity={0.3} floatIntensity={0.7}>
    <ImpactTorus />
  </Float>
</T.Group>
<T.Group
  bind:ref={credGroup}
  position={[isMobile ? 0 : -4.5, 0, 0]}
  visible={false}
>
  <Float speed={1.3} rotationIntensity={0} floatIntensity={0}>
    <CredentialShield />
  </Float>
</T.Group>
<T.Group
  bind:ref={contactGroup}
  position={[isMobile ? 0 : 4.5, 0, 0]}
  visible={false}
>
  <Float speed={2} rotationIntensity={0.2} floatIntensity={0.8}>
    <ContactBeacon />
  </Float>
</T.Group>
