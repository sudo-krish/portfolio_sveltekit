<script lang="ts">
    import { Zap, Github, Linkedin, FileText } from "lucide-svelte";
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
    const cta = props.cta ?? heroContent.actionDock.cta;
    const links = props.links ?? heroContent.actionDock.links;

    function scrollToPipeline() {
        document
            .getElementById("pipeline")
            ?.scrollIntoView({ behavior: "smooth" });
    }
</script>

<div class="action-dock w-full relative z-30 pointer-events-auto">
    <div
        class="w-full flex items-stretch justify-between gap-2 p-1.5 bg-black/60 backdrop-blur-2xl rounded-[1.5rem] border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.15)]"
    >
        <Button
            variant="default"
            class="flex-1 h-14 text-[13px] font-bold rounded-xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_0_15px_hsl(var(--primary)/0.4)] group overflow-hidden relative"
            onclick={scrollToPipeline}
        >
            <div
                class="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/20 to-transparent group-active:translate-x-[150%] transition-transform duration-700 ease-out"
            ></div>
            {cta}
            <Zap class="ml-1.5 fill-white" size={14} />
        </Button>

        <div
            class="flex items-center gap-1 px-1.5 bg-white/5 rounded-xl border border-white/5"
        >
            <Button
                variant="ghost"
                class="w-11 h-11 p-0 rounded-lg hover:bg-white/10 transition-colors"
                href={links.github}
                target="_blank"
            >
                <Github size={18} class="text-white/80" />
            </Button>
            <div class="w-[1px] h-5 bg-white/10"></div>
            <Button
                variant="ghost"
                class="w-11 h-11 p-0 rounded-lg hover:bg-white/10 transition-colors"
                href={links.linkedin}
                target="_blank"
            >
                <Linkedin size={18} class="text-white/80" />
            </Button>
            <div class="w-[1px] h-5 bg-white/10"></div>
            <Button
                variant="ghost"
                class="w-11 h-11 p-0 rounded-lg hover:bg-white/10 transition-colors"
                href={links.resume}
                target="_blank"
            >
                <FileText
                    size={18}
                    class="text-primary drop-shadow-[0_0_8px_currentColor]"
                />
            </Button>
        </div>
    </div>
</div>
