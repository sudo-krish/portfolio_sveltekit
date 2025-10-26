// src/routes/sitemap.xml/+server.ts
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = async () => {
  const site = 'https://krishnanandanil.com';
  const currentDate = new Date().toISOString().split('T')[0];
  
  // Main page + important sections
  const pages = [
    { url: '', priority: '1.0', changefreq: 'weekly' },
    // Optional: Add important anchor sections for better SEO
    // { url: '#about', priority: '0.8', changefreq: 'monthly' },
    // { url: '#projects', priority: '0.9', changefreq: 'weekly' },
    // { url: '#experience', priority: '0.8', changefreq: 'monthly' },
    // { url: '#contact', priority: '0.7', changefreq: 'monthly' }
  ];
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${site}/${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
};
