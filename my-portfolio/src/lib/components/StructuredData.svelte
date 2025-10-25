<script lang="ts">
  import { portfolioData } from '$lib/data/portfolio-data';
  
  export let type: 'Person' | 'BlogPosting' | 'Project' | 'WebSite' | 'BreadcrumbList' | 'Organization' = 'Person';
  export let data: any = {};
  
  // Get default data from centralized store
  const defaults = {
    personal: portfolioData.personal,
    company: portfolioData.companies.find(c => c.current),
    education: portfolioData.education[0],
    certifications: portfolioData.certifications
  };
  
  // Person Schema (for homepage/about)
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": data.name || defaults.personal.name,
    "jobTitle": data.jobTitle || defaults.personal.jobTitle,
    "url": data.url || defaults.personal.website,
    "image": data.image || `${defaults.personal.website}${defaults.personal.profileImage}`,
    "email": data.email || defaults.personal.email,
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
      defaults.personal.socialLinks.instagram
    ].filter(Boolean),
    "description": data.description || defaults.personal.bio,
    "knowsAbout": data.skills || defaults.personal.skills,
    "alumniOf": data.education ? {
      "@type": "EducationalOrganization",
      "name": data.education.university,
      "url": data.education.url
    } : {
      "@type": "EducationalOrganization",
      "name": defaults.education.university,
      "url": defaults.education.url
    },
    "worksFor": data.company ? {
      "@type": "Organization",
      "name": data.company.name,
      "url": data.company.url
    } : defaults.company ? {
      "@type": "Organization",
      "name": defaults.company.name,
      "url": defaults.company.url
    } : undefined,
    "award": data.awards,
    "hasCredential": data.certifications ? data.certifications.map((cert: any) => ({
      "@type": "EducationalOccupationalCredential",
      "name": cert.name,
      "credentialCategory": cert.category,
      "url": cert.url
    })) : defaults.certifications.map(cert => ({
      "@type": "EducationalOccupationalCredential",
      "name": cert.name,
      "credentialCategory": cert.category,
      "url": cert.url
    }))
  };
  
  // Blog Post Schema
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": data.title,
    "description": data.description,
    "image": data.image || `${defaults.personal.website}/og-image.jpg`,
    "url": data.url,
    "datePublished": data.datePublished,
    "dateModified": data.dateModified || data.datePublished,
    "author": {
      "@type": "Person",
      "name": data.author || defaults.personal.name,
      "url": data.authorUrl || defaults.personal.website
    },
    "publisher": {
      "@type": "Person",
      "name": data.author || defaults.personal.name,
      "url": data.authorUrl || defaults.personal.website
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": data.url
    },
    "keywords": data.keywords || [],
    "articleSection": data.category,
    "wordCount": data.wordCount,
    "inLanguage": "en-US"
  };
  
  // Project/Software Schema
  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    "name": data.name,
    "description": data.description,
    "url": data.url,
    "codeRepository": data.repository,
    "programmingLanguage": Array.isArray(data.languages) 
      ? data.languages.map((lang: string) => ({
          "@type": "ComputerLanguage",
          "name": lang
        }))
      : data.languages,
    "runtimePlatform": data.platforms,
    "author": {
      "@type": "Person",
      "name": data.author || defaults.personal.name,
      "url": data.authorUrl || defaults.personal.website
    },
    "dateCreated": data.dateCreated,
    "dateModified": data.dateModified,
    "license": data.license,
    "keywords": data.keywords || []
  };
  
  // WebSite Schema (for homepage)
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": data.name || `${defaults.personal.name} - ${defaults.personal.jobTitle} Portfolio`,
    "url": data.url || defaults.personal.website,
    "description": data.description || defaults.personal.bio,
    "author": {
      "@type": "Person",
      "name": data.author || defaults.personal.name,
      "jobTitle": defaults.personal.jobTitle,
      "worksFor": defaults.company ? {
        "@type": "Organization",
        "name": defaults.company.name
      } : undefined
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${data.url || defaults.personal.website}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "inLanguage": "en-US"
  };
  
  // BreadcrumbList Schema (for navigation)
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
  
  // Organization Schema (optional)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": data.name,
    "url": data.url,
    "logo": data.logo,
    "description": data.description,
    "founder": {
      "@type": "Person",
      "name": data.founder || defaults.personal.name
    },
    "sameAs": data.socialLinks || [
      defaults.personal.socialLinks.linkedin,
      defaults.personal.socialLinks.github,
      defaults.personal.socialLinks.instagram
    ].filter(Boolean)
  };
  
  const schemas = {
    Person: personSchema,
    BlogPosting: blogSchema,
    Project: projectSchema,
    WebSite: websiteSchema,
    BreadcrumbList: breadcrumbSchema,
    Organization: organizationSchema
  };
  
  const schema = schemas[type];
</script>

<svelte:head>
  {@html `<script type="application/ld+json">${JSON.stringify(schema, null, 2)}<\/script>`}
</svelte:head>
