// src/lib/data/pipeline.ts

export const pipelineData = {
    leftAnchor: {
        label: "CORE COMPETENCIES",
        title: "What I\nBuild.",
        description: "I build the nervous system. From the first spark of raw data ingestion to the final, clean dataset ready for analysis, I design pipelines that protect data integrity every step of the way."
    },
    header: {
        badge: "Data Engineering & Cloud Architecture",
        titleLine1: "Production-Grade",
        titleLine2: "Data Systems.",
    },
    content: {
        shortDescription: `I build the nervous system. From the first spark of raw data ingestion to the final, clean dataset ready for analysis, I design <strong class="text-foreground font-medium">pipelines that don't just move data</strong>—they protect its integrity every step of the way, especially across <span class="text-primary font-medium tracking-wide">AWS-native and cloud-scale systems</span>.`,

        detailedPhilosophy: `I've always believed that bad data infrastructure is a silent tax on a company's potential. My philosophy is simple: build pipelines that are as resilient as they are fast. Whether it's wiring up real-time streaming with Kafka, capturing changes as they happen, or orchestrating massive batch loads with Airflow, I obsess over the details so that the data analysts and decision-makers downstream never have to worry if the numbers are right.`
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
            accentColor: "hsl(var(--primary))" // Cyan
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
