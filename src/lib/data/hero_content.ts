// src/lib/data/hero_content.ts

export type TechItem = {
    name: string;
    iconUrl: string;
};

export type HeroContent = {
    identity: {
        sectionTitle: string;
        sectionDescription: string;
    };

    headline: {
        prefix: string; // "DATA"
        suffix: string; // "ENGINEER"
        metaLabelMobile: string;
        metaLabelDesktop: string;
    };

    bioCard: {
        metaLabel: string;
        metaTitle: string;
        main: string;
        details: string;
    };

    marquee: {
        payloadLabel: string;
        techStack: TechItem[];
    };

    actionDock: {
        cta: string;
        ctaDesktop: string;
        links: {
            github: string;
            linkedin: string;
            resume: string;
        };
    };
};

export const heroContent: HeroContent = {
    identity: {
        sectionTitle: "Senior Data Engineer",
        sectionDescription: "Krishnanand Anil - Real-Time Data Architect",
    },

    headline: {
        prefix: "DATA",
        suffix: "ENGINEER",
        metaLabelMobile: "Sr. Engineer",
        metaLabelDesktop: "Senior Data Engineer",
    },

    bioCard: {
        metaLabel: "Data Mastery",
        metaTitle: "Krishnanand Anil",
        main: "I'm a Senior Data Engineer specializing in building production-scale data systems. I've always been fascinated by distributed systems, high-reach architectures, and solving complex engineering problems.",
        details:
            "Expert in Redshift, Kafka, and PySpark. I bridge the gap between legacy Hadoop and modern Lakehouses (Iceberg, Delta Lake) using Z-Ordering and Medallion principles. I'm also architecting AI-ready foundations using vector embeddings (Cosine/Euclidian) and RAG patterns.",
    },

    marquee: {
        payloadLabel: "Tech Stack",
        techStack: [
            // Replace these placeholder paths with the actual paths to your PNG files 
            // inside your static/ folder (e.g., static/icons/aws.png)
            { name: "AWS", iconUrl: "/icons/aws.png" },
            { name: "Kafka", iconUrl: "/icons/kafka.png" },
            { name: "Python", iconUrl: "/icons/python.png" },
            { name: "Snowflake", iconUrl: "/icons/snowflake.png" },
            { name: "Spark", iconUrl: "/icons/spark.png" },
            { name: "Docker", iconUrl: "/icons/docker.png" },
            { name: "Kubernetes", iconUrl: "/icons/kubernetes.png" },
            { name: "Terraform", iconUrl: "/icons/terraform.png" },
            { name: "Databricks", iconUrl: "/icons/databricks.png" },
            { name: "Redshift", iconUrl: "/icons/redshift.png" },
            { name: "Iceberg", iconUrl: "/icons/iceberg.png" },
            { name: "Airflow", iconUrl: "/icons/airflow.png" },
            { name: "dbt", iconUrl: "/icons/dbt.png" },
            { name: "Bigquery", iconUrl: "/icons/bigquery.png" },
            { name: "Lakeformation", iconUrl: "/icons/lakeformation.png" },





        ],
    },

    actionDock: {
        cta: "Hire Me",
        ctaDesktop: "Connect & Deploy",
        links: {
            linkedin: "https://www.linkedin.com/in/krishnanand-anil/",
            github: "https://github.com/sudo-krish",
            resume: "https://drive.google.com/file/d/1lkamX2hfp25wsLecHgEStbYD7-1ZEMwv/view?usp=drive_link",
        },
    },
};
