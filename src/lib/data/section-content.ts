// src/lib/data/section-content.ts
// Centralized SEO-optimized content for all homepage sections and their slug pages.

export interface SectionContent {
    id: string;
    slug: string;
    seoTitle: string;
    seoDescription: string;
    seoKeywords: string[];
    headline: string;
    subHeadline: string;
    introParagraph: string;
    paragraphs: string[];
    highlights: { label: string; value: string; description: string }[];
    ctaLabel: string;
    ctaSlug: string;
    detailSections: {
        title: string;
        content: string;
        bullets?: string[];
    }[];
}

export const sectionContent: Record<string, SectionContent> = {
    experience: {
        id: "experience",
        slug: "/experience",
        seoTitle:
            "Professional Experience | Krishnanand Anil — Senior Data Engineer & AWS Cloud Architect",
        seoDescription:
            "Explore the career journey of Krishnanand Anil, a Senior Data Engineer with 5+ years of experience building real-time data pipelines, AWS cloud infrastructure, and enterprise analytics platforms processing 50M+ events daily.",
        seoKeywords: [
            "senior data engineer",
            "AWS data engineer",
            "real-time data pipelines",
            "Kafka engineer",
            "cloud data architect",
            "ETL developer",
            "data warehouse engineer",
            "Bengaluru data engineer",
            "India data engineer",
            "career growth data engineering",
        ],
        headline: "Professional Evolution",
        subHeadline: "5+ Years Engineering Data at Scale",
        introParagraph:
            "From building foundational ETL mappings at Cognizant to architecting mission-critical streaming platforms processing 50 million events daily at DTDC Express, my career has been a relentless pursuit of transforming raw data into actionable intelligence. Every role has sharpened my expertise in AWS cloud services, Apache Kafka, Python, and modern data warehouse design.",
        paragraphs: [
            "As a Senior Data Engineer, I specialize in designing and deploying production-grade data pipelines that power real-time analytics, business intelligence dashboards, and AI-driven decision-making systems. My work spans the full data engineering lifecycle — from ingestion and transformation to warehousing, governance, and visualization.",
            "I have consistently delivered measurable impact: reducing data latency by 99%, improving report accuracy from 60% to 98%, and cutting manual reporting effort by 80% through intelligent automation. These achievements reflect not just technical skill, but a deep understanding of how data engineering drives business outcomes.",
            "Currently based in Bengaluru, India, I lead data engineering initiatives at DTDC Express Limited, one of India's largest logistics companies, where I architect systems that provide real-time shipment visibility, unified financial reporting, and AI-ready analytics capabilities across the enterprise.",
        ],
        highlights: [
            {
                label: "Years of Experience",
                value: "5+",
                description: "Across enterprise data engineering roles",
            },
            {
                label: "Events Processed Daily",
                value: "50M+",
                description: "Real-time streaming pipeline throughput",
            },
            {
                label: "Latency Reduction",
                value: "99%",
                description: "From 3 hours to sub-second delivery",
            },
            {
                label: "Companies Served",
                value: "3",
                description: "DTDC, Quantiphi, Cognizant",
            },
        ],
        ctaLabel: "Explore Full Career Journey",
        ctaSlug: "/experience",
        detailSections: [
            {
                title: "DTDC Express Limited — Data Engineer (Dec 2024 – Present)",
                content:
                    "Leading end-to-end data engineering initiatives for one of India's largest logistics companies, delivering real-time data access, centralized reporting, and AI-driven insights. Architected a high-throughput event-driven streaming pipeline processing 50M+ tracking events daily using Apache Kafka, replacing a legacy batch system and reducing data latency by 99%.",
                bullets: [
                    "Architected high-throughput event-driven streaming pipeline processing 50M+ tracking events daily",
                    "Reduced data latency by 99% (from 3 hours to seconds) replacing legacy batch system",
                    "Enabled real-time shipment visibility improving SLA compliance and customer experience",
                    "Designed unified data warehouse as single source of truth for Finance and Business analytics",
                    "Reduced manual reporting effort by 80% with automated ETL/ELT workflows",
                    "Built AI-ready analytics platform with vector search and natural language querying (NLQ)",
                    "Reduced time-to-insight by 70% enabling self-service analytics without SQL",
                    "Implemented GraphQL data layer for contextual retrieval and semantic search",
                    "Tech Stack: Kafka, Python, Airflow, DBT, Distributed SQL, Vector Databases, GraphQL, Containers",
                ],
            },
            {
                title:
                    "Quantiphi Analytics Solutions — Senior Data Engineer (Feb 2024 – Nov 2024)",
                content:
                    "Designed and implemented high-performance real-time and batch data pipelines enabling low-latency insights and AI-ready data platforms on AWS. Built real-time streaming pipelines from RDS to Redshift using DMS, Lambda, Kinesis, and SQS.",
                bullets: [
                    "Built real-time streaming pipelines from RDS to Redshift using DMS, Lambda, Kinesis, and SQS",
                    "Processed 50M+ daily events reducing latency from hours to seconds",
                    "Developed batch ETL/ELT pipelines with AWS Glue, Lambda, and EMR",
                    "Implemented SCD Type 2 for data lineage in S3 data lakes",
                    "Created base tables and implemented Medallion architecture for ticketing analytics",
                    "Improved report accuracy from 60% to 98% through query optimization",
                    "Implemented CI/CD pipeline with CodeCommit, CodeBuild, and CloudFormation",
                    "Improved deployment efficiency by 20% through automation",
                ],
            },
            {
                title:
                    "Cognizant Technology Solutions — Associate / Program Analyst (Aug 2020 – Feb 2024)",
                content:
                    "Progressed through three roles delivering large-scale data solutions with Hadoop, Informatica, Python, and AWS cloud technologies. Built and optimized data warehouse architectures on Amazon Redshift, automated ingestion processes, and established data governance practices.",
                bullets: [
                    "Designed and built medallion architecture on Amazon Redshift",
                    "Created multi-tenant architecture integrating SAP, S3, Oracle, flat files, and Salesforce",
                    "Developed monitoring shell scripts for Hadoop cluster, EMR, and Linux servers",
                    "Automated data ingestion processes improving efficiency by 25%",
                    "Implemented SCD Type 1 and Type 2 in data warehousing",
                    "Enhanced big data load and refresh performance by 20%",
                    "Created ETL mappings in Informatica PowerCenter",
                ],
            },
        ],
    },

    techstack: {
        id: "techstack",
        slug: "/tech-stack",
        seoTitle:
            "Technology Stack | Krishnanand Anil — AWS, Kafka, Python, Spark, Airflow & More",
        seoDescription:
            "Comprehensive technology stack of a Senior Data Engineer: AWS cloud services (Glue, Lambda, EMR, Redshift, Kinesis), Apache Kafka, Python, PySpark, Airflow, DBT, Docker, Kubernetes, Terraform, and 50+ modern data engineering tools.",
        seoKeywords: [
            "AWS data engineer tech stack",
            "Apache Kafka developer",
            "Python data engineer",
            "PySpark developer",
            "Apache Airflow",
            "DBT data build tool",
            "Amazon Redshift",
            "Docker Kubernetes Terraform",
            "data engineering tools",
            "cloud data infrastructure",
        ],
        headline: "Technology Ecosystem",
        subHeadline: "50+ Production-Tested Tools & Frameworks",
        introParagraph:
            "My technology stack is battle-tested across enterprise production environments, spanning cloud infrastructure, real-time streaming, batch processing, data warehousing, DevOps, and AI analytics. Every tool in this stack has been deployed in production workloads processing millions of events daily.",
        paragraphs: [
            "At the core of my cloud expertise is Amazon Web Services (AWS), where I architect solutions using services like AWS Glue for serverless ETL, AWS Lambda for event-driven compute, Amazon EMR for big data processing with Apache Spark and PySpark, Amazon Kinesis for real-time streaming, and Amazon Redshift for high-performance data warehousing with sub-second query response times.",
            "For real-time data engineering, I leverage Apache Kafka with Debezium for Change Data Capture (CDC), Apache Airflow for workflow orchestration, and DBT (Data Build Tool) for transformation-layer management. My programming toolkit centers on Python, Go, SQL, and PL/SQL, with deep expertise in libraries like Pandas, NumPy, Boto3, and PySpark for distributed computing.",
            "My DevOps and infrastructure-as-code practice includes Docker containerization, Kubernetes orchestration, Terraform for infrastructure provisioning, and CI/CD pipeline automation using AWS CodeCommit, CodeBuild, and CloudFormation. I also work extensively with vector databases, GraphQL APIs, and semantic search technologies for building AI-ready analytics platforms.",
        ],
        highlights: [
            {
                label: "Cloud Services",
                value: "17+",
                description: "AWS services in production use",
            },
            {
                label: "Programming Languages",
                value: "5+",
                description: "Python, Go, SQL, PySpark, Shell",
            },
            {
                label: "Data Frameworks",
                value: "10+",
                description: "Kafka, Spark, Airflow, DBT, and more",
            },
            {
                label: "DevOps Tools",
                value: "5+",
                description: "Docker, K8s, Terraform, CI/CD, ArgoCD",
            },
        ],
        ctaLabel: "Explore Full Tech Stack",
        ctaSlug: "/tech-stack",
        detailSections: [
            {
                title: "Cloud & Infrastructure (AWS)",
                content:
                    "Amazon Web Services forms the backbone of my cloud data engineering practice. I design and deploy scalable, fault-tolerant, and cost-effective data architectures using a comprehensive suite of AWS services.",
                bullets: [
                    "AWS Lambda — Serverless compute for event-driven data processing and microservices",
                    "AWS Glue — Managed ETL service for data cataloging, transformation, and integration",
                    "AWS EMR — Managed Hadoop/Spark clusters for large-scale batch data processing",
                    "Amazon Kinesis — Real-time data streaming and analytics for millions of events per second",
                    "AWS DMS — Database Migration Service for seamless schema and data migrations",
                    "Amazon Redshift — Cloud data warehouse with columnar storage and sub-second query performance",
                    "Amazon S3 — Scalable object storage for data lakes and medallion architecture",
                    "AWS Step Functions — Serverless workflow orchestration for complex data pipelines",
                    "AWS CloudWatch — Monitoring, logging, and alerting for production data systems",
                    "AWS IAM & KMS — Identity management and encryption for data security and governance",
                ],
            },
            {
                title: "Data Engineering & Streaming",
                content:
                    "My data engineering toolkit spans the entire pipeline lifecycle, from real-time ingestion and transformation to batch processing, warehousing, and quality assurance.",
                bullets: [
                    "Apache Kafka — Distributed event streaming platform for real-time data pipelines",
                    "Debezium — Open-source CDC connector for capturing database changes in real time",
                    "Apache Airflow — Workflow orchestration engine for scheduling and monitoring data pipelines",
                    "Apache Spark & PySpark — Distributed computing framework for large-scale data processing",
                    "DBT (Data Build Tool) — Transformation layer management with version-controlled SQL models",
                    "Informatica PowerCenter — Enterprise ETL tool for complex data integration workflows",
                    "Medallion Architecture — Bronze, Silver, Gold zone data lake design pattern",
                    "Data Mesh Principles — Domain-oriented, decentralized data ownership and governance",
                ],
            },
            {
                title: "Programming & Scripting",
                content:
                    "I write production-grade code in multiple languages, with a focus on data processing, automation, and cloud-native development.",
                bullets: [
                    "Python — Primary language for data engineering, automation, and API development",
                    "Go — Systems programming and high-performance microservices",
                    "SQL & PL/SQL — Complex query optimization, stored procedures, and data modeling",
                    "PySpark — Distributed data processing on Apache Spark clusters",
                    "Shell/Bash Scripting — Infrastructure automation and monitoring",
                    "Pandas & NumPy — Data manipulation and numerical computing",
                    "Boto3 — AWS SDK for Python, programmatic cloud resource management",
                ],
            },
            {
                title: "DevOps & Infrastructure as Code",
                content:
                    "Modern data engineering requires robust DevOps practices. I implement containerization, orchestration, and infrastructure-as-code to ensure reliable, repeatable deployments.",
                bullets: [
                    "Docker — Container images for reproducible data pipeline environments",
                    "Kubernetes — Container orchestration for scalable, self-healing microservices",
                    "Terraform — Infrastructure as Code for provisioning and managing cloud resources",
                    "CI/CD Pipelines — Automated testing, building, and deployment workflows",
                    "CloudFormation — AWS-native infrastructure provisioning and stack management",
                    "ArgoCD — GitOps continuous delivery for Kubernetes applications",
                ],
            },
        ],
    },

    github: {
        id: "github",
        slug: "/github",
        seoTitle:
            "GitHub Portfolio & Open Source | Krishnanand Anil — Data Engineering Projects",
        seoDescription:
            "Explore Krishnanand Anil's GitHub portfolio featuring data engineering projects, real-time CDC pipelines, data lake architectures, AWS automation scripts, Python utilities, and open-source contributions to the data engineering community.",
        seoKeywords: [
            "data engineering GitHub portfolio",
            "open source data engineer",
            "Kafka CDC project",
            "Python data pipeline project",
            "AWS automation scripts",
            "data lake architecture project",
            "real-time streaming project",
            "GitHub contributions data engineer",
        ],
        headline: "Open Source & Engineering",
        subHeadline: "Building in Public, Contributing to the Community",
        introParagraph:
            "My GitHub profile reflects a commitment to clean code, production-grade engineering practices, and continuous contribution to the data engineering community. From real-time CDC pipeline templates to data lake architecture blueprints, every repository is built with the same rigor I apply to enterprise production systems.",
        paragraphs: [
            "I maintain an active GitHub presence with repositories spanning real-time streaming architectures, AWS automation utilities, Python data processing libraries, and infrastructure-as-code templates. Each project is documented with comprehensive READMEs, architecture diagrams, and deployment instructions.",
            "My coding philosophy emphasizes readability, testability, and operational excellence. I follow conventional commit standards, implement automated testing pipelines, and structure repositories with clear separation of concerns. Whether it's a Kafka consumer optimization or a Terraform module for data lake provisioning, every line of code is written for production.",
            "Beyond personal projects, I actively contribute to the broader data engineering ecosystem through code reviews, technical discussions, and sharing architectural patterns that have proven successful in enterprise environments processing millions of events daily.",
        ],
        highlights: [
            {
                label: "Public Repositories",
                value: "42+",
                description:
                    "Open-source data engineering tools and templates",
            },
            {
                label: "Total Commits",
                value: "4.2K+",
                description: "Consistent contribution across projects",
            },
            {
                label: "Stars Earned",
                value: "128+",
                description: "Community recognition and adoption",
            },
            {
                label: "Languages Used",
                value: "5+",
                description: "Python, Go, SQL, TypeScript, Shell",
            },
        ],
        ctaLabel: "View GitHub Portfolio",
        ctaSlug: "/github",
        detailSections: [
            {
                title: "Featured Projects",
                content:
                    "My most impactful projects demonstrate end-to-end data engineering solutions, from real-time streaming architectures to AI-powered analytics platforms.",
                bullets: [
                    "Real-Time Tracking Data Platform — Event-driven pipeline processing 50M+ events/day with Apache Kafka",
                    "Enterprise Data Warehouse — Unified Finance & Business analytics with automated ETL/ELT on Redshift",
                    "AI-Ready Analytics Platform — GenAI-powered analytics with vector search and natural language querying",
                    "Real-Time CDC Pipeline — Production CDC using Kafka, Debezium, and custom Python consumers",
                    "Multi-Zone Data Lake — Scalable medallion architecture on S3 with automated quality checks",
                ],
            },
            {
                title: "Engineering Practices",
                content:
                    "Every repository follows battle-tested engineering standards that ensure code quality, maintainability, and operational reliability.",
                bullets: [
                    "Conventional commits with semantic versioning for clear change history",
                    "Comprehensive unit and integration test suites with pytest and Go testing frameworks",
                    "Docker-first development environments for reproducible builds",
                    "Infrastructure-as-code with Terraform modules and CloudFormation templates",
                    "CI/CD pipelines with automated linting, testing, and deployment",
                    "Detailed documentation with architecture diagrams and API references",
                ],
            },
            {
                title: "LeetCode & Competitive Programming",
                content:
                    "I maintain an active LeetCode profile to continuously sharpen my algorithmic thinking and problem-solving skills, which directly translates to writing more efficient data processing code.",
                bullets: [
                    "200+ problems solved across Easy, Medium, and Hard difficulty levels",
                    "Focus on dynamic programming, graph algorithms, and optimization problems",
                    "Strong foundation in time and space complexity analysis",
                    "Regular participation in weekly and biweekly contests",
                ],
            },
        ],
    },

    impact: {
        id: "impact",
        slug: "/impact",
        seoTitle:
            "Engineering Impact & Metrics | Krishnanand Anil — Data Pipeline Performance Results",
        seoDescription:
            "Quantified engineering impact: 99% latency reduction, 98% data accuracy, 80% reduction in manual reporting, 50M+ events per day processed. Real-world results from production data engineering at enterprise scale.",
        seoKeywords: [
            "data engineering impact metrics",
            "pipeline performance results",
            "latency reduction data engineering",
            "data accuracy improvement",
            "ETL automation ROI",
            "real-time pipeline throughput",
            "production data metrics",
            "enterprise data engineering results",
        ],
        headline: "Measurable Impact",
        subHeadline: "Quantified Results from Production Systems",
        introParagraph:
            "Every data engineering project I deliver is measured against concrete business outcomes. From reducing data delivery latency by 99% to improving report accuracy from 60% to 98%, these metrics represent real-world impact across enterprise production systems serving hundreds of users and processing millions of events daily.",
        paragraphs: [
            "Data engineering is ultimately about delivering business value. My approach centers on identifying high-impact opportunities where better data infrastructure directly translates to faster decisions, more accurate reporting, and significant cost savings. The metrics below represent verified production outcomes, not theoretical benchmarks.",
            "At DTDC Express, I replaced a 3-hour batch processing cycle with a real-time streaming architecture that delivers data in sub-second timeframes — a 99% reduction in latency. At Quantiphi, I improved report accuracy from 60% to 98% through advanced query optimization and validation pipelines. These improvements directly impacted revenue reporting, SLA compliance, and strategic decision-making.",
            "Beyond speed and accuracy, I focus on operational efficiency. By automating manual reporting workflows with Apache Airflow, DBT, and AWS Glue, I've consistently reduced manual effort by 70–80%, freeing data teams to focus on higher-value analytics work rather than repetitive data preparation tasks.",
        ],
        highlights: [
            {
                label: "Latency Reduction",
                value: "99%",
                description:
                    "Data delivery from 3 hours to sub-second with real-time CDC pipelines",
            },
            {
                label: "Data Accuracy",
                value: "98%",
                description:
                    "Report accuracy improved from 60% through validation pipelines",
            },
            {
                label: "Automation Savings",
                value: "80%",
                description:
                    "Reduction in manual reporting effort through ETL automation",
            },
            {
                label: "Daily Throughput",
                value: "50M+",
                description:
                    "Events processed daily in production streaming pipelines",
            },
        ],
        ctaLabel: "See Full Impact Report",
        ctaSlug: "/impact",
        detailSections: [
            {
                title: "Real-Time Data Delivery",
                content:
                    "Transitioning from batch-oriented to real-time data architectures has been my most impactful contribution. By implementing Apache Kafka-based streaming pipelines with Debezium CDC, I've reduced data delivery latency from hours to sub-second across multiple production environments.",
                bullets: [
                    "99% reduction in data latency — from 3-hour batch cycles to sub-second streaming",
                    "50M+ tracking events processed daily with zero data loss",
                    "99.9% pipeline uptime maintained across production systems",
                    "Real-time shipment visibility enabling proactive SLA management",
                    "Sub-5-minute data refresh cycles in near-real-time warehouse environments",
                ],
            },
            {
                title: "Data Quality & Accuracy",
                content:
                    "Accurate data is the foundation of trustworthy analytics. I implement multi-layer validation pipelines that catch data anomalies before they reach downstream consumers, ensuring that business decisions are powered by reliable, governed data.",
                bullets: [
                    "Report accuracy improved from 60% to 98% through advanced validation pipelines",
                    "Automated data quality checks at bronze, silver, and gold zones of the data lake",
                    "SCD Type 1 and Type 2 implementations for maintaining historical data integrity",
                    "Data lineage tracking for full auditability and regulatory compliance",
                    "Anomaly detection and alerting through AWS CloudWatch and SNS integrations",
                ],
            },
            {
                title: "Operational Efficiency & Cost Optimization",
                content:
                    "Automation is the multiplier for data engineering teams. By designing self-healing, auto-scaling pipelines with intelligent orchestration, I consistently free up engineering resources and reduce infrastructure costs.",
                bullets: [
                    "80% reduction in manual reporting effort through automated ETL/ELT workflows",
                    "20% improvement in deployment efficiency through CI/CD automation",
                    "40% improvement in query performance through Redshift optimization",
                    "70% reduction in time-to-insight with AI-ready analytics platform",
                    "25% improvement in data ingestion efficiency through pipeline automation",
                ],
            },
        ],
    },

    credentials: {
        id: "credentials",
        slug: "/credentials",
        seoTitle:
            "AWS Certifications & Education | Krishnanand Anil — Certified Solutions Architect",
        seoDescription:
            "AWS Certified Solutions Architect – Associate and AWS Cloud Practitioner certifications. B.Tech in Computer Science from Birla Institute of Technology. Published research in IOP Journal of Physics.",
        seoKeywords: [
            "AWS certified solutions architect",
            "AWS cloud practitioner",
            "data engineer certifications",
            "AWS certification data engineer",
            "Birla Institute of Technology",
            "computer science BTech",
            "published researcher data engineer",
            "cloud certifications India",
        ],
        headline: "Credentials & Research",
        subHeadline: "Certified, Educated, Published",
        introParagraph:
            "My professional credentials include industry-recognized AWS certifications, a Bachelor of Technology in Computer Science from Birla Institute of Technology, and peer-reviewed research published in international scientific journals. I believe continuous learning and formal validation are essential for staying at the cutting edge of cloud data engineering.",
        paragraphs: [
            "I hold the AWS Certified Solutions Architect – Associate certification, validating my expertise in designing distributed systems, implementing fault-tolerant architectures, and optimizing cost-effective solutions on Amazon Web Services. This certification demonstrates hands-on proficiency with AWS services used daily in production data engineering.",
            "My academic foundation includes a B.Tech in Computer Science and Engineering from Birla Institute of Technology (BIT Mesra), one of India's premier engineering institutions. This rigorous four-year program provided deep expertise in algorithms, data structures, distributed systems, database management, and software engineering principles.",
            "Beyond certifications and education, I have contributed to the research community with peer-reviewed publications in international journals, including research on automated robotic systems published in the IOP Journal of Physics. This research background informs my systematic approach to solving complex data engineering challenges.",
        ],
        highlights: [
            {
                label: "AWS Certifications",
                value: "2",
                description:
                    "Solutions Architect Associate + Cloud Practitioner",
            },
            {
                label: "Education",
                value: "B.Tech",
                description:
                    "Computer Science, Birla Institute of Technology",
            },
            {
                label: "Research Papers",
                value: "2",
                description:
                    "Published in IOP Journal and International Journal",
            },
            {
                label: "Continuous Learning",
                value: "Active",
                description:
                    "Pursuing advanced AWS and data engineering certifications",
            },
        ],
        ctaLabel: "View All Credentials",
        ctaSlug: "/credentials",
        detailSections: [
            {
                title: "AWS Certifications",
                content:
                    "Amazon Web Services certifications validate cloud architecture expertise through rigorous, scenario-based examinations. My certifications cover both foundational cloud knowledge and professional-level solution design.",
                bullets: [
                    "AWS Certified Solutions Architect – Associate (2023): Designing resilient, high-performing, secure, and cost-optimized architectures on AWS",
                    "AWS Cloud Practitioner (2022): Foundational understanding of AWS cloud concepts, services, security, and pricing models",
                    "Actively pursuing: AWS Certified Data Analytics – Specialty and AWS Certified Machine Learning – Specialty",
                ],
            },
            {
                title: "Education",
                content:
                    "Birla Institute of Technology (BIT Mesra) is one of India's top engineering universities, known for its demanding curriculum in computer science and engineering.",
                bullets: [
                    "Bachelor of Technology (B.Tech) in Computer Science and Engineering",
                    "Graduated 2019 from Birla Institute of Technology, Mesra, Jharkhand, India",
                    "GPA: 7.5/10.0 — Strong foundation in algorithms, databases, distributed systems",
                    "Capstone projects in robotics automation and environmental data analysis",
                ],
            },
            {
                title: "Published Research",
                content:
                    "Peer-reviewed research publications demonstrate analytical rigor and the ability to contribute original knowledge to the scientific community.",
                bullets: [
                    "\"Design and Control of an Automated SCARA Robotic Arm with a Pneumatic Soft Gripper\" — IOP Journal of Physics: Conference Series (2021)",
                    "\"Estimation of Vehicular Emissions of Major Districts in Kerala\" — International Journal of Psychosocial Rehabilitation (2020)",
                    "Research areas: robotics automation, pneumatic systems, environmental data analysis, emissions estimation",
                ],
            },
        ],
    },

    contact: {
        id: "contact",
        slug: "/contact",
        seoTitle:
            "Contact Krishnanand Anil | Hire a Senior Data Engineer — AWS Cloud Architect",
        seoDescription:
            "Contact Krishnanand Anil for data engineering consulting, AWS cloud architecture, real-time pipeline development, and enterprise data solutions. Available for full-time roles, consulting, and collaboration. Based in Bengaluru, India.",
        seoKeywords: [
            "hire data engineer",
            "data engineering consulting",
            "AWS cloud architect for hire",
            "freelance data engineer India",
            "Kafka pipeline developer",
            "data warehouse consultant",
            "Bengaluru data engineer contact",
            "real-time data engineering services",
        ],
        headline: "Let's Build Together",
        subHeadline: "Available for Collaboration & Consulting",
        introParagraph:
            "I'm always open to discussing data engineering challenges, cloud architecture design, and opportunities to build impactful data systems. Whether you're looking for a full-time data engineer, consulting expertise for a specific project, or simply want to discuss modern data architecture patterns, I'd love to connect.",
        paragraphs: [
            "With 5+ years of hands-on experience building production data systems at enterprise scale, I bring deep expertise in AWS cloud services, real-time streaming with Apache Kafka, data warehouse design with Amazon Redshift, and AI-ready analytics platforms. I understand both the technical intricacies and the business context that drives great data engineering.",
            "I'm currently based in Bengaluru, India, and am available for remote collaboration across time zones. My typical response time is within 24 hours, and I'm happy to discuss opportunities over a video call, email, or LinkedIn message.",
            "Whether you need to architect a real-time CDC pipeline, migrate batch workloads to streaming, design a medallion data lake on AWS, or build an AI-powered analytics platform with vector search and natural language querying, I've done it in production and I can help you do it too.",
        ],
        highlights: [
            {
                label: "Response Time",
                value: "< 24h",
                description: "Typical email and LinkedIn response time",
            },
            {
                label: "Location",
                value: "Bengaluru",
                description: "India, available for remote collaboration",
            },
            {
                label: "Availability",
                value: "Open",
                description: "Full-time roles, consulting, and collaboration",
            },
            {
                label: "Specialization",
                value: "Data Eng",
                description: "AWS, Kafka, Redshift, Python, Airflow",
            },
        ],
        ctaLabel: "Start a Conversation",
        ctaSlug: "/contact",
        detailSections: [
            {
                title: "What I Can Help With",
                content:
                    "My consulting and collaboration expertise spans the full data engineering lifecycle, from infrastructure design to production deployment.",
                bullets: [
                    "Real-time data pipeline architecture with Apache Kafka, Debezium, and AWS Kinesis",
                    "AWS cloud infrastructure design and optimization for data workloads",
                    "Data warehouse design and query optimization on Amazon Redshift and Snowflake",
                    "Data lake architecture using medallion patterns on Amazon S3",
                    "ETL/ELT pipeline automation with Apache Airflow, AWS Glue, and DBT",
                    "AI-ready analytics platforms with vector databases and semantic search",
                    "Data governance, quality assurance, and lineage tracking implementation",
                    "DevOps for data: Docker, Kubernetes, Terraform, and CI/CD pipeline setup",
                ],
            },
            {
                title: "How to Reach Me",
                content:
                    "I'm accessible through multiple channels and typically respond within 24 hours. Choose the channel that works best for you.",
                bullets: [
                    "Email: krishnanandpanil@gmail.com — Best for detailed project discussions",
                    "LinkedIn: linkedin.com/in/krishnanand-anil — Professional networking and quick messages",
                    "GitHub: github.com/sudo-krish — Code-level collaboration and project discussions",
                    "Schedule a Call: Available via Calendly for video consultations",
                ],
            },
        ],
    },

    leetcode: {
        id: "leetcode",
        slug: "/leetcode",
        seoTitle:
            "LeetCode & Algorithms | Krishnanand Anil — Problem Solving Portfolio",
        seoDescription:
            "View Krishnanand Anil's LeetCode statistics, problem-solving journey, and algorithmic skills. Tracking progress across Easy, Medium, and Hard challenges.",
        seoKeywords: [
            "leetcode problem solving",
            "algorithms data structures",
            "competitive programming",
            "python leetcode solutions",
            "dynamic programming",
            "software engineer interviews",
        ],
        headline: "Algorithmic Precision",
        subHeadline: "Sharpening Problem-Solving Skills Daily",
        introParagraph:
            "While architectural design and system building are my primary focus, maintaining a strong grasp of fundamental computer science concepts is crucial for writing efficient, optimized code. My LeetCode practice is a deliberate effort to continuously challenge my algorithmic thinking.",
        paragraphs: [
            "Data engineering at scale means even minor inefficiencies in data processing logic can manifest as significant performance bottlenecks or cloud cost overruns. A strong foundation in time and space complexity analysis helps me write robust transformations that scale elegantly.",
            "I regularly solve problems covering a wide range of algorithms and data structures, from dynamic programming and graph traversals to advanced tree manipulations and sliding window patterns. This practice ensures I approach complex business logic with the sharpest possible mindset.",
            "Below are my live statistics fetched dynamically from my LeetCode profile, reflecting my ongoing journey in algorithmic problem solving."
        ],
        highlights: [
            {
                label: "Total Solved",
                value: "140+",
                description: "Problems solved across all difficulties",
            },
            {
                label: "Primary Language",
                value: "Python",
                description: "For rapid implementation and clarity",
            },
            {
                label: "Streak",
                value: "Active",
                description: "Consistent daily problem-solving",
            },
            {
                label: "Focus Areas",
                value: "Graphs",
                description: "Dynamic Programming, Trees, Arrays",
            },
        ],
        ctaLabel: "View LeetCode Profile",
        ctaSlug: "https://leetcode.com/user8673j",
        detailSections: [],
    },
};

// Helper function to get content by section id
export const getSectionContent = (sectionId: string): SectionContent | undefined =>
    sectionContent[sectionId];

// Get all section slugs for sitemap
export const getAllSectionSlugs = (): string[] =>
    Object.values(sectionContent).map((s) => s.slug);
