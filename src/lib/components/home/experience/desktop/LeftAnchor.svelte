<!-- src/lib/components/home/experience/desktop/LeftAnchor.svelte -->
<script lang="ts">
    import { ArrowRight } from "lucide-svelte";
    import { experienceData } from "$lib/data/experience";
</script>

<!-- Restored justify-between to push text up and button down -->
<div class="flex flex-col items-start w-full h-full justify-between pb-12">
    <!-- Top Text Section -->
    <div>
        <div
            class="text-[10px] font-mono text-blue-400/80 uppercase tracking-[0.3em] mb-4 block"
        >
            {experienceData.leftAnchor.label}
        </div>

        <h2
            class="text-6xl xl:text-7xl font-black text-foreground/10 leading-[0.9] tracking-tighter whitespace-pre-line mb-6 block"
        >
            {experienceData.leftAnchor.title}
        </h2>

        <p
            class="text-sm text-foreground/40 font-light leading-relaxed max-w-[280px]"
        >
            {experienceData.leftAnchor.description}
        </p>
    </div>

    <!-- Elegant Pill CTA Button (Centered at the bottom) -->
    <!-- Added `self-center` and removed `mt-12` -->
    <a
        href={experienceData.ui.cta.href}
        class="group relative self-start inline-flex items-center gap-4 pl-6 pr-2 py-2 rounded-full bg-foreground/[0.03] border border-foreground/10 hover:bg-foreground/[0.08] hover:border-blue-500/50 transition-all duration-500 overflow-hidden shadow-[0_8px_16px_rgba(0,0,0,0.4)]"
    >
        <!-- Soft animated radial glow on hover -->
        <div
            class="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/)_0%,transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        ></div>

        <!-- Text Content -->
        <div class="flex flex-col z-10 py-1">
            <span
                class="font-mono text-[9px] text-blue-400 uppercase tracking-widest leading-none mb-1"
            >
                Deep Dive
            </span>
            <span class="text-sm font-bold text-foreground leading-none">
                Explore Full Resume
            </span>
        </div>

        <!-- Animated Arrow Circle -->
        <div
            class="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 group-hover:bg-blue-500 group-hover:shadow-[0_0_15px_hsl(var(--primary)/)] transition-all duration-300 z-10"
        >
            <ArrowRight
                size={16}
                class="text-blue-400 group-hover:text-foreground transform group-hover:translate-x-0.5 transition-all duration-300"
            />
        </div>
    </a>
</div>
