<!-- src/lib/components/home/MetricsGrid.svelte -->
<script lang="ts">
  import { Zap, Database, GitBranch, Globe, Sparkles, Layers, Rocket } from 'lucide-svelte';

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
</script>

<div class="metrics-container">
  <!-- Header -->
  <header class="section-header">
    <div class="header-icon">
      <Database size={24} strokeWidth={2} />
    </div>
    <h2>Engineering Metrics</h2>
    <p>Real-time CDC • Multi-cloud • 5-minute SLA warehouse</p>
  </header>

  <!-- DESKTOP LAYOUT -->
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

  <!-- TABLET/MOBILE LAYOUT -->
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

  /* Header */
  .section-header {
    text-align: center;
    padding: 2rem 0 3rem;
  }

  .header-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    margin-bottom: 1.5rem;
    background: linear-gradient(
      135deg,
      hsl(var(--primary)) 0%,
      hsl(var(--accent)) 100%
    );
    border-radius: 16px;
    color: white;
    box-shadow: 0 4px 16px hsl(var(--primary) / 0.25);
  }

  .section-header h2 {
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 800;
    margin-bottom: 0.75rem;
    color: hsl(var(--foreground));
    letter-spacing: -0.02em;
  }

  .section-header p {
    font-family: var(--font-mono);
    font-size: 0.9375rem;
    color: hsl(var(--muted-foreground));
  }

  /* Hide tablet/mobile on desktop */
  .tablet-mobile-layout {
    display: none;
  }

  /* DESKTOP LAYOUT */
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

  /* TABLET VIEW */
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
  }

  /* MOBILE VIEW */
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
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .section-header {
      padding: 1.5rem 0 1.5rem;
    }
  }
</style>
