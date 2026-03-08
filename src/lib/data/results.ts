// src/lib/data/results.ts

export const resultsData = {
    rightAnchor: {
        label: "MEASURABLE IMPACT",
        title: "Proven\nResults.",
        description: "Engineering isn't just about writing code—it's about moving the needle."
    },
    // The main achievement showcase
    achievement: {
        title: "Enterprise Data Scale",
        subtitle: "Architecting for Petabytes",
        description: "Led the migration of a legacy monolithic data warehouse to a <strong class=\"text-white\">scalable, decoupled lakehouse architecture</strong>. By shifting heavy storage to <span class=\"text-[#06b6d4] font-medium\">data lakes</span> and reserving data warehouses strictly for high-compute analytical workloads, we achieved a <b><strong class=\"text-[#eab308]\">60% reduction in costs</strong></b>. Furthermore, we transformed 3-hour batch processing jobs into <span class=\"text-[#ef4444] font-medium\">real-time streaming pipelines</span>, driving an <strong class=\"text-white\">85% reduction in latency</strong>. I ensured <strong class=\"text-[#06b6d4]\">99.9% data accuracy</strong> by implementing rigorous <span class=\"text-white font-medium\">automated schema validation</span> and data quality checks via dead-letter queues. Lastly, by aggressively deploying centralized monitoring tools and automated incident alerts, the platform maintains a consistent <strong class=\"text-[#a855f7]\">99.99% uptime</strong>."
    },
    metrics: [
        {
            id: "latency",
            label: "Latency Reduction",
            value: "85%",
            description: "via <span class=\"text-[#ef4444]\">streaming CDC</span> pipelines",
            iconName: "TrendingUp",
            color: "#ef4444" // Red
        },
        {
            id: "accuracy",
            label: "Data Accuracy",
            value: "99.9%",
            description: "via <span class=\"text-[#06b6d4]\">schema validation</span> & DLQ",
            iconName: "Target",
            color: "#06b6d4" // Cyan
        },
        {
            id: "efficiency",
            label: "Cost Efficiency",
            value: "60%",
            description: "via <span class=\"text-[#eab308]\">optimized compute</span> & tiers",
            iconName: "Zap",
            color: "#eab308" // Yellow
        },
        {
            id: "insights",
            label: "Pipeline Uptime",
            value: "99.99%",
            description: "via <span class=\"text-[#a855f7]\">robust orchestration</span>",
            iconName: "Award",
            color: "#a855f7" // Purple
        }
    ],
    ui: {
        carousel: {
            sectionTitle: "Impact & Results",
            sectionDescription: "See the measurable difference",
            accentColor: "#a855f7" // Purple
        },
        cta: {
            label: "Read Case Studies",
            href: "#experience"
        }
    }
};
