// src/lib/data/articles-page.ts
// Page-level content for /articles — all visible text and SEO metadata.

export const articlesPageContent = {
    seo: {
        title: "Data Engineering Articles | AWS, Kafka, Spark, Warehousing, Architecture",
        description: "Data engineering articles and architecture notes by Krishnanand Anil. Explanations, tradeoffs, and practical reasoning for real-world data systems.",
        keywords: "data engineering articles, aws architecture blog, kafka cdc article, data warehouse patterns, spark performance tuning",
        url: "https://krishnanandanil.com/articles",
    },
    h1: "Data Engineering Articles and Architecture Notes",
    introParagraph: "Explanations, tradeoffs, architecture reasoning, and practical notes on data engineering with AWS, Kafka, Spark, and modern data platforms.",
    searchPlaceholder: "Search articles...",
    backLabel: "Home",
    emptyState: {
        noArticles: "No articles yet",
        noArticlesHint: "Push markdown files to the articles repo to see them here.",
    },
};

export const researchPapers: any[] = [];
export const blogPosts: any[] = [];
export const getAllBlogPosts = () => blogPosts;
