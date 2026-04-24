// src/lib/stores/theme.ts
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Theme = 'light' | 'dark';

// Unified Vibrant Cyber Cyan theme for the 3D components
const vibrantCyan = {
  dark: { deep: "#001f29", surf: "#0088a8", foam: "#00e5ff", transparent: true },
  light: { deep: "#006b7a", surf: "#00b4d8", foam: "#005f73", transparent: false }
};

const vibrantAmber = {
  dark: { deep: "#291600", surf: "#a85d00", foam: "#ffbf00" },
  light: { deep: "#7a4100", surf: "#d88200", foam: "#5f3000" }
};

const vibrantGreen = {
  dark: { deep: "#002910", surf: "#00a842", foam: "#00ff73" },
  light: { deep: "#007a30", surf: "#00d85f", foam: "#005f20" }
};

export const themeColors = vibrantCyan;

export const modelMaterials = {
  dataHouse: vibrantCyan,
  dataWarehouse: vibrantCyan,
  techCube: vibrantCyan,
  experienceGem: vibrantCyan,
  githubOcta: vibrantCyan,
  impactTorus: vibrantAmber, // Keep Torus warm but make it vibrant
  credentialShield: vibrantAmber, // Shield is vibrant gold
  contactBeacon: vibrantGreen, // Make contact beacon vibrant green
};

function createThemeStore() {
  const { subscribe, set } = writable<Theme>('dark');

  return {
    subscribe,
    init: () => {
      if (browser) {
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
