<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import { Badge } from "$lib/components/ui/badge";
  import IOSTabs from "$lib/components/ui/ios-tabs.svelte";
  import {
    Database, Cloud, Sparkles, Code2, Workflow, Server, Container,
    HardDrive, GitBranch, Layers, Search, Brain, Zap, FileCode,
    Terminal, Globe, Activity, BarChart,
  } from "lucide-svelte";

  const techCategories = {
    data: {
      name: "Data Engineering",
      icon: Database,
      technologies: [
        { name: "Apache Kafka", icon: Workflow },
        { name: "Apache Airflow", icon: GitBranch },
        { name: "Prefect", icon: Workflow },
        { name: "dbt", icon: Layers },
        { name: "Amazon Redshift", icon: Database },
        { name: "TiDB", icon: Database },
        { name: "Google BigQuery", icon: BarChart },
        { name: "Aurora PostgreSQL", icon: Database },
        { name: "DynamoDB", icon: HardDrive },
        { name: "ETL/ELT", icon: Workflow },
        { name: "Data Pipelines", icon: GitBranch },
        { name: "Real-Time Streaming", icon: Zap },
      ],
    },
    cloud: {
      name: "Cloud",
      icon: Cloud,
      technologies: [
        { name: "AWS", icon: Cloud },
        { name: "GCP", icon: Cloud },
        { name: "Amazon S3", icon: HardDrive },
        { name: "AWS Lambda", icon: Zap },
        { name: "Docker", icon: Container },
        { name: "Kubernetes", icon: Container },
        { name: "Linux", icon: Terminal },
      ],
    },
    ai: {
      name: "AI & Innovation",
      icon: Sparkles,
      technologies: [
        { name: "Vector Databases", icon: Database },
        { name: "Vector Search", icon: Search },
        { name: "Semantic Search", icon: Brain },
        { name: "GenAI Architecture", icon: Sparkles },
        { name: "GraphQL APIs", icon: Globe },
        { name: "CI/CD", icon: GitBranch },
      ],
    },
    code: {
      name: "Programming",
      icon: Code2,
      technologies: [
        { name: "Python", icon: FileCode },
        { name: "SQL", icon: Database },
        { name: "Shell Scripting", icon: Terminal },
        { name: "GraphQL", icon: Globe },
        { name: "REST APIs", icon: Globe },
      ],
    },
  };

  let activeTab = "data";

  const tabs = Object.entries(techCategories).map(([key, cat]) => ({
    id: key,
    label: cat.name,
    icon: cat.icon,
  }));

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".header",
          start: "top 75%",
          end: "bottom 25%",
          toggleActions: "play none none none",
        }
      });

      headerTl
        .from(".header-badge", { opacity: 0, y: 30, duration: 0.6, ease: "power2.out" })
        .from(".title", { opacity: 0, y: 30, duration: 0.6, ease: "power2.out" }, "-=0.4")
        .from(".subtitle", { opacity: 0, y: 30, duration: 0.6, ease: "power2.out" }, "-=0.4");

      gsap.from(".flow-lines line", {
        strokeDashoffset: 800,
        duration: 1.5,
        stagger: 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: ".lines-bg",
          start: "top 60%",
          toggleActions: "play none none none",
        }
      });

      gsap.from(".data-dot", {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: ".lines-bg",
          start: "top 50%",
          toggleActions: "play none none none",
        }
      });

      const techNodes = gsap.utils.toArray(".tech-node");
      techNodes.forEach((node: any, i: number) => {
        gsap.from(node, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: node,
            start: "top 85%",
            toggleActions: "play none none none",
          }
        });
      });

      const statCards = gsap.utils.toArray(".stat-card");
      statCards.forEach((card: any, i: number) => {
        gsap.from(card, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          delay: i * 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          }
        });
      });
    });

    mm.add("(max-width: 767px)", () => {
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".header",
          start: "top 80%",
          toggleActions: "play none none none",
        }
      });

      headerTl
        .from(".header-badge", { opacity: 0, y: 20, duration: 0.5 })
        .from(".title", { opacity: 0, y: 20, duration: 0.5 }, "-=0.3")
        .from(".subtitle", { opacity: 0, y: 20, duration: 0.5 }, "-=0.3");

      gsap.from(".tech-node", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".tech-grid",
          start: "top 80%",
          toggleActions: "play none none none",
        }
      });

      gsap.from(".stat-card", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".stats-grid",
          start: "top 85%",
          toggleActions: "play none none none",
        }
      });
    });

    const nodeHover = gsap.utils.toArray(".tech-node");
    nodeHover.forEach((node: any) => {
      const content = node.querySelector(".node-content");
      const icon = node.querySelector(".node-icon");
      const label = node.querySelector(".node-label");

      node.addEventListener("mouseenter", () => {
        gsap.to(content, { y: -6, duration: 0.3, ease: "power2.out" });
        gsap.to(icon, { scale: 1.1, duration: 0.3, ease: "back.out(2)" });
        gsap.to(label, { x: 4, duration: 0.3, ease: "power2.out" });
      });

      node.addEventListener("mouseleave", () => {
        gsap.to(content, { y: 0, duration: 0.3, ease: "power2.out" });
        gsap.to(icon, { scale: 1, duration: 0.3, ease: "power2.out" });
        gsap.to(label, { x: 0, duration: 0.3, ease: "power2.out" });
      });
    });

    const statHover = gsap.utils.toArray(".stat-card");
    statHover.forEach((card: any) => {
      const icon = card.querySelector("svg");
      
      card.addEventListener("mouseenter", () => {
        gsap.to(card, { y: -6, duration: 0.3, ease: "power2.out" });
        gsap.to(icon, { scale: 1.15, rotate: 10, duration: 0.3, ease: "back.out(2)" });
      });
      
      card.addEventListener("mouseleave", () => {
        gsap.to(card, { y: 0, duration: 0.3, ease: "power2.out" });
        gsap.to(icon, { scale: 1, rotate: 0, duration: 0.3, ease: "power2.out" });
      });
    });
  });

  onDestroy(() => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  });

  function handleTabChange(id: string) {
    gsap.to(".tech-node", {
      opacity: 0,
      y: -20,
      duration: 0.3,
      stagger: 0.02,
      ease: "power2.in",
      onComplete: () => {
        activeTab = id;
        gsap.fromTo(".tech-node",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.04,
            ease: "power2.out",
          }
        );
      }
    });
  }
</script>

<section class="tech-section">
  <div class="lines-bg">
    <svg class="flow-lines" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
      <line x1="200" y1="0" x2="200" y2="800" stroke="currentColor" stroke-width="1" opacity="0.1" stroke-dasharray="800" />
      <line x1="400" y1="0" x2="400" y2="800" stroke="currentColor" stroke-width="1" opacity="0.1" stroke-dasharray="800" />
      <line x1="600" y1="0" x2="600" y2="800" stroke="currentColor" stroke-width="1" opacity="0.1" stroke-dasharray="800" />
      <line x1="800" y1="0" x2="800" y2="800" stroke="currentColor" stroke-width="1" opacity="0.1" stroke-dasharray="800" />
      <line x1="1000" y1="0" x2="1000" y2="800" stroke="currentColor" stroke-width="1" opacity="0.1" stroke-dasharray="800" />

      <circle class="data-dot" r="4" fill="currentColor">
        <animateMotion dur="4s" repeatCount="indefinite">
          <mpath href="#path1" />
        </animateMotion>
      </circle>
      <circle class="data-dot" r="4" fill="currentColor">
        <animateMotion dur="5s" repeatCount="indefinite" begin="1s">
          <mpath href="#path2" />
        </animateMotion>
      </circle>
      <circle class="data-dot" r="4" fill="currentColor">
        <animateMotion dur="6s" repeatCount="indefinite" begin="2s">
          <mpath href="#path3" />
        </animateMotion>
      </circle>

      <path id="path1" d="M 200 0 L 200 800" fill="none" />
      <path id="path2" d="M 600 0 L 600 800" fill="none" />
      <path id="path3" d="M 1000 0 L 1000 800" fill="none" />
    </svg>
  </div>

  <div class="container">
    <div class="header">
      <Badge class="header-badge inline-flex items-center gap-2 mb-4">
        <Activity size={14} />
        <span>TECH STACK</span>
      </Badge>
      <h2 class="title">Technologies & Tools</h2>
      <p class="subtitle">Production-grade stack powering enterprise infrastructure</p>
    </div>

    <IOSTabs {tabs} {activeTab} onChange={handleTabChange} />

    <div class="tech-content">
      {#each Object.entries(techCategories) as [key, cat]}
        {#if activeTab === key}
          <div class="tech-grid">
            {#each cat.technologies as tech}
              <div class="tech-node">
                <div class="node-content">
                  <div class="node-icon">
                    <svelte:component this={tech.icon} size={18} />
                  </div>
                  <span class="node-label">{tech.name}</span>
                </div>
              </div>
            {/each}
          </div>
        {/if}
      {/each}
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <Database size={24} class="text-primary" />
        <span class="stat-value">50+</span>
        <span class="stat-label">Technologies</span>
      </div>
      <div class="stat-card">
        <Cloud size={24} class="text-primary" />
        <span class="stat-value">AWS & GCP</span>
        <span class="stat-label">Cloud Platforms</span>
      </div>
      <div class="stat-card">
        <Sparkles size={24} class="text-primary" />
        <span class="stat-value">5+ Years</span>
        <span class="stat-label">Experience</span>
      </div>
    </div>
  </div>
</section>

<style>
  .tech-section { position: relative; padding: 5rem 0; background: hsl(var(--background)); overflow: hidden; }
  .lines-bg { position: absolute; inset: 0; pointer-events: none; opacity: 0.4; }
  .flow-lines { width: 100%; height: 100%; color: hsl(var(--primary)); }
  .data-dot { opacity: 0.6; }
  .container { position: relative; max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
  .header { text-align: center; margin-bottom: 3rem; }
  .title { font-size: 2.5rem; font-weight: 800; color: hsl(var(--foreground)); margin: 0 0 0.75rem; }
  .subtitle { font-size: 0.9375rem; color: hsl(var(--muted-foreground)); margin: 0; }
  .tech-content { margin: 3rem 0; }
  .tech-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 2rem 1.5rem; }
  .tech-node { position: relative; }

  .node-content { position: relative; display: flex; align-items: center; gap: 0.875rem; padding: 1rem 1.25rem; background: hsl(var(--card)); border: 1px solid hsl(var(--border)); border-radius: calc(var(--radius) - 2px); transition: border-color 0.3s, box-shadow 0.3s; }
  .node-content:hover { border-color: hsl(var(--primary)); box-shadow: 0 8px 20px hsl(var(--foreground) / 0.06); }
  .node-icon { display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; background: hsl(var(--muted)); border-radius: calc(var(--radius) - 4px); color: hsl(var(--primary)); flex-shrink: 0; transition: background 0.3s, color 0.3s; }
  .node-content:hover .node-icon { background: hsl(var(--primary)); color: white; }
  .node-label { font-size: 0.875rem; font-weight: 600; color: hsl(var(--foreground)); }

  .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-top: 4rem; }
  .stat-card { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; padding: 1.5rem; background: hsl(var(--card)); border: 1px solid hsl(var(--border)); border-radius: var(--radius); text-align: center; cursor: pointer; }
  .stat-value { font-family: var(--font-mono); font-size: 1.5rem; font-weight: 700; color: hsl(var(--foreground)); }
  .stat-label { font-size: 0.875rem; color: hsl(var(--muted-foreground)); }

  @media (max-width: 768px) {
    .container { padding: 0 1rem; }
    .title { font-size: 2rem; }
    .tech-grid { grid-template-columns: 1fr; gap: 1.5rem; }
    .stats-grid { grid-template-columns: 1fr; }
  }
</style>
