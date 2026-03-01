// src/lib/data/portfolio-data.ts
import type { PortfolioData } from '$lib/types/portfolio';
import { getGitHubProjectsCached } from '$lib/services/github';

// Import all modularized data
import { personal } from './modules/personal';
import { companies } from './modules/experience';
import { education, certifications } from './modules/education';
import { researchPapers } from './modules/research';
import { projects } from './modules/projects';
import { blogPosts } from './modules/blogs';

export const portfolioData: PortfolioData = {
  personal,
  companies,
  education,
  certifications,
  researchPapers,
  projects,
  blogPosts
};

// Helper functions remain the same
export const getPersonalInfo = () => portfolioData.personal;
export const getCurrentCompany = () => portfolioData.companies.find(c => c.current);
export const getAllCompanies = () => portfolioData.companies;
export const getEducation = () => portfolioData.education;
export const getCertifications = () => portfolioData.certifications;
export const getResearchPapers = () => portfolioData.researchPapers || [];
export const getFeaturedProjects = () => portfolioData.projects.filter(p => p.featured);
export const getAllProjects = () => portfolioData.projects;
export const getProjectById = (id: string) => portfolioData.projects.find(p => p.id === id);
export const getFeaturedBlogPosts = () => portfolioData.blogPosts.filter(b => b.featured);
export const getAllBlogPosts = () => portfolioData.blogPosts;
export const getBlogPostBySlug = (slug: string) => portfolioData.blogPosts.find(b => b.slug === slug);

export async function getAllProjectsWithGitHub() {
  try {
    const githubProjects = await getGitHubProjectsCached();

    // Combine manual projects with GitHub projects
    // Manual projects come first (higher priority)
    return [...githubProjects];
  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    // Return only manual projects if GitHub fetch fails
    return portfolioData.projects;
  }
}

export async function getFeaturedProjectsWithGitHub() {
  try {
    const allProjects = await getAllProjectsWithGitHub();
    return allProjects.filter(p => p.featured);
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    return portfolioData.projects.filter(p => p.featured);
  }
}