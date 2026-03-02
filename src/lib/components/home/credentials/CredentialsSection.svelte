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
    import MobileCarousel from "$lib/components/ui/MobileCarousel.svelte";

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

<MobileCarousel
    layout="right"
    sectionTitle="Credentials"
    sectionDescription="AWS certified & validated"
    accentColor="#f97316"
>
    <!-- DESKTOP / TABLET (Original Preserved floating layout) -->
    <svelte:fragment slot="content-pc">
        <GlowAccent
            color="#f97316"
            position="top-[15%] right-[10%]"
            size={400}
        />

        <!-- MAIN CONTENT CARD (RIGHT SIDE PC) -->
        <div
            class="absolute top-[18%] right-[8%] w-full max-w-xl z-20 pointer-events-auto flex flex-col gap-4"
        >
            <!-- MAIN NARRATIVE -->
            <div
                class="flex flex-col xl:flex-row gap-6 lg:gap-8 max-h-[80vh] w-full"
            >
                <!-- NARRATIVE PANEL -->
                <GlassPanel
                    glow="#f97316"
                    className="cred-panel w-full xl:w-2/5 p-8 lg:p-10 shrink-0 flex flex-col justify-center rounded-3xl relative overflow-hidden"
                >
                    <!-- Ambient internal glow -->
                    <div
                        class="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-[60px] rounded-full pointer-events-none mix-blend-screen"
                    ></div>

                    <div class="mb-6 flex items-center gap-4 relative z-10">
                        <StatusBadge
                            color="#f97316"
                            label="Verified Credentials"
                        />
                    </div>

                    <h3
                        class="text-4xl lg:text-5xl font-black mb-6 leading-[1.1] text-white tracking-tighter relative z-10"
                    >
                        Certified & <br />
                        <span
                            class="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500"
                        >
                            Validated.
                        </span>
                    </h3>

                    <p
                        class="text-base lg:text-lg text-white/70 leading-relaxed font-light relative z-10"
                    >
                        {content.introParagraph}
                    </p>
                </GlassPanel>

                <!-- CERTIFICATIONS LIST -->
                <GlassPanel
                    className="cred-panel w-full p-8 shrink-0 rounded-3xl relative overflow-hidden flex flex-col"
                >
                    <div
                        class="flex items-center justify-between mb-8 opacity-90 relative z-10"
                    >
                        <div class="flex items-center gap-2">
                            <Award size={16} class="text-orange-400" />
                            <span
                                class="font-mono text-[11px] uppercase tracking-[0.2em] font-bold text-white/50"
                                >credentials.aws</span
                            >
                        </div>
                        <div
                            class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.1)]"
                        >
                            <CheckCircle size={12} class="text-green-400" />
                            <span
                                class="text-[10px] font-bold text-green-400 tracking-wider"
                                >VERIFIED</span
                            >
                        </div>
                    </div>

                    <div
                        class="flex flex-col gap-4 overflow-y-auto no-scrollbar pb-4 relative z-10"
                    >
                        {#each certifications as cert}
                            <a
                                href={cert.url}
                                target="_blank"
                                class="group/item relative flex items-center gap-4 p-4 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-orange-500/30 transition-all duration-300 shadow-sm"
                            >
                                <div
                                    class="absolute left-0 top-3 bottom-3 w-0.5 bg-orange-500/30 rounded-full group-hover/item:bg-orange-400 transition-colors"
                                ></div>
                                <div
                                    class="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-black/40 border border-white/10 group-hover/item:border-orange-500/40 group-hover/item:bg-orange-500/10 transition-colors shadow-inner"
                                >
                                    <Award
                                        size={16}
                                        class="text-orange-400/60 group-hover/item:text-orange-400 transition-colors"
                                    />
                                </div>
                                <div class="flex-1 min-w-0">
                                    <h4
                                        class="text-sm font-bold text-white/80 group-hover/item:text-white truncate transition-colors"
                                    >
                                        {cert.name.replace(
                                            "AWS Certified ",
                                            "",
                                        )}
                                    </h4>
                                    <div class="flex items-center gap-2 mt-1">
                                        <span
                                            class="text-[11px] font-mono text-orange-400/70 truncate tracking-wide"
                                            >{cert.category}</span
                                        >
                                        <span class="text-white/20">·</span>
                                        <span
                                            class="text-[10px] text-white/40 whitespace-nowrap font-medium"
                                            >{cert.dateIssued}</span
                                        >
                                    </div>
                                </div>
                                <ExternalLink
                                    size={14}
                                    class="text-white/10 group-hover/item:text-orange-400/80 transition-all shrink-0 ml-2 group-hover/item:-translate-y-0.5 group-hover/item:translate-x-0.5"
                                />
                            </a>
                        {/each}
                    </div>
                </GlassPanel>
            </div>

            <!-- CTA -->
            <GlassPanel className="cred-panel px-6 py-4 shrink-0 rounded-xl">
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
    </svelte:fragment>

    <!-- MOBILE / SMALL TABLET (Carousel Slide Layout) -->
    <svelte:fragment slot="content-mobile">
        <div
            class="z-20 w-full max-w-lg mx-auto pointer-events-auto flex flex-col gap-4 mt-4"
        >
            <GlassPanel
                glow="#f97316"
                className="cred-panel w-full p-6 sm:p-8 shrink-0 rounded-3xl"
            >
                <div class="mb-5 flex items-center gap-3">
                    <StatusBadge color="#f97316" label="Verified Credentials" />
                </div>

                <h3
                    class="text-3xl sm:text-4xl font-black mb-4 leading-[1.15] text-white tracking-tighter"
                >
                    Certified & <br />
                    <span
                        class="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500"
                    >
                        Validated.
                    </span>
                </h3>

                <p
                    class="text-sm sm:text-base text-white/70 leading-relaxed font-light"
                >
                    {content.introParagraph}
                </p>
            </GlassPanel>

            <!-- CERTIFICATIONS LIST -->
            <GlassPanel
                className="cred-panel w-full p-6 shrink-0 rounded-3xl relative overflow-hidden flex flex-col"
            >
                <div
                    class="flex items-center justify-between mb-6 opacity-90 relative z-10"
                >
                    <div class="flex items-center gap-2">
                        <Award size={14} class="text-orange-400" />
                        <span
                            class="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold text-white/50"
                            >credentials.aws</span
                        >
                    </div>
                    <div
                        class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.1)]"
                    >
                        <CheckCircle size={10} class="text-green-400" />
                        <span
                            class="text-[9px] sm:text-[10px] font-bold text-green-400 tracking-wider"
                            >VERIFIED</span
                        >
                    </div>
                </div>

                <div class="flex flex-col gap-3 relative z-10">
                    {#each certifications as cert}
                        <a
                            href={cert.url}
                            target="_blank"
                            class="group/item relative flex items-center gap-3 p-3 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-orange-500/30 transition-all duration-300 shadow-sm"
                        >
                            <div
                                class="absolute left-0 top-2 bottom-2 w-0.5 bg-orange-500/30 rounded-full group-hover/item:bg-orange-400 transition-colors"
                            ></div>
                            <div
                                class="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-xl bg-black/40 border border-white/10 group-hover/item:border-orange-500/40 group-hover/item:bg-orange-500/10 transition-colors shadow-inner"
                            >
                                <Award
                                    size={14}
                                    class="text-orange-400/60 group-hover/item:text-orange-400 transition-colors"
                                />
                            </div>
                            <div class="flex-1 min-w-0">
                                <h4
                                    class="text-xs sm:text-sm font-bold text-white/80 group-hover/item:text-white truncate transition-colors"
                                >
                                    {cert.name.replace("AWS Certified ", "")}
                                </h4>
                                <div class="flex items-center gap-1.5 mt-1">
                                    <span
                                        class="text-[10px] sm:text-[11px] font-mono text-orange-400/70 truncate tracking-wide"
                                        >{cert.category}</span
                                    >
                                    <span class="text-white/20 hidden sm:inline"
                                        >·</span
                                    >
                                    <span
                                        class="text-[9px] sm:text-[10px] text-white/40 whitespace-nowrap font-medium"
                                        >{cert.dateIssued}</span
                                    >
                                </div>
                            </div>
                            <ExternalLink
                                size={14}
                                class="text-white/10 group-hover/item:text-orange-400/80 transition-all shrink-0 ml-1 group-hover/item:-translate-y-0.5 group-hover/item:translate-x-0.5"
                            />
                        </a>
                    {/each}
                </div>
            </GlassPanel>

            <GlassPanel className="cred-panel px-5 py-3 shrink-0 rounded-xl">
                <div class="flex items-center justify-between">
                    <div
                        class="flex items-center gap-2 text-[9px] sm:text-[10px] text-white/20 font-mono"
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
    </svelte:fragment>
</MobileCarousel>
