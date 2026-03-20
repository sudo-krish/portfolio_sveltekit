<script lang="ts">
    import SectionPage from "$lib/components/SectionPage.svelte";
    import { credentialsSectionContent } from "$lib/data/credentials-content";

    const content = credentialsSectionContent;
</script>

<SectionPage {content} accentColor="#f97316" />
