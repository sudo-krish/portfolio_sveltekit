import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { GITHUB_TOKEN } from '$env/static/private';

const GITHUB_API = 'https://api.github.com';
const GITHUB_USERNAME = 'sudo-krish';
const CACHE_DURATION = 1000 * 60 * 30; // 30 minutes

let cachedProjects: any = null;
let lastFetchProjects = 0;

function extractPlatforms(repo: any): string[] {
  const platforms: string[] = [];
  const text = `${repo.name} ${repo.description || ''} ${repo.topics.join(' ')}`.toLowerCase();
  
  if (text.match(/aws|amazon/)) platforms.push('AWS');
  if (text.match(/gcp|google.cloud/)) platforms.push('GCP');
  if (text.match(/azure/)) platforms.push('Azure');
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

function extractTechnologies(repo: any): string[] {
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

function shouldBeFeatured(repo: any): boolean {
  const featuredKeywords = [
    'kafka', 'spark', 'airflow', 'data-engineering', 'etl',
    'real-time', 'pipeline', 'streaming', 'aws', 'redshift',
    'kubernetes', 'cdc', 'debezium', 'data-lake', 'warehouse'
  ];
  
  const text = `${repo.name} ${repo.description || ''} ${repo.topics.join(' ')}`.toLowerCase();
  const hasKeyword = featuredKeywords.some(keyword => text.includes(keyword));
  const isVeryRecent = new Date(repo.pushed_at) > new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
  
  return repo.stargazers_count >= 3 || hasKeyword || isVeryRecent;
}

export const GET: RequestHandler = async () => {
  const now = Date.now();
  
  if (cachedProjects && (now - lastFetchProjects) < CACHE_DURATION) {
    console.log('✅ Returning cached GitHub projects');
    return json(cachedProjects);
  }
  
  try {
    const headers = {
      'Accept': 'application/vnd.github.v3+json',
      ...(GITHUB_TOKEN && { 'Authorization': `token ${GITHUB_TOKEN}` })
    };
    
    const response = await fetch(
      `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated&type=owner`,
      { headers }
    );
    
    if (!response.ok) {
      throw new Error('GitHub API request failed');
    }
    
    const repos = await response.json();
    const ownRepos = repos.filter((r: any) => !r.fork);
    
    const projects = ownRepos.map((repo: any) => {
      const projectName = repo.name
        .split(/[-_]/)
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      const description = repo.description || 
        `${projectName} - A ${repo.language || 'software'} project`;
      
      return {
        id: repo.name.toLowerCase(),
        name: projectName,
        description: description.slice(0, 100),
        longDescription: repo.description || 
          `${projectName} is an open-source project. Check out the repository for implementation details and documentation.`,
        repository: repo.html_url,
        languages: repo.language ? [repo.language] : ['Code'],
        platforms: extractPlatforms(repo),
        technologies: extractTechnologies(repo),
        dateCreated: repo.created_at,
        keywords: [
          ...repo.topics,
          ...(repo.language ? [repo.language] : []),
          ...extractPlatforms(repo),
          ...extractTechnologies(repo)
        ].filter((v: string, i: number, a: string[]) => a.indexOf(v) === i),
        featured: shouldBeFeatured(repo),
        image: `/projects/${repo.name}.jpg`,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        watchers: repo.watchers_count,
        issues: repo.open_issues_count,
        size: repo.size
      };
    });
    
    const sorted = projects.sort((a: any, b: any) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
    });
    
    cachedProjects = sorted;
    lastFetchProjects = now;
    
    console.log('✅ GitHub projects fetched and cached');
    return json(sorted);
  } catch (error) {
    console.error('❌ GitHub API error:', error);
    return json({ error: 'Failed to fetch GitHub projects' }, { status: 500 });
  }
};
