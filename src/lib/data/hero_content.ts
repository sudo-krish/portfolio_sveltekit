// src/lib/data/hero_content.ts

export const heroProfile = {
    jobTitle: "Senior Data Engineer | AWS | Kafka | Spark | Real-Time Data Platforms",
    shortBio: "Senior Data Engineer with 5+ years building AWS, Kafka, Spark, and warehouse pipelines. Explore projects, articles, learning resources, and production-scale data systems.",
    bio: "Senior Data Engineer with 5+ years building AWS, Kafka, Spark, and warehouse pipelines. I design and build production-grade data platforms using AWS, Kafka, Spark, Airflow, and modern warehousing patterns. My work spans real-time pipelines, CDC architectures, warehouse refresh systems, cloud migrations, and scalable analytics foundations that support faster reporting, better reliability, and stronger engineering operations.",
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
        sectionTitle: "Senior Data Engineer | AWS | Streaming | Warehousing | Data Platforms",
        sectionDescription: "Krishnanand Anil — Senior Data Engineer for AWS, Kafka, and Real-Time Data Systems",
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
        main: "I design and build production-grade data platforms using AWS, Kafka, Spark, Airflow, and modern warehousing patterns. Over 5+ years, I have worked across real-time pipelines, CDC architectures, warehouse refresh systems, cloud migrations, and scalable analytics foundations.",
        details:
            "My work supports faster reporting, better reliability, and stronger engineering operations. I specialize in end-to-end data engineering: ingestion, CDC, transformation, orchestration, warehousing, observability, and platform design — all on AWS-native and cloud-scale systems.",
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
