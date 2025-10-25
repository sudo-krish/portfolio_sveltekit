<!-- src/lib/components/home/CertificationsCard.svelte -->
<script lang="ts">
  import { Award } from 'lucide-svelte';
  
  const certifications = [
    { name: 'AWS Solutions Architect', level: 'Associate', year: '2024' },
    { name: 'Databricks Certified', level: 'Professional', year: '2023' },
    { name: 'GCP Data Engineer', level: 'Professional', year: '2023' }
  ];
</script>

<div class="cert-card">
  <div class="card-header">
    <Award size={20} />
    <span class="header-text">Certifications</span>
  </div>
  
  <div class="cert-grid">
    {#each certifications as cert}
      <div class="cert-item">
        <div class="cert-badge">
          <Award size={24} class="badge-icon" />
        </div>
        <div class="cert-details">
          <span class="cert-name">{cert.name}</span>
          <span class="cert-meta">{cert.level} • {cert.year}</span>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .cert-card {
    padding: 1.25rem 1.5rem;
    background: hsl(var(--card));
    border: 1px solid hsl(var(--border));
    border-radius: 12px;
    width: 100%;
    max-width: 900px;
  }
  
  .card-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1.25rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid hsl(var(--border));
    color: hsl(var(--foreground));
  }
  
  .header-text {
    font-size: 1rem;
    font-weight: 600;
  }
  
  .cert-grid {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
  
  .cert-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    background: hsl(var(--muted) / 0.3);
    border-radius: 8px;
    flex: 1;
    min-width: 250px;
  }
  
  .cert-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    background: hsl(var(--primary) / 0.15);
    border-radius: 50%;
  }
  
  :global(.badge-icon) {
    color: hsl(var(--primary));
  }
  
  .cert-details {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .cert-name {
    font-size: 0.9375rem;
    font-weight: 600;
    color: hsl(var(--foreground));
  }
  
  .cert-meta {
    font-size: 0.75rem;
    color: hsl(var(--muted-foreground));
  }
</style>
