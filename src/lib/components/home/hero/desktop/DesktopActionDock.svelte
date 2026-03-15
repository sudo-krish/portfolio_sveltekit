<script lang="ts">
    import { Zap, Github, Linkedin } from "lucide-svelte";
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
    const ctaDesktop = props.ctaDesktop ?? heroContent.actionDock.ctaDesktop;
    const links = props.links ?? heroContent.actionDock.links;
</script>

<div
    class="action-dock flex items-stretch w-full bg-card/80 backdrop-blur-xl rounded-[1.5rem] border border-foreground/10 shadow-[0_20px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)]"
    style="gap: 0.6cqi; padding: 0.4cqi;"
>
    <PillButton
        href="#pipeline"
        label={ctaDesktop}
        Icon={Zap}
        accentColor="primary"
    />

    <div class="flex items-center bg-foreground/5 rounded-[1.2rem]" style="gap: 0.3cqi; padding: 0 0.4cqi;">
        <Button
            variant="ghost"
            class="p-0 rounded-xl hover:bg-foreground/10 transition-colors"
            style="width: 2.5cqi; height: 2.5cqi;"
            href={links.github}
            target="_blank"
        >
            <Github size={20} class="text-foreground/80" />
        </Button>

        <div class="w-[1px] h-6 bg-foreground/10"></div>

        <Button
            variant="ghost"
            class="p-0 rounded-xl hover:bg-foreground/10 transition-colors"
            style="width: 2.5cqi; height: 2.5cqi;"
            href={links.linkedin}
            target="_blank"
        >
            <Linkedin size={20} class="text-foreground/80" />
        </Button>

        <div class="w-[1px] h-6 bg-foreground/10"></div>

        <Button
            variant="ghost"
            class="rounded-xl hover:bg-foreground/10 font-mono uppercase tracking-widest text-primary transition-colors"
            style="height: 2.5cqi; padding: 0 0.8cqi; font-size: clamp(8px, 0.7cqi, 11px);"
            href={links.resume}
            target="_blank"
        >
            Resume
        </Button>
    </div>
</div>

