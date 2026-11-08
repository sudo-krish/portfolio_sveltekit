// src/routes/api/github/projects/+server.ts
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/public';

const GITHUB_API = 'https://api.github.com';
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

let cachedProjects: any = null;
let lastFetchProjects = 0;

const PLATFORM_RULES: Array<[RegExp | string, string]> = [
  [/aws|amazon/, 'AWS'],
  [/gcp|google.cloud/, 'GCP'],
  [/azure/, 'Azure'],
  ['kafka', 'Apache Kafka'],
  ['spark', 'Apache Spark'],
  ['airflow', 'Apache Airflow'],
  ['redshift', 'Amazon Redshift'],
  [/glue|etl/, 'AWS Glue'],
  ['lambda', 'AWS Lambda'],
  [/s3|storage/, 'Amazon S3'],
  ['kubernetes', 'Kubernetes'],
];

const TECH_RULES: Array<[RegExp | string, string]> = [
  ['docker', 'Docker'],
  [/kubernetes|k8s/, 'Kubernetes'],
  ['terraform', 'Terraform'],
  [/postgres|postgresql/, 'PostgreSQL'],
  ['redis', 'Redis'],
  [/mongo|mongodb/, 'MongoDB'],
  ['react', 'React'],
  ['svelte', 'Svelte'],
  ['typescript', 'TypeScript'],
  ['python', 'Python'],
  [/go|golang/, 'Go'],
  ['debezium', 'Debezium'],
];

function getRepoSearchText(repo: any): string {
  return `${repo.name} ${repo.description || ''} ${repo.topics?.join(' ') || ''}`.toLowerCase();
}

function matchRules(text: string, rules: Array<[RegExp | string, string]>): string[] {
  return rules
    .filter(([pattern]) =>
      typeof pattern === 'string' ? text.includes(pattern) : pattern.test(text),
    )
    .map(([, label]) => label);
}

function extractPlatforms(repo: any): string[] {
  const platforms = matchRules(getRepoSearchText(repo), PLATFORM_RULES);
  return platforms.length > 0 ? platforms : ['GitHub'];
}

function extractTechnologies(repo: any): string[] {
  return matchRules(getRepoSearchText(repo), TECH_RULES);
}

function shouldBeFeatured(repo: any): boolean {
  const featuredKeywords = [
    'kafka',
    'spark',
    'airflow',
    'data-engineering',
    'etl',
    'real-time',
    'pipeline',
    'streaming',
    'aws',
    'redshift',
    'kubernetes',
    'cdc',
    'debezium',
    'data-lake',
    'warehouse',
  ];

  const text = getRepoSearchText(repo);
  const hasKeyword = featuredKeywords.some(keyword => text.includes(keyword));
  const isVeryRecent = new Date(repo.pushed_at) > new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);

  return repo.stargazers_count >= 3 || hasKeyword || isVeryRecent;
}

function mapRepoToProject(repo: any) {
  const projectName = repo.name
    .split(/[-_]/)
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const fallbackLanguage = repo.language || 'software';
  const description = repo.description || `${projectName} - A ${fallbackLanguage} project`;
  const longDescription =
    repo.description ||
    `${projectName} is an open-source project. Check out the repository for implementation details and documentation.`;
  const languages = repo.language ? [repo.language] : ['Code'];
  const platforms = extractPlatforms(repo);
  const technologies = extractTechnologies(repo);
  const languageTags = repo.language ? [repo.language] : [];

  return {
    id: repo.name.toLowerCase(),
    name: projectName,
    description: description.slice(0, 100),
    longDescription,
    repository: repo.html_url,
    languages,
    platforms,
    technologies,
    dateCreated: repo.created_at,
    keywords: [...repo.topics, ...languageTags, ...platforms, ...technologies].filter(
      (v: string, i: number, a: string[]) => a.indexOf(v) === i,
    ),
    featured: shouldBeFeatured(repo),
    image: `/projects/${repo.name}.jpg`,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    watchers: repo.watchers_count,
    issues: repo.open_issues_count,
    size: repo.size,
  };
}

function sortProjects(a: any, b: any): number {
  if (a.featured !== b.featured) return a.featured ? -1 : 1;
  return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
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

  if (cachedProjects && now - lastFetchProjects < CACHE_DURATION) {
    return json(cachedProjects);
  }

  try {
    const { username, headers } = resolveGitHubConfig(platform);

    const response = await fetch(
      `${GITHUB_API}/users/${username}/repos?per_page=100&sort=updated&type=owner`,
      { headers },
    );

    if (!response.ok) {
      throw new Error(`GitHub API failed: ${response.status}`);
    }

    const repos = await response.json();
    const sorted = repos
      .filter((r: any) => !r.fork)
      .map(mapRepoToProject)
      .sort(sortProjects);

    cachedProjects = sorted;
    lastFetchProjects = now;

    return json(sorted);
  } catch (error) {
    console.error('❌ GitHub API error:', error);

    if (cachedProjects) {
      return json(cachedProjects);
    }

    return json({ error: 'Failed to fetch GitHub projects' }, { status: 500 });
  }
};
