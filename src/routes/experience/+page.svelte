<script lang="ts">
    import SectionPage from "$lib/components/SectionPage.svelte";
    import { getSectionContent } from "$lib/data/section-content";

    const content = getSectionContent("experience")!;
</script>

<SectionPage {content} accentColor="#3b82f6" />
