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
  
  // Computed values
  const fullTitle = title ? `${title} | ${defaults.siteTitle}` : defaults.siteTitle;
  const imageUrl = image.startsWith('http') ? image : `${defaults.website}${image}`;
  
  // Twitter handle extraction (if exists)
  const twitterHandle = defaults.personal.socialLinks.twitter 
    ? defaults.personal.socialLinks.twitter.split('/').pop() 
    : defaults.personal.name.toLowerCase().replace(/\s+/g, '');
</script>

<svelte:head>
  <!-- Basic Meta Tags -->
  <title>{fullTitle}</title>
  <meta name="description" content={description} />
  <meta name="keywords" content={keywords} />
  <meta name="author" content={author} />
  <link rel="canonical" href={canonical} />
  
  <!-- Robots Meta -->
  <meta name="robots" content="index, follow, max-image-preview:large, max-video-preview:-1" />
  <meta name="googlebot" content="index, follow" />
  
  <!-- Open Graph (Facebook, LinkedIn) -->
  <meta property="og:type" content={type} />
  <meta property="og:url" content={url} />
  <meta property="og:title" content={fullTitle} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={imageUrl} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:site_name" content={defaults.siteTitle} />
  <meta property="og:locale" content="en_US" />
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@{twitterHandle}" />
  <meta name="twitter:creator" content="@{twitterHandle}" />
  <meta name="twitter:title" content={fullTitle} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={imageUrl} />
  
  <!-- Additional SEO -->
  <meta name="language" content="English" />
  <meta name="revisit-after" content="7 days" />
  <meta http-equiv="content-type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <!-- Additional metadata for better indexing -->
  <meta name="geo.region" content="IN-KA" />
  <meta name="geo.placename" content={defaults.personal.address.city} />
  <meta name="geo.position" content="12.9716;77.5946" />
  <meta name="ICBM" content="12.9716, 77.5946" />
</svelte:head>
