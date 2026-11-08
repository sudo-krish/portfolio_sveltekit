import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/public';

const GITHUB_API = 'https://api.github.com';
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

let cachedEvents: any = null;
let lastFetchEvents = 0;

function formatRelativeTime(now: number, createdAt: string): string {
  const diffMs = now - new Date(createdAt).getTime();
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHrs / 24);

  if (diffDays > 0) return `${diffDays}d`;
  if (diffHrs > 0) return `${diffHrs}h`;
  return `${Math.floor(diffMs / (1000 * 60))}m`;
}

function mapPushEvent(e: any, now: number, username: string) {
  const commit = e.payload.commits?.length
    ? e.payload.commits[0]
    : { sha: e.id, message: `Pushed to ${e.repo.name}` };

  return {
    sha: commit.sha.substring(0, 7),
    msg: commit.message.split('\n')[0],
    time: formatRelativeTime(now, e.created_at),
    repo: e.repo.name.replace(`${username}/`, ''),
  };
}

function resolveGitHubConfig(platform: any) {
  const token = platform?.env?.GITHUB_TOKEN || import.meta.env.VITE_GITHUB_TOKEN || '';
  const username =
    platform?.env?.PUBLIC_GITHUB_USERNAME || env.PUBLIC_GITHUB_USERNAME || 'sudo-krish';
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'Portfolio-Site',
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return { username, headers };
}

export const GET: RequestHandler = async ({ platform, fetch, setHeaders }) => {
  const now = Date.now();

  setHeaders({
    'Cache-Control': 'public, max-age=3600, s-maxage=3600',
  });

  if (cachedEvents && now - lastFetchEvents < CACHE_DURATION) {
    return json(cachedEvents);
  }

  try {
    const { username, headers } = resolveGitHubConfig(platform);

    const response = await fetch(`${GITHUB_API}/users/${username}/events/public?per_page=10`, {
      headers,
    });

    if (!response.ok) {
      throw new Error(`GitHub Events API failed: ${response.status}`);
    }

    const events = await response.json();

    // Map to a simpler structure matching existing UI needs
    const parsedEvents = events
      .filter((e: any) => e.type === 'PushEvent')
      .slice(0, 5)
      .map((e: any) => mapPushEvent(e, now, username));

    cachedEvents = parsedEvents;
    lastFetchEvents = now;

    return json(parsedEvents);
  } catch (error) {
    console.error('❌ GitHub Events API error:', error);

    if (cachedEvents) {
      return json(cachedEvents);
    }

    return json({ error: 'Failed to fetch GitHub events' }, { status: 500 });
  }
};
