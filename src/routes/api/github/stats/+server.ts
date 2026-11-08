// src/routes/api/github/stats/+server.ts
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/public';

const GITHUB_API = 'https://api.github.com';
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

let cachedStats: any = null;
let lastFetchStats = 0;

interface GitHubStats {
  user: any;
  totalStars: number;
  totalForks: number;
  totalWatchers: number;
  totalIssues: number;
  totalRepos: number;
  totalSize: number;
  languageStats: Record<string, number>;
  topLanguages: string[];
  reposByYear: Record<string, number>;
  contributionStreak: number;
  lastActiveDate: string;
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

function buildGitHubStats(user: any, ownRepos: any[]): GitHubStats {
  let totalStars = 0;
  let totalForks = 0;
  let totalWatchers = 0;
  let totalIssues = 0;
  let totalSize = 0;
  const languageStats: Record<string, number> = {};
  const reposByYear: Record<string, number> = {};

  ownRepos.forEach((repo: any) => {
    totalStars += repo.stargazers_count;
    totalForks += repo.forks_count;
    totalWatchers += repo.watchers_count;
    totalIssues += repo.open_issues_count;
    totalSize += repo.size;

    if (repo.language) {
      languageStats[repo.language] = (languageStats[repo.language] || 0) + 1;
    }

    const year = new Date(repo.created_at).getFullYear().toString();
    reposByYear[year] = (reposByYear[year] || 0) + 1;
  });

  const topLanguages = Object.entries(languageStats)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([lang]) => lang);

  const lastActiveDate =
    ownRepos.length > 0
      ? ownRepos.reduce((latest: Date, repo: any) => {
          const pushDate = new Date(repo.pushed_at);
          return pushDate > latest ? pushDate : latest;
        }, new Date(ownRepos[0].pushed_at))
      : new Date();

  const daysSinceLastPush = Math.floor(
    (Date.now() - lastActiveDate.getTime()) / (1000 * 60 * 60 * 24),
  );

  return {
    user,
    totalStars,
    totalForks,
    totalWatchers,
    totalIssues,
    totalRepos: ownRepos.length,
    totalSize,
    languageStats,
    topLanguages,
    reposByYear,
    contributionStreak: Math.max(0, 365 - daysSinceLastPush),
    lastActiveDate: lastActiveDate.toISOString(),
  };
}

export const GET: RequestHandler = async ({ platform, fetch, setHeaders }) => {
  const now = Date.now();

  setHeaders({
    'Cache-Control': 'public, max-age=3600, s-maxage=3600',
  });

  if (cachedStats && now - lastFetchStats < CACHE_DURATION) {
    return json(cachedStats);
  }

  try {
    const { username, headers } = resolveGitHubConfig(platform);

    const [userRes, reposRes] = await Promise.all([
      fetch(`${GITHUB_API}/users/${username}`, { headers }),
      fetch(`${GITHUB_API}/users/${username}/repos?per_page=100&sort=updated&type=owner`, {
        headers,
      }),
    ]);

    if (!userRes.ok || !reposRes.ok) {
      throw new Error(`GitHub API request failed: ${userRes.status}`);
    }

    const user = await userRes.json();
    const repos = await reposRes.json();
    const ownRepos = repos.filter((r: any) => !r.fork);
    const stats = buildGitHubStats(user, ownRepos);

    cachedStats = stats;
    lastFetchStats = now;

    return json(stats);
  } catch (error) {
    console.error('❌ GitHub API error:', error);

    if (cachedStats) {
      return json(cachedStats);
    }

    return json({ error: 'Failed to fetch GitHub stats' }, { status: 500 });
  }
};
