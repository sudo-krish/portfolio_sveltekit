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

    gsap.set(".floating-icon", { scale: 0, rotation: -180 });
    gsap.set(".title-content", { opacity: 0, x: -30 });
    gsap.set(".stats-card", { opacity: 0, y: -20 });
    gsap.set(".section-description", { opacity: 0, y: 20 });
    gsap.set(".left-side > *", { opacity: 0, x: -40 });
    gsap.set(".right-side > *", { opacity: 0, x: 40 });
    gsap.set(".specialties-bottom > *", { opacity: 0, y: 30, scale: 0.9 });
    gsap.set(".group-240 > *", { opacity: 0, y: 30 });
    gsap.set(".group-320 > *", { opacity: 0, y: 30 });
    gsap.set(".main-cards > *", { opacity: 0, x: -30 });
    gsap.set(".specialties-side > *", { opacity: 0, scale: 0.9 });

    const headerTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".section-header",
        start: "top 80%",
        toggleActions: "play none none none",
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

    if (window.innerWidth > 1024) {
      gsap.to(".left-side > *", {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".left-side",
          start: "top 75%",
          toggleActions: "play none none none",
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
          start: "top 75%",
          toggleActions: "play none none none",
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
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    } else if (window.innerWidth > 768) {
      gsap.to(".group-240 > *", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".group-240",
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      gsap.to(".group-320 > *", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".group-320",
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      gsap.to(".main-cards > *", {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".main-cards",
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      gsap.to(".specialties-side > *", {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.08,
        scrollTrigger: {
          trigger: ".specialties-side",
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    } else {
      gsap.to(".group-240 > *", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".group-240",
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      gsap.to(".group-320 > *", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".group-320",
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      gsap.to(".main-cards > *", {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".main-cards",
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      gsap.to(".specialties-side > *", {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        stagger: 0.06,
        scrollTrigger: {
          trigger: ".specialties-side",
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  });
</script>

<div class="metrics-container">
  <header class="section-header">
    <div class="title-row">
      <div class="title-wrapper">
        <div class="floating-icon">
          <Activity size={28} />
        </div>
        <div class="title-content">
          <Badge variant="secondary" class="title-badge"
            >PERFORMANCE METRICS</Badge
          >
          <h2 class="section-title">
            <span class="gradient-text">Engineering</span> Metrics
          </h2>
        </div>
      </div>

      <Card class="stats-card">
        <div class="stats-bar">
          <div class="stat-item">
            <span class="stat-value">5+</span>
            <span class="stat-label">Years Experience</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-value">50+</span>
            <span class="stat-label">Projects</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item featured">
            <TrendingUp size={14} />
            <span class="stat-label">Real-time CDC</span>
          </div>
        </div>
      </Card>
    </div>

    <p class="section-description">
      Production-grade data pipelines • Real-time CDC • Multi-cloud architecture
      • 5-minute SLA warehouse
    </p>
  </header>

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
  }
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
    background: linear-gradient(
      135deg,
      hsl(var(--primary)) 0%,
      hsl(var(--primary) / 0.7) 100%
    );
    border-radius: 16px;
    color: white;
    box-shadow: 0 8px 24px hsl(var(--primary) / 0.3);
  }
  .title-content {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  :global(.title-badge) {
    width: fit-content;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.2em;
  }
  .section-title {
    font-size: clamp(2rem, 4vw, 3.5rem);
    font-weight: 900;
    color: hsl(var(--foreground));
    margin: 0;
    line-height: 1;
  }
  .gradient-text {
    background: linear-gradient(
      135deg,
      hsl(var(--primary)) 0%,
      hsl(var(--primary) / 0.6) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  :global(.stats-card) {
    padding: 1rem 1.5rem;
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
    color: hsl(var(--primary));
  }
  .stat-value {
    font-family: var(--font-mono);
    font-size: 1.5rem;
    font-weight: 700;
    color: hsl(var(--primary));
    line-height: 1;
  }
  .stat-label {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: hsl(var(--muted-foreground));
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .stat-divider {
    width: 1px;
    height: 32px;
    background: hsl(var(--border));
  }
  .section-description {
    font-family: var(--font-mono);
    font-size: 1rem;
    color: hsl(var(--muted-foreground));
    line-height: 1.8;
    max-width: 900px;
  }
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
    .desktop-layout {
      display: none;
    }
    .tablet-mobile-layout {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    .group-240 {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
    }
    .group-320 {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
    }
    .group-with-specialties {
      display: grid;
      grid-template-columns: 1fr 280px;
      gap: 1.5rem;
    }
    .main-cards {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    .specialties-side {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    .title-row {
      flex-direction: column;
      align-items: flex-start;
    }
    :global(.stats-card) {
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    .desktop-layout {
      display: none;
    }
    .metrics-container {
      gap: 1rem;
      padding: 1rem 0;
    }
    .tablet-mobile-layout {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .group-240,
    .group-320 {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .group-with-specialties {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .main-cards {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .specialties-side {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }
    .section-header {
      margin-bottom: 2rem;
    }
    .section-title {
      font-size: 2rem;
    }
    .floating-icon {
      width: 48px;
      height: 48px;
    }
    .stats-bar {
      flex-direction: column;
      align-items: stretch;
    }
    .stat-item {
      flex-direction: row;
      justify-content: space-between;
    }
    .stat-divider {
      width: 100%;
      height: 1px;
    }
    .title-row {
      flex-direction: column;
      align-items: flex-start;
    }
    :global(.stats-card) {
      width: 100%;
    }
  }
</style>
