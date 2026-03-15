// src/routes/sitemap.xml/+server.ts
import type { RequestHandler } from './$types';
import { getRepoIndex } from '$lib/services/content-service';
import { portfolioData } from '$lib/data/portfolio-data';

interface ContentItem {
    slug: string;
    lastUpdated?: string;
    [key: string]: any;
}

export const prerender = true;

export const GET: RequestHandler = async ({ fetch }) => {
  const site = 'https://krishnanandanil.com';
  const currentDate = new Date().toISOString().split('T')[0];

  // Provide a fallback token if one is not in the environment (may be needed for prerendering)
  const token = import.meta.env.VITE_GITHUB_TOKEN || '';

  // Fetch index data for all dynamic sections concurrently
  const [projectsRes, articlesRes, learnRes] = await Promise.all([
    getRepoIndex('project-docs', token, fetch).catch(() => null),
    getRepoIndex('articles', token, fetch).catch(() => null),
    getRepoIndex('second-brain', token, fetch).catch(() => null)
  ]);

  // Use local data as fallback if API fetch fails
  const projects: ContentItem[] = (projectsRes?.items as any[]) || portfolioData.projects.map(p => ({
    slug: p.id,
    lastUpdated: p.dateCreated
  }));
  
  const articles: ContentItem[] = (articlesRes?.items as any[]) || portfolioData.blogPosts.map(b => ({
    slug: b.slug,
    lastUpdated: b.datePublished
  }));
  
  const learnNotes: ContentItem[] = (learnRes?.items as any[]) || [];

  // Static core routes
  const staticRoutes = [
    { path: '/', priority: '1.0', changefreq: 'weekly' },
    { path: '/experience', priority: '0.8', changefreq: 'monthly' },
    { path: '/tech-stack', priority: '0.8', changefreq: 'monthly' },
    { path: '/github', priority: '0.8', changefreq: 'weekly' },
    { path: '/impact', priority: '0.8', changefreq: 'monthly' },
    { path: '/credentials', priority: '0.8', changefreq: 'monthly' },
    { path: '/contact', priority: '0.9', changefreq: 'monthly' },
    { path: '/projects', priority: '0.9', changefreq: 'weekly' },
    { path: '/articles', priority: '0.9', changefreq: 'weekly' },
    { path: '/learn', priority: '0.9', changefreq: 'weekly' },
    { path: '/about', priority: '0.8', changefreq: 'monthly' },
  ];

  // Generate XML for static routes
  const staticUrls = staticRoutes
    .map(
      (route) => `  <url>
    <loc>${site}${route.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
    )
    .join('\n');

  // Generate XML for dynamic projects
  const projectUrls = projects
    .map(
      (p) => `  <url>
    <loc>${site}/projects/${p.slug}</loc>
    <lastmod>${p.lastUpdated ? new Date(p.lastUpdated).toISOString().split('T')[0] : currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join('\n');

  // Generate XML for dynamic articles
  const articleUrls = articles
    .map(
      (a) => `  <url>
    <loc>${site}/articles/${a.slug}</loc>
    <lastmod>${a.lastUpdated ? new Date(a.lastUpdated).toISOString().split('T')[0] : currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join('\n');

  // Generate XML for dynamic learning notes
  const learnUrls = learnNotes
    .map(
      (n) => `  <url>
    <loc>${site}/learn/${n.slug}</loc>
    <lastmod>${n.lastUpdated ? new Date(n.lastUpdated).toISOString().split('T')[0] : currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`
    )
    .join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls}
${projectUrls}
${articleUrls}
${learnUrls}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
};
