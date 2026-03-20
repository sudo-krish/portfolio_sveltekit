<script lang="ts">
    import SectionPage from "$lib/components/SectionPage.svelte";
    import { experienceSectionContent } from "$lib/data/experience";
    import StructuredData from "$lib/components/StructuredData.svelte";

    const content = experienceSectionContent;
</script>

<StructuredData type="ProfilePage" />
<SectionPage {content} accentColor="#3b82f6" />
