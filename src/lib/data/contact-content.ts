// src/lib/data/contact-content.ts
import type { SectionContent } from "$lib/types/section";

export const personalContactInfo = {
    email: "krishnanandpanil@gmail.com",
    address: {
        city: "Bengaluru",
        state: "Karnataka",
        country: "India"
    }
};

export const contactSectionContent: SectionContent = {
    id: "contact",
    slug: "/contact",
    seoTitle: "Contact Krishnanand Anil | Senior Data Engineer — Open to Roles",
    seoDescription: "Contact Krishnanand Anil for senior data engineering and platform roles. Based in Bengaluru, India. Open to remote, hybrid, and on-site opportunities.",
    seoKeywords: [
        "hire senior data engineer", "data engineering roles", "aws data engineer for hire",
        "data platform engineer india", "kafka pipeline developer", "bengaluru data engineer contact",
    ],
    headline: "Open to Data Engineering Roles",
    subHeadline: "Senior Data Engineering and Platform Roles",
    introParagraph: "I am based in Bengaluru, India and open to remote, hybrid, and on-site opportunities. I am especially interested in roles involving data platforms, streaming systems, warehousing, cloud architecture, and production-scale analytics engineering.",
    paragraphs: [
        "With 5+ years of hands-on experience building production data systems at enterprise scale, I bring deep expertise in AWS cloud services, real-time streaming with Apache Kafka, data warehouse design with Amazon Redshift, and AI-ready analytics platforms.",
        "I am currently based in Bengaluru, India, and available for remote collaboration across time zones. My typical response time is within 24 hours.",
        "Whether you need to architect a real-time CDC pipeline, migrate batch workloads to streaming, design a medallion data lake on AWS, or build an AI-powered analytics platform, I have done it in production and can contribute from day one.",
    ],
    highlights: [
        { label: "Response Time", value: "< 24h", description: "Typical email and LinkedIn response time" },
        { label: "Location", value: "Bengaluru", description: "India, available for remote collaboration" },
        { label: "Availability", value: "Open", description: "Full-time roles and collaboration" },
        { label: "Specialization", value: "Data Eng", description: "AWS, Kafka, Redshift, Python, Airflow" },
    ],
    ctaLabel: "Contact Me About Data Engineering Roles",
    ctaSlug: "/contact",
    detailSections: [
        {
            title: "What I Can Help With",
            content: "My expertise spans the full data engineering lifecycle, from infrastructure design to production deployment.",
            bullets: [
                "Real-time data pipeline architecture with Apache Kafka, Debezium, and AWS Kinesis",
                "AWS cloud infrastructure design and optimization for data workloads",
                "Data warehouse design and query optimization on Amazon Redshift",
                "Data lake architecture using medallion patterns on Amazon S3",
                "ETL/ELT pipeline automation with Apache Airflow, AWS Glue, and dbt",
                "AI-ready analytics platforms with vector databases and semantic search",
                "DevOps for data: Docker, Kubernetes, Terraform, and CI/CD pipeline setup",
            ],
        },
        {
            title: "How to Reach Me",
            content: "I am accessible through multiple channels and typically respond within 24 hours.",
            bullets: [
                "Email: krishnanandpanil@gmail.com — Best for detailed project discussions",
                "LinkedIn: linkedin.com/in/krishnanand-anil — Professional networking and quick messages",
                "GitHub: github.com/sudo-krish — Code-level collaboration and project discussions",
            ],
        },
    ],
};
