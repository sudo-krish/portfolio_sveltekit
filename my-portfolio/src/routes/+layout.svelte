<script lang="ts">
  import '../app.css';
  import SEO from '$lib/components/SEO.svelte';
  import StructuredData from '$lib/components/StructuredData.svelte';
  import PageWrapper from  '$lib/components/PageWrapper.svelte';
  import { page } from '$app/stores';
  import { getPersonalInfo, getBlogPostBySlug, getProjectById } from '$lib/data/portfolio-data';
  
  const personal = getPersonalInfo();
  
  // Reactive - automatically updates when page changes
  $: currentPath = $page.url.pathname;
  $: currentUrl = `${personal.website}${currentPath}`;
  
  // Auto-detect page type and generate appropriate metadata
  $: pageMetadata = generatePageMetadata(currentPath);
  
  function generatePageMetadata(path: string) {
    // Homepage
    if (path === '/') {
      return {
        title: 'Home',
        description: personal.bio,
        type: 'website',
        keywords: personal.topSkills.join(', '),
        structuredDataTypes: ['Person', 'WebSite']
      };
    }
    
    // About page
    if (path === '/about') {
      return {
        title: 'About Me',
        description: `Learn more about ${personal.name}, a ${personal.jobTitle} with ${personal.yearsOfExperience}+ years of experience.`,
        type: 'website',
        keywords: 'about, career, experience, data engineer',
        structuredDataTypes: ['Person', 'BreadcrumbList'],
        breadcrumbs: [
          { name: 'Home', url: personal.website },
          { name: 'About', url: `${personal.website}/about` }
        ]
      };
    }
    
    // Projects listing
    if (path === '/projects') {
      return {
        title: 'Projects',
        description: `Explore data engineering projects by ${personal.name}.`,
        type: 'website',
        keywords: 'data engineering projects, aws, portfolio',
        structuredDataTypes: ['BreadcrumbList'],
        breadcrumbs: [
          { name: 'Home', url: personal.website },
          { name: 'Projects', url: `${personal.website}/projects` }
        ]
      };
    }
    
    // Individual project pages
    if (path.startsWith('/projects/')) {
      const projectId = path.split('/').pop();
      const project = projectId ? getProjectById(projectId) : null;
      
      if (project) {
        return {
          title: project.name,
          description: project.description,
          type: 'website',
          keywords: project.keywords.join(', '),
          image: project.image,
          structuredDataTypes: ['Project', 'BreadcrumbList'],
          projectData: project,
          breadcrumbs: [
            { name: 'Home', url: personal.website },
            { name: 'Projects', url: `${personal.website}/projects` },
            { name: project.name, url: `${personal.website}/projects/${project.id}` }
          ]
        };
      }
    }
    
    // Blog listing
    if (path === '/blog') {
      return {
        title: 'Blog',
        description: `Technical articles by ${personal.name}.`,
        type: 'website',
        keywords: 'blog, data engineering, technical articles',
        structuredDataTypes: ['BreadcrumbList'],
        breadcrumbs: [
          { name: 'Home', url: personal.website },
          { name: 'Blog', url: `${personal.website}/blog` }
        ]
      };
    }
    
    // Individual blog posts
    if (path.startsWith('/blog/')) {
      const slug = path.split('/').pop();
      const post = slug ? getBlogPostBySlug(slug) : null;
      
      if (post) {
        return {
          title: post.title,
          description: post.description,
          type: 'article',
          keywords: post.keywords.join(', '),
          image: post.image,
          structuredDataTypes: ['BlogPosting', 'BreadcrumbList'],
          blogData: post,
          breadcrumbs: [
            { name: 'Home', url: personal.website },
            { name: 'Blog', url: `${personal.website}/blog` },
            { name: post.title, url: post.url }
          ]
        };
      }
    }
    
    // Contact page
    if (path === '/contact') {
      return {
        title: 'Contact',
        description: `Get in touch with ${personal.name}.`,
        type: 'website',
        keywords: 'contact, hire, consulting',
        structuredDataTypes: ['BreadcrumbList'],
        breadcrumbs: [
          { name: 'Home', url: personal.website },
          { name: 'Contact', url: `${personal.website}/contact` }
        ]
      };
    }
    
    // Default fallback
    return {
      title: 'Page',
      description: personal.shortBio,
      type: 'website',
      keywords: personal.topSkills.join(', '),
      structuredDataTypes: ['Person']
    };
  }
</script>

<!-- SEO Meta Tags -->
<SEO 
  title={pageMetadata.title}
  description={pageMetadata.description}
  url={currentUrl}
  type={pageMetadata.type}
  keywords={pageMetadata.keywords}
  image={pageMetadata.image}
/>

<!-- Structured Data -->
{#each pageMetadata.structuredDataTypes as structuredType}
  {#if structuredType === 'Person'}
    <StructuredData type="Person" />
  {:else if structuredType === 'WebSite'}
    <StructuredData type="WebSite" />
  {:else if structuredType === 'BreadcrumbList' && pageMetadata.breadcrumbs}
    <StructuredData type="BreadcrumbList" data={{ items: pageMetadata.breadcrumbs }} />
  {:else if structuredType === 'Project' && pageMetadata.projectData}
    <StructuredData type="Project" data={pageMetadata.projectData} />
  {:else if structuredType === 'BlogPosting' && pageMetadata.blogData}
    <StructuredData type="BlogPosting" data={pageMetadata.blogData} />
  {/if}
{/each}

<!-- PageWrapper wraps all pages with Navigation, Theme, Splash -->
<PageWrapper>
  <slot />
</PageWrapper>
