// src/routes/api/github/stats/+server.ts
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const GITHUB_API = 'https://api.github.com';
const GITHUB_USERNAME = 'sudo-krish';
const CACHE_DURATION = 1000 * 60 * 30; // 30 minutes

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

export const GET: RequestHandler = async ({ platform }) => {
  const now = Date.now();
  
  // Return cached data if fresh
  if (cachedStats && (now - lastFetchStats) < CACHE_DURATION) {
    return json(cachedStats);
  }
  
  try {
    // ✅ Works in both local and Cloudflare
    // Local: uses import.meta.env
    // Cloudflare: uses platform.env
    const GITHUB_TOKEN = platform?.env?.GITHUB_TOKEN || import.meta.env.VITE_GITHUB_TOKEN || '';
    
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Portfolio-Site'
    };
    
    if (GITHUB_TOKEN) {
      headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
    }
    
    const [userRes, reposRes] = await Promise.all([
      fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}`, { headers }),
      fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated&type=owner`, { headers })
    ]);
    
    if (!userRes.ok || !reposRes.ok) {
      throw new Error(`GitHub API request failed: ${userRes.status}`);
    }
    
    const user = await userRes.json();
    const repos = await reposRes.json();
    
    // Filter out forked repos
    const ownRepos = repos.filter((r: any) => !r.fork);
    
    // Calculate aggregate stats
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
    
    const lastActiveDate = ownRepos.length > 0 
      ? ownRepos.reduce((latest: Date, repo: any) => {
          const pushDate = new Date(repo.pushed_at);
          return pushDate > latest ? pushDate : latest;
        }, new Date(ownRepos[0].pushed_at))
      : new Date();
    
    const daysSinceLastPush = Math.floor(
      (Date.now() - lastActiveDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    
    const stats: GitHubStats = {
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
      lastActiveDate: lastActiveDate.toISOString()
    };
    
    cachedStats = stats;
    lastFetchStats = now;
    
    return json(stats);
  } catch (error) {
    console.error('❌ GitHub API error:', error);
    
    // Return cached data if available on error
    if (cachedStats) {
      return json(cachedStats);
    }
    
    return json({ error: 'Failed to fetch GitHub stats' }, { status: 500 });
  }
};
