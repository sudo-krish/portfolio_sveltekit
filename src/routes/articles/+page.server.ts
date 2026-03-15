// src/routes/articles/+page.server.ts
import type { PageServerLoad } from './$types';
import { getRepoIndex } from '$lib/services/content-service';

export const load: PageServerLoad = async ({ platform, fetch }) => {
    const token = platform?.env?.GITHUB_TOKEN || import.meta.env.VITE_GITHUB_TOKEN || '';
    try {
        const index = await getRepoIndex('articles', token, fetch);
        return { items: index.items, fetchedAt: index.fetchedAt };
    } catch (error) {
        console.error('Failed to load articles:', error);
        return { items: [], fetchedAt: null };
    }
};
