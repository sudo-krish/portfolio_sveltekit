<script lang="ts">
    import { onMount } from "svelte";
    import { dialogueScript } from "./dialogue";

    // Components
    import StartSplash from "./components/StartSplash.svelte";
    import GameDisplay from "./components/GameDisplay.svelte";
    import CaptureSplash from "./components/CaptureSplash.svelte";
    import DialogueBox from "./components/DialogueBox.svelte";
    import InventoryBag from "./components/InventoryBag.svelte";
    import MultiplayerLinks from "./components/MultiplayerLinks.svelte";

    export let personal: any;

    // --- GAME STATE ---
    let battleState = "start_anim";
    let inventory = { skills: false, experience: false, lore: false };

    let currentNodeId = "start";
    $: currentNode = dialogueScript[currentNodeId];

    let displayedText = "";
    let isTyping = false;
    let typeInterval: ReturnType<typeof setInterval>;

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
            inventory = { ...inventory }; // Trigger reactivity
        }
        currentNodeId = nextId;
        startTyping(dialogueScript[nextId].text);
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
        // Longer timeout allows the new StartSplash to fully shine before slide-ins
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
    <!-- 1. The Main "Console" Window (Fixed height, isolated) -->
    <div
        class="relative w-full h-[350px] sm:h-[450px] bg-gradient-to-b from-[#e0f8d0] to-[#88c070] border-[6px] border-[#346856] rounded-lg shadow-xl overflow-hidden flex flex-col p-0"
    >
        <StartSplash {battleState} />
        <GameDisplay {battleState} />
        <CaptureSplash {battleState} />
    </div>

    <!-- 2. The Dialogue Box (Sits directly underneath, expands downward) -->
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

    <!-- 3. Below the Console Window (These will be naturally pushed down) -->
    <InventoryBag {battleState} {inventory} />
    <MultiplayerLinks {personal} />
</div>
