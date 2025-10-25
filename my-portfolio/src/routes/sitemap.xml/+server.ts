import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = async () => {
  const site = 'https://yourwebsite.com'; // Replace with your domain
  
  // Define all your routes
  const pages = [
    '',
    'about',
    'projects',
    'blog',
    'contact',
    'resume',
  ];
  
  // Add blog posts dynamically (if you have them)
  const blogPosts = [
    'blog/data-engineering-best-practices',
    'blog/spark-optimization',
    'blog/data-quality',
  ];
  
  // Add project pages
  const projects = [
    'projects/realtime-analytics',
    'projects/data-lake',
    'projects/feature-store',
    'projects/etl-framework',
  ];
  
  const allPages = [...pages, ...blogPosts, ...projects];
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPages
    .map(
      (page) => `
  <url>
    <loc>${site}/${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page.includes('blog') ? 'weekly' : 'monthly'}</changefreq>
    <priority>${page === '' ? '1.0' : page.includes('blog') || page.includes('projects') ? '0.8' : '0.6'}</priority>
  </url>`
    )
    .join('')}
</urlset>`.trim();

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=0, s-maxage=3600',
    },
  });
};
