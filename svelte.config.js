import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  
  kit: {
    adapter: adapter({
			// Cloudflare Pages options
			routes: {
				include: ['/*'],
				exclude: ['<all>']
			}
		}),
    
    prerender: {
      // Prerender all core static routes for instant edge delivery and search engine indexing
      entries: [
        '/',
        '/experience',
        '/projects',
        '/articles',
        '/credentials',
        '/learn',
        '/tech-stack',
        '/impact',
        '/github',
        '/leetcode',
        '/about',
        '/contact',
        '/sitemap.xml',
        '/robots.txt'
      ],
      
      crawl: false,      // Don't auto-discover routes
      
      handleUnseenRoutes: 'ignore',
      
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
