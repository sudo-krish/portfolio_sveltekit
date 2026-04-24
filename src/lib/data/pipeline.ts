// src/lib/data/pipeline.ts

export const pipelineData = {
    leftAnchor: {
        label: "CORE COMPETENCIES",
        title: "What I\nBuild.",
        description: "End-to-end data engineering: ingestion, CDC, transformation, orchestration, warehousing, observability, and platform design."
    },
    header: {
        badge: "Data Engineering & Cloud Architecture",
        titleLine1: "Production-Grade",
        titleLine2: "Data Systems.",
    },
    content: {
        shortDescription: `My work focuses on <strong class="text-foreground font-medium">end-to-end data engineering</strong>: ingestion, CDC, transformation, orchestration, warehousing, observability, and platform design — specializing in <span class="text-cyan-300 font-medium tracking-wide">AWS-native and cloud-scale systems</span> that move data reliably and support analytics and AI use cases.`,

        detailedPhilosophy: `I design systems that reduce latency, improve downstream reporting, and support scalable analytics. My approach combines real-time data pipelines using Kafka and CDC patterns, batch and near real-time ETL/ELT using Spark and Airflow, data warehousing with Redshift, data lake and medallion architectures for scalable storage, and cloud migrations with platform standardization — all focused on reliability, maintainability, and business usefulness.`
    },
    details: [
        {
            id: "streaming",
            title: "Real-Time CDC Pipelines",
            metric: "Low-Latency Ingestion",
            description: "Built CDC and event-driven data pipelines using Kafka, Debezium, and cloud-native components to move operational data into analytics systems with strong reliability."
        },
        {
            id: "batch-elt",
            title: "Batch & NRT ETL/ELT",
            metric: "Scalable Processing",
            description: "Built transformation pipelines using Python, SQL, PySpark, and supporting tools to handle batch processing, schema evolution, and scalable data movement."
        },
        {
            id: "orchestration",
            title: "Orchestration & Automation",
            metric: "Reliable Workflows",
            description: "Managed complex DAG dependencies and automated ETL deployments using Apache Airflow, Prefect, and Docker to ensure operational resilience."
        }
    ],
    // Data for the Marquee
    techStack: [
        { name: "Kafka", iconUrl: "/icons/kafka.png" },
        { name: "Spark", iconUrl: "/icons/spark.png" },
        { name: "Databricks", iconUrl: "/icons/databricks.png" },
        { name: "dbt", iconUrl: "/icons/dbt.png" },
        { name: "Python", iconUrl: "/icons/python.png" },
        { name: "Snowflake", iconUrl: "/icons/snowflake.png" },
    ],
    ui: {
        carousel: {
            sectionTitle: "Data Engineering",
            sectionDescription: "Explore the Architecture",
            accentColor: "hsl(var(--foreground))" // Cyan
        },
        cta: {
            label: "Explore the Lake",
            href: "#datalake"
        },
        telemetry: {
            titleDesktop: "Live Flow",
            titleMobile: "Flow",
            liveStats: "50M+ events/day"
        },
        stack: {
            titleDesktop: "Technology Stack",
            titleMobile: "Stack",
            scrollHint: "SCROLL TO EXPLORE"
        }
    }
};
