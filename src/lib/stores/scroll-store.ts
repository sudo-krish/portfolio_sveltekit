import { writable } from 'svelte/store';

// This store holds the target ID of the section that the Mobile CTAs want to navigate to.
// +page.svelte subscribes to this store to handle the actual GSAP-bound scrolling.
export const scrollTriggerTarget = writable<string | null>(null);
