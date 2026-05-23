export const prerender = true;

export async function GET() {
  const robots = `User-agent: *
Allow: /

Sitemap: https://krishnanandanil.com/sitemap.xml
`;

  return new Response(robots, {
    headers: {
      'Cache-Control': 'max-age=0, s-maxage=3600',
      'Content-Type': 'text/plain',
    }
  });
}
