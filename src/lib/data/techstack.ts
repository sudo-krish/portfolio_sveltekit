// src/lib/data/techstack.ts

export const techstackData = {
    rightAnchor: {
        label: "PRODUCTION TOOLS & TECHNOLOGIES",
        title: "Tech\nStack.",
        description: "Cloud services, streaming infrastructure, orchestration, warehousing, data modeling, and software engineering tools for reliable data systems."
    },
    content: {
        shortDescription: `My stack spans <strong class="text-foreground font-medium">cloud services, streaming infrastructure, orchestration, warehousing, data modeling, and software engineering tools</strong> needed to design and operate <span class="text-cyan-400 font-medium tracking-wide">reliable data systems</span>.`,
        detailedPhilosophy: `I work across the full data engineering toolkit: AWS for cloud infrastructure, Kafka and Debezium for streaming and CDC, Airflow and dbt for orchestration and transformation, Python and PySpark for processing, and Docker/Kubernetes/Terraform for platform operations. Every tool in this stack has been used in production workloads processing millions of events.`
    },
    categories: [
        {
            name: "Cloud",
            iconName: "Cloud",
            accent: "#3b82f6", // Blue
            skills: [
                { name: "AWS", icon: "/icons/aws.png" },
                { name: "S3", icon: "/icons/s3.png" },
                { name: "Lambda", icon: "/icons/lambda.png" },
                { name: "Redshift", icon: "/icons/redshift.png" },
                { name: "Kinesis", icon: "/icons/kinesis.png" },
                { name: "Glue", icon: "/icons/athena.png" },
            ]
        },
        {
            name: "Streaming & Data Movement",
            iconName: "Database",
            accent: "#8b5cf6", // Purple
            skills: [
                { name: "Kafka", icon: "/icons/kafka.png" },
                { name: "Debezium", icon: "/icons/kafka.png" },
                { name: "Spark", icon: "/icons/spark.png" },
                { name: "Airflow", icon: "/icons/airflow.png" },
                { name: "dbt", icon: "/icons/dbt.png" },
            ]
        },
        {
            name: "Lakehouse & DW",
            iconName: "Layers",
            accent: "#06b6d4", // Cyan
            skills: [
                { name: "Databricks", icon: "/icons/databricks.png" },
                { name: "Snowflake", icon: "/icons/snowflake.png" },
                { name: "Iceberg", icon: "/icons/iceberg.png" },
                { name: "Delta Lake", icon: "/icons/deltalake.svg" },
                { name: "BigQuery", icon: "/icons/bigquery.png" },
            ]
        },
        {
            name: "Storage & Databases",
            iconName: "ShieldCheck",
            accent: "#ec4899", // Pink
            skills: [
                { name: "Aurora PostgreSQL", icon: "/icons/redshift.png" },
                { name: "DynamoDB", icon: "/icons/aws.png" },
                { name: "TiDB", icon: "/icons/openmetadata.png" },
                { name: "Lake Formation", icon: "/icons/lakeformation.png" },
            ]
        },
        {
            name: "Languages",
            iconName: "Code2",
            accent: "#10b981", // Emerald
            skills: [
                { name: "Python", icon: "/icons/python.png" },
                { name: "Go", icon: "/icons/go.png" },
                { name: "SQL", icon: "/icons/sql.png" },
                { name: "PySpark", icon: "/icons/spark.png" },
            ]
        },
        {
            name: "Platform & DevOps",
            iconName: "GitBranch",
            accent: "#f59e0b", // Amber
            skills: [
                { name: "Docker", icon: "/icons/docker.png" },
                { name: "Kubernetes", icon: "/icons/kubernetes.png" },
                { name: "Terraform", icon: "/icons/terraform.png" },
                { name: "CI/CD", icon: "/icons/docker.png" },
            ]
        }
    ],
    ui: {
        carousel: {
            sectionTitle: "Tech Stack",
            sectionDescription: "Tools and production technologies",
            accentColor: "#06b6d4" // Cyan
        },
        cta: {
            label: "View Projects",
            href: "#projects"
        }
    }
};
