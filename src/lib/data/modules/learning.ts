import type { LearningPath } from '$lib/types/portfolio';

export const learningPaths = [
    {
        category: "In Progress (Deep Diving)",
        status: "in-progress",
        items: [
            {
                title: "Advanced CDC Architectures",
                description: "Studying edge-case handling in high-throughput Debezium setups and exactly-once processing guarantees in Kafka Streams.",
                technologies: ["Kafka", "Debezium", "PostgreSQL"],
            },
            {
                title: "Rust for Data Tooling",
                description: "Exploring rewrite of heavy Python data transformations into lightweight Rust binaries for massive performance gains.",
                technologies: ["Rust", "Polars", "DataFusion"],
            }
        ]
    },
    {
        category: "Up Next",
        status: "upcoming",
        items: [
            {
                title: "Apache Iceberg Partition Evolution",
                description: "Deep dive into dynamic partitioning strategies for petabyte-scale lakehouses.",
                technologies: ["Apache Iceberg", "Athena", "AWS Glue"],
            },
            {
                title: "Agentic Engineering Workflows",
                description: "Implementing localized LLMs to automate standard data governance and metadata tagging.",
                technologies: ["GenAI", "LangChain", "LLMs"],
            }
        ]
    },
    {
        category: "Recently Completed",
        status: "completed",
        items: [
            {
                title: "Distributed Vector Search",
                description: "Mastered the implementation of semantic search across hybrid clouds using modern vector databases and GraphQL APIs.",
                technologies: ["GraphQL", "Pinecone", "Milvus"],
                link: "/articles/vector-databases-ai-analytics"
            },
            {
                title: "Redshift Concurrency Scaling",
                description: "Optimized cluster concurrency to handle 200+ simultaneous BI users without query degradation.",
                technologies: ["Amazon Redshift", "AWS", "SQL Performance"],
                link: "/articles/amazon-redshift-optimization-guide"
            }
        ]
    }
];
