// src/lib/data/datalake.ts

export const datalakeData = {
    // This sits in the empty space behind/beside your 3D element on the right
    rightAnchor: {
        label: "DATA LAKE ARCHITECTURE",
        title: "The Data\nLake.",
        description: "Layered storage and processing patterns that improve governance, scalability, and downstream analytics performance across cloud data platforms."
    },
    header: {
        badge: "Scalable Storage & Governance",
        titleLine1: "Medallion",
        titleLine2: "Architecture.",
    },
    content: {
        shortDescription: `I design <strong class="text-foreground font-medium">layered storage and processing patterns</strong> that improve governance, scalability, and downstream analytics performance across <span class="text-success font-medium tracking-wide">cloud data platforms</span>.`,

        detailedPhilosophy: `Data lake and medallion architecture form the foundation for scalable analytics. I implement production-grade data lakes with bronze, silver, and gold zones on Amazon S3, using Apache Iceberg and Delta Lake for ACID transactions and schema evolution. By enforcing strict governance through AWS Lake Formation and Unity Catalog, I modernize traditional data swamps into well-governed, analytics-ready foundations that serve BI, reporting, and AI workloads.`
    },
    // The grid items that will sit below the main card
    storageNodes: [
        { name: "Hadoop HDFS", desc: "Legacy Distributed", iconUrl: "/icons/hadoop.png" },
        { name: "Apache Hive", desc: "Metastore Evolution", iconUrl: "/icons/hive.png" },
        { name: "Amazon S3", desc: "Modern Cloud Store", iconUrl: "/icons/s3.png" },
        { name: "Lake Formation", desc: "AWS Governance", iconUrl: "/icons/lakeformation.png" },
        { name: "Unity Catalog", desc: "Databricks Governance", iconUrl: "/icons/databricks.png" },
        { name: "Snowflake", desc: "Cloud Data Lake", iconUrl: "/icons/snowflake.png" }
    ],
    ui: {
        carousel: {
            sectionTitle: "Data Lake",
            sectionDescription: "Explore the storage architecture",
            accentColor: "hsl(var(--primary))" // Emerald
        },
        cta: {
            label: "Enter the Lakehouse",
            href: "#lakehouse"
        }
    }
};
