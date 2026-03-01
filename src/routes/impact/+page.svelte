<script lang="ts">
    import SectionPage from "$lib/components/SectionPage.svelte";
    import { getSectionContent } from "$lib/data/section-content";

    const content = getSectionContent("impact")!;
</script>

<SectionPage {content} accentColor="#a855f7" />
