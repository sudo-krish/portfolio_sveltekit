<script lang="ts">
    import { fade } from "svelte/transition";

    // EXPORTS
    export let battleState: string;
    export let isPlayerAttacking: boolean = false;
    export let isEnemyDefending: boolean = false;

    // NEW: Parent tells us how much damage the attack actually did
    export let lastDamageAmount: number = 0;

    // --- Local HP State ---
    let enemyHp = 100;
    let prevAttacking = false;

    // Reactively reduce HP when an attack lands
    $: {
        // If an attack just started...
        if (isPlayerAttacking && !prevAttacking) {
            // Only reduce HP if it wasn't fully defended/blocked (lastDamageAmount > 0)
            if (lastDamageAmount > 0) {
                enemyHp = Math.max(10, enemyHp - lastDamageAmount); // Keeps at least 10 HP so it never fully dies
            }
        }
        prevAttacking = isPlayerAttacking;
    }
</script>

<!-- Animated subtle grid background -->
<div
    class="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none z-0"
></div>

<!-- ========================================== -->
<!-- ENEMY SECTION (Top Half)                   -->
<!-- ========================================== -->

{#if battleState !== "captured"}
    <div
        class="absolute top-4 sm:top-6 left-2 sm:left-4 w-[60%] max-w-[300px] z-20 {battleState ===
        'start_anim'
            ? '-translate-x-[200%]'
            : 'translate-x-0 transition-transform duration-700 ease-out delay-100'}"
        out:fade
    >
        <div
            class="relative bg-[#f8f8f8] border-[4px] border-[#333] rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm p-2 sm:p-3 shadow-[4px_4px_0_rgba(0,0,0,0.2)] pb-3"
        >
            <div
                class="absolute inset-1 bg-[#e8e8e8] rounded-tl-lg rounded-br-lg -z-10"
            ></div>
            <div
                class="flex justify-between items-end mb-2 border-b-2 border-border pb-1 px-1"
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
            <div class="flex items-center justify-end px-1">
                <div
                    class="bg-[#333] rounded px-1 py-px mr-2 shadow-[2px_2px_0_rgba(0,0,0,0.2)]"
                >
                    <span
                        class="retro-font text-[#f8d030] text-[10px] sm:text-xs font-bold leading-none block pt-[2px]"
                        >HP</span
                    >
                </div>
                <div
                    class="w-[75%] bg-secondary h-3 sm:h-4 rounded-full border-2 border-white p-[1px] shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] relative overflow-hidden"
                >
                    <div
                        class="h-full {enemyHp > 50
                            ? 'bg-gradient-to-b from-[#48d0b0] to-[#2ca080]'
                            : enemyHp > 20
                              ? 'bg-gradient-to-b from-[#f8d030] to-[#d8a010]'
                              : 'bg-gradient-to-b from-[#f85830] to-[#d82010]'} rounded-full transition-all"
                        style="width: {battleState === 'capture_animation'
                            ? 5
                            : enemyHp}%; transition-duration: {battleState ===
                        'capture_animation'
                            ? '3s'
                            : '0.5s'}"
                    ></div>
                </div>
            </div>
        </div>
    </div>
{/if}

<div
    class="absolute top-16 sm:top-20 right-6 sm:right-16 flex flex-col items-center z-10 {battleState ===
    'start_anim'
        ? 'translate-x-[200%]'
        : 'translate-x-0 transition-transform duration-700 ease-out'}"
>
    <div
        class="absolute bottom-2 w-40 sm:w-48 h-12 sm:h-16 bg-[#72a05e] border-[3px] border-[#5a804a] rounded-[100%] shadow-[inset_0_-4px_0_rgba(0,0,0,0.2)] z-0 transform scale-y-75"
    ></div>
    

    {#if battleState === "dialogue" || battleState === "start_anim" || battleState === "capture_animation"}
        <div class="relative z-10 flex items-center justify-center">
            <img
                src="https://github.com/sudo-krish.png"
                alt="Sudo Krish - Data Engineer Pixel Sprite Portrait"
                class="relative w-28 h-28 sm:w-36 sm:h-36 object-cover border-4 border-white shadow-[0_10px_20px_rgba(0,0,0,0.3)] z-10 rounded-sm {battleState ===
                'capture_animation'
                    ? 'animate-suck-in'
                    : 'animate-idle-bob'} {isPlayerAttacking && lastDamageAmount > 0
                    ? 'animate-damage-blink'
                    : ''}"
            />

            <!-- Defend Shield Flash (Shown if damage is 0 / blocked) -->
            {#if isEnemyDefending || (isPlayerAttacking && lastDamageAmount === 0)}
                <div
                    class="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                >
                    <!-- Quick white flash over the sprite -->
                    <div
                        class="absolute inset-0 bg-white animate-block-flash rounded-sm"
                    ></div>
                    <!-- "BLOCKED!" text pops in with a slight recoil -->
                    <span
                        class="retro-font bg-[#3b82f6] text-white border-[2px] border-[#1e3a5f] px-3 py-1 rounded shadow-[3px_3px_0_rgba(0,0,0,0.5)] font-bold text-lg sm:text-xl relative z-30 drop-shadow-md tracking-widest animate-block-text-pop"
                        >{lastDamageAmount === 0 ? "BLOCKED!" : "GUARD!"}</span
                    >
                </div>
            {/if}

            <!-- Floating Damage Number: pops in big, then drifts up and fades -->
            {#if isPlayerAttacking && lastDamageAmount > 0}
                <div
                    class="absolute -right-2 -top-4 z-30 animate-dmg-pop pointer-events-none"
                >
                    <span
                        class="retro-font text-white font-bold text-2xl sm:text-3xl drop-shadow-[2px_2px_0_#000]"
                        style="text-shadow: 2px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000;"
                        >-{lastDamageAmount}</span
                    >
                </div>
            {/if}
        </div>
    {/if}

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

<div
    class="absolute bottom-[100px] sm:bottom-[120px] left-4 sm:left-16 flex flex-col items-center z-10 {battleState ===
    'start_anim'
        ? '-translate-x-[200%]'
        : 'translate-x-0 transition-transform duration-700 ease-out'}"
>
    <div
        class="absolute -bottom-2 w-48 sm:w-64 h-16 sm:h-20 bg-[#72a05e] border-[3px] border-[#5a804a] rounded-[100%] shadow-[inset_0_-4px_0_rgba(0,0,0,0.2)] z-0 transform scale-y-75"
    ></div>
    
    <div
        class="relative w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-tr from-[#2a5242] to-[#346856] border-[4px] border-[#e0f8d0] shadow-[0_10px_20px_rgba(0,0,0,0.3)] flex items-center justify-center z-10 rounded-lg overflow-hidden {isPlayerAttacking
            ? 'animate-tackle-lunge'
            : 'animate-idle-bob-player'} {isEnemyDefending && lastDamageAmount === 0
            ? 'animate-damage-blink'
            : ''}"
    >
        <div
            class="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:10px_10px]"
        ></div>
        <span
            class="retro-font text-foreground/80 text-2xl font-bold tracking-widest relative z-10 drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)]"
            >YOU</span
        >

        <!-- Counter Attack popup on Player if Who Are You is used -->
        {#if isEnemyDefending && lastDamageAmount === 0 && battleState !== "capture_animation"}
            <div
                class="absolute inset-0 flex items-center justify-center z-20 pointer-events-none delay-300"
            >
                <span
                    class="retro-font bg-[#f59e0b] text-[#333] border-[2px] border-[#333] px-1 py-0.5 rounded shadow-[2px_2px_0_rgba(0,0,0,0.3)] font-bold text-sm drop-shadow-md animate-bounce transform translate-y-8"
                    >CONFUSED!</span
                >
            </div>
        {/if}
    </div>
</div>

<div
    class="absolute bottom-4 sm:bottom-8 right-2 sm:right-4 w-[60%] max-w-[320px] z-30 {battleState ===
    'start_anim'
        ? 'translate-x-[200%]'
        : 'translate-x-0 transition-transform duration-700 ease-out delay-100'}"
>
    <div
        class="relative bg-[#f8f8f8] border-[4px] border-[#333] rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm p-2 sm:p-3 shadow-[4px_4px_0_rgba(0,0,0,0.2)] pb-2"
    >
        <div
            class="absolute inset-1 bg-[#e8e8e8] rounded-tl-lg rounded-br-lg -z-10"
        ></div>
        <div
            class="flex justify-between items-end mb-2 border-b-2 border-border pb-1 px-1"
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
        <div class="flex items-center justify-end px-1 mb-1">
            <div
                class="bg-[#333] rounded px-1 py-px mr-2 shadow-[2px_2px_0_rgba(0,0,0,0.2)]"
            >
                <span
                    class="retro-font text-[#f8d030] text-[10px] sm:text-xs font-bold leading-none block pt-[2px]"
                    >HP</span
                >
            </div>
            <div
                class="w-[75%] bg-secondary h-3 sm:h-4 rounded-full border-2 border-white p-[1px] shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] relative overflow-hidden"
            >
                <div
                    class="w-full h-full bg-gradient-to-b from-[#48d0b0] to-[#2ca080] rounded-full"
                ></div>
            </div>
        </div>
        <div class="flex justify-end px-2">
            <span
                class="retro-font !text-black text-xs sm:text-sm tracking-widest font-bold"
                >100/100</span
            >
        </div>
    </div>
</div>

<style>
    .retro-font {
        font-family: "VT323", monospace, "Courier New", Courier;
        letter-spacing: 0.05em;
    }

    /* Idle breathing bob for the enemy portrait */
    .animate-idle-bob {
        animation: idleBob 3s ease-in-out infinite;
    }
    @keyframes idleBob {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-6px); }
    }

    /* Idle breathing bob for the player sprite (slightly different timing) */
    .animate-idle-bob-player {
        animation: idleBobPlayer 3.5s ease-in-out infinite;
    }
    @keyframes idleBobPlayer {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-4px); }
    }

    /* === DAMAGE BLINK: Authentic Pokemon rapid opacity flicker === */
    .animate-damage-blink {
        animation: damageBlink 0.6s step-end;
    }
    @keyframes damageBlink {
        0%  { opacity: 1; }
        8%  { opacity: 0; }
        16% { opacity: 1; }
        24% { opacity: 0; }
        32% { opacity: 1; }
        40% { opacity: 0; }
        48% { opacity: 1; }
        56% { opacity: 0; }
        64% { opacity: 1; }
        72% { opacity: 0; }
        80% { opacity: 1; }
        100% { opacity: 1; }
    }

    /* === BLOCK FLASH: Quick white overlay flash on the sprite === */
    .animate-block-flash {
        animation: blockFlash 0.4s ease-out forwards;
    }
    @keyframes blockFlash {
        0% { opacity: 0.8; }
        30% { opacity: 0; }
        60% { opacity: 0.5; }
        100% { opacity: 0; }
    }

    /* === BLOCK TEXT POP: Text snaps in with a recoil bounce === */
    .animate-block-text-pop {
        animation: blockTextPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.4) both;
    }
    @keyframes blockTextPop {
        0% { transform: scale(0) translateY(-10px); opacity: 0; }
        50% { transform: scale(1.3) translateY(-12px); opacity: 1; }
        100% { transform: scale(1) translateY(-10px); opacity: 1; }
    }

    /* === DAMAGE NUMBER POP: Scales up big then drifts upward and fades === */
    .animate-dmg-pop {
        animation: dmgPop 1.2s ease-out forwards;
    }
    @keyframes dmgPop {
        0% { transform: scale(0.3) translateY(0); opacity: 0; }
        15% { transform: scale(1.4) translateY(-5px); opacity: 1; }
        30% { transform: scale(1) translateY(-10px); opacity: 1; }
        70% { opacity: 1; }
        100% { transform: scale(1) translateY(-50px); opacity: 0; }
    }



    /* === TACKLE LUNGE: Player sprite lunges forward toward the enemy === */
    .animate-tackle-lunge {
        animation: tackleLunge 0.3s ease-in-out;
    }
    @keyframes tackleLunge {
        0% { transform: translate(0, 0); }
        50% { transform: translate(30px, -20px) scale(1.1); }
        100% { transform: translate(0, 0); }
    }
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
        30%,
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
