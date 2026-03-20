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
    introParagraph: "This page curates the public repositories that best represent my work across data engineering, automation, architecture experiments, and developer tooling. Instead of listing repositories without context, it highlights what each repo is for, the problem it solves, and how it connects to my projects, articles, and learning material.",
    paragraphs: [
        "I maintain an active GitHub presence with repositories spanning real-time streaming architectures, AWS automation utilities, Python data processing libraries, and infrastructure-as-code templates. Each project is documented with comprehensive READMEs, architecture diagrams, and deployment instructions.",
        "My coding philosophy emphasizes readability, testability, and operational excellence. I follow conventional commit standards, implement automated testing pipelines, and structure repositories with clear separation of concerns.",
        "Beyond personal projects, I actively contribute to the broader data engineering ecosystem through code reviews, technical discussions, and sharing architectural patterns that have proven successful in enterprise environments.",
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
