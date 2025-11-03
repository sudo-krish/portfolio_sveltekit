<!-- src/lib/components/home/FeaturedProjects.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { Badge } from '$lib/components/ui/badge';
  import { Button } from '$lib/components/ui/button';
  import { Card } from '$lib/components/ui/card';
  import { Database, RefreshCw, ChevronDown, Sparkles, AlertTriangle, Search, PartyPopper } from 'lucide-svelte';
  import ProjectCard from './ProjectCard.svelte';
  import ProjectFilter from './ProjectFilter.svelte';
  import { getAllProjectsWithGitHub } from '$lib/data/portfolio-data';
  
  export let limit: number = 6;
  
  let activeCategory = 'All';
  let projects: any[] = [];
  let loading = true;
  let error = false;
  let displayLimit = limit;
  let categories: string[] = ['All'];
  
  onMount(async () => {
    try {
      projects = await getAllProjectsWithGitHub();
      
      // Extract unique categories from project data
      const allCategories = new Set<string>();
      const categoryCount = new Map<string, number>();
      
      projects.forEach(project => {
        const addCategory = (cat: string) => {
          allCategories.add(cat);
          categoryCount.set(cat, (categoryCount.get(cat) || 0) + 1);
        };
        
        // Add platforms
        project.platforms?.forEach((p: string) => addCategory(p));
        // Add technologies
        project.technologies?.forEach((t: string) => addCategory(t));
        // Add languages
        project.languages?.forEach((l: string) => addCategory(l));
        // Add keywords (filtered)
        project.keywords?.forEach((k: string) => {
          if (k.length > 2 && !k.includes('-')) {
            addCategory(k);
          }
        });
      });
      
      // Sort by count (most popular first) then alphabetically
      categories = Array.from(allCategories)
        .sort((a, b) => {
          const countDiff = (categoryCount.get(b) || 0) - (categoryCount.get(a) || 0);
          if (countDiff !== 0) return countDiff;
          return a.localeCompare(b);
        });
      
      // Add 'All' at the beginning
      categories.unshift('All');
      
      loading = false;
    } catch (err) {
      console.error('Failed to load projects:', err);
      error = true;
      loading = false;
    }
  });
  
  function loadMore() {
    displayLimit += 6;
  }
  
  function handleCategoryChange(category: string) {
    activeCategory = category;
    displayLimit = limit;
  }
  
  function clearFilter() {
    activeCategory = 'All';
  }
  
  function resetToAll() {
    activeCategory = 'All';
  }
  
  // Improved filtering logic
  $: filteredProjects = activeCategory === 'All' 
    ? projects.slice(0, displayLimit)
    : projects
        .filter(p => {
          const searchTerm = activeCategory.toLowerCase();
          
          // Search across all project fields
          const searchableFields = [
            p.name?.toLowerCase(),
            p.description?.toLowerCase(),
            p.longDescription?.toLowerCase(),
            ...(p.keywords?.map((k: string) => k.toLowerCase()) || []),
            ...(p.platforms?.map((pl: string) => pl.toLowerCase()) || []),
            ...(p.technologies?.map((t: string) => t.toLowerCase()) || []),
            ...(p.languages?.map((l: string) => l.toLowerCase()) || [])
          ].filter(Boolean);
          
          // Check if any field contains the search term
          return searchableFields.some(field => 
            field.includes(searchTerm) || searchTerm.includes(field)
          );
        })
        .slice(0, displayLimit);
  
  $: totalFiltered = activeCategory === 'All'
    ? projects.length
    : projects.filter(p => {
        const searchTerm = activeCategory.toLowerCase();
        
        const searchableFields = [
          p.name?.toLowerCase(),
          p.description?.toLowerCase(),
          p.longDescription?.toLowerCase(),
          ...(p.keywords?.map((k: string) => k.toLowerCase()) || []),
          ...(p.platforms?.map((pl: string) => pl.toLowerCase()) || []),
          ...(p.technologies?.map((t: string) => t.toLowerCase()) || []),
          ...(p.languages?.map((l: string) => l.toLowerCase()) || [])
        ].filter(Boolean);
        
        return searchableFields.some(field => 
          field.includes(searchTerm) || searchTerm.includes(field)
        );
      }).length;
  
  $: hasMore = totalFiltered > displayLimit;
  
  // Get category count
  function getCategoryCount(category: string): number {
    if (category === 'All') return projects.length;
    
    const searchTerm = category.toLowerCase();
    return projects.filter(p => {
      const searchableFields = [
        p.name?.toLowerCase(),
        p.description?.toLowerCase(),
        p.longDescription?.toLowerCase(),
        ...(p.keywords?.map((k: string) => k.toLowerCase()) || []),
        ...(p.platforms?.map((pl: string) => pl.toLowerCase()) || []),
        ...(p.technologies?.map((t: string) => t.toLowerCase()) || []),
        ...(p.languages?.map((l: string) => l.toLowerCase()) || [])
      ].filter(Boolean);
      
      return searchableFields.some(field => 
        field.includes(searchTerm) || searchTerm.includes(field)
      );
    }).length;
  }
</script>

<section class="projects-section">
  <!-- Animated Background -->
  <div class="bg-pattern">
    <div class="pattern-layer pattern-1"></div>
    <div class="pattern-layer pattern-2"></div>
    <div class="pattern-layer pattern-3"></div>
  </div>
  
  <div class="container">
    <!-- Header with Stats Bar -->
    <div class="section-header">
      <div class="title-row">
        <div class="title-wrapper">
          <div class="floating-icon">
            <Database size={28} />
          </div>
          <div class="title-content">
            <Badge variant="secondary" class="title-badge">
              PORTFOLIO
            </Badge>
            <h2 class="section-title">
              <span class="gradient-text">Data Engineering</span> Projects
            </h2>
          </div>
        </div>
        
        <!-- Live Stats -->
        <Card class="stats-card">
          <div class="stats-bar">
            <div class="stat-item">
              <span class="stat-value">{projects.length}</span>
              <span class="stat-label">Total Projects</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-value">{categories.length - 1}</span>
              <span class="stat-label">Technologies</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item featured">
              <Sparkles size={14} />
              <span class="stat-label">Featured Work</span>
            </div>
          </div>
        </Card>
      </div>
      
      <p class="section-description">
        Building production-grade data pipelines • Real-time CDC • Cloud-native architecture • Open source contributions
      </p>
    </div>
    
    <!-- Filter Component -->
    {#if !loading && projects.length > 0}
      <ProjectFilter 
        {categories}
        {activeCategory}
        {getCategoryCount}
        onCategoryChange={handleCategoryChange}
        onClearFilter={clearFilter}
        displayedCount={filteredProjects.length}
        totalCount={totalFiltered}
      />
    {/if}
    
    <!-- Loading State -->
    {#if loading}
      <div class="loading-state">
        <div class="loader-animation">
          <RefreshCw size={40} class="spinner" />
          <div class="loader-pulse"></div>
        </div>
        <p class="loader-text">Fetching projects from GitHub...</p>
      </div>
    
    <!-- Error State -->
    {:else if error}
      <Card class="error-card">
        <div class="error-icon">
          <AlertTriangle size={32} />
        </div>
        <p>Unable to load GitHub projects. Showing cached data.</p>
      </Card>
    
    <!-- Projects Grid -->
    {:else if filteredProjects.length > 0}
      <div class="projects-grid">
        {#each filteredProjects as project, index (project.id)}
          <div class="project-wrapper" style="--delay: {index * 0.05}s">
            <ProjectCard {project} />
          </div>
        {/each}
      </div>
      
      <!-- Load More with Progress -->
      {#if hasMore}
        <div class="load-more-section">
          <Button size="lg" class="load-more-btn" onclick={loadMore}>
            <span>Load More Projects</span>
            <ChevronDown size={20} class="ml-2" />
          </Button>
        </div>
      {:else if totalFiltered > 0}
        <div class="end-message">
          <div class="end-icon">
            <PartyPopper size={48} />
          </div>
          <p>You've reached the end! All {totalFiltered} projects loaded.</p>
        </div>
      {/if}
    
    <!-- Empty State -->
    {:else}
      <Card class="empty-card">
        <div class="empty-icon">
          <Search size={64} />
        </div>
        <h3 class="empty-title">No projects found</h3>
        <p class="empty-text">No projects match the "{activeCategory}" filter.</p>
        <Button onclick={resetToAll}>
          Show All Projects
        </Button>
      </Card>
    {/if}
  </div>
</section>

<style>
  .projects-section {
    padding: 8rem 0;
    background: hsl(var(--background));
    position: relative;
    overflow: hidden;
  }
  
  /* Animated Background Patterns */
  .bg-pattern {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }
  
  .pattern-layer {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0.02;
  }
  
  .pattern-1 {
    background: 
      linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px),
      linear-gradient(hsl(var(--primary)) 1px, transparent 1px);
    background-size: 50px 50px;
    animation: patternMove1 20s linear infinite;
  }
  
  .pattern-2 {
    background: 
      linear-gradient(45deg, hsl(var(--primary)) 1px, transparent 1px),
      linear-gradient(-45deg, hsl(var(--primary)) 1px, transparent 1px);
    background-size: 30px 30px;
    animation: patternMove2 15s linear infinite;
  }
  
  .pattern-3 {
    background: radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px);
    background-size: 20px 20px;
    animation: patternMove3 25s linear infinite;
  }
  
  @keyframes patternMove1 {
    0% { transform: translate(0, 0); }
    100% { transform: translate(50px, 50px); }
  }
  
  @keyframes patternMove2 {
    0% { transform: translate(0, 0) rotate(0deg); }
    100% { transform: translate(30px, 30px) rotate(360deg); }
  }
  
  @keyframes patternMove3 {
    0% { transform: scale(1); }
    50% { transform: scale(1.5); }
    100% { transform: scale(1); }
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
    position: relative;
    z-index: 1;
  }
  
  /* Header Section */
  .section-header {
    margin-bottom: 4rem;
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
    background: linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.7) 100%);
    border-radius: 16px;
    color: white;
    animation: float 3s ease-in-out infinite;
    box-shadow: 0 8px 24px hsl(var(--primary) / 0.3);
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
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
    font-size: 3.5rem;
    font-weight: 900;
    color: hsl(var(--foreground));
    margin: 0;
    line-height: 1;
  }
  
  .gradient-text {
    background: linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.6) 100%);
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
  
  /* Loading State */
  .loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 6rem 2rem;
    gap: 1.5rem;
  }
  
  .loader-animation {
    position: relative;
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .loader-pulse {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    border: 3px solid hsl(var(--primary));
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: pulse 2s ease-in-out infinite;
  }
  
  @keyframes pulse {
    0%, 100% { transform: translate(-50%, -50%) scale(0.8); opacity: 1; }
    50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.3; }
  }
  
  .loader-text {
    font-family: var(--font-mono);
    font-size: 0.9375rem;
    color: hsl(var(--muted-foreground));
  }
  
  /* Projects Grid */
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;
  }
  
  .project-wrapper {
    animation: fadeInUp 0.5s ease-out forwards;
    animation-delay: var(--delay);
    opacity: 0;
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Load More Button */
  .load-more-section {
    display: flex;
    justify-content: center;
    margin: 2rem 0;
  }
  
  :global(.load-more-btn) {
    border-radius: 50px;
    padding: 1rem 3rem;
  }
  
  /* End Message */
  .end-message {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 3rem 2rem;
    text-align: center;
  }
  
  .end-icon {
    color: hsl(var(--primary));
    animation: celebrate 1s ease-in-out;
  }
  
  @keyframes celebrate {
    0%, 100% { transform: scale(1) rotate(0deg); }
    25% { transform: scale(1.2) rotate(-10deg); }
    75% { transform: scale(1.2) rotate(10deg); }
  }
  
  .end-message p {
    font-family: var(--font-mono);
    font-size: 1rem;
    color: hsl(var(--muted-foreground));
  }
  
  /* Empty & Error States */
  :global(.empty-card), :global(.error-card) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 6rem 2rem;
    gap: 1.5rem;
    text-align: center;
  }
  
  .empty-icon, .error-icon {
    color: hsl(var(--muted-foreground));
    opacity: 0.5;
  }
  
  .error-icon {
    color: hsl(var(--destructive));
    opacity: 1;
  }
  
  .empty-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: hsl(var(--foreground));
  }
  
  .empty-text {
    font-family: var(--font-mono);
    color: hsl(var(--muted-foreground));
  }
  
  /* Responsive */
  @media (max-width: 1024px) {
    .title-row {
      flex-direction: column;
      align-items: flex-start;
    }
    
    :global(.stats-card) {
      width: 100%;
    }
  }
  
  @media (max-width: 768px) {
    .projects-section {
      padding: 4rem 0;
    }
    
    .section-title {
      font-size: 2.5rem;
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
    
    .projects-grid {
      grid-template-columns: 1fr;
    }
  }
  
  @media (max-width: 480px) {
    .container {
      padding: 0 1rem;
    }
    
    .section-title {
      font-size: 2rem;
    }
  }
</style>
