<!-- src/lib/components/ui/CoffeeCard.svelte -->
<script lang="ts">
  import { Coffee } from 'lucide-svelte';
  
  export let url: string;
</script>

<a href={url} target="_blank" rel="noopener noreferrer" class="coffee-card">
  <div class="coffee-icon-wrapper">
    <div class="coffee-cup">
      <Coffee size={24} strokeWidth={2.5} />
    </div>
  </div>
  <div class="coffee-content">
    <h4 class="coffee-title">Buy me a coffee</h4>
    <p class="coffee-subtitle">Support my work</p>
  </div>
  <div class="coffee-badge">
    <span class="emoji">☕</span>
  </div>
</a>

<style>
  .coffee-card {
    position: relative;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.25rem;
    background: #FFDD00;
    border: 2px solid #000;
    border-radius: 12px;
    text-decoration: none;
    box-shadow: 4px 4px 0 #000;
    transition: all 0.2s ease;
    overflow: hidden;
  }

  .coffee-card:hover {
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0 #000;
  }

  .coffee-card:active {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0 #000;
  }

  .coffee-icon-wrapper {
    position: relative;
    flex-shrink: 0;
  }

  .coffee-cup {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    background: #fff;
    border: 2px solid #000;
    border-radius: 50%;
    color: #000;
    box-shadow: 2px 2px 0 #000;
    transition: all 0.2s ease;
  }

  .coffee-card:hover .coffee-cup {
    animation: wiggle 0.5s ease;
  }

  @keyframes wiggle {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(-10deg); }
    75% { transform: rotate(10deg); }
  }

  .coffee-content {
    flex: 1;
    min-width: 0;
  }

  .coffee-title {
    font-size: 0.9375rem;
    font-weight: 800;
    margin: 0 0 0.125rem;
    color: #000;
    letter-spacing: -0.02em;
  }

  .coffee-subtitle {
    font-size: 0.75rem;
    font-weight: 600;
    margin: 0;
    color: #000;
    opacity: 0.7;
  }

  .coffee-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: #fff;
    border: 2px solid #000;
    border-radius: 50%;
    flex-shrink: 0;
    transition: all 0.2s ease;
  }

  .coffee-card:hover .coffee-badge {
    animation: bounce 0.6s ease;
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }

  .emoji {
    font-size: 1.125rem;
    line-height: 1;
  }

  /* Decorative Elements */
  .coffee-card::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 60px;
    height: 60px;
    background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    .coffee-card {
      padding: 1rem 1.25rem;
    }

    .coffee-cup {
      width: 44px;
      height: 44px;
    }
  }
</style>
