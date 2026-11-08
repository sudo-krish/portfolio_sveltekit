import { describe, it, expect, beforeEach } from 'vitest';
import { get } from 'svelte/store';
import {
  isCommandPaletteOpen,
  openCommandPalette,
  closeCommandPalette,
  toggleCommandPalette,
} from './command-palette';

describe('command-palette store', () => {
  beforeEach(() => {
    isCommandPaletteOpen.set(false);
  });

  it('should initialize as closed', () => {
    expect(get(isCommandPaletteOpen)).toBe(false);
  });

  it('should open command palette', () => {
    openCommandPalette();
    expect(get(isCommandPaletteOpen)).toBe(true);
  });

  it('should close command palette', () => {
    isCommandPaletteOpen.set(true);
    closeCommandPalette();
    expect(get(isCommandPaletteOpen)).toBe(false);
  });

  it('should toggle command palette state', () => {
    toggleCommandPalette();
    expect(get(isCommandPaletteOpen)).toBe(true);
    toggleCommandPalette();
    expect(get(isCommandPaletteOpen)).toBe(false);
  });
});
