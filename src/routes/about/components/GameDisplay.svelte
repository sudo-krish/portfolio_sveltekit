<script lang="ts">
    import { fade } from "svelte/transition";
    export let battleState: string;
</script>

<!-- Animated subtle grid background -->
<div
    class="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none z-0"
></div>

<!-- ========================================== -->
<!-- ENEMY SECTION (Top Half)                   -->
<!-- ========================================== -->

<!-- Enemy HP Box (Top Left) -->
{#if battleState !== "captured"}
    <div
        class="absolute top-4 sm:top-6 left-2 sm:left-4 w-[60%] max-w-[300px] z-20 {battleState ===
        'start_anim'
            ? '-translate-x-[200%]'
            : 'translate-x-0 transition-transform duration-700 ease-out delay-100'}"
        out:fade
    >
        <!-- The classic slanted health box -->
        <div
            class="relative bg-[#f8f8f8] border-[4px] border-[#333] rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm p-2 sm:p-3 shadow-[4px_4px_0_rgba(0,0,0,0.2)] pb-3"
        >
            <!-- Inner background for contrast -->
            <div
                class="absolute inset-1 bg-[#e8e8e8] rounded-tl-lg rounded-br-lg -z-10"
            ></div>

            <div
                class="flex justify-between items-end mb-2 border-b-2 border-gray-400 pb-1 px-1"
            >
                <span
                    class="retro-font !text-black text-sm sm:text-lg uppercase tracking-widest font-bold"
                    >SUDO KRISH</span
                >
                <span
                    class="retro-font !text-black text-xs sm:text-sm tracking-widest"
                    >Lv99</span
                >
            </div>

            <!-- HP Bar Track -->
            <div class="flex items-center justify-end px-1">
                <div
                    class="bg-[#333] rounded px-1 py-px mr-2 shadow-[2px_2px_0_rgba(0,0,0,0.2)]"
                >
                    <span
                        class="retro-font text-yellow-500 text-[10px] sm:text-xs font-bold leading-none block pt-[2px]"
                        >HP</span
                    >
                </div>
                <div
                    class="w-[75%] bg-[#333] h-3 sm:h-4 rounded-full border-2 border-white p-[1px] shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] relative overflow-hidden"
                >
                    <div
                        class="h-full bg-gradient-to-b from-[#48d0b0] to-[#2ca080] rounded-full transition-all duration-[3s]"
                        style="width: {battleState === 'capture_animation'
                            ? '5%'
                            : '100%'}"
                    ></div>
                </div>
            </div>
        </div>
    </div>
{/if}

<!-- Enemy Sprite (Top Right) -->
<div
    class="absolute top-16 sm:top-20 right-6 sm:right-16 flex flex-col items-center z-10 {battleState ===
    'start_anim'
        ? 'translate-x-[200%]'
        : 'translate-x-0 transition-transform duration-700 ease-out'}"
>
    <!-- Elliptical Grass Base (Perspective Ground) -->
    <div
        class="absolute bottom-2 w-40 sm:w-48 h-12 sm:h-16 bg-[#72a05e] border-[3px] border-[#5a804a] rounded-[100%] shadow-[inset_0_-4px_0_rgba(0,0,0,0.2)] z-0 transform scale-y-75"
    ></div>

    <!-- Shadow under sprite -->
    <div
        class="absolute bottom-4 w-20 h-4 bg-black/30 rounded-[100%] z-0 blur-[2px]"
    ></div>

    {#if battleState === "dialogue" || battleState === "start_anim" || battleState === "capture_animation"}
        <img
            src="https://github.com/sudo-krish.png"
            alt="Sudo Krish"
            class="relative w-28 h-28 sm:w-36 sm:h-36 object-cover border-4 border-white shadow-[0_10px_20px_rgba(0,0,0,0.3)] z-10 rounded-sm {battleState ===
            'capture_animation'
                ? 'animate-suck-in'
                : ''}"
        />
    {/if}

    <!-- Bobble Animation (The Pokeball) -->
    {#if battleState === "capture_animation"}
        <div
            class="absolute bottom-4 z-20 flex items-center justify-center opacity-0 animate-bobble-routine"
        >
            <div
                class="relative w-8 h-8 rounded-full bg-white border-[3px] border-[#333] overflow-hidden flex flex-col shadow-[4px_4px_0_rgba(0,0,0,0.2)]"
            >
                <div
                    class="w-full h-1/2 bg-[#e3350d] border-b-[3px] border-[#333]"
                ></div>
                <div
                    class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white border-[2px] border-[#333] rounded-full flex items-center justify-center"
                >
                    <div
                        class="w-1.5 h-1.5 rounded-full animate-flash-light"
                    ></div>
                </div>
            </div>
        </div>
    {/if}

    <!-- Captured State (Ball resting on ground) -->
    {#if battleState === "captured"}
        <div class="absolute bottom-4 z-20 flex items-center justify-center">
            <div
                class="relative w-8 h-8 rounded-full bg-white border-[3px] border-[#333] overflow-hidden flex flex-col shadow-[4px_4px_0_rgba(0,0,0,0.2)] filter brightness-90"
            >
                <div
                    class="w-full h-1/2 bg-[#e3350d] border-b-[3px] border-[#333]"
                ></div>
                <div
                    class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white border-[2px] border-[#333] rounded-full flex items-center justify-center"
                >
                    <div class="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                </div>
            </div>
        </div>
    {/if}
</div>

<!-- ========================================== -->
<!-- PLAYER SECTION (Bottom Half)               -->
<!-- ========================================== -->

<!-- Player Sprite (Bottom Left) -->
<div
    class="absolute bottom-[100px] sm:bottom-[120px] left-4 sm:left-16 flex flex-col items-center z-10 {battleState ===
    'start_anim'
        ? '-translate-x-[200%]'
        : 'translate-x-0 transition-transform duration-700 ease-out'}"
>
    <!-- Elliptical Grass Base (Perspective Ground) -->
    <div
        class="absolute -bottom-2 w-48 sm:w-64 h-16 sm:h-20 bg-[#72a05e] border-[3px] border-[#5a804a] rounded-[100%] shadow-[inset_0_-4px_0_rgba(0,0,0,0.2)] z-0 transform scale-y-75"
    ></div>

    <!-- Shadow under sprite -->
    <div
        class="absolute bottom-2 w-24 h-6 bg-black/30 rounded-[100%] z-0 blur-[2px]"
    ></div>

    <div
        class="relative w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-tr from-[#2a5242] to-[#346856] border-[4px] border-[#e0f8d0] shadow-[0_10px_20px_rgba(0,0,0,0.3)] flex items-center justify-center z-10 rounded-lg overflow-hidden"
    >
        <div
            class="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:10px_10px]"
        ></div>
        <span
            class="retro-font text-white/90 text-2xl font-bold tracking-widest relative z-10 drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)]"
            >YOU</span
        >
    </div>
</div>

<!-- Player HP Box (Bottom Right) -->
<div
    class="absolute bottom-4 sm:bottom-8 right-2 sm:right-4 w-[60%] max-w-[320px] z-30 {battleState ===
    'start_anim'
        ? 'translate-x-[200%]'
        : 'translate-x-0 transition-transform duration-700 ease-out delay-100'}"
>
    <!-- The classic slanted health box -->
    <div
        class="relative bg-[#f8f8f8] border-[4px] border-[#333] rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm p-2 sm:p-3 shadow-[4px_4px_0_rgba(0,0,0,0.2)] pb-2"
    >
        <!-- Inner background for contrast -->
        <div
            class="absolute inset-1 bg-[#e8e8e8] rounded-tl-lg rounded-br-lg -z-10"
        ></div>

        <div
            class="flex justify-between items-end mb-2 border-b-2 border-gray-400 pb-1 px-1"
        >
            <span
                class="retro-font !text-black text-sm sm:text-lg uppercase tracking-widest font-bold"
                >GUEST</span
            >
            <span
                class="retro-font !text-black text-xs sm:text-sm tracking-widest"
                >Lv01</span
            >
        </div>

        <!-- HP Bar Track -->
        <div class="flex items-center justify-end px-1 mb-1">
            <div
                class="bg-[#333] rounded px-1 py-px mr-2 shadow-[2px_2px_0_rgba(0,0,0,0.2)]"
            >
                <span
                    class="retro-font text-yellow-500 text-[10px] sm:text-xs font-bold leading-none block pt-[2px]"
                    >HP</span
                >
            </div>
            <div
                class="w-[75%] bg-[#333] h-3 sm:h-4 rounded-full border-2 border-white p-[1px] shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] relative overflow-hidden"
            >
                <div
                    class="w-full h-full bg-gradient-to-b from-[#48d0b0] to-[#2ca080] rounded-full"
                ></div>
            </div>
        </div>

        <!-- Numeric HP display (Exclusive to the player in Pokémon games) -->
        <div class="flex justify-end px-2">
            <span
                class="retro-font !text-black text-xs sm:text-sm tracking-widest font-bold"
            >
                100/100
            </span>
        </div>
    </div>
</div>

<style>
    .retro-font {
        font-family: "VT323", monospace, "Courier New", Courier;
        letter-spacing: 0.05em;
    }

    /* Capture Animations remain exactly the same */
    .animate-suck-in {
        animation: suckIntoBall 0.5s ease-in-out 0.9s forwards;
    }
    @keyframes suckIntoBall {
        0% {
            filter: contrast(1) sepia(0);
            transform: scale(1);
            opacity: 1;
        }
        20% {
            filter: contrast(0) sepia(1) hue-rotate(320deg) saturate(100)
                brightness(2) drop-shadow(0 0 10px #ff0055);
            transform: scale(1);
            opacity: 1;
        }
        100% {
            filter: contrast(0) sepia(1) hue-rotate(320deg) saturate(100)
                brightness(2) drop-shadow(0 0 10px #ff0055);
            transform: scaleX(0.1) scaleY(1.5) translateY(50px);
            opacity: 0;
        }
    }

    .animate-bobble-routine {
        animation: bobbleRoutine 2.1s 1.4s forwards;
    }
    @keyframes bobbleRoutine {
        0% {
            opacity: 0;
            transform: translateY(-40px);
        }
        1% {
            opacity: 1;
            transform: translateY(-40px);
            animation-timing-function: ease-in;
        }
        10% {
            opacity: 1;
            transform: translateY(0);
            animation-timing-function: ease-out;
        }
        20% {
            opacity: 1;
            transform: translateY(-15px);
            animation-timing-function: ease-in;
        }
        30% {
            opacity: 1;
            transform: translateY(0);
        }
        40% {
            opacity: 1;
            transform: translateY(0);
        }
        45% {
            transform: rotate(-15deg);
        }
        50% {
            transform: rotate(15deg);
        }
        55% {
            transform: rotate(0deg);
        }
        70% {
            transform: rotate(-15deg);
        }
        75% {
            transform: rotate(15deg);
        }
        80% {
            transform: rotate(0deg);
        }
        95%,
        100% {
            opacity: 1;
            transform: rotate(0deg);
            filter: brightness(0.8);
        }
    }

    .animate-flash-light {
        animation: flashLight 0.5s infinite;
    }
    @keyframes flashLight {
        0%,
        100% {
            background-color: #ff0000;
            box-shadow: 0 0 8px red;
        }
        50% {
            background-color: #550000;
            box-shadow: none;
        }
    }
</style>
