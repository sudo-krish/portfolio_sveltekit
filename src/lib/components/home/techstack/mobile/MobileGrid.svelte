<!-- src/lib/components/home/techstack/mobile/MobileGrid.svelte -->
<script lang="ts">
    import {
        Cloud,
        Database,
        Code2,
        GitBranch,
        Layers,
        ArrowRight,
    } from "lucide-svelte";
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

<div class="w-full flex flex-col gap-4 relative z-10">
    <!-- Top Narrative Box -->
    <div
        class="w-full p-6 rounded-[1.5rem] bg-card/80 backdrop-blur-xl border border-border shadow-xl"
    >
        <div
            class="text-[10px] font-mono text-cyan-400 uppercase tracking-[0.2em] mb-3 block"
        >
            {techstackData.rightAnchor.label}
        </div>
        <p class="text-sm text-foreground leading-relaxed mb-4">
            {@html techstackData.content.shortDescription}
        </p>
    </div>

    <!-- Grid of Skill Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {#each techstackData.categories as cat}
            <div
                class="flex flex-col p-5 rounded-[1.25rem] bg-card/80 backdrop-blur-xl border border-border relative overflow-hidden"
            >
                <!-- Background Accent Glow -->
                <div
                    class="absolute -right-8 -top-8 w-24 h-24 rounded-full blur-[30px] opacity-10 pointer-events-none"
                    style="background-color: {cat.accent}"
                ></div>

                <!-- Card Header -->
                <div class="flex items-center gap-3 mb-4">
                    <div
                        class="w-8 h-8 rounded-lg bg-muted border border-border flex items-center justify-center shadow-sm"
                    >
                        <svelte:component
                            this={getIcon(cat.iconName)}
                            size={14}
                            style="color: {cat.accent}"
                        />
                    </div>
                    <span
                        class="text-[13px] font-bold text-foreground tracking-wide"
                        >{cat.name}</span
                    >
                </div>

                <!-- Skill Tags -->
                <div class="flex flex-wrap gap-1.5 relative z-10">
                    {#each cat.skills as skill}
                        <div
                            class="flex items-center gap-1.5 px-2 py-1 rounded-md border border-border bg-muted/50 text-[10px] font-mono text-muted-foreground group/skill"
                        >
                            <img
                                src={skill.icon}
                                alt={skill.name}
                                class="w-3 h-3 object-contain opacity-70 group-hover/skill:opacity-100 transition-opacity"
                                loading="lazy"
                                width="12"
                                height="12"
                            />
                            <span>{skill.name}</span>
                        </div>
                    {/each}
                </div>
            </div>
        {/each}
    </div>
</div>
