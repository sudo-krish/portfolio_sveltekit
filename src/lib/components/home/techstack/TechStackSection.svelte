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
    <GlowAccent color="#06b6d4" position="top-[20%] left-[10%]" />

    <!-- Content: LEFT (3D on RIGHT) -->
    <div
        class="absolute top-[15%] md:top-[20%] left-[5%] md:left-[10%] w-full max-w-sm md:max-w-xl lg:max-w-2xl lg:w-[45%] flex flex-col gap-4"
    >
        <!-- MAIN NARRATIVE -->
        <GlassPanel
            glow="#06b6d4"
            className="ts-panel pointer-events-auto w-full p-8"
        >
            <div class="mb-6 flex items-center gap-3">
                <StatusBadge color="#06b6d4" label="Technical Arsenal" />
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
        </GlassPanel>

        <!-- TECH GRID -->
        <GlassPanel className="ts-panel pointer-events-auto w-full p-6">
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
        </GlassPanel>

        <!-- CTA -->
        <GlassPanel className="ts-panel pointer-events-auto px-6 py-3">
            <CtaLink
                href={content.ctaSlug}
                label={content.ctaLabel}
                color="#06b6d4"
            />
        </GlassPanel>
    </div>
</div>
