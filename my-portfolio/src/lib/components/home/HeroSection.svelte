<!-- src/lib/components/home/HeroSection.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import gsap from "gsap";
  import { Button } from "$lib/components/ui/button";
  import { Card } from "$lib/components/ui/card";
  import { Badge } from "$lib/components/ui/badge";
  import {
    ArrowRight,
    Mail,
    Github,
    Linkedin,
    Instagram,
    Database,
    Cloud,
    Workflow,
    Server,
    Code2,
    MapPin,
    Briefcase,
    Calendar,
    TrendingUp,
    Zap,
    FileText,
  } from "lucide-svelte";
  import { getPersonalInfo, getCurrentCompany } from "$lib/data/portfolio-data";

  const personal = getPersonalInfo();
  const company = getCurrentCompany();

  let displayedText = "";
  let currentIndex = 0;
  let showCursor = true;
  let typingComplete = false;

  const fullText = personal.name;
  const typingSpeed = 80;

  const coreCompetencies = [
    { name: "Cloud Architecture", icon: Cloud, color: "text-blue-500" },
    { name: "Data Pipelines", icon: Workflow, color: "text-purple-500" },
    { name: "Big Data Processing", icon: Database, color: "text-green-500" },
    { name: "Infrastructure as Code", icon: Server, color: "text-orange-500" },
  ];

  const skillsWithProficiency = [
    { name: "AWS Cloud Services", level: 5 },
    { name: "Amazon Redshift", level: 5 },
    { name: "Data Lake Architecture", level: 4 },
    { name: "Scalable Data Pipelines", level: 5 },
    { name: "Python", level: 5 },
    { name: "Apache Spark", level: 4 },
  ];

  const RESUME_URL =
    "https://drive.google.com/file/d/1-HcNEDahb4LZHz2QR1g_hNq4_Pk3mkVw/view?usp=drive_link";

  onMount(() => {
    // Set initial states with more dramatic offsets
    gsap.set(".status-badge", { opacity: 0, scale: 0.8, y: -20 });
    gsap.set(".hero-name", { opacity: 0, x: -60, filter: "blur(10px)" });
    gsap.set(".hero-title", { opacity: 0, x: 40 });
    gsap.set(".hero-bio", { opacity: 0, y: 20 });
    gsap.set(".info-pill", { opacity: 0, scale: 0.8 });
    gsap.set(".section-label", { opacity: 0, y: 20 });
    gsap.set(".competency-item", { opacity: 0, y: 30, scale: 0.95 });
    gsap.set(".cta-group > *", { opacity: 0, y: 20, scale: 0.9 });
    gsap.set(".social-link", { opacity: 0, scale: 0.5 });
    gsap.set(".hero-right", { opacity: 0, x: 60 });
    gsap.set(".skill-row", { opacity: 0, x: 20 });
    gsap.set(".level-dot", { opacity: 0, scale: 0 });
    gsap.set(".skills-footer", { opacity: 0, y: 10 });

    // Master timeline with smooth easing
    const master = gsap.timeline({
      defaults: {
        ease: "power3.out",
        duration: 0.8,
      },
    });

    // Orchestrated sequence
    master
      // Badge - Pop in
      .to(
        ".status-badge",
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
        },
        0.1,
      )

      // Name - Slide with blur clear
      .to(
        ".hero-name",
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
        },
        0.3,
      )

      // Title - Slide from right
      .to(
        ".hero-title",
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
        },
        0.5,
      )

      // Bio - Gentle fade up
      .to(
        ".hero-bio",
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
        },
        0.7,
      )

      // Pills - Smooth stagger
      .to(
        ".info-pill",
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "back.out(1.5)",
        },
        0.9,
      )

      // Section label
      .to(
        ".section-label",
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
        },
        1.1,
      )

      // Competency items - Wave effect
      .to(
        ".competency-item",
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: {
            amount: 0.3,
            from: "start",
          },
          ease: "power2.out",
        },
        1.3,
      )

      // CTAs - Bounce in
      .to(
        ".cta-group > *",
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "elastic.out(1, 0.6)",
        },
        1.5,
      )

      // Social links - Pop in
      .to(
        ".social-link",
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "back.out(2)",
        },
        1.7,
      );

    // Skills card - Parallel timeline
    const skillsTimeline = gsap.timeline({ delay: 0.4 });

    skillsTimeline
      .to(".hero-right", {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: "power3.out",
      })
      .to(
        ".skill-row",
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.8",
      )
      .to(
        ".level-dot",
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          stagger: {
            amount: 0.6,
            from: "start",
            grid: "auto",
          },
          ease: "back.out(1.7)",
        },
        "-=0.4",
      )
      .to(
        ".skills-footer",
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
        },
        "-=0.2",
      );

    // Typing animation
    setTimeout(() => {
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
    }, 600);
  });

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
</script>

<section class="hero">
  <div class="grid-bg"></div>

  <div class="floating-nodes">
    {#each Array(15) as _, i}
      <div
        class="node"
        style="--delay: {i * 0.4}s; --x: {Math.random() *
          100}%; --y: {Math.random() * 100}%;"
      >
        {#if i % 3 === 0}<Database size={16} />
        {:else if i % 3 === 1}<Cloud size={16} />
        {:else}<Zap size={16} />{/if}
      </div>
    {/each}
  </div>

  <div class="container">
    <div class="hero-grid">
      <div class="hero-left">
        <Badge variant="outline" class="status-badge">
          <TrendingUp size={14} class="text-green-500" />
          Available for opportunities
        </Badge>

        <div class="hero-intro">
          <h1 class="hero-name">
            {displayedText}
            <span class="cursor" class:blink={showCursor && typingComplete}
              >_</span
            >
          </h1>
          <h2 class="hero-title">{personal.jobTitle}</h2>
          <p class="hero-bio">{personal.shortBio}</p>
        </div>

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

        <div class="cta-group">
          <Button
            size="lg"
            class="cta-primary"
            onclick={() => scrollTo("projects")}
          >
            View Projects <ArrowRight size={18} />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onclick={() => scrollTo("contact")}
          >
            <Mail size={18} /> Get in Touch
          </Button>
          <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="secondary" class="cta-resume">
              <FileText size={18} /> View Resume
            </Button>
          </a>
        </div>

        <div class="social-links">
          <a
            href={personal.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            class="social-link"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href={personal.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            class="social-link"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
          {#if personal.socialLinks.instagram}
            <a
              href={personal.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              class="social-link"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
          {/if}
        </div>
      </div>

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
  .grid-bg {
    position: absolute;
    inset: 0;
    background-image: linear-gradient(hsl(var(--border)) 1px, transparent 1px),
      linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px);
    background-size: 50px 50px;
    opacity: 0.1;
    animation: gridMove 30s linear infinite;
  }
  @keyframes gridMove {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(50px, 50px);
    }
  }

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
    0%,
    100% {
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
  }
  .cursor.blink {
    animation: blink 1s step-end infinite;
  }
  @keyframes blink {
    50% {
      opacity: 0;
    }
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

  .cta-group {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
  .cta-group a {
    text-decoration: none;
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
  :global(.cta-resume) {
    gap: 0.5rem;
  }

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
    .cta-group > * {
      width: 100%;
    }
  }
</style>
