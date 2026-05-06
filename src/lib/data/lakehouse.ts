// src/lib/data/lakehouse.ts

export const lakehouseData = {
    // This sits on the left side, serving as the typographic anchor
    leftAnchor: {
        label: "AI-READY DATA FOUNDATIONS",
        title: "The Data\nLakehouse.",
        description: "We are entering an era where data isn't just queried; it's conversed with. I design lakehouses that bridge the gap between massive scale and surgical precision."
    },
    header: {
        badge: "AI & Analytics Foundations",
        titleLine1: "AI-Ready",
        titleLine2: "Data Layer.",
    },
    content: {
        shortDescription: `We are entering an era where data isn't just queried; it's conversed with. I architect <strong class="text-foreground font-medium">metadata-driven lakehouses</strong> that bridge the gap between massive scale and surgical precision for <span class="text-primary font-medium tracking-wide">AI and knowledge-driven applications</span>.`,

        detailedPhilosophy: `The line between data storage and machine intelligence is disappearing. By leveraging Apache Spark alongside open table formats like Apache Iceberg and Delta Lake, I engineer architectures that give you warehouse-level reliability directly on your data lake. But it's not just about SQL anymore. I explore vector search, semantic retrieval, and analytics-ready data layers that actually power modern AI applications. I unify disparate storage into a highly governed foundation that doesn't just answer questions—it powers intelligence.`
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
            accentColor: "hsl(var(--primary))" // Blue
        },
        cta: {
            label: "View Certifications",
            href: "#certifications"
        }
    }
};
