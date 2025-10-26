# 🚀 Krishnanand Anil - Senior Data Engineer Portfolio

[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare-Pages-orange?logo=cloudflare)](https://krishnanandanil.com)
[![SvelteKit](https://img.shields.io/badge/SvelteKit-5-red?logo=svelte)](https://kit.svelte.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-blue?logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> A modern, performant portfolio website showcasing data engineering expertise, built with SvelteKit and deployed on Cloudflare Pages with Server-Side Rendering (SSR).

**Live Site:** [https://krishnanandanil.com](https://krishnanandanil.com)

---

## ✨ Features

- 🌙 **Dark Mode First** - Default dark theme with seamless toggle
- ⚡ **Server-Side Rendering** - Optimized for SEO and performance
- 📱 **Mobile-First Design** - iOS/Material UI inspired aesthetics
- 🎯 **Real-time GitHub Integration** - Dynamic project fetching via GitHub API
- 🔍 **SEO Optimized** - Rich snippets, structured data, sitemap
- 🚀 **Edge Deployment** - Cloudflare Pages with global CDN
- 💨 **Lightning Fast** - Prerendered static pages for instant loads
- 📊 **Performance Metrics** - Live GitHub stats and project analytics
- 🎨 **Modern UI** - Tailwind CSS 4 with custom components
- 🔒 **Type-Safe** - Full TypeScript implementation

---

## 🛠️ Tech Stack

### Core
- **Framework:** [SvelteKit 2](https://kit.svelte.dev/) (Svelte 5)
- **Language:** [TypeScript 5](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons:** [Lucide Svelte](https://lucide.dev/)
- **UI Components:** [bits-ui](https://bits-ui.com/)

### Deployment & Hosting
- **Platform:** [Cloudflare Pages](https://pages.cloudflare.com/)
- **Adapter:** `@sveltejs/adapter-cloudflare`
- **Runtime:** Cloudflare Workers (Edge Functions)
- **CDN:** Global edge network

### APIs & Integrations
- **GitHub API** - Dynamic project and stats fetching
- **Environment:** Cloudflare environment variables

---

## 📁 Project Structure

```
my-portfolio/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── home/              # Homepage components
│   │   │   │   ├── HeroSection.svelte
│   │   │   │   ├── MetricsGrid.svelte
│   │   │   │   ├── FeaturedProjects.svelte
│   │   │   │   ├── ProjectFilter.svelte
│   │   │   │   ├── TechStack.svelte
│   │   │   │   └── ContactCTA.svelte
│   │   │   ├── ui/                # Reusable UI components
│   │   │   ├── SEO.svelte
│   │   │   ├── StructuredData.svelte
│   │   │   └── ThemeToggle.svelte
│   │   ├── stores/
│   │   │   └── theme.ts           # Theme management
│   │   └── data/
│   │       └── portfolio-data.ts  # Personal data configuration
│   ├── routes/
│   │   ├── +page.svelte           # Homepage (prerendered)
│   │   ├── +page.ts               # Page load function
│   │   ├── +layout.svelte         # Root layout with SEO
│   │   ├── api/
│   │   │   └── github/
│   │   │       ├── projects/+server.ts  # SSR API
│   │   │       └── stats/+server.ts     # SSR API
│   │   └── sitemap.xml/
│   │       └── +server.ts         # Dynamic sitemap (prerendered)
│   ├── app.html                   # HTML template
│   ├── app.css                    # Global styles
│   └── app.d.ts                   # TypeScript definitions
├── static/
│   ├── favicon.png                # 192x192 favicon
│   ├── apple-icon.png             # 180x180 Apple touch icon
│   ├── manifest.json              # PWA manifest
│   ├── robots.txt                 # SEO robots file
│   ├── humans.txt                 # Credits file
│   ├── llms.txt                   # LLM context file
│   └── screenshots/               # PWA screenshots
├── svelte.config.js               # SvelteKit configuration
├── tailwind.config.js             # Tailwind configuration
├── tsconfig.json                  # TypeScript configuration
├── vite.config.ts                 # Vite configuration
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20+ (LTS)
- **npm** or **pnpm**
- **Git**
- **Cloudflare Account** (for deployment)
- **GitHub Personal Access Token** (for API integration)

### Installation

1. **Clone the repository:**
   ```
   git clone https://github.com/sudo-krish/my-portfolio.git
   cd my-portfolio
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Create environment file:**
   ```
   cp .env.example .env
   ```

4. **Configure `.env`:**
   ```
   VITE_GITHUB_TOKEN=ghp_your_github_personal_access_token_here
   PUBLIC_SITE_URL=https://krishnanandanil.com
   ```

   > **Get GitHub Token:** [GitHub Settings → Developer Settings → Personal Access Tokens](https://github.com/settings/tokens)

5. **Update personal data:**
   ```
   // Edit src/lib/data/portfolio-data.ts
   export const portfolioData = {
     personal: {
       name: 'Your Name',
       title: 'Your Title',
       // ... update all fields
     }
   }
   ```

### Development

```
# Start dev server
npm run dev

# Open in browser
# http://localhost:5173
```

### Build

```
# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🌐 Deployment to Cloudflare Pages

### Option 1: Manual Deployment (CLI)

1. **Install Wrangler:**
   ```
   npm install -g wrangler
   ```

2. **Login to Cloudflare:**
   ```
   wrangler login
   ```

3. **Build the project:**
   ```
   npm run build
   ```

4. **Deploy:**
   ```
   wrangler pages deploy .svelte-kit/cloudflare --project-name krishnanandanil-portfolio
   ```

5. **Set environment variable:**
   ```
   wrangler pages secret put GITHUB_TOKEN --project-name krishnanandanil-portfolio
   # Paste your GitHub token when prompted
   ```

### Option 2: Automatic Deployment (Git)

1. **Push to GitHub:**
   ```
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Cloudflare Pages:**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Click **Workers & Pages** → **Create Application** → **Pages**
   - Connect to Git and select your repository

3. **Configure Build Settings:**
   ```
   Framework preset: SvelteKit
   Build command: npm run build
   Build output directory: .svelte-kit/cloudflare
   Root directory: /
   ```

4. **Add Environment Variables:**
   - Go to **Settings** → **Environment Variables**
   - Add `GITHUB_TOKEN` (encrypted)
   - Click **Save and Deploy**

5. **Custom Domain (Optional):**
   - Go to **Custom domains** → **Set up a custom domain**
   - Add `krishnanandanil.com`
   - DNS will be configured automatically

---

## 🔧 Configuration

### SvelteKit Configuration

```
// svelte.config.js
import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    prerender: {
      entries: ['/', '/sitemap.xml'],
      crawl: false,
      handleHttpError: ({ path, message }) => {
        if (path.startsWith('/api/')) return;
        console.warn(`Prerender warning: ${path} - ${message}`);
      },
      origin: 'https://krishnanandanil.com'
    }
  }
};

export default config;
```

### Environment Variables

**Local Development (`.env`):**
```
VITE_GITHUB_TOKEN=ghp_xxxxx
PUBLIC_SITE_URL=https://krishnanandanil.com
```

**Production (Cloudflare Dashboard):**
```
GITHUB_TOKEN=ghp_xxxxx  (Encrypted)
```

### Cloudflare Platform Types

```
// src/app.d.ts
declare global {
  namespace App {
    interface Platform {
      env?: {
        GITHUB_TOKEN?: string;
      };
    }
  }
}

export {};
```

---

## 📊 API Routes

### GitHub Projects API
**Endpoint:** `/api/github/projects`
- **Method:** GET
- **Cache:** 30 minutes server-side
- **Response:** JSON array of GitHub repositories
- **Authentication:** GitHub Personal Access Token

### GitHub Stats API
**Endpoint:** `/api/github/stats`
- **Method:** GET
- **Cache:** 30 minutes server-side
- **Response:** Aggregated GitHub statistics
- **Authentication:** GitHub Personal Access Token

---

## 🎨 Customization

### Theme Configuration

```
// src/lib/stores/theme.ts
// Default: Dark mode
// Toggle: Light/Dark with localStorage persistence
```

### Colors (Tailwind)

```
// tailwind.config.js
theme: {
  extend: {
    colors: {
      border: 'hsl(var(--border))',
      background: 'hsl(var(--background))',
      foreground: 'hsl(var(--foreground))',
      primary: 'hsl(var(--primary))',
      // ... customize as needed
    }
  }
}
```

### Portfolio Data

```
// src/lib/data/portfolio-data.ts
export const portfolioData = {
  personal: { /* ... */ },
  experience: [ /* ... */ ],
  projects: [ /* ... */ ],
  skills: [ /* ... */ ],
  certifications: [ /* ... */ ]
};
```

---

## 🔍 SEO Features

- ✅ **Prerendered Static HTML** - Instant indexing
- ✅ **Structured Data (JSON-LD)** - Rich snippets
- ✅ **Dynamic Sitemap** - Auto-generated
- ✅ **Robots.txt** - Crawler configuration
- ✅ **Canonical URLs** - Duplicate content prevention
- ✅ **Open Graph Tags** - Social media previews
- ✅ **Twitter Cards** - Enhanced Twitter sharing
- ✅ **Meta Descriptions** - Page-specific descriptions
- ✅ **Semantic HTML** - Accessibility compliance

---

## ⚡ Performance

- **Lighthouse Score:** 95+ Performance, 100 SEO
- **First Contentful Paint:** < 1s
- **Time to Interactive:** < 2s
- **Total Bundle Size:** ~200KB (compressed)
- **CDN:** Global edge caching via Cloudflare

---

## 📝 Scripts

```
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build
npm run check            # Type checking
npm run check:watch      # Type checking (watch mode)
npm run lint             # Lint code

# Deployment
wrangler login           # Login to Cloudflare
wrangler pages deploy .svelte-kit/cloudflare --project-name krishnanandanil-portfolio
```

---

## 🐛 Troubleshooting

### Build Errors

**Issue:** `Property 'env' does not exist on type 'Platform'`
- **Fix:** Ensure `src/app.d.ts` has proper type definitions

**Issue:** GitHub API rate limits
- **Fix:** Add `GITHUB_TOKEN` environment variable

### Deployment Issues

**Issue:** 404 on API routes
- **Fix:** Verify `adapter-cloudflare` is installed and configured

**Issue:** Environment variables not working
- **Fix:** Use `platform?.env?.GITHUB_TOKEN` in API routes

---

## 📄 License

MIT License - feel free to use this for your own portfolio!

---

## 👤 Author

**Krishnanand Anil**
- Website: [krishnanandanil.com](https://krishnanandanil.com)
- GitHub: [@sudo-krish](https://github.com/sudo-krish)
- LinkedIn: [linkedin.com/in/krishnanandanil](https://linkedin.com/in/krishnanandanil)

---

## 🙏 Acknowledgments

- [SvelteKit](https://kit.svelte.dev/) - Amazing framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Cloudflare Pages](https://pages.cloudflare.com/) - Edge deployment
- [Lucide](https://lucide.dev/) - Beautiful icons
- [shadcn-svelte](https://www.shadcn-svelte.com/) - UI components inspiration

---

## 📮 Contact

For inquiries or collaboration opportunities, reach out via:
- 📧 Email: krishnanandanil@example.com
- 💼 LinkedIn: [krishnanandanil](https://linkedin.com/in/krishnanandanil)
- 🐙 GitHub: [@sudo-krish](https://github.com/sudo-krish)

---

<p align="center">
  Made with ❤️ using <a href="https://kit.svelte.dev/">SvelteKit</a> and <a href="https://pages.cloudflare.com/">Cloudflare Pages</a>
</p>

<p align="center">
  <a href="#-krishnanand-anil---senior-data-engineer-portfolio">⬆ Back to Top</a>
</p>
```

Save this as `README.md` in your project root. It covers everything about your portfolio including setup, deployment, configuration, and troubleshooting! 📚✨