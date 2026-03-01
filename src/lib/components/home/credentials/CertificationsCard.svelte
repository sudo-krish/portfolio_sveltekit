<!-- src/lib/components/home/credentials/CertificationsCard.svelte -->
<script lang="ts">
    import { Award, Shield, CheckCircle, ExternalLink } from "lucide-svelte";
    import { getCertifications } from "$lib/data/portfolio-data";

    const certifications = getCertifications().slice(0, 3);
</script>

<div
    class="w-full h-full flex flex-col rounded-2xl border border-white/[0.06] bg-black/40 backdrop-blur-2xl overflow-hidden group hover:border-orange-500/20 transition-all duration-500"
>
    <!-- Header -->
    <div class="px-6 pt-6 pb-4 flex items-center justify-between">
        <div class="flex items-center gap-2">
            <Award size={14} class="text-orange-400" />
            <span
                class="font-mono text-[10px] font-bold text-orange-400/80 tracking-[0.2em] uppercase"
                >credentials.aws</span
            >
        </div>
        <div
            class="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20"
        >
            <CheckCircle size={10} class="text-green-400" />
            <span class="text-[9px] font-bold text-green-400 tracking-wider"
                >VERIFIED</span
            >
        </div>
    </div>

    <!-- Cert List -->
    <div class="flex-1 px-6 pb-4 flex flex-col gap-3 overflow-y-auto">
        {#each certifications as cert}
            <a
                href={cert.url}
                target="_blank"
                class="group/item relative flex items-center gap-4 p-4 rounded-xl border border-white/[0.04] bg-white/[0.02] hover:bg-white/[0.05] hover:border-orange-500/20 transition-all duration-300"
            >
                <!-- Left accent -->
                <div
                    class="absolute left-0 top-2 bottom-2 w-0.5 bg-orange-500/30 rounded-full group-hover/item:bg-orange-400 transition-colors"
                ></div>

                <!-- Badge -->
                <div
                    class="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-white/[0.03] border border-white/[0.06] group-hover/item:border-orange-500/20 transition-colors"
                >
                    <Award
                        size={18}
                        class="text-orange-400/60 group-hover/item:text-orange-400 transition-colors"
                    />
                </div>

                <!-- Text -->
                <div class="flex-1 min-w-0">
                    <h4
                        class="text-xs font-bold text-white/80 group-hover/item:text-white truncate transition-colors"
                    >
                        {cert.name.replace("AWS Certified ", "")}
                    </h4>
                    <div class="flex items-center gap-2 mt-0.5">
                        <span class="text-[10px] font-mono text-orange-400/60"
                            >{cert.category}</span
                        >
                        <span class="text-white/10">·</span>
                        <span class="text-[10px] text-white/20"
                            >{cert.dateIssued}</span
                        >
                    </div>
                </div>

                <ExternalLink
                    size={12}
                    class="text-white/10 group-hover/item:text-orange-400/60 transition-all shrink-0"
                />
            </a>
        {/each}
    </div>

    <!-- Footer -->
    <div
        class="px-6 py-3 border-t border-white/[0.04] flex items-center gap-2 text-[10px] text-white/20 font-mono"
    >
        <Shield size={10} class="text-orange-400/50" />
        <span>Signed by Amazon Web Services</span>
    </div>
</div>
