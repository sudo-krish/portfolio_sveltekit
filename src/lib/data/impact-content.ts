// src/lib/data/impact-content.ts
import type { SectionContent } from "$lib/types/section";

export const impactSectionContent: SectionContent = {
    id: "impact",
    slug: "/impact",
    seoTitle: "Production Outcomes and Delivery Metrics | Krishnanand Anil",
    seoDescription: "Measurable production outcomes: 50M+ events/day, sub-5-minute warehouse refresh, 99.9% pipeline uptime, and accuracy improvements from 60% to 98%.",
    seoKeywords: [
        "data engineering outcomes", "production pipeline metrics", "data latency reduction",
        "warehouse refresh performance", "pipeline uptime reliability", "data quality improvement",
    ],
    headline: "Production Outcomes",
    subHeadline: "Delivery Metrics from Real-World Systems",
    introParagraph: "These metrics reflect the kinds of engineering problems I have worked on, from large-scale event processing to low-latency analytics refresh, pipeline uptime, and automation-driven efficiency improvements.",
    paragraphs: [
        "Data engineering is ultimately about delivering business value. My approach centers on identifying high-impact opportunities where better data infrastructure directly translates to faster decisions, more accurate reporting, and significant cost savings. The metrics below represent verified production outcomes, not theoretical benchmarks.",
        "At DTDC Express, I replaced batch processing cycles with a real-time streaming architecture that delivers data in sub-second timeframes. At Quantiphi, I improved report accuracy from 60% to 98% through advanced query optimization and validation pipelines.",
        "Beyond speed and accuracy, I focus on operational efficiency. By automating manual reporting workflows with Apache Airflow, dbt, and AWS Glue, I have consistently reduced manual effort by 70–80%, freeing data teams to focus on higher-value analytics work.",
    ],
    highlights: [
        { label: "Events/Day", value: "50M+", description: "High-throughput data systems for large-scale event ingestion and analytics" },
        { label: "Warehouse Refresh", value: "<5min", description: "Near real-time warehouse refresh for faster reporting and operational visibility" },
        { label: "Pipeline Uptime", value: "99.9%", description: "Resilient pipeline design with monitoring, retries, and production reliability" },
        { label: "Data Accuracy", value: "60→98%", description: "Improved data quality through stronger transformation logic and validation patterns" },
    ],
    ctaLabel: "See Project Case Studies",
    ctaSlug: "/projects",
    detailSections: [
        {
            title: "Real-Time Data Delivery",
            content: "Transitioning from batch-oriented to real-time data architectures has been my most impactful contribution.",
            bullets: [
                "Reduced data latency from hours to seconds — replacing batch cycles with streaming",
                "50M+ tracking events processed daily with zero data loss",
                "99.9% pipeline uptime maintained across production systems",
                "Sub-5-minute data refresh cycles in near-real-time warehouse environments",
            ],
        },
        {
            title: "Data Quality and Accuracy",
            content: "Accurate data is the foundation of trustworthy analytics. I implement multi-layer validation pipelines.",
            bullets: [
                "Report accuracy improved from 60% to 98% through validation pipelines",
                "Automated data quality checks at bronze, silver, and gold zones",
                "SCD Type 1 and Type 2 implementations for historical data integrity",
            ],
        },
        {
            title: "Operational Efficiency",
            content: "By designing self-healing, auto-scaling pipelines with intelligent orchestration, I consistently free up engineering resources.",
            bullets: [
                "80% reduction in manual reporting effort through automated ETL/ELT workflows",
                "Deployment efficiency improvement through CI/CD automation",
                "Reduced time-to-insight with AI-ready analytics platform",
            ],
        },
    ],
};
