<!-- src/routes/about/+page.svelte -->
<script lang="ts">
    import { personal } from "$lib/data/site";
    import { aboutPageContent } from "$lib/data/about-page";
    import { ArrowLeft } from "lucide-svelte";
    import BattleGame from "./BattleGame.svelte";
    import SEO from "$lib/components/SEO.svelte";
    import Breadcrumbs from "$lib/components/seo/Breadcrumbs.svelte";
    import StructuredData from "$lib/components/StructuredData.svelte";
    import { fade, fly } from "svelte/transition"; // Import transitions

    const crumbs = [
        { label: aboutPageContent.h1, url: '/about' }
    ];

    // STATE: Track if the user has read the instructions and started the game
    let gameStarted = false;

    function startGame() {
        gameStarted = true;
    }
</script>

<SEO
    title={aboutPageContent.seo.title}
    description={aboutPageContent.seo.description}
    keywords={aboutPageContent.seo.keywords}
    url="{personal.website}/about"
/>
<StructuredData type="ProfilePage" />

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
        class="relative z-40 w-full max-w-4xl mx-auto px-4 pt-16 sm:pt-24 pb-2 flex flex-col gap-4"
    >
        <div class="flex justify-between items-center">
            <Breadcrumbs {crumbs} />
        </div>

        <!-- Crawlable H1 and intro for SEO -->
        <h1 class="text-2xl sm:text-3xl font-bold text-white/90 tracking-tight">
            {aboutPageContent.h1}
        </h1>
        <p class="text-sm sm:text-base text-white/60 max-w-xl leading-relaxed">
            {aboutPageContent.introParagraph}
        </p>

        <!-- Crawlable semantic navigation links -->
        <nav class="flex flex-wrap gap-3 text-xs sm:text-sm">
            {#each aboutPageContent.navLinks as link}
                <a href={link.href} class="text-white/50 hover:text-white transition-colors">{link.label}</a>
            {/each}
        </nav>
    </div>

    <!-- RENDERING LOGIC: Show Instructions OR the Game -->
    {#if !gameStarted}
        <!-- FULL SCREEN INSTRUCTION OVERLAY -->
        <div
            class="flex-1 w-full max-w-2xl mx-auto flex flex-col items-center justify-center px-4 mt-8 sm:mt-0 z-10"
            out:fade={{ duration: 300 }}
        >
            <div
                class="bg-[#e8e8e8] border-[6px] border-[#333] rounded-lg shadow-[8px_8px_0_rgba(0,0,0,0.5)] p-6 sm:p-10 flex flex-col items-center text-center relative w-full"
                in:fly={{ y: 50, duration: 500 }}
            >
                <!-- Decorative Inner Border -->
                <div
                    class="absolute inset-1 border-[2px] border-[#333] rounded-sm pointer-events-none"
                ></div>

                <h1
                    class="retro-font text-4xl sm:text-5xl text-black font-bold mb-6 drop-shadow-md tracking-widest"
                >
                    SYSTEM ENCOUNTER
                </h1>

                <div
                    class="bg-white border-[4px] border-[#333] p-4 w-full text-left mb-8 shadow-inner"
                >
                    <h3
                        class="retro-font text-2xl text-blue-700 font-bold mb-3 border-b-2 border-gray-300 pb-1"
                    >
                        HOW TO PLAY:
                    </h3>

                    <ul
                        class="retro-font text-lg sm:text-2xl text-black space-y-4 leading-snug"
                    >
                        <li class="flex gap-2">
                            <span>🎮</span>
                            <span
                                ><strong>Interact:</strong> Click the dialogue box
                                at the bottom to advance the conversation.</span
                            >
                        </li>
                        <li class="flex gap-2">
                            <span>⚔️</span>
                            <span
                                ><strong>Respond:</strong> When prompted, click 'RESPOND'
                                to ask technical questions.</span
                            >
                        </li>
                        <li class="flex gap-2">
                            <span>🎒</span>
                            <span
                                ><strong>Items:</strong> Unlocking good answers rewards
                                you with 'Key Items' in your Bag.</span
                            >
                        </li>
                        <li class="flex gap-2">
                            <span>🤝</span>
                            <span
                                ><strong>Goal:</strong> Whittle down his defenses
                                and offer him a job!</span
                            >
                        </li>
                    </ul>
                </div>

                <button
                    class="retro-font text-2xl sm:text-3xl text-white bg-red-600 border-[4px] border-[#333] px-8 py-3 rounded hover:bg-red-500 hover:-translate-y-1 transition-transform shadow-[4px_4px_0_rgba(0,0,0,0.8)] active:shadow-none active:translate-y-1 active:translate-x-1 font-bold tracking-widest"
                    on:click={startGame}
                >
                    START ENCOUNTER
                </button>
            </div>
        </div>
    {:else}
        <!-- ACTUAL GAME COMPONENT (Only mounts when gameStarted is true) -->
        <div in:fade={{ duration: 400, delay: 300 }} class="w-full">
            <BattleGame {personal} />
        </div>
    {/if}
</div>

<style>
    /* Scoped font class specifically for the Nav bar & Instructions */
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
