<!-- src/lib/components/home/LocationCard.svelte -->
<script lang="ts">
  import { MapPin, Clock, Globe, Wifi } from 'lucide-svelte';
  import { getPersonalInfo } from '$lib/data/portfolio-data';
  import { onMount, onDestroy } from 'svelte';
  
  const personal = getPersonalInfo();
  
  let currentTime = '';
  let interval: ReturnType<typeof setInterval>;
  
  function updateTime() {
    const now = new Date();
    currentTime = now.toLocaleTimeString('en-US', { 
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  }
  
  onMount(() => {
    updateTime();
    interval = setInterval(updateTime, 1000);
  });
  
  onDestroy(() => {
    if (interval) clearInterval(interval);
  });
</script>

<div class="location-card">
  <!-- Header -->
  <div class="card-header">
    <div class="header-icon">
      <MapPin size={16} />
    </div>
    <div class="header-content">
      <h3>Location & Availability</h3>
      <span class="subtitle">Open to opportunities</span>
    </div>
    <div class="status-dot">
      <span class="pulse"></span>
    </div>
  </div>
  
  <!-- Location Info -->
  <div class="info-section">
    <div class="info-row">
      <div class="info-icon location">
        <MapPin size={14} />
      </div>
      <div class="info-content">
        <span class="info-label">Based in</span>
        <span class="info-value">{personal.address.city}, {personal.address.country}</span>
      </div>
    </div>
    
    <div class="info-row">
      <div class="info-icon time">
        <Clock size={14} />
      </div>
      <div class="info-content">
        <span class="info-label">Local time</span>
        <span class="info-value clock">{currentTime} IST</span>
      </div>
    </div>
    
    <div class="info-row">
      <div class="info-icon work">
        <Globe size={14} />
      </div>
      <div class="info-content">
        <span class="info-label">Work mode</span>
        <span class="info-value">Remote • Hybrid • On-site</span>
      </div>
    </div>
  </div>
  
  <!-- Availability Footer -->
  <div class="availability-footer">
    <Wifi size={12} />
    <span>Available for consulting & full-time roles</span>
  </div>
</div>

<style>
  .location-card {
    background: hsl(var(--card));
    border: 1px solid hsl(var(--border));
    border-radius: 16px;
    width: 100%;
    max-width: 480px;
    overflow: hidden;
    backdrop-filter: blur(20px);
    box-shadow: 0 2px 8px rgb(0 0 0 / 0.04);
  }
  
  /* iOS-style Header */
  .card-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    background: linear-gradient(
      135deg,
      hsl(var(--muted) / 0.3),
      hsl(var(--muted) / 0.1)
    );
    border-bottom: 1px solid hsl(var(--border));
  }
  
  .header-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    background: linear-gradient(135deg, hsl(var(--success)), hsl(var(--accent)));
    border-radius: 10px;
    color: white;
    box-shadow: 0 2px 8px hsl(var(--success) / 0.3);
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
  
  .status-dot {
    position: relative;
    width: 12px;
    height: 12px;
    flex-shrink: 0;
  }
  
  .pulse {
    position: absolute;
    inset: 0;
    background: hsl(var(--success));
    border-radius: 50%;
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
      box-shadow: 0 0 0 0 hsl(var(--success) / 0.7);
    }
    50% {
      opacity: 0.8;
      box-shadow: 0 0 0 6px hsl(var(--success) / 0);
    }
  }
  
  /* Info Section */
  .info-section {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.875rem;
  }
  
  .info-row {
    display: flex;
    align-items: start;
    gap: 0.75rem;
  }
  
  .info-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 8px;
    flex-shrink: 0;
  }
  
  .info-icon.location {
    background: hsl(var(--success) / 0.15);
    color: hsl(var(--success));
  }
  
  .info-icon.time {
    background: hsl(var(--primary) / 0.15);
    color: hsl(var(--primary));
  }
  
  .info-icon.work {
    background: hsl(var(--accent) / 0.15);
    color: hsl(var(--accent));
  }
  
  .info-content {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    flex: 1;
    min-width: 0;
  }
  
  .info-label {
    font-size: 0.6875rem;
    color: hsl(var(--muted-foreground));
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: 600;
  }
  
  .info-value {
    font-size: 0.875rem;
    font-weight: 600;
    color: hsl(var(--foreground));
    line-height: 1.4;
  }
  
  .info-value.clock {
    font-family: var(--font-mono);
    font-size: 0.9375rem;
    color: hsl(var(--primary));
  }
  
  /* Availability Footer */
  .availability-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.875rem 1rem;
    background: hsl(var(--success) / 0.1);
    border-top: 1px solid hsl(var(--success) / 0.2);
    color: hsl(var(--success));
    font-size: 0.75rem;
    font-weight: 600;
  }
  
  /* Dark Mode Enhancements */
  :global(.dark) .location-card {
    box-shadow: 0 0 40px hsl(var(--success) / 0.1);
  }
  
  :global(.dark) .header-icon {
    box-shadow: 0 4px 12px hsl(var(--success) / 0.4);
  }
  
  :global(.dark) .info-icon {
    box-shadow: 0 0 10px hsl(var(--primary) / 0.2);
  }
  
  :global(.dark) .availability-footer {
    background: hsl(var(--success) / 0.15);
    border-top-color: hsl(var(--success) / 0.3);
  }
  
  /* Responsive */
  @media (max-width: 640px) {
    .location-card {
      max-width: 100%;
    }
    
    .card-header {
      padding: 0.875rem;
    }
    
    .info-section {
      padding: 0.875rem;
      gap: 0.75rem;
    }
    
    .info-value {
      font-size: 0.8125rem;
    }
    
    .availability-footer {
      font-size: 0.6875rem;
      padding: 0.75rem 0.875rem;
    }
  }
</style>
