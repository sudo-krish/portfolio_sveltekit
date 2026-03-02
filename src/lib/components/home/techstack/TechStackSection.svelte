<!-- src/lib/components/home/techstack/TechStackSection.svelte -->
<!-- 3D: RIGHT (x:4.5) | Content: LEFT -->
<script lang="ts">
    import { onMount } from "svelte";
    import gsap from "gsap";
    import {
        Code2,
        Cloud,
        Database,
        GitBranch,
        Layers,
        Zap,
    } from "lucide-svelte";
    import { getSectionContent } from "$lib/data/section-content";
    import GlassPanel from "$lib/components/ui/GlassPanel.svelte";
    import StatusBadge from "$lib/components/ui/StatusBadge.svelte";
    import CtaLink from "$lib/components/ui/CtaLink.svelte";
    import GlowAccent from "$lib/components/ui/GlowAccent.svelte";
    import MobileCarousel from "$lib/components/ui/MobileCarousel.svelte";

    const content = getSectionContent("techstack")!;

    const categories = [
        {
            icon: Cloud,
            name: "Cloud",
            accent: "#3b82f6",
            skills: ["AWS", "Redshift", "Glue", "Lambda", "Kinesis", "S3"],
        },
        {
            icon: Database,
            name: "Data",
            accent: "#8b5cf6",
            skills: ["Kafka", "Debezium", "Airflow", "DBT", "Spark", "Flink"],
        },
        {
            icon: Code2,
            name: "Languages",
            accent: "#10b981",
            skills: ["Python", "Go", "SQL", "PySpark", "TypeScript"],
        },
        {
            icon: GitBranch,
            name: "DevOps",
            accent: "#f59e0b",
            skills: ["Docker", "K8s", "Terraform", "CI/CD", "ArgoCD"],
        },
    ];

    const totalSkills = categories.reduce(
        (sum, cat) => sum + cat.skills.length,
        0,
    );

    onMount(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo(
                ".ts-panel",
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
    sectionTitle="Tech Stack"
    sectionDescription="Explore my technical arsenal"
    accentColor="#06b6d4"
>
    <!-- DESKTOP / TABLET (Original Preserved floating layout) -->
    <svelte:fragment slot="content-pc">
        <GlowAccent color="#06b6d4" position="top-[20%] left-[10%]" />

        <!-- MAIN CONTENT CARD (LEFT SIDE PC) -->
        <div
            class="absolute top-[18%] left-[8%] w-full max-w-xl z-20 pointer-events-auto flex flex-col gap-4"
        >
            <!-- MAIN NARRATIVE -->
            <GlassPanel
                glow="#06b6d4"
                className="ts-panel w-full p-8 shrink-0 rounded-2xl"
            >
                <div class="mb-6 flex items-center gap-3">
                    <StatusBadge color="#06b6d4" label="Technical Arsenal" />
                </div>

                <h3
                    class="text-4xl lg:text-5xl font-black mb-4 leading-tight text-white tracking-tight"
                >
                    {totalSkills}+ Tools in the <br />
                    <span
                        class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-500"
                    >
                        Stack.
                    </span>
                </h3>

                <p
                    class="text-sm lg:text-base text-muted-foreground leading-relaxed"
                >
                    {content.introParagraph}
                </p>
            </GlassPanel>

            <!-- TECH GRID -->
            <GlassPanel className="ts-panel w-full p-6 shrink-0 rounded-2xl">
                <div class="flex items-center justify-between mb-6 opacity-70">
                    <div class="flex items-center gap-2">
                        <Layers size={14} class="text-cyan-400" />
                        <span
                            class="font-mono text-[10px] uppercase tracking-widest text-cyan-400"
                            >sys.modules</span
                        >
                    </div>
                    <div
                        class="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_rgba(6,182,212,1)]"
                    ></div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {#each categories as cat}
                        <div class="flex flex-col gap-3">
                            <div
                                class="flex items-center gap-2 pb-2 border-b border-white/[0.06]"
                            >
                                <svelte:component
                                    this={cat.icon}
                                    size={14}
                                    style="color: {cat.accent}"
                                />
                                <span class="text-xs font-bold text-white/70"
                                    >{cat.name}</span
                                >
                            </div>
                            <div class="flex flex-wrap gap-1.5">
                                {#each cat.skills as skill}
                                    <span
                                        class="px-2 py-1 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 transition-colors text-[10px] font-mono text-white/60 hover:text-white/90 cursor-default"
                                    >
                                        {skill}
                                    </span>
                                {/each}
                            </div>
                        </div>
                    {/each}
                </div>
            </GlassPanel>

            <!-- CTA -->
            <GlassPanel className="ts-panel px-6 py-4 shrink-0 rounded-xl">
                <CtaLink
                    href={content.ctaSlug}
                    label={content.ctaLabel}
                    color="#06b6d4"
                />
            </GlassPanel>
        </div>
    </svelte:fragment>

    <!-- MOBILE / SMALL TABLET (Carousel Slide Layout) -->
    <svelte:fragment slot="content-mobile">
        <div
            class="z-20 w-full max-w-lg mx-auto pointer-events-auto flex flex-col gap-3 mt-4"
        >
            <!-- MAIN NARRATIVE -->
            <GlassPanel
                glow="#06b6d4"
                className="ts-panel w-full p-6 lg:p-8 shrink-0 rounded-2xl"
            >
                <div class="mb-4 lg:mb-6 flex items-center gap-3">
                    <StatusBadge color="#06b6d4" label="Technical Arsenal" />
                </div>

                <h3
                    class="text-3xl lg:text-4xl font-black mb-3 lg:mb-4 leading-tight text-white tracking-tight"
                >
                    {totalSkills}+ Tools in the <br />
                    <span
                        class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-500"
                    >
                        Stack.
                    </span>
                </h3>

                <p
                    class="text-xs sm:text-sm text-muted-foreground leading-relaxed"
                >
                    {content.introParagraph}
                </p>
            </GlassPanel>

            <!-- TECH GRID -->
            <GlassPanel
                className="ts-panel w-full p-5 lg:p-6 shrink-0 rounded-2xl"
            >
                <div class="flex items-center justify-between mb-4 opacity-70">
                    <div class="flex items-center gap-2">
                        <Layers size={14} class="text-cyan-400" />
                        <span
                            class="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-cyan-400"
                            >sys.modules</span
                        >
                    </div>
                    <div
                        class="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_rgba(6,182,212,1)]"
                    ></div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {#each categories as cat}
                        <div class="flex flex-col gap-2">
                            <div
                                class="flex items-center gap-2 pb-1.5 border-b border-white/[0.06]"
                            >
                                <svelte:component
                                    this={cat.icon}
                                    size={12}
                                    style="color: {cat.accent}"
                                />
                                <span
                                    class="text-[10px] sm:text-[11px] font-bold text-white/70"
                                    >{cat.name}</span
                                >
                            </div>
                            <div class="flex flex-wrap gap-1 lg:gap-1.5">
                                {#each cat.skills as skill}
                                    <span
                                        class="px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 transition-colors text-[9px] sm:text-[10px] font-mono text-white/60 hover:text-white/90 cursor-default"
                                    >
                                        {skill}
                                    </span>
                                {/each}
                            </div>
                        </div>
                    {/each}
                </div>
            </GlassPanel>

            <!-- CTA -->
            <GlassPanel
                className="ts-panel px-5 py-3 lg:px-6 shrink-0 rounded-xl"
            >
                <CtaLink
                    href={content.ctaSlug}
                    label={content.ctaLabel}
                    color="#06b6d4"
                />
            </GlassPanel>
        </div>
    </svelte:fragment>
</MobileCarousel>
