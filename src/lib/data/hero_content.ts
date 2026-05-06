// src/lib/data/hero_content.ts

export const heroProfile = {
    jobTitle: "Senior Data Engineer | AWS | Kafka | Spark | Real-Time Data Platforms",
    shortBio: "Data isn't just rows and columns to me—it's the lifeblood of how modern companies think, act, and survive. Explore the systems, pipelines, and architectures I've built over the last 5 years.",
    bio: "Data isn't just rows and columns to me—it's the lifeblood of how modern companies think, act, and survive. Over the past five years, I've dedicated myself to taming the chaos of raw data, building the unseen highways that carry millions of events every second. I don't just write pipelines; I engineer clarity. From the rush of streaming Kafka data to the silent strength of a well-architected data lake, I build systems that let businesses stop guessing and start knowing.",
    resumeUrl: "https://drive.google.com/file/d/1lkamX2hfp25wsLecHgEStbYD7-1ZEMwv/view?usp=drive_link",
    topSkills: [
        "Real-time data pipelines using Kafka, CDC patterns, and event-driven ingestion",
        "Batch and near real-time ETL/ELT using Spark, Airflow, and AWS cloud services",
        "Data warehousing and query performance using Redshift and analytics-ready models",
        "Data lake and medallion architectures for scalable storage and processing",
        "Cloud migrations, reliability improvements, and platform standardization",
        "AWS Certified Solutions Architect – Associate",
        "AWS Certified Cloud Practitioner",
        "AI-ready data foundations with vector search and semantic retrieval"
    ]
};

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
        sectionTitle: "The Data",
        sectionDescription: "Explore details about me and a intro about my self",
    },

    headline: {
        prefix: "DATA",
        suffix: "ENGINEER",
        metaLabelMobile: "Sr. Engineer",
        metaLabelDesktop: "Senior Data Engineer",
    },

    bioCard: {
        metaLabel: "Data Engineering",
        metaTitle: "Krishnanand Anil",
        main: "I've always believed that bad data infrastructure is a silent tax on a company's potential. Over the last 5+ years, I've dedicated myself to building systems that survive the messy, unpredictable reality of production.",
        details:
            "From the first spark of raw data ingestion to the final, clean dataset ready for analysis, I design pipelines that don't just move data—they protect its integrity every step of the way. I specialize in turning sluggish, unreliable data swamps into fast, dependable engines that drive decisions.",
    },

    marquee: {
        payloadLabel: "Tech Stack",
        techStack: [
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
        cta: "View Projects",
        ctaDesktop: "View Data Engineering Projects",
        links: {
            linkedin: "https://www.linkedin.com/in/krishnanand-anil/",
            github: "https://github.com/sudo-krish",
            resume: "https://drive.google.com/file/d/1lkamX2hfp25wsLecHgEStbYD7-1ZEMwv/view?usp=drive_link",
        },
    },
};
