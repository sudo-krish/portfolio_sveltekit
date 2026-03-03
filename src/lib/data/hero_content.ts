// src/lib/data/hero_content.ts

export type HeroContent = {
    identity: {
        sectionTitle: string;
        sectionDescription: string;
    };

    headline: {
        prefix: string; // "DATA"
        suffix: string; // "ENGINEER"
        metaLabelMobile: string;
        metaLabelDesktop: string;
    };

    bioCard: {
        metaLabel: string;
        metaTitle: string;
        main: string;
        details: string;
    };

    marquee: {
        payloadLabel: string;
    };

    actionDock: {
        cta: string;
        ctaDesktop: string;
        links: {
            github: string;
            linkedin: string;
            resume: string;
        };
    };
};

export const heroContent: HeroContent = {
    identity: {
        sectionTitle: "Senior Data Engineer",
        sectionDescription: "Krishnanand Anil - Real-Time Data Architect",
    },

    headline: {
        prefix: "DATA",
        suffix: "ENGINEER",
        metaLabelMobile: "Sr. Engineer",
        metaLabelDesktop: "Senior Data Engineer",
    },

    bioCard: {
        metaLabel: "Cloud & Data Architecture",
        metaTitle: "Senior Data Engineer & AWS Specialist",
        main:
            "I architect and deploy enterprise-grade data pipelines and real-time streaming systems that process 50M+ events daily with sub-second latency.",
        details:
            "Specializing in AWS Cloud architecture, Apache Kafka, and Change Data Capture (CDC), I transform petabyte-scale data into AI-ready intelligence, driving 99% latency reduction and scalability for modern businesses.",
    },

    marquee: {
        payloadLabel: "Tech Stack",
    },

    actionDock: {
        cta: "Hire Me",
        ctaDesktop: "Connect & Deploy",
        links: {
            linkedin: "https://www.linkedin.com/in/krishnanand-anil/",
            github: "https://github.com/sudo-krish",
            resume:
                "https://drive.google.com/file/d/1lkamX2hfp25wsLecHgEStbYD7-1ZEMwv/view?usp=drive_link",
        },
    },
};
