import type { BlogPost } from '$lib/types/portfolio';

export const blogPosts: BlogPost[] = [
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
];
