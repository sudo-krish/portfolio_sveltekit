import type { PersonalInfo } from '$lib/types/portfolio';

export const personal: PersonalInfo = {
    name: "Krishnanand Anil",
    jobTitle: "Senior Data Engineer | AWS Cloud Expert | Real-Time Data Specialist",
    bio: "Senior Data Engineer with 5+ years of experience specializing in real-time data pipelines, AWS Cloud services, and enterprise-grade data solutions. Currently leading data engineering initiatives at DTDC Express Limited, architecting systems that process 50M+ events daily. Expert in building scalable CDC pipelines, data warehouses with sub-second query performance, and AI-ready analytics platforms. Proven track record of improving data accuracy from 60% to 98%, reducing latency by 99%, and cutting manual reporting efforts by 80%. Passionate about solving complex data challenges with Kafka, Python, Airflow, DBT, and modern cloud technologies.",
    shortBio: "Real-Time Data Architect | AWS & Kafka Expert | Built Systems Processing 50M+ Events/Day | 5+ Years",
    email: "krishnanandpanil@gmail.com",
    phone: "+91-XXXXXXXXXX",
    website: "https://krishnanandanil.com",
    profileImage: "/profile.jpg",
    resumeUrl: "https://drive.google.com/file/d/1lkamX2hfp25wsLecHgEStbYD7-1ZEMwv/view?usp=drive_link",
    address: {
        city: "Bengaluru",
        state: "Karnataka",
        country: "India"
    },
    socialLinks: {
        linkedin: "https://www.linkedin.com/in/krishnanand-anil/",
        github: "https://github.com/sudo-krish",
        instagram: "https://www.instagram.com/krish12397/"
    },
    skills: [
        // Cloud & Infrastructure
        "AWS Lambda", "AWS Glue", "AWS EMR", "AWS Kinesis", "AWS DMS",
        "Amazon Redshift", "Amazon S3", "AWS RDS", "DynamoDB",
        "AWS Step Functions", "AWS CloudWatch", "AWS SNS", "AWS IAM", "AWS KMS",
        "AWS CodeCommit", "AWS CodeBuild", "CloudFormation",

        // Data Engineering
        "Apache Kafka", "Debezium", "CDC (Change Data Capture)",
        "Apache Airflow", "Apache Spark", "PySpark",
        "dbt (Data Build Tool)", "Informatica PowerCenter",
        "Real-Time Data Pipelines", "Batch ETL/ELT",
        "Data Lake Architecture", "Medallion Architecture",
        "Data Mesh Principles", "Data Warehousing",
        "SCD Type 1 & Type 2",

        // Programming & Scripting
        "Python", "Go", "SQL", "PL/SQL",
        "Pandas", "NumPy", "Boto3", "Python Logger",
        "Shell Scripting", "Bash Scripting",

        // Databases
        "PostgreSQL", "Aurora PostgreSQL", "MySQL", "MongoDB", "Redis",
        "Hive", "Parquet", "JSON",

        // Data Tools & Platforms
        "Vector Databases", "GraphQL APIs",
        "Natural Language Querying (NLQ)", "Semantic Search",
        "QlikView", "Tableau", "Power BI",

        // DevOps & Orchestration
        "Docker", "Kubernetes", "Terraform",
        "CI/CD Pipelines", "Autosys",

        // Data Governance & Quality
        "Data Quality Assurance", "Data Validation",
        "Data Masking", "Data Encryption",
        "Data Lineage", "Data Governance",

        // Big Data
        "Big Data Processing", "Hadoop", "Sqoop",
        "Real-Time Streaming", "Event-Driven Architecture",

        // Integration & APIs
        "API Integration", "REST APIs", "Webhooks",
        "Multi-Tenant Architecture", "Rate Limiting"
    ],
    topSkills: [
        "Real-Time CDC Pipelines (50M+ events/day)",
        "Apache Kafka & Debezium",
        "AWS Cloud Architecture",
        "Amazon Redshift Optimization",
        "Python & Go Development",
        "Data Warehouse Design",
        "Vector Databases & AI Analytics",
        "Kubernetes & Docker"
    ],
    yearsOfExperience: 5,
    achievements: [
        "Reduced data latency by 99% (3 hours → seconds) with real-time CDC pipelines",
        "Improved report accuracy from 60% to 98% through advanced validation",
        "Cut manual reporting effort by 80% with automated ETL workflows",
        "Reduced time-to-insight by 70% with AI-ready analytics platform",
        "Built systems processing 50M+ tracking events daily",
        "Achieved 20% efficiency improvement through CI/CD automation",
        "Improved query performance by 40% through optimization",
        "Led cross-functional teams delivering enterprise-grade data solutions"
    ]
};
