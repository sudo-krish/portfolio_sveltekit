<!-- src/routes/about/+page.svelte -->
<script lang="ts">
    import { getPersonalInfo } from "$lib/data/portfolio-data";
    import { ArrowLeft } from "lucide-svelte";
    import BattleGame from "./BattleGame.svelte";
    import SEO from "$lib/components/SEO.svelte";

    const personal = getPersonalInfo();
</script>

<SEO 
    title="Encounter! — Sudo Krish"
    description="A retro Pokémon-style encounter showcasing my data engineering skills, experience, and lore."
    url="{personal.website}/about"
/>

<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossorigin="anonymous"
    />
    <link
        href="https://fonts.googleapis.com/css2?family=VT323&display=swap"
        rel="stylesheet"
    />
</svelte:head>

<!-- Global layout wrapper -->
<div
    class="min-h-screen bg-[#1a1c23] flex flex-col font-sans relative overflow-x-hidden retro-bg items-center pb-8"
    style="image-rendering: pixelated;"
>
    <!-- Top Navigation -->
    <div
        class="relative z-40 w-full max-w-4xl mx-auto px-4 pt-20 sm:pt-24 pb-2 flex justify-between items-center"
    >
        <a
            href="/"
            class="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors group retro-font uppercase tracking-widest"
        >
            <ArrowLeft
                size={16}
                class="group-hover:-translate-x-1 transition-transform"
            />
            Run Away
        </a>
    </div>

    <!-- The actual game component mounted cleanly -->
    <BattleGame {personal} />
</div>

<style>
    /* Scoped font class specifically for the Nav bar */
    .retro-font {
        font-family: "VT323", monospace, "Courier New", Courier;
        letter-spacing: 0.05em;
    }

    /* Keep the iconic dotted grid background on the full page wrapper */
    .retro-bg {
        background-color: #1a1c23;
        background-image: radial-gradient(#2a2d36 1px, transparent 1px);
        background-size: 20px 20px;
    }
</style>
