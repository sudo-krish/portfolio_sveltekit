// src/lib/stores/carousel-store.ts
// Shared store: tracks the horizontal scroll fraction of the currently visible mobile carousel.
// 0 = fully on the 3D slide, 1 = fully on the content slide.
// HomeScene reads this to shift the 3D model off-screen in sync with the swipe.

import { writable } from "svelte/store";

/**
 * carouselSwipeFraction: 0..1
 *   0 = 3D slide in full view
 *   1 = content slide in full view
 */
export const carouselSwipeFraction = writable(0);

/**
 * Which direction the 3D should exit when swiping to content.
 * "left"  layout → 3D is on left slide  → model should exit to the LEFT  (negative X)
 * "right" layout → 3D is on right slide → model should exit to the RIGHT (positive X)
 */
export const carouselExitDirection = writable<"left" | "right">("left");
