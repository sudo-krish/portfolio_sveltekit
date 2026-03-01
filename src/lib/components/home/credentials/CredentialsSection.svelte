<!-- src/lib/components/home/credentials/CredentialsSection.svelte -->
<!-- 3D: LEFT (x:-4.5) | Content: RIGHT -->
<script lang="ts">
    import { onMount } from "svelte";
    import gsap from "gsap";
    import { Award, Shield, CheckCircle, ExternalLink } from "lucide-svelte";
    import { getCertifications } from "$lib/data/portfolio-data";
    import { getSectionContent } from "$lib/data/section-content";
    import GlassPanel from "$lib/components/ui/GlassPanel.svelte";
    import StatusBadge from "$lib/components/ui/StatusBadge.svelte";
    import CtaLink from "$lib/components/ui/CtaLink.svelte";
    import GlowAccent from "$lib/components/ui/GlowAccent.svelte";

    const content = getSectionContent("credentials")!;
    const certifications = getCertifications().slice(0, 3);

    onMount(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo(
                ".cred-panel",
                { y: 50, opacity: 0, scale: 0.95 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1.2,
                    stagger: 0.15,
                    ease: "power3.out",
                    delay: 0.1,
                },
            );
        });
        return () => ctx.revert();
    });
</script>

<div
    class="relative w-full h-[100dvh] overflow-hidden pointer-events-none z-20"
>
    <GlowAccent color="#f97316" position="top-[15%] right-[10%]" size={400} />

    <!-- Content: RIGHT (3D on LEFT) -->
    <div
        class="absolute top-[15%] md:top-[20%] right-[5%] md:right-[10%] w-full max-w-sm md:max-w-xl lg:max-w-2xl lg:w-[45%] flex flex-col gap-4"
    >
        <GlassPanel
            glow="#f97316"
            className="cred-panel pointer-events-auto w-full p-8"
        >
            <div class="mb-6 flex items-center gap-3">
                <StatusBadge color="#f97316" label="Verified Credentials" />
            </div>

            <h3
                class="text-3xl lg:text-5xl font-black mb-4 leading-tight text-white tracking-tight"
            >
                Certified & <br />
                <span
                    class="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500"
                >
                    Validated.
                </span>
            </h3>

            <p class="text-sm text-muted-foreground leading-relaxed">
                {content.introParagraph}
            </p>
        </GlassPanel>

        <!-- CERTIFICATIONS LIST -->
        <GlassPanel className="cred-panel pointer-events-auto w-full p-6">
            <div class="flex items-center justify-between mb-4 opacity-70">
                <div class="flex items-center gap-2">
                    <Award size={14} class="text-orange-400" />
                    <span
                        class="font-mono text-[10px] uppercase tracking-widest text-orange-400"
                        >credentials.aws</span
                    >
                </div>
                <div
                    class="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20"
                >
                    <CheckCircle size={10} class="text-green-400" />
                    <span
                        class="text-[9px] font-bold text-green-400 tracking-wider"
                        >VERIFIED</span
                    >
                </div>
            </div>

            <div class="flex flex-col gap-2.5">
                {#each certifications as cert}
                    <a
                        href={cert.url}
                        target="_blank"
                        class="group/item relative flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-orange-500/10 hover:border-orange-500/20 transition-all duration-300"
                    >
                        <div
                            class="absolute left-0 top-2 bottom-2 w-0.5 bg-orange-500/30 rounded-full group-hover/item:bg-orange-400 transition-colors"
                        ></div>
                        <div
                            class="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-xl bg-white/[0.03] border border-white/[0.06] group-hover/item:border-orange-500/20 transition-colors"
                        >
                            <Award
                                size={16}
                                class="text-orange-400/60 group-hover/item:text-orange-400 transition-colors"
                            />
                        </div>
                        <div class="flex-1 min-w-0">
                            <h4
                                class="text-xs font-bold text-white/80 group-hover/item:text-white truncate transition-colors"
                            >
                                {cert.name.replace("AWS Certified ", "")}
                            </h4>
                            <div class="flex items-center gap-2 mt-0.5">
                                <span
                                    class="text-[10px] font-mono text-orange-400/60"
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
        </GlassPanel>

        <GlassPanel className="cred-panel pointer-events-auto px-6 py-3">
            <div class="flex items-center justify-between">
                <div
                    class="flex items-center gap-2 text-[10px] text-white/20 font-mono"
                >
                    <Shield size={10} class="text-orange-400/50" />
                    <span>Signed by AWS</span>
                </div>
                <CtaLink
                    href={content.ctaSlug}
                    label={content.ctaLabel}
                    color="#f97316"
                />
            </div>
        </GlassPanel>
    </div>
</div>
