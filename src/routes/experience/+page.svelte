<script lang="ts">
    import SectionPage from "$lib/components/SectionPage.svelte";
    import { experienceSectionContent } from "$lib/data/experience";

    const content = experienceSectionContent;
</script>

<SectionPage {content} accentColor="#3b82f6" />
