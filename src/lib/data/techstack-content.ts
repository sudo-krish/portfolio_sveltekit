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
    introParagraph: "My stack spans cloud services, streaming infrastructure, orchestration, warehousing, data modeling, and software engineering tools needed to design and operate reliable data systems.",
    paragraphs: [
        "At the core of my cloud expertise is Amazon Web Services (AWS), where I architect solutions using services like AWS Glue for serverless ETL, AWS Lambda for event-driven compute, Amazon EMR for big data processing with Apache Spark and PySpark, Amazon Kinesis for real-time streaming, and Amazon Redshift for high-performance data warehousing.",
        "For real-time data engineering, I leverage Apache Kafka with Debezium for Change Data Capture (CDC), Apache Airflow for workflow orchestration, and dbt (Data Build Tool) for transformation-layer management.",
        "My DevOps and infrastructure-as-code practice includes Docker containerization, Kubernetes orchestration, Terraform for infrastructure provisioning, and CI/CD pipeline automation.",
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
