<script lang="ts">
    import { fade } from "svelte/transition";
    export let battleState: string;
</script>

{#if battleState === "start_anim"}
    <!-- Full Screen Overlay -->
    <div
        class="absolute inset-0 z-50 overflow-hidden bg-[#111]"
        out:fade={{ duration: 300, delay: 100 }}
    >
        <!-- 1. Intense White Flashing Overlay (Mimics the classic gameboy battle flash) -->
        <div
            class="absolute inset-0 bg-white z-10 pointer-events-none animate-battle-flash"
        ></div>

        <!-- 2. Anime-style Speed Lines Background -->
        <div
            class="absolute inset-0 z-20 opacity-20 speed-lines pointer-events-none"
        ></div>

        <!-- 3. Cinematic Focus Band that slams shut -->
        <div class="absolute inset-0 z-30 flex items-center justify-center">
            <div
                class="w-full h-32 sm:h-48 bg-black border-y-[6px] border-white flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.9)] relative overflow-hidden animate-slam-band"
            >
                <!-- Danger / Warning Scrolling Stripes -->
                <div
                    class="absolute inset-0 opacity-20 danger-stripes animate-scroll-stripes"
                ></div>

                <!-- 4. Text Container -->
                <div
                    class="relative z-40 flex items-center gap-4 sm:gap-6 animate-text-pop text-container"
                >
                    <!-- Decorative Exclamation Marks -->
                    <div
                        class="hidden sm:flex flex-col gap-1 items-center justify-center"
                    >
                        <div class="w-4 h-12 bg-red-500 skew-x-[-15deg]"></div>
                        <div class="w-4 h-4 bg-red-500 skew-x-[-15deg]"></div>
                    </div>

                    <!-- Main Glitching Text -->
                    <span
                        class="retro-font text-white text-4xl sm:text-6xl md:text-7xl uppercase italic tracking-widest font-bold text-glitch"
                    >
                        WILD ENCOUNTER!
                    </span>

                    <div
                        class="hidden sm:flex flex-col gap-1 items-center justify-center"
                    >
                        <div class="w-4 h-12 bg-red-500 skew-x-[-15deg]"></div>
                        <div class="w-4 h-4 bg-red-500 skew-x-[-15deg]"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
{/if}

<style>
    /* Base Font */
    .retro-font {
        font-family: "VT323", monospace, "Courier New", Courier;
        letter-spacing: 0.05em;
    }

    /* --- ANIMATION KEYFRAMES --- */

    /* 1. Classic Gameboy Flash: Rapidly turns the screen white and black */
    .animate-battle-flash {
        animation: battleFlash 0.5s ease-in-out;
    }
    @keyframes battleFlash {
        0%,
        100% {
            opacity: 0;
        }
        20%,
        60% {
            opacity: 1;
        }
        40%,
        80% {
            opacity: 0;
        }
    }

    /* 2. Anime Speed Lines: Diagonal repeating gradient that slides infinitely */
    .speed-lines {
        background: repeating-linear-gradient(
            90deg,
            transparent,
            transparent 2px,
            white 2px,
            white 8px
        );
        transform: scale(2) rotate(15deg);
        animation: slideLines 0.3s linear infinite;
    }
    @keyframes slideLines {
        from {
            background-position: 0 0;
        }
        to {
            background-position: 50px 0;
        }
    }

    /* 3. The Cinematic Band slams open/shut from the middle */
    .animate-slam-band {
        transform-origin: center;
        animation: slamBand 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
            forwards;
    }
    @keyframes slamBand {
        0% {
            transform: scaleY(0);
        }
        100% {
            transform: scaleY(1);
        }
    }

    /* Danger Stripes inside the band */
    .danger-stripes {
        background: repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 20px,
            #fff 20px,
            #fff 40px
        );
    }
    .animate-scroll-stripes {
        animation: scrollStripes 0.8s linear infinite;
    }
    @keyframes scrollStripes {
        from {
            background-position: 0 0;
        }
        to {
            background-position: 56.5px 0;
        } /* Matches diagonal length of 40px */
    }

    /* 4. Text Pop & Glitch Effects */
    .text-container {
        transform: rotate(-5deg); /* Aggressive angled look */
    }

    .animate-text-pop {
        animation: textPop 0.4s 0.1s cubic-bezier(0.175, 0.885, 0.32, 1.5) both;
    }
    @keyframes textPop {
        0% {
            transform: scale(0);
            opacity: 0;
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }

    /* High energy chromatic aberration / glitch effect */
    .text-glitch {
        text-shadow:
            4px 4px 0 #ff0055,
            -4px -4px 0 #00e5ff;
        animation: textShake 0.1s linear infinite 0.5s;
    }
    @keyframes textShake {
        0%,
        100% {
            transform: translate(0, 0);
        }
        25% {
            transform: translate(2px, 1px);
        }
        50% {
            transform: translate(-1px, -2px);
            text-shadow:
                -4px 4px 0 #ff0055,
                4px -4px 0 #00e5ff;
        }
        75% {
            transform: translate(-2px, 1px);
        }
    }
</style>
