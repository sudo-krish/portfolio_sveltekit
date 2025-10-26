<script lang="ts">
  import { portfolioData } from '$lib/data/portfolio-data';
  
  export let type: 'Person' | 'BlogPosting' | 'Project' | 'WebSite' | 'BreadcrumbList' | 'Organization' | 'ProfessionalService' = 'Person';
  export let data: any = {};
  
  // Get default data from centralized store
  const defaults = {
    personal: portfolioData.personal,
    company: portfolioData.companies.find(c => c.current),
    education: portfolioData.education[0],
    certifications: portfolioData.certifications,
    researchPapers: portfolioData.researchPapers || []
  };
  
  // Enhanced Person Schema with comprehensive details
  const personSchema = {
    "@context": "https://schema.org",
    "@type": ["Person", "ProfilePage"],
    "name": data.name || defaults.personal.name,
    "givenName": "Krishnanand",
    "familyName": "Anil",
    "jobTitle": data.jobTitle || defaults.personal.jobTitle,
    "url": data.url || defaults.personal.website,
    "image": {
      "@type": "ImageObject",
      "url": data.image || `${defaults.personal.website}${defaults.personal.profileImage}`,
      "contentUrl": data.image || `${defaults.personal.website}${defaults.personal.profileImage}`,
      "caption": `${defaults.personal.name} - ${defaults.personal.jobTitle}`
    },
    "email": `mailto:${data.email || defaults.personal.email}`,
    "telephone": data.telephone || defaults.personal.phone,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": data.address?.city || defaults.personal.address.city,
      "addressRegion": data.address?.state || defaults.personal.address.state,
      "addressCountry": data.address?.country || defaults.personal.address.country
    },
    "sameAs": data.socialLinks || [
      defaults.personal.socialLinks.linkedin,
      defaults.personal.socialLinks.github,
      defaults.personal.socialLinks.instagram,
      defaults.personal.website
    ].filter(Boolean),
    "description": data.description || defaults.personal.bio,
    "knowsAbout": data.skills || defaults.personal.skills.slice(0, 20), // Limit for performance
    "knowsLanguage": ["English", "Hindi"],
    "nationality": {
      "@type": "Country",
      "name": "India"
    },
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": defaults.education.university,
      "url": defaults.education.url,
      "location": {
        "@type": "Place",
        "name": defaults.education.location
      }
    },
    "worksFor": defaults.company ? {
      "@type": "Organization",
      "name": defaults.company.name,
      "url": defaults.company.url,
      "description": defaults.company.description
    } : undefined,
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Senior Data Engineer",
      "occupationLocation": {
        "@type": "City",
        "name": "Bengaluru"
      },
      "estimatedSalary": {
        "@type": "MonetaryAmount",
        "currency": "INR",
        "value": {
          "@type": "QuantitativeValue",
          "minValue": 2000000,
          "maxValue": 5000000,
          "unitText": "YEAR"
        }
      },
      "skills": defaults.personal.topSkills.join(', ')
    },
    "award": defaults.personal.achievements || [],
    "hasCredential": defaults.certifications.map(cert => ({
      "@type": "EducationalOccupationalCredential",
      "name": cert.name,
      "credentialCategory": cert.category,
      "url": cert.url,
      "recognizedBy": {
        "@type": "Organization",
        "name": cert.issuer
      },
      "dateCreated": cert.dateIssued
    })),
    "performerIn": defaults.researchPapers.map(paper => ({
      "@type": "ScholarlyArticle",
      "name": paper.title,
      "url": paper.url,
      "datePublished": paper.datePublished,
      "author": {
        "@type": "Person",
        "name": defaults.personal.name
      },
      "publisher": {
        "@type": "Organization",
        "name": paper.journal
      }
    })),
    "seeks": {
      "@type": "Demand",
      "name": "Data Engineering Opportunities",
      "description": "Open to consulting and full-time senior data engineering roles"
    }
  };
  
  // Enhanced Blog Post Schema with extensive metadata
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": data.title,
    "alternativeHeadline": data.description,
    "description": data.description,
    "image": {
      "@type": "ImageObject",
      "url": data.image || `${defaults.personal.website}/og-image.jpg`,
      "width": 1200,
      "height": 630
    },
    "url": data.url,
    "datePublished": data.datePublished,
    "dateModified": data.dateModified || data.datePublished,
    "author": {
      "@type": "Person",
      "name": data.author || defaults.personal.name,
      "url": data.authorUrl || defaults.personal.website,
      "jobTitle": defaults.personal.jobTitle,
      "sameAs": [
        defaults.personal.socialLinks.linkedin,
        defaults.personal.socialLinks.github
      ]
    },
    "publisher": {
      "@type": "Person",
      "name": data.author || defaults.personal.name,
      "url": data.authorUrl || defaults.personal.website,
      "logo": {
        "@type": "ImageObject",
        "url": `${defaults.personal.website}${defaults.personal.profileImage}`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": data.url
    },
    "keywords": data.keywords?.join(', ') || '',
    "articleSection": data.category,
    "wordCount": data.wordCount,
    "inLanguage": "en-US",
    "about": {
      "@type": "Thing",
      "name": data.category
    },
    "audience": {
      "@type": "Audience",
      "audienceType": "Data Engineers, Software Developers, Cloud Architects"
    },
    "timeRequired": data.readTime,
    "isAccessibleForFree": true
  };
  
  // Enhanced Project/Software Schema with detailed metadata
  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    "name": data.name,
    "description": data.longDescription || data.description,
    "abstract": data.description,
    "url": data.url || `${defaults.personal.website}/projects/${data.id}`,
    "codeRepository": data.repository,
    "programmingLanguage": Array.isArray(data.languages) 
      ? data.languages.map((lang: string) => ({
          "@type": "ComputerLanguage",
          "name": lang
        }))
      : [],
    "runtimePlatform": data.platforms || [],
    "targetProduct": {
      "@type": "SoftwareApplication",
      "name": data.name,
      "applicationCategory": "DataEngineering",
      "operatingSystem": "Cross-platform"
    },
    "author": {
      "@type": "Person",
      "name": defaults.personal.name,
      "url": defaults.personal.website,
      "jobTitle": defaults.personal.jobTitle
    },
    "creator": {
      "@type": "Person",
      "name": defaults.personal.name
    },
    "dateCreated": data.dateCreated,
    "dateModified": data.dateModified || data.dateCreated,
    "license": data.license,
    "keywords": data.keywords?.join(', ') || '',
    "isAccessibleForFree": data.repository ? true : false,
    "audience": {
      "@type": "Audience",
      "audienceType": "Data Engineers, Developers, DevOps Engineers"
    },
    "image": {
      "@type": "ImageObject",
      "url": data.image || `${defaults.personal.website}/og-image.jpg`
    },
    "offers": data.metrics ? {
      "@type": "Offer",
      "description": `Processes ${data.metrics.eventsPerDay || 'millions'} of events with ${data.metrics.latencyReduction || 'high'} performance`
    } : undefined
  };
  
  // Enhanced WebSite Schema with comprehensive details
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": data.name || `${defaults.personal.name} - Portfolio`,
    "alternateName": `${defaults.personal.name} - Senior Data Engineer`,
    "url": data.url || defaults.personal.website,
    "description": data.description || defaults.personal.bio,
    "inLanguage": "en-US",
    "isAccessibleForFree": true,
    "author": {
      "@type": "Person",
      "name": defaults.personal.name,
      "jobTitle": defaults.personal.jobTitle,
      "worksFor": defaults.company ? {
        "@type": "Organization",
        "name": defaults.company.name
      } : undefined,
      "sameAs": [
        defaults.personal.socialLinks.linkedin,
        defaults.personal.socialLinks.github
      ]
    },
    "creator": {
      "@type": "Person",
      "name": defaults.personal.name
    },
    "publisher": {
      "@type": "Person",
      "name": defaults.personal.name
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${data.url || defaults.personal.website}/#search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "mainEntity": {
      "@type": "Person",
      "name": defaults.personal.name,
      "url": defaults.personal.website
    },
    "about": {
      "@type": "Thing",
      "name": "Data Engineering Portfolio",
      "description": "Real-time data pipelines, AWS cloud architecture, and enterprise data solutions"
    },
    "keywords": defaults.personal.topSkills.join(', ')
  };
  
  // BreadcrumbList Schema (unchanged)
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": data.items ? data.items.map((item: any, index: number) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    })) : []
  };
  
  // Enhanced Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": data.name,
    "url": data.url,
    "logo": {
      "@type": "ImageObject",
      "url": data.logo || `${defaults.personal.website}/icons/icon-512x512.png`
    },
    "description": data.description,
    "founder": {
      "@type": "Person",
      "name": data.founder || defaults.personal.name
    },
    "sameAs": data.socialLinks || [
      defaults.personal.socialLinks.linkedin,
      defaults.personal.socialLinks.github,
      defaults.personal.socialLinks.instagram
    ].filter(Boolean),
    "contactPoint": {
      "@type": "ContactPoint",
      "email": defaults.personal.email,
      "contactType": "Business Inquiries"
    }
  };
  
  // NEW: ProfessionalService Schema for consulting/services
  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": `${defaults.personal.name} - Data Engineering Consulting`,
    "description": "Expert data engineering consulting services specializing in real-time data pipelines, AWS cloud architecture, and enterprise data solutions",
    "url": defaults.personal.website,
    "priceRange": "$$$$",
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "provider": {
      "@type": "Person",
      "name": defaults.personal.name,
      "jobTitle": defaults.personal.jobTitle
    },
    "serviceType": "Data Engineering Consulting",
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": `${defaults.personal.website}/#contact`
    }
  };
  
  const schemas = {
    Person: personSchema,
    BlogPosting: blogSchema,
    Project: projectSchema,
    WebSite: websiteSchema,
    BreadcrumbList: breadcrumbSchema,
    Organization: organizationSchema,
    ProfessionalService: professionalServiceSchema
  };
  
  const schema = schemas[type];
</script>

<svelte:head>
  {@html `<script type="application/ld+json">${JSON.stringify(schema, null, 2)}<\/script>`}
</svelte:head>
