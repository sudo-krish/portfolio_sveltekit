// src/lib/data/portfolio.ts
import type { PortfolioData } from '$lib/types/portfolio';
import { getGitHubProjectsCached } from '$lib/services/github';

export const portfolioData: PortfolioData = {
  personal: {
    name: "Krishnanand Anil",
    jobTitle: "Senior Data Engineer",
    bio: "Senior Data Engineer with over 5 years of experience specializing in AWS Cloud services, scalable data pipelines, Amazon Redshift, and data lake architecture. Currently working at DTDC Express Limited, I design and implement enterprise-grade data solutions that power critical business operations and analytics. Passionate about building robust, scalable systems that handle massive data volumes efficiently.",
    shortBio: "AWS Cloud Expert | Building Scalable Data Pipelines | 5+ Years Experience",
    email: "contact@krishnanandanil.com",
    phone: "+91-XXXXXXXXXX",
    website: "https://krishnanandanil.com",
    profileImage: "/profile.jpg",
    resumeUrl: "/resume.pdf",
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
      "Data Engineering",
      "AWS Cloud Services",
      "Amazon Redshift",
      "Amazon S3",
      "AWS Glue",
      "AWS Lambda",
      "Data Lake Architecture",
      "Scalable Data Pipelines",
      "ETL/ELT Development",
      "Python",
      "SQL",
      "Apache Spark",
      "Apache Airflow",
      "Apache Kafka",
      "dbt (Data Build Tool)",
      "Docker",
      "Kubernetes",
      "Terraform",
      "Data Warehousing",
      "Big Data Processing",
      "Real-time Data Streaming",
      "Data Modeling",
      "Data Quality & Governance",
      "CI/CD for Data Pipelines",
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Redis",
      "Go",
      "Debezium",
      "CDC"
    ],
    topSkills: [
      "Real-Time CDC Pipelines",
      "AWS Cloud Services",
      "Amazon Redshift",
      "Apache Kafka",
      "Python & Go",
      "Kubernetes"
    ],
    yearsOfExperience: 5
  },

  companies: [
    {
      name: "DTDC Express Limited",
      url: "https://www.dtdc.in/",
      position: "Senior Data Engineer",
      duration: "Current",
      startDate: "2023-01-01",
      current: true,
      description: "Leading data engineering initiatives for one of India's largest logistics companies.",
      responsibilities: [
        "Architecting real-time CDC pipelines using Kafka, Debezium, and Python consumers",
        "Building near real-time data warehouse with 5-minute refresh SLA",
        "Managing Amazon Redshift-based data warehouse serving 10,000+ daily shipments",
        "Designing and building data lake solutions for enterprise-wide analytics",
        "Optimizing ETL processes with 40% performance improvement",
        "Leading data engineering team and mentoring junior engineers",
        "Implementing on-the-fly transformations using Python and Go",
        "Migrating infrastructure from GCP to AWS with Docker and Kubernetes"
      ]
    }
  ],

  education: [
    {
      university: "Birla Institute of Technology",
      url: "https://www.bitmesra.ac.in/",
      degree: "Bachelor of Technology",
      field: "Computer Science",
      graduationYear: "2019",
      location: "Mesra, Jharkhand, India"
    }
  ],

  certifications: [
    {
      name: "AWS Certified Solutions Architect",
      category: "Cloud Architecture",
      url: "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
      issuer: "Amazon Web Services",
      dateIssued: "2023"
    },
    {
      name: "AWS Cloud Expert",
      category: "Cloud Services",
      url: "https://aws.amazon.com/certification/",
      issuer: "Amazon Web Services",
      dateIssued: "2024"
    }
  ],

  // Manual projects (production/proprietary work)
  projects: [
    {
      id: "realtime-cdc-pipeline",
      name: "Real-Time CDC Pipeline",
      description: "Production CDC pipeline using Kafka, Debezium, and Python consumers",
      longDescription: "Built an industry-rare real-time Change Data Capture (CDC) pipeline using Kafka, Debezium, and custom Python consumers. Handles 100K+ events per minute with sub-second latency.",
      repository: "",
      languages: ["Python", "SQL"],
      platforms: ["Apache Kafka", "Debezium", "AWS Lambda", "PostgreSQL"],
      technologies: ["Docker", "Kubernetes", "Terraform"],
      dateCreated: "2024-03-15T00:00:00Z",
      keywords: ["Real-Time", "CDC", "Kafka", "Debezium", "Production"],
      featured: true,
      image: "/projects/cdc-pipeline.jpg"
    },
    {
      id: "near-realtime-warehouse",
      name: "5-Minute SLA Data Warehouse",
      description: "Near real-time warehouse with 5-minute refresh on Redshift",
      longDescription: "Designed and implemented a near real-time data warehouse with strict 5-minute SLA. Serves 200+ users with sub-second queries.",
      repository: "",
      languages: ["SQL", "Python", "PySpark"],
      platforms: ["Amazon Redshift", "AWS Glue", "AWS Lambda"],
      technologies: ["Apache Airflow", "dbt", "Docker"],
      dateCreated: "2024-01-10T00:00:00Z",
      keywords: ["Real-Time", "Data Warehouse", "Redshift", "Production"],
      featured: true,
      image: "/projects/realtime-warehouse.jpg"
    },
    {
      id: "realtime-logistics-pipeline",
      name: "Real-Time Logistics Data Pipeline",
      description: "Scalable real-time data processing system for tracking shipments",
      longDescription: "Built a comprehensive real-time data pipeline using AWS Kinesis, Lambda, and DynamoDB. Handles 50,000+ events per minute with sub-second latency.",
      repository: "",
      languages: ["Python", "SQL"],
      platforms: ["AWS Kinesis", "AWS Lambda", "DynamoDB", "Amazon S3"],
      technologies: ["Apache Spark", "Docker", "Terraform"],
      dateCreated: "2024-01-15T00:00:00Z",
      keywords: ["Real-Time", "AWS", "Logistics", "Data Streaming"],
      featured: true,
      image: "/projects/realtime-pipeline.jpg"
    },
    {
      id: "data-lake-architecture",
      name: "Multi-Zone Data Lake on S3",
      description: "Scalable data lake following medallion architecture",
      longDescription: "Implemented a production-grade data lake on AWS S3 with bronze, silver, and gold zones. Processes 5TB+ of data monthly.",
      repository: "",
      languages: ["Python", "SQL", "PySpark"],
      platforms: ["Amazon S3", "AWS Glue", "Amazon Athena", "AWS Lambda"],
      technologies: ["Apache Spark", "Delta Lake", "Terraform"],
      dateCreated: "2023-03-01T00:00:00Z",
      keywords: ["Data Lake", "S3", "Medallion Architecture", "Big Data"],
      featured: false,
      image: "/projects/data-lake.jpg"
    }
  ],

  blogPosts: [
    {
      id: "spark-optimization-guide",
      slug: "optimizing-apache-spark-performance",
      title: "Optimizing Apache Spark Jobs for Production",
      description: "A comprehensive guide to tuning Spark configurations and improving performance",
      url: "https://krishnanandanil.com/blog/optimizing-apache-spark-performance",
      datePublished: "2025-09-15T10:00:00Z",
      author: "Krishnanand Anil",
      authorUrl: "https://krishnanandanil.com",
      keywords: ["Apache Spark", "Performance Tuning", "Big Data", "Optimization"],
      category: "Data Engineering",
      readTime: "12 min read",
      featured: true,
      image: "/blog/spark-optimization.jpg"
    },
    {
      id: "redshift-best-practices",
      slug: "amazon-redshift-best-practices",
      title: "Amazon Redshift Best Practices for Data Engineers",
      description: "Essential tips and tricks for optimizing Redshift clusters",
      url: "https://krishnanandanil.com/blog/amazon-redshift-best-practices",
      datePublished: "2025-08-20T10:00:00Z",
      author: "Krishnanand Anil",
      authorUrl: "https://krishnanandanil.com",
      keywords: ["Amazon Redshift", "AWS", "Data Warehouse", "Best Practices"],
      category: "Cloud Data Engineering",
      readTime: "10 min read",
      featured: true,
      image: "/blog/redshift-best-practices.jpg"
    },
    {
      id: "data-lake-architecture",
      slug: "building-scalable-data-lake-aws",
      title: "Building a Scalable Data Lake on AWS",
      description: "Step-by-step guide to implementing medallion architecture data lake",
      url: "https://krishnanandanil.com/blog/building-scalable-data-lake-aws",
      datePublished: "2025-07-10T10:00:00Z",
      author: "Krishnanand Anil",
      authorUrl: "https://krishnanandanil.com",
      keywords: ["Data Lake", "AWS", "S3", "Medallion Architecture"],
      category: "Data Architecture",
      readTime: "15 min read",
      featured: false,
      image: "/blog/data-lake-architecture.jpg"
    }
  ]
};

// Helper functions
export const getPersonalInfo = () => portfolioData.personal;
export const getCurrentCompany = () => portfolioData.companies.find(c => c.current);
export const getAllCompanies = () => portfolioData.companies;
export const getEducation = () => portfolioData.education;
export const getCertifications = () => portfolioData.certifications;
export const getFeaturedProjects = () => portfolioData.projects.filter(p => p.featured);
export const getAllProjects = () => portfolioData.projects;
export const getProjectById = (id: string) => portfolioData.projects.find(p => p.id === id);
export const getFeaturedBlogPosts = () => portfolioData.blogPosts.filter(b => b.featured);
export const getAllBlogPosts = () => portfolioData.blogPosts;
export const getBlogPostBySlug = (slug: string) => portfolioData.blogPosts.find(b => b.slug === slug);

// NEW: Get all projects including GitHub repos
export const getAllProjectsWithGitHub = async () => {
  const githubProjects = await getGitHubProjectsCached();
  return [...portfolioData.projects, ...githubProjects];
};

export const getFeaturedProjectsWithGitHub = async () => {
  const allProjects = await getAllProjectsWithGitHub();
  return allProjects.filter(p => p.featured);
};
