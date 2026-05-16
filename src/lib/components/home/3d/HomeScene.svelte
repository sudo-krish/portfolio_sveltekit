<!-- src/lib/components/home/3d/HomeScene.svelte -->
<script lang="ts">
  import { T, useThrelte } from "@threlte/core";
  import { Environment, Float } from "@threlte/extras";
  import gsap from "gsap";
  import { onMount } from "svelte";
  import { carouselSwipeFraction } from "$lib/stores/carousel-store";
  import { theme } from "$lib/stores/theme";

  import Hero3D from "./Hero3D.svelte";
  import Pipe3D from "./Pipe3D.svelte";
  import Datalake3D from "./Datalake3D.svelte";
  import Lakehouse3D from "./Lakehouse3D.svelte";
  import Warehouse3D from "./Warehouse3D.svelte";

  import Experience3D from "./Experience3D.svelte";
  import TechStack3D from "./TechStack3D.svelte";
  import Github3D from "./Github3D.svelte";
  import Impact3D from "./Impact3D.svelte";
  import Credentials3D from "./Credentials3D.svelte";
  import Contact3D from "./Contact3D.svelte";

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
  
  // Disable floating during physics drop
  let mascotFloatIntensity = 0.5;
  
  // Controls the scale of the internal Pipe3D droplets
  let pipeDrainProgress = 0;

  const unsubFraction = carouselSwipeFraction.subscribe(
    (v) => (calculatedSwipeOffset = v),
  );

  // Reference width where current hardcoded values are "perfect"
  const REF_WIDTH = 1920;

  // Viewport scale factor — 1.0 at 1920px, scales down smoothly for narrower screens
  let vw = 1;

  const MOBILE_POS = {
    start: { x: 0, y: 1.5, z: 0 },
    pipe: { x: 0, y: 1.5, z: 0 },
    lake: { x: 0, y: 1.5, z: 0 },
    house: { x: 0, y: 1.5, z: 0 },
    ware: { x: 0, y: 1.5, z: 0 },
  };

  let pos = MOBILE_POS;

  $: HERO_SCALE = isMobile ? 1.1 : 1.2 * vw;
  $: PIPE_SCALE = isMobile ? 0.45 : 0.5 * vw;
  $: COMPACT_SCALE = isMobile ? 0.35 : 0.35 * vw;
  $: HOUSE_SCALE = isMobile ? 0.4 : 0.45 * vw;
  $: WAREHOUSE_SCALE = isMobile ? 1.0 : 1.4 * vw;

  function updateLayout() {
    if (typeof window === "undefined") return;
    const width = window.innerWidth;
    isMobile = width < 1024;
    innerHeight = window.innerHeight;

    // Compute continuous viewport factor (clamped 0.5–1.0 for desktop range)
    vw = Math.max(0.5, Math.min(1.0, width / REF_WIDTH));

    if (isMobile) {
      pos = MOBILE_POS;
      cameraZ = 14;
      cameraFov = 40;
    } else {
      // Scale all desktop x-offsets by viewport factor
      pos = {
        start: { x: 3 * vw,    y: -0.2, z: 0 },
        pipe:  { x: -3.5 * vw, y: -0.5, z: 0 },
        lake:  { x: 3.5 * vw,  y: -1.0, z: 0 },
        house: { x: -3.5 * vw, y: 0.2,  z: 0 },
        ware:  { x: 3.5 * vw,  y: 0.0,  z: 0 },
      };
      // Smooth camera: closer + wider FOV on narrower screens
      cameraZ = 8 + 2 * vw;   // 10 at 1920, ~9 at 1280
      cameraFov = 33 + 2 * vw; // 35 at 1920, ~34 at 1280
    }
  }

  const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const mapR = (
    val: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number,
    ease = (t: number) => t,
  ) => {
    let p = (val - inMin) / (inMax - inMin);
    p = Math.max(0, Math.min(1, p));
    return outMin + (outMax - outMin) * ease(p);
  };

  let debugLogged = false;

  const tick = () => {
    if (!mascotGroup) {
      if (!debugLogged) {
        console.log(
          "[HomeScene] tick running but mascotGroup is missing/undefined",
        );
        debugLogged = true;
      }
      return;
    }

    scrollY_current += (scrollY_target - scrollY_current) * 0.08;
    const rawProgress = scrollY_current / innerHeight;

    if (!debugLogged) {
      console.log("[HomeScene] First real tick!", {
        rawProgress,
        innerHeight,
        scrollY_target,
      });
      debugLogged = true;
    }

    const isVisible = rawProgress <= 12;

    // Stop bobbing when inside the pipe and dropping to ensure precise contact with the lake
    mascotFloatIntensity = rawProgress < 0.7 ? 0.5 : 0;

    // Drain the pipe's internal droplets right before the main drop emerges at 1.3
    pipeDrainProgress = mapR(rawProgress, 1.15, 1.3, 0, 1, easeInOutCubic);

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
          // Desktop: Alternate sides, scaled by viewport factor
          const baseOffset = (i % 2 === 0 ? -4.5 : 4.5) * vw;

          // Allow them to subtly slide vertically into place based on scroll
          const verticalSlide = (rawProgress - centerIndex) * -5;

          g.position.x = baseOffset;
          g.position.y = verticalSlide;
        }
      }
    });

    // --- 2. PROCESS PIPELINE MODELS ---
    // We evaluate EACH object independently across the entire rawProgress range.
    // This prevents "popping" if the user scrolls rapidly and skips a frame.



    // A. MASCOT
    if (rawProgress <= 1.0) {
      mascotGroup.position.x = mapR(
        rawProgress,
        0,
        0.6,
        pos.start.x,
        pos.pipe.x,
        easeInOutCubic,
      );
      mascotGroup.position.y = mapR(
        rawProgress,
        0,
        0.6,
        pos.start.y,
        pos.pipe.y,
        easeInOutCubic,
      );
      mascotGroup.position.z = mapR(
        rawProgress,
        0,
        0.6,
        pos.start.z,
        pos.pipe.z,
        easeInOutCubic,
      );
      const s = mapR(
        rawProgress,
        0,
        0.6,
        HERO_SCALE,
        PIPE_SCALE,
        easeInOutCubic,
      );
      // Drop shrinks away as it enters the pipe
      const s2 = mapR(rawProgress, 0.7, 1.0, s, 0, (t) => t);
      mascotGroup.scale.set(s2, s2, s2);
    } else if (rawProgress <= 2.0) {
      mascotGroup.position.x = mapR(
        rawProgress,
        1.0,
        1.25,
        pos.pipe.x,
        pos.lake.x,
        easeInOutCubic,
      );
      
      const pipeYOffset = mapR(rawProgress, 1.0, 1.25, pos.pipe.y, pos.lake.y + 5.5, easeInOutCubic);
      const pipeTipY = pipeYOffset - 1.5;

      if (rawProgress < 1.3) {
        mascotGroup.position.y = pipeTipY;
        mascotGroup.scale.set(0, 0, 0); // Hide completely while in pipe
      } else {
        // Drop into the lake! (Slowed down to fall between 1.3 and 1.8)
        mascotGroup.position.y = mapR(
          rawProgress,
          1.3,
          1.8,
          pipeTipY,
          pos.lake.y,
          (t) => t * t, // Quadratic ease (gravity)
        );
        
        if (rawProgress < 1.8) {
          // Falling phase
          let s = mapR(rawProgress, 1.3, 1.4, 0, COMPACT_SCALE, easeInOutCubic);
          // Add a gravity stretch to look like a falling teardrop
          let stretchY = mapR(rawProgress, 1.4, 1.8, 1, 1.6, (t) => t * t);
          let squashXZ = mapR(rawProgress, 1.4, 1.8, 1, 0.75, (t) => t * t);
          mascotGroup.scale.set(s * squashXZ, s * stretchY, s * squashXZ);
        } else {
          // Melting/Splashing phase (1.8 to 2.0)
          // Y rapidly squashes into the water to 0
          let sy = mapR(rawProgress, 1.8, 1.9, COMPACT_SCALE * 1.6, 0, easeInOutCubic);
          
          // X/Z spread out into a wide puddle, then fade to 0
          let sxz = 0;
          if (rawProgress < 1.9) {
            sxz = mapR(rawProgress, 1.8, 1.9, COMPACT_SCALE * 0.75, COMPACT_SCALE * 2.5, easeInOutCubic);
          } else {
            sxz = mapR(rawProgress, 1.9, 2.0, COMPACT_SCALE * 2.5, 0, easeInOutCubic);
          }
          mascotGroup.scale.set(sxz, sy, sxz);
        }
      }
    } else {
      mascotGroup.scale.set(0, 0, 0);
    }

    // B. PIPE
    if (rawProgress <= 1.0) {
      pipeGroup.position.x = pos.pipe.x;
      pipeGroup.position.y = mapR(
        rawProgress,
        0.3,
        0.8,
        -20,
        pos.pipe.y,
        easeInOutCubic,
      );
      pipeGroup.rotation.z = mapR(
        rawProgress,
        0.7,
        1.0,
        0,
        Math.PI / 2,
        (t) => t,
      );
      const s = mapR(
        rawProgress,
        0.7,
        1.0,
        PIPE_SCALE,
        COMPACT_SCALE,
        (t) => t,
      );
      pipeGroup.scale.set(s, s, s);
    } else if (rawProgress <= 2.2) {
      pipeGroup.position.x = mapR(
        rawProgress,
        1.0,
        1.25,
        pos.pipe.x,
        pos.lake.x,
        easeInOutCubic,
      );
      // Calculate a base Y that elevates the pipe to hover high above the lake for a dramatic drop
      let currentPipeY = mapR(
        rawProgress,
        1.0,
        1.25,
        pos.pipe.y,
        pos.lake.y + 5.5,
        easeInOutCubic,
      );
      pipeGroup.rotation.z = mapR(
        rawProgress,
        1.0,
        1.25,
        Math.PI / 2,
        Math.PI,
        easeInOutCubic,
      );
      pipeGroup.position.y = mapR(
        rawProgress,
        1.9,
        2.2,
        currentPipeY,
        20,
        (t) => t,
      );
      pipeGroup.scale.set(COMPACT_SCALE, COMPACT_SCALE, COMPACT_SCALE);
    } else {
      pipeGroup.position.y = 20; // safe off-screen
    }

    // C. LAKE
    if (rawProgress <= 2.0) {
      lakeGroup.position.x = pos.lake.x;
      lakeGroup.position.y = mapR(
        rawProgress,
        1.5,
        1.9,
        -20,
        pos.lake.y,
        easeInOutCubic,
      );
      lakeGroup.scale.set(1, 1, 1);
    } else if (rawProgress <= 3.0) {
      lakeGroup.position.x = mapR(
        rawProgress,
        2.0,
        2.6,
        pos.lake.x,
        pos.house.x,
        easeInOutCubic,
      );
      lakeGroup.position.y = mapR(
        rawProgress,
        2.0,
        2.6,
        pos.lake.y,
        pos.house.y - 1.2,
        easeInOutCubic,
      );
      lakeGroup.scale.set(1, 1, 1);
    } else if (rawProgress <= 4.0) {
      lakeGroup.position.x = pos.house.x;
      lakeGroup.position.y = mapR(
        rawProgress,
        3.0,
        3.3,
        pos.house.y - 1.2,
        pos.house.y + 8 - 1.2,
        (t) => t,
      );
      const s = mapR(rawProgress, 3.0, 3.3, 1, 0, (t) => t);
      lakeGroup.scale.set(s, s, s);
    } else {
      lakeGroup.scale.set(0, 0, 0);
    }

    // D. HOUSE
    if (rawProgress <= 2.0) {
      houseGroup.scale.set(0, 0, 0);
    } else if (rawProgress <= 3.0) {
      houseGroup.position.x = mapR(
        rawProgress,
        2.0,
        2.6,
        pos.lake.x,
        pos.house.x,
        easeInOutCubic,
      );
      
      // Fluid "forming out of the lake" animation
      if (rawProgress < 2.4) {
        houseGroup.scale.set(0, 0, 0);
      } else {
        // XZ starts wide (puddle) and narrows to actual size
        const sxz = mapR(rawProgress, 2.4, 2.9, HOUSE_SCALE * 1.5, HOUSE_SCALE, easeInOutCubic);
        // Y starts flat (0) and extrudes upwards
        const sy = mapR(rawProgress, 2.4, 2.9, 0, HOUSE_SCALE, easeInOutCubic);
        houseGroup.scale.set(sxz, sy, sxz);
        
        // Rise from lake surface up to final position
        houseGroup.position.y = mapR(
          rawProgress,
          2.4,
          2.9,
          pos.house.y - 1.2, // Lake surface height
          pos.house.y,
          easeInOutCubic,
        );
      }
    } else if (rawProgress <= 4.0) {
      houseGroup.position.x = pos.house.x;
      houseGroup.position.y = mapR(
        rawProgress,
        3.0,
        3.3,
        pos.house.y,
        pos.house.y + 8,
        (t) => t,
      );
      const s = mapR(rawProgress, 3.0, 3.3, HOUSE_SCALE, 0, (t) => t);
      houseGroup.scale.set(s, s, s);
    } else {
      houseGroup.scale.set(0, 0, 0);
    }

    // E. WAREHOUSE
    if (rawProgress <= 3.0) {
      warehouseGroup.scale.set(0, 0, 0);
    } else if (rawProgress <= 4.0) {
      warehouseGroup.position.x = pos.ware.x;
      const easeDrop = (t: number) => 1 - Math.pow(1 - t, 3);
      warehouseGroup.position.y = mapR(
        rawProgress,
        3.4,
        3.8,
        pos.ware.y + 12,
        pos.ware.y,
        easeDrop,
      );
      const rawDrop = mapR(rawProgress, 3.4, 3.8, 0, 1, (t) => t);
      const s = rawDrop > 0.01 ? WAREHOUSE_SCALE : 0;
      warehouseGroup.scale.set(s, s, s);
    } else if (rawProgress <= 5.0) {
      warehouseGroup.position.x = pos.ware.x;
      warehouseGroup.position.y = mapR(
        rawProgress,
        4.0,
        4.6,
        pos.ware.y,
        pos.ware.y - 15,
        easeInOutCubic,
      );
      const s = mapR(rawProgress, 4.0, 4.6, WAREHOUSE_SCALE, 0, easeInOutCubic);
      warehouseGroup.scale.set(s, s, s);
    } else {
      warehouseGroup.scale.set(0, 0, 0);
    }

    // --- 3. GLOBAL MOBILE SWIPE OVERRIDE FOR PIPELINE MODELS ---
    if (isMobile && pipelineVisible) {
      if (mascotGroup?.visible)
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

<Environment
  url="https://dl.polyhaven.org/file/ph-assets/HDRIs/exr/1k/abandoned_parking_1k.exr"
/>

<T.PerspectiveCamera makeDefault position={[0, 0, cameraZ]} fov={cameraFov}>
  <T.DirectionalLight
    position={[5, 5, 5]}
    intensity={$theme === "light" ? 3.5 : 2}
  />
  <T.AmbientLight intensity={$theme === "light" ? 1.5 : 0.7} />
</T.PerspectiveCamera>

<T.Group
  bind:ref={mascotGroup}
  position={[pos.start.x, pos.start.y, pos.start.z]}
>
  <Float speed={2} rotationIntensity={0.5} floatIntensity={mascotFloatIntensity}>
    <Hero3D />
  </Float>
</T.Group>

<T.Group
  bind:ref={pipeGroup}
  position={[pos.pipe.x, -15, 0]}
  rotation.z={0}
  scale={PIPE_SCALE}
>
  <Pipe3D drainProgress={pipeDrainProgress} />
</T.Group>

<T.Group bind:ref={lakeGroup} position={[pos.lake.x, -20, 0]}>
  <Datalake3D />
</T.Group>

<T.Group bind:ref={houseGroup} position={[pos.house.x, -20, 0]} scale={0}>
  <Lakehouse3D />
</T.Group>

<T.Group bind:ref={warehouseGroup} position={[pos.ware.x, -20, 0]} scale={0}>
  <Warehouse3D />
</T.Group>

<!-- Metrics Section -->
<T.Group
  bind:ref={expGroup}
  position={[isMobile ? 0 : -4.5, 0, 0]}
  visible={false}
>
  <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
    <Experience3D />
  </Float>
</T.Group>
<T.Group
  bind:ref={techGroup}
  position={[isMobile ? 0 : 4.5, 0, 0]}
  visible={false}
>
  <Float speed={1.2} rotationIntensity={0.6} floatIntensity={0.4}>
    <TechStack3D />
  </Float>
</T.Group>
<T.Group
  bind:ref={ghGroup}
  position={[isMobile ? 0 : -4.5, 0, 0]}
  visible={false}
>
  <Float speed={1.8} rotationIntensity={0.5} floatIntensity={0.5}>
    <Github3D />
  </Float>
</T.Group>
<T.Group
  bind:ref={impactGroup}
  position={[isMobile ? 0 : 4.5, 0, 0]}
  visible={false}
>
  <Float speed={1} rotationIntensity={0.3} floatIntensity={0.7}>
    <Impact3D />
  </Float>
</T.Group>
<T.Group
  bind:ref={credGroup}
  position={[isMobile ? 0 : -4.5, 0, 0]}
  visible={false}
>
  <Float speed={1.3} rotationIntensity={0} floatIntensity={0}>
    <Credentials3D />
  </Float>
</T.Group>
<T.Group
  bind:ref={contactGroup}
  position={[isMobile ? 0 : 4.5, 0, 0]}
  visible={false}
>
  <Float speed={2} rotationIntensity={0.2} floatIntensity={0.8}>
    <Contact3D />
  </Float>
</T.Group>
