// src/lib/data/credentials-content.ts
import type { SectionContent } from "$lib/types/section";

export const credentialsSectionContent: SectionContent = {
    id: "credentials",
    slug: "/credentials",
    seoTitle: "AWS Certifications and Cloud Foundations | Krishnanand Anil",
    seoDescription: "AWS Certified Solutions Architect – Associate, AWS Cloud Practitioner, M.Tech Data Science from BITS Pilani, and published research.",
    seoKeywords: [
        "aws certified solutions architect", "aws cloud practitioner", "data engineer certifications",
        "bits pilani data science", "cloud certifications india", "published researcher data engineer",
    ],
    headline: "AWS Certifications and Foundations",
    subHeadline: "Certifications That Support Real Work",
    introParagraph: "My AWS certifications strengthen the cloud architecture, platform design, and delivery practices I apply in real data engineering work.",
    paragraphs: [
        "I hold the AWS Certified Solutions Architect – Associate certification, validating my expertise in designing distributed systems, implementing fault-tolerant architectures, and optimizing cost-effective solutions on Amazon Web Services.",
        "My academic foundation includes a Master of Technology (M.Tech) in Data Science & Engineering from BITS Pilani, one of India's premier engineering institutions.",
        "Beyond certifications and education, I have contributed to the research community with peer-reviewed publications in international journals.",
    ],
    highlights: [
        { label: "AWS Certifications", value: "2", description: "Solutions Architect Associate + Cloud Practitioner" },
        { label: "Education", value: "M.Tech", description: "Data Science & Engineering, BITS Pilani" },
        { label: "Research Papers", value: "2", description: "Published in IOP Journal and International Journal" },
        { label: "Continuous Learning", value: "Active", description: "Pursuing advanced AWS and data engineering certifications" },
    ],
    ctaLabel: "View All Credentials",
    ctaSlug: "/credentials",
    detailSections: [
        {
            title: "AWS Certifications",
            content: "Amazon Web Services certifications validate cloud architecture expertise through rigorous, scenario-based examinations.",
            bullets: [
                "AWS Certified Solutions Architect – Associate: Designing resilient, high-performing, secure, and cost-optimized architectures on AWS",
                "AWS Certified Cloud Practitioner: Foundational understanding of AWS cloud concepts, services, security, and pricing models",
            ],
        },
        {
            title: "Education",
            content: "BITS Pilani is one of India's top engineering universities, known for its demanding curriculum.",
            bullets: [
                "Master of Technology (M.Tech) in Data Science & Engineering — BITS Pilani",
                "Bachelor of Engineering (B.E.) in Mechanical Engineering — Amrita Vishwa Vidyapeetham",
            ],
        },
        {
            title: "Published Research",
            content: "Peer-reviewed research publications demonstrate analytical rigor and the ability to contribute original knowledge.",
            bullets: [
                "\"Design and Control of an Automated SCARA Robotic Arm with a Pneumatic Soft Gripper\" — IOP Journal of Physics (2021)",
                "\"Estimation of Vehicular Emissions of Major Districts in Kerala\" — International Journal (2020)",
            ],
        },
    ],
};

export const education = [
    {
        university: "Birla Institute of Technology and Science, Pilani",
        url: "https://www.bits-pilani.ac.in/",
        degree: "Master of Technology (M.Tech)",
        field: "Data Science & Engineering",
        graduationYear: "2024",
        location: "Bengaluru/Pilani, India",
        gpa: ""
    },
    {
        university: "Amrita Vishwa Vidyapeetham",
        url: "https://www.amrita.edu/",
        degree: "Bachelor of Engineering (B.E.)",
        field: "Mechanical Engineering",
        graduationYear: "2020",
        location: "Kollam, Kerala, India",
        gpa: "7.5/10.0"
    }
];

export const certifications = [
    {
        name: "AWS Certified Solutions Architect – Associate",
        category: "Cloud",
        url: "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
        issuer: "Amazon Web Services",
        dateIssued: "2023"
    },
    {
        name: "AWS Certified Cloud Practitioner",
        category: "Cloud",
        url: "https://aws.amazon.com/certification/certified-cloud-practitioner/",
        issuer: "Amazon Web Services",
        dateIssued: "2022"
    },
    {
        name: "Fundamentals of the Databricks Lakehouse Platform Accreditation (V2)",
        category: "Big Data",
        url: "https://www.databricks.com/learn/certification",
        issuer: "Databricks",
        dateIssued: "2024"
    },
    {
        name: "Spark and Python for Big Data with PySpark",
        category: "Big Data",
        url: "https://www.udemy.com/",
        issuer: "Udemy",
        dateIssued: "2022"
    }
];

export const getEducation = () => education;
export const getCertifications = () => certifications;
