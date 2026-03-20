// src/lib/types/section.ts
// Shared type for section content used by SectionPage.svelte and individual section data files.

export interface SectionContent {
    id: string;
    slug: string;
    seoTitle: string;
    seoDescription: string;
    seoKeywords: string[];
    headline: string;
    subHeadline: string;
    introParagraph: string;
    paragraphs: string[];
    highlights: { label: string; value: string; description: string }[];
    ctaLabel: string;
    ctaSlug: string;
    detailSections: {
        title: string;
        content: string;
        bullets?: string[];
    }[];
}
