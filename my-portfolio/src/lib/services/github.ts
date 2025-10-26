// src/lib/services/github.ts
export async function getGitHubStatsCached(): Promise<any> {
  try {
    const response = await fetch('/api/github/stats');
    if (!response.ok) throw new Error('Failed to fetch stats');
    return await response.json();
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    return null;
  }
}

export async function getGitHubProjectsCached(): Promise<any[]> {
  try {
    const response = await fetch('/api/github/projects');
    if (!response.ok) throw new Error('Failed to fetch projects');
    return await response.json();
  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    return [];
  }
}
