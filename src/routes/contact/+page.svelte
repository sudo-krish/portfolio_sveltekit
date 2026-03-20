<script lang="ts">
    import SectionPage from "$lib/components/SectionPage.svelte";
    import { contactSectionContent } from "$lib/data/contact-content";

    const content = contactSectionContent;
</script>

<SectionPage {content} accentColor="#ec4899" />
