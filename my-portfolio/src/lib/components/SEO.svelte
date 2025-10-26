<script lang="ts">
  import { portfolioData } from '$lib/data/portfolio-data';
  
  // Get default data from centralized store
  const defaults = {
    personal: portfolioData.personal,
    siteTitle: `${portfolioData.personal.name} - ${portfolioData.personal.jobTitle}`,
    defaultKeywords: portfolioData.personal.topSkills.join(', '),
    website: portfolioData.personal.website
  };
  
  // Props with defaults from centralized data
  export let title: string = '';
  export let description: string = defaults.personal.shortBio;
  export let url: string = defaults.website;
  export let image: string = '/og-image.jpg';
  export let type: string = 'website';
  export let author: string = defaults.personal.name;
  export let keywords: string = defaults.defaultKeywords;
  export let canonical: string = url;
  export let publishedTime: string = ''; // NEW: For articles
  export let modifiedTime: string = ''; // NEW: For updated content
  
  // Computed values
  const fullTitle = title ? `${title} | ${defaults.siteTitle}` : defaults.siteTitle;
  const imageUrl = image.startsWith('http') ? image : `${defaults.website}${image}`;
  
  // Twitter handle extraction (if exists)
  const twitterHandle = defaults.personal.socialLinks.twitter 
    ? defaults.personal.socialLinks.twitter.split('/').pop()?.replace('@', '')
    : 'krishnanandanil'; // Fallback handle
  
  // Ensure description doesn't exceed recommended length
  const truncatedDescription = description.length > 160 
    ? description.substring(0, 157) + '...' 
    : description;
</script>

<svelte:head>
  <!-- Basic Meta Tags -->
  <title>{fullTitle}</title>
  <meta name="description" content={truncatedDescription} />
  <meta name="keywords" content={keywords} />
  <meta name="author" content={author} />
  <link rel="canonical" href={canonical} />
  
  <!-- Robots Meta -->
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
  <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
  <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
  
  <!-- Open Graph (Facebook, LinkedIn) -->
  <meta property="og:type" content={type} />
  <meta property="og:url" content={url} />
  <meta property="og:title" content={fullTitle} />
  <meta property="og:description" content={truncatedDescription} />
  <meta property="og:image" content={imageUrl} />
  <meta property="og:image:secure_url" content={imageUrl} />
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content={fullTitle} />
  <meta property="og:site_name" content={defaults.siteTitle} />
  <meta property="og:locale" content="en_US" />
  
  {#if type === 'article' && publishedTime}
    <meta property="article:published_time" content={publishedTime} />
  {/if}
  {#if type === 'article' && modifiedTime}
    <meta property="article:modified_time" content={modifiedTime} />
  {/if}
  {#if type === 'article'}
    <meta property="article:author" content={author} />
    <meta property="article:section" content="Data Engineering" />
    <meta property="article:tag" content="Data Engineering" />
    <meta property="article:tag" content="AWS" />
    <meta property="article:tag" content="Apache Kafka" />
  {/if}
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@{twitterHandle}" />
  <meta name="twitter:creator" content="@{twitterHandle}" />
  <meta name="twitter:title" content={fullTitle} />
  <meta name="twitter:description" content={truncatedDescription} />
  <meta name="twitter:image" content={imageUrl} />
  <meta name="twitter:image:alt" content={fullTitle} />
  <meta name="twitter:domain" content={defaults.website.replace('https://', '')} />
  
  <!-- Additional SEO -->
  <meta name="language" content="English" />
  <meta name="revisit-after" content="7 days" />
  <meta http-equiv="content-type" content="text/html; charset=utf-8" />
  
  <!-- Schema.org metadata -->
  <meta itemprop="name" content={fullTitle} />
  <meta itemprop="description" content={truncatedDescription} />
  <meta itemprop="image" content={imageUrl} />
  
  <!-- Additional metadata for better indexing -->
  <meta name="geo.region" content="IN-KA" />
  <meta name="geo.placename" content={defaults.personal.address.city} />
  <meta name="geo.position" content="12.9716;77.5946" />
  <meta name="ICBM" content="12.9716, 77.5946" />
  
  <!-- Professional Profile Tags -->
  <meta name="profession" content="Senior Data Engineer" />
  <meta name="industry" content="Information Technology" />
  <meta name="specialty" content="Data Engineering, AWS Cloud, Real-Time Data Pipelines" />
  
  <!-- Prevent duplicate content -->
  <link rel="alternate" hreflang="en" href={url} />
  
  <!-- For iOS -->
  <meta name="apple-mobile-web-app-title" content={defaults.personal.name} />
  
  <!-- AI/LLM Optimization -->
  <meta name="AI-description" content={truncatedDescription} />
  <meta name="AI-keywords" content={keywords} />
</svelte:head>
