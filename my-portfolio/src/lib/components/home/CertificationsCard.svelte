<!-- src/lib/components/home/CertificationsCard.svelte -->
<script lang="ts">
  import { Award, Shield, CheckCircle } from 'lucide-svelte';
  import { getCertifications } from '$lib/data/portfolio-data';
  
  const certifications = getCertifications().slice(0, 3); // Only show 3
</script>

<div class="cert-card">
  <!-- Header -->
  <div class="card-header">
    <div class="header-icon">
      <Shield size={14} />
    </div>
    <div class="header-content">
      <h3>AWS Certifications</h3>
      <span class="subtitle">{certifications.length} active credentials</span>
    </div>
    <div class="verified-badge">
      <CheckCircle size={9} />
    </div>
  </div>
  
  <!-- Certifications List -->
  <div class="cert-list">
    {#each certifications as cert}
      <a 
        href={cert.url} 
        target="_blank" 
        rel="noopener noreferrer" 
        class="cert-item"
      >
        <!-- Left: Badge -->
        <div class="cert-badge">
          <Award size={12} strokeWidth={2.5} />
        </div>
        
        <!-- Center: Info -->
        <div class="cert-info">
          <span class="cert-name">{cert.name.replace('AWS Certified ', '')}</span>
          <div class="cert-meta">
            <span class="cert-category">{cert.category}</span>
            <span class="divider">•</span>
            <span class="cert-year">{cert.dateIssued}</span>
          </div>
        </div>
        
        <!-- Right: Verified -->
        <CheckCircle size={11} class="verified-icon" />
      </a>
    {/each}
  </div>
  
  <!-- Footer -->
  <div class="cert-footer">
    <div class="footer-content">
      <Shield size={10} class="footer-icon" />
      <span class="footer-text">Verified by AWS</span>
    </div>
  </div>
</div>

<style>
  .cert-card {
    background: hsl(var(--card));
    border: 1px solid hsl(var(--border));
    border-radius: 12px;
    width: 100%;
    max-width: 480px;
    height: 320px;
    display: flex;
    flex-direction: column;
  }
  
  .cert-card:hover {
    border-color: hsl(var(--primary));
  }
  
  /* Header */
  .card-header {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    padding: 0.875rem 1rem;
    background: hsl(var(--muted) / 0.3);
    border-bottom: 1px solid hsl(var(--border));
    flex-shrink: 0;
  }
  
  .header-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)));
    border-radius: 8px;
    color: white;
    flex-shrink: 0;
  }
  
  .header-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
    min-width: 0;
  }
  
  h3 {
    font-size: 0.875rem;
    font-weight: 700;
    color: hsl(var(--foreground));
    margin: 0;
    letter-spacing: -0.01em;
  }
  
  .subtitle {
    font-size: 0.625rem;
    color: hsl(var(--muted-foreground));
    font-family: var(--font-mono);
  }
  
  .verified-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    background: hsl(var(--success) / 0.15);
    border-radius: 50%;
    color: hsl(var(--success));
    flex-shrink: 0;
  }
  
  /* Certifications List */
  .cert-list {
    padding: 0.875rem;
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
    flex: 1;
  }
  
  .cert-item {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 0.875rem;
    background: hsl(var(--muted) / 0.3);
    border: 1px solid hsl(var(--border));
    border-radius: 8px;
    text-decoration: none;
    position: relative;
    /* REMOVED: all animations */
  }
  
  /* Accent bar */
  .cert-item::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: linear-gradient(180deg, hsl(var(--primary)), hsl(var(--accent)));
    opacity: 0;
  }
  
  .cert-item:hover {
    background: hsl(var(--muted) / 0.5);
    border-color: hsl(var(--primary) / 0.3);
    /* REMOVED: transform and box-shadow */
  }
  
  .cert-item:hover::before {
    opacity: 1;
  }
  
  /* Badge */
  .cert-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    background: hsl(var(--primary) / 0.15);
    border-radius: 8px;
    color: hsl(var(--primary));
    flex-shrink: 0;
  }
  
  .cert-item:hover .cert-badge {
    background: hsl(var(--primary) / 0.2);
    /* REMOVED: transform */
  }
  
  /* Info */
  .cert-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    min-width: 0;
  }
  
  .cert-name {
    font-size: 0.8125rem;
    font-weight: 600;
    color: hsl(var(--foreground));
    line-height: 1.3;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .cert-meta {
    display: flex;
    align-items: center;
    gap: 0.4375rem;
    font-size: 0.625rem;
    color: hsl(var(--muted-foreground));
  }
  
  .cert-category {
    font-weight: 600;
    color: hsl(var(--primary));
  }
  
  .divider {
    color: hsl(var(--border));
  }
  
  .cert-year {
    font-family: var(--font-mono);
  }
  
  /* Verified Icon */
  :global(.verified-icon) {
    color: hsl(var(--success));
    opacity: 0.6;
    flex-shrink: 0;
  }
  
  .cert-item:hover :global(.verified-icon) {
    opacity: 1;
    /* REMOVED: transform */
  }
  
  /* Footer */
  .cert-footer {
    padding: 0.75rem 0.875rem;
    background: hsl(var(--muted) / 0.3);
    border-top: 1px solid hsl(var(--border));
    flex-shrink: 0;
  }
  
  .footer-content {
    display: flex;
    align-items: center;
    gap: 0.4375rem;
  }
  
  :global(.footer-icon) {
    color: hsl(var(--success));
    flex-shrink: 0;
  }
  
  .footer-text {
    font-size: 0.6875rem;
    line-height: 1.4;
    color: hsl(var(--muted-foreground));
    font-weight: 500;
  }
  
  /* Responsive */
  @media (max-width: 480px) {
    .cert-card {
      max-width: 100%;
      height: auto;
      min-height: 320px;
    }
  }
</style>
