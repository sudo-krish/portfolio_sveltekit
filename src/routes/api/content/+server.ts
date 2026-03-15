// src/routes/api/content/+server.ts
//
// GET /api/content?repo=second-brain              → index of all files
// GET /api/content?repo=second-brain&slug=kafka/intro  → single content item
//
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getRepoIndex, getContent, type ContentRepo } from '$lib/services/content-service';

const VALID_REPOS: ContentRepo[] = ['second-brain', 'project-docs', 'articles'];

export const GET: RequestHandler = async ({ url, platform, fetch, setHeaders }) => {
  const repo = url.searchParams.get('repo') as ContentRepo;
  const slug = url.searchParams.get('slug');

  if (!repo || !VALID_REPOS.includes(repo)) {
    return json(
      { error: `Invalid repo. Must be one of: ${VALID_REPOS.join(', ')}` },
      { status: 400 },
    );
  }

  const token = platform?.env?.GITHUB_TOKEN || import.meta.env.VITE_GITHUB_TOKEN || '';

  // Cache response for 1 hour at the CDN edge
  setHeaders({
    'Cache-Control': 'public, max-age=3600, s-maxage=86400',
  });

  try {
    if (slug) {
      // Single content item
      const item = await getContent(repo, slug, token, fetch);
      if (!item) {
        return json({ error: 'Content not found' }, { status: 404 });
      }
      return json(item);
    } else {
      // Full index
      const index = await getRepoIndex(repo, token, fetch);
      return json(index);
    }
  } catch (error) {
    console.error(`Content API error for ${repo}:`, error);
    return json({ error: 'Failed to fetch content' }, { status: 500 });
  }
};
