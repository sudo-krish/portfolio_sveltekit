// src/lib/data/experience.ts

export const experienceData = {
    leftAnchor: {
        label: "CAREER PROGRESSION",
        title: "The\nOffice.",
        description: "A chronological log of my engineering journey."
    },
    header: {
        badge: "Professional Journey",
    },
    content: {
        shortDescription: `My engineering journey spans from building foundational <strong class="text-white font-medium">Hadoop & ETL pipelines</strong> to architecting <span class="text-blue-400 font-medium tracking-wide">petabyte-scale, real-time data platforms</span>.`,

        detailedPhilosophy: `From 2020 at Cognizant, I engineered Big Data platforms using Hadoop, Spark, and Sqoop pipelines combined with robust UNIX/SQL foundations. By 2022, I scaled up to full cloud data warehousing using Glue, EMR, and Redshift. In early 2024 at Quantiphi, I architected near real-time streaming pipelines with Kinesis, Lambda, and DMS, building automated Spark workflows and self-remediating validation pipelines. Today at DTDC, I am building open-source real-time streaming platforms using Debezium, Kafka, and Spark Streaming into Iceberg tables. I've engineered DBT/Athena reporting, Superset UI analytics, and normalized siloed data into high-performance HTAP systems for middle-tracking.`
    },
    milestones: [
        { year: "2020", label: "Program Analyst", role: "Cognizant: Hadoop, Spark & Big Data ETL", iconName: "Terminal", color: "#3b82f6" },
        { year: "2022", label: "Associate", role: "Cognizant: AWS Cloud Warehousing (Glue, EMR, Redshift)", iconName: "Cloud", color: "#8b5cf6" },
        { year: "2024", label: "Senior Data Eng", role: "Quantiphi: Streaming, Kinesis & Automations", iconName: "Zap", color: "#ec4899" },
        { year: "2025", label: "Data Engineer", role: "DTDC: Iceberg, Kafka, Debezium & HTAP", iconName: "Sparkles", color: "#f59e0b" }
    ],
    ui: {
        carousel: {
            sectionTitle: "Experience",
            sectionDescription: "Swipe to view my journey",
            accentColor: "#3b82f6" // Blue
        },
        cta: {
            label: "Explore Full Resume",
            href: "experience" /* Ensure this targets your full CV or LinkedIn link if desired */
        }
    }
};
