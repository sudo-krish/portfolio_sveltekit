// vite.config.ts
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],

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
