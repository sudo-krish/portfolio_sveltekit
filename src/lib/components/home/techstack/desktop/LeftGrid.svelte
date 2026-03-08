<!-- src/lib/components/home/techstack/desktop/LeftGrid.svelte -->
<script lang="ts">
    import { Cloud, Database, Code2, GitBranch, Layers } from "lucide-svelte";
    import { techstackData } from "$lib/data/techstack";

    const getIcon = (name: string) => {
        switch (name) {
            case "Cloud":
                return Cloud;
            case "Database":
                return Database;
            case "Code2":
                return Code2;
            case "GitBranch":
                return GitBranch;
            default:
                return Layers;
        }
    };
</script>

<div class="w-full max-w-[1050px] flex flex-col gap-3 2xl:gap-5 relative z-10">
    <!-- 3x2 Grid of Frosted Glass Skill Cards -->
    <div class="grid grid-cols-2 xl:grid-cols-3 gap-3 2xl:gap-5">
        {#each techstackData.categories as cat}
            <div
                class="group relative flex flex-col p-4 2xl:p-5 rounded-2xl 2xl:rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/10 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-500 overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.5)]"
            >
                <!-- Subtle internal shine/highlight -->
                <div
                    class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50"
                ></div>

                <!-- Soft Glow -->
                <div
                    class="absolute -right-8 -bottom-8 w-32 h-32 2xl:w-40 2xl:h-40 rounded-full blur-[40px] 2xl:blur-[50px] opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"
                    style="background-color: {cat.accent}"
                ></div>

                <!-- Card Header -->
                <div
                    class="flex items-center gap-2.5 mb-3 2xl:mb-4 border-b border-white/[0.05] pb-2.5 2xl:pb-3 relative z-10"
                >
                    <div
                        class="w-8 h-8 2xl:w-10 2xl:h-10 rounded-lg 2xl:rounded-xl bg-black/20 border border-white/10 flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] group-hover:-translate-y-0.5 transition-transform duration-300"
                    >
                        <svelte:component
                            this={getIcon(cat.iconName)}
                            size={16}
                            style="color: {cat.accent}"
                            class="drop-shadow-[0_0_8px_currentColor]"
                        />
                    </div>
                    <!-- Fluid Typography for the title -->
                    <span
                        class="text-[clamp(12px,1.2vw,15px)] font-bold text-white/90 tracking-wide drop-shadow-md"
                    >
                        {cat.name}
                    </span>
                </div>

                <!-- Skill Tags with Icons -->
                <div class="flex flex-wrap gap-1.5 2xl:gap-2 relative z-10">
                    {#each cat.skills as skill}
                        <div
                            class="flex items-center gap-1.5 px-2 py-1 2xl:px-2.5 2xl:py-1.5 rounded-md 2xl:rounded-lg border border-white/5 bg-black/30 hover:bg-black/50 hover:border-white/20 transition-all duration-300 cursor-default group/skill shadow-inner"
                        >
                            <!-- UPDATED: Icon Wrapper with white background -->
                            <div
                                class="flex items-center justify-center w-[18px] h-[18px] 2xl:w-[20px] 2xl:h-[20px] rounded-md bg-white/90 shadow-sm opacity-80 group-hover/skill:opacity-100 transition-opacity"
                            >
                                <img
                                    src={skill.icon}
                                    alt={skill.name}
                                    class="w-3 h-3 2xl:w-3.5 2xl:h-3.5 object-contain"
                                />
                            </div>

                            <!-- Fluid typography for the skill text -->
                            <span
                                class="text-[clamp(9px,0.9vw,11px)] font-mono text-white/70 group-hover/skill:text-white transition-colors"
                            >
                                {skill.name}
                            </span>
                        </div>
                    {/each}
                </div>
            </div>
        {/each}
    </div>

    <!-- Short Philosophy snippet beneath the grid -->
    <div
        class="mt-1 2xl:mt-3 p-4 2xl:p-5 rounded-xl 2xl:rounded-2xl bg-cyan-950/20 backdrop-blur-xl border border-cyan-500/20 border-l-4 border-l-cyan-400 shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
    >
        <!-- Fluid typography ensures paragraph never overflows -->
        <p
            class="text-[clamp(0.75rem,0.9vw,0.95rem)] leading-[1.5] 2xl:leading-[1.6] text-white/80"
        >
            {@html techstackData.content.shortDescription}
            {@html techstackData.content.detailedPhilosophy}
        </p>
    </div>
</div>
