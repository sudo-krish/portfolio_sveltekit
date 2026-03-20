<script lang="ts">
    import { Zap, Github, Linkedin, FileText } from "lucide-svelte";
    import { Button } from "$lib/components/ui/button";
    import PillButton from "$lib/components/ui/buttons/PillButton.svelte";

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
</script>

<div class="action-dock w-full relative z-30 pointer-events-auto">
    <div
        class="w-full flex items-stretch justify-between gap-2 p-1.5 bg-card/90 backdrop-blur-2xl rounded-[1.5rem] border border-foreground/10 shadow-[0_20px_40px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.15)]"
    >
        <PillButton
            href="#pipeline"
            label={cta}
            Icon={Zap}
            accentColor="primary"
        />

        <div
            class="flex items-center gap-1 px-1.5 bg-foreground/5 rounded-xl border border-foreground/5"
        >
            <Button
                variant="ghost"
                class="w-11 h-11 p-0 rounded-lg hover:bg-foreground/10 transition-colors"
                href={links.github}
                target="_blank"
                aria-label="GitHub Profile"
            >
                <Github size={18} class="text-foreground/80" />
            </Button>
            <div class="w-[1px] h-5 bg-foreground/10"></div>
            <Button
                variant="ghost"
                class="w-11 h-11 p-0 rounded-lg hover:bg-foreground/10 transition-colors"
                href={links.linkedin}
                target="_blank"
                aria-label="LinkedIn Profile"
            >
                <Linkedin size={18} class="text-foreground/80" />
            </Button>
            <div class="w-[1px] h-5 bg-foreground/10"></div>
            <Button
                variant="ghost"
                class="w-11 h-11 p-0 rounded-lg hover:bg-foreground/10 transition-colors"
                href={links.resume}
                target="_blank"
                aria-label="View Resume Document"
            >
                <FileText
                    size={18}
                    class="text-primary drop-shadow-[0_0_8px_currentColor]"
                />
            </Button>
        </div>
    </div>
</div>

