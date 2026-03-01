<!-- src/lib/components/home/experience/ExperienceSection.svelte -->
<!-- 3D: RIGHT (x:4) | Content: LEFT -->
<script lang="ts">
    import { onMount } from "svelte";
    import gsap from "gsap";
    import {
        Briefcase,
        Cloud,
        Zap,
        Terminal,
        Sparkles,
        ArrowRight,
    } from "lucide-svelte";
    import { getPersonalInfo } from "$lib/data/portfolio-data";
    import { getSectionContent } from "$lib/data/section-content";

    const content = getSectionContent("experience")!;
    const personal = getPersonalInfo();

    const milestones = [
        {
            year: "2020",
            label: "Initialized",
            role: "Junior Engineer — ETL & Data Warehousing",
            icon: Terminal,
            color: "#3b82f6",
        },
        {
            year: "2022",
            label: "Scaled Up",
            role: "Cloud Engineer — AWS Architecture",
            icon: Cloud,
            color: "#8b5cf6",
        },
        {
            year: "2024",
            label: "Optimized",
            role: "Senior Data Engineer — Real-Time Streaming",
            icon: Zap,
            color: "#ec4899",
        },
        {
            year: "2025",
            label: "Future State",
            role: "AI Data Architect — Vector & NLQ",
            icon: Sparkles,
            color: "#f59e0b",
        },
    ];

    onMount(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo(
                ".exp-panel",
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
    <!-- BACKGROUND AMBIENT GLOW -->
    <div
        class="absolute top-[15%] left-[10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]"
    ></div>

    <!-- Content: RIGHT (3D on LEFT) -->
    <div
        class="absolute top-[15%] md:top-[20%] right-[5%] md:right-[10%] w-full max-w-sm md:max-w-xl lg:max-w-2xl lg:w-[45%] flex flex-col gap-4"
    >
        <!-- MAIN NARRATIVE PANEL -->
        <div
            class="exp-panel pointer-events-auto w-full p-8 border border-white/10 bg-black/40 backdrop-blur-2xl rounded-3xl shadow-2xl relative overflow-hidden"
        >
            <!-- Glow accent -->
            <div
                class="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-[50px]"
            ></div>

            <div class="relative z-10">
                <div class="mb-6 flex items-center gap-3">
                    <div
                        class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm"
                    >
                        <span class="relative flex h-1.5 w-1.5">
                            <span
                                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"
                            ></span>
                            <span
                                class="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"
                            ></span>
                        </span>
                        <span
                            class="font-mono text-[10px] font-semibold text-blue-200 tracking-widest uppercase"
                        >
                            Career Progression
                        </span>
                    </div>
                </div>

                <h3
                    class="text-3xl lg:text-5xl font-black mb-4 leading-tight text-white tracking-tight"
                >
                    {personal.yearsOfExperience}+ Years of <br />
                    <span
                        class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-violet-400 to-blue-500"
                    >
                        Engineering Excellence.
                    </span>
                </h3>

                <p class="text-sm text-muted-foreground leading-relaxed">
                    {content.introParagraph}
                </p>
            </div>
        </div>

        <!-- TIMELINE PANEL -->
        <div
            class="exp-panel pointer-events-auto w-full border border-white/10 bg-black/40 backdrop-blur-2xl rounded-3xl shadow-2xl p-6 relative overflow-hidden"
        >
            <div class="flex items-center gap-2 mb-4 opacity-70">
                <Briefcase size={14} class="text-blue-400" />
                <span
                    class="font-mono text-[10px] uppercase tracking-widest text-blue-400"
                    >Career.log</span
                >
            </div>

            <div class="relative">
                <div
                    class="absolute left-[13px] top-2 bottom-2 w-px bg-gradient-to-b from-blue-500/40 via-violet-500/20 to-transparent"
                ></div>
                <div class="flex flex-col gap-3">
                    {#each milestones as m, i}
                        <div class="relative flex items-start gap-4 group/n">
                            <div
                                class="relative z-10 flex-shrink-0 w-7 h-7 rounded-lg border flex items-center justify-center transition-all duration-300 {i ===
                                milestones.length - 1
                                    ? 'bg-amber-500/15 border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                                    : 'bg-black/60 border-white/10 group-hover/n:border-white/25'}"
                            >
                                <svelte:component
                                    this={m.icon}
                                    size={13}
                                    style="color: {m.color}"
                                />
                                {#if i === milestones.length - 1}
                                    <div
                                        class="absolute -inset-0.5 rounded-lg bg-amber-500/20 animate-ping opacity-40"
                                    ></div>
                                {/if}
                            </div>
                            <div class="flex-1 min-w-0 pt-0.5">
                                <div class="flex items-center gap-2 mb-0.5">
                                    <span
                                        class="font-mono text-[10px] font-bold"
                                        style="color: {m.color}">{m.year}</span
                                    >
                                    <span class="text-white/10">·</span>
                                    <span
                                        class="text-xs font-bold text-white/90"
                                        >{m.label}</span
                                    >
                                </div>
                                <p class="text-[10px] text-white/40 font-mono">
                                    {m.role}
                                </p>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        </div>

        <!-- CTA -->
        <div
            class="exp-panel pointer-events-auto px-6 py-3 border border-white/10 bg-black/40 backdrop-blur-2xl rounded-3xl"
        >
            <a
                href={content.ctaSlug}
                class="group/cta flex items-center gap-2 text-[11px] font-bold text-blue-400/70 hover:text-blue-400 transition-colors"
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
