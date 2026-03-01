<script lang="ts">
  import '../app.css';
  import SEO from '$lib/components/SEO.svelte';
  import StructuredData from '$lib/components/StructuredData.svelte';
  import PageWrapper from '$lib/components/PageWrapper.svelte';
  import { page } from '$app/stores';
  import { getPersonalInfo } from '$lib/data/portfolio-data';
  
  const personal = getPersonalInfo();
  
  $: currentPath = $page.url.pathname;
  $: currentUrl = `${personal.website}${currentPath}`;
  
  $: pageMetadata = {
    title: `${personal.name} - Senior Data Engineer | AWS Cloud Expert`,
    description: personal.bio,
    type: 'website',
    keywords: [...personal.topSkills, 'data engineering', 'AWS', 'Kafka'].join(', '),
    image: `${personal.website}/og-image.jpg`
  };
</script>

<svelte:head>
  <meta property="og:image" content={pageMetadata.image} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:image" content={pageMetadata.image} />
  <meta name="geo.region" content="IN-KA" />
  <meta name="geo.placename" content="Bengaluru" />
</svelte:head>

<SEO 
  title={pageMetadata.title}
  description={pageMetadata.description}
  url={currentUrl}
  type={pageMetadata.type}
  keywords={pageMetadata.keywords}
  image={pageMetadata.image}
/>

<StructuredData type="Person" />
<StructuredData type="WebSite" />

<PageWrapper>
  <slot />
</PageWrapper>
