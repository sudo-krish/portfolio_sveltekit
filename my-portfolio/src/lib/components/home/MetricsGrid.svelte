<!-- src/routes/+page.svelte -->
<script lang="ts">
  import ImpactMetricsCard from '$lib/components/home/ImpactMetricsCard.svelte';
  import ProjectMetricsCard from '$lib/components/home/ProjectMetricsCard.svelte';
  import CareerTimelineCard from '$lib/components/home/CareerTimelineCard.svelte';
  import ExperienceCard from '$lib/components/home/ExperienceCard.svelte';
  import ResearchCard from '$lib/components/home/ResearchCard.svelte';
  import CertificationsCard from '$lib/components/home/CertificationsCard.svelte';
  import TechStackCard from '$lib/components/home/TechStackCard.svelte';
  import LocationCard from '$lib/components/home/LocationCard.svelte';
</script>

<div class="portfolio-container">
  <!-- Row 1: Impact & Project Metrics -->
  <div class="row metrics-row">
    <ImpactMetricsCard />
    <ProjectMetricsCard />
  </div>
  
  <!-- Row 2: Career Timeline & Experience -->
  <div class="row career-row">
    <CareerTimelineCard />
    <ExperienceCard />
  </div>
  
  <!-- Row 3: Research & Certifications -->
  <div class="row research-row">
    <ResearchCard />
    <CertificationsCard />
  </div>
  
  <!-- Row 4: Tech Stack & Location -->
  <div class="row tech-row">
    <TechStackCard />
    <LocationCard />
  </div>
</div>

<style>
  .portfolio-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  
  /* Base Row Layout - Always 2 columns on desktop */
  .row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    width: 100%;
  }
  
  /* Desktop (1025px+) - All rows are 2 columns */
  @media (min-width: 1025px) {
    .row {
      grid-template-columns: 1fr 1fr;
    }
  }
  
  /* Tablet Landscape (921px - 1024px) */
  @media (max-width: 1024px) and (min-width: 921px) {
    .portfolio-container {
      padding: 1.5rem;
    }
    
    /* All rows stay as 2 columns */
    .row {
      grid-template-columns: 1fr 1fr;
      gap: 1.25rem;
    }
  }
  
  /* Tablet Portrait (768px - 920px) */
  @media (max-width: 920px) and (min-width: 768px) {
    .portfolio-container {
      padding: 1.5rem;
      gap: 1.5rem;
    }
    
    /* Metrics, Research, Tech - Single column */
    .metrics-row,
    .research-row,
    .tech-row {
      grid-template-columns: 1fr;
    }
    
    /* Career row STAYS 2 columns */
    .career-row {
      grid-template-columns: 1fr 1fr;
      gap: 1.25rem;
    }
  }
  
  /* Small Tablet (641px - 767px) */
  @media (max-width: 767px) and (min-width: 641px) {
    .portfolio-container {
      padding: 1.25rem;
      gap: 1.25rem;
    }
    
    /* All single column */
    .row {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
  }
  
  /* Mobile (640px and below) */
  @media (max-width: 640px) {
    .portfolio-container {
      padding: 1rem;
      gap: 1.25rem;
    }
    
    /* All single column */
    .row {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
  }
  
  /* Ensure cards don't exceed their max-width */
  .row > :global(*) {
    width: 100%;
    justify-self: center;
  }
</style>
