<script lang="ts">
    import SectionPage from "$lib/components/SectionPage.svelte";
    import { impactSectionContent } from "$lib/data/impact-content";

    const content = impactSectionContent;
</script>

<SectionPage {content} accentColor="hsl(24 95% 53%)" />
