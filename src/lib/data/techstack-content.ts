// src/lib/data/techstack-content.ts
import type { SectionContent } from "$lib/types/section";

export const techstackSectionContent: SectionContent = {
    id: "techstack",
    slug: "/tech-stack",
    seoTitle: "Tools and Technologies | AWS, Kafka, Spark, Airflow, Redshift | Krishnanand Anil",
    seoDescription: "Explore the production-oriented data engineering tools and technologies used by Krishnanand Anil: AWS, Kafka, Spark, Airflow, Redshift, dbt, Docker, Kubernetes, and more.",
    seoKeywords: [
        "data engineering tools", "aws data engineering stack", "kafka spark airflow",
        "redshift performance tuning", "python pyspark developer", "dbt data build tool",
        "docker kubernetes terraform", "cloud data platform tools",
    ],
    headline: "Tools and Technologies",
    subHeadline: "Production-Oriented Data Engineering Stack",
    introParagraph: "Tools are just tools until you apply them to a real problem. I don't chase the newest frameworks; I choose the right technologies to build resilient, scalable systems that let businesses sleep soundly at night.",
    paragraphs: [
        "AWS is my foundation. I architect solutions using everything from serverless Lambda functions to massive EMR clusters. Whether it's spinning up Kinesis for real-time streaming or optimizing Redshift for complex analytical queries, I use AWS not just to host data, but to activate it.",
        "When milliseconds matter, I lean on Apache Kafka and Debezium. Capturing changes as they happen and moving them reliably through the ecosystem is an art form. I use Airflow to orchestrate the chaos and dbt to turn raw data into tested, trusted models.",
        "You can't have reliable data without reliable infrastructure. That's why I treat infrastructure as code. Docker, Kubernetes, Terraform, and rigorous CI/CD pipelines ensure that what works on my laptop works flawlessly in production.",
    ],
    highlights: [
        { label: "Cloud Services", value: "15+", description: "AWS services in production use" },
        { label: "Languages", value: "5+", description: "Python, Go, SQL, PySpark, Shell" },
        { label: "Data Frameworks", value: "10+", description: "Kafka, Spark, Airflow, dbt, and more" },
        { label: "DevOps Tools", value: "5+", description: "Docker, K8s, Terraform, CI/CD" },
    ],
    ctaLabel: "Explore Full Tech Stack",
    ctaSlug: "/tech-stack",
    detailSections: [
        {
            title: "Cloud: AWS, Redshift, Glue, Lambda, Kinesis",
            content: "Amazon Web Services forms the backbone of my cloud data engineering practice.",
            bullets: [
                "AWS Lambda — Serverless compute for event-driven data processing",
                "AWS Glue — Managed ETL service for data cataloging and transformation",
                "AWS EMR — Managed Spark clusters for large-scale batch data processing",
                "Amazon Kinesis — Real-time data streaming and analytics",
                "Amazon Redshift — Cloud data warehouse with columnar storage",
                "Amazon S3 — Scalable object storage for data lakes",
            ],
        },
        {
            title: "Streaming and Data Movement: Kafka, Debezium",
            content: "Event-driven ingestion, CDC, and real-time data movement infrastructure.",
            bullets: [
                "Apache Kafka — Distributed event streaming platform for real-time data pipelines",
                "Debezium — Open-source CDC connector for capturing database changes in real time",
                "Apache Airflow — Workflow orchestration engine for scheduling and monitoring data pipelines",
                "dbt (Data Build Tool) — Transformation layer management with version-controlled SQL models",
            ],
        },
        {
            title: "Processing and Languages: Python, SQL, PySpark, Go",
            content: "Production-grade code for data engineering, automation, and distributed processing.",
            bullets: [
                "Python — Primary language for data engineering, automation, and API development",
                "Go — Systems programming and high-performance microservices",
                "SQL — Complex query optimization, stored procedures, and data modeling",
                "PySpark — Distributed data processing on Apache Spark clusters",
            ],
        },
        {
            title: "Platform and DevOps: Docker, Kubernetes, Terraform, CI/CD",
            content: "Containerization, infrastructure-as-code, and CI/CD for reliable data platform operations.",
            bullets: [
                "Docker — Container images for reproducible data pipeline environments",
                "Kubernetes — Container orchestration for scalable microservices",
                "Terraform — Infrastructure as Code for provisioning cloud resources",
                "CI/CD — Automated testing, building, and deployment workflows",
            ],
        },
    ],
};
