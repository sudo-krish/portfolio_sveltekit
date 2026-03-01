<!-- src/lib/components/StructuredData.svelte -->
<script lang="ts">
  import { portfolioData } from '$lib/data/portfolio-data';
  
  export let type: 'Person' | 'BlogPosting' | 'Project' | 'WebSite' | 'BreadcrumbList' | 'Organization' | 'ProfessionalService' = 'Person';
  export let data: any = {};
  
  const defaults = {
    personal: portfolioData.personal,
    company: portfolioData.companies?.find(c => c.current),
    education: portfolioData.education?.[0],
    certifications: portfolioData.certifications || [],
    researchPapers: portfolioData.researchPapers || []
  };
  
  function cleanObject(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.filter(item => item != null).map(cleanObject);
    }
    if (obj && typeof obj === 'object') {
      return Object.fromEntries(
        Object.entries(obj)
          .filter(([_, v]) => v != null && v !== undefined && v !== '')
          .map(([k, v]) => [k, cleanObject(v)])
      );
    }
    return obj;
  }
  
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": defaults.personal?.website || "https://krishnanandanil.com"
    },
    "name": defaults.personal?.name || "Krishnanand Anil",
    "givenName": "Krishnanand",
    "familyName": "Anil",
    "jobTitle": defaults.personal?.jobTitle || "Senior Data Engineer",
    "url": defaults.personal?.website || "https://krishnanandanil.com",
    "image": {
      "@type": "ImageObject",
      "url": `${defaults.personal?.website || 'https://krishnanandanil.com'}${defaults.personal?.profileImage || '/profile.jpg'}`,
      "contentUrl": `${defaults.personal?.website || 'https://krishnanandanil.com'}${defaults.personal?.profileImage || '/profile.jpg'}`,
      "caption": `${defaults.personal?.name || 'Krishnanand Anil'} - ${defaults.personal?.jobTitle || 'Senior Data Engineer'}`
    },
    "email": defaults.personal?.email,
    "telephone": defaults.personal?.phone,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": defaults.personal?.address?.city || "Bengaluru",
      "addressRegion": defaults.personal?.address?.state || "Karnataka",
      "addressCountry": "India"
    },
    "sameAs": [
      defaults.personal?.socialLinks?.linkedin,
      defaults.personal?.socialLinks?.github,
      defaults.personal?.socialLinks?.instagram,
      defaults.personal?.website
    ].filter(Boolean),
    "description": defaults.personal?.bio || "",
    "knowsAbout": defaults.personal?.skills?.slice(0, 20) || [],
    "knowsLanguage": [
      { "@type": "Language", "name": "English" },
      { "@type": "Language", "name": "Hindi" }
    ],
    "nationality": {
      "@type": "Country",
      "name": "India"
    },
    "alumniOf": defaults.education ? {
      "@type": "EducationalOrganization",
      "name": defaults.education.university,
      "url": defaults.education.url,
      "location": {
        "@type": "Place",
        "name": defaults.education.location
      }
    } : undefined,
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
        "name": defaults.personal?.address?.city || "Bengaluru"
      },
      "skills": defaults.personal?.topSkills?.join(', ') || ''
    },
    "hasCredential": defaults.certifications.slice(0, 5).map(cert => ({
      "@type": "EducationalOccupationalCredential",
      "name": cert.name,
      "credentialCategory": cert.category,
      "url": cert.url,
      "recognizedBy": {
        "@type": "Organization",
        "name": cert.issuer
      },
      "dateCreated": cert.dateIssued
    }))
  };
  
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": data.title,
    "alternativeHeadline": data.description,
    "description": data.description,
    "image": {
      "@type": "ImageObject",
      "url": data.image || `${defaults.personal?.website}/og-image.jpg`,
      "width": 1200,
      "height": 630
    },
    "url": data.url,
    "datePublished": data.datePublished,
    "dateModified": data.dateModified || data.datePublished,
    "author": {
      "@type": "Person",
      "name": data.author || defaults.personal?.name,
      "url": data.authorUrl || defaults.personal?.website,
      "jobTitle": defaults.personal?.jobTitle
    },
    "publisher": {
      "@type": "Person",
      "name": data.author || defaults.personal?.name,
      "url": data.authorUrl || defaults.personal?.website,
      "logo": {
        "@type": "ImageObject",
        "url": `${defaults.personal?.website}${defaults.personal?.profileImage}`
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
    "isAccessibleForFree": true
  };
  
  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    "name": data.name,
    "description": data.longDescription || data.description,
    "abstract": data.description,
    "url": data.url || `${defaults.personal?.website}/projects/${data.id}`,
    "codeRepository": data.repository,
    "programmingLanguage": Array.isArray(data.languages) 
      ? data.languages.map((lang: string) => ({
          "@type": "ComputerLanguage",
          "name": lang
        }))
      : [],
    "runtimePlatform": data.platforms || [],
    "author": {
      "@type": "Person",
      "name": defaults.personal?.name,
      "url": defaults.personal?.website
    },
    "dateCreated": data.dateCreated,
    "dateModified": data.dateModified || data.dateCreated,
    "license": data.license,
    "keywords": data.keywords?.join(', ') || '',
    "isAccessibleForFree": data.repository ? true : false,
    "image": {
      "@type": "ImageObject",
      "url": data.image || `${defaults.personal?.website}/og-image.jpg`
    }
  };
  
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": `${defaults.personal?.name || 'Krishnanand Anil'} - Portfolio`,
    "alternateName": `${defaults.personal?.name || 'Krishnanand Anil'} - Senior Data Engineer`,
    "url": defaults.personal?.website || "https://krishnanandanil.com",
    "description": defaults.personal?.bio || "",
    "inLanguage": "en-US",
    "isAccessibleForFree": true,
    "author": {
      "@type": "Person",
      "name": defaults.personal?.name,
      "jobTitle": defaults.personal?.jobTitle
    },
    "creator": {
      "@type": "Person",
      "name": defaults.personal?.name
    },
    "publisher": {
      "@type": "Person",
      "name": defaults.personal?.name
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${defaults.personal?.website || 'https://krishnanandanil.com'}/?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
  
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
  
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": data.name || "Organization",
    "url": data.url || defaults.personal?.website,
    "logo": {
      "@type": "ImageObject",
      "url": data.logo || `${defaults.personal?.website}/og-image.jpg`
    },
    "description": data.description || "",
    "founder": {
      "@type": "Person",
      "name": data.founder || defaults.personal?.name
    },
    "sameAs": data.socialLinks || [
      defaults.personal?.socialLinks?.linkedin,
      defaults.personal?.socialLinks?.github
    ].filter(Boolean),
    "contactPoint": {
      "@type": "ContactPoint",
      "email": defaults.personal?.email,
      "contactType": "Business Inquiries"
    }
  };
  
  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": `${defaults.personal?.name || 'Krishnanand Anil'} - Data Engineering Consulting`,
    "description": "Expert data engineering consulting services specializing in real-time data pipelines and AWS cloud architecture",
    "url": defaults.personal?.website || "https://krishnanandanil.com",
    "priceRange": "$$$$",
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "provider": {
      "@type": "Person",
      "name": defaults.personal?.name,
      "jobTitle": defaults.personal?.jobTitle
    },
    "serviceType": "Data Engineering Consulting"
  };
  
  const schemas: Record<string, any> = {
    Person: personSchema,
    BlogPosting: blogSchema,
    Project: projectSchema,
    WebSite: websiteSchema,
    BreadcrumbList: breadcrumbSchema,
    Organization: organizationSchema,
    ProfessionalService: professionalServiceSchema
  };
  
  const rawSchema = schemas[type] || {};
  const cleanedSchema = cleanObject(rawSchema);
  const hasMinimalContent = cleanedSchema && Object.keys(cleanedSchema).length > 2;
  
  const jsonLdScript = hasMinimalContent 
    ? `<script type="application/ld+json">${JSON.stringify(cleanedSchema)}<\/script>`
    : '';
</script>

<svelte:head>
  {@html jsonLdScript}
</svelte:head>
