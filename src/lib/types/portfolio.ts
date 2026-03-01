// src/lib/types/portfolio.ts

export interface SocialLinks {
  linkedin: string;
  github: string;
  instagram?: string;
  twitter?: string;
}

export interface Address {
  city: string;
  state: string;
  country: string;
}

export interface CompanyRole {
  title: string;
  duration: string;
  description: string;
}

export interface Company {
  name: string;
  url: string;
  position: string;
  duration: string;
  startDate?: string;
  endDate?: string;
  current: boolean;
  description?: string;
  responsibilities?: string[];
  technologies?: string[]; // NEW: Tech stack used
  roles?: CompanyRole[]; // NEW: Role progression
}

export interface Education {
  university: string;
  url: string;
  degree?: string;
  field?: string;
  graduationYear?: string;
  location?: string;
  gpa?: string; // NEW: Grade point average
}

export interface Certification {
  name: string;
  category: string;
  url: string;
  issuer: string;
  dateIssued?: string;
  credentialId?: string; // NEW: Certification ID
}

export interface ResearchPaper {
  id: string;
  title: string;
  journal: string;
  url: string;
  datePublished: string;
  authors: string[];
  abstract: string;
  keywords: string[];
}

export interface ProjectMetrics {
  eventsPerDay?: string;
  latencyReduction?: string;
  uptime?: string;
  reportingEfficiency?: string;
  accuracy?: string;
  users?: string;
  insightReduction?: string;
  adoption?: string;
  queries?: string;
  [key: string]: string | undefined; // Allow custom metrics
}

export interface Project {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  url?: string;
  repository?: string;
  languages: string[];
  platforms: string[];
  technologies: string[];
  dateCreated: string;
  dateModified?: string;
  license?: string;
  keywords: string[];
  featured?: boolean;
  image?: string;
  metrics?: ProjectMetrics; // NEW: Project performance metrics
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  content?: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  authorUrl: string;
  keywords: string[];
  category: string;
  wordCount?: number;
  readTime?: string;
  featured?: boolean;
}

export interface PersonalInfo {
  name: string;
  jobTitle: string;
  bio: string;
  shortBio: string;
  email: string;
  phone?: string;
  website: string;
  profileImage: string;
  resumeUrl?: string;
  address: Address;
  socialLinks: SocialLinks;
  skills: string[];
  topSkills: string[];
  yearsOfExperience: number;
  achievements?: string[]; // NEW: Key achievements list
}

export interface PortfolioData {
  personal: PersonalInfo;
  companies: Company[];
  education: Education[];
  certifications: Certification[];
  projects: Project[];
  blogPosts: BlogPost[];
  researchPapers?: ResearchPaper[]; // NEW: Research publications
}

// Helper type for breadcrumb navigation
export interface Breadcrumb {
  name: string;
  url: string;
}

// Helper type for SEO metadata
export interface PageMetadata {
  title: string;
  description: string;
  type: string;
  keywords: string;
  image?: string;
  structuredDataTypes: string[];
  breadcrumbs?: Breadcrumb[];
  projectData?: Project;
  blogData?: BlogPost;
}
