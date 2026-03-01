import { error } from '@sveltejs/kit';
import { marked } from 'marked';
import fm from 'front-matter';
import type { PageLoad } from './$types';

// Use Vite to eagerly load all markdown files as raw strings
const markdownFiles = import.meta.glob('/src/lib/cms-content/articles/*.md', {
    query: '?raw',
    import: 'default',
    eager: true
});

export const load: PageLoad = ({ params }) => {
    const { slug } = params;

    // Search the globbed files for the matching slug
    let rawContent = null;
    for (const [path, content] of Object.entries(markdownFiles)) {
        if (path.endsWith(`${slug}.md`)) {
            rawContent = content as string;
            break;
        }
    }

    if (!rawContent) {
        throw error(404, {
            message: 'Article not found in CMS'
        });
    }

    // Parse Frontmatter and Markdown
    const parsed = fm(rawContent);
    const htmlContent = marked.parse(parsed.body);

    return {
        article: {
            slug,
            ...(parsed.attributes as any),
        },
        htmlContent
    };
};
