import adapter from '@sveltejs/adapter-auto'; // or adapter-auto for dynamic
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: undefined,
      precompress: false,
      strict: true
    }),
    
    prerender: {
      entries: ['*'], // Prerender all routes for better SEO
      handleHttpError: 'warn'
    }
  }
};

export default config;
