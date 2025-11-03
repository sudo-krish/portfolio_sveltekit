<!-- src/routes/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import HeroSection from '$lib/components/home/HeroSection.svelte';
  import MetricsGrid from '$lib/components/home/MetricsGrid.svelte';
  import FeaturedProjects from '$lib/components/home/FeaturedProjects.svelte';
  import TechStack from '$lib/components/home/TechStack.svelte';
  import ContactCTA from '$lib/components/home/ContactCTA.svelte';

  onMount(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Set initial hidden state for all sections
    gsap.set('.animate-section', { 
      opacity: 0, 
      y: 60 
    });

    // Animate each section on scroll
    gsap.utils.toArray('.animate-section').forEach((section: any) => {
      gsap.to(section, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 85%', // Animation starts when section is 85% down the viewport
          end: 'top 20%',
          toggleActions: 'play none none none',
          // markers: true // Enable for debugging
        }
      });
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  });
</script>

<svelte:head>
  <title>Krishnanand Anil | AWS Data Engineer & Cloud Expert</title>
  <meta name="description" content="Senior Data Engineer with 5+ years experience in AWS Cloud, Redshift, and scalable data pipelines." />
</svelte:head>

<main class="page">
  <section id="hero" aria-label="Introduction">
    <HeroSection />
  </section>
  
  <section id="metrics" class="section animate-section" aria-label="Professional Metrics">
    <h2 class="sr-only">Professional Achievements and Metrics</h2>
    <MetricsGrid />
  </section>
  
  <section id="projects" class="section animate-section" aria-label="Featured Projects">
    <h2 class="sr-only">Featured Data Engineering Projects</h2>
    <FeaturedProjects limit={6} />
  </section>
  
  <section id="tech-stack" class="section animate-section" aria-label="Technology Stack">
    <h2 class="sr-only">Technologies and Tools</h2>
    <TechStack />
  </section>
  
  <section id="contact" class="section animate-section" aria-label="Contact Information">
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
