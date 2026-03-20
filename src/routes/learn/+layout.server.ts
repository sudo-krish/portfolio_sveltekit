// src/routes/learn/+layout.server.ts
import type { LayoutServerLoad } from './$types';
import { getRepoIndex } from '$lib/services/content-service';

export const load: LayoutServerLoad = async ({ platform, fetch }) => {
    const token = platform?.env?.GITHUB_TOKEN || import.meta.env.VITE_GITHUB_TOKEN || '';

    try {
        const index = await getRepoIndex('second-brain', token, fetch);
        return { 
            items: index.items, 
            fetchedAt: index.fetchedAt 
        };
    } catch (error) {
        console.error('Failed to load learning path layout data:', error);
        return { 
            items: [], 
            fetchedAt: null 
        };
    }
};
