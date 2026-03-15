<script lang="ts">
    import { TerminalSquare } from "lucide-svelte";
    import InfiniteMarquee from "$lib/components/ui/marquee/InfiniteMarquee.svelte";
    import SectionCard from "$lib/components/ui/cards/SectionCard.svelte";

    import { heroContent, type TechItem } from "$lib/data/hero_content";

    let props = $props<{
        metaLabel?: string;
        metaTitle?: string;
        main?: string;
        details?: string;
        techStack: TechItem[];
    }>();

    const metaLabel = props.metaLabel ?? heroContent.bioCard.metaLabel;
    const metaTitle = props.metaTitle ?? heroContent.bioCard.metaTitle;
    const main = props.main ?? heroContent.bioCard.main;
    const details = props.details ?? heroContent.bioCard.details;
    const techStack = props.techStack;
</script>

<!-- Bio card — reuses shared SectionCard -->
<SectionCard
    badge={metaLabel}
    subtitle={metaTitle}
    Icon={TerminalSquare}
    shortDescription={main}
    detailedPhilosophy={details}
/>

<!-- Tech marquee (Hero-specific) -->
<div class="hero-type relative w-[100vw] z-20 mb-10 -ml-4 pointer-events-auto">
    <InfiniteMarquee items={techStack} />
</div>
