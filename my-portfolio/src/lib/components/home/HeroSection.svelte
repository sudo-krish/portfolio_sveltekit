<!-- src/lib/components/home/HeroSection.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { Button } from '$lib/components/ui/button';
  import { Card } from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import { 
    ArrowRight, Mail, Github, Linkedin, Instagram, 
    Database, Cloud, Workflow, Server, Code2, 
    MapPin, Briefcase, Calendar, TrendingUp, Zap
  } from 'lucide-svelte';
  import { getPersonalInfo, getCurrentCompany } from '$lib/data/portfolio-data';
  
  const personal = getPersonalInfo();
  const company = getCurrentCompany();
  
  let displayedText = '';
  let currentIndex = 0;
  let showCursor = true;
  let typingComplete = false;
  
  const fullText = personal.name;
  const typingSpeed = 80;
  
  // Core competencies with icons
  const coreCompetencies = [
    { name: 'Cloud Architecture', icon: Cloud, color: 'text-blue-500' },
    { name: 'Data Pipelines', icon: Workflow, color: 'text-purple-500' },
    { name: 'Big Data Processing', icon: Database, color: 'text-green-500' },
    { name: 'Infrastructure as Code', icon: Server, color: 'text-orange-500' }
  ];
  
  // Top skills with proficiency
  const skillsWithProficiency = [
    { name: 'AWS Cloud Services', level: 5 },
    { name: 'Amazon Redshift', level: 5 },
    { name: 'Data Lake Architecture', level: 4 },
    { name: 'Scalable Data Pipelines', level: 5 },
    { name: 'Python', level: 5 },
    { name: 'Apache Spark', level: 4 }
  ];
  
  onMount(() => {
    const typeInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        displayedText = fullText.slice(0, currentIndex + 1);
        currentIndex++;
      } else {
        typingComplete = true;
        clearInterval(typeInterval);
      }
    }, typingSpeed);
    
    const cursorInterval = setInterval(() => {
      showCursor = !showCursor;
    }, 530);
    
    return () => {
      clearInterval(typeInterval);
      clearInterval(cursorInterval);
    };
  });
  
  function scrollToProjects() {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  }
  
  function scrollToContact() {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }
</script>

<section class="hero">
  <!-- Grid Background -->
  <div class="grid-background"></div>
  
  <!-- Floating Data Elements -->
  <div class="floating-nodes">
    {#each Array(15) as _, i}
      <div class="node" style="--delay: {i * 0.4}s; --x: {Math.random() * 100}%; --y: {Math.random() * 100}%;">
        {#if i % 3 === 0}
          <Database size={16} />
        {:else if i % 3 === 1}
          <Cloud size={16} />
        {:else}
          <Zap size={16} />
        {/if}
      </div>
    {/each}
  </div>
  
  <div class="container">
    <div class="hero-grid">
      
      <!-- Left Column: Main Info -->
      <div class="hero-left">
        
        <Badge variant="outline" class="status-badge">
          <TrendingUp size={14} class="text-green-500" />
          Available for opportunities
        </Badge>
        
        <div class="hero-intro">
          <h1 class="hero-name">
            {displayedText}
            <span class="cursor" class:blink={showCursor && typingComplete}>_</span>
          </h1>
          
          <h2 class="hero-title">{personal.jobTitle}</h2>
          
          <p class="hero-bio">{personal.shortBio}</p>
        </div>
        
        <!-- Info Pills -->
        <div class="info-pills">
          <div class="info-pill">
            <MapPin size={14} />
            <span>{personal.address.city}, {personal.address.country}</span>
          </div>
          {#if company}
            <div class="info-pill">
              <Briefcase size={14} />
              <span>{company.name}</span>
            </div>
          {/if}
          <div class="info-pill">
            <Calendar size={14} />
            <span>{personal.yearsOfExperience}+ Years</span>
          </div>
        </div>
        
        <!-- Core Competencies -->
        <div class="competencies-section">
          <h3 class="section-label">Core Competencies</h3>
          <div class="competencies-grid">
            {#each coreCompetencies as comp}
              <div class="competency-item">
                <div class="comp-icon {comp.color}">
                  <svelte:component this={comp.icon} size={20} />
                </div>
                <span>{comp.name}</span>
              </div>
            {/each}
          </div>
        </div>
        
        <!-- CTAs -->
        <div class="cta-group">
          <Button size="lg" class="cta-primary" onclick={scrollToProjects}>
            View Projects
            <ArrowRight size={18} />
          </Button>
          <Button size="lg" variant="outline" onclick={scrollToContact}>
            <Mail size={18} />
            Get in Touch
          </Button>
        </div>
        
        <!-- Social Links -->
        <div class="social-links">
          <a href={personal.socialLinks.github} target="_blank" rel="noopener noreferrer" class="social-link">
            <Github size={18} />
          </a>
          <a href={personal.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" class="social-link">
            <Linkedin size={18} />
          </a>
          {#if personal.socialLinks.instagram}
            <a href={personal.socialLinks.instagram} target="_blank" rel="noopener noreferrer" class="social-link">
              <Instagram size={18} />
            </a>
          {/if}
        </div>
        
      </div>
      
      <!-- Right Column: Skills Card -->
      <div class="hero-right">
        <Card class="skills-card">
          <div class="skills-header">
            <Code2 size={20} class="text-primary" />
            <h3>Technical Skills</h3>
          </div>
          
          <div class="skills-list">
            {#each skillsWithProficiency as skill}
              <div class="skill-row">
                <span class="skill-name">{skill.name}</span>
                <div class="skill-level">
                  {#each Array(5) as _, i}
                    <div class="level-dot" class:active={i < skill.level}></div>
                  {/each}
                </div>
              </div>
            {/each}
          </div>
          
          <div class="skills-footer">
            <span class="footer-text">+ 20 more technologies</span>
          </div>
        </Card>
      </div>
      
    </div>
  </div>
</section>

<style>
  .hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: 6rem 0;
    background: hsl(var(--background));
    overflow: hidden;
  }
  
  /* Grid Background */
  .grid-background {
    position: absolute;
    inset: 0;
    background-image: 
      linear-gradient(hsl(var(--border)) 1px, transparent 1px),
      linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px);
    background-size: 50px 50px;
    opacity: 0.1;
    animation: gridMove 30s linear infinite;
  }
  
  @keyframes gridMove {
    0% { transform: translate(0, 0); }
    100% { transform: translate(50px, 50px); }
  }
  
  /* Floating Data Elements */
  .floating-nodes {
    position: absolute;
    inset: 0;
    overflow: hidden;
    opacity: 0.25;
    pointer-events: none;
  }
  
  .node {
    position: absolute;
    left: var(--x);
    top: var(--y);
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: hsl(var(--primary));
    animation: float 6s ease-in-out infinite;
    animation-delay: var(--delay);
  }
  
  @keyframes float {
    0%, 100% { 
      transform: translateY(0) rotate(0deg);
      opacity: 0.3;
    }
    50% { 
      transform: translateY(-30px) rotate(180deg);
      opacity: 0.6;
    }
  }
  
  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
    width: 100%;
    position: relative;
    z-index: 1;
  }
  
  .hero-grid {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 4rem;
    align-items: start;
  }
  
  /* Left Column */
  .hero-left {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  
  :global(.status-badge) {
    display: inline-flex;
    gap: 0.5rem;
    width: fit-content;
    font-size: 0.875rem;
  }
  
  .hero-intro {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .hero-name {
    font-size: 3.5rem;
    font-weight: 800;
    color: hsl(var(--foreground));
    line-height: 1.1;
    margin: 0;
  }
  
  .cursor {
    color: hsl(var(--primary));
    animation: blink 1s step-end infinite;
  }
  
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
  
  .hero-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: hsl(var(--primary));
    margin: 0;
  }
  
  .hero-bio {
    font-size: 1.125rem;
    color: hsl(var(--muted-foreground));
    line-height: 1.6;
    margin: 0;
    max-width: 600px;
  }
  
  /* Info Pills */
  .info-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }
  
  .info-pill {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: hsl(var(--muted) / 0.5);
    border: 1px solid hsl(var(--border));
    border-radius: 100px;
    font-size: 0.875rem;
    color: hsl(var(--foreground));
  }
  
  /* Core Competencies */
  .competencies-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .section-label {
    font-size: 0.875rem;
    font-weight: 600;
    color: hsl(var(--muted-foreground));
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin: 0;
  }
  
  .competencies-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  
  .competency-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    background: hsl(var(--card));
    border: 1px solid hsl(var(--border));
    border-radius: 8px;
    transition: all 0.2s ease;
  }
  
  .competency-item:hover {
    border-color: hsl(var(--primary));
    transform: translateY(-2px);
    box-shadow: 0 4px 12px hsl(var(--primary) / 0.1);
  }
  
  .comp-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: hsl(var(--muted));
    border-radius: 8px;
  }
  
  .competency-item span {
    font-size: 0.9375rem;
    font-weight: 500;
    color: hsl(var(--foreground));
  }
  
  /* CTAs */
  .cta-group {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
  
  :global(.cta-primary) {
    background: hsl(var(--primary)) !important;
    color: white !important;
    gap: 0.5rem;
  }
  
  :global(.cta-primary:hover) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px hsl(var(--primary) / 0.4);
  }
  
  /* Social Links */
  .social-links {
    display: flex;
    gap: 0.75rem;
  }
  
  .social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 8px;
    background: hsl(var(--muted));
    color: hsl(var(--muted-foreground));
    transition: all 0.2s ease;
    text-decoration: none;
  }
  
  .social-link:hover {
    background: hsl(var(--primary));
    color: white;
    transform: translateY(-2px);
  }
  
  /* Right Column: Skills Card */
  .hero-right {
    position: sticky;
    top: 6rem;
  }
  
  :global(.skills-card) {
    padding: 2rem;
    background: hsl(var(--card));
    border: 1px solid hsl(var(--border));
  }
  
  .skills-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid hsl(var(--border));
  }
  
  .skills-header h3 {
    font-size: 1.125rem;
    font-weight: 600;
    color: hsl(var(--foreground));
    margin: 0;
  }
  
  .skills-list {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }
  
  .skill-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .skill-name {
    font-size: 0.9375rem;
    font-weight: 500;
    color: hsl(var(--foreground));
  }
  
  .skill-level {
    display: flex;
    gap: 0.375rem;
  }
  
  .level-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: hsl(var(--muted));
    transition: all 0.2s ease;
  }
  
  .level-dot.active {
    background: hsl(var(--primary));
    box-shadow: 0 0 8px hsl(var(--primary) / 0.5);
  }
  
  .skills-footer {
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid hsl(var(--border));
  }
  
  .footer-text {
    font-size: 0.875rem;
    color: hsl(var(--muted-foreground));
  }
  
  /* Responsive */
  @media (max-width: 1024px) {
    .hero-grid {
      grid-template-columns: 1fr;
      gap: 3rem;
    }
    
    .hero-right {
      position: static;
    }
    
    .hero-name {
      font-size: 2.5rem;
    }
  }
  
  @media (max-width: 640px) {
    .hero {
      padding: 4rem 0;
    }
    
    .hero-name {
      font-size: 2rem;
    }
    
    .hero-title {
      font-size: 1.25rem;
    }
    
    .hero-bio {
      font-size: 1rem;
    }
    
    .competencies-grid {
      grid-template-columns: 1fr;
    }
    
    .cta-group {
      flex-direction: column;
    }
    
    :global(.cta-primary),
    :global(button[variant="outline"]) {
      width: 100%;
      justify-content: center;
    }
  }
</style>
