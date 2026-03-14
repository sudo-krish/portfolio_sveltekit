<!-- src/lib/components/home/impact/desktop/RightAnchor.svelte -->
<script lang="ts">
    import { ArrowRight } from "lucide-svelte";
    import { resultsData } from "$lib/data/results";
</script>

<div
    class="flex flex-col items-end w-full h-full justify-between pb-12 text-right relative"
>
    <div>
        <div
            class="text-[10px] font-mono text-purple-400/80 uppercase tracking-[0.3em] mb-4 block"
        >
            {resultsData.rightAnchor.label}
        </div>

        <h2
            class="text-6xl xl:text-7xl font-black text-muted-foreground/30 leading-[0.9] tracking-tighter whitespace-pre-line mb-6 block"
        >
            {resultsData.rightAnchor.title}
        </h2>

        <p
            class="text-[clamp(0.85rem,1vw,1rem)] text-muted-foreground font-light leading-relaxed max-w-[280px]"
        >
            {resultsData.rightAnchor.description}
        </p>
    </div>

    <a
        href={resultsData.ui.cta.href}
        class="group relative inline-flex items-center gap-4 pl-6 pr-2 py-2 rounded-full bg-muted border border-border hover:bg-muted/80 hover:border-purple-500/50 transition-all duration-500 overflow-hidden shadow-[0_8px_16px_rgba(0,0,0,0.4)]"
    >
        <div
            class="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--accent)/)_0%,transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        ></div>

        <div class="flex flex-col z-10 py-1 text-left">
            <span
                class="font-mono text-[9px] text-purple-400 uppercase tracking-widest leading-none mb-1"
            >
                Explore Work
            </span>
            <span class="text-sm font-bold text-foreground leading-none">
                {resultsData.ui.cta.label}
            </span>
        </div>

        <div
            class="flex items-center justify-center w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/20 group-hover:bg-purple-500 group-hover:shadow-[0_0_15px_hsl(var(--accent)/)] transition-all duration-300 z-10"
        >
            <ArrowRight
                size={16}
                class="text-purple-400 group-hover:text-foreground transform group-hover:translate-x-0.5 transition-all duration-300"
            />
        </div>
    </a>
</div>
