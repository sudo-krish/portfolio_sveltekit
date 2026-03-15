// src/routes/articles/[slug]/+page.server.ts
import type { PageServerLoad } from './$types';
import { getContent } from '$lib/services/content-service';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, platform, fetch }) => {
    const token = platform?.env?.GITHUB_TOKEN || import.meta.env.VITE_GITHUB_TOKEN || '';
    const item = await getContent('articles', params.slug, token, fetch);
    if (!item) throw error(404, 'Article not found');
    return { item };
};
