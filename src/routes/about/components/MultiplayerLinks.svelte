<script lang="ts">
    import { Mail, Github, Linkedin } from "lucide-svelte";
    export let personal: any;
</script>

<div
    class="w-full mt-8 bg-[#1a1f2e] border-[4px] border-[#346856] rounded p-4 flex flex-col sm:flex-row items-center justify-between gap-4"
>
    <span class="retro-font text-green-400 text-lg">MULTIPLAYER:</span>
    <div class="flex flex-wrap gap-6">
        <a
            href="mailto:{personal.email}"
            class="retro-font text-base text-white hover:text-green-400 flex items-center gap-2 transition-colors"
        >
            <Mail size={16} /> Email
        </a>
        <a
            href="https://github.com/sudo-krish"
            target="_blank"
            class="retro-font text-base text-white hover:text-green-400 flex items-center gap-2 transition-colors"
        >
            <Github size={16} /> GitHub
        </a>
        <a
            href={personal.socialLinks.linkedin}
            target="_blank"
            class="retro-font text-base text-white hover:text-green-400 flex items-center gap-2 transition-colors"
        >
            <Linkedin size={16} /> LinkedIn
        </a>
    </div>
</div>

<style>
    .retro-font {
        font-family: "VT323", monospace, "Courier New", Courier;
        letter-spacing: 0.05em;
    }
</style>
