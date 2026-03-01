<!-- src/lib/components/ui/CalendlyCard.svelte -->
<script lang="ts">
  import { Calendar } from 'lucide-svelte';
  
  export let url: string;
</script>

<a href={url} target="_blank" rel="noopener noreferrer" class="calendly-card">
  <div class="calendly-icon-wrapper">
    <div class="icon-hexagon">
      <Calendar size={22} strokeWidth={2} />
    </div>
  </div>
  <div class="calendly-content">
    <h4 class="calendly-title">Schedule time with me</h4>
    <p class="calendly-subtitle">Select a 30-min slot</p>
  </div>
  <div class="calendly-arrow">
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 13L10 10L7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>
</a>

<style>
  .calendly-card {
    position: relative;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.25rem;
    background: #0069FF;
    border: none;
    border-radius: 12px;
    text-decoration: none;
    box-shadow: 0 2px 8px rgba(0, 105, 255, 0.15);
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
  }

  .calendly-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%);
    opacity: 0;
    transition: opacity 0.2s;
  }

  .calendly-card:hover::before {
    opacity: 1;
  }

  .calendly-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 105, 255, 0.25);
  }

  .calendly-card:active {
    transform: translateY(0);
  }

  .calendly-icon-wrapper {
    position: relative;
    flex-shrink: 0;
  }

  .icon-hexagon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    border-radius: 10px;
    color: white;
    transition: all 0.3s ease;
  }

  .calendly-card:hover .icon-hexagon {
    background: rgba(255, 255, 255, 0.25);
    transform: rotate(-5deg) scale(1.05);
  }

  .calendly-content {
    flex: 1;
    min-width: 0;
  }

  .calendly-title {
    font-size: 0.9375rem;
    font-weight: 600;
    margin: 0 0 0.125rem;
    color: white;
    letter-spacing: -0.01em;
  }

  .calendly-subtitle {
    font-size: 0.75rem;
    font-weight: 500;
    margin: 0;
    color: rgba(255, 255, 255, 0.85);
  }

  .calendly-arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 50%;
    color: white;
    flex-shrink: 0;
    transition: all 0.2s ease;
  }

  .calendly-card:hover .calendly-arrow {
    background: rgba(255, 255, 255, 0.25);
    transform: translateX(2px);
  }

  /* Geometric decoration - subtle */
  .calendly-card::after {
    content: '';
    position: absolute;
    right: -20px;
    top: -20px;
    width: 100px;
    height: 100px;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    .calendly-card {
      padding: 1rem 1.25rem;
    }

    .icon-hexagon {
      width: 44px;
      height: 44px;
    }
  }
</style>
