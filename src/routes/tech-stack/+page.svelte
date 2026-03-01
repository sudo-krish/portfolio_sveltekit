<script lang="ts">
    import SectionPage from "$lib/components/SectionPage.svelte";
    import { getSectionContent } from "$lib/data/section-content";

    const content = getSectionContent("techstack")!;
</script>

<SectionPage {content} accentColor="#06b6d4" />
