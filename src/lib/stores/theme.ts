// src/lib/stores/theme.ts
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Theme = 'light' | 'dark';

// Soft Pastel palette for 3D components
const pastelLavender = {
  dark: { deep: "#1a1530", surf: "#6d5daa", foam: "#b4a7e0", transparent: true },
  light: { deep: "#4a3d8f", surf: "#7c6dc0", foam: "#2d2060", transparent: false }
};

const pastelSage = {
  dark: { deep: "#142018", surf: "#4a8f6a", foam: "#8dd4aa" },
  light: { deep: "#2d7050", surf: "#5aaa7a", foam: "#1a4530" }
};

const pastelPeach = {
  dark: { deep: "#2a1a14", surf: "#c08060", foam: "#f0c0a0" },
  light: { deep: "#8a5a3a", surf: "#c09070", foam: "#5a3020" }
};

export const themeColors = pastelLavender;

export const modelMaterials = {
  dataHouse: pastelLavender,
  dataWarehouse: pastelLavender,
  techCube: pastelLavender,
  experienceGem: pastelLavender,
  githubOcta: pastelLavender,
  impactTorus: pastelPeach,
  credentialShield: pastelPeach,
  contactBeacon: pastelSage,
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
