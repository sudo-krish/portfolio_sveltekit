export const prerender = true;

export async function GET() {
  const robots = `# robots.txt for krishnanandanil.com

# Default rules for all crawlers
User-agent: *
Allow: /
Disallow: /api/
Disallow: /_app/

# Sitemap location
Sitemap: https://krishnanandanil.com/sitemap.xml

# AI Search & LLM Crawlers (Allow for GEO & AEO discoverability)
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: CCBot
Allow: /

# Major search engines
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

# Block aggressive commercial scrapers
User-agent: Bytespider
Disallow: /

User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: MJ12bot
Disallow: /
`;

  return new Response(robots, {
    headers: {
      'Cache-Control': 'max-age=0, s-maxage=3600',
      'Content-Type': 'text/plain',
    },
  });
}
