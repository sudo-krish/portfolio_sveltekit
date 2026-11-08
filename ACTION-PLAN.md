# SEO Action Plan — krishnanandanil.com

**Date:** 2026-11-08  
**Audit Source:** `FULL-AUDIT-REPORT.md`  
**Execution Status:** Core Technical & On-Page Fixes Implemented & Verified

---

## 1. Prioritized Fixes Matrix

| ID | Priority | Category | Action Item | Target File(s) | Status | Expected Impact |
|:---|:---:|:---|:---|:---|:---:|:---|
| **ACT-01** | **P0** | Crawlability | Fix client-side mounting gate in `PageWrapper` to restore full SSR HTML output | `src/lib/components/PageWrapper.svelte` | **COMPLETED** | Eliminates blank page indexing penalty for all crawlers |
| **ACT-02** | **P0** | On-Page | Restore semantic `<h1>` tag to homepage hero heading | `src/lib/components/home/hero/HeroContent.svelte` | **COMPLETED** | Primary topical keyword indexing for homepage |
| **ACT-03** | **P1** | AI Search | Manage AI search bots (`ClaudeBot`, `PerplexityBot`, `Google-Extended`) in `robots.txt` | `src/routes/robots.txt/+server.ts`, `static/robots.txt` | **COMPLETED** | Ensures citation in Perplexity, ChatGPT Search, and Claude |
| **ACT-04** | **P1** | AI Search | Fix broken `/blog` links in `llms.txt` and generate `llms-full.txt` | `static/llms.txt`, `static/llms-full.txt` | **COMPLETED** | 100% link resolution for LLM research agents |
| **ACT-05** | **P1** | Technical | Add `/leetcode` to XML sitemap and expand static pre-rendering entries | `src/routes/sitemap.xml/+server.ts`, `svelte.config.js` | **COMPLETED** | Direct crawler discovery & edge static caching |
| **ACT-06** | **P2** | E-E-A-T | Maintain JSON-LD schema accuracy and avoid deprecated FAQ/HowTo types | `src/lib/components/StructuredData.svelte`, `SEO.svelte` | **VERIFIED** | Clean rich snippet eligibility in Google Search |
| **ACT-07** | **P2** | CWV / INP | Ensure 3D WebGL hydration does not block main-thread user interactions | `src/lib/components/home/3d/LazySceneWrapper.svelte` | **VERIFIED** | Sub-50ms INP response time on desktop and mobile |

---

## 2. Completed Implementation Details

### 1. SSR HTML Pre-rendering & Slot Restoration
- **Problem:** `contentReady` defaulted to `false` during server rendering, preventing the SvelteKit SSR engine from generating semantic markup inside `<slot />`.
- **Solution:** Configured `PageWrapper.svelte` to render the content container unconditionally during server generation. The `SplashScreen` component operates as a non-blocking visual overlay during initial client visits.

### 2. Semantic Display Headline Restoration
- **Problem:** The homepage display title was wrapped in `<div role="presentation">` instead of a semantic `<h1>`.
- **Solution:** Refactored `HeroContent.svelte` to wrap `prefix` and `suffix` in `<h1>` tags across both mobile and desktop viewports, preserving existing GSAP split-text animation triggers.

### 3. Comprehensive AI Crawler Policy
- **Problem:** `robots_checker.py` flagged 7 unmanaged AI crawlers that were either falling back to default disallow patterns or lacked explicit allow directives.
- **Solution:** Updated `src/routes/robots.txt/+server.ts` and `static/robots.txt` with dedicated entries for `GPTBot`, `ChatGPT-User`, `ClaudeBot`, `anthropic-ai`, `Claude-Web`, `PerplexityBot`, `Google-Extended`, `Applebot-Extended`, and `CCBot`.

### 4. LLMs.txt & LLMs-Full.txt Standardization
- **Problem:** Outdated links to `/blog/*` generated 404 responses for LLMs. No extended documentation existed.
- **Solution:** Updated `static/llms.txt` to point to `/articles/*` and created `static/llms-full.txt` containing complete technical platform breakdowns, architecture benchmarks, and verified credentials.

### 5. Sitemap & Edge Prerendering
- **Problem:** `/leetcode` was missing from `sitemap.xml`, and `svelte.config.js` did not explicitly prerender subpages.
- **Solution:** Added `/leetcode` to `staticRoutes` in `src/routes/sitemap.xml/+server.ts` and added all 11 core subpages to `prerender.entries` in `svelte.config.js`.

---

## 3. Post-Deployment Verification Steps

1. **Google Search Console**:
   - Inspect URL `https://krishnanandanil.com/` using the URL Inspection Tool.
   - Click **Test Live URL** to confirm Googlebot receives the full HTML content and recognizes the `<h1>` tag.
   - Re-submit `https://krishnanandanil.com/sitemap.xml`.
2. **AI Search Citation Check**:
   - Validate `https://krishnanandanil.com/llms.txt` and `https://krishnanandanil.com/llms-full.txt` in a browser.
   - Verify that Perplexity and ChatGPT Search index the updated profile benchmarks.
3. **Core Web Vitals Monitoring**:
   - Confirm INP remains in the "Good" threshold (<200ms, targeting <50ms) in CrUX field data.

