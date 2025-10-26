<!-- src/lib/components/home/CertificationsCard.svelte -->
<script lang="ts">
  import { Award, Shield, CheckCircle } from 'lucide-svelte';
  import { getCertifications } from '$lib/data/portfolio-data';
  
  const certifications = getCertifications();
</script>

<div class="cert-card">
  <!-- Header -->
  <div class="card-header">
    <div class="header-icon">
      <Shield size={16} />
    </div>
    <div class="header-content">
      <h3>AWS Certifications</h3>
      <span class="subtitle">{certifications.length} active credentials</span>
    </div>
    <div class="verified-badge">
      <CheckCircle size={10} />
    </div>
  </div>
  
  <!-- Certifications List -->
  <div class="cert-list">
    {#each certifications as cert, i}
      <a 
        href={cert.url} 
        target="_blank" 
        rel="noopener noreferrer" 
        class="cert-item"
        style="--delay: {i * 80}ms"
      >
        <!-- Left: Badge -->
        <div class="cert-badge">
          <Award size={14} strokeWidth={2.5} />
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
        <CheckCircle size={12} class="verified-icon" />
      </a>
    {/each}
  </div>
  
  <!-- Footer -->
  <div class="cert-footer">
    <div class="footer-content">
      <Shield size={12} class="footer-icon" />
      <span class="footer-text">All certifications verified by Amazon Web Services (AWS)</span>
    </div>
  </div>
</div>

<style>
  .cert-card {
    background: hsl(var(--card));
    border: 1px solid hsl(var(--border));
    border-radius: 16px;
    width: 100%;
    max-width: 480px;
    overflow: hidden;
    backdrop-filter: blur(20px);
    box-shadow: 
      0 1px 3px rgb(0 0 0 / 0.04),
      0 1px 2px rgb(0 0 0 / 0.02);
  }
  
  /* iOS-style Header */
  .card-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 1.25rem;
    background: linear-gradient(
      135deg,
      hsl(var(--muted) / 0.3),
      hsl(var(--muted) / 0.1)
    );
    border-bottom: 1px solid hsl(var(--border) / 0.5);
  }
  
  .header-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)));
    border-radius: 10px;
    color: white;
    box-shadow: 
      0 2px 8px hsl(var(--primary) / 0.3),
      0 0 1px hsl(var(--primary) / 0.5);
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
    font-size: 0.9375rem;
    font-weight: 700;
    color: hsl(var(--foreground));
    margin: 0;
    letter-spacing: -0.01em;
  }
  
  .subtitle {
    font-size: 0.6875rem;
    color: hsl(var(--muted-foreground));
    font-family: var(--font-mono);
  }
  
  .verified-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    background: hsl(var(--success) / 0.15);
    border-radius: 50%;
    color: hsl(var(--success));
    flex-shrink: 0;
  }
  
  /* Certifications List */
  .cert-list {
    padding: 1rem 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .cert-item {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 0.875rem;
    padding: 0.875rem 1rem;
    background: hsl(var(--muted) / 0.3);
    border: 1px solid hsl(var(--border) / 0.5);
    border-radius: 12px;
    text-decoration: none;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    opacity: 0;
    transform: translateY(10px);
    animation: slideUp 0.4s ease-out forwards;
    animation-delay: var(--delay);
  }
  
  @keyframes slideUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .cert-item::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: linear-gradient(180deg, hsl(var(--primary)), hsl(var(--accent)));
    transform: scaleY(0);
    transition: transform 0.2s ease;
  }
  
  .cert-item:hover {
    background: hsl(var(--muted) / 0.5);
    border-color: hsl(var(--primary) / 0.3);
    transform: translateX(4px);
    box-shadow: 0 2px 8px hsl(var(--primary) / 0.1);
  }
  
  .cert-item:hover::before {
    transform: scaleY(1);
  }
  
  /* Badge */
  .cert-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    background: hsl(var(--primary) / 0.15);
    border-radius: 10px;
    color: hsl(var(--primary));
    flex-shrink: 0;
    transition: all 0.2s ease;
  }
  
  .cert-item:hover .cert-badge {
    background: hsl(var(--primary) / 0.2);
    transform: scale(1.05);
  }
  
  /* Info */
  .cert-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    min-width: 0;
  }
  
  .cert-name {
    font-size: 0.875rem;
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
    gap: 0.5rem;
    font-size: 0.6875rem;
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
    transition: all 0.2s ease;
    flex-shrink: 0;
  }
  
  .cert-item:hover :global(.verified-icon) {
    opacity: 1;
    transform: scale(1.1);
  }
  
  /* Footer - iOS style with proper padding */
  .cert-footer {
    padding: 1rem 1.25rem;
    background: linear-gradient(
      135deg,
      hsl(var(--muted) / 0.2),
      hsl(var(--muted) / 0.1)
    );
    border-top: 1px solid hsl(var(--border) / 0.5);
  }
  
  .footer-content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  :global(.footer-icon) {
    color: hsl(var(--success));
    flex-shrink: 0;
  }
  
  .footer-text {
    font-size: 0.75rem;
    line-height: 1.4;
    color: hsl(var(--muted-foreground));
    font-weight: 500;
  }
  
  /* Dark Mode - iOS/Material elevation */
  :global(.dark) .cert-card {
    box-shadow: 
      0 0 40px hsl(var(--primary) / 0.1),
      0 1px 3px rgb(0 0 0 / 0.1);
  }
  
  :global(.dark) .header-icon {
    box-shadow: 0 4px 12px hsl(var(--primary) / 0.4);
  }
  
  :global(.dark) .cert-item:hover {
    box-shadow: 0 4px 16px hsl(var(--primary) / 0.2);
  }
  
  :global(.dark) .cert-badge {
    box-shadow: 0 0 10px hsl(var(--primary) / 0.2);
  }
  
  /* Responsive */
  @media (max-width: 640px) {
    .cert-card {
      max-width: 100%;
    }
    
    .card-header {
      padding: 0.875rem 1rem;
    }
    
    .cert-list {
      padding: 0.875rem 1rem;
      gap: 0.625rem;
    }
    
    .cert-item {
      padding: 0.75rem 0.875rem;
      gap: 0.75rem;
    }
    
    .cert-badge {
      width: 34px;
      height: 34px;
    }
    
    .cert-name {
      font-size: 0.8125rem;
    }
    
    .cert-footer {
      padding: 0.875rem 1rem;
    }
    
    .footer-text {
      font-size: 0.6875rem;
    }
  }
</style>
