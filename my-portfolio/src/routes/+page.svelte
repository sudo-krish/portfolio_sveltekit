<!-- src/routes/+page.svelte -->
<script lang="ts">
  import HeroSection from '$lib/components/home/HeroSection.svelte';
  // Import other components as we build them
  import MetricsGrid from '$lib/components/home/MetricsGrid.svelte';
  import FeaturedProjects from '$lib/components/home/FeaturedProjects.svelte';
  import TechStack from '$lib/components/home/TechStack.svelte';
  import ContactCTA from '$lib/components/home/ContactCTA.svelte';
</script>

<svelte:head>
  <title>Krishnanand Anil - Senior Data Engineer | AWS Cloud Expert</title>
  <meta name="description" content="Senior Data Engineer with 5+ years of experience in AWS Cloud, Redshift, and scalable data pipelines. Building enterprise-grade data solutions at DTDC Express Limited." />
  <meta name="keywords" content="Data Engineer, AWS, Redshift, Data Pipelines, Cloud Engineering, Krishnanand Anil" />
  
  <!-- Open Graph / Social Media -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Krishnanand Anil - Senior Data Engineer" />
  <meta property="og:description" content="AWS Cloud Expert | Building Scalable Data Pipelines | 5+ Years Experience" />
  <meta property="og:image" content="/og-image.jpg" />
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Krishnanand Anil - Senior Data Engineer" />
  <meta name="twitter:description" content="AWS Cloud Expert | Building Scalable Data Pipelines" />
</svelte:head>

<div class="page">
  
  <!-- Hero Section -->
  <HeroSection />
  
  <!-- Metrics Grid Section (Coming Soon) -->
  
  <section id="metrics" class="section">
    <MetricsGrid />
  </section>
 
  
  <!-- Featured Projects Section (Coming Soon) -->
  
  <section id="projects" class="section">
    <FeaturedProjects limit={6} />
  </section>
 
  
  <!-- Tech Stack Section (Coming Soon) -->
  
  <section id="tech-stack" class="section">
    <TechStack />
  </section>
 
  
  <!-- Contact CTA Section (Coming Soon) -->
  
  <section id="contact" class="section">
    <ContactCTA />
  </section>
 
  
</div>

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
  
  @media (max-width: 768px) {
    .section {
      padding: 3rem 1.5rem;
    }
  }
</style>
