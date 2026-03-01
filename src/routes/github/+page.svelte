<script lang="ts">
    import SectionPage from "$lib/components/SectionPage.svelte";
    import { getSectionContent } from "$lib/data/section-content";

    const content = getSectionContent("github")!;
</script>

<SectionPage {content} accentColor="#22c55e" />
