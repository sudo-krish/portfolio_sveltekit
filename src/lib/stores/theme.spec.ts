import { describe, it, expect, beforeEach, vi } from 'vitest';
import { get } from 'svelte/store';
import { theme } from './theme';

vi.mock('$app/environment', () => ({
    browser: true
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

    it('should toggle theme', () => {
        theme.init();
        const initialTheme = get(theme);
        theme.toggle();
        const newTheme = get(theme);
        // Depending on whether jsdom's localStorage mock retains state correctly, 
        // this expectation might need adjusting, but logically this is the structure.
        expect(newTheme).not.toBe(initialTheme);
        // Reset back
        theme.toggle();
    });
});
