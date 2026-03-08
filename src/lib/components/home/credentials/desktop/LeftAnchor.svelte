<!-- src/lib/components/home/credentials/desktop/LeftAnchor.svelte -->
<script lang="ts">
    import { ArrowRight } from "lucide-svelte";
    import { certificatesData } from "$lib/data/certificates";
</script>

<div
    class="flex flex-col items-start w-full h-full justify-between pb-12 relative"
>
    <div>
        <div
            class="text-[10px] font-mono text-orange-400/80 uppercase tracking-[0.3em] mb-4 block"
        >
            {certificatesData.leftAnchor.label}
        </div>

        <h2
            class="text-6xl xl:text-7xl font-black text-white/10 leading-[0.9] tracking-tighter whitespace-pre-line mb-6 block"
        >
            {certificatesData.leftAnchor.title}
        </h2>

        <p
            class="text-[clamp(0.85rem,1vw,1rem)] text-white/40 font-light leading-relaxed max-w-[320px]"
        >
            {@html certificatesData.leftAnchor.description}
        </p>
    </div>

    <!-- Bottom CTA -->
    <div class="flex flex-row items-center mt-12">
        <a
            href={certificatesData.ui.cta.href}
            class="group relative inline-flex items-center gap-4 pl-6 pr-2 py-2 rounded-full bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] hover:border-orange-500/50 transition-all duration-500 overflow-hidden shadow-[0_8px_16px_rgba(0,0,0,0.4)]"
        >
            <div
                class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.15)_0%,transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            ></div>

            <div class="flex flex-col z-10 py-1">
                <span
                    class="font-mono text-[9px] text-orange-400 uppercase tracking-widest leading-none mb-1"
                >
                    Explore Badges
                </span>
                <span class="text-sm font-bold text-white leading-none">
                    {certificatesData.ui.cta.label}
                </span>
            </div>

            <div
                class="flex items-center justify-center w-10 h-10 rounded-full bg-orange-500/10 border border-orange-500/20 group-hover:bg-orange-500 group-hover:shadow-[0_0_15px_rgba(249,115,22,0.6)] transition-all duration-300 z-10"
            >
                <ArrowRight
                    size={16}
                    class="text-orange-400 group-hover:text-white transform group-hover:translate-x-0.5 transition-all duration-300"
                />
            </div>
        </a>
    </div>
</div>
