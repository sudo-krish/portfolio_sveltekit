import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ platform }) => {
    // Explicitly pass Cloudflare runtime variables down to the client layout payloads
    return {
        gaMeasurementId: platform?.env?.PUBLIC_GA_MEASUREMENT_ID || import.meta.env.VITE_PUBLIC_GA_MEASUREMENT_ID || 'G-452MXCLEEE',
        githubUsername: platform?.env?.PUBLIC_GITHUB_USERNAME || import.meta.env.VITE_PUBLIC_GITHUB_USERNAME || 'sudo-krish'
    };
};
