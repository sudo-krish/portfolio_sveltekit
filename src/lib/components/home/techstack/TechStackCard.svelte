<!-- src/lib/components/home/techstack/TechStackCard.svelte -->
<script lang="ts">
    import { Code2, Cloud, Database, GitBranch, Layers } from "lucide-svelte";

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
</script>

<div
    class="w-full h-full flex flex-col rounded-2xl border border-white/[0.06] bg-black/40 backdrop-blur-2xl overflow-hidden group hover:border-cyan-500/20 transition-all duration-500"
>
    <!-- Header -->
    <div class="px-6 pt-6 pb-4 flex items-center justify-between">
        <div class="flex items-center gap-2">
            <Layers size={14} class="text-cyan-400" />
            <span
                class="font-mono text-[10px] font-bold text-cyan-400/80 tracking-[0.2em] uppercase"
                >sys.stack</span
            >
        </div>
        <span class="font-mono text-[10px] text-white/20"
            >{totalSkills} modules loaded</span
        >
    </div>

    <!-- Tech Grid -->
    <div class="flex-1 px-6 pb-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {#each categories as cat}
            <div class="flex flex-col gap-3">
                <!-- Category Header -->
                <div
                    class="flex items-center gap-2 pb-2 border-b border-white/[0.04]"
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

                <!-- Skills -->
                <div class="flex flex-col gap-1.5">
                    {#each cat.skills as skill}
                        <div
                            class="px-3 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.06] hover:border-white/10 transition-all text-[10px] font-mono text-white/50 hover:text-white/80 cursor-default flex items-center gap-2"
                        >
                            <div
                                class="w-1 h-1 rounded-full"
                                style="background: {cat.accent}; opacity: 0.5"
                            ></div>
                            {skill}
                        </div>
                    {/each}
                </div>
            </div>
        {/each}
    </div>
</div>
