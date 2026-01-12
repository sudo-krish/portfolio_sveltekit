<!-- src/lib/components/home/3d/HomeScene.svelte -->
<script lang="ts">
  import { T } from "@threlte/core";
  import { Environment, Float } from "@threlte/extras";
  import gsap from "gsap";
  import { onMount, onDestroy } from "svelte";
  
  import DataMascot from "./DataMascot.svelte";
  import GlassPipe from "./GlassPipe.svelte";
  import DataLake from "./DataLake.svelte";
  import DataHouse from "./DataHouse.svelte";
  import DataWarehouse from "./DataWarehouse.svelte";

  let mascotGroup: any;
  let pipeGroup: any;
  let lakeGroup: any;
  let houseGroup: any;
  let warehouseGroup: any;

  // LAYOUT CONFIG
  let isMobile = false;
  
  // DAMPING VARIABLES
  let scrollY_target = 0;  // Where the scrollbar actually is
  let scrollY_current = 0; // Where the animation is right now
  let innerHeight = 1000;

  // POSITIONS & SCALES
  let startPos = { x: 3.2, y: 0.2, z: 0 };
  let pipePos  = { x: -3.2, y: -0.5, z: 0 };
  let lakePos  = { x: 3.2, y: -1.0, z: 0 };
  let housePos = { x: -3.2, y: 0.2, z: 0 };
  let warePos  = { x: 3.2, y: 0.0, z: 0 };

  const HERO_SCALE = 1.2;
  const PIPE_ENTRY_SCALE = 0.5;
  const COMPACT_SCALE = 0.35;
  const HOUSE_SCALE = 0.45;
  const WAREHOUSE_SCALE = 0.7; 

  function updateLayout() {
    if (typeof window === 'undefined') return;
    isMobile = window.innerWidth < 1024;
    innerHeight = window.innerHeight || 1000;

    if (isMobile) {
      startPos = { x: 0, y: -2.0, z: 0 };
      pipePos  = { x: 0, y: 1.5, z: 0 };
      lakePos  = { x: 0, y: -1.5, z: 0 };
      housePos = { x: 0, y: 1.5, z: 0 };
      warePos  = { x: 0, y: -1.5, z: 0 };
    } else {
      startPos = { x: 3.2, y: 0.2, z: 0 };
      pipePos  = { x: -3.2, y: -0.5, z: 0 };
      lakePos  = { x: 3.2, y: -1.0, z: 0 };
      housePos = { x: -3.2, y: 0.2, z: 0 };
      warePos  = { x: 3.2, y: 0.0, z: 0 };
    }
  }

  // --- THE SMOOTHING LOOP ---
  const tick = () => {
    if (!mascotGroup) return;

    // 1. Smoothly interpolate 'current' towards 'target'
    // The 0.05 factor controls speed/smoothness. 
    // Lower (0.02) = Slower/Smoother. Higher (0.1) = Faster/Snappier.
    scrollY_current += (scrollY_target - scrollY_current) * 0.05;

    // 2. Use the SMOOTHED value for all logic
    const rawProgress = scrollY_current / innerHeight;

    // --- YOUR EXACT LOGIC (using rawProgress) ---
    if (rawProgress <= 1.0) {
        const p1 = Math.max(0, rawProgress);
        const moveP = gsap.utils.clamp(0, 1, gsap.utils.mapRange(0, 0.5, 0, 1, p1));
        mascotGroup.position.x = gsap.utils.interpolate(startPos.x, pipePos.x, moveP);
        mascotGroup.position.y = gsap.utils.interpolate(startPos.y, pipePos.y, moveP);
        mascotGroup.position.z = gsap.utils.interpolate(startPos.z, pipePos.z, moveP);
        const mScale = gsap.utils.interpolate(HERO_SCALE, PIPE_ENTRY_SCALE, moveP);
        mascotGroup.scale.set(mScale, mScale, mScale);
        const pipeRiseP = gsap.utils.clamp(0, 1, gsap.utils.mapRange(0.5, 0.75, 0, 1, p1));
        pipeGroup.position.x = pipePos.x;
        pipeGroup.position.y = gsap.utils.interpolate(-15, pipePos.y, pipeRiseP);
        const rotP = gsap.utils.clamp(0, 1, gsap.utils.mapRange(0.75, 1.0, 0, 1, p1));
        pipeGroup.rotation.z = gsap.utils.interpolate(0, Math.PI/2, rotP);
        const finalShrink = gsap.utils.interpolate(PIPE_ENTRY_SCALE, COMPACT_SCALE, rotP);
        pipeGroup.scale.set(finalShrink, finalShrink, finalShrink);
        if(rotP > 0) mascotGroup.scale.set(finalShrink, finalShrink, finalShrink);

    } else if (rawProgress <= 2.0) {
        const p2 = rawProgress - 1;
        houseGroup.scale.set(0, 0, 0);
        const pipeMoveP = gsap.utils.clamp(0, 1, gsap.utils.mapRange(0, 0.3, 0, 1, p2));
        const pourX = gsap.utils.interpolate(pipePos.x, lakePos.x, pipeMoveP);
        pipeGroup.position.x = pourX;
        pipeGroup.rotation.z = gsap.utils.interpolate(Math.PI/2, Math.PI, pipeMoveP);
        if (p2 < 0.3) {
            mascotGroup.position.x = pourX;
            mascotGroup.position.y = pipePos.y;
        }
        const tipP = gsap.utils.clamp(0, 1, gsap.utils.mapRange(0.3, 0.5, 0, 1, p2));
        pipeGroup.rotation.z = gsap.utils.interpolate(Math.PI/2, Math.PI, tipP);
        const fallP = gsap.utils.clamp(0, 1, gsap.utils.mapRange(0.5, 0.65, 0, 1, p2));
        if (p2 >= 0.3) {
            mascotGroup.position.x = lakePos.x; 
            mascotGroup.position.y = gsap.utils.interpolate(pipePos.y, lakePos.y, fallP);
        }
        const pipeExitP = gsap.utils.clamp(0, 1, gsap.utils.mapRange(0.6, 0.8, 0, 1, p2));
        const pipeY = gsap.utils.interpolate(pipePos.y, 10, pipeExitP);
        pipeGroup.position.y = pipeY;
        const dissolveP = gsap.utils.clamp(0, 1, gsap.utils.mapRange(0.65, 0.85, 0, 1, p2));
        const mScale = gsap.utils.interpolate(COMPACT_SCALE, 0.2, dissolveP);
        mascotGroup.scale.set(mScale, mScale, mScale);
        const lakeRiseP = gsap.utils.clamp(0, 1, gsap.utils.mapRange(0.7, 1.0, 0, 1, p2));
        lakeGroup.position.x = lakePos.x;
        lakeGroup.position.y = gsap.utils.interpolate(-10, lakePos.y, lakeRiseP);
        lakeGroup.scale.set(1, 1, 1);

    } else if (rawProgress <= 3.0) {
        const p3 = rawProgress - 2;
        const dissolveP = gsap.utils.clamp(0, 1, gsap.utils.mapRange(0.65, 0.85, 0, 1, rawProgress));
        const mScale = gsap.utils.interpolate(COMPACT_SCALE, 0.0, dissolveP);
        mascotGroup.scale.set(mScale, mScale, mScale);

        warehouseGroup.scale.set(0, 0, 0);
        const moveP = gsap.utils.clamp(0, 1, gsap.utils.mapRange(0, 0.5, 0, 1, p3));
        const targetX = gsap.utils.interpolate(lakePos.x, housePos.x, moveP);
        const lakeTargetY = housePos.y - 1.2; 
        const targetY = gsap.utils.interpolate(lakePos.y, lakeTargetY, moveP);
        lakeGroup.position.x = targetX;
        lakeGroup.position.y = targetY;
        lakeGroup.scale.set(1, 1, 1); 
        const houseGrowP = gsap.utils.clamp(0, 1, gsap.utils.mapRange(0.4, 0.8, 0, 1, p3));
        const hScale = gsap.utils.interpolate(0, HOUSE_SCALE, houseGrowP);
        houseGroup.scale.set(hScale, hScale, hScale);
        houseGroup.position.x = targetX;
        const riseStart = lakeTargetY - 0.5;
        const riseEnd = housePos.y; 
        houseGroup.position.y = gsap.utils.interpolate(riseStart, riseEnd, houseGrowP);

    } else if (rawProgress > 3.0) {
        const p4 = Math.min(rawProgress - 3, 1);
        
        const houseExitP = gsap.utils.clamp(0, 1, gsap.utils.mapRange(0, 0.3, 0, 1, p4));
        houseGroup.position.y = gsap.utils.interpolate(housePos.y, housePos.y + 2, houseExitP);
        houseGroup.position.x = housePos.x; 
        
        const hScale = gsap.utils.interpolate(HOUSE_SCALE, 0, houseExitP);
        houseGroup.scale.set(hScale, hScale, hScale);

        const lakeMoveP = gsap.utils.clamp(0, 1, gsap.utils.mapRange(0.2, 0.6, 0, 1, p4));
        const lakeTargetX = warePos.x;
        const lakeCurrentX = gsap.utils.interpolate(housePos.x, lakeTargetX, lakeMoveP);
        
        lakeGroup.position.x = lakeCurrentX;
        lakeGroup.position.y = housePos.y - 1.2; 

        const dropP = gsap.utils.clamp(0, 1, gsap.utils.mapRange(0.5, 0.8, 0, 1, p4));
        const dropYStart = warePos.y + 5; 
        const dropYEnd = warePos.y;
        
        const easeDrop = 1 - Math.pow(1 - dropP, 4); 
        
        warehouseGroup.position.x = warePos.x;
        warehouseGroup.position.y = gsap.utils.interpolate(dropYStart, dropYEnd, easeDrop);
        
        const wScale = dropP > 0.01 ? WAREHOUSE_SCALE : 0;
        warehouseGroup.scale.set(wScale, wScale, wScale);

        const absorbP = gsap.utils.clamp(0, 1, gsap.utils.mapRange(0.7, 0.9, 0, 1, p4));
        const lScale = gsap.utils.interpolate(1, 0, absorbP);
        lakeGroup.scale.set(lScale, lScale, lScale);
    }
  };

  onMount(() => {
    updateLayout();
    window.addEventListener('resize', updateLayout);

    const container = document.querySelector('.snap-container');
    if (container) {
      // Initialize immediately to prevent jumps
      scrollY_target = container.scrollTop;
      scrollY_current = container.scrollTop;
      innerHeight = container.clientHeight;

      container.addEventListener('scroll', () => {
        // Just update the target. The loop (tick) handles the rest.
        scrollY_target = container.scrollTop;
      });
    }

    // Start Loop
    gsap.ticker.add(tick);

    return () => {
      window.removeEventListener('resize', updateLayout);
      gsap.ticker.remove(tick);
    };
  });
</script>

<!-- SCENE SETUP (No changes needed below) -->
<Environment preset="city" />

<T.PerspectiveCamera makeDefault position={[0, 0, 10]} fov={35}>
  <T.DirectionalLight position={[5, 5, 5]} intensity={2} />
  <T.AmbientLight intensity={0.5} />
</T.PerspectiveCamera>

<T.Group bind:ref={mascotGroup} position={[startPos.x, startPos.y, startPos.z]} scale={HERO_SCALE}>
  <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
    <DataMascot />
  </Float>
</T.Group>

<T.Group bind:ref={pipeGroup} position={[pipePos.x, -15, 0]} rotation.z={0} scale={PIPE_ENTRY_SCALE}>
  <GlassPipe />
</T.Group>

<T.Group bind:ref={lakeGroup} position={[lakePos.x, -20, 0]}>
  <DataLake />
</T.Group>

<T.Group bind:ref={houseGroup} position={[housePos.x, -20, 0]} scale={0}>
  <DataHouse />
</T.Group>

<T.Group bind:ref={warehouseGroup} position={[warePos.x, -20, 0]} scale={0}>
  <DataWarehouse />
</T.Group>
