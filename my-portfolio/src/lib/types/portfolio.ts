// Type definitions for your portfolio data

export interface SocialLinks {
  linkedin: string;
  github: string;
  instagram?: string;
  twitter?: string;
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
}

export interface Education {
  university: string;
  url: string;
  degree?: string;
  field?: string;
  graduationYear?: string;
  location?: string;
}

export interface Certification {
  name: string;
  category: string;
  url: string;
  issuer: string;
  dateIssued?: string;
}

export interface Address {
  city: string;
  state: string;
  country: string;
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
}

export interface PortfolioData {
  personal: PersonalInfo;
  companies: Company[];
  education: Education[];
  certifications: Certification[];
  projects: Project[];
  blogPosts: BlogPost[];
}
