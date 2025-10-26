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
      <Layers size={16} />
    </div>
    <div class="header-content">
      <h3>Tech Stack</h3>
      <span class="subtitle">{totalSkills} technologies</span>
    </div>
  </div>
  
  <!-- Stack Grid -->
  <div class="stack-grid">
    {#each categories as category, i}
      <div class="category-section" style="--delay: {i * 100}ms">
        <div class="category-header">
          <div class="category-icon {category.color}">
            <svelte:component this={category.icon} size={14} />
          </div>
          <span class="category-name">{category.name}</span>
          <span class="category-count">{category.skills.length}</span>
        </div>
        
        <div class="skills-cloud">
          {#each category.skills as skill, j}
            <span 
              class="skill-tag {category.color}" 
              style="--skill-delay: {(i * 100) + (j * 50)}ms"
            >
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
    border-radius: 16px;
    width: 100%;
    max-width: 480px;
    overflow: hidden;
    backdrop-filter: blur(20px);
    box-shadow: 0 2px 8px rgb(0 0 0 / 0.04);
  }
  
  /* iOS-style Header */
  .card-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    background: linear-gradient(
      135deg,
      hsl(var(--muted) / 0.3),
      hsl(var(--muted) / 0.1)
    );
    border-bottom: 1px solid hsl(var(--border));
  }
  
  .header-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)));
    border-radius: 10px;
    color: white;
    box-shadow: 0 2px 8px hsl(var(--primary) / 0.3);
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
    font-size: 0.9375rem;
    font-weight: 700;
    color: hsl(var(--foreground));
    margin: 0;
    letter-spacing: -0.01em;
  }
  
  .subtitle {
    font-size: 0.6875rem;
    color: hsl(var(--muted-foreground));
    font-family: var(--font-mono);
  }
  
  /* Stack Grid */
  .stack-grid {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .category-section {
    opacity: 0;
    transform: translateY(10px);
    animation: fadeInUp 0.4s ease-out forwards;
    animation-delay: var(--delay);
  }
  
  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Category Header */
  .category-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.625rem;
  }
  
  .category-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
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
    font-size: 0.8125rem;
    font-weight: 600;
    color: hsl(var(--foreground));
    flex: 1;
  }
  
  .category-count {
    font-size: 0.6875rem;
    font-weight: 700;
    font-family: var(--font-mono);
    color: hsl(var(--muted-foreground));
    padding: 0.1875rem 0.5rem;
    background: hsl(var(--muted) / 0.5);
    border-radius: 6px;
  }
  
  /* Skills Cloud */
  .skills-cloud {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .skill-tag {
    display: inline-flex;
    align-items: center;
    padding: 0.375rem 0.625rem;
    border-radius: 8px;
    font-size: 0.75rem;
    font-weight: 600;
    border: 1px solid;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: default;
    opacity: 0;
    transform: scale(0.9);
    animation: popIn 0.3s ease-out forwards;
    animation-delay: var(--skill-delay);
  }
  
  @keyframes popIn {
    to {
      opacity: 1;
      transform: scale(1);
    }
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
    transform: translateY(-2px);
    box-shadow: 0 4px 8px hsl(var(--primary) / 0.15);
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
  
  /* Dark Mode Enhancements */
  :global(.dark) .tech-stack-card {
    box-shadow: 0 0 40px hsl(var(--primary) / 0.1);
  }
  
  :global(.dark) .header-icon {
    box-shadow: 0 4px 12px hsl(var(--primary) / 0.4);
  }
  
  :global(.dark) .skill-tag:hover {
    box-shadow: 0 4px 12px hsl(var(--primary) / 0.2);
  }
  
  :global(.dark) .category-icon {
    box-shadow: 0 0 10px hsl(var(--primary) / 0.2);
  }
  
  /* Responsive */
  @media (max-width: 640px) {
    .tech-stack-card {
      max-width: 100%;
    }
    
    .card-header {
      padding: 0.875rem;
    }
    
    .stack-grid {
      padding: 0.875rem;
      gap: 0.875rem;
    }
    
    .skill-tag {
      font-size: 0.6875rem;
      padding: 0.3125rem 0.5625rem;
    }
  }
</style>
