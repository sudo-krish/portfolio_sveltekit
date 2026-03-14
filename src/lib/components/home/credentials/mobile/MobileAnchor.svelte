<!-- src/lib/components/home/credentials/mobile/MobileAnchor.svelte -->
<script lang="ts">
    import { ArrowRight } from "lucide-svelte";
    import { certificatesData } from "$lib/data/certificates";
</script>

<div class="flex flex-col items-center text-center w-full mt-2">
    <div
        class="text-[9px] font-mono text-orange-400/80 uppercase tracking-[0.3em] mb-3"
    >
        {certificatesData.leftAnchor.label}
    </div>

    <h2
        class="text-4xl sm:text-5xl font-black text-foreground/90 leading-[1.1] tracking-tight whitespace-pre-line mb-4"
    >
        {certificatesData.leftAnchor.title.replace("\n", " ")}
    </h2>

    <p
        class="text-[0.85rem] text-foreground/50 font-light leading-relaxed max-w-[320px]"
    >
        {@html certificatesData.leftAnchor.description}
    </p>

    <!-- Mobile CTA -->
    <a
        href={certificatesData.ui.cta.href}
        class="group relative inline-flex items-center gap-3 pl-4 pr-1.5 py-1.5 mt-6 rounded-full bg-foreground/[0.03] border border-foreground/10 hover:bg-foreground/[0.08] transition-all duration-300 shadow-md"
    >
        <div class="flex flex-col z-10 py-1 text-left">
            <span
                class="font-mono text-[8px] text-orange-400 uppercase tracking-widest leading-none mb-0.5"
            >
                Explore Badges
            </span>
            <span class="text-[11px] font-bold text-foreground leading-none">
                {certificatesData.ui.cta.label}
            </span>
        </div>

        <div
            class="flex items-center justify-center w-8 h-8 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 z-10"
        >
            <ArrowRight size={14} />
        </div>
    </a>
</div>
