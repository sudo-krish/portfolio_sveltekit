<script lang="ts">
    import SectionPage from "$lib/components/SectionPage.svelte";
    import { getSectionContent } from "$lib/data/section-content";

    const content = getSectionContent("credentials")!;
</script>

<SectionPage {content} accentColor="#f97316" />
