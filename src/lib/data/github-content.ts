// src/lib/data/github-content.ts
import type { SectionContent } from "$lib/types/section";

export const githubSectionContent: SectionContent = {
    id: "github",
    slug: "/github",
    seoTitle: "GitHub Projects and Repositories | Krishnanand Anil",
    seoDescription: "Browse Krishnanand Anil's GitHub repositories, data engineering projects, technical experiments, and open source work.",
    seoKeywords: [
        "data engineering github", "github repositories data engineer", "kafka cdc project github",
        "python data pipeline project", "aws automation scripts", "data engineering open source",
    ],
    headline: "GitHub Repositories",
    subHeadline: "Open Source Work and Engineering Projects",
    introParagraph: "I believe that the best way to prove you can build something is to simply build it. My GitHub isn't just a portfolio; it's a sandbox where I test ideas, share architectures, and solve the kinds of problems I see in production every day.",
    paragraphs: [
        "You'll find everything here from real-time streaming architectures to automated AWS utilities. I don't just dump code and walk away—every project is documented so that another engineer can actually understand the 'why' behind the architecture, not just the 'how'.",
        "I write code with the assumption that someone else is going to have to maintain it at 2 AM. That means readability, comprehensive test suites, and operational excellence aren't afterthoughts; they're the baseline.",
        "Open source is about giving back. Beyond my own repositories, I try to contribute to the broader data ecosystem—sharing the patterns and hard-won lessons that have kept my enterprise systems running.",
    ],
    highlights: [
        { label: "Public Repositories", value: "42+", description: "Open-source data engineering tools and templates" },
        { label: "Total Commits", value: "4.2K+", description: "Consistent contribution across projects" },
        { label: "Stars Earned", value: "128+", description: "Community recognition and adoption" },
        { label: "Languages Used", value: "5+", description: "Python, Go, SQL, TypeScript, Shell" },
    ],
    ctaLabel: "View GitHub Portfolio",
    ctaSlug: "/github",
    detailSections: [
        {
            title: "Featured Repositories",
            content: "My most impactful repositories demonstrate end-to-end data engineering solutions, from real-time streaming architectures to AI-powered analytics platforms.",
            bullets: [
                "Real-Time Tracking Data Platform — Event-driven pipeline processing 50M+ events/day with Apache Kafka",
                "Enterprise Data Warehouse — Unified Finance & Business analytics with automated ETL/ELT on Redshift",
                "AI-Ready Analytics Platform — GenAI-powered analytics with vector search and natural language querying",
                "Real-Time CDC Pipeline — Production CDC using Kafka, Debezium, and custom Python consumers",
                "Multi-Zone Data Lake — Scalable medallion architecture on S3 with automated quality checks",
            ],
        },
        {
            title: "Engineering Practices",
            content: "Every repository follows battle-tested engineering standards that ensure code quality, maintainability, and operational reliability.",
            bullets: [
                "Conventional commits with semantic versioning for clear change history",
                "Comprehensive unit and integration test suites",
                "Docker-first development environments for reproducible builds",
                "Infrastructure-as-code with Terraform modules",
                "CI/CD pipelines with automated linting, testing, and deployment",
            ],
        },
    ],
};
