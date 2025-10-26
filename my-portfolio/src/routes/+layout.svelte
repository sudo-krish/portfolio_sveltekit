<script lang="ts">
  import '../app.css';
  import SEO from '$lib/components/SEO.svelte';
  import StructuredData from '$lib/components/StructuredData.svelte';
  import PageWrapper from '$lib/components/PageWrapper.svelte';
  import { page } from '$app/stores';
  import { getPersonalInfo } from '$lib/data/portfolio-data';
  
  const personal = getPersonalInfo();
  
  // Reactive - automatically updates when page changes
  $: currentPath = $page.url.pathname;
  $: currentUrl = `${personal.website}${currentPath}`;
  
  // Auto-detect page type and generate appropriate metadata
  $: pageMetadata = generatePageMetadata(currentPath);
  
  function generatePageMetadata(path: string) {
    // Since it's a single-page app, everything is on homepage
    // Only homepage exists as a route
    if (path === '/') {
      return {
        title: `${personal.name} - Senior Data Engineer | AWS & Kafka Expert`,
        description: personal.bio,
        type: 'website',
        keywords: [
          ...personal.topSkills,
          'data engineering',
          'AWS',
          'Kafka',
          'real-time data pipelines',
          'Bengaluru',
          'senior data engineer',
          'Python',
          'Apache Kafka',
          'data warehouse',
          'CDC pipelines',
          '50M events daily'
        ].join(', '),
        image: personal.profileImage,
        structuredDataTypes: ['Person', 'WebSite']
      };
    }
    
    // Fallback for any other routes (shouldn't happen in SPA)
    return {
      title: `${personal.name} - Senior Data Engineer`,
      description: personal.shortBio,
      type: 'website',
      keywords: personal.topSkills.join(', '),
      image: personal.profileImage,
      structuredDataTypes: ['Person']
    };
  }
</script>

<svelte:head>
  <!-- Canonical URL -->
  <link rel="canonical" href={currentUrl} />
  
  <!-- Additional meta tags for social sharing -->
  <meta property="og:image" content={pageMetadata.image || `${personal.website}/og-image.jpg`} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content={`${personal.name} - Senior Data Engineer Portfolio`} />
  
  <!-- Twitter specific -->
  <meta name="twitter:image" content={pageMetadata.image || `${personal.website}/og-image.jpg`} />
  <meta name="twitter:image:alt" content={`${personal.name} - Senior Data Engineer Portfolio`} />
  
  <!-- Additional SEO -->
  <meta name="geo.region" content="IN-KA" />
  <meta name="geo.placename" content="Bengaluru" />
  <meta name="geo.position" content="12.9716;77.5946" />
  <meta name="ICBM" content="12.9716, 77.5946" />
</svelte:head>

<!-- SEO Meta Tags -->
<SEO 
  title={pageMetadata.title}
  description={pageMetadata.description}
  url={currentUrl}
  type={pageMetadata.type}
  keywords={pageMetadata.keywords}
  image={pageMetadata.image}
/>

<!-- Structured Data -->
{#each pageMetadata.structuredDataTypes as structuredType}
  {#if structuredType === 'Person'}
    <StructuredData type="Person" />
  {:else if structuredType === 'WebSite'}
    <StructuredData type="WebSite" />
  {/if}
{/each}

<!-- PageWrapper wraps all pages with Navigation, Theme, Splash -->
<PageWrapper>
  <slot />
</PageWrapper>
