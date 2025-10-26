<!-- src/routes/+page.svelte -->
<script lang="ts">
  import HeroSection from '$lib/components/home/HeroSection.svelte';
  import MetricsGrid from '$lib/components/home/MetricsGrid.svelte';
  import FeaturedProjects from '$lib/components/home/FeaturedProjects.svelte';
  import TechStack from '$lib/components/home/TechStack.svelte';
  import ContactCTA from '$lib/components/home/ContactCTA.svelte';
</script>

<main class="page">
  <section id="hero" aria-label="Introduction">
    <HeroSection />
  </section>
  
  <section id="metrics" class="section" aria-label="Professional Metrics">
    <h2 class="sr-only">Professional Achievements and Metrics</h2>
    <MetricsGrid />
  </section>
  
  <section id="projects" class="section" aria-label="Featured Projects">
    <h2 class="sr-only">Featured Data Engineering Projects</h2>
    <FeaturedProjects limit={6} />
  </section>
  
  <section id="tech-stack" class="section" aria-label="Technology Stack">
    <h2 class="sr-only">Technologies and Tools</h2>
    <TechStack />
  </section>
  
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
