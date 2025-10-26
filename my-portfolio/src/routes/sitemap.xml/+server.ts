// src/routes/sitemap.xml/+server.ts
import type { RequestHandler } from './$types';

export const prerender = true;

// Define the Page interface
interface SitemapPage {
  url: string;
  priority: string;
  changefreq: string;
  lastmod?: string;
}

export const GET: RequestHandler = async () => {
  const site = 'https://krishnanandanil.com';
  const currentDate = new Date().toISOString();
  
  // Only homepage since it's a single-page app with anchor sections
  const staticPages: SitemapPage[] = [
    { 
      url: '', 
      priority: '1.0', 
      changefreq: 'weekly', 
      lastmod: currentDate 
    },
  ];
  
  const allPages: SitemapPage[] = staticPages;
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${allPages
  .map(
    (page) => `  <url>
    <loc>${site}/${page.url}</loc>
    <lastmod>${page.lastmod || currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`.trim();

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=0, s-maxage=3600',
    },
  });
};
