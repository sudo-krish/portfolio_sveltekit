import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const GITHUB_API = 'https://api.github.com';
const GITHUB_USERNAME = 'sudo-krish';
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

let cachedEvents: any = null;
let lastFetchEvents = 0;

export const GET: RequestHandler = async ({ platform, fetch, setHeaders }) => {
    const now = Date.now();

    setHeaders({
        'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    });

    if (cachedEvents && (now - lastFetchEvents) < CACHE_DURATION) {
        return json(cachedEvents);
    }

    try {
        const GITHUB_TOKEN = platform?.env?.GITHUB_TOKEN || import.meta.env.VITE_GITHUB_TOKEN || '';

        const headers: Record<string, string> = {
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'Portfolio-Site'
        };

        if (GITHUB_TOKEN) {
            headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
        }

        const response = await fetch(
            `${GITHUB_API}/users/${GITHUB_USERNAME}/events/public?per_page=10`,
            { headers }
        );

        if (!response.ok) {
            throw new Error(`GitHub Events API failed: ${response.status}`);
        }

        const events = await response.json();

        // Map to a simpler structure matching existing UI needs
        const parsedEvents = events
            .filter((e: any) => e.type === "PushEvent")
            .slice(0, 5) // Get top 5 recent pushes
            .map((e: any) => {
                const commit = e.payload.commits && e.payload.commits.length > 0
                    ? e.payload.commits[0]
                    : { sha: e.id, message: `Pushed to ${e.repo.name}` };

                // Calculate relative time like (2h, 1d)
                const diffMs = now - new Date(e.created_at).getTime();
                const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
                const diffDays = Math.floor(diffHrs / 24);

                let timeStr = "";
                if (diffDays > 0) timeStr = `${diffDays}d`;
                else if (diffHrs > 0) timeStr = `${diffHrs}h`;
                else timeStr = `${Math.floor(diffMs / (1000 * 60))}m`;

                return {
                    sha: commit.sha.substring(0, 7),
                    msg: commit.message.split('\n')[0], // First line of commit message
                    time: timeStr,
                    repo: e.repo.name.replace(`${GITHUB_USERNAME}/`, '')
                };
            });

        cachedEvents = parsedEvents;
        lastFetchEvents = now;

        return json(parsedEvents);
    } catch (error) {
        console.error('❌ GitHub Events API error:', error);

        if (cachedEvents) {
            return json(cachedEvents);
        }

        return json({ error: 'Failed to fetch GitHub events' }, { status: 500 });
    }
};
