<!-- src/lib/components/home/impact/ImpactSection.svelte -->
<!-- 3D: LEFT (x:-4.5) | Content: RIGHT -->
<script lang="ts">
    import { onMount } from "svelte";
    import gsap from "gsap";
    import {
        TrendingUp,
        Zap,
        Target,
        Award,
        Activity,
        Database,
        Clock,
        Layers,
        ArrowRight,
    } from "lucide-svelte";
    import { getSectionContent } from "$lib/data/section-content";

    const content = getSectionContent("impact")!;

    const impactMetrics = [
        {
            label: "Latency",
            value: "99%",
            sub: "3h → sec",
            icon: TrendingUp,
            color: "#ef4444",
        },
        {
            label: "Accuracy",
            value: "98%",
            sub: "60% → 98%",
            icon: Target,
            color: "#06b6d4",
        },
        {
            label: "Efficiency",
            value: "80%",
            sub: "Auto-Scaling",
            icon: Zap,
            color: "#eab308",
        },
        {
            label: "AI Insights",
            value: "70%",
            sub: "ML Driven",
            icon: Award,
            color: "#a855f7",
        },
    ];

    const prodMetrics = [
        {
            label: "Throughput",
            value: "50M+",
            sub: "Events/Day",
            icon: Activity,
            color: "#3b82f6",
        },
        {
            label: "Latency",
            value: "<1s",
            sub: "Query Speed",
            icon: Database,
            color: "#a855f7",
        },
        {
            label: "Refresh",
            value: "5min",
            sub: "Data SLA",
            icon: Clock,
            color: "#f97316",
        },
        {
            label: "Uptime",
            value: "99.9%",
            sub: "Availability",
            icon: Layers,
            color: "#10b981",
        },
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

<div
    class="relative w-full h-[100dvh] overflow-hidden pointer-events-none z-20"
>
    <div
        class="absolute top-[20%] left-[15%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px]"
    ></div>

    <!-- Content: LEFT (3D on RIGHT) -->
    <div
        class="absolute top-[15%] md:top-[20%] left-[5%] md:left-[10%] w-full max-w-sm md:max-w-xl lg:max-w-2xl lg:w-[45%] flex flex-col gap-4"
    >
        <!-- MAIN NARRATIVE -->
        <div
            class="impact-panel pointer-events-auto w-full p-8 border border-white/10 bg-black/40 backdrop-blur-2xl rounded-3xl shadow-2xl relative overflow-hidden"
        >
            <div
                class="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 blur-[50px]"
            ></div>

            <div class="relative z-10">
                <div class="mb-6 flex items-center gap-3">
                    <div
                        class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-sm"
                    >
                        <span class="relative flex h-1.5 w-1.5">
                            <span
                                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"
                            ></span>
                            <span
                                class="relative inline-flex rounded-full h-1.5 w-1.5 bg-purple-500"
                            ></span>
                        </span>
                        <span
                            class="font-mono text-[10px] font-semibold text-purple-200 tracking-widest uppercase"
                        >
                            Quantified Impact
                        </span>
                    </div>
                </div>

                <h3
                    class="text-3xl lg:text-5xl font-black mb-4 leading-tight text-white tracking-tight"
                >
                    Measurable <br />
                    <span
                        class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500"
                    >
                        Results.
                    </span>
                </h3>

                <p class="text-sm text-muted-foreground leading-relaxed">
                    {content.introParagraph}
                </p>
            </div>
        </div>

        <!-- METRICS GRID -->
        <div
            class="impact-panel pointer-events-auto w-full border border-white/10 bg-black/40 backdrop-blur-2xl rounded-3xl shadow-2xl p-6 relative overflow-hidden"
        >
            <div class="flex items-center justify-between mb-4 opacity-70">
                <div class="flex items-center gap-2">
                    <TrendingUp size={14} class="text-purple-400" />
                    <span
                        class="font-mono text-[10px] uppercase tracking-widest text-purple-400"
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
                        class="text-[9px] font-bold text-green-400 tracking-wider"
                        >LIVE</span
                    >
                </div>
            </div>

            <div class="grid grid-cols-4 gap-3">
                {#each impactMetrics as m}
                    <div
                        class="flex flex-col items-center justify-center p-3 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] transition-all"
                    >
                        <svelte:component
                            this={m.icon}
                            size={14}
                            style="color: {m.color}"
                        />
                        <span
                            class="text-lg font-black font-mono leading-none mt-1.5"
                            style="color: {m.color}">{m.value}</span
                        >
                        <span
                            class="text-[9px] font-mono text-white/30 uppercase tracking-wider mt-1"
                            >{m.label}</span
                        >
                    </div>
                {/each}
            </div>
        </div>

        <!-- CTA -->
        <div
            class="impact-panel pointer-events-auto px-6 py-3 border border-white/10 bg-black/40 backdrop-blur-2xl rounded-3xl"
        >
            <a
                href={content.ctaSlug}
                class="group/cta flex items-center gap-2 text-[11px] font-bold text-purple-400/70 hover:text-purple-400 transition-colors"
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
