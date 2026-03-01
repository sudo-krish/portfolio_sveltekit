import type { Company } from '$lib/types/portfolio';

export const companies: Company[] = [
    {
        name: "DTDC Express Limited",
        url: "https://www.dtdc.in/",
        position: "Data Engineer",
        duration: "Dec 2024 - Present",
        startDate: "2024-12-01",
        current: true,
        description: "Leading end-to-end data engineering initiatives for one of India's largest logistics companies, delivering real-time data access, centralized reporting, and AI-driven insights.",
        responsibilities: [
            "Architected high-throughput event-driven streaming pipeline processing 50M+ tracking events daily",
            "Reduced data latency by 99% (from 3 hours to seconds) replacing legacy batch system",
            "Enabled real-time shipment visibility improving SLA compliance and customer experience",
            "Designed unified data warehouse as single source of truth for Finance and Business analytics",
            "Reduced manual reporting effort by 80% with automated ETL/ELT workflows",
            "Improved data consistency, accuracy, and trust in enterprise metrics",
            "Built AI-ready analytics platform with vector search and natural language querying (NLQ)",
            "Reduced time-to-insight by 70% enabling self-service analytics without SQL",
            "Implemented GraphQL data layer for contextual retrieval and semantic search",
            "Accelerated GenAI, NLQ, and advanced analytics adoption across teams",
            "Tech Stack: Kafka, Python, Airflow, DBT, Distributed SQL, Vector Databases, GraphQL, Containers, Observability"
        ],
        technologies: [
            "Apache Kafka", "Python", "Apache Airflow", "DBT",
            "Distributed SQL", "Vector Databases", "GraphQL",
            "Docker", "Kubernetes", "Data Lineage Tools",
            "Real-Time Streaming", "Event-Driven Architecture"
        ]
    },
    {
        name: "Quantiphi Analytics Solutions",
        url: "https://www.quantiphi.com/",
        position: "Senior Data Engineer",
        duration: "Feb 2024 - Nov 2024",
        startDate: "2024-02-01",
        endDate: "2024-11-30",
        current: false,
        description: "Designed and implemented high-performance real-time and batch data pipelines enabling low-latency insights and AI-ready data platforms.",
        responsibilities: [
            "Built real-time streaming pipelines from RDS to Redshift using DMS, Lambda, Kinesis, and SQS",
            "Processed 50M+ daily events reducing latency from hours to seconds",
            "Developed batch ETL/ELT pipelines with AWS Glue, Lambda, and EMR",
            "Implemented SCD Type 2 for data lineage in S3 data lakes",
            "Created base tables and implemented Medallion architecture for ticketing analytics",
            "Optimized S3 data lakes following data mesh principles",
            "Integrated multi-tenant ticketing APIs handling JSON partitioning and rate limits",
            "Delivered 20+ KPI and financial reports in Redshift",
            "Improved report accuracy from 60% to 98% through query optimization",
            "Built automated validation pipelines using Python, Glue, Lambda, and SNS",
            "Implemented CI/CD pipeline with CodeCommit, CodeBuild, and CloudFormation",
            "Improved deployment efficiency by 20% through automation"
        ],
        technologies: [
            "AWS Glue", "AWS Lambda", "AWS EMR", "Amazon Redshift",
            "AWS RDS (Aurora PostgreSQL)", "DynamoDB", "Amazon S3",
            "AWS Kinesis", "AWS SQS", "AWS DMS", "AWS Step Functions",
            "Python", "PySpark", "Medallion Architecture", "Data Mesh",
            "CI/CD", "CloudFormation"
        ]
    },
    {
        name: "Cognizant Technology Solutions",
        url: "https://www.cognizant.com/",
        position: "Associate (promoted from Program Analyst)",
        duration: "Aug 2020 - Feb 2024",
        startDate: "2020-08-01",
        endDate: "2024-02-28",
        current: false,
        description: "Progressed through three roles delivering large-scale data solutions with Hadoop, Informatica, Python, and cloud technologies.",
        responsibilities: [
            "Designed and built medallion architecture on Amazon Redshift",
            "Created multi-tenant architecture integrating SAP, S3, Oracle, flat files, and Salesforce",
            "Built and optimized materialized views as per business logic",
            "Collaborated with QlikView specialists for report generation",
            "Implemented data governance using masking and encryption",
            "Developed monitoring shell scripts for Hadoop cluster, EMR, and Linux servers",
            "Designed near real-time and real-time data pipelines",
            "Automated data ingestion processes improving efficiency by 25%",
            "Implemented SCD Type 1 and Type 2 in data warehousing",
            "Enhanced big data load and refresh performance by 20%",
            "Automated repetitive tasks increasing team efficiency by 40%",
            "Managed deployments and provided hypercare support",
            "Created ETL mappings in Informatica PowerCenter",
            "Worked with Hive and Hadoop Sqoop export scripts"
        ],
        roles: [
            {
                title: "Associate",
                duration: "Oct 2022 - Feb 2024",
                description: "Led data solutions development and warehouse optimization"
            },
            {
                title: "Program Analyst",
                duration: "Aug 2021 - Oct 2022",
                description: "Created automation scripts and deployed ETL workflows"
            },
            {
                title: "Programmer Analyst Trainee",
                duration: "Aug 2020 - Aug 2021",
                description: "Developed ETL mappings and maintained SQL queries"
            }
        ],
        technologies: [
            "Amazon Redshift", "AWS EMR", "Hadoop", "Hive",
            "Informatica PowerCenter", "Python", "Shell Scripting",
            "QlikView", "PostgreSQL", "Oracle", "Salesforce",
            "Autosys", "Sqoop"
        ]
    }
];
