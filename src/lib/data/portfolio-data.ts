// src/lib/data/portfolio-data.ts
import type { PortfolioData } from '$lib/types/portfolio';
import { getGitHubProjectsCached } from '$lib/services/github';

export const portfolioData: PortfolioData = {
  personal: {
    name: "Krishnanand Anil",
    jobTitle: "Senior Data Engineer | AWS | Kafka | Spark | Real-Time Data Platforms",
    bio: "Senior Data Engineer with 5+ years building AWS, Kafka, Spark, and warehouse pipelines. I design and build production-grade data platforms using AWS, Kafka, Spark, Airflow, and modern warehousing patterns. My work spans real-time pipelines, CDC architectures, warehouse refresh systems, cloud migrations, and scalable analytics foundations that support faster reporting, better reliability, and stronger engineering operations.",
    shortBio: "Senior Data Engineer with 5+ years building AWS, Kafka, Spark, and warehouse pipelines. Explore projects, articles, learning resources, and production-scale data systems.",
    email: "krishnanandpanil@gmail.com",
    phone: "8281974055",
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
      "AWS (Glue, EMR, Lambda, Redshift, Kinesis)", "AWS Lake Formation", "AWS DMS",
      "Amazon S3", "AWS RDS", "DynamoDB", "AWS Step Functions",
      "CloudWatch", "IAM", "KMS", "CodeCommit", "CodeBuild", "CloudFormation",

      // Data Engineering & Streaming
      "Apache Kafka", "Debezium", "CDC (Change Data Capture)",
      "Apache Spark", "PySpark Streaming", "TiDB", "dbt (Data Build Tool)",
      "Apache Airflow", "Informatica PowerCenter", "Medallion Lakehouse",
      "Data Vault 2.0", "Medallion Architecture", "Dimensional Modeling",

      // Programming & Scripting
      "Python", "Go (distributed systems)", "SQL (Advanced)", "PL/SQL",
      "Shell/Bash Scripting", "Boto3",

      // Databases & Storage
      "PostgreSQL", "Aurora PostgreSQL", "MySQL", "Hive", "Hadoop", "Sqoop",
      "Parquet", "S3 Data Lake", "Delta Lake", "Apache Iceberg", "Snowflake", "Databricks",

      // Specialized & AI Integration
      "Vector Embeddings (Conceptual)", "Euclidian & Cosine Distance",
      "Natural Language Querying (NLQ)", "RAG Foundations", "LLM Data Pipelines",

      // DevOps & Orchestration
      "Docker", "Kubernetes (K8s)", "Terraform (IaC)", "Autosys", "CI/CD Protocols",

      // Data Governance & Quality
      "Soda (Data Quality)", "Great Expectations", "Data Lineage",
      "Observability-First Monitoring", "Data Masking & Governance",

      // Analytics & Visualization
      "QlikView", "Tableau", "Power BI", "Data Profiling", "Dimensional Modeling"
    ],
    topSkills: [
      "Real-time data pipelines using Kafka, CDC patterns, and event-driven ingestion",
      "Batch and near real-time ETL/ELT using Spark, Airflow, and AWS cloud services",
      "Data warehousing and query performance using Redshift and analytics-ready models",
      "Data lake and medallion architectures for scalable storage and processing",
      "Cloud migrations, reliability improvements, and platform standardization",
      "AWS Certified Solutions Architect – Associate",
      "AWS Certified Cloud Practitioner",
      "AI-ready data foundations with vector search and semantic retrieval"
    ],
    yearsOfExperience: 5,
    achievements: [
      "Architected real-time CDC pipelines → 50M tracking events/DAY, 99% latency cut (3hr to real-time)",
      "Unified enterprise data warehouse → 80% reduction in manual reporting for Finance/BI",
      "Built AI analytics platform w/ vector search + NLQ → 70% faster business insights",
      "Redshift streaming (4M events/day) via DMS/Lambda/Kinesis → sub-5min reporting SLAs",
      "M.Tech Data Science (BITS Pilani) candidate with strong research background",
      "Achieved 20% efficiency improvement through production CI/CD automation",
      "Improved query performance by 40% through Redshift/TiDB optimization",
      "Developed self-serve data marts enabling 200+ users without SQL"
    ]
  },

  companies: [
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
  ],

  education: [
    {
      university: "Birla Institute of Technology and Science, Pilani",
      url: "https://www.bits-pilani.ac.in/",
      degree: "Master of Technology (M.Tech)",
      field: "Data Science & Engineering",
      graduationYear: "2024",
      location: "Bengaluru/Pilani, India",
      gpa: ""
    },
    {
      university: "Amrita Vishwa Vidyapeetham",
      url: "https://www.amrita.edu/",
      degree: "Bachelor of Engineering (B.E.)",
      field: "Mechanical Engineering",
      graduationYear: "2020",
      location: "Kollam, Kerala, India",
      gpa: "7.5/10.0"
    }
  ],

  certifications: [
    {
      name: "AWS Certified Solutions Architect – Associate",
      category: "Cloud",
      url: "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
      issuer: "Amazon Web Services",
      dateIssued: "2023"
    },
    {
      name: "AWS Certified Cloud Practitioner",
      category: "Cloud",
      url: "https://aws.amazon.com/certification/certified-cloud-practitioner/",
      issuer: "Amazon Web Services",
      dateIssued: "2022"
    },
    {
      name: "Fundamentals of the Databricks Lakehouse Platform Accreditation (V2)",
      category: "Big Data",
      url: "https://www.databricks.com/learn/certification",
      issuer: "Databricks",
      dateIssued: "2024"
    },
    {
      name: "Spark and Python for Big Data with PySpark",
      category: "Big Data",
      url: "https://www.udemy.com/",
      issuer: "Udemy",
      dateIssued: "2022"
    }
  ],

  researchPapers: [
    {
      id: "scara-robotic-arm",
      title: "Design and Control of an Automated SCARA Robotic Arm with a Pneumatic Soft Gripper",
      journal: "IOP Journal of Physics: Conference Series",
      url: "https://iopscience.iop.org/article/10.1088/1742-6596/2070/1/012207",
      datePublished: "2021-12-01",
      authors: ["Krishnanand Anil", "Co-authors"],
      abstract: "Research on automated SCARA robotic arm design and control systems with pneumatic soft gripper technology.",
      keywords: ["Robotics", "SCARA", "Automation", "Pneumatic Systems"]
    },
    {
      id: "vehicular-emissions",
      title: "Estimation of Vehicular Emissions of Major Districts in Kerala",
      journal: "International Journal of Psychosocial Rehabilitation",
      url: "https://www.psychosocial.com/article/PR201924/19539/",
      datePublished: "2020-04-13",
      authors: ["Krishnanand Anil", "Co-authors"],
      abstract: "Comprehensive study on vehicular emissions across major districts in Kerala, India.",
      keywords: ["Environmental Science", "Emissions", "Transportation", "Kerala"]
    }
  ],

  projects: [
    {
      id: "realtime-tracking-platform",
      name: "Real-Time Tracking Data Platform",
      description: "Event-driven CDC pipeline processing 50M+ tracking events daily",
      longDescription: "Architected a high-throughput, mission-critical real-time data platform using Kafka, Debezium, and TiDB. Replaced legacy batch systems with a streaming architecture, achieving a 99% latency reduction (3 hours to real-time). Orchestrated using Docker and Kubernetes, ensuring sub-5min shipment visibility for enterprise logistics.",
      repository: "https://github.com/sudo-krish",
      languages: ["Python", "SQL", "Go"],
      platforms: ["Apache Kafka", "Debezium", "TiDB", "Docker", "Kubernetes"],
      technologies: ["CDC", "Event-Driven Architecture", "Stream Processing", "Observability"],
      dateCreated: "2024-12-01T00:00:00Z",
      keywords: ["Real-Time", "CDC", "Kafka", "50M Events", "Logistics", "Production"],
      featured: true,
      image: "/projects/realtime-tracking.jpg",
      metrics: {
        eventsPerDay: "50M+",
        latencyReduction: "99%",
        visibility: "Sub-5min"
      }
    },
    {
      id: "enterprise-data-warehouse",
      name: "Unified Enterprise Data Warehouse",
      description: "Single source of truth for Finance & BI with 80% reporting automation",
      longDescription: "Designed and delivered a unified enterprise data warehouse that centralizes Finance and Business analytics. Automated complex ETL/ELT workflows using dbt and Airflow, reducing manual reporting effort by 80% and establishing 100% SLA compliance for mission-critical metrics.",
      repository: "",
      languages: ["SQL", "Python", "PySpark"],
      platforms: ["Amazon Redshift", "AWS Glue", "DBT", "Apache Airflow"],
      technologies: ["Dimensional Modeling", "ETL/ELT", "Data Quality", "Automation"],
      dateCreated: "2024-12-15T00:00:00Z",
      keywords: ["Data Warehouse", "Redshift", "dbt", "Automation", "Finance Analytics"],
      featured: true,
      image: "/projects/enterprise-warehouse.jpg",
      metrics: {
        automation: "80%",
        accuracy: "98%",
        sla: "100%"
      }
    },
    {
      id: "ai-analytics-platform",
      name: "AI-Ready Analytics Platform",
      description: "Vector search & NLQ platform driving 70% faster business insights",
      longDescription: "Engineered an AI-ready data foundation for GenAI and advanced analytics. Built pipelines for vector search and Natural Language Querying (NLQ), reducing time-to-insight by 70% and enabling self-service discovery for non-technical business users.",
      repository: "",
      languages: ["Python", "GraphQL"],
      platforms: ["Vector Database", "AWS Lambda", "Amazon S3", "GraphQL"],
      technologies: ["Semantic Search", "NLQ", "GenAI Foundations", "API Design"],
      dateCreated: "2025-01-10T00:00:00Z",
      keywords: ["AI", "Vector Search", "NLQ", "GraphQL", "ProductAnalytics"],
      featured: true,
      image: "/projects/ai-analytics.jpg",
      metrics: {
        insightBoost: "70%",
        accuracy: "98%",
        selfService: "No SQL required"
      }
    },
    {
      id: "realtime-cdc-pipeline",
      name: "Real-Time CDC Pipeline with Kafka & Debezium",
      description: "Production CDC pipeline using Kafka, Debezium, and custom Python consumers",
      longDescription: "Built an industry-rare real-time Change Data Capture pipeline handling database changes with sub-second latency. Processes 100K+ events per minute with custom Python consumers and on-the-fly transformations.",
      repository: "",
      languages: ["Python", "SQL", "Go"],
      platforms: ["Apache Kafka", "Debezium", "PostgreSQL", "Amazon S3"],
      technologies: ["CDC", "Real-Time Processing", "Docker", "Kubernetes"],
      dateCreated: "2024-03-15T00:00:00Z",
      keywords: ["CDC", "Kafka", "Debezium", "Real-Time", "Python", "Production"],
      featured: true,
      image: "/projects/cdc-pipeline.jpg"
    },
    {
      id: "medallion-data-lake",
      name: "Multi-Zone Data Lake Architecture",
      description: "Scalable data lake with bronze, silver, and gold zones on S3",
      longDescription: "Implemented production-grade data lake following medallion architecture and data mesh principles. Processes 5TB+ monthly with automated data quality checks and lineage tracking.",
      repository: "",
      languages: ["Python", "PySpark", "SQL"],
      platforms: ["Amazon S3", "AWS Glue", "Amazon Athena", "AWS EMR"],
      technologies: ["Medallion Architecture", "Delta Lake", "Data Mesh", "Terraform"],
      dateCreated: "2024-02-20T00:00:00Z",
      keywords: ["Data Lake", "Medallion", "S3", "Data Mesh", "Big Data"],
      featured: false,
      image: "/projects/data-lake.jpg"
    }
  ],

  blogPosts: [
    {
      id: "realtime-cdc-patterns",
      slug: "real-time-cdc-patterns-kafka-debezium",
      title: "Building Production-Grade Real-Time CDC Pipelines with Kafka and Debezium",
      description: "Architecture patterns and lessons learned from processing 50M+ events daily",
      url: "https://krishnanandanil.com/blog/real-time-cdc-patterns-kafka-debezium",
      datePublished: "2025-10-01T10:00:00Z",
      author: "Krishnanand Anil",
      authorUrl: "https://krishnanandanil.com",
      keywords: ["CDC", "Kafka", "Debezium", "Real-Time", "Event Streaming", "Production"],
      category: "Data Engineering",
      readTime: "15 min read",
      featured: true,
      image: "/blog/cdc-patterns.jpg"
    },
    {
      id: "spark-optimization-guide",
      slug: "optimizing-apache-spark-performance",
      title: "Optimizing Apache Spark Jobs for Production Workloads",
      description: "A comprehensive guide to tuning Spark configurations for 40% performance improvement",
      url: "https://krishnanandanil.com/blog/optimizing-apache-spark-performance",
      datePublished: "2025-09-15T10:00:00Z",
      author: "Krishnanand Anil",
      authorUrl: "https://krishnanandanil.com",
      keywords: ["Apache Spark", "Performance Tuning", "Big Data", "PySpark", "Optimization"],
      category: "Big Data",
      readTime: "12 min read",
      featured: true,
      image: "/blog/spark-optimization.jpg"
    },
    {
      id: "redshift-best-practices",
      slug: "amazon-redshift-optimization-guide",
      title: "Amazon Redshift Best Practices: From 60% to 98% Query Accuracy",
      description: "Essential optimization techniques and validation strategies for Redshift",
      url: "https://krishnanandanil.com/blog/amazon-redshift-optimization-guide",
      datePublished: "2025-08-20T10:00:00Z",
      author: "Krishnanand Anil",
      authorUrl: "https://krishnanandanil.com",
      keywords: ["Amazon Redshift", "AWS", "Data Warehouse", "Query Optimization", "Best Practices"],
      category: "Cloud Data Engineering",
      readTime: "10 min read",
      featured: true,
      image: "/blog/redshift-best-practices.jpg"
    },
    {
      id: "vector-db-analytics",
      slug: "vector-databases-ai-analytics",
      title: "Building AI-Ready Analytics with Vector Databases and GraphQL",
      description: "How to enable natural language querying and semantic search at scale",
      url: "https://krishnanandanil.com/blog/vector-databases-ai-analytics",
      datePublished: "2025-07-25T10:00:00Z",
      author: "Krishnanand Anil",
      authorUrl: "https://krishnanandanil.com",
      keywords: ["Vector Databases", "AI Analytics", "NLQ", "GraphQL", "Semantic Search", "GenAI"],
      category: "AI & Data Engineering",
      readTime: "14 min read",
      featured: false,
      image: "/blog/vector-analytics.jpg"
    }
  ]
};

// Helper functions remain the same
export const getPersonalInfo = () => portfolioData.personal;
export const getCurrentCompany = () => portfolioData.companies.find(c => c.current);
export const getAllCompanies = () => portfolioData.companies;
export const getEducation = () => portfolioData.education;
export const getCertifications = () => portfolioData.certifications;
export const getResearchPapers = () => portfolioData.researchPapers || [];
export const getFeaturedProjects = () => portfolioData.projects.filter(p => p.featured);
export const getAllProjects = () => portfolioData.projects;
export const getProjectById = (id: string) => portfolioData.projects.find(p => p.id === id);
export const getFeaturedBlogPosts = () => portfolioData.blogPosts.filter(b => b.featured);
export const getAllBlogPosts = () => portfolioData.blogPosts;
export const getBlogPostBySlug = (slug: string) => portfolioData.blogPosts.find(b => b.slug === slug);
export async function getAllProjectsWithGitHub() {
  try {
    const githubProjects = await getGitHubProjectsCached();

    // Combine manual projects with GitHub projects
    // Manual projects come first (higher priority)
    return [...githubProjects];
  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    // Return only manual projects if GitHub fetch fails
    return portfolioData.projects;
  }
}

export async function getFeaturedProjectsWithGitHub() {
  try {
    const allProjects = await getAllProjectsWithGitHub();
    return allProjects.filter(p => p.featured);
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    return portfolioData.projects.filter(p => p.featured);
  }
}