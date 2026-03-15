import { writable } from 'svelte/store';

// This store holds the target ID of the section that the Mobile CTAs want to navigate to.
// +page.svelte subscribes to this store to handle the actual GSAP-bound scrolling.
export const scrollTriggerTarget = writable<string | null>(null);

// This store holds relative navigation direction (1 for next, -1 for prev)
export const scrollDirection = writable<number>(0);
