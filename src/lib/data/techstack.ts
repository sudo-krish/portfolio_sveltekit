// src/lib/data/techstack.ts

export const techstackData = {
    rightAnchor: {
        label: "TECHNICAL ARSENAL",
        title: "Skill\nCards.",
        description: "A comprehensive breakdown of the tools, languages, and frameworks I use to build petabyte-scale data architectures."
    },
    header: {
        badge: "sys.modules",
    },
    content: {
        shortDescription: `I prioritize <strong class="text-foreground font-medium">vendor-agnostic open-source frameworks</strong> alongside <span class="text-cyan-400 font-medium tracking-wide">highly specialized cloud platforms</span> to architect robust, multi-cloud data engineering solutions.`,
        detailedPhilosophy: `My engineering philosophy centers on eliminating vendor lock-in while maximizing compute performance. I deliberately leverage open-source standards—like <b>Apache Kafka</b>, <b>Spark</b>, and <b>Iceberg</b>—to guarantee data interoperability and long-term data ownership. While native cloud tools are highly capable, I strategically integrate cross-cloud platforms like <b>Databricks</b> and <b>Snowflake</b>. Unlike single-cloud alternatives, these unified engines deliver superior ACID transactional guarantees, zero-copy cloning, high-concurrency BI serving, and seamless AI/ML integration across any cloud provider, ensuring your enterprise architecture remains entirely future-proof.`
    },
    categories: [
        {
            name: "Cloud Architecture",
            iconName: "Cloud",
            accent: "#3b82f6", // Blue
            skills: [
                { name: "AWS", icon: "/icons/aws.png" },
                { name: "S3", icon: "/icons/s3.png" },
                { name: "Lambda", icon: "/icons/lambda.png" },
                { name: "Redshift", icon: "/icons/redshift.png" },
                { name: "Kinesis", icon: "/icons/kinesis.png" },
                { name: "Athena", icon: "/icons/athena.png" },
            ]
        },
        {
            name: "Data & Streaming",
            iconName: "Database",
            accent: "#8b5cf6", // Purple
            skills: [
                { name: "Kafka", icon: "/icons/kafka.png" },
                { name: "Spark", icon: "/icons/spark.png" },
                { name: "Airflow", icon: "/icons/airflow.png" },
                { name: "dbt", icon: "/icons/dbt.png" },
                { name: "Hadoop", icon: "/icons/hadoop.png" },
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
            name: "Governance & Quality",
            iconName: "ShieldCheck",
            accent: "#ec4899", // Pink
            skills: [
                { name: "Atlan", icon: "/icons/atlan.png" },
                { name: "OpenMetadata", icon: "/icons/openmetadata.png" },
                { name: "Great Expectations", icon: "/icons/greatexpectation.jpeg" },
                { name: "Unity Catalog", icon: "/icons/databricks.png" },
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
            ]
        },
        {
            name: "DevOps & K8s",
            iconName: "GitBranch",
            accent: "#f59e0b", // Amber
            skills: [
                { name: "Docker", icon: "/icons/docker.png" },
                { name: "Kubernetes", icon: "/icons/kubernetes.png" },
                { name: "Terraform", icon: "/icons/terraform.png" },
            ]
        }
    ],
    ui: {
        carousel: {
            sectionTitle: "Tech Stack",
            sectionDescription: "Explore my technical arsenal",
            accentColor: "#06b6d4" // Cyan
        },
        cta: {
            label: "View Projects",
            href: "#projects"
        }
    }
};
