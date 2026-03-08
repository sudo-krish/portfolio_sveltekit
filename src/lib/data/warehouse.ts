// src/lib/data/warehouse.ts

export const warehouseData = {
    // This sits on the right side, serving as the typographic anchor
    rightAnchor: {
        label: "ANALYTICS SERVING ENGINE",
        title: "The Data\nWarehouse.",
        description: "The refined analytics engine delivering sub-second BI performance, high concurrency, and automated materialized views."
    },
    header: {
        badge: "BI & Serving Layer",
        titleLine1: "The Refined",
        titleLine2: "Engine.",
    },
    content: {
        shortDescription: `While Lakehouses solve massive scale, the Data Warehouse remains the undisputed king of <strong class="text-white font-medium">sub-second latency</strong>, strict semantic governance, and <span class="text-purple-300 font-medium tracking-wide">high concurrency</span> for Business Intelligence and operational AI.`,

        detailedPhilosophy: `Data Lakes and Lakehouses excel at raw compute, but they cannot match the absolute data consistency, complex join performance, and thousands-scale concurrency of a true Data Warehouse. I architect high-performance serving layers using Snowflake, Google BigQuery, and Amazon Redshift. By leveraging Airflow for orchestration and dbt for rigorous, metadata-driven modeling, I ensure every metric is version-controlled and tested. Furthermore, I integrate in-warehouse AI capabilities using Databricks Mosaic AI and Snowflake Cortex directly into the SQL workflows, empowering business operations with LLMs. All of this is strictly governed, mapped, and audited using enterprise lineage tools like OpenMetadata and Atlan.`
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
        { name: "OpenMetadata", desc: "Data Lineage", iconUrl: "/icons/openmetadata.png" }, // Added OpenMetadata
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
            accentColor: "#a855f7" // Purple
        }
    }
};
