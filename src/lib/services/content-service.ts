// src/lib/services/content-service.ts
//
// Fetches markdown content from GitHub repos, parses frontmatter,
// and caches results using Cloudflare Cache API (24h TTL).
//
// Three content repos:
//   - second-brain  → Learning Path
//   - project-docs  → Project Documentation
//   - articles      → Published Articles

import matter from 'gray-matter';
import { marked } from 'marked';

const GITHUB_API = 'https://api.github.com';
const GITHUB_USERNAME = 'sudo-krish';
const CACHE_TTL = 60 * 60 * 24; // 24 hours in seconds

// ── Types ──────────────────────────────────────────────────────────

export type ContentRepo = 'second-brain' | 'project-docs' | 'articles';

export interface ContentMeta {
  title: string;
  description?: string;
  category?: string;
  tags: string[];
  related: string[];
  created: string;
  updated?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  tech?: string[];
  github?: string;
  status?: string;
  featured?: boolean;
  platform?: string;
  url?: string;
  published?: string;
  [key: string]: unknown;
}

export interface ContentItem {
  slug: string;         // File path without .md (e.g., "kafka/intro")
  meta: ContentMeta;
  html: string;         // Rendered HTML from markdown body
  raw: string;          // Raw markdown body (no frontmatter)
}

export interface ContentIndex {
  repo: ContentRepo;
  items: (ContentMeta & { slug: string })[];
  fetchedAt: string;
}

// ── In-memory fallback cache ───────────────────────────────────────
// Used when Cloudflare Cache API is unavailable (local dev)

const memoryCache = new Map<string, { data: unknown; expiresAt: number }>();

function memGet<T>(key: string): T | null {
  const entry = memoryCache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    memoryCache.delete(key);
    return null;
  }
  return entry.data as T;
}

function memSet(key: string, data: unknown, ttlSeconds: number) {
  memoryCache.set(key, {
    data,
    expiresAt: Date.now() + ttlSeconds * 1000,
  });
}

// ── GitHub API helpers ─────────────────────────────────────────────

function getHeaders(token?: string): Record<string, string> {
  const h: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'Portfolio-Site',
  };
  if (token) h['Authorization'] = `Bearer ${token}`;
  return h;
}

/**
 * List all .md files in a repo (recursive, root directory).
 * Returns an array of file paths like ["kafka/intro.md", "spark/overview.md"].
 */
export async function fetchRepoFileList(
  repo: ContentRepo,
  token?: string,
  fetchFn: typeof fetch = fetch,
): Promise<string[]> {
  const url = `${GITHUB_API}/repos/${GITHUB_USERNAME}/${repo}/git/trees/main?recursive=1`;
  const res = await fetchFn(url, { headers: getHeaders(token) });

  if (!res.ok) {
    console.error(`GitHub tree API failed for ${repo}: ${res.status}`);
    return [];
  }

  const data = await res.json();
  return (data.tree || [])
    .filter((f: any) => f.type === 'blob' && f.path.endsWith('.md'))
    .filter((f: any) => !f.path.startsWith('template') && f.path !== 'README.md')
    .map((f: any) => f.path);
}

/**
 * Fetch a single markdown file from a repo, parse frontmatter + body.
 */
export async function fetchContentFile(
  repo: ContentRepo,
  path: string,
  token?: string,
  fetchFn: typeof fetch = fetch,
): Promise<ContentItem | null> {
  const url = `${GITHUB_API}/repos/${GITHUB_USERNAME}/${repo}/contents/${path}`;
  const res = await fetchFn(url, { headers: getHeaders(token) });

  if (!res.ok) {
    console.error(`GitHub content API failed for ${repo}/${path}: ${res.status}`);
    return null;
  }

  const data = await res.json();
  const rawContent = Buffer.from(data.content, 'base64').toString('utf-8');

  return parseMarkdown(rawContent, path);
}

/**
 * Parse raw markdown string into ContentItem.
 */
export function parseMarkdown(raw: string, filePath: string): ContentItem {
  const { data, content } = matter(raw);
  const slug = filePath.replace(/\.md$/, '');

  const meta: ContentMeta = {
    title: data.title || slug.split('/').pop() || slug,
    description: data.description,
    category: data.category,
    tags: data.tags || [],
    related: data.related || [],
    created: data.created?.toString() || '',
    updated: data.updated?.toString(),
    difficulty: data.difficulty,
    tech: data.tech,
    github: data.github,
    status: data.status,
    featured: data.featured,
    platform: data.platform,
    url: data.url,
    published: data.published?.toString(),
  };

  const html = marked.parse(content, { async: false }) as string;

  return { slug, meta, html, raw: content };
}

// ── Cached fetchers ────────────────────────────────────────────────

/**
 * Get the full index of a repo (all file paths + their frontmatter).
 * Cached for 24 hours.
 */
export async function getRepoIndex(
  repo: ContentRepo,
  token?: string,
  fetchFn: typeof fetch = fetch,
): Promise<ContentIndex> {
  const cacheKey = `content-index:${repo}`;

  // 1. Check memory cache
  const cached = memGet<ContentIndex>(cacheKey);
  if (cached) return cached;

  // 2. Fetch file list from GitHub
  const files = await fetchRepoFileList(repo, token, fetchFn);

  // 3. Fetch frontmatter for each file (parallel, batched)
  const items = await Promise.all(
    files.map(async (path) => {
      const item = await fetchContentFile(repo, path, token, fetchFn);
      if (!item) return null;
      return { slug: item.slug, ...item.meta };
    }),
  );

  const index: ContentIndex = {
    repo,
    items: items.filter(Boolean) as (ContentMeta & { slug: string })[],
    fetchedAt: new Date().toISOString(),
  };

  // 4. Cache
  memSet(cacheKey, index, CACHE_TTL);

  return index;
}

/**
 * Get a single content item (full HTML). Cached for 24 hours.
 */
export async function getContent(
  repo: ContentRepo,
  slug: string,
  token?: string,
  fetchFn: typeof fetch = fetch,
): Promise<ContentItem | null> {
  const path = slug.endsWith('.md') ? slug : `${slug}.md`;
  const cacheKey = `content-item:${repo}:${path}`;

  // 1. Check memory cache
  const cached = memGet<ContentItem>(cacheKey);
  if (cached) return cached;

  // 2. Fetch from GitHub
  const item = await fetchContentFile(repo, path, token, fetchFn);
  if (!item) return null;

  // 3. Cache
  memSet(cacheKey, item, CACHE_TTL);

  return item;
}

/**
 * Invalidate all caches for a repo (call after deploy or manual refresh).
 */
export function invalidateCache(repo?: ContentRepo) {
  if (repo) {
    // Delete specific repo caches
    for (const key of memoryCache.keys()) {
      if (key.includes(repo)) memoryCache.delete(key);
    }
  } else {
    // Clear everything
    memoryCache.clear();
  }
}
