// src/lib/stores/theme.ts
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Theme = 'light' | 'dark';

function createThemeStore() {
  const { subscribe, set } = writable<Theme>('dark'); // ✅ Default to dark

  return {
    subscribe,
    init: () => {
      if (browser) {
        // Check localStorage first
        const stored = localStorage.getItem('theme') as Theme | null;
        
        if (stored) {
          set(stored);
          document.documentElement.classList.toggle('dark', stored === 'dark');
        } else {
          // ✅ If no stored preference, default to dark
          set('dark');
          document.documentElement.classList.add('dark');
          localStorage.setItem('theme', 'dark');
        }
      }
    },
    set: (value: Theme) => {
      if (browser) {
        set(value);
        localStorage.setItem('theme', value);
        document.documentElement.classList.toggle('dark', value === 'dark');
      }
    },
    toggle: () => {
      if (browser) {
        const current = localStorage.getItem('theme') as Theme | 'dark';
        const newTheme: Theme = current === 'dark' ? 'light' : 'dark';
        set(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
      }
    }
  };
}

export const theme = createThemeStore();
