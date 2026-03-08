import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
    // We fetch in onMount in the +page.svelte to show the loading states.
    return {};
};
