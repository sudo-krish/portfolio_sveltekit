import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { VitePWA } from 'vite-plugin-pwa';
import { sentrySvelteKit } from '@sentry/sveltekit';

export default defineConfig({
	plugins: [
		sentrySvelteKit({
			sourceMapsUploadOptions: {
				org: "your-org",
				project: "your-project",
				authToken: process.env.SENTRY_AUTH_TOKEN,
			}
		}),
		sveltekit(),
		VitePWA({
			registerType: 'autoUpdate',
			manifest: {
				name: 'Krishnananda Portfolio',
				short_name: 'Krishnananda',
				description: 'Interactive 3D Portfolio',
				theme_color: '#000000',
				background_color: '#000000',
				display: 'standalone',
				icons: [] // Needs icons in static folder for full PWA
			}
		})
	],

	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		environment: 'jsdom',
		setupFiles: ['./vitest-setup.ts'],
		resolve: {
			conditions: ['mode=test', 'browser']
		}
	},

	server: {
		// Optional: Enable HTTPS for local development
		// https: true,

		headers: {
			// Add security headers for local dev
			'X-Frame-Options': 'DENY',
			'X-Content-Type-Options': 'nosniff',
			// Override SvelteKit's restrictive dev CSP to allow blob: URLs for Three.js GLTFLoader
			'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:; connect-src 'self' blob: ws: wss: http: https:; worker-src 'self' blob:; form-action 'self'"
		}
	},

	build: {
		// Optimize for Cloudflare
		target: 'esnext',
		minify: 'esbuild',

		rollupOptions: {
			output: {
				manualChunks: undefined
			}
		}
	}
});
