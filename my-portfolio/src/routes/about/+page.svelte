<script lang="ts">
  // NO SEO IMPORTS! Layout handles everything
  import { getPersonalInfo, getEducation, getCertifications, getAllCompanies } from '$lib/data/portfolio-data';
  
  const personal = getPersonalInfo();
  const education = getEducation();
  const certifications = getCertifications();
  const companies = getAllCompanies();
</script>

<!-- Pure content -->
<main class="container">
  <h1>About {personal.name}</h1>
  
  <section class="intro">
    <p>{personal.bio}</p>
  </section>

  <section class="experience">
    <h2>Professional Experience</h2>
    {#each companies as company}
      <div class="experience-card">
        <h3>{company.position}</h3>
        <p class="company">{company.name}</p>
        <p class="duration">{company.duration}</p>
        {#if company.responsibilities}
          <ul>
            {#each company.responsibilities as responsibility}
              <li>{responsibility}</li>
            {/each}
          </ul>
        {/if}
      </div>
    {/each}
  </section>

  <section class="education">
    <h2>Education</h2>
    {#each education as edu}
      <div class="edu-card">
        <h3>{edu.university}</h3>
        {#if edu.degree}
          <p>{edu.degree} in {edu.field}</p>
        {/if}
      </div>
    {/each}
  </section>

  <section class="certifications">
    <h2>Certifications</h2>
    <div class="cert-grid">
      {#each certifications as cert}
        <div class="cert-card">
          <h3>{cert.name}</h3>
          <p>{cert.issuer}</p>
        </div>
      {/each}
    </div>
  </section>
</main>

<style>
  /* Your styles */
</style>
