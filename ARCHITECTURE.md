# Architecture Overview

This portfolio blends a persistent 3D WebGL scene with scroll-triggered DOM elements using a specialized "stacked" layout for both Desktop and Mobile.

## 1. Global Scene & Canvas (`+page.svelte` & `LazySceneWrapper.svelte`)
- The `HomeScene.svelte` is rendered behind the rest of the application using a `z-index: 0` fixed wrapper.
- The 3D scene responds globally to an `activeSectionIndex` store, which updates the position, scale, and visibility of various 3D models (Hero, Pipeline, Lakehouse, etc.).

## 2. Desktop Navigation (GSAP ScrollTrigger)
- On desktop (`min-width: 1024px`), native scrolling is **intercepted** by a GSAP `ScrollTrigger.observe` instance attached to a full-screen `snap-container`.
- The `gotoSection()` function forces GSAP to seamlessly jump to the next DOM section (`.snap-section`) using the `ScrollToPlugin`.
- This ensures that 3D animations always sync perfectly with the active DOM content on screen.

## 3. Mobile Navigation (`MobileCarousel.svelte`)
- Mobile browsers struggle with intercepting native scrolls during heavy 3D rendering.
- To solve this, `MobileCarousel.svelte` disables the complex CSS `scroll-snap-type` and implements a "Stacked Parallax" layout.
- The 3D scene is visible through a transparent 100dvh spacer block.
- As the user scrolls naturally down, the glassmorphic content block slides up to overlay the 3D scene. 
- Fast scrolling past the boundary requires a deliberate secondary swipe to trigger the section jump (preventing accidental skips).

## 4. Performance Optimizations
- **DPR Capping**: The `devicePixelRatio` is capped at `1.0` on mobile and `1.5` on desktop to prevent heavy 8K rendering loads on modern displays.
- **Material Simplification**: Expensive `MeshPhysicalMaterial` transmission effects (refraction) are dynamically disabled for mobile users and replaced with highly optimized transparency.
- **Geometry Decimation**: Vertex counts for dynamic items (like the Datalake plane) are halved on mobile viewports.
- **DOM Blur Avoidance**: Heavy `backdrop-filter: blur()` properties are removed during 3D CSS transforms (like the 180-degree flip) to maintain 60fps compositing on mobile GPUs.
