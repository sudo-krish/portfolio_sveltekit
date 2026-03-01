import { portfolioData } from '$lib/data/portfolio-data';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
    const { slug } = params;

    // We find the project that matches the slug
    const project = portfolioData.projects?.find(p => p.slug === slug);
    const blog = portfolioData.blogPosts?.find(b => b.slug === slug);

    if (!project && !blog) {
        throw error(404, {
            message: 'Project or Article not found'
        });
    }

    return {
        item: project || blog,
        type: project ? 'project' : 'blog'
    };
};
