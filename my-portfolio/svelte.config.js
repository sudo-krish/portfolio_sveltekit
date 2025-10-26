import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  
  kit: {
    adapter: adapter(),
    
    prerender: {
      // Only prerender routes that need server-side generation
      entries: [
        '/',              // Homepage - static HTML for SEO
        '/sitemap.xml'    // Sitemap - generated with project data
      ],
      
      crawl: false,      // Don't auto-discover routes
      
      handleHttpError: ({ path, message }) => {
        // Ignore API route errors during prerendering
        if (path.startsWith('/api/')) {
          return;
        }
        console.warn(`Prerender warning: ${path} - ${message}`);
      },
      
      origin: 'https://krishnanandanil.com'
    }
  }
};

export default config;
