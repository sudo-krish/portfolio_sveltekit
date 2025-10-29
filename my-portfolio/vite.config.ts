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
			'X-Content-Type-Options': 'nosniff'
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
