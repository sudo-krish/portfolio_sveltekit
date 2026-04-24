// src/lib/data/coding_stats.ts

export const codingStatsData = {
    leftAnchor: {
        label: "DEVELOPER RESILIENCE & ACTIVITY",
        title: "Coding\nMetrics.",
        description: "A real-time look into my open-source contributions, daily commits, and algorithmic problem-solving progress."
    },
    github: {
        title: "GitHub",
        subtitle: "Building Scalable Data Systems in the Open",
        accent: "#22c55e", // GitHub Green
    },
    leetcode: {
        title: "LeetCode",
        subtitle: "Algorithmic Problem Solving",
        accent: "#ffa116", // LeetCode Orange
    },
    // Add this new section for the bottom philosophy card
    philosophy: {
        shortDescription: `My engineering philosophy is defined by <strong class="text-foreground font-medium">continuous growth, systemic resilience,</strong> and execution at scale.`,
        detailedPhilosophy: `I maintain a rigorous focus on <span class="text-warning font-medium">Data Structures and Algorithms (DSA)</span> via LeetCode to ensure my core engineering fundamentals—from performance tuning to optimized complexity—remain razor-sharp. Simultaneously, I channel my creativity into <span class="text-success font-medium">data engineering & systems architecture</span> on GitHub. I build and document real-world projects involving modern cloud data warehouses, real-time message brokers like Kafka, data lakes, and robust ETL/ELT pipelines capable of handling massive throughput.`
    },
    ui: {
        carousel: {
            sectionTitle: "Engineering Metrics",
            sectionDescription: "Real-time activity across algorithmic problem solving and open-source systems architecture",
            accentColor: "hsl(var(--primary))"
        },
        cta: {
            label: "View Repositories",
            href: "https://github.com/sudo-krish"
        }
    }
};
