<!-- src/lib/components/home/techstack/desktop/RightAnchor.svelte -->
<script lang="ts">
    import { ArrowRight } from "lucide-svelte";
    import { techstackData } from "$lib/data/techstack";
</script>

<div
    class="flex flex-col items-end w-full h-full justify-between pb-12 text-right"
>
    <!-- Top Text Section -->
    <div class="flex flex-col items-end">
        <div
            class="text-[10px] font-mono text-cyan-400/80 uppercase tracking-[0.3em] mb-4 block"
        >
            {techstackData.rightAnchor.label}
        </div>

        <h2
            class="text-6xl xl:text-7xl font-black text-muted-foreground/30 leading-[0.9] tracking-tighter whitespace-pre-line mb-6 block"
        >
            {techstackData.rightAnchor.title}
        </h2>

        <p
            class="text-sm text-muted-foreground font-light leading-relaxed max-w-[280px]"
        >
            {techstackData.rightAnchor.description}
        </p>
    </div>

    <!-- Elegant Pill CTA Button (Aligned Right) -->
    <a
        href={techstackData.ui.cta.href}
        class="group relative self-end inline-flex items-center gap-4 pr-6 pl-2 py-2 rounded-full bg-muted border border-border hover:bg-muted/80 hover:border-cyan-500/50 transition-all duration-500 overflow-hidden shadow-[0_8px_16px_rgba(0,0,0,0.4)] flex-row-reverse"
    >
        <div
            class="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/)_0%,transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        ></div>

        <!-- Text Content -->
        <div class="flex flex-col z-10 py-1 text-right">
            <span
                class="font-mono text-[9px] text-cyan-400 uppercase tracking-widest leading-none mb-1"
            >
                Explore Work
            </span>
            <span class="text-sm font-bold text-foreground leading-none">
                {techstackData.ui.cta.label}
            </span>
        </div>

        <!-- Animated Arrow Circle -->
        <div
            class="flex items-center justify-center w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/20 group-hover:bg-cyan-500 group-hover:shadow-[0_0_15px_hsl(var(--primary)/)] transition-all duration-300 z-10"
        >
            <ArrowRight
                size={16}
                class="text-cyan-400 group-hover:text-foreground transform group-hover:translate-x-0.5 transition-all duration-300"
            />
        </div>
    </a>
</div>
