// src/lib/data/warehouse.ts

export const warehouseData = {
    // This sits on the right side, serving as the typographic anchor
    rightAnchor: {
        label: "NEAR REAL-TIME WAREHOUSING",
        title: "The Data\nWarehouse.",
        description: "The data warehouse is where raw information finally becomes truth. I obsess over modeling and performance so the answers are waiting before the questions are even asked."
    },
    header: {
        badge: "Analytics & Serving Layer",
        titleLine1: "Near Real-Time",
        titleLine2: "Analytics.",
    },
    content: {
        shortDescription: `The data warehouse is where <strong class="text-foreground font-medium">raw information finally becomes truth</strong>. I obsess over modeling and performance so the answers are waiting for <span class="text-accent font-medium tracking-wide">business teams</span> before the questions are even asked.`,

        detailedPhilosophy: `If a dashboard takes ten minutes to load, no one will use it. I architect high-performance serving layers using Amazon Redshift and Snowflake that don't just store data—they deliver it at the speed of thought. By leaning into near real-time refresh patterns and rigorous, version-controlled modeling with dbt, I make sure every metric is tested and bulletproof. I build analytics foundations that can handle hundreds of concurrent users without breaking a sweat, turning data teams from cost centers into the heroes of the business.`
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
            accentColor: "hsl(var(--primary))" // Purple
        }
    }
};
