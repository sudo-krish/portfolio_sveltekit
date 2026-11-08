// src/lib/stores/command-palette.ts
import { writable } from 'svelte/store';

export const isCommandPaletteOpen = writable<boolean>(false);

export function openCommandPalette() {
    isCommandPaletteOpen.set(true);
}

export function closeCommandPalette() {
    isCommandPaletteOpen.set(false);
}

export function toggleCommandPalette() {
    isCommandPaletteOpen.update((open) => !open);
}
