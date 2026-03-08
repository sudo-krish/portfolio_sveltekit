import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
    // We just return fetch so the component can use it, or fetch data here
    // However, fetching here block the initial page render. 
    // Usually for portfolio visual pages, client-side fetching is good enough.
    // Let's return nothing, we will fetch in onMount in +page.svelte just like widgets for cool loading animations.
    return {};
};
