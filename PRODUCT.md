# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- Engineering leaders, staff/principal engineers, technical hiring managers, and recruiters evaluating Krishnanand Anil for senior data engineering, distributed systems, and cloud architecture roles.
- Data engineering peers and learners exploring architectural case studies, technical articles, and the interactive data engineering learning path.

## Product Purpose

An interactive 3D architecture portfolio and technical publication for Krishnanand Anil (Data Engineer & Cloud Architect). It demonstrates real-world systems thinking by guiding visitors through a live 3D data pipeline (Raw Ingestion -> Streaming Pipeline -> Data Lake -> Lakehouse -> Data Warehouse) followed by verified production impact, engineering experience, open-source repositories, credentials, and a structured learning path.

## Positioning

Unlike static developer portfolios that merely list technologies, this product pairs an interactive, scroll-choreographed 3D WebGL simulation of an end-to-end data platform with concrete production metrics (96% pipeline latency reduction, 5M+ daily financial records processed, 99.9% uptime on AWS/Snowflake/Spark/Airflow architectures).

## Operating Context

- Evaluated on both desktop monitors (where 3D models and architectural specifications sit side-by-side in a snap-scroll narrative) and mobile/tablet devices (where each section opens with the centered 3D artifact and flips to specifications via `MobileCarousel`).
- Visitors move between the 11-section homepage narrative and deep-dive inner routes (`/experience`, `/projects`, `/articles`, `/credentials`, `/about`, `/learn`).

## Capabilities and Constraints

- Built with SvelteKit (Svelte 5), TypeScript, Tailwind CSS, Three.js / Threlte (`@threlte/core`, `@threlte/extras`), and GSAP (`ScrollTrigger`, `ScrollToPlugin`).
- **Preserved Architecture & Flow**:
  - The 11-section snap-scroll narrative flow on the homepage (`#hero`, `#pipeline`, `#datalake`, `#lakehouse`, `#warehouse`, `#experience`, `#techstack`, `#github`, `#impact`, `#credentials`, `#contact`) must stay intact.
  - All 3D scenes, shaders, and GLTF models (`HomeScene.svelte`, `Hero3D`, `Pipe3D`, `Datalake3D`, `Lakehouse3D`, `Warehouse3D`, `Experience3D`, `TechStack3D`, `Github3D`, `Impact3D`, `Credentials3D`, `Contact3D`) stay intact.
  - `MobileCarousel.svelte` must always present the 3D scene first (`activeSlide = 0`) on every homepage section, with the 3D model properly centered in the open viewport space and flipping cleanly to the specifications view (`activeSlide = 1`).
- Quality gates enforced via `.makelib` (`make check-all`, `npm run check`, `make build`).

## Brand Commitments

- Identity: Krishnanand Anil (`KRISH`, `@sudo-krish`), Data Engineer & Cloud Architect based in Bengaluru, India.
- Both Dark and Light themes are first-class citizens and must harmonize with the refractive 3D glass and water shaders (`materials.ts`, `Datalake3D.svelte`).

## Evidence on Hand

- Verified production metrics and career history in `src/lib/data/site.ts`, `src/routes/experience/+page.svelte`, and homepage section components:
  - Associate Data Engineer at Yethi Consulting (2023–Present) and Intern at Cognizant (2023).
  - 96% runtime reduction (4 hours to 10 minutes), 5M+ daily records processed, 60% cloud cost reduction, 99.9% SLA reliability, 2.6x query speedup.
  - AWS Certifications & credentials in `src/routes/credentials/+page.svelte` and `/static/3d/`.
  - Live GitHub repository integration via `/api/github` and project/article markdown content in `src/lib/content/` and `src/routes/learn/`.

## Product Principles

1. **Let the 3D Artifact Lead**: The 3D pipeline and models are the centerpiece; UI chrome, cards, and typography frame the 3D scene without competing with it or obscuring it.
2. **Engineering Precision Over Decoration**: Present metrics, architecture flows, and specifications with crisp tabular clarity, unmistakable hierarchy, and zero ornamental bloat.
3. **Seamless Dual-Mode Experience**: Desktop side-by-side snap-scrolling and mobile 3D-first card flipping must both feel native, responsive, and optically balanced in Dark and Light themes.

