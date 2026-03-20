<script lang="ts">
    import SectionPage from "$lib/components/SectionPage.svelte";
    import { techstackSectionContent } from "$lib/data/techstack-content";

    const content = techstackSectionContent;
</script>

<SectionPage {content} accentColor="#06b6d4" />
