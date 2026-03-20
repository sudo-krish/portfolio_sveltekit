// src/lib/data/leetcode-content.ts
import type { SectionContent } from "$lib/types/section";

export const leetcodeSectionContent: SectionContent = {
    id: "leetcode",
    slug: "/leetcode",
    seoTitle: "LeetCode and Problem Solving | Krishnanand Anil",
    seoDescription: "View Krishnanand Anil's problem-solving practice, coding profile, and algorithmic preparation relevant to software and data engineering roles.",
    seoKeywords: [
        "leetcode problem solving", "algorithms data structures", "competitive programming",
        "python leetcode solutions", "software engineer interviews", "data engineer problem solving",
    ],
    headline: "Problem Solving and LeetCode Practice",
    subHeadline: "Algorithmic Thinking for Data Engineering",
    introParagraph: "This page summarizes my coding practice, algorithmic thinking, and technical interview preparation. It provides context around consistency, problem-solving approach, and how this complements my production data engineering experience.",
    paragraphs: [
        "Data engineering at scale means even minor inefficiencies in data processing logic can manifest as significant performance bottlenecks or cloud cost overruns. A strong foundation in time and space complexity analysis helps me write robust transformations that scale elegantly.",
        "I regularly solve problems covering a wide range of algorithms and data structures, from dynamic programming and graph traversals to advanced tree manipulations and sliding window patterns.",
        "Below are my live statistics fetched dynamically from my LeetCode profile, reflecting my ongoing journey in algorithmic problem solving.",
    ],
    highlights: [
        { label: "Total Solved", value: "140+", description: "Problems solved across all difficulties" },
        { label: "Primary Language", value: "Python", description: "For rapid implementation and clarity" },
        { label: "Streak", value: "Active", description: "Consistent daily problem-solving" },
        { label: "Focus Areas", value: "Graphs", description: "Dynamic Programming, Trees, Arrays" },
    ],
    ctaLabel: "View LeetCode Profile",
    ctaSlug: "https://leetcode.com/user8673j",
    detailSections: [],
};
