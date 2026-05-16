// src/lib/stores/theme.ts
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

import { Color } from 'three';

export type Theme = 'light' | 'dark';

function hslToHex(hslString: string): string {
  if (!hslString) return '#ffffff';
  // handle format like "270 70% 60%" or "270 70% 60% / 0.5"
  const parts = hslString.split('/').map(p => p.trim())[0].split(' ').map(v => parseFloat(v));
  if (parts.length < 3) return '#ffffff';
  const h = parts[0] / 360;
  const s = parts[1] / 100;
  const l = parts[2] / 100;
  const color = new Color();
  color.setHSL(h, s, l);
  return '#' + color.getHexString();
}

// We can extract colors from CSS directly
export function getThemeColor(varName: string): Color {
  if (!browser) return new Color('#ffffff');
  const val = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  return new Color(hslToHex(val));
}

// Instead of static modelMaterials, we will just read CSS variables within the components themselves,
// or provide a helper store that updates when the theme changes.
export const cssColors = writable({
  primary: '#000000',
  background: '#000000',
  card: '#000000',
  accent: '#000000'
});

function updateCssColors() {
  if (!browser) return;
  cssColors.set({
    primary: hslToHex(getComputedStyle(document.documentElement).getPropertyValue('--primary').trim()),
    background: hslToHex(getComputedStyle(document.documentElement).getPropertyValue('--background').trim()),
    card: hslToHex(getComputedStyle(document.documentElement).getPropertyValue('--card').trim()),
    accent: hslToHex(getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()),
  });
}

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
        // Small delay to allow CSS custom properties to evaluate after class toggle
        setTimeout(updateCssColors, 10);
      }
    },
    set: (value: Theme) => {
      if (browser) {
        set(value);
        localStorage.setItem('theme', value);
        document.documentElement.classList.toggle('light', value === 'light');
        setTimeout(updateCssColors, 10);
      }
    },
    toggle: () => {
      if (browser) {
        const current = localStorage.getItem('theme') as Theme | 'dark';
        const newTheme: Theme = current === 'dark' ? 'light' : 'dark';
        set(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('light', newTheme === 'light');
        setTimeout(updateCssColors, 10);
      }
    }
  };
}

export const theme = createThemeStore();
