<!-- src/lib/components/home/techstack/TechStackSection.svelte -->
<!-- 3D: LEFT (x:-4.5) | Content: RIGHT -->
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
        ArrowRight,
    } from "lucide-svelte";
    import { getSectionContent } from "$lib/data/section-content";

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

<div
    class="relative w-full h-[100dvh] overflow-hidden pointer-events-none z-20"
>
    <!-- BACKGROUND AMBIENT GLOW -->
    <div
        class="absolute top-[20%] left-[10%] w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]"
    ></div>

    <!-- Content: LEFT (3D on RIGHT) -->
    <div
        class="absolute top-[15%] md:top-[20%] left-[5%] md:left-[10%] w-full max-w-sm md:max-w-xl lg:max-w-2xl lg:w-[45%] flex flex-col gap-4"
    >
        <!-- MAIN NARRATIVE PANEL -->
        <div
            class="ts-panel pointer-events-auto w-full p-8 border border-white/10 bg-black/40 backdrop-blur-2xl rounded-3xl shadow-2xl relative overflow-hidden"
        >
            <div
                class="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 blur-[50px]"
            ></div>

            <div class="relative z-10">
                <div class="mb-6 flex items-center gap-3">
                    <div
                        class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm"
                    >
                        <span class="relative flex h-1.5 w-1.5">
                            <span
                                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"
                            ></span>
                            <span
                                class="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500"
                            ></span>
                        </span>
                        <span
                            class="font-mono text-[10px] font-semibold text-cyan-200 tracking-widest uppercase"
                        >
                            Technical Arsenal
                        </span>
                    </div>
                </div>

                <h3
                    class="text-3xl lg:text-5xl font-black mb-4 leading-tight text-white tracking-tight"
                >
                    {totalSkills}+ Tools in the <br />
                    <span
                        class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-500"
                    >
                        Stack.
                    </span>
                </h3>

                <p class="text-sm text-muted-foreground leading-relaxed">
                    {content.introParagraph}
                </p>
            </div>
        </div>

        <!-- TECH GRID PANEL -->
        <div
            class="ts-panel pointer-events-auto w-full border border-white/10 bg-black/40 backdrop-blur-2xl rounded-3xl shadow-2xl p-6 relative overflow-hidden"
        >
            <div class="flex items-center justify-between mb-4 opacity-70">
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

            <div class="grid grid-cols-2 gap-3">
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
                            <span class="text-[11px] font-bold text-white/70"
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
        </div>

        <!-- CTA -->
        <div
            class="ts-panel pointer-events-auto px-6 py-3 border border-white/10 bg-black/40 backdrop-blur-2xl rounded-3xl"
        >
            <a
                href={content.ctaSlug}
                class="group/cta flex items-center gap-2 text-[11px] font-bold text-cyan-400/70 hover:text-cyan-400 transition-colors"
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
