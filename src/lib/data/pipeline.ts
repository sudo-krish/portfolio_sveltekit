// src/lib/data/pipeline.ts

export const pipelineData = {
    leftAnchor: {
        label: "ENTERPRISE DATA ARCHITECTURE",
        title: "Scalable\nData Pipelines.",
        description: "Senior Data Engineer architecting highly available, real-time streaming and fault-tolerant batch ETL systems for modern cloud environments."
    },
    header: {
        badge: "Data Engineering & Cloud Infrastructure",
        titleLine1: "High-Performance",
        titleLine2: "Data Systems.",
    },
    content: {
        shortDescription: `I specialize in building scalable, enterprise-grade data platforms. From raw ingestion to AI-ready insights, I engineer robust, 
        <strong class="text-foreground font-medium">real-time cloud architectures</strong> 
        that securely process <span class="text-cyan-300 font-medium tracking-wide">50M+ events daily</span> with sub-second latency.`,

        detailedPhilosophy: `My data engineering philosophy centers on Data Mesh principles, decoupled storage and compute, and the Medallion Architecture (Bronze, Silver, Gold zones). I design high-throughput CDC streaming pipelines using Apache Kafka and Debezium, alongside scalable Lakehouse batch ELT workflows via AWS Glue, EMR, and Databricks. By enforcing strict data contracts with dbt (Data Build Tool), I ensure 99.9% uptime, idempotency, and guaranteed data quality for mission-critical analytics and reporting.`
    },
    details: [
        {
            id: "streaming",
            title: "Kafka Event Streaming",
            metric: "Sub-Second Delivery",
            description: "Built decoupled, event-driven CDC architectures with Apache Kafka & Spark Streaming to eliminate data latency bottlenecks."
        },
        {
            id: "batch-elt",
            title: "AWS & Lakehouse ELT",
            metric: "Petabyte Scalability",
            description: "Optimized distributed batch processing workloads across Amazon Redshift and S3 data lakes using PySpark and dbt incremental models."
        },
        {
            id: "orchestration",
            title: "Workflow Orchestration",
            metric: "Automated Resiliency",
            description: "Managed complex DAG dependencies and scheduled CI/CD automated ETL deployments utilizing Apache Airflow and Docker."
        }
    ],
    // Data for the Marquee
    techStack: [
        { name: "Kafka", iconUrl: "/icons/kafka.png" },
        { name: "Spark", iconUrl: "/icons/spark.png" },
        { name: "Databricks", iconUrl: "/icons/databricks.png" },
        { name: "dbt", iconUrl: "/icons/dbt.png" },
        // { name: "Airflow", iconUrl: "/icons/airflow.png" },
        { name: "Python", iconUrl: "/icons/python.png" },
        { name: "Snowflake", iconUrl: "/icons/snowflake.png" },
        // { name: "AWS", iconUrl: "/icons/aws.png" },
        // { name: "Docker", iconUrl: "/icons/docker.png" }
    ],
    ui: {
        carousel: {
            sectionTitle: "Data Ingestion",
            sectionDescription: "Explore the Pipeline Architecture",
            accentColor: "#06b6d4" // Cyan
        },
        cta: {
            label: "Explore the Lake",
            href: "#datalake"
        },
        telemetry: {
            titleDesktop: "Live Flow",
            titleMobile: "Flow",
            liveStats: "10M+ msg/s"
        },
        stack: {
            titleDesktop: "Technology Stack",
            titleMobile: "Stack",
            scrollHint: "SCROLL TO EXPLORE"
        }
    }
};
