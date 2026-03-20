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

<div class="w-full flex flex-col relative z-10" style="gap: 0.6cqi;">
    <!-- 3x2 Grid of Frosted Glass Skill Cards -->
    <div class="grid grid-cols-2 xl:grid-cols-3" style="gap: 0.8cqi;">
        {#each techstackData.categories as cat}
            <div
            class="group relative flex flex-col rounded-2xl bg-foreground/[0.03] backdrop-blur-2xl border border-foreground/10 hover:bg-foreground/[0.06] hover:border-foreground/20 transition-all duration-500 overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.5)]"
            style="padding: 1cqi;"
            >
                <!-- Subtle internal shine/highlight -->
                <div
                    class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-50"
                ></div>

                <!-- Soft Glow -->
                <div
                    class="absolute -right-8 -bottom-8 w-32 h-32 2xl:w-40 2xl:h-40 rounded-full blur-[40px] 2xl:blur-[50px] opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"
                    style="background-color: {cat.accent}"
                ></div>

                <!-- Card Header -->
                <div
                    class="flex items-center relative z-10 border-b border-border"
                    style="gap: 0.5cqi; margin-bottom: 0.5cqi; padding-bottom: 0.4cqi;"
                >
                    <div
                        class="rounded-lg bg-muted border border-border flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] group-hover:-translate-y-0.5 transition-transform duration-300"
                        style="width: 1.5cqi; height: 1.5cqi;"
                    >
                        <svelte:component
                            this={getIcon(cat.iconName)}
                            size={16}
                            style="color: {cat.accent}"
                            class="drop-shadow-[0_0_8px_currentColor]"
                        />
                    </div>
                    <span
                        class="font-bold text-foreground tracking-wide drop-shadow-md"
                        style="font-size: clamp(10px, 1cqi, 15px);"
                    >
                        {cat.name}
                    </span>
                </div>

                <!-- Skill Tags with Icons -->
                <div class="flex flex-wrap relative z-10" style="gap: 0.3cqi;">
                    {#each cat.skills as skill}
                        <div
                            class="flex items-center rounded-md border border-border bg-muted/50 hover:bg-muted hover:border-primary/20 transition-all duration-300 cursor-default group/skill shadow-inner"
                            style="gap: 0.3cqi; padding: 0.15cqi 0.4cqi;"
                        >
                            <!-- UPDATED: Icon Wrapper with white background -->
                            <div
                                class="flex items-center justify-center rounded-md bg-background shadow-sm opacity-80 group-hover/skill:opacity-100 transition-opacity"
                                style="width: 1cqi; height: 1cqi;"
                            >
                                <img
                                    src={skill.icon}
                                    alt={skill.name}
                                    class="w-3 h-3 2xl:w-3.5 2xl:h-3.5 object-contain"
                                    loading="lazy"
                                    width="14"
                                    height="14"
                                />
                            </div>

                            <span
                                class="font-mono text-muted-foreground group-hover/skill:text-foreground transition-colors"
                                style="font-size: clamp(7px, 0.7cqi, 11px);"
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
        class="rounded-xl bg-cyan-950/20 backdrop-blur-xl border border-cyan-500/20 border-l-4 border-l-cyan-400 shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
        style="margin-top: 0.2cqi; padding: 1cqi;"
    >
        <p
            class="leading-[1.5] text-foreground"
            style="font-size: clamp(0.65rem, 0.85cqi, 0.95rem);"
        >
            {@html techstackData.content.shortDescription}
            {@html techstackData.content.detailedPhilosophy}
        </p>
    </div>
</div>
