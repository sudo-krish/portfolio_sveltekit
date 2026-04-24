// src/lib/data/warehouse.ts

export const warehouseData = {
    // This sits on the right side, serving as the typographic anchor
    rightAnchor: {
        label: "NEAR REAL-TIME WAREHOUSING",
        title: "The Data\nWarehouse.",
        description: "Warehouse refresh and modeling workflows that reduce reporting delay, improve query responsiveness, and support business-facing analytics."
    },
    header: {
        badge: "Analytics & Serving Layer",
        titleLine1: "Near Real-Time",
        titleLine2: "Analytics.",
    },
    content: {
        shortDescription: `I design <strong class="text-foreground font-medium">warehouse refresh and modeling workflows</strong> that reduce reporting delay, improve query responsiveness, and support <span class="text-purple-300 font-medium tracking-wide">business-facing analytics use cases</span>.`,

        detailedPhilosophy: `Data warehouses remain essential for sub-second latency, strict semantic governance, and high concurrency for Business Intelligence. I architect high-performance serving layers using Amazon Redshift and Snowflake, designing near real-time warehouse refresh patterns for faster reporting and operational visibility. By leveraging Airflow for orchestration and dbt for rigorous, metadata-driven modeling, I ensure every metric is version-controlled and tested. This enables sub-5-minute dashboard refresh SLAs, supports hundreds of concurrent users, and provides the analytics foundation that drives business decisions.`
    },
    // The grid items that sit below the main card
    warehouseNodes: [
        { name: "Snowflake", desc: "Data Cloud", iconUrl: "/icons/snowflake.png" },
        { name: "Google BigQuery", desc: "Serverless EDW", iconUrl: "/icons/bigquery.png" },
        { name: "Amazon Redshift", desc: "MPP Warehouse", iconUrl: "/icons/redshift.png" },
        { name: "dbt (Data Build Tool)", desc: "Analytics Engineering", iconUrl: "/icons/dbt.png" },
        { name: "Atlan", desc: "Active Governance", iconUrl: "/icons/atlan.png" },
        { name: "Great expectations", desc: "Data Quality", iconUrl: "/icons/greatexpectation.jpeg" },
        { name: "Snowflake Cortex", desc: "In-Warehouse AI", iconUrl: "/icons/snowflake.png" },
        { name: "Databricks Mosaic", desc: "AI & ML Platform", iconUrl: "/icons/databricks.png" },
        { name: "OpenMetadata", desc: "Data Lineage", iconUrl: "/icons/openmetadata.png" },
    ],
    metrics: {
        latency: "0.24",
        latencyUnit: "s",
        concurrency: "10",
        concurrencyUnit: "k+"
    },
    ui: {
        carousel: {
            sectionTitle: "Data Warehouse",
            sectionDescription: "Explore the Analytics Engine",
            accentColor: "hsl(var(--foreground))" // Purple
        }
    }
};
