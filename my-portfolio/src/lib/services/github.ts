// src/lib/services/github.ts
// No token required - works with public repos only

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  language: string | null;
  languages_url: string;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
}

interface PortfolioProject {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  repository: string;
  languages: string[];
  platforms: string[];
  technologies: string[];
  dateCreated: string;
  keywords: string[];
  featured: boolean;
  image: string;
}

const GITHUB_USERNAME = 'sudo-krish';
const GITHUB_API = 'https://api.github.com';

/**
 * Fetch all public repositories from GitHub
 * No authentication required - works with public repos
 */
export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(
      `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated&type=owner`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        }
      }
    );

    if (!response.ok) {
      console.error(`GitHub API error: ${response.status}`);
      return [];
    }

    const repos: GitHubRepo[] = await response.json();
    
    // Filter out forked repos, only keep original public repos
    return repos.filter(repo => !repo.fork);
    
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
}

/**
 * Fetch languages for a specific repository
 */
async function fetchRepoLanguages(languagesUrl: string): Promise<string[]> {
  try {
    const response = await fetch(languagesUrl, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      }
    });
    
    if (!response.ok) {
      return [];
    }

    const languages = await response.json();
    return Object.keys(languages).slice(0, 5); // Top 5 languages
    
  } catch (error) {
    return [];
  }
}

/**
 * Extract platforms from repo metadata
 */
function extractPlatforms(repo: GitHubRepo): string[] {
  const platforms: string[] = [];
  const text = `${repo.name} ${repo.description || ''} ${repo.topics.join(' ')}`.toLowerCase();
  
  // Cloud platforms
  if (text.match(/aws|amazon/)) platforms.push('AWS');
  if (text.match(/gcp|google.cloud/)) platforms.push('GCP');
  if (text.match(/azure/)) platforms.push('Azure');
  
  // Data platforms
  if (text.includes('kafka')) platforms.push('Apache Kafka');
  if (text.includes('spark')) platforms.push('Apache Spark');
  if (text.includes('airflow')) platforms.push('Apache Airflow');
  if (text.includes('redshift')) platforms.push('Amazon Redshift');
  if (text.match(/glue|etl/)) platforms.push('AWS Glue');
  if (text.includes('lambda')) platforms.push('AWS Lambda');
  if (text.match(/s3|storage/)) platforms.push('Amazon S3');
  if (text.includes('kubernetes')) platforms.push('Kubernetes');
  
  return platforms.length > 0 ? platforms : ['GitHub'];
}

/**
 * Extract technologies from repo metadata
 */
function extractTechnologies(repo: GitHubRepo): string[] {
  const technologies: string[] = [];
  const text = `${repo.name} ${repo.description || ''} ${repo.topics.join(' ')}`.toLowerCase();
  
  if (text.includes('docker')) technologies.push('Docker');
  if (text.match(/kubernetes|k8s/)) technologies.push('Kubernetes');
  if (text.includes('terraform')) technologies.push('Terraform');
  if (text.match(/postgres|postgresql/)) technologies.push('PostgreSQL');
  if (text.includes('redis')) technologies.push('Redis');
  if (text.match(/mongo|mongodb/)) technologies.push('MongoDB');
  if (text.includes('react')) technologies.push('React');
  if (text.includes('svelte')) technologies.push('Svelte');
  if (text.includes('typescript')) technologies.push('TypeScript');
  if (text.includes('python')) technologies.push('Python');
  if (text.match(/go|golang/)) technologies.push('Go');
  if (text.includes('debezium')) technologies.push('Debezium');
  
  return technologies;
}

/**
 * Determine if a repo should be featured
 */
function shouldBeFeatured(repo: GitHubRepo): boolean {
  // High-value data engineering keywords
  const featuredKeywords = [
    'kafka', 'spark', 'airflow', 'data-engineering', 'etl',
    'real-time', 'pipeline', 'streaming', 'aws', 'redshift',
    'kubernetes', 'cdc', 'debezium', 'data-lake', 'warehouse'
  ];
  
  const text = `${repo.name} ${repo.description || ''} ${repo.topics.join(' ')}`.toLowerCase();
  const hasKeyword = featuredKeywords.some(keyword => text.includes(keyword));
  
  // Feature if: has 3+ stars OR has featured keyword OR very recent activity
  const isVeryRecent = new Date(repo.pushed_at) > new Date(Date.now() - 90 * 24 * 60 * 60 * 1000); // 3 months
  
  return repo.stargazers_count >= 3 || hasKeyword || isVeryRecent;
}

/**
 * Convert GitHub repo to Portfolio project format
 */
async function convertToPortfolioProject(repo: GitHubRepo): Promise<PortfolioProject> {
  // Fetch languages for this repo
  const languages = await fetchRepoLanguages(repo.languages_url);
  
  // Create readable project name
  const projectName = repo.name
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  // Generate description
  const description = repo.description || 
    `${projectName} - A ${repo.language || 'software'} project`;
  
  return {
    id: repo.name.toLowerCase(),
    name: projectName,
    description: description.slice(0, 100),
    longDescription: repo.description || 
      `${projectName} is an open-source project. Check out the repository for implementation details and documentation.`,
    repository: repo.html_url,
    languages: languages.length > 0 ? languages : (repo.language ? [repo.language] : ['Code']),
    platforms: extractPlatforms(repo),
    technologies: extractTechnologies(repo),
    dateCreated: repo.created_at,
    keywords: [
      ...repo.topics, 
      ...(repo.language ? [repo.language] : []),
      ...extractPlatforms(repo),
      ...extractTechnologies(repo)
    ].filter((v, i, a) => a.indexOf(v) === i), // Remove duplicates
    featured: shouldBeFeatured(repo),
    image: `/projects/${repo.name}.jpg`
  };
}

/**
 * Main function: Fetch and convert all public repos
 */
export async function fetchGitHubProjects(): Promise<PortfolioProject[]> {
  const repos = await fetchGitHubRepos();
  
  if (repos.length === 0) {
    return [];
  }
  
  // Convert repos to portfolio format (in parallel)
  const projects = await Promise.all(
    repos.map(repo => convertToPortfolioProject(repo))
  );
  
  // Sort: featured first, then by update date
  return projects.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
  });
}

/**
 * Cache management (1 hour cache)
 */
let cachedProjects: PortfolioProject[] | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

export async function getGitHubProjectsCached(): Promise<PortfolioProject[]> {
  const now = Date.now();
  
  // Return cached if available and fresh
  if (cachedProjects && (now - lastFetchTime) < CACHE_DURATION) {
    return cachedProjects;
  }
  
  // Fetch new data
  try {
    cachedProjects = await fetchGitHubProjects();
    lastFetchTime = now;
    return cachedProjects;
  } catch (error) {
    console.error('Failed to fetch GitHub projects:', error);
    return cachedProjects || []; // Return old cache or empty
  }
}
