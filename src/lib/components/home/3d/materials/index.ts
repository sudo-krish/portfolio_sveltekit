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



const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

// --------------------------------------------------------
// 2. WATER DROPLET MATERIAL (For Hero3D only)
//    Optimized for mobile by replacing expensive transmission 
//    with standard transparency.
// --------------------------------------------------------
export const waterDropletMaterial = new MeshPhysicalMaterial({
  color: 0x0ea5e9,
  metalness: isMobile ? 0.6 : 0.15,
  roughness: 0.05,
  transmission: isMobile ? 0 : 0.92, // Transmission kills mobile GPUs
  opacity: isMobile ? 0.75 : 1,
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
    waterDropletMaterial.metalness = isMobile ? 0.6 : 0.15;
    waterDropletMaterial.roughness = 0.05;
    waterDropletMaterial.transmission = isMobile ? 0 : 0.92;
    waterDropletMaterial.opacity = isMobile ? 0.75 : 1;
  } else {
    // Light glass on dark background — elegant contrast
    glassMaterial.color.set('#e8e8ed');
    glassMaterial.metalness = 0.9;
    glassMaterial.roughness = 0.06;

    // Deeper water
    waterDropletMaterial.color.set('#0369a1');
    waterDropletMaterial.metalness = isMobile ? 0.8 : 0.5;
    waterDropletMaterial.roughness = 0.1;
    waterDropletMaterial.transmission = isMobile ? 0 : 0.85;
    waterDropletMaterial.opacity = isMobile ? 0.8 : 1;
  }

  glassMaterial.needsUpdate = true;
  waterDropletMaterial.needsUpdate = true;
});
