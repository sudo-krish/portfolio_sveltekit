import { describe, it, expect, beforeEach, vi } from 'vitest';
import { get } from 'svelte/store';
import { theme, getThemeColor, cssColors } from './theme';

vi.mock('$app/environment', () => ({
  browser: true,
}));

// Mock localStorage and document for jsdom environment if needed
beforeEach(() => {
  const store: Record<string, string> = {};
  vi.stubGlobal('localStorage', {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
  });
});

describe('theme store', () => {
  it('should initialize with a default value', () => {
    const currentTheme = get(theme);
    expect(['light', 'dark']).toContain(currentTheme);
  });

  it('should initialize from stored value and set theme explicitly', async () => {
    vi.useFakeTimers();
    localStorage.setItem('theme', 'light');
    document.documentElement.style.setProperty('--primary', '270 70% 60%');
    theme.init();
    vi.runAllTimers();
    expect(get(theme)).toBe('light');
    expect(get(cssColors).primary).toBeDefined();

    theme.set('dark');
    vi.runAllTimers();
    expect(get(theme)).toBe('dark');
    vi.useRealTimers();
  });

  it('should extract theme color from CSS variable', () => {
    document.documentElement.style.setProperty('--test-var', '180 50% 50%');
    const c = getThemeColor('--test-var');
    expect(c.getHexString()).toBeDefined();
  });

  it('should toggle theme', () => {
    theme.init();
    const initialTheme = get(theme);
    theme.toggle();
    const newTheme = get(theme);
    expect(newTheme).not.toBe(initialTheme);
    // Reset back
    theme.toggle();
  });
});
