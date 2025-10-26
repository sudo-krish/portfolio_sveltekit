// Client-side LeetCode service

export async function getLeetCodeStatsCached(): Promise<any> {
  try {
    const response = await fetch('/api/leetcode/stats');
    if (!response.ok) throw new Error('Failed to fetch stats');
    return await response.json();
  } catch (error) {
    console.error('Error fetching LeetCode stats:', error);
    return null;
  }
}
