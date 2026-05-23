import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
    // We fetch in onMount in the +page.svelte to show the loading states.
    return {};
};
