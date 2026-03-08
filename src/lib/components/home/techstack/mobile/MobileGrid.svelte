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
        class="w-full p-6 rounded-[1.5rem] bg-[#050505]/80 backdrop-blur-xl border border-white/5 shadow-xl"
    >
        <div
            class="text-[10px] font-mono text-cyan-400 uppercase tracking-[0.2em] mb-3 block"
        >
            {techstackData.rightAnchor.label}
        </div>
        <p class="text-sm text-white/80 leading-relaxed mb-4">
            {@html techstackData.content.shortDescription}
        </p>
    </div>

    <!-- Grid of Skill Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {#each techstackData.categories as cat}
            <div
                class="flex flex-col p-5 rounded-[1.25rem] bg-[#050505]/80 backdrop-blur-xl border border-white/5 relative overflow-hidden"
            >
                <!-- Background Accent Glow -->
                <div
                    class="absolute -right-8 -top-8 w-24 h-24 rounded-full blur-[30px] opacity-10 pointer-events-none"
                    style="background-color: {cat.accent}"
                ></div>

                <!-- Card Header -->
                <div class="flex items-center gap-3 mb-4">
                    <div
                        class="w-8 h-8 rounded-lg bg-white/[0.02] border border-white/10 flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
                    >
                        <svelte:component
                            this={getIcon(cat.iconName)}
                            size={14}
                            style="color: {cat.accent}"
                        />
                    </div>
                    <span
                        class="text-[13px] font-bold text-white/90 tracking-wide"
                        >{cat.name}</span
                    >
                </div>

                <!-- Skill Tags -->
                <div class="flex flex-wrap gap-1.5 relative z-10">
                    {#each cat.skills as skill}
                        <div
                            class="flex items-center gap-1.5 px-2 py-1 rounded-md border border-white/5 bg-white/[0.03] text-[10px] font-mono text-white/60 group/skill"
                        >
                            <img
                                src={skill.icon}
                                alt={skill.name}
                                class="w-3 h-3 object-contain opacity-70 group-hover/skill:opacity-100 transition-opacity"
                            />
                            <span>{skill.name}</span>
                        </div>
                    {/each}
                </div>
            </div>
        {/each}
    </div>

    <!-- Mobile CTA Button -->
    <a
        href={techstackData.ui.cta.href}
        class="w-full mt-2 p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 flex items-center justify-between"
    >
        <div class="flex flex-col">
            <span
                class="font-mono text-[9px] text-cyan-400 uppercase tracking-widest mb-1"
                >Explore Work</span
            >
            <span class="text-sm font-bold text-white leading-none"
                >{techstackData.ui.cta.label}</span
            >
        </div>
        <div
            class="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400"
        >
            <ArrowRight size={14} />
        </div>
    </a>
</div>
