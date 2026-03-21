<script lang="ts">
  import "../app.css";
  import SEO from "$lib/components/SEO.svelte";
  import StructuredData from "$lib/components/StructuredData.svelte";
  import PageWrapper from "$lib/components/PageWrapper.svelte";
  import CookieBanner from "$lib/components/seo/CookieBanner.svelte";
  import { page } from "$app/stores";
  import { personal } from "$lib/data/site";

  $: currentPath = $page.url.pathname;
  $: currentUrl = `${personal.website}${currentPath}`;

  $: pageMetadata = {
    title: currentPath === '/' ? "Krishnanand Anil | Senior Data Engineer, AWS & Kafka" : `Krishnanand Anil | Senior Data Engineer, AWS & Real-Time Data`,
    description: personal.bio,
    type: "website",
    keywords: [
      "krishnanand anil",
      "krishnanand anil data engineer",
      "krishnanand anil aws",
      "krishnanand anil portfolio",
      "senior data engineer portfolio",
      "aws data engineer portfolio",
      "real-time data engineer",
      "data architect portfolio",
      "big data engineer india",
      "senior data engineer bengaluru",
      "kafka data engineer",
      "spark data engineer",
      "airflow data engineer",
      "redshift engineer",
      "data platform engineer",
      "data engineering projects",
      "aws data engineering projects",
      "kafka cdc pipeline",
      "data lakehouse architecture portfolio",
    ].join(", "),
    image: `${personal.website}/og-image.jpg`,
  };

  // let pageErrors: string[] = [];

  // import { onMount, tick } from 'svelte';
  // onMount(() => {
  //   window.addEventListener('error', (event) => {
  //       pageErrors = [...pageErrors, `Error: ${event.message} at ${event.filename}:${event.lineno}`];
  //       console.error(event);
  //   });
  //   window.addEventListener('unhandledrejection', (event) => {
  //       pageErrors = [...pageErrors, `Promise Rejection: ${event.reason}`];
  //       console.error(event);
  //   });
  // });
</script>

<!-- {#if pageErrors.length > 0}
  <div class="fixed top-0 left-0 w-full bg-red-600 text-white font-mono p-8 z-[9999] overflow-auto max-h-[50vh]">
    <h1 class="text-2xl font-bold border-b border-white pb-2 mb-4">CAUGHT ERRORS</h1>
    {#each pageErrors as err}
      <div class="mb-2 p-2 bg-black/30 rounded">{err}</div>
    {/each}
  </div>
{/if} -->

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
  exactTitle={currentPath === '/'}
  description={pageMetadata.description}
  url={currentUrl}
  type={pageMetadata.type}
  keywords={pageMetadata.keywords}
  image={pageMetadata.image}
/>

<StructuredData type="Person" />
<StructuredData type="WebSite" />

<CookieBanner />

<PageWrapper>
  <slot />
</PageWrapper>
