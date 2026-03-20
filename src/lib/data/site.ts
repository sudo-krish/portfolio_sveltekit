// src/lib/data/site.ts
import { heroProfile } from "./hero_content";
import { personalContactInfo } from "./contact-content";
import { getAllCompanies } from "./experience";
import { education, certifications } from "./credentials-content";
import { researchPapers } from "./articles-page";

export const siteConfig = {
    name: "Krishnanand Anil",
    baseUrl: "https://krishnanandanil.com",
    avatar: "/profile.jpg",
    socialLinks: {
        linkedin: "https://www.linkedin.com/in/krishnanand-anil/",
        github: "https://github.com/sudo-krish",
        instagram: "https://www.instagram.com/krish12397/",
        twitter: ""
    }
};

export const personal = {
    ...siteConfig,
    ...heroProfile,
    ...personalContactInfo,
    website: siteConfig.baseUrl,
    profileImage: siteConfig.avatar,
    phone: "",
    skills: heroProfile.topSkills
};

export const siteDefaults = {
    siteTitle: `${siteConfig.name} - AWS Data Engineer & Cloud Expert`,
    defaultKeywords: heroProfile.topSkills.join(', '),
    website: siteConfig.baseUrl
};

export const schemaData = {
    companies: getAllCompanies(),
    education: education,
    certifications: certifications,
    researchPapers: researchPapers
};
