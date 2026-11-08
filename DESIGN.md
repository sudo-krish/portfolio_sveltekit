---
name: "Krishnanand Anil — Cloud Data Architecture Atelier"
description: "Hydrological Blueprint & Fluid Telemetry design system for a 3D interactive data engineering portfolio."
colors:
  primary-hydro-cyan: "#0ba5ec"
  primary-cerulean-ink: "#0569a3"
  secondary-telemetry-emerald: "#10b981"
  tertiary-pipeline-amber: "#f59e0b"
  blueprint-slate-bg: "#070c16"
  blueprint-ledger-card: "#0d1626"
  blueprint-well-muted: "#131f33"
  blueprint-rule-border: "#1f324d"
  chalk-titanium-fg: "#f0f5fa"
  slate-caption-muted: "#95a9c6"
  vellum-drafting-bg: "#f7f5f0"
  vellum-sheet-card: "#ffffff"
  vellum-well-muted: "#edeae2"
  vellum-rule-border: "#d5cfc4"
  prussian-ink-fg: "#0f172a"
typography:
  display:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "4.5rem"
    fontWeight: 800
    lineHeight: 0.96
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "2.5rem"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Public Sans, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "0em"
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.14em"
rounded:
  sm: "6px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  2xl: "20px"
spacing:
  xs: "6px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary-hydro-cyan}"
    textColor: "{colors.blueprint-slate-bg}"
    typography: "{typography.title}"
    rounded: "{rounded.lg}"
    padding: "12px 20px"
  button-secondary:
    backgroundColor: "{colors.blueprint-ledger-card}"
    textColor: "{colors.chalk-titanium-fg}"
    typography: "{typography.title}"
    rounded: "{rounded.lg}"
    padding: "12px 20px"
  card-blueprint:
    backgroundColor: "{colors.blueprint-ledger-card}"
    textColor: "{colors.chalk-titanium-fg}"
    rounded: "{rounded.xl}"
    padding: "24px"
  card-compact:
    backgroundColor: "{colors.blueprint-ledger-card}"
    textColor: "{colors.chalk-titanium-fg}"
    rounded: "{rounded.lg}"
    padding: "14px"
  input-field:
    backgroundColor: "{colors.blueprint-well-muted}"
    textColor: "{colors.chalk-titanium-fg}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "12px 16px"
---

# Design System: Krishnanand Anil — Cloud Data Architecture Atelier

## Overview

**Creative North Star: "The Hydrological Blueprint & Fluid Telemetry Atelier"**

This design system frames cloud data architecture—streaming pipelines, raw storage lakes, open-table lakehouses, and analytical warehouses—as precision hydrological engineering. Rather than treating UI cards as decorative glass overlays floating in a generic void, every surface acts as a calibrated architectural specification sheet anchored alongside live 3D Threlte infrastructure models (`Pipeline3D`, `Datalake3D`, `Lakehouse3D`, `Warehouse3D`).

The system balances dual-theme material honesty: **Deep Prussian Blueprint** in dark mode and **Warm Archival Drafting Vellum** in light mode. Typography pairs the expressive architectural authority of `Bricolage Grotesque` with the humanist clarity of `Public Sans` and the tabular instrumentation precision of `JetBrains Mono`. On mobile viewports, every architectural stage preserves the 3D-first inspection flow while enforcing a strict left-aligned reading spine and zero-truncation card headers.

**Key Characteristics:**
- **Dual-Theme Blueprint Surfaces:** Deep Prussian slate (`#070c16`) and drafting vellum (`#f7f5f0`) with crisp `1px` structural rules and top-edge specular hairlines.
- **Heading-First Hierarchy:** Primary section headings always lead at the top; specification indices and horizontal hairlines sit beneath the heading rather than as eyebrow kickers above.
- **Hairline Ledger Dividers Over Nested Cards:** Metrics, commit trails, and pipeline stage callouts use `1px` internal ledger dividers (`divide-x` / `divide-y`) inside a single specification sheet rather than nesting cards inside cards.
- **Archival Icon Pedestals:** Every dark or multicolor technology logo sits inside a dedicated `bg-white/95` (`36px`–`40px`) rounded pedestal so SVG marks remain crisp across both dark and light themes.
- **Zero-Truncation Mobile Reading Spine:** Mobile specification sheets wrap titles naturally (`flex-wrap`, `break-words`), align all headings and cards to a unified left axis, and dock section CTAs at the bottom of the scroll container.

## Colors

The palette pairs deep structural blueprint neutrals with hydrological cyan, telemetry emerald, and pipeline amber accents that mirror the shaders inside the 3D WebGL canvas.

### Primary
- **Hydrological Cyan** (`hsl(192 91% 48%)` in dark mode / `hsl(196 94% 33%)` Deep Cerulean Ink in light mode): Used for active architectural callouts, primary action controls, active navigation indicators, and primary telemetry highlights.

### Secondary
- **Telemetry Emerald** (`hsl(162 78% 42%)` in dark mode / `hsl(164 82% 29%)` in light mode): Used for live availability statuses, verified SLA metrics (`99.9% SLA`), and open-table schema indicators.

### Tertiary
- **Pipeline Amber** (`hsl(38 92% 55%)` in dark mode / `hsl(32 90% 42%)` in light mode): Reserved for high-throughput compute highlights, benchmark speedups (`95%` query reduction), and orchestration milestones.

### Neutral
- **Deep Prussian Blueprint / Drafting Vellum** (`hsl(218 42% 5%)` dark / `hsl(44 26% 96%)` light): Primary viewport canvas behind the 3D scene and editorial pages.
- **Blueprint Ledger Surface / Pure Drafting Sheet** (`hsl(217 38% 9%)` dark / `hsl(42 33% 99%)` light): Elevated surface for `GlassCard`, `SectionCard`, and navigation chrome.
- **Recessed Telemetry Well** (`hsl(216 32% 14%)` dark / `hsl(40 18% 91%)` light): Used for form inputs, inactive segmented controls, and subtle code/tag wells.
- **Blueprint Rule Border** (`hsl(215 28% 19%)` dark / `hsl(36 15% 82%)` light): `1px` structural hairline borders and internal table dividers.
- **Chalk Titanium / Prussian Ink** (`hsl(210 33% 96%)` dark / `hsl(218 42% 10%)` light): Primary heading and body copy color.
- **Slate Caption** (`hsl(214 18% 68%)` dark / `hsl(216 18% 36%)` light): Secondary descriptions, timestamps, and metadata labels.

### Named Rules
**The Hydrological Signal Rule.** Accent colors (Hydrological Cyan, Telemetry Emerald, Pipeline Amber) are reserved for interactive states, live metrics, and architectural stage differentiation—never as large decorative background washes or multi-stop text gradients.

**The Archival Pedestal Rule.** All third-party technology SVG icons (`Spark`, `Kafka`, `AWS`, `Snowflake`, `Iceberg`, `Airflow`) must be housed inside a `bg-white/95` rounded pedestal (`rounded-lg`, `border-border/50`) so dark vector paths remain high-contrast in both dark and light modes.

## Typography

**Display Font:** `Bricolage Grotesque` (weights `600`, `700`, `800`, with `system-ui, sans-serif` fallback)
**Body Font:** `Public Sans` (weights `400`, `500`, `600`, `700`, with `system-ui, sans-serif` fallback)
**Label/Mono Font:** `JetBrains Mono` (weights `400`, `500`, `600`, `700`, with `monospace` fallback)

**Character:** `Bricolage Grotesque` lends architectural gravitas and crisp geometric tension to section titles, while `Public Sans` keeps dense engineering prose effortless to scan and `JetBrains Mono` grounds every metric, SLA, and badge in tabular instrumentation precision.

### Hierarchy
- **Display** (`800` weight, `clamp(2.5rem, 4.8vw + 1rem, 5.75rem)`, line-height `0.95`, tracking `-0.03em`): Used exclusively for the Hero primary identity headline (`DATA ARCHITECT`).
- **Headline** (`800` weight, `clamp(1.75rem, 3.5vw, 3.25rem)`, line-height `0.98`, tracking `-0.025em`): Used in `SectionAnchor` and inner page `h1` headers.
- **Title** (`700` weight, `1.125rem`–`1.5rem`, line-height `1.25`, tracking `-0.015em`): Used for `SectionCard` subtitles, `ContentCard` titles, and modal headers.
- **Body** (`400`–`500` weight, `0.9375rem`–`1.0625rem`, line-height `1.65`, `60ch–70ch` max measure): Used for architectural narratives, bulleted engineering proof points, and article bodies.
- **Label** (`600`–`700` weight, `0.625rem`–`0.75rem`, tracking `0.14em`, uppercase, `font-variant-numeric: tabular-nums`): Used for specification rules beneath headings, metric captions, and technology tags.

### Named Rules
**The Heading-First Rule.** Section headings (`h1`, `h2`, `h3`) always lead at the top of their hierarchy block; specification indices and category rules sit *below* the heading with an inline `1px` rule rather than as an eyebrow kicker above.

**The Tabular Telemetry Rule.** Every numeric counter, throughput figure (`50 M+/day`), latency reduction (`95%`), and date range must use `JetBrains Mono` with `font-variant-numeric: tabular-nums`.

## Layout

The homepage uses an 11-section snap-scroll spatial model (`100dvh` desktop snap containers) where a persistent fixed WebGL canvas (`HomeScene.svelte`) occupies the background and foreground UI panels dock into an asymmetric 12-column blueprint grid (`max-w-[1400px]`, `px-4 sm:px-8`).
- **Desktop (`>= 768px`):** Architecture stages alternate left and right specification docks (`max-w-[440px] lg:max-w-[480px]`) so the 3D model remains unobstructed in the opposite hemisphere.
- **Mobile (`< 768px`):** Each section uses `MobileCarousel.svelte` with a 3D-first card-flip architecture (`activeSlide = 0` presents the interactive 3D model centered in the viewport; flipping to `activeSlide = 1` reveals the scrollable specification sheet). Inside every mobile specification sheet (`slot="content-mobile"`), content follows a unified left-aligned vertical spine (`items-start`, `SectionAnchor align="left"`), followed by full-title cards and a bottom-docked CTA button.
- **Inner Editorial Routes (`/projects`, `/articles`, `/learn`, `/experience`, `/credentials`):** Clear the fixed top navigation bar with `pt-24 sm:pt-28`, lead directly with an `h1` and inline specification rule below, and arrange content in responsive `1` to `3` column ledger grids (`gap-6`).

## Elevation & Depth

Depth is communicated through translucent blueprint layering (`bg-card/88 backdrop-blur-xl`), crisp `1px` structural borders (`border-border/80`), a `1px` top-edge specular highlight (`via-foreground/20`), and a `1px` left-edge specification rule (`via-primary/45`). Note: `MobileCarousel`'s `.flip-card` container intentionally omits `backdrop-filter` to preserve WebKit/Chromium `preserve-3d` backface culling.

### Shadow Vocabulary
- **Blueprint Resting Elevation** (`0 12px 32px -12px rgba(2, 8, 20, 0.45)`): Default resting shadow on primary specification sheets (`GlassCard variant="default"`).
- **Compact Tile Elevation** (`0 6px 18px -8px rgba(2, 8, 20, 0.3)`): Subtle resting depth on `FeatureGrid` nodes, `InfiniteMarquee` tiles, and compact action cards.
- **Interactive Hover Lift** (`0 16px 36px -12px hsl(var(--primary) / 0.22)`): Applied with `-translate-y-0.5` on interactive `PillButton` and clickable `GlassCard` surfaces.

### Named Rules
**The Single-Sheet Ledger Rule.** Never nest a bordered card inside another bordered card; subdivide internal telemetry, stats, and pipeline phases using `1px` hairline ledger lines (`border-t border-border/60`, `divide-x divide-border/60`).

## Shapes

Corners follow a calibrated architectural radius scale: `16px` (`rounded-2xl`) for primary specification sheets (`SectionCard`, `GlassCard variant="default"`), `12px` (`rounded-xl`) for buttons (`PillButton`), compact feature nodes (`FeatureGrid`), and inputs, and `8px` (`rounded-lg`) for icon pedestals and inline mono badges. Every primary specification sheet carries a subtle `1px` top specular hairline and a `1px` vertical cyan accent rule along the left spine.

## Components

### Buttons (`PillButton`)
- **Shape:** Architectural rounded rectangle (`12px` / `rounded-xl`), never fully pill-rounded on primary CTAs.
- **Primary:** `bg-primary text-primary-foreground` with `font-heading font-bold`, `px-5 py-3`, and a dedicated trailing icon compartment (`w-6 h-6 rounded-lg bg-black/15`) that translates `2px` right on hover.
- **Secondary:** `bg-card/90 text-foreground border border-border/90` shifting to `border-primary/50` and `text-primary` on hover, with a `bg-primary/10 text-primary` icon compartment.
- **Hover / Focus:** Smooth `300ms` transition with `-translate-y-0.5` lift and `focus-visible:ring-2 focus-visible:ring-primary`.

### Cards / Containers (`GlassCard` & `SectionCard`)
- **Corner Style:** `16px` (`rounded-2xl`) for default specification sheets; `12px` (`rounded-xl`) for compact tiles.
- **Background:** `bg-card/88 backdrop-blur-xl` with a `1px` top specular gradient and `1px` left specification rule.
- **Header & Metrics (`SectionCard`):** `flex-wrap` header where the `h3` title never truncates (`leading-tight`) and tabular metrics sit alongside or wrap cleanly on narrow viewports, separated from body bullet points by a `1px` hairline ledger divider.
- **Internal Padding:** `p-5 sm:p-6` on specification sheets; `p-3 sm:p-3.5` on compact grid tiles.

### Feature Grids (`FeatureGrid`)
- **Structure:** 2-column responsive architectural grid (`gap-2.5 sm:gap-3`).
- **Node Layout:** Each node pairs a `w-9 h-9 rounded-lg bg-white/95` icon pedestal with a non-truncating title (`break-words leading-tight`) and description (`leading-snug`).

### Inputs / Fields (`ContactSection`)
- **Style:** `rounded-xl bg-muted/45 border border-border/80 px-4 py-3 text-sm text-foreground`.
- **Focus:** `focus:border-primary focus:bg-card focus:ring-2 focus:ring-primary/15`.
- **Labels:** `font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground`.

### Navigation (`Navigation`, `SideNav`, `MobileCarousel`)
- **Top Navigation Bar:** Floating blueprint bar (`rounded-2xl bg-card/85 backdrop-blur-xl border border-border/80`) with a dark plate monogram (`KA`), active route indicator pill, and dual-theme toggle.
- **Desktop Side Rail (`SideNav`):** Right-docked vertical telemetry rail (`01`–`11`) displaying tabular section indices and slide-out specification labels.
- **Mobile 3D-First Flip Bar (`MobileCarousel`):** Bottom-anchored control dock (`w-[90vw] max-w-[380px]`) with smooth exponential easing (`cubic-bezier(0.22, 1, 0.36, 1)`) toggling between `3D Model` (`activeSlide = 0`) and `Specs` (`activeSlide = 1`), plus vertical section steppers.

## Do's and Don'ts

### Do:
- **Do** lead every section and page with the primary heading (`h1`/`h2`) first, placing the `JetBrains Mono` specification index and `1px` rule beneath the heading.
- **Do** allow card titles, tool names, and credential titles to wrap naturally on mobile viewports (`flex-wrap`, `break-words`, `line-clamp-2`) so no heading is cut off with `...`.
- **Do** house dark or multi-color technology SVG logos inside `bg-white/95` pedestals so they remain legible in both Dark and Light mode.
- **Do** subdivide multi-metric cards (GitHub telemetry, LeetCode counters, Impact benchmarks) with `1px` hairline borders (`divide-x` / `divide-y`) inside a single card surface.
- **Do** keep mobile `slot="content-mobile"` sections left-aligned (`items-start`, `align="left"`) with the primary CTA button placed at the bottom after the specification cards.

### Don't:
- **Don't** place small uppercase eyebrow kickers above `h1`, `h2`, or `h3` headings.
- **Don't** apply `truncate` (`text-overflow: ellipsis; white-space: nowrap`) to card titles, mobile tool grid titles, or certification titles.
- **Don't** nest `<GlassCard>` components inside another `<GlassCard>`.
- **Don't** add `backdrop-filter` / `backdrop-blur` to `.flip-card` in `MobileCarousel.svelte`, as it breaks 3D `backface-visibility: hidden` in mobile browsers.
- **Don't** alter the `MobileCarousel` 3D-first entry behavior (`activeSlide = 0` on section entry) or the 11-section scroll flow.

