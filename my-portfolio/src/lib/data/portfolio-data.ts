// src/lib/data/portfolio-data.ts
import type { PortfolioData } from '$lib/types/portfolio';
import { getGitHubProjectsCached } from '$lib/services/github'; 

export const portfolioData: PortfolioData = {
  personal: {
    name: "Krishnanand Anil",
    jobTitle: "Senior Data Engineer | AWS Cloud Expert | Real-Time Data Specialist",
    bio: "Senior Data Engineer with 5+ years of experience specializing in real-time data pipelines, AWS Cloud services, and enterprise-grade data solutions. Currently leading data engineering initiatives at DTDC Express Limited, architecting systems that process 50M+ events daily. Expert in building scalable CDC pipelines, data warehouses with sub-second query performance, and AI-ready analytics platforms. Proven track record of improving data accuracy from 60% to 98%, reducing latency by 99%, and cutting manual reporting efforts by 80%. Passionate about solving complex data challenges with Kafka, Python, Airflow, DBT, and modern cloud technologies.",
    shortBio: "Real-Time Data Architect | AWS & Kafka Expert | Built Systems Processing 50M+ Events/Day | 5+ Years",
    email: "krishnanandpanil@gmail.com",
    phone: "+91-XXXXXXXXXX",
    website: "https://krishnanandanil.com",
    profileImage: "/profile.jpg",
    resumeUrl: "https://drive.google.com/file/d/1-HcNEDahb4LZHz2QR1g_hNq4_Pk3mkVw/view?usp=drive_link",
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
  },

  companies: [
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
  ],

  education: [
    {
      university: "Birla Institute of Technology",
      url: "https://www.bitmesra.ac.in/",
      degree: "Bachelor of Technology (B.Tech)",
      field: "Computer Science and Engineering",
      graduationYear: "2019",
      location: "Mesra, Jharkhand, India",
      gpa: "7.5/10.0"
    }
  ],

  certifications: [
    {
      name: "AWS Certified Solutions Architect - Associate",
      category: "Cloud Architecture",
      url: "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
      issuer: "Amazon Web Services (AWS)",
      dateIssued: "2023",
      credentialId: "AWS-XXXX-XXXX"
    },
    {
      name: "AWS Cloud Practitioner",
      category: "Cloud Fundamentals",
      url: "https://aws.amazon.com/certification/certified-cloud-practitioner/",
      issuer: "Amazon Web Services (AWS)",
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
      description: "Event-driven streaming pipeline processing 50M+ tracking events daily",
      longDescription: "Architected a high-throughput, mission-critical real-time data platform that replaced legacy batch systems. Handles 50M+ tracking events per day with sub-second latency, providing real-time shipment visibility to operations teams, improving SLA compliance and customer satisfaction.",
      repository: "",
      languages: ["Python", "SQL"],
      platforms: ["Apache Kafka", "AWS Lambda", "Amazon Kinesis", "Amazon S3"],
      technologies: ["Event-Driven Architecture", "Stream Processing", "Docker", "Kubernetes"],
      dateCreated: "2024-12-01T00:00:00Z",
      keywords: ["Real-Time", "Streaming", "Kafka", "50M+ Events", "Sub-second Latency", "Production"],
      featured: true,
      image: "/projects/realtime-tracking.jpg",
      metrics: {
        eventsPerDay: "50M+",
        latencyReduction: "99%",
        uptime: "99.9%"
      }
    },
    {
      id: "enterprise-data-warehouse",
      name: "Enterprise Data Warehouse",
      description: "Unified Finance & Business analytics with automated ETL/ELT workflows",
      longDescription: "Designed and delivered a single source of truth for enterprise analytics with governed dimensional models, automated workflows, and standardized KPIs. Reduced manual reporting effort by 80% while improving data consistency and accuracy across the organization.",
      repository: "",
      languages: ["SQL", "Python", "PySpark"],
      platforms: ["Amazon Redshift", "AWS Glue", "DBT", "Apache Airflow"],
      technologies: ["Data Modeling", "ETL/ELT", "Data Governance", "Distributed SQL"],
      dateCreated: "2024-12-15T00:00:00Z",
      keywords: ["Data Warehouse", "Redshift", "ETL", "Business Intelligence", "Production"],
      featured: true,
      image: "/projects/enterprise-warehouse.jpg",
      metrics: {
        reportingEfficiency: "80% improvement",
        accuracy: "98%",
        users: "200+"
      }
    },
    {
      id: "ai-analytics-platform",
      name: "AI-Ready Analytics & Vector Intelligence Platform",
      description: "GenAI-powered analytics with vector search and natural language querying",
      longDescription: "Built the data foundation for GenAI and advanced analytics, enabling contextual retrieval, vector search, and NLQ through a GraphQL layer. Reduced time-to-insight by 70% and enabled self-service analytics without SQL knowledge.",
      repository: "",
      languages: ["Python", "GraphQL"],
      platforms: ["Vector Database", "AWS Lambda", "Amazon S3"],
      technologies: ["Semantic Search", "NLQ", "GenAI", "GraphQL APIs"],
      dateCreated: "2025-01-10T00:00:00Z",
      keywords: ["AI", "Vector Search", "NLQ", "GenAI", "GraphQL", "Production"],
      featured: true,
      image: "/projects/ai-analytics.jpg",
      metrics: {
        insightReduction: "70%",
        adoption: "Enterprise-wide",
        queries: "No SQL required"
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
    return [...portfolioData.projects, ...githubProjects];
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