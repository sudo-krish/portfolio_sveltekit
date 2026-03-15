// src/routes/api/content/refresh/+server.ts
//
// POST /api/content/refresh?repo=second-brain   → invalidate cache for a repo
// POST /api/content/refresh                      → invalidate all caches
//
// Call this from a Cloudflare deploy hook or cron trigger.
//
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { invalidateCache, type ContentRepo } from '$lib/services/content-service';

const VALID_REPOS: ContentRepo[] = ['second-brain', 'project-docs', 'articles'];

export const POST: RequestHandler = async ({ url }) => {
  const repo = url.searchParams.get('repo') as ContentRepo | null;

  if (repo && !VALID_REPOS.includes(repo)) {
    return json(
      { error: `Invalid repo. Must be one of: ${VALID_REPOS.join(', ')}` },
      { status: 400 },
    );
  }

  invalidateCache(repo || undefined);

  return json({
    success: true,
    message: repo ? `Cache invalidated for ${repo}` : 'All content caches invalidated',
    timestamp: new Date().toISOString(),
  });
};
