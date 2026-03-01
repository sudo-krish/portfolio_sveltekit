import type { Project } from '$lib/types/portfolio';

export const projects: Project[] = [
    {
        id: "realtime-tracking-platform",
        name: "Real-Time Tracking Data Platform",
        description: "Event-driven streaming pipeline processing 50M+ tracking events daily",
        longDescription: "Architected a high-throughput, mission-critical real-time data platform that replaced legacy batch systems. Handles 50M+ tracking events per day with sub-second latency, providing real-time shipment visibility to operations teams, improving SLA compliance and customer satisfaction.",
        repository: "",
        languages: ["Python", "SQL"],
        platforms: ["Apache Kafka", "AWS Lambda", "Amazon Kinesis", "Amazon S3"],
        technologies: ["Event-Driven Architecture", "Stream Processing", "Docker", "Kubernetes"],
        dateCreated: "2024-12-01T00:00:00Z",
        keywords: ["Real-Time", "Streaming", "Kafka", "50M+ Events", "Sub-second Latency", "Production"],
        featured: true,
        image: "/projects/realtime-tracking.jpg",
        metrics: {
            eventsPerDay: "50M+",
            latencyReduction: "99%",
            uptime: "99.9%"
        }
    },
    {
        id: "enterprise-data-warehouse",
        name: "Enterprise Data Warehouse",
        description: "Unified Finance & Business analytics with automated ETL/ELT workflows",
        longDescription: "Designed and delivered a single source of truth for enterprise analytics with governed dimensional models, automated workflows, and standardized KPIs. Reduced manual reporting effort by 80% while improving data consistency and accuracy across the organization.",
        repository: "",
        languages: ["SQL", "Python", "PySpark"],
        platforms: ["Amazon Redshift", "AWS Glue", "DBT", "Apache Airflow"],
        technologies: ["Data Modeling", "ETL/ELT", "Data Governance", "Distributed SQL"],
        dateCreated: "2024-12-15T00:00:00Z",
        keywords: ["Data Warehouse", "Redshift", "ETL", "Business Intelligence", "Production"],
        featured: true,
        image: "/projects/enterprise-warehouse.jpg",
        metrics: {
            reportingEfficiency: "80% improvement",
            accuracy: "98%",
            users: "200+"
        }
    },
    {
        id: "ai-analytics-platform",
        name: "AI-Ready Analytics & Vector Intelligence Platform",
        description: "GenAI-powered analytics with vector search and natural language querying",
        longDescription: "Built the data foundation for GenAI and advanced analytics, enabling contextual retrieval, vector search, and NLQ through a GraphQL layer. Reduced time-to-insight by 70% and enabled self-service analytics without SQL knowledge.",
        repository: "",
        languages: ["Python", "GraphQL"],
        platforms: ["Vector Database", "AWS Lambda", "Amazon S3"],
        technologies: ["Semantic Search", "NLQ", "GenAI", "GraphQL APIs"],
        dateCreated: "2025-01-10T00:00:00Z",
        keywords: ["AI", "Vector Search", "NLQ", "GenAI", "GraphQL", "Production"],
        featured: true,
        image: "/projects/ai-analytics.jpg",
        metrics: {
            insightReduction: "70%",
            adoption: "Enterprise-wide",
            queries: "No SQL required"
        }
    },
    {
        id: "realtime-cdc-pipeline",
        name: "Real-Time CDC Pipeline with Kafka & Debezium",
        description: "Production CDC pipeline using Kafka, Debezium, and custom Python consumers",
        longDescription: "Built an industry-rare real-time Change Data Capture pipeline handling database changes with sub-second latency. Processes 100K+ events per minute with custom Python consumers and on-the-fly transformations.",
        repository: "",
        languages: ["Python", "SQL", "Go"],
        platforms: ["Apache Kafka", "Debezium", "PostgreSQL", "Amazon S3"],
        technologies: ["CDC", "Real-Time Processing", "Docker", "Kubernetes"],
        dateCreated: "2024-03-15T00:00:00Z",
        keywords: ["CDC", "Kafka", "Debezium", "Real-Time", "Python", "Production"],
        featured: true,
        image: "/projects/cdc-pipeline.jpg"
    },
    {
        id: "medallion-data-lake",
        name: "Multi-Zone Data Lake Architecture",
        description: "Scalable data lake with bronze, silver, and gold zones on S3",
        longDescription: "Implemented production-grade data lake following medallion architecture and data mesh principles. Processes 5TB+ monthly with automated data quality checks and lineage tracking.",
        repository: "",
        languages: ["Python", "PySpark", "SQL"],
        platforms: ["Amazon S3", "AWS Glue", "Amazon Athena", "AWS EMR"],
        technologies: ["Medallion Architecture", "Delta Lake", "Data Mesh", "Terraform"],
        dateCreated: "2024-02-20T00:00:00Z",
        keywords: ["Data Lake", "Medallion", "S3", "Data Mesh", "Big Data"],
        featured: false,
        image: "/projects/data-lake.jpg"
    }
];
