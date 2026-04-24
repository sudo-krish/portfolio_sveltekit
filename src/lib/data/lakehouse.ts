// src/lib/data/lakehouse.ts

export const lakehouseData = {
    // This sits on the left side, serving as the typographic anchor
    leftAnchor: {
        label: "AI-READY DATA FOUNDATIONS",
        title: "The Data\nLakehouse.",
        description: "Bringing warehouse-level transactions, semantic retrieval, and AI-ready data layers directly to cloud object storage."
    },
    header: {
        badge: "AI & Analytics Foundations",
        titleLine1: "AI-Ready",
        titleLine2: "Data Layer.",
    },
    content: {
        shortDescription: `I architect <strong class="text-foreground font-medium">metadata-driven lakehouses</strong> and explore vector search, semantic retrieval, and analytics-ready data layers that support modern <span class="text-blue-400 font-medium tracking-wide">AI and knowledge-driven applications</span>.`,

        detailedPhilosophy: `By leveraging Apache Spark alongside open table formats like Apache Iceberg and Delta Lake, I engineer architectures that support concurrent reads/writes and schema evolution on massive datasets. I implement centralized, metadata-driven governance using Databricks Unity Catalog and AWS Lake Formation. Beyond traditional analytics, I explore vector search, semantic retrieval, and analytics-ready data layers that support modern AI and knowledge-driven applications — unifying disparate storage into a highly governed foundation for BI, analytics, and Enterprise AI workloads.`
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
            accentColor: "hsl(var(--foreground))" // Blue
        },
        cta: {
            label: "View Certifications",
            href: "#certifications"
        }
    }
};
