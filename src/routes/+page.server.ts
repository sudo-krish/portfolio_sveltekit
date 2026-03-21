import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
    // We execute these fetches on the edge/server BEFORE delivering the HTML
    // This allows search engine crawlers to see the actual projects/stats payload immediately, instead of "Loading..."
    try {
        const [githubStatsRes, leetcodeStatsRes, githubEventsRes] = await Promise.all([
            fetch('/api/github/stats'),
            fetch('/api/leetcode/stats'),
            fetch('/api/github/events')
        ]);

        const githubStats = githubStatsRes.ok ? await githubStatsRes.json() : null;
        const leetcodeStats = leetcodeStatsRes.ok ? await leetcodeStatsRes.json() : null;
        const githubEvents = githubEventsRes.ok ? await githubEventsRes.json() : null;

        return {
            githubStats,
            leetcodeStats,
            githubEvents
        };
    } catch (e) {
        console.error("SSR Fetch failed:", e);
        return {
            githubStats: null,
            leetcodeStats: null,
            githubEvents: null
        };
    }
};
