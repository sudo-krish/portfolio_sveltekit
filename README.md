# Krishnana's 3D Interactive Portfolio

A modern, high-performance, and immersive 3D portfolio built with SvelteKit 5, Threlte, Three.js, GSAP, and Tailwind CSS v4.

## 🚀 Tech Stack

- **Framework**: [SvelteKit 5](https://svelte.dev/)
- **3D Rendering**: [Three.js](https://threejs.org/) + [Threlte](https://threlte.xyz/)
- **Animations**: [GSAP](https://gsap.com/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Deployment**: Cloudflare Pages

## 🏗 Architecture & Navigation

This project utilizes a highly customized **GSAP ScrollTrigger** architecture that locks the native scroll on desktop to trigger seamless 3D scene transitions, while allowing native vertical scrolling on mobile with parallax overlays.

For a deep dive into how the 3D scene integrates with DOM elements, please see [ARCHITECTURE.md](./ARCHITECTURE.md).

## 🛠 Local Setup

1. **Clone the repository**:
   ```bash
   git clone <repo-url>
   cd portfolio_sveltekit
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   # To test on your local network (e.g. from your phone):
   npm run dev -- --host
   ```

## 📦 Deployment

This project uses `@sveltejs/adapter-cloudflare` and is deployed to Cloudflare Pages.

To deploy manually via Wrangler:
```bash
npm run build
npx wrangler pages deploy .svelte-kit/cloudflare --project-name=krishnanandanil-portfolio --branch=main
```

## 🧪 Testing (Coming Soon)
- **Unit Testing**: Vitest
- **E2E Testing**: Playwright
- **CI/CD**: GitHub Actions (Linting, Lighthouse CI, Type Checking)
