// src/lib/data/projects-page.ts
// Page-level content for /projects — all visible text and SEO metadata.
import { getGitHubProjectsCached } from '$lib/services/github';

export const projectsPageContent = {
    seo: {
        title: "Data Engineering Projects | AWS, Kafka, Spark, Airflow, Warehousing",
        description: "Explore data engineering projects and case studies by Krishnanand Anil. Real-time pipelines, warehouse refresh systems, data lake architecture, and cloud migrations.",
        keywords: "data engineering projects, aws data pipeline project, kafka cdc project, redshift warehouse project, spark data processing",
        url: "https://krishnanandanil.com/projects",
    },
    h1: "Data Engineering Projects and Case Studies",
    introParagraph: "Real-world projects spanning real-time pipelines, warehouse refresh systems, data lake architecture, cloud migrations, and AI-ready analytics platforms.",
    searchPlaceholder: "Search projects or tech...",
    backLabel: "Home",
    emptyState: {
        noProjects: "No projects yet",
        noProjectsHint: "Push markdown files to the project-docs repo to see them here.",
    },
};

export const projects: any[] = [];
export const getAllProjects = () => projects;
