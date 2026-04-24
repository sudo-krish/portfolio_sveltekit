// src/lib/data/results.ts

export const resultsData = {
    rightAnchor: {
        label: "PRODUCTION OUTCOMES",
        title: "Delivery\nMetrics.",
        description: "These metrics reflect engineering problems solved — from large-scale event processing to low-latency analytics refresh."
    },
    // The main achievement showcase
    achievement: {
        title: "Production Outcomes",
        subtitle: "Delivery Metrics at Scale",
        description: "These metrics reflect the kinds of engineering problems I have worked on, from <strong class=\"text-foreground\">large-scale event processing</strong> to <span class=\"text-[#06b6d4] font-medium\">low-latency analytics refresh</span>, pipeline uptime, and <b><strong class=\"text-[#eab308]\">automation-driven efficiency improvements</strong></b>. Each metric represents <span class=\"text-[#ef4444] font-medium\">real production outcomes</span>, not theoretical benchmarks — measured across systems serving hundreds of users and processing millions of events daily."
    },
    metrics: [
        {
            id: "throughput",
            label: "Events Processed Daily",
            value: "50M+",
            description: "Built and supported <span class=\"text-[#06b6d4]\">high-throughput data systems</span> designed for large-scale event ingestion and downstream analytics.",
            iconName: "TrendingUp",
            color: "hsl(var(--foreground))" // Cyan
        },
        {
            id: "refresh",
            label: "Warehouse Refresh",
            value: "<5min",
            description: "Designed <span class=\"text-[#10b981]\">near real-time warehouse refresh</span> patterns for faster reporting and operational visibility.",
            iconName: "Zap",
            color: "hsl(var(--foreground))" // Emerald
        },
        {
            id: "uptime",
            label: "Pipeline Uptime",
            value: "99.9%",
            description: "Focused on <span class=\"text-[#a855f7]\">resilient pipeline design</span>, monitoring, retries, and production reliability.",
            iconName: "Award",
            color: "hsl(var(--foreground))" // Purple
        },
        {
            id: "latency",
            label: "Latency Improvement",
            value: "hrs→sec",
            description: "Reduced <span class=\"text-[#ef4444]\">reporting and data movement delays</span> through better pipeline architecture and automation.",
            iconName: "Target",
            color: "hsl(var(--foreground))" // Red
        },
        {
            id: "accuracy",
            label: "Data Accuracy",
            value: "60→98%",
            description: "Improved <span class=\"text-[#eab308]\">data quality and consistency</span> through stronger transformation logic and validation patterns.",
            iconName: "Target",
            color: "hsl(var(--foreground))" // Yellow
        }
    ],
    ui: {
        carousel: {
            sectionTitle: "Impact & Results",
            sectionDescription: "See the measurable difference",
            accentColor: "hsl(var(--foreground))" // Purple
        },
        cta: {
            label: "See Project Case Studies",
            href: "#experience"
        }
    }
};
