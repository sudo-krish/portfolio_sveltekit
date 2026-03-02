<!-- src/lib/components/home/impact/ImpactSection.svelte -->
<!-- 3D: RIGHT (x:4.5) | Content: LEFT -->
<script lang="ts">
    import { onMount } from "svelte";
    import gsap from "gsap";
    import { TrendingUp, Zap, Target, Award } from "lucide-svelte";
    import { getSectionContent } from "$lib/data/section-content";
    import GlassPanel from "$lib/components/ui/GlassPanel.svelte";
    import StatusBadge from "$lib/components/ui/StatusBadge.svelte";
    import CtaLink from "$lib/components/ui/CtaLink.svelte";
    import GlowAccent from "$lib/components/ui/GlowAccent.svelte";
    import MobileCarousel from "$lib/components/ui/MobileCarousel.svelte";

    const content = getSectionContent("impact")!;

    const impactMetrics = [
        { label: "Latency", value: "99%", icon: TrendingUp, color: "#ef4444" },
        { label: "Accuracy", value: "98%", icon: Target, color: "#06b6d4" },
        { label: "Efficiency", value: "80%", icon: Zap, color: "#eab308" },
        { label: "AI Insights", value: "70%", icon: Award, color: "#a855f7" },
    ];

    onMount(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo(
                ".impact-panel",
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
    layout="left"
    sectionTitle="Impact & Results"
    sectionDescription="See the measurable difference"
    accentColor="#a855f7"
>
    <!-- DESKTOP / TABLET (Original Preserved floating layout) -->
    <svelte:fragment slot="content-pc">
        <GlowAccent
            color="#a855f7"
            position="top-[20%] left-[15%]"
            size={400}
        />

        <!-- MAIN CONTENT CARD (LEFT SIDE PC) -->
        <div
            class="absolute top-[20%] left-[8%] w-full max-w-xl z-20 pointer-events-auto flex flex-col gap-4"
        >
            <GlassPanel
                glow="#a855f7"
                className="impact-panel w-full p-8 shrink-0 rounded-2xl"
            >
                <div class="mb-6 flex items-center gap-3">
                    <StatusBadge color="#a855f7" label="Quantified Impact" />
                </div>

                <h3
                    class="text-4xl lg:text-5xl font-black mb-4 leading-tight text-white tracking-tight"
                >
                    Measurable <br />
                    <span
                        class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500"
                    >
                        Results.
                    </span>
                </h3>

                <p
                    class="text-sm lg:text-base text-muted-foreground leading-relaxed"
                >
                    {content.introParagraph}
                </p>
            </GlassPanel>

            <!-- METRICS GRID -->
            <GlassPanel
                className="impact-panel w-full p-6 shrink-0 rounded-2xl"
            >
                <div class="flex items-center justify-between mb-6 opacity-70">
                    <div class="flex items-center gap-2">
                        <TrendingUp size={14} class="text-purple-400" />
                        <span
                            class="font-mono text-[10px] uppercase tracking-widest text-purple-400"
                            >impact.metrics</span
                        >
                    </div>
                    <div
                        class="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20"
                    >
                        <div
                            class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"
                        ></div>
                        <span
                            class="text-[10px] font-bold text-green-400 tracking-wider"
                            >LIVE</span
                        >
                    </div>
                </div>

                <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {#each impactMetrics as m}
                        <div
                            class="flex flex-col items-center justify-center p-3 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] transition-all"
                        >
                            <svelte:component
                                this={m.icon}
                                size={16}
                                style="color: {m.color}"
                            />
                            <span
                                class="text-xl font-black font-mono leading-none mt-2"
                                style="color: {m.color}">{m.value}</span
                            >
                            <span
                                class="text-[10px] font-mono text-white/30 uppercase tracking-wider mt-1 text-center"
                                >{m.label}</span
                            >
                        </div>
                    {/each}
                </div>
            </GlassPanel>

            <!-- CTA -->
            <GlassPanel className="impact-panel px-6 py-4 shrink-0 rounded-xl">
                <CtaLink
                    href={content.ctaSlug}
                    label={content.ctaLabel}
                    color="#a855f7"
                />
            </GlassPanel>
        </div>
    </svelte:fragment>

    <!-- MOBILE / SMALL TABLET (Carousel Slide Layout) -->
    <svelte:fragment slot="content-mobile">
        <div
            class="z-20 w-full max-w-lg mx-auto pointer-events-auto flex flex-col gap-3 mt-4"
        >
            <GlassPanel
                glow="#a855f7"
                className="impact-panel w-full p-6 lg:p-8 shrink-0 rounded-2xl"
            >
                <div class="mb-4 lg:mb-6 flex items-center gap-3">
                    <StatusBadge color="#a855f7" label="Quantified Impact" />
                </div>

                <h3
                    class="text-3xl lg:text-4xl font-black mb-3 lg:mb-4 leading-tight text-white tracking-tight"
                >
                    Measurable <br />
                    <span
                        class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500"
                    >
                        Results.
                    </span>
                </h3>

                <p
                    class="text-xs sm:text-sm text-muted-foreground leading-relaxed"
                >
                    {content.introParagraph}
                </p>
            </GlassPanel>

            <!-- METRICS GRID -->
            <GlassPanel
                className="impact-panel w-full p-5 lg:p-6 shrink-0 rounded-2xl"
            >
                <div class="flex items-center justify-between mb-4 opacity-70">
                    <div class="flex items-center gap-2">
                        <TrendingUp size={14} class="text-purple-400" />
                        <span
                            class="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-purple-400"
                            >impact.metrics</span
                        >
                    </div>
                    <div
                        class="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20"
                    >
                        <div
                            class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"
                        ></div>
                        <span
                            class="text-[8px] sm:text-[9px] font-bold text-green-400 tracking-wider"
                            >LIVE</span
                        >
                    </div>
                </div>

                <div class="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
                    {#each impactMetrics as m}
                        <div
                            class="flex flex-col items-center justify-center p-2 sm:p-3 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] transition-all"
                        >
                            <svelte:component
                                this={m.icon}
                                size={14}
                                style="color: {m.color}"
                            />
                            <span
                                class="text-base sm:text-lg font-black font-mono leading-none mt-1.5"
                                style="color: {m.color}">{m.value}</span
                            >
                            <span
                                class="text-[8px] sm:text-[9px] font-mono text-white/30 uppercase tracking-wider mt-1 text-center"
                                >{m.label}</span
                            >
                        </div>
                    {/each}
                </div>
            </GlassPanel>

            <!-- CTA -->
            <GlassPanel
                className="impact-panel px-5 py-3 lg:px-6 shrink-0 rounded-xl"
            >
                <CtaLink
                    href={content.ctaSlug}
                    label={content.ctaLabel}
                    color="#a855f7"
                />
            </GlassPanel>
        </div>
    </svelte:fragment>
</MobileCarousel>
