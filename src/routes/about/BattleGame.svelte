<script lang="ts">
    import { onMount } from "svelte";
    import { dialogueScript } from "./dialogue";

    import StartSplash from "./components/StartSplash.svelte";
    import GameDisplay from "./components/GameDisplay.svelte";
    import CaptureSplash from "./components/CaptureSplash.svelte";
    import DialogueBox from "./components/DialogueBox.svelte";
    import InventoryBag from "./components/InventoryBag.svelte";
    import MultiplayerLinks from "./components/MultiplayerLinks.svelte";

    export let personal: any;

    let battleState = "start_anim";
    let inventory = { skills: false, experience: false, lore: false };

    let currentNodeId = "start";
    $: currentNode = dialogueScript[currentNodeId];

    let displayedText = "";
    let isTyping = false;
    let typeInterval: ReturnType<typeof setInterval>;

    // Animation flags
    let isPlayerAttacking = false;
    let isEnemyDefending = false;
    let lastDamageAmount = 0; // NEW: Track how much damage the attack should do

    function startTyping(text: string) {
        clearInterval(typeInterval);
        displayedText = "";
        isTyping = true;
        let i = 0;

        typeInterval = setInterval(() => {
            if (i < text.length) {
                displayedText += text[i];
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

        // LOGIC: Determine if the attack causes damage (unlocking items = 30 dmg, normal questions = 0 blocked)
        if (unlock) {
            lastDamageAmount = 30; // 3 items * 30 = 90 damage total. Leaves 10 HP. Perfect!
        } else {
            lastDamageAmount = 0; // The witty questions are blocked/evaded!
        }

        // Trigger Animations
        if (nextNode.triggerAttack) {
            isPlayerAttacking = true;
            setTimeout(() => (isPlayerAttacking = false), 300);
        }
        if (nextNode.triggerDefend) {
            isEnemyDefending = true;
            setTimeout(() => (isEnemyDefending = false), 500);
        }

        startTyping(nextNode.text);
    }

    function initiateCaptureSequence() {
        battleState = "capture_animation";

        setTimeout(() => {
            battleState = "captured";
            displayedText =
                "Gotcha! SUDO KRISH was caught! Connect via the multiplayer options below.";
            currentNode = { speaker: "System", text: displayedText };
            startTyping(displayedText);
        }, 3500);
    }

    onMount(() => {
        setTimeout(() => {
            battleState = "dialogue";
            startTyping(currentNode.text);
        }, 1200);

        return () => clearInterval(typeInterval);
    });
</script>

<div
    class="w-full max-w-4xl mx-auto flex flex-col items-center gap-4 px-4 pb-12 mt-4 sm:mt-8"
>
    <div
        class="relative w-full h-[350px] sm:h-[450px] bg-gradient-to-b from-[#e0f8d0] to-[#88c070] border-[6px] border-[#346856] rounded-lg shadow-xl overflow-hidden flex flex-col p-0"
    >
        <StartSplash {battleState} />

        <!-- NEW: Pass lastDamageAmount down -->
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
