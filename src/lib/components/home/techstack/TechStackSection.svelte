<!-- src/lib/components/home/techstack/TechStackSection.svelte -->
<script lang="ts">
    import { onMount } from "svelte";
    import gsap from "gsap";
    import { Zap, Database, Globe, Sparkles } from "lucide-svelte";
    import TechStackCard from "./TechStackCard.svelte";
    import SpecialtyCard from "./SpecialtyCard.svelte";

    onMount(() => {
        gsap.fromTo(
            ".tech-card",
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: { trigger: "#techstack", start: "top 60%" },
            },
        );
    });
</script>

<div
    class="relative w-full h-[100dvh] overflow-hidden pointer-events-none z-20"
>
    <!-- Ambient glow -->
    <div
        class="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/[0.04] rounded-full blur-[120px] pointer-events-none"
    ></div>

    <div class="absolute inset-0 flex items-center pointer-events-auto">
        <div class="w-full max-w-6xl mx-auto px-6 lg:px-12">
            <!-- Main tech stack card spanning wider -->
            <div class="tech-card mb-5 lg:max-w-[60%]">
                <TechStackCard />
            </div>

            <!-- Specialty row below -->
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:max-w-[60%]">
                <div class="tech-card">
                    <SpecialtyCard
                        icon={Zap}
                        title="Real-Time CDC"
                        highlight="RARE"
                        description="Kafka + Debezium CDC"
                        tags={["Kafka", "Debezium", "CDC"]}
                    />
                </div>
                <div class="tech-card">
                    <SpecialtyCard
                        icon={Database}
                        title="NRT Warehouse"
                        highlight="5-MIN"
                        description="Sub-5-minute refresh"
                        tags={["Redshift", "Glue"]}
                    />
                </div>
                <div class="tech-card">
                    <SpecialtyCard
                        icon={Globe}
                        title="Cloud Migration"
                        highlight="GCP→AWS"
                        description="K8s orchestration"
                        tags={["AWS", "GCP", "K8s"]}
                    />
                </div>
                <div class="tech-card">
                    <SpecialtyCard
                        icon={Sparkles}
                        title="Vector DB & AI"
                        highlight="AI-READY"
                        description="Semantic search + NLQ"
                        tags={["Vector DB", "GenAI"]}
                    />
                </div>
            </div>
        </div>
    </div>
</div>
