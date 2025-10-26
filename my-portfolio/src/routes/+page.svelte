<!-- src/routes/+page.svelte -->
<script lang="ts">
  import HeroSection from '$lib/components/home/HeroSection.svelte';
  import MetricsGrid from '$lib/components/home/MetricsGrid.svelte';
  import FeaturedProjects from '$lib/components/home/FeaturedProjects.svelte';
  import TechStack from '$lib/components/home/TechStack.svelte';
  import ContactCTA from '$lib/components/home/ContactCTA.svelte';
  
  // SEO data
  const siteUrl = 'https://krishnanandanil.com';
  const title = 'Krishnanand Anil - Senior Data Engineer | AWS Cloud Expert';
  const description = 'Senior Data Engineer with 5+ years of experience in AWS Cloud, Redshift, and scalable data pipelines. Building enterprise-grade data solutions at DTDC Express Limited.';
  const ogImage = `${siteUrl}/og-image.jpg`;
</script>

<svelte:head>
  <!-- Primary Meta Tags -->
  <title>{title}</title>
  <meta name="title" content={title} />
  <meta name="description" content={description} />
  <meta name="keywords" content="Data Engineer, AWS, Redshift, Apache Spark, ETL Pipelines, Cloud Engineering, Python, SQL, Data Warehousing, Real-time Processing, Krishnanand Anil, DTDC Express, Kochi India" />
  <meta name="author" content="Krishnanand Anil" />
  <link rel="canonical" href={siteUrl} />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={siteUrl} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={ogImage} />
  <meta property="og:image:alt" content="Krishnanand Anil - Data Engineer Portfolio" />
  <meta property="og:site_name" content="Krishnanand Anil Portfolio" />
  <meta property="og:locale" content="en_US" />
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content={siteUrl} />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={ogImage} />
  <meta name="twitter:creator" content="@krishnanand_a" />
  
  <!-- Additional SEO Tags -->
  <meta name="robots" content="index, follow" />
  <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
  <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
  
  <!-- Structured Data / JSON-LD -->
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Krishnanand Anil",
      "jobTitle": "Senior Data Engineer",
      "description": description,
      "url": siteUrl,
      "image": ogImage,
      "sameAs": [
        "https://linkedin.com/in/krishnanandanil",
        "https://github.com/krishnanandanil"
      ],
      "worksFor": {
        "@type": "Organization",
        "name": "DTDC Express Limited"
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Kochi",
        "addressRegion": "Kerala",
        "addressCountry": "IN"
      },
      "knowsAbout": [
        "AWS Cloud",
        "Amazon Redshift",
        "Apache Spark",
        "Data Engineering",
        "ETL Pipelines",
        "Python",
        "SQL",
        "Data Warehousing"
      ]
    })}
  </script>
</svelte:head>

<!-- Main Content with Semantic HTML -->
<main class="page">
  <!-- Hero Section -->
  <section id="hero" aria-label="Introduction">
    <HeroSection />
  </section>
  
  <!-- Metrics Section -->
  <section id="metrics" class="section" aria-label="Professional Metrics">
    <h2 class="sr-only">Professional Achievements and Metrics</h2>
    <MetricsGrid />
  </section>
  
  <!-- Projects Section -->
  <section id="projects" class="section" aria-label="Featured Projects">
    <h2 class="sr-only">Featured Data Engineering Projects</h2>
    <FeaturedProjects limit={6} />
  </section>
  
  <!-- Tech Stack Section -->
  <section id="tech-stack" class="section" aria-label="Technology Stack">
    <h2 class="sr-only">Technologies and Tools</h2>
    <TechStack />
  </section>
  
  <!-- Contact Section -->
  <section id="contact" class="section" aria-label="Contact Information">
    <h2 class="sr-only">Get in Touch</h2>
    <ContactCTA />
  </section>
</main>

<style>
  .page {
    min-height: 100vh;
    background: hsl(var(--background));
  }
  
  .section {
    max-width: 1400px;
    margin: 0 auto;
    padding: 4rem 2rem;
  }
  
  /* Screen reader only text for SEO */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
  
  @media (max-width: 768px) {
    .section {
      padding: 3rem 1.5rem;
    }
  }
</style>
