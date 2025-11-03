<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { 
    Mail, Github, Linkedin, Instagram, Copy, Check, 
    Send, Terminal, Database
  } from 'lucide-svelte';
  import { getPersonalInfo } from '$lib/data/portfolio-data';
  import CalendlyCard from '$lib/components/ui/CalendlyCard.svelte';
  import CoffeeCard from '$lib/components/ui/CoffeeCard.svelte';
  
  const personal = getPersonalInfo();
  const COFFEE_URL = 'https://buymeacoffee.com/krishnanandanil';
  const CALENDAR_URL = 'https://calendly.com/krishnanandpanil';
  
  let copied = false;
  
  function copyEmail() {
    navigator.clipboard.writeText(personal.email);
    copied = true;
    setTimeout(() => {
      copied = false;
    }, 2000);
  }

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.terminal-header', {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.terminal-header',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });

    gsap.from('.primary-card', {
      opacity: 0,
      x: -50,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.primary-card',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });

    gsap.from('.quick-actions > *', {
      opacity: 0,
      x: 50,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.quick-actions',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });

    const socialCards = gsap.utils.toArray('.social-card');
    socialCards.forEach((card: any) => {
      gsap.from(card, {
        opacity: 0,
        y: 40,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    });

    gsap.from('.status-bar', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.status-bar',
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });

    const hoverElements = gsap.utils.toArray(['.btn-primary', '.btn-icon', '.social-card']);
    hoverElements.forEach((el: any) => {
      el.addEventListener('mouseenter', () => {
        gsap.to(el, { scale: 1.08, duration: 0.3, ease: 'power2.out' });
      });
      el.addEventListener('mouseleave', () => {
        gsap.to(el, { scale: 1, duration: 0.3, ease: 'power2.out' });
      });
    });
  });

  onDestroy(() => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  });
</script>

<section id="contact" class="contact-section">
  <div class="data-flow">
    <div class="flow-line line-1"></div>
    <div class="flow-line line-2"></div>
    <div class="flow-line line-3"></div>
  </div>

  <div class="container">
    <div class="terminal-header">
      <div class="terminal-bar">
        <Terminal size={16} />
        <span class="terminal-path">~/contact</span>
      </div>
      <h2 class="terminal-output">
        <span class="prompt">$</span> Let's connect and build something great
      </h2>
    </div>

    <div class="glass-grid">
      <div class="glass-card primary-card">
        <div class="card-header">
          <div class="icon-wrapper primary">
            <Mail size={24} />
          </div>
          <div class="card-info">
            <h3 class="card-label">Email Address</h3>
            <p class="card-value">{personal.email}</p>
          </div>
        </div>
        <div class="card-actions">
          <a href="mailto:{personal.email}" class="btn-primary">
            <Send size={18} />
            <span>Send Message</span>
          </a>
          <button class="btn-icon" on:click={copyEmail} aria-label="Copy email">
            {#if copied}
              <Check size={18} />
            {:else}
              <Copy size={18} />
            {/if}
          </button>
        </div>
      </div>

      <div class="quick-actions">
        <div class="quick-action-item">
        <CalendlyCard url={CALENDAR_URL} />
        </div>
        <div class="quick-action-item">
        <CoffeeCard url={COFFEE_URL} />
        </div>
      </div>
    </div>

    <div class="social-grid">
      <a href={personal.socialLinks.github} target="_blank" rel="noopener noreferrer" class="social-card">
        <Github size={20} />
        <span>GitHub</span>
      </a>
      <a href={personal.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" class="social-card">
        <Linkedin size={20} />
        <span>LinkedIn</span>
      </a>
      {#if personal.socialLinks.instagram}
        <a href={personal.socialLinks.instagram} target="_blank" rel="noopener noreferrer" class="social-card">
          <Instagram size={20} />
          <span>Instagram</span>
        </a>
      {/if}
    </div>

    <div class="status-bar">
      <Database size={14} class="pulse-icon" />
      <span>Available in {personal.address.city}</span>
      <span class="dot">•</span>
      <span>Response time: ~24h</span>
    </div>
  </div>
</section>

<style>
  .contact-section {
    position: relative;
    padding: 6rem 0;
    background: hsl(var(--background));
    overflow: hidden;
  }

  .data-flow {
    position: absolute;
    inset: 0;
    opacity: 0.03;
    pointer-events: none;
  }

  .flow-line {
    position: absolute;
    height: 1px;
    background: linear-gradient(90deg, transparent, hsl(var(--primary)), transparent);
    animation: flow 8s linear infinite;
  }

  .line-1 {
    top: 20%;
    left: -100%;
    width: 100%;
  }

  .line-2 {
    top: 50%;
    left: -100%;
    width: 100%;
    animation-delay: 2s;
  }

  .line-3 {
    top: 80%;
    left: -100%;
    width: 100%;
    animation-delay: 4s;
  }

  @keyframes flow {
    to { left: 100%; }
  }

  .container {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .terminal-header {
    background: hsl(var(--card));
    border: 1px solid hsl(var(--border));
    border-radius: 12px;
    overflow: hidden;
  }

  .terminal-bar {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    background: hsl(var(--muted) / 0.5);
    border-bottom: 1px solid hsl(var(--border));
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    color: hsl(var(--muted-foreground));
  }

  .terminal-path {
    color: hsl(var(--primary));
  }

  .terminal-output {
    padding: 1.5rem;
    font-size: 1.5rem;
    font-weight: 600;
    color: hsl(var(--foreground));
    margin: 0;
    line-height: 1.4;
  }

  .prompt {
    color: hsl(var(--primary));
    font-family: var(--font-mono);
  }

  .glass-grid {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: 1rem;
  }

  .glass-card {
    position: relative;
    background: hsl(var(--card));
    backdrop-filter: blur(20px);
    border: 1px solid hsl(var(--border));
    border-radius: 16px;
    padding: 1.5rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .glass-card:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 4px 16px hsl(var(--foreground) / 0.08),
      0 8px 32px hsl(var(--foreground) / 0.04);
  }

  .primary-card {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .card-header {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
  }

  .icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: hsl(var(--primary) / 0.1);
    color: hsl(var(--primary));
    flex-shrink: 0;
  }

  .card-info {
    flex: 1;
    min-width: 0;
  }

  .card-label {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: hsl(var(--muted-foreground));
    margin: 0 0 0.25rem;
  }

  .card-value {
    font-size: 1rem;
    font-weight: 600;
    color: hsl(var(--foreground));
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .card-actions {
    display: flex;
    gap: 0.75rem;
  }

  .btn-primary {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.875rem 1.5rem;
    background: hsl(var(--primary));
    color: hsl(var(--primary-foreground));
    border: none;
    border-radius: 10px;
    font-size: 0.875rem;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-primary:hover {
    background: hsl(var(--primary) / 0.9);
    transform: scale(1.02);
  }

  .btn-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    background: hsl(var(--muted));
    border: 1px solid hsl(var(--border));
    border-radius: 10px;
    color: hsl(var(--foreground));
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-icon:hover {
    background: hsl(var(--foreground));
    color: hsl(var(--background));
  }

  .quick-actions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .social-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
  }

  .social-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
    background: hsl(var(--card));
    border: 1px solid hsl(var(--border));
    border-radius: 12px;
    text-decoration: none;
    color: hsl(var(--foreground));
    font-size: 0.8125rem;
    font-weight: 600;
    transition: all 0.2s;
  }

  .social-card:hover {
    border-color: hsl(var(--primary));
    transform: translateY(-2px);
  }

  .status-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 1rem;
    background: hsl(var(--muted) / 0.3);
    border: 1px solid hsl(var(--border));
    border-radius: 100px;
    font-size: 0.8125rem;
    color: hsl(var(--muted-foreground));
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  .dot {
    color: hsl(var(--border));
  }

  @media (max-width: 768px) {
    .contact-section {
      padding: 4rem 0;
    }

    .terminal-output {
      font-size: 1.25rem;
      padding: 1.25rem;
    }

    .glass-grid {
      grid-template-columns: 1fr;
    }

    .card-value {
      font-size: 0.875rem;
    }

    .social-grid {
      grid-template-columns: 1fr;
    }

    .status-bar {
      flex-direction: column;
      gap: 0.5rem;
      text-align: center;
    }

    .dot {
      display: none;
    }
  }
</style>
