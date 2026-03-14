// src/lib/data/datalake.ts

export const datalakeData = {
    // This sits in the empty space behind/beside your 3D element on the right
    rightAnchor: {
        label: "STORAGE ARCHITECTURE",
        title: "The Data\nLake.",
        description: "Limitless, cost-optimized object storage serving as the single source of truth for the enterprise."
    },
    header: {
        badge: "Storage Foundation",
        titleLine1: "Central Data",
        titleLine2: "Reservoir.",
    },
    content: {
        shortDescription: `I engineer data architectures that thrive across all generations of tech—from robust <strong class="text-foreground font-medium">legacy Hadoop (HDFS)</strong> clusters to <span class="text-emerald-400 font-medium tracking-wide">modern governed lakehouses</span>.`,

        detailedPhilosophy: `Enterprise data is not monolithic; it demands engineering that bridges the past and the future. I have deep expertise in migrating and managing legacy on-premise Big Data ecosystems (Hadoop, HDFS, Hive), while simultaneously architecting next-generation cloud solutions on Amazon S3. By implementing strict security controls via AWS Lake Formation, Databricks Unity Catalog, and Snowflake Data Lake schemas, I modernize traditional data swamps into lightning-fast, highly governed transactional lakehouses.`
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
            sectionTitle: "Data Reservoir",
            sectionDescription: "Discover the infinite storage lake",
            accentColor: "#10b981" // Emerald
        },
        cta: {
            label: "Enter the Lakehouse",
            href: "#lakehouse"
        }
    }
};
