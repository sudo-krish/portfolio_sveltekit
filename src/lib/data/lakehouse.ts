// src/lib/data/lakehouse.ts

export const lakehouseData = {
    // This sits on the left side, serving as the typographic anchor
    leftAnchor: {
        label: "TRANSACTIONAL LAYER",
        title: "The Data\nLakehouse.",
        description: "Bringing warehouse-level ACID transactions, time-travel, and schema evolution directly to cloud object storage."
    },
    header: {
        badge: "Compute & Governance",
        titleLine1: "Order To",
        titleLine2: "The Ocean.",
    },
    content: {
        shortDescription: `I architect <strong class="text-foreground font-medium">metadata-driven Lakehouses</strong> that eliminate fragile ETL silos, bringing warehouse performance directly to the data lake for seamless <span class="text-blue-400 font-medium tracking-wide">Analytics and AI integration</span>.`,

        detailedPhilosophy: `By leveraging open-source Apache Spark alongside open table formats like Apache Iceberg and Delta Lake, I engineer architectures that support concurrent reads/writes and schema evolution on massive datasets. I implement centralized, metadata-driven governance using Databricks Unity Catalog and Snowflake Data Lake schemas, paired with AWS Lake Formation. This unifies disparate storage into a highly governed foundation that guarantees sub-second query execution—perfectly optimized for modern BI, advanced analytics, and Enterprise AI workloads.`
    },
    // The grid items that sit below the main card
    lakehouseNodes: [
        { name: "Databricks", desc: "Lakehouse Platform", iconUrl: "/icons/databricks.png" },
        { name: "Snowflake", desc: "Cloud Data Platform", iconUrl: "/icons/snowflake.png" },
        { name: "Apache Spark", desc: "Distributed Compute", iconUrl: "/icons/spark.png" },
        { name: "Apache Iceberg", desc: "Open Table Format", iconUrl: "/icons/iceberg.png" },
        { name: "Delta Lake", desc: "ACID Transactions", iconUrl: "/icons/deltalake.svg" },
        { name: "Unity Catalog", desc: "Metadata Governance", iconUrl: "/icons/databricks.png" },
        { name: "Lake Formation", desc: "AWS Security Layer", iconUrl: "/icons/lakeformation.png" },
        { name: "Trino", desc: "Federated Querying", iconUrl: "/icons/trino.png" },
        { name: "AWS Athena", desc: "Serverless SQL", iconUrl: "/icons/athena.png" }
    ],
    ui: {
        carousel: {
            sectionTitle: "Lakehouse",
            sectionDescription: "Discover the Transactional Data Layer",
            accentColor: "#3b82f6" // Blue
        },
        cta: {
            label: "View Certifications",
            href: "#certifications"
        }
    }
};
