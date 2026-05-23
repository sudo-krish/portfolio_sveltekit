<script lang="ts">
    import { onMount } from "svelte";
    import { dialogueScript } from "./dialogue";

    import StartSplash from "./components/StartSplash.svelte";
    import GameDisplay from "./components/GameDisplay.svelte";
    import CaptureSplash from "./components/CaptureSplash.svelte";
    import DialogueBox from "./components/DialogueBox.svelte";
    import InventoryBag from "./components/InventoryBag.svelte";
    import MultiplayerLinks from "./components/MultiplayerLinks.svelte";

    import {
        initAudio,
        toggleMute,
        getMuted,
        playTextBlip,
        playSelect,
        playHit,
        playBlock,
        playItemUnlock,
        playCapture,
        playError,
        playMenuOpen,
        playBattleStart,
    } from "./soundManager";

    // Volume icon
    import { Volume2, VolumeX } from "lucide-svelte";

    export let personal: any;

    let battleState = "start_anim";
    let inventory = { skills: false, experience: false, lore: false };
    let audioInitialized = false;
    let muted = false;

    let currentNodeId = "start";
    $: currentNode = dialogueScript[currentNodeId] || { speaker: "System", text: displayedText };

    let displayedText = "";
    let isTyping = false;
    let typeInterval: ReturnType<typeof setInterval>;

    // Animation flags
    let isPlayerAttacking = false;
    let isEnemyDefending = false;
    let lastDamageAmount = 0;

    // Blip counter — only blip every Nth character to avoid ear fatigue
    let blipCounter = 0;
    const BLIP_EVERY = 3;

    function startTyping(text: string) {
        clearInterval(typeInterval);
        displayedText = "";
        isTyping = true;
        blipCounter = 0;
        let i = 0;

        typeInterval = setInterval(() => {
            if (i < text.length) {
                displayedText += text[i];

                // Play a text blip every BLIP_EVERY characters (skip spaces)
                if (audioInitialized && text[i] !== " ") {
                    blipCounter++;
                    if (blipCounter % BLIP_EVERY === 0) {
                        playTextBlip();
                    }
                }

                i++;
            } else {
                clearInterval(typeInterval);
                isTyping = false;
            }
        }, 20);
    }

    function handleBoxClick() {
        if (isTyping) {
            clearInterval(typeInterval);
            displayedText = currentNode.text;
            isTyping = false;
            if (audioInitialized) playSelect();
        } else if (
            currentNode.nextId &&
            (!currentNode.options || currentNode.options.length === 0)
        ) {
            if (currentNode.triggerCapture) {
                initiateCaptureSequence();
            } else {
                advanceNode(currentNode.nextId);
            }
        }
    }

    function advanceNode(nextId: string, unlock?: keyof typeof inventory) {
        if (unlock) {
            inventory[unlock] = true;
            inventory = { ...inventory };
        }

        currentNodeId = nextId;
        const nextNode = dialogueScript[nextId];

        // LOGIC: Determine if the attack causes damage
        if (unlock) {
            lastDamageAmount = 30;
        } else {
            lastDamageAmount = 0;
        }

        // Trigger Animations + Sound
        if (nextNode.triggerAttack) {
            isPlayerAttacking = true;
            if (audioInitialized) {
                if (lastDamageAmount > 0) {
                    playHit();
                } else {
                    playBlock();
                }
            }
            setTimeout(() => (isPlayerAttacking = false), 300);
        }
        if (nextNode.triggerDefend) {
            isEnemyDefending = true;
            setTimeout(() => (isEnemyDefending = false), 500);
        }

        // Item unlock chime (slightly delayed so the hit sound finishes first)
        if (unlock && audioInitialized) {
            setTimeout(() => playItemUnlock(), 400);
        }

        // Select sound for regular dialogue advancement
        if (!nextNode.triggerAttack && !nextNode.triggerDefend && audioInitialized) {
            playSelect();
        }

        startTyping(nextNode.text);
    }

    function initiateCaptureSequence() {
        battleState = "capture_animation";
        if (audioInitialized) playCapture();

        setTimeout(() => {
            battleState = "captured";
            displayedText =
                "Gotcha! SUDO KRISH was caught! Connect via the multiplayer options below.";
            currentNodeId = "__captured__";
            startTyping(displayedText);
        }, 3500);
    }

    function handleToggleMute() {
        muted = toggleMute();
    }

    onMount(() => {
        setTimeout(() => {
            battleState = "dialogue";
            // Initialize audio on the first real interaction frame
            // (the user already clicked START ENCOUNTER to get here)
            if (!audioInitialized) {
                initAudio();
                audioInitialized = true;
                playBattleStart();
            }
            startTyping(currentNode.text);
        }, 1200);

        return () => clearInterval(typeInterval);
    });
</script>

<div
    class="w-full max-w-4xl mx-auto flex flex-col items-center gap-4 px-4 pb-12 mt-4 sm:mt-8 relative"
>
    <!-- Mute/Unmute Toggle -->
    <button
        class="absolute -top-2 right-4 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-[#333]/80 border-2 border-[#555] text-white hover:bg-[#444] active:scale-90 transition-all shadow-lg"
        on:click={handleToggleMute}
        aria-label={muted ? "Unmute sound" : "Mute sound"}
        title={muted ? "Unmute" : "Mute"}
    >
        {#if muted}
            <VolumeX size={18} />
        {:else}
            <Volume2 size={18} />
        {/if}
    </button>

    <div
        class="relative w-full h-[350px] sm:h-[450px] bg-gradient-to-b from-[#e0f8d0] to-[#88c070] border-[6px] border-[#346856] rounded-lg shadow-xl overflow-hidden flex flex-col p-0 {isPlayerAttacking && lastDamageAmount > 0 ? 'animate-screen-shake' : ''}"
    >
        <StartSplash {battleState} />

        <GameDisplay
            {battleState}
            {isPlayerAttacking}
            {isEnemyDefending}
            {lastDamageAmount}
        />

        <CaptureSplash {battleState} />
    </div>

    <div class="w-full relative z-30">
        <DialogueBox
            {battleState}
            {currentNode}
            {displayedText}
            {isTyping}
            {handleBoxClick}
            {advanceNode}
        />
    </div>

    <InventoryBag {battleState} {inventory} />
    <MultiplayerLinks {personal} />
</div>

<style>
    .animate-screen-shake {
        animation: screenShake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    }
    @keyframes screenShake {
        10%, 90% { transform: translate3d(-2px, 0, 0); }
        20%, 80% { transform: translate3d(4px, 0, 0); }
        30%, 50%, 70% { transform: translate3d(-8px, 0, 0); }
        40%, 60% { transform: translate3d(8px, 0, 0); }
    }
</style>
