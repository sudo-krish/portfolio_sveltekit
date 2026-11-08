<script lang="ts">
    import SectionPage from "$lib/components/SectionPage.svelte";
    import { techstackSectionContent } from "$lib/data/techstack-content";

    const content = techstackSectionContent;
</script>

<SectionPage {content} accentColor="hsl(173 80% 40%)" />
