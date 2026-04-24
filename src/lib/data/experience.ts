// src/lib/data/experience.ts
import type { SectionContent } from "$lib/types/section";

export const experienceData = {
    leftAnchor: {
        label: "CAREER JOURNEY",
        title: "Data\nEngineering.",
        description: "5+ years building data systems across enterprise and consulting environments."
    },
    header: {
        badge: "Career Journey in Data Engineering",
    },
    content: {
        shortDescription: `I have spent 5+ years building data systems across <strong class="text-foreground font-medium">enterprise and consulting environments</strong>, with experience spanning operational data movement, cloud data platforms, <span class="text-primary font-medium tracking-wide">real-time processing, and analytics engineering</span>.`,

        detailedPhilosophy: `My work across Cognizant, Quantiphi, and DTDC reflects increasing ownership over architecture, performance, and delivery. From building foundational ETL systems on Hadoop and Informatica, I progressed to cloud data warehousing with AWS Glue, EMR, and Redshift. At Quantiphi, I architected near real-time streaming pipelines with Kinesis, Lambda, and DMS. Today at DTDC, I build open-source real-time streaming platforms using Kafka, Debezium, and Spark Streaming — focused on production reliability and scalable analytics.`
    },
    milestones: [
        { year: "2020", label: "Program Analyst", role: "Cognizant: Built engineering foundations across enterprise data workflows and delivery environments.", iconName: "Terminal", color: "hsl(var(--foreground))" },
        { year: "2022", label: "Associate", role: "Cognizant: AWS Cloud Warehousing with Glue, EMR, and Redshift.", iconName: "Cloud", color: "hsl(var(--foreground))" },
        { year: "2024", label: "Senior Data Eng", role: "Quantiphi: Expanded into cloud data engineering, scalable pipelines, and analytics architecture.", iconName: "Zap", color: "hsl(var(--foreground))" },
        { year: "2025", label: "Data Engineer", role: "DTDC: Focused on real-time streaming, CDC, warehouse refresh, and production-scale data operations.", iconName: "Sparkles", color: "hsl(var(--foreground))" }
    ],
    ui: {
        carousel: {
            sectionTitle: "Experience",
            sectionDescription: "View my career journey",
            accentColor: "hsl(var(--primary))" // Blue
        },
        cta: {
            label: "Read Full Experience Timeline",
            href: "experience"
        }
    }
};

export const experienceSectionContent: SectionContent = {
    id: "experience",
    slug: "/experience",
    seoTitle: "Experience | Senior Data Engineer Career Journey",
    seoDescription: "Explore the professional experience of Krishnanand Anil across Cognizant, Quantiphi, and DTDC, with focus on data engineering, AWS, streaming, and warehousing.",
    seoKeywords: [
        "senior data engineer experience", "aws data engineer career", "real-time data pipelines",
        "kafka data engineer", "redshift optimization", "data platform engineer",
        "senior data engineer bengaluru", "data engineering career journey", "cloud data infrastructure",
    ],
    headline: "Experience in Data Engineering",
    subHeadline: "Cloud, Streaming, and Scalable Data Systems",
    introParagraph: "I have spent 5+ years building data systems across enterprise and consulting environments, with experience spanning operational data movement, cloud data platforms, real-time processing, and analytics engineering. My work across Cognizant, Quantiphi, and DTDC reflects increasing ownership over architecture, performance, and delivery.",
    paragraphs: [
        `As a Senior Data Engineer, I specialize in designing and deploying production-grade data pipelines that power <a href="/projects" class="text-primary hover:underline font-medium transition-colors">real-time analytics solutions and cloud data projects</a>. My work spans the full data engineering lifecycle — from ingestion and transformation to warehousing, governance, and visualization. You can <a href="/about" class="text-primary hover:underline font-medium transition-colors">explore my interactive background</a> to learn more about my technical journey.`,
        `I have consistently delivered measurable impact: reducing data latency from hours to seconds, improving report accuracy from 60% to 98%, and cutting manual reporting effort by 80% through intelligent automation. These achievements reflect not just technical skill, but a deep understanding of how data engineering drives business outcomes, which I frequently discuss in my <a href="/articles" class="text-primary hover:underline font-medium transition-colors">architecture articles and technical notes</a>.`,
        `Currently based in <a href="/" class="text-primary hover:underline font-medium transition-colors">Bengaluru, India</a>, I lead data engineering initiatives at DTDC Express Limited, one of India's largest logistics companies, where I architect systems that provide real-time shipment visibility, unified financial reporting, and AI-ready analytics capabilities across the enterprise.`,
    ],
    highlights: [
        { label: "Years of Experience", value: "5+", description: "Across enterprise data engineering roles" },
        { label: "Events Processed Daily", value: "50M+", description: "Real-time streaming pipeline throughput" },
        { label: "Latency Improvement", value: "hrs→sec", description: "From hours to sub-second delivery" },
        { label: "Companies Served", value: "3", description: "DTDC, Quantiphi, Cognizant" },
    ],
    ctaLabel: "Read Full Experience Timeline",
    ctaSlug: "/experience",
    detailSections: [
        {
            title: "DTDC Express Limited — Data Engineer (Dec 2024 – Present)",
            content: "Focused on real-time streaming, CDC, warehouse refresh, and production-scale data operations for one of India's largest logistics companies.",
            bullets: [
                "Architected high-throughput event-driven streaming pipeline processing 50M+ tracking events daily",
                "Reduced data latency from hours to seconds replacing legacy batch system",
                "Enabled real-time shipment visibility improving SLA compliance and customer experience",
                "Designed unified data warehouse as single source of truth for Finance and Business analytics",
                "Reduced manual reporting effort by 80% with automated ETL/ELT workflows",
                "Built AI-ready analytics platform with vector search and natural language querying (NLQ)",
                "Tech Stack: Kafka, Debezium, TiDB, Docker, K8s, Python, Airflow, dbt",
            ],
        },
        {
            title: "Quantiphi Analytics Solutions — Senior Data Engineer (Feb 2024 – Nov 2024)",
            content: "Expanded into cloud data engineering, scalable pipelines, and analytics architecture.",
            bullets: [
                "Built real-time streaming pipelines from RDS to Redshift using DMS, Lambda, Kinesis, and SQS",
                "Designed near real-time warehouse refresh patterns for faster reporting and operational visibility",
                "Developed batch ETL/ELT pipelines with AWS Glue, Lambda, and EMR",
                "Implemented SCD Type 2 for data lineage in S3 data lakes",
                "Improved report accuracy from 60% to 98% through query optimization and validation",
                "Tech Stack: AWS Glue, Lambda, EMR, Redshift, Kinesis, DMS, Step Functions",
            ],
        },
        {
            title: "Cognizant Technology Solutions — Associate / Program Analyst (Aug 2020 – Feb 2024)",
            content: "Built engineering foundations across enterprise data workflows and delivery environments.",
            bullets: [
                "Designed and built medallion architecture on Amazon Redshift",
                "Created multi-tenant architecture integrating SAP, S3, Oracle, flat files, and Salesforce",
                "Developed monitoring shell scripts for Hadoop cluster, EMR, and Linux servers",
                "Implemented SCD Type 1 and Type 2 in data warehousing",
                "Tech Stack: Redshift, EMR, Hadoop, Informatica, Python, Shell, PostgreSQL",
            ],
        },
    ],
};

export const companies = [
    {
      name: "DTDC Express Limited",
      url: "https://www.dtdc.in/",
      position: "Senior Data Engineer",
      duration: "Dec 2024 - Present",
      startDate: "2024-12-01",
      current: true,
      description: "Leading end-to-end data engineering initiatives for one of India's largest logistics companies, architecting high-scale event-driven systems.",
      responsibilities: [
        "Architected real-time CDC pipelines (Kafka + Debezium + TiDB + Docker/K8s) → 50M tracking events/DAY",
        "Achieved 99% latency reduction (3hr batch to streaming) enabling real-time shipment visibility",
        "Unified enterprise data warehouse as single source of truth → 80% reporting automation for Finance/BI",
        "Built AI-ready analytics platform (vector search + natural language query) → 70% faster insight generation",
        "Delivered shipment visibility platform with sub-5min SLAs and 20% operational efficiency gain",
        "Led code reviews, architecture design, and technical specifications for enterprise interfaces",
        "Developed data profiling and quality frameworks across 100+ source entities",
        "Orchestrated deployments using Docker/K8s and automated CI/CD protocols",
        "Tech Stack: Kafka, Debezium, TiDB, Docker, K8s, Python, Airflow, DBT, GraphQL, Observability"
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
      position: "Sr Data Engineer",
      duration: "Feb 2024 - Nov 2024",
      startDate: "2024-02-01",
      endDate: "2024-11-30",
      current: false,
      description: "Senior Data Engineer specializing in enterprise cloud migration and real-time analytics for large-scale platforms.",
      responsibilities: [
        "Scaled near-real-time reporting platform → 4M events/day, sub-5min dashboards for 100s of users",
        "Built RDS→Redshift streaming pipelines (DMS + Lambda + Kinesis + SQS) → hours to seconds latency",
        "Developed large-scale batch ETL/ELT (AWS Glue + Lambda + EMR) with SCD Type 2 historical tracking",
        "Integrated multi-tenant ticketing APIs (API + S3 + Postgres) → 30% faster processing",
        "Architected Medallion lakehouse patterns optimized for analytics scale",
        "Established comprehensive data lineage and observability frameworks",
        "Improved deployment efficiency via automated CloudFormation and CI/CD pipelines",
        "Tech Stack: AWS Glue, Lambda, EMR, Redshift, Kinesis, DMS, Step Functions, CloudFormation"
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
      position: "Associate (Data Engineer)",
      duration: "Aug 2020 - Feb 2024",
      startDate: "2020-08-01",
      endDate: "2024-02-28",
      current: false,
      description: "Associate Data Engineer delivering enterprise data platforms and big data warehousing solutions.",
      responsibilities: [
        "Built Medallion architecture on Amazon Redshift (PySpark) → enterprise-grade data warehousing",
        "Created multi-tenant ETL pipelines (SAP/S3/Oracle/Salesforce/flat files) → automated enterprise sync",
        "Designed real-time and near-real-time pipelines → 30% processing time reduction",
        "Architected and optimized materialized views for complex business logic",
        "Created multiple bash scripts for automation and production issue analysis",
        "Developed ETL workflows in Informatica PowerCenter and orchestrated via Autosys",
        "Maintained Hive and Hadoop Sqoop export scripts for legacy data movement",
        "Automated repetitive tasks increasing team efficiency by 40%"
      ],
      roles: [
        {
          title: "Associate",
          duration: "Oct 2022 - Feb 2024",
          description: "Led enterprise data platform delivery and warehouse optimization"
        },
        {
          title: "Program Analyst",
          duration: "Aug 2021 - Oct 2022",
          description: "Created automation scripts and deployed ETL workflows in Informatica"
        },
        {
          title: "Programmer Analyst Trainee",
          duration: "Aug 2020 - Aug 2021",
          description: "Developed ETL mappings and maintained Hive/Hadoop Sqoop scripts"
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

export const getCurrentCompany = () => companies.find(c => c.current);
export const getAllCompanies = () => companies;

