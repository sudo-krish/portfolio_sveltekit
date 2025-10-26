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
      <MapPin size={14} />
    </div>
    <div class="header-content">
      <h3>Location & Availability</h3>
      <span class="subtitle">Open to opportunities</span>
    </div>
    <div class="status-dot">
      <span class="pulse"></span>
    </div>
  </div>
  
  <!-- Content Grid -->
  <div class="content-grid">
    <!-- Left: Map Visual -->
    <div class="map-section">
      <div class="map-container">
        <div class="location-pin">
          <MapPin size={20} />
        </div>
        <div class="map-grid"></div>
      </div>
    </div>
    
    <!-- Right: Details -->
    <div class="details-section">
      <div class="info-row">
        <div class="info-icon location">
          <MapPin size={12} />
        </div>
        <div class="info-content">
          <span class="info-label">Based in</span>
          <span class="info-value">{personal.address.city}, {personal.address.country}</span>
        </div>
      </div>
      
      <div class="info-row">
        <div class="info-icon time">
          <Clock size={12} />
        </div>
        <div class="info-content">
          <span class="info-label">Local time</span>
          <span class="info-value clock">{currentTime} IST</span>
        </div>
      </div>
      
      <div class="info-row">
        <div class="info-icon work">
          <Globe size={12} />
        </div>
        <div class="info-content">
          <span class="info-label">Work mode</span>
          <span class="info-value">Remote • Hybrid • On-site</span>
        </div>
      </div>
      
      <div class="availability-tag">
        <Wifi size={10} />
        <span>Available Now</span>
      </div>
    </div>
  </div>
</div>

<style>
  .location-card {
    background: hsl(var(--card));
    border: 1px solid hsl(var(--border));
    border-radius: 12px;
    width: 100%;
    max-width: 680px;
    height: 320px;
    display: flex;
    flex-direction: column;
  }
  
  .location-card:hover {
    border-color: hsl(var(--success));
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
    background: linear-gradient(135deg, hsl(var(--success)), hsl(var(--accent)));
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
  
  .status-dot {
    position: relative;
    width: 10px;
    height: 10px;
    flex-shrink: 0;
  }
  
  .pulse {
    position: absolute;
    inset: 0;
    background: hsl(var(--success));
    border-radius: 50%;
    /* REMOVED: animation to prevent flicker */
  }
  
  /* Content Grid - 2 columns */
  .content-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    flex: 1;
  }
  
  /* Map Section */
  .map-section {
    padding: 1rem;
    border-right: 1px solid hsl(var(--border));
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .map-container {
    position: relative;
    width: 100%;
    height: 100%;
    background: hsl(var(--muted) / 0.3);
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .map-grid {
    position: absolute;
    inset: 0;
    background-image: 
      linear-gradient(hsl(var(--border)) 1px, transparent 1px),
      linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px);
    background-size: 30px 30px;
    opacity: 0.3;
  }
  
  .location-pin {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    background: hsl(var(--success));
    color: white;
    border-radius: 50%;
    z-index: 1;
  }
  
  /* Details Section */
  .details-section {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .info-row {
    display: flex;
    align-items: start;
    gap: 0.625rem;
  }
  
  .info-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 6px;
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
    gap: 0.1875rem;
    flex: 1;
    min-width: 0;
  }
  
  .info-label {
    font-size: 0.625rem;
    color: hsl(var(--muted-foreground));
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: 600;
  }
  
  .info-value {
    font-size: 0.8125rem;
    font-weight: 600;
    color: hsl(var(--foreground));
    line-height: 1.4;
  }
  
  .info-value.clock {
    font-family: var(--font-mono);
    font-size: 0.875rem;
    color: hsl(var(--primary));
  }
  
  /* Availability Tag */
  .availability-tag {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.5rem 0.75rem;
    background: hsl(var(--success) / 0.1);
    border: 1px solid hsl(var(--success) / 0.2);
    border-radius: 6px;
    color: hsl(var(--success));
    font-size: 0.6875rem;
    font-weight: 600;
    margin-top: auto;
  }
  
  /* Responsive */
  @media (max-width: 680px) {
    .location-card {
      max-width: 100%;
      height: auto;
      min-height: 320px;
    }
    
    .content-grid {
      grid-template-columns: 1fr;
    }
    
    .map-section {
      border-right: none;
      border-bottom: 1px solid hsl(var(--border));
      min-height: 180px;
    }
  }
</style>
