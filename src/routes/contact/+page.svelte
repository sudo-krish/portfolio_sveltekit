<script lang="ts">
    import SectionPage from "$lib/components/SectionPage.svelte";
    import { getSectionContent } from "$lib/data/section-content";

    const content = getSectionContent("contact")!;
</script>

<SectionPage {content} accentColor="#ec4899" />
