<!-- src/lib/components/home/experience/ExperienceSection.svelte -->
<!-- 3D: LEFT (x:-4.5) | Content: RIGHT -->
<script lang="ts">
    import { onMount } from "svelte";
    import gsap from "gsap";
    import { Briefcase, Cloud, Zap, Terminal, Sparkles } from "lucide-svelte";
    import { getPersonalInfo } from "$lib/data/portfolio-data";
    import { getSectionContent } from "$lib/data/section-content";
    import GlassPanel from "$lib/components/ui/GlassPanel.svelte";
    import StatusBadge from "$lib/components/ui/StatusBadge.svelte";
    import CtaLink from "$lib/components/ui/CtaLink.svelte";
    import GlowAccent from "$lib/components/ui/GlowAccent.svelte";
    import MobileCarousel from "$lib/components/ui/MobileCarousel.svelte";

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

<MobileCarousel
    layout="right"
    sectionTitle="Career Log"
    sectionDescription="Swipe to view my journey"
    accentColor="#3b82f6"
>
    <!-- DESKTOP / TABLET (Original Preserved floating layout) -->
    <svelte:fragment slot="content-pc">
        <GlowAccent color="#3b82f6" position="top-[15%] left-[10%]" />

        <!-- MAIN CONTENT CARD (RIGHT SIDE PC) -->
        <div
            class="absolute top-[15%] right-[8%] w-full max-w-xl z-20 pointer-events-auto flex flex-col gap-4"
        >
            <!-- MAIN NARRATIVE PANEL -->
            <GlassPanel
                glow="#3b82f6"
                className="exp-panel w-full p-8 shrink-0 rounded-2xl"
            >
                <div class="mb-6 flex items-center gap-3">
                    <StatusBadge color="#3b82f6" label="Career Progression" />
                </div>

                <h3
                    class="text-4xl lg:text-5xl font-black mb-4 leading-tight text-white tracking-tight"
                >
                    {personal.yearsOfExperience}+ Years of <br />
                    <span
                        class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-violet-400 to-blue-500"
                    >
                        Engineering Excellence.
                    </span>
                </h3>

                <p
                    class="text-sm lg:text-base text-muted-foreground leading-relaxed"
                >
                    {content.introParagraph}
                </p>
            </GlassPanel>

            <!-- TIMELINE PANEL -->
            <GlassPanel className="exp-panel w-full p-6 shrink-0 rounded-2xl">
                <div class="flex items-center gap-2 mb-6 opacity-70">
                    <Briefcase size={14} class="text-blue-400" />
                    <span
                        class="font-mono text-[10px] uppercase tracking-widest text-blue-400"
                        >Career.log</span
                    >
                </div>

                <div class="relative pl-2">
                    <div
                        class="absolute left-[21px] top-2 bottom-2 w-px bg-gradient-to-b from-blue-500/40 via-violet-500/20 to-transparent"
                    ></div>
                    <div class="flex flex-col gap-5">
                        {#each milestones as m, i}
                            <div
                                class="relative flex items-start gap-5 group/n"
                            >
                                <div
                                    class="relative z-10 flex-shrink-0 w-8 h-8 rounded-xl border flex items-center justify-center transition-all duration-300 {i ===
                                    milestones.length - 1
                                        ? 'bg-amber-500/15 border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                                        : 'bg-black/60 border-white/10 group-hover/n:border-white/25'}"
                                >
                                    <svelte:component
                                        this={m.icon}
                                        size={14}
                                        style="color: {m.color}"
                                    />
                                    {#if i === milestones.length - 1}
                                        <div
                                            class="absolute -inset-1 rounded-xl bg-amber-500/20 animate-ping opacity-40"
                                        ></div>
                                    {/if}
                                </div>
                                <div class="flex-1 min-w-0 pt-1.5">
                                    <div class="flex items-center gap-2 mb-1">
                                        <span
                                            class="font-mono text-xs font-bold"
                                            style="color: {m.color}"
                                            >{m.year}</span
                                        >
                                        <span class="text-white/10">·</span>
                                        <span
                                            class="text-sm font-bold text-white/90 truncate"
                                            >{m.label}</span
                                        >
                                    </div>
                                    <p
                                        class="text-xs text-white/40 font-mono truncate"
                                    >
                                        {m.role}
                                    </p>
                                </div>
                            </div>
                        {/each}
                    </div>
                </div>
            </GlassPanel>

            <!-- CTA -->
            <GlassPanel className="exp-panel px-6 py-4 shrink-0 rounded-xl">
                <CtaLink
                    href={content.ctaSlug}
                    label={content.ctaLabel}
                    color="#3b82f6"
                />
            </GlassPanel>
        </div>
    </svelte:fragment>

    <!-- MOBILE / SMALL TABLET (Carousel Slide Layout) -->
    <svelte:fragment slot="content-mobile">
        <div
            class="z-20 w-full max-w-lg mx-auto pointer-events-auto flex flex-col gap-3 mt-4"
        >
            <!-- MAIN NARRATIVE PANEL -->
            <GlassPanel
                glow="#3b82f6"
                className="exp-panel w-full p-6 shrink-0 rounded-2xl"
            >
                <div class="mb-4 flex items-center gap-3">
                    <StatusBadge color="#3b82f6" label="Career Progression" />
                </div>

                <h3
                    class="text-3xl font-black mb-3 leading-tight text-white tracking-tight"
                >
                    {personal.yearsOfExperience}+ Years of <br />
                    <span
                        class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-violet-400 to-blue-500"
                    >
                        Engineering Excellence.
                    </span>
                </h3>

                <p
                    class="text-xs sm:text-sm text-muted-foreground leading-relaxed"
                >
                    {content.introParagraph}
                </p>
            </GlassPanel>

            <!-- TIMELINE PANEL -->
            <GlassPanel
                className="exp-panel w-full p-5 lg:p-6 shrink-0 rounded-2xl"
            >
                <div class="flex items-center gap-2 mb-4 opacity-70">
                    <Briefcase size={14} class="text-blue-400" />
                    <span
                        class="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-blue-400"
                        >Career.log</span
                    >
                </div>

                <div class="relative">
                    <div
                        class="absolute left-[13px] top-2 bottom-2 w-px bg-gradient-to-b from-blue-500/40 via-violet-500/20 to-transparent"
                    ></div>
                    <div class="flex flex-col gap-3">
                        {#each milestones as m, i}
                            <div
                                class="relative flex items-start gap-3 sm:gap-4 group/n"
                            >
                                <div
                                    class="relative z-10 flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-lg border flex items-center justify-center transition-all duration-300 {i ===
                                    milestones.length - 1
                                        ? 'bg-amber-500/15 border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                                        : 'bg-black/60 border-white/10 group-hover/n:border-white/25'}"
                                >
                                    <svelte:component
                                        this={m.icon}
                                        size={12}
                                        style="color: {m.color}"
                                    />
                                    {#if i === milestones.length - 1}
                                        <div
                                            class="absolute -inset-0.5 rounded-lg bg-amber-500/20 animate-ping opacity-40"
                                        ></div>
                                    {/if}
                                </div>
                                <div class="flex-1 min-w-0 pt-0.5">
                                    <div
                                        class="flex items-center gap-1 sm:gap-2 mb-0.5"
                                    >
                                        <span
                                            class="font-mono text-[9px] sm:text-[10px] font-bold"
                                            style="color: {m.color}"
                                            >{m.year}</span
                                        >
                                        <span
                                            class="text-white/10 hidden sm:inline"
                                            >·</span
                                        >
                                        <span
                                            class="text-[10px] sm:text-xs font-bold text-white/90 truncate sm:whitespace-normal"
                                            >{m.label}</span
                                        >
                                    </div>
                                    <p
                                        class="text-[9px] sm:text-[10px] text-white/40 font-mono truncate sm:whitespace-normal"
                                    >
                                        {m.role}
                                    </p>
                                </div>
                            </div>
                        {/each}
                    </div>
                </div>
            </GlassPanel>

            <!-- CTA -->
            <GlassPanel
                className="exp-panel px-5 py-3 lg:px-6 shrink-0 rounded-xl"
            >
                <CtaLink
                    href={content.ctaSlug}
                    label={content.ctaLabel}
                    color="#3b82f6"
                />
            </GlassPanel>
        </div>
    </svelte:fragment>
</MobileCarousel>
