<!-- src/lib/components/home/credentials/CredentialsSection.svelte -->
<!-- 3D: RIGHT (x:4) | Content: LEFT -->
<script lang="ts">
    import { onMount } from "svelte";
    import gsap from "gsap";
    import {
        Award,
        Shield,
        CheckCircle,
        ExternalLink,
        ArrowRight,
        GraduationCap,
    } from "lucide-svelte";
    import { getCertifications, getEducation } from "$lib/data/portfolio-data";
    import { getSectionContent } from "$lib/data/section-content";

    const content = getSectionContent("credentials")!;
    const certifications = getCertifications().slice(0, 3);
    const education = getEducation();

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
    <div
        class="absolute top-[15%] left-[10%] w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-[120px]"
    ></div>

    <!-- Content: RIGHT (3D on LEFT) -->
    <div
        class="absolute top-[15%] md:top-[20%] right-[5%] md:right-[10%] w-full max-w-sm md:max-w-xl lg:max-w-2xl lg:w-[45%] flex flex-col gap-4"
    >
        <!-- MAIN NARRATIVE -->
        <div
            class="cred-panel pointer-events-auto w-full p-8 border border-white/10 bg-black/40 backdrop-blur-2xl rounded-3xl shadow-2xl relative overflow-hidden"
        >
            <div
                class="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 blur-[50px]"
            ></div>

            <div class="relative z-10">
                <div class="mb-6 flex items-center gap-3">
                    <div
                        class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 backdrop-blur-sm"
                    >
                        <span class="relative flex h-1.5 w-1.5">
                            <span
                                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"
                            ></span>
                            <span
                                class="relative inline-flex rounded-full h-1.5 w-1.5 bg-orange-500"
                            ></span>
                        </span>
                        <span
                            class="font-mono text-[10px] font-semibold text-orange-200 tracking-widest uppercase"
                        >
                            Verified Credentials
                        </span>
                    </div>
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
            </div>
        </div>

        <!-- CERTIFICATIONS LIST -->
        <div
            class="cred-panel pointer-events-auto w-full border border-white/10 bg-black/40 backdrop-blur-2xl rounded-3xl shadow-2xl p-6 relative overflow-hidden"
        >
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
        </div>

        <!-- CTA -->
        <div
            class="cred-panel pointer-events-auto px-6 py-3 border border-white/10 bg-black/40 backdrop-blur-2xl rounded-3xl flex items-center justify-between"
        >
            <div
                class="flex items-center gap-2 text-[10px] text-white/20 font-mono"
            >
                <Shield size={10} class="text-orange-400/50" />
                <span>Signed by AWS</span>
            </div>
            <a
                href={content.ctaSlug}
                class="group/cta flex items-center gap-1.5 text-[11px] font-bold text-orange-400/70 hover:text-orange-400 transition-colors"
            >
                <span>{content.ctaLabel}</span>
                <ArrowRight
                    size={12}
                    class="group-hover/cta:translate-x-1 transition-transform"
                />
            </a>
        </div>
    </div>
</div>
