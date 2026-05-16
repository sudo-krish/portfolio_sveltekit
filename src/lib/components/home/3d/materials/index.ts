import { MeshStandardMaterial, MeshPhysicalMaterial } from 'three';
import { theme } from '$lib/stores/theme';

// --------------------------------------------------------
// 1. GLASS MATERIAL (Singleton — MeshStandardMaterial)
//    Optimized: No transmission = no extra render pass.
//    Uses metalness + roughness + opacity to fake glass.
// --------------------------------------------------------
export const glassMaterial = new MeshStandardMaterial({
  color: 0xe5e5e5,
  metalness: 0.85,        // High metalness = reflective surface
  roughness: 0.08,        // Very smooth = sharp reflections
  transparent: true,
  opacity: 0.92,          // Slight translucency hint
  envMapIntensity: 1.2,   // Boost environment reflections
});



// --------------------------------------------------------
// 2. WATER DROPLET MATERIAL (For Hero3D only)
//    Kept as MeshPhysicalMaterial — only 1 instance,
//    so the transmission cost is acceptable for the hero.
// --------------------------------------------------------
export const waterDropletMaterial = new MeshPhysicalMaterial({
  color: 0x0ea5e9,
  metalness: 0.15,
  roughness: 0.05,
  transmission: 0.92,
  thickness: 1.5,
  ior: 1.33,
  clearcoat: 1.0,
  clearcoatRoughness: 0.05,
  transparent: true,
});

// --------------------------------------------------------
// Theme-reactive updates
// --------------------------------------------------------
theme.subscribe((t) => {
  if (t === 'light') {
    // Dark glass on light background — high contrast
    glassMaterial.color.set('#1c1c1e');
    glassMaterial.metalness = 0.8;
    glassMaterial.roughness = 0.1;


    // Bright water
    waterDropletMaterial.color.set('#0ea5e9');
    waterDropletMaterial.metalness = 0.15;
    waterDropletMaterial.roughness = 0.05;
    waterDropletMaterial.transmission = 0.92;
  } else {
    // Light glass on dark background — elegant contrast
    glassMaterial.color.set('#e8e8ed');
    glassMaterial.metalness = 0.9;
    glassMaterial.roughness = 0.06;


    // Deeper water
    waterDropletMaterial.color.set('#0369a1');
    waterDropletMaterial.metalness = 0.5;
    waterDropletMaterial.roughness = 0.1;
    waterDropletMaterial.transmission = 0.85;
  }

  glassMaterial.needsUpdate = true;
  waterDropletMaterial.needsUpdate = true;
});
