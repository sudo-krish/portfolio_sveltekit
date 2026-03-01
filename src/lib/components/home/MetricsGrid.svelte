<!-- src/lib/components/home/MetricsGrid.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import {
    Zap,
    Activity,
    Database,
    GitBranch,
    Globe,
    Sparkles,
    Layers,
    Rocket,
    TrendingUp,
    Terminal
  } from "lucide-svelte";
  import { Badge } from "$lib/components/ui/badge";
  import { Card } from "$lib/components/ui/card";

  import LeetCodeCard from "./LeetCodeCard.svelte";
  import GitHubStatsCard from "./GitHubStatsCard.svelte";
  import ExperienceCard from "./ExperienceCard.svelte";
  import SpecialtyCard from "./SpecialtyCard.svelte";
  import ImpactMetricsCard from "./ImpactMetricsCard.svelte";
  import ProjectMetricsCard from "./ProjectMetricsCard.svelte";
  import CertificationsCard from "./CertificationsCard.svelte";
  import ResearchCard from "./ResearchCard.svelte";
  import TechStackCard from "./TechStackCard.svelte";
  import LocationCard from "./LocationCard.svelte";
  import CareerTimelineCard from "./CareerTimelineCard.svelte";

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);
    const scroller = ".snap-container";

    // Initialize states
    gsap.set(".floating-icon", { scale: 0, rotation: -180 });
    gsap.set(".title-content", { opacity: 0, x: -30 });
    gsap.set(".stats-card", { opacity: 0, y: -20 });
    gsap.set(".section-description", { opacity: 0, y: 20 });
    gsap.set(".left-side > *", { opacity: 0, x: -40 });
    gsap.set(".right-side > *", { opacity: 0, x: 40 });
    gsap.set(".specialties-bottom > *", { opacity: 0, y: 30, scale: 0.9 });
    // Sets for mobile groups
    gsap.set([".group-240 > *", ".group-320 > *"], { opacity: 0, y: 30 });
    gsap.set(".main-cards > *", { opacity: 0, x: -30 });
    gsap.set(".specialties-side > *", { opacity: 0, scale: 0.9 });

    // Header Animation
    const headerTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".section-header",
        scroller: scroller,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      defaults: { ease: "power3.out" },
    });

    headerTl
      .to(".floating-icon", {
        scale: 1,
        rotation: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
      })
      .to(".title-content", { opacity: 1, x: 0, duration: 0.6 }, "-=0.4")
      .to(".stats-card", { opacity: 1, y: 0, duration: 0.6 }, "-=0.3")
      .to(".section-description", { opacity: 1, y: 0, duration: 0.6 }, "-=0.2");

    // Grid Animations (Restored your logic, added scroller)
    if (window.innerWidth > 1024) {
      gsap.to(".left-side > *", {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".left-side",
          scroller: scroller,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.to(".right-side > *", {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".right-side",
          scroller: scroller,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.to(".specialties-bottom > *", {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: { amount: 0.4, from: "start" },
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: ".specialties-bottom",
          scroller: scroller,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    } else {
      // Combined mobile logic for simplicity in this snippet
      const mobileGroups = [".group-240", ".group-320", ".main-cards", ".specialties-side"];
      mobileGroups.forEach(group => {
         if(document.querySelector(group)) {
             gsap.to(`${group} > *`, {
                opacity: 1, y: 0, x: 0, scale: 1,
                duration: 0.6, stagger: 0.1,
                scrollTrigger: {
                    trigger: group,
                    scroller: scroller,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
             });
         }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  });
</script>

<div class="metrics-container relative">
  
  <!-- DECORATIVE LINE (Matches Hero/Warehouse) -->
  <div class="hidden lg:block absolute -left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 to-transparent"></div>
  <div class="hidden lg:block absolute -left-[2.15rem] top-0 text-blue-500/40">
    <Activity size={14} />
  </div>

  <header class="section-header">
    
    <!-- 1. SYSTEM STATUS (Added to match theme) -->
    <div class="mb-6 flex justify-start">
        <div class="inline-flex items-center gap-2.5 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span class="font-mono text-[10px] font-semibold text-blue-200 tracking-widest uppercase">
            System Telemetry
          </span>
        </div>
    </div>

    <div class="title-row">
      <div class="title-wrapper">
        <div class="floating-icon">
          <Terminal size={32} />
        </div>
        <div class="title-content">
          <h2 class="section-title">
            Engineering <br />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-300% animate-gradient">
               Metrics.
            </span>
          </h2>
        </div>
      </div>

      <Card class="stats-card border-blue-500/20 bg-background/50 backdrop-blur-xl">
        <div class="stats-bar">
          <div class="stat-item">
            <span class="stat-value text-blue-400">5+</span>
            <span class="stat-label">Years Experience</span>
          </div>
          <div class="stat-divider bg-blue-500/20"></div>
          <div class="stat-item">
            <span class="stat-value text-purple-400">50+</span>
            <span class="stat-label">Projects</span>
          </div>
          <div class="stat-divider bg-blue-500/20"></div>
          <div class="stat-item featured text-cyan-400">
            <TrendingUp size={14} />
            <span class="stat-label text-cyan-400">High Impact</span>
          </div>
        </div>
      </Card>
    </div>

    <p class="section-description border-l-2 border-blue-500/30 pl-4">
      Production-grade data pipelines • Real-time CDC • Multi-cloud architecture
      • 5-minute SLA warehouse
    </p>
  </header>

  <!-- === ORIGINAL LAYOUT STRUCTURE PRESERVED === -->

  <div class="desktop-layout">
    <div class="left-side">
      <LeetCodeCard />
      <GitHubStatsCard />
      <ImpactMetricsCard />
      <ProjectMetricsCard />
      <CareerTimelineCard />
      <CertificationsCard />
    </div>

    <div class="right-side">
      <ExperienceCard />
      <ResearchCard />
      <TechStackCard />
      <LocationCard />
    </div>

    <div class="specialties-bottom">
      <SpecialtyCard
        icon={Zap}
        title="Real-Time CDC"
        highlight="RARE"
        description="Kafka + Debezium"
        tags={["Kafka", "Debezium", "CDC"]}
      />
      <SpecialtyCard
        icon={Database}
        title="NRT Warehouse"
        highlight="5-MIN SLA"
        description="Sub-5-minute refresh"
        tags={["Redshift", "Glue", "Lambda"]}
      />
      <SpecialtyCard
        icon={GitBranch}
        title="Polyglot ETL"
        highlight="PYTHON+GO"
        description="Multi-language transforms"
        tags={["Python", "Go", "PySpark"]}
      />
      <SpecialtyCard
        icon={Globe}
        title="Cloud Migration"
        highlight="GCP→AWS"
        description="K8s orchestration"
        tags={["AWS", "GCP", "K8s"]}
      />
      <SpecialtyCard
        icon={Sparkles}
        title="Vector DB & AI"
        highlight="AI-READY"
        description="Semantic search + NLQ"
        tags={["Vector DB", "GraphQL", "GenAI"]}
      />
      <SpecialtyCard
        icon={Layers}
        title="Data Lake Design"
        highlight="MEDALLION"
        description="Bronze-Silver-Gold zones"
        tags={["S3", "Parquet", "Delta"]}
      />
      <SpecialtyCard
        icon={Rocket}
        title="Big Data at Scale"
        highlight="5TB+/MONTH"
        description="Spark optimization"
        tags={["PySpark", "EMR", "Hadoop"]}
      />
    </div>
  </div>

  <div class="tablet-mobile-layout">
    <div class="group-240">
      <LeetCodeCard />
      <GitHubStatsCard />
      <ImpactMetricsCard />
      <ProjectMetricsCard />
    </div>

    <div class="group-320">
      <CareerTimelineCard />
      <CertificationsCard />
    </div>

    <div class="group-with-specialties">
      <div class="main-cards">
        <ExperienceCard />
        <ResearchCard />
        <TechStackCard />
        <LocationCard />
      </div>

      <div class="specialties-side">
        <!-- (Same Specialties as above, repeated for mobile layout) -->
        <SpecialtyCard icon={Zap} title="Real-Time CDC" highlight="RARE" description="Kafka + Debezium" tags={["Kafka", "Debezium", "CDC"]} />
        <SpecialtyCard icon={Database} title="NRT Warehouse" highlight="5-MIN SLA" description="Sub-5-minute refresh" tags={["Redshift", "Glue", "Lambda"]} />
        <SpecialtyCard icon={GitBranch} title="Polyglot ETL" highlight="PYTHON+GO" description="Multi-language transforms" tags={["Python", "Go", "PySpark"]} />
        <SpecialtyCard icon={Globe} title="Cloud Migration" highlight="GCP→AWS" description="K8s orchestration" tags={["AWS", "GCP", "K8s"]} />
        <SpecialtyCard icon={Sparkles} title="Vector DB & AI" highlight="AI-READY" description="Semantic search + NLQ" tags={["Vector DB", "GraphQL", "GenAI"]} />
        <SpecialtyCard icon={Layers} title="Data Lake Design" highlight="MEDALLION" description="Bronze-Silver-Gold zones" tags={["S3", "Parquet", "Delta"]} />
        <SpecialtyCard icon={Rocket} title="Big Data at Scale" highlight="5TB+/MONTH" description="Spark optimization" tags={["PySpark", "EMR", "Hadoop"]} />
      </div>
    </div>
  </div>
</div>

<style>
  .metrics-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 2rem 0;
    max-width: 1200px;
    margin: 0 auto;
    /* Added minimal padding for decorative line on left */
    padding-left: 1rem; 
  }

  /* --- HEADER THEME UPDATES --- */
  .section-header {
    margin-bottom: 3rem;
  }
  .title-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    margin-bottom: 1.5rem;
  }
  .title-wrapper {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }
  .floating-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;
    /* Updated Gradient to Blue/Dark */
    background: linear-gradient(135deg, rgba(37,99,235,0.2) 0%, rgba(30,58,138,0.4) 100%);
    border: 1px solid rgba(59,130,246,0.3);
    border-radius: 16px;
    color: #60a5fa; /* Blue-400 */
    box-shadow: 0 0 20px rgba(37,99,235,0.2);
  }
  .title-content {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .section-title {
    font-size: clamp(2rem, 4vw, 3.5rem);
    font-weight: 800;
    color: hsl(var(--foreground));
    margin: 0;
    line-height: 1.1;
    letter-spacing: -0.02em;
  }
  
  /* Gradient Animation */
  .bg-300\% { background-size: 300% 300%; }
  .animate-gradient { animation: animatedgradient 6s ease infinite alternate; }
  @keyframes animatedgradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  /* --- STATS CARD UPDATES --- */
  :global(.stats-card) {
    padding: 1rem 1.5rem;
    /* Glassmorphism handled in HTML class now */
  }
  .stats-bar {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .stat-item {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    align-items: center;
  }
  .stat-item.featured {
    flex-direction: row;
    gap: 0.5rem;
    /* color set in HTML */
  }
  .stat-value {
    font-family: var(--font-mono);
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1;
  }
  .stat-label {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    color: hsl(var(--muted-foreground));
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  .stat-divider {
    width: 1px;
    height: 32px;
  }

  .section-description {
    font-family: var(--font-mono);
    font-size: 1rem;
    color: hsl(var(--muted-foreground));
    line-height: 1.8;
    max-width: 900px;
  }

  /* --- LAYOUT GRID (UNCHANGED) --- */
  .tablet-mobile-layout {
    display: none;
  }

  @media (min-width: 1025px) {
    .desktop-layout {
      display: grid;
      grid-template-columns: 480px 1fr;
      grid-template-rows: auto auto;
      gap: 1.5rem;
    }
    .left-side {
      grid-column: 1;
      grid-row: 1;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    .right-side {
      grid-column: 2;
      grid-row: 1;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    .right-side > :global(*) {
      height: 100%;
    }
    .specialties-bottom {
      grid-column: 1 / -1;
      grid-row: 2;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.5rem;
    }
    .tablet-mobile-layout {
      display: none;
    }
  }

  @media (max-width: 1024px) and (min-width: 769px) {
    .desktop-layout { display: none; }
    .tablet-mobile-layout {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    .group-240 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
    .group-320 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
    .group-with-specialties { display: grid; grid-template-columns: 1fr 280px; gap: 1.5rem; }
    .main-cards { display: flex; flex-direction: column; gap: 1.5rem; }
    .specialties-side { display: flex; flex-direction: column; gap: 1.5rem; }
    .title-row { flex-direction: column; align-items: flex-start; }
    :global(.stats-card) { width: 100%; }
  }

  @media (max-width: 768px) {
    .desktop-layout { display: none; }
    .metrics-container { gap: 1rem; padding: 1rem 0; padding-left: 1rem; }
    .tablet-mobile-layout { display: flex; flex-direction: column; gap: 1rem; }
    .group-240, .group-320 { display: flex; flex-direction: column; gap: 1rem; }
    .group-with-specialties { display: flex; flex-direction: column; gap: 1rem; }
    .main-cards { display: flex; flex-direction: column; gap: 1rem; }
    .specialties-side { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
    .section-header { margin-bottom: 2rem; }
    .section-title { font-size: 2rem; }
    .floating-icon { width: 48px; height: 48px; }
    .stats-bar { flex-direction: column; align-items: stretch; }
    .stat-item { flex-direction: row; justify-content: space-between; }
    .stat-divider { width: 100%; height: 1px; }
    .title-row { flex-direction: column; align-items: flex-start; }
    :global(.stats-card) { width: 100%; }
  }
</style>
