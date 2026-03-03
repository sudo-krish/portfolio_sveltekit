<script lang="ts">
    import { Zap, Github, Linkedin } from "lucide-svelte";
    import { Button } from "$lib/components/ui/button";

    // Import the shared hero text
    import { heroContent } from "$lib/data/hero_content";

    // Allow dynamic overrides from parent, but make them optional
    let props = $props<{
        cta?: string;
        links?: {
            github: string;
            linkedin: string;
            resume: string;
        };
    }>();

    // Default to heroContent, but allow parent to override
    const ctaDesktop = props.ctaDesktop ?? heroContent.actionDock.ctaDesktop;
    const links = props.links ?? heroContent.actionDock.links;

    function scrollToPipeline() {
        document
            .getElementById("pipeline")
            ?.scrollIntoView({ behavior: "smooth" });
    }
</script>

<div
    class="action-dock flex items-stretch gap-3 w-full p-2 bg-black/40 backdrop-blur-xl rounded-[1.5rem] border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)]"
>
    <Button
        variant="default"
        class="flex-1 h-14 text-base font-bold rounded-[1.2rem] shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_0_15px_hsl(var(--primary)/0.3)] group overflow-hidden relative"
        onclick={scrollToPipeline}
    >
        <div
            class="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-[150%] transition-transform duration-1000 ease-out"
        ></div>
        {ctaDesktop}
        <Zap class="ml-2 fill-white" size={18} />
    </Button>

    <div class="flex items-center gap-1.5 px-2 bg-white/5 rounded-[1.2rem]">
        <Button
            variant="ghost"
            class="w-12 h-12 p-0 rounded-xl hover:bg-white/10 transition-colors"
            href={links.github}
            target="_blank"
        >
            <Github size={20} class="text-white/80" />
        </Button>

        <div class="w-[1px] h-6 bg-white/10"></div>

        <Button
            variant="ghost"
            class="w-12 h-12 p-0 rounded-xl hover:bg-white/10 transition-colors"
            href={links.linkedin}
            target="_blank"
        >
            <Linkedin size={20} class="text-white/80" />
        </Button>

        <div class="w-[1px] h-6 bg-white/10"></div>

        <Button
            variant="ghost"
            class="h-12 px-4 rounded-xl hover:bg-white/10 font-mono text-[11px] uppercase tracking-widest text-primary transition-colors"
            href={links.resume}
            target="_blank"
        >
            Resume
        </Button>
    </div>
</div>
