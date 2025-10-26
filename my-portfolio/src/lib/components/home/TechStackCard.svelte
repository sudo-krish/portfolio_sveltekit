<!-- src/lib/components/home/TechStackCard.svelte -->
<script lang="ts">
  import { Code2, Cloud, Database, GitBranch, Layers } from 'lucide-svelte';
  
  const categories = [
    {
      icon: Cloud,
      name: 'Cloud',
      skills: ['AWS', 'Redshift', 'Glue', 'Lambda', 'Kinesis'],
      color: 'primary'
    },
    {
      icon: Database,
      name: 'Data',
      skills: ['Kafka', 'Debezium', 'Airflow', 'DBT', 'Spark'],
      color: 'accent'
    },
    {
      icon: Code2,
      name: 'Languages',
      skills: ['Python', 'Go', 'SQL', 'PySpark'],
      color: 'success'
    },
    {
      icon: GitBranch,
      name: 'DevOps',
      skills: ['Docker', 'K8s', 'Terraform', 'CI/CD'],
      color: 'highlight'
    }
  ];
  
  const totalSkills = categories.reduce((sum, cat) => sum + cat.skills.length, 0);
</script>

<div class="tech-stack-card">
  <!-- Header -->
  <div class="card-header">
    <div class="header-icon">
      <Layers size={14} />
    </div>
    <div class="header-content">
      <h3>Tech Stack</h3>
      <span class="subtitle">{totalSkills} technologies</span>
    </div>
  </div>
  
  <!-- Stack Grid (4 columns) -->
  <div class="stack-grid">
    {#each categories as category}
      <div class="category-section">
        <div class="category-header">
          <div class="category-icon {category.color}">
            <svelte:component this={category.icon} size={12} />
          </div>
          <span class="category-name">{category.name}</span>
        </div>
        
        <div class="skills-list">
          {#each category.skills as skill}
            <span class="skill-tag {category.color}">
              {skill}
            </span>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .tech-stack-card {
    background: hsl(var(--card));
    border: 1px solid hsl(var(--border));
    border-radius: 12px;
    width: 100%;
    max-width: 680px;
    height: 320px;
    display: flex;
    flex-direction: column;
  }
  
  .tech-stack-card:hover {
    border-color: hsl(var(--primary));
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
    background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)));
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
  
  /* Stack Grid - 4 columns */
  .stack-grid {
    padding: 0.875rem;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.875rem;
    flex: 1;
    overflow-y: auto;
  }
  
  .category-section {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    /* REMOVED: all animations */
  }
  
  /* Category Header */
  .category-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.375rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid hsl(var(--border));
  }
  
  .category-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 8px;
    flex-shrink: 0;
  }
  
  .category-icon.primary {
    background: hsl(var(--primary) / 0.15);
    color: hsl(var(--primary));
  }
  
  .category-icon.accent {
    background: hsl(var(--accent) / 0.15);
    color: hsl(var(--accent));
  }
  
  .category-icon.success {
    background: hsl(var(--success) / 0.15);
    color: hsl(var(--success));
  }
  
  .category-icon.highlight {
    background: hsl(var(--highlight) / 0.15);
    color: hsl(var(--highlight));
  }
  
  .category-name {
    font-size: 0.75rem;
    font-weight: 600;
    color: hsl(var(--foreground));
    text-align: center;
  }
  
  /* Skills List */
  .skills-list {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }
  
  .skill-tag {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.375rem 0.5rem;
    border-radius: 6px;
    font-size: 0.6875rem;
    font-weight: 600;
    border: 1px solid;
    text-align: center;
    /* REMOVED: all animations */
  }
  
  .skill-tag.primary {
    background: hsl(var(--primary) / 0.1);
    color: hsl(var(--primary));
    border-color: hsl(var(--primary) / 0.2);
  }
  
  .skill-tag.accent {
    background: hsl(var(--accent) / 0.1);
    color: hsl(var(--accent));
    border-color: hsl(var(--accent) / 0.2);
  }
  
  .skill-tag.success {
    background: hsl(var(--success) / 0.1);
    color: hsl(var(--success));
    border-color: hsl(var(--success) / 0.2);
  }
  
  .skill-tag.highlight {
    background: hsl(var(--highlight) / 0.1);
    color: hsl(var(--highlight));
    border-color: hsl(var(--highlight) / 0.2);
  }
  
  .skill-tag:hover {
    /* REMOVED: transform and box-shadow */
    filter: brightness(1.1);
  }
  
  .skill-tag.primary:hover {
    background: hsl(var(--primary) / 0.15);
    border-color: hsl(var(--primary) / 0.3);
  }
  
  .skill-tag.accent:hover {
    background: hsl(var(--accent) / 0.15);
    border-color: hsl(var(--accent) / 0.3);
  }
  
  .skill-tag.success:hover {
    background: hsl(var(--success) / 0.15);
    border-color: hsl(var(--success) / 0.3);
  }
  
  .skill-tag.highlight:hover {
    background: hsl(var(--highlight) / 0.15);
    border-color: hsl(var(--highlight) / 0.3);
  }
  
  /* Responsive */
  @media (max-width: 680px) {
    .tech-stack-card {
      max-width: 100%;
      height: auto;
      min-height: 320px;
    }
    
    .stack-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
