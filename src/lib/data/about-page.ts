// src/lib/data/about-page.ts
// Page-level content for /about — lightweight SEO shell. Gameplay is the primary experience.

export const aboutPageContent = {
    seo: {
        title: "About Krishnanand Anil | Senior Data Engineer and Interactive Profile",
        description: "Explore an interactive about page for Krishnanand Anil, a Senior Data Engineer focused on AWS, Kafka, Spark, warehousing, and scalable data systems.",
        keywords: "krishnanand anil about, data engineer about page, interactive portfolio, pokemon data engineer",
    },
    h1: "About Krishnanand Anil",
    introParagraph: "Explore an interactive profile experience to learn about my background in data engineering, cloud architecture, and production data systems.",
    backLabel: "Run Away",
    startButton: "START ENCOUNTER",
    instructionTitle: "SYSTEM ENCOUNTER",
    howToPlayTitle: "HOW TO PLAY:",
    instructions: [
        { emoji: "🎮", label: "Interact:", text: "Click the dialogue box at the bottom to advance the conversation." },
        { emoji: "⚔️", label: "Respond:", text: "When prompted, click 'RESPOND' to ask technical questions." },
        { emoji: "🎒", label: "Items:", text: "Unlocking good answers rewards you with 'Key Items' in your Bag." },
        { emoji: "🤝", label: "Goal:", text: "Whittle down his defenses and offer him a job!" },
    ],
    navLinks: [
        { href: "/experience", label: "View Experience" },
        { href: "/projects", label: "Explore Projects" },
        { href: "/articles", label: "Read Articles" },
        { href: "/learn", label: "Learn Data Engineering" },
        { href: "/github", label: "Browse GitHub" },
    ],
};
