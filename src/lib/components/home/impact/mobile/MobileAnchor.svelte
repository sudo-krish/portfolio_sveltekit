<!-- src/lib/components/home/impact/mobile/MobileAnchor.svelte -->
<script lang="ts">
    import { resultsData } from "$lib/data/results";
</script>

<div class="flex flex-col items-center text-center w-full mt-4">
    <!-- Top label -->
    <div
        class="text-[9px] font-mono text-purple-400/80 uppercase tracking-[0.3em] mb-3"
    >
        {resultsData.rightAnchor.label}
    </div>

    <!-- Title (replacing \n with a space to make it look better on mobile) -->
    <h2
        class="text-4xl sm:text-5xl font-black text-foreground/90 leading-[1.1] tracking-tight whitespace-pre-line mb-4"
    >
        {resultsData.rightAnchor.title.replace("\n", " ")}
    </h2>

    <!-- Subtitle description -->
    <p
        class="text-[0.85rem] text-foreground/50 font-light leading-relaxed max-w-[320px]"
    >
        {resultsData.rightAnchor.description}
    </p>
</div>
