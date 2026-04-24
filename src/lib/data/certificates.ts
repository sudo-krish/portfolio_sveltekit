// src/lib/data/certificates.ts

export const certificatesData = {
    leftAnchor: {
        label: "VERIFIED EXPERTISE",
        title: "Certified\nExcellence.",
        description: "Continuous learning drives my engineering philosophy."
    },
    // Overall SEO/Summary Card
    overview: {
        title: "Cloud & Research",
        subtitle: "Industry Recognized Credentials",
        description: "My certification journey and academic publications reflect a deep commitment to mastering modern data architecture and engineering principles. From designing <b>highly available AWS systems</b> to publishing <b>peer-reviewed research</b> on automated systems, these credentials represent rigorous, hands-on validation of my ability to deliver secure, enterprise-grade data solutions."
    },
    ui: {
        carousel: {
            sectionTitle: "Credentials",
            sectionDescription: "AWS certified & published",
            accentColor: "hsl(var(--primary))"
        },
        cta: {
            label: "Explore Badges",
            href: "#"
        }
    },
    // Real Certificates List
    list: [
        {
            id: "databricks-lakehouse",
            name: "Fundamentals of the Databricks Lakehouse Platform Accreditation",
            issuer: "Databricks",
            date: "Oct 2023",
            impact: "Validated my knowledge of the Databricks Lakehouse architecture. This accreditation demonstrates my ability to unify data warehousing and AI use cases using Apache Spark, Delta Lake, and MLflow on a single platform.",
            color: "hsl(var(--foreground))", // Databricks Red
            url: "/certificates/databrickslakehouseplatform.png"
        },
        {
            id: "pyspark-bigdata",
            name: "Spark and Python for Big Data with PySpark",
            issuer: "Udemy",
            date: "Oct 2023",
            impact: "Deepened my expertise in distributed data processing. I utilized these skills to build scalable machine learning pipelines, specifically focusing on logistic regression and large-scale data manipulation.",
            color: "hsl(var(--foreground))", // PySpark Yellow
            url: "#"
        },
        {
            id: "apache-spark-3",
            name: "Apache Spark 3 - Spark Programming in Python",
            issuer: "Udemy",
            date: "Oct 2023",
            impact: "Mastered the core concepts of Apache Spark 3. This allowed me to significantly optimize data ingestion and transformation jobs across large cluster environments.",
            color: "hsl(var(--foreground))", // Spark Orange
            url: "#"
        },
        {
            id: "ibm-hadoop-101",
            name: "Hadoop 101 (BD0111EN)",
            issuer: "IBM",
            date: "Sep 2022",
            impact: "Solidified my foundational understanding of the Hadoop ecosystem, including HDFS and MapReduce, giving me the required knowledge to navigate complex legacy Big Data environments.",
            color: "hsl(var(--foreground))", // IBM Blue
            url: "https://courses.cognitiveclass.ai/certificates/d9b7b58b39dd419baa96a4c9e3fdb5e4"
        },
        {
            id: "aws-redshift",
            name: "Mastering Amazon Redshift Development & Administration",
            issuer: "Udemy",
            date: "Oct 2020",
            impact: "Gained advanced skills in Redshift cluster management, query optimization, and columnar storage design, which became crucial for optimizing massive cloud data warehouse performance.",
            color: "hsl(var(--foreground))", // AWS Orange
            url: "https://www.udemy.com/certificate/UC-fa9aca39-7299-4633-962d-adebec7790d1/"
        },
        {
            id: "python-bible",
            name: "The Python Bible™ | Everything You Need to Program",
            issuer: "Udemy",
            date: "Oct 2023",
            impact: "Extensively refined my object-oriented programming, scripting, and automation skills in Python, allowing me to build robust backend systems and data extraction scripts.",
            color: "hsl(var(--foreground))", // Python Blue
            url: "https://udemy-certificate.s3.amazonaws.com/pdf/UC-965d9dc0-f9e7-4126-b433-869ed7d6b28b.pdf"
        },
        {
            id: "sql-mysql",
            name: "SQL for Beginners: Learn SQL using MySQL and Database Design",
            issuer: "Udemy",
            date: "Feb 2020",
            impact: "Mastered relational database design, complex joins, and SQL query tuning, forming the bedrock of my data engineering methodology.",
            color: "hsl(var(--foreground))", // MySQL Blue
            url: "https://www.udemy.com/certificate/UC-803fd21d-0aa3-418c-ab58-f4ef5d432656/"
        },
        {
            id: "pm-course",
            name: "The Project Management Course: Beginner to PROject Manager",
            issuer: "Udemy",
            date: "Oct 2023",
            impact: "Equipped me with Agile and Waterfall scope planning techniques, ensuring I can successfully lead cross-functional engineering teams and deliver data products on schedule.",
            color: "hsl(var(--foreground))", // Purple
            url: "#"
        }
    ],
    // Real Papers List
    papers: [
        {
            id: "paper-scara",
            name: "Design and Control of an Automated SCARA Robotic Arm with a Pneumatic Soft Gripper",
            issuer: "IOP Journal of Physics: Conference Series",
            date: "2021",
            impact: "Published <b>peer-reviewed research</b> on automated robotic systems in the prestigious IOP Journal of Physics. This work demonstrates a systematic, highly analytical approach to complex hardware-software integration, control systems, and innovative engineering problem-solving.",
            color: "hsl(var(--foreground))", // Green
            url: "https://iopscience.iop.org/article/10.1088/1742-6596/2070/1/012207"
        },
        {
            id: "paper-emissions",
            name: "Estimation of Vehicular Emissions of Major Districts in Kerala",
            issuer: "International Journal of Psychosocial Rehabilitation",
            date: "2020",
            impact: "Conducted a comprehensive <b>data analysis and environmental estimation study</b>. This publication highlights my early expertise in handling large-scale foundational datasets, performing statistical analysis, and deriving actionable insights from complex real-world information.",
            color: "hsl(var(--foreground))", // Pink
            url: "https://www.psychosocial.com/index.php/ijpr/article/view/4886"
        }
    ]
};
