// src/lib/stores/theme.ts
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Theme = 'light' | 'dark';

// Base sea-water palette (used by GlassPipe, DataLake, LiquidMascot, DataMascot)
export const themeColors = {
  dark: {
    deep: "#0a1628",   // Deep ocean midnight
    surf: "#0e7490",   // Dark teal water
    foam: "#22d3ee",   // Bioluminescent cyan glow
    transparent: true,
  },
  light: {
    deep: "#0c4a6e",   // Rich dark ocean blue (HIGH CONTRAST against white bg)
    surf: "#0891b2",   // Vivid teal (the sea itself)
    foam: "#164e63",   // Dark cyan edges (NOT white — dark rim for contrast)
    transparent: false,
  }
};

// Per-model material profiles — each model gets distinct character within the theme
export const modelMaterials = {
  // DataHouse (Lakehouse): Frosted ice crystal — cool, translucent
  dataHouse: {
    dark:  { deep: "#0c1929", surf: "#1e6091", foam: "#67e8f9" },
    light: { deep: "#155e75", surf: "#22d3ee", foam: "#0e7490" },
  },
  // DataWarehouse: Industrial steel — dark, metallic blue-gray
  dataWarehouse: {
    dark:  { deep: "#0f172a", surf: "#334155", foam: "#60a5fa" },
    light: { deep: "#1e293b", surf: "#475569", foam: "#1e3a5f" },
  },
  // TechCube (Skills): Holographic chip — bright, prismatic accent
  techCube: {
    dark:  { deep: "#0a1628", surf: "#7c3aed", foam: "#22d3ee" },
    light: { deep: "#4c1d95", surf: "#7c3aed", foam: "#0c4a6e" },
  },
  // ExperienceGem: Classic sea gem — the original sea-water palette works perfectly
  experienceGem: {
    dark:  { deep: "#0a1628", surf: "#0e7490", foam: "#22d3ee" },
    light: { deep: "#0c4a6e", surf: "#0891b2", foam: "#164e63" },
  },
  // GithubOcta: Clean monochrome — single deep tone, subtle edge glow
  githubOcta: {
    dark:  { deep: "#0f172a", surf: "#1e293b", foam: "#38bdf8" },
    light: { deep: "#0f172a", surf: "#334155", foam: "#1e3a5f" },
  },
  // ImpactTorus (Balance): Warm coral/sunset accent — stands out from blues
  impactTorus: {
    dark:  { deep: "#1c1917", surf: "#c2410c", foam: "#fb923c" },
    light: { deep: "#7c2d12", surf: "#ea580c", foam: "#431407" },
  },
  // CredentialShield: Golden premium seal — warm, prestigious
  credentialShield: {
    dark:  { deep: "#1c1917", surf: "#a16207", foam: "#fbbf24" },
    light: { deep: "#78350f", surf: "#b45309", foam: "#451a03" },
  },
  // ContactBeacon (Phone): Sleek dark glass — minimal, professional
  contactBeacon: {
    dark:  { deep: "#0f172a", surf: "#1e293b", foam: "#94a3b8" },
    light: { deep: "#1e293b", surf: "#475569", foam: "#0f172a" },
  },
};

function createThemeStore() {
  const { subscribe, set } = writable<Theme>('dark');

  return {
    subscribe,
    init: () => {
      if (browser) {
        // Check localStorage first
        const stored = localStorage.getItem('theme') as Theme | null;
        
        if (stored) {
          set(stored);
          document.documentElement.classList.toggle('light', stored === 'light');
        } else {
          set('dark');
          document.documentElement.classList.remove('light');
          localStorage.setItem('theme', 'dark');
        }
      }
    },
    set: (value: Theme) => {
      if (browser) {
        set(value);
        localStorage.setItem('theme', value);
        document.documentElement.classList.toggle('light', value === 'light');
      }
    },
    toggle: () => {
      if (browser) {
        const current = localStorage.getItem('theme') as Theme | 'dark';
        const newTheme: Theme = current === 'dark' ? 'light' : 'dark';
        set(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('light', newTheme === 'light');
      }
    }
  };
}

export const theme = createThemeStore();
