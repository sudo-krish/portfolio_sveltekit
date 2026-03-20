<script lang="ts">
    import SectionPage from "$lib/components/SectionPage.svelte";
    import { impactSectionContent } from "$lib/data/impact-content";

    const content = impactSectionContent;
</script>

<SectionPage {content} accentColor="#a855f7" />
