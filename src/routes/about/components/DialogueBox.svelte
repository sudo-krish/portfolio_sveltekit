<script lang="ts">
    export let battleState: string;
    export let currentNode: any;
    export let displayedText: string;
    export let isTyping: boolean;
    export let handleBoxClick: () => void;
    export let advanceNode: (
        nextId: string,
        unlock?: "skills" | "experience" | "lore",
    ) => void;

    // UI state to toggle the interview choices overlay
    let showInterviewOptions = false;

    function localHandleBoxClick() {
        if (isTyping) {
            handleBoxClick(); // Speed up typing
        } else if (currentNode.options && currentNode.options.length > 0) {
            // Do nothing if waiting for the player to select a choice
            return;
        } else {
            handleBoxClick(); // Proceed to next auto-dialogue
        }
    }
</script>

<div
    class="w-full relative z-30 min-h-[140px] sm:min-h-[160px] flex {battleState ===
    'start_anim'
        ? 'translate-y-full opacity-0'
        : 'translate-y-0 opacity-100 transition-all duration-500 delay-300'}"
>
    <!-- LEFT SIDE: The Dialogue Text Box -->
    <div
        class="relative w-full h-full bg-white border-[6px] border-[#333] rounded-lg shadow-[0_8px_0_rgba(0,0,0,0.2)] p-4 sm:p-6 cursor-pointer flex flex-col transition-all duration-300 {currentNode.options &&
        currentNode.options.length > 0 &&
        !showInterviewOptions
            ? 'w-full sm:w-[60%]'
            : 'w-full'}"
        on:click={localHandleBoxClick}
        role="button"
        tabindex="0"
        on:keydown={(e) => e.key === "Enter" && localHandleBoxClick()}
    >
        <div
            class="absolute inset-1 border-[2px] border-[#333] rounded-sm pointer-events-none"
        ></div>

        {#if currentNode.speaker !== "System"}
            <div
                class="absolute -top-5 left-6 bg-white border-[3px] border-[#333] px-3 py-1 rounded shadow-[2px_2px_0_rgba(0,0,0,0.5)] z-10"
            >
                <span class="retro-font !text-black text-sm uppercase"
                    >{currentNode.speaker}</span
                >
            </div>
        {/if}

        <p
            class="retro-font text-[1.3rem] sm:text-[1.6rem] leading-snug pt-2 px-1 pb-4 relative z-10 {currentNode.speaker ===
            'System'
                ? '!text-blue-700'
                : '!text-black'}"
        >
            {displayedText}
        </p>

        <!-- Blinking Arrow for Auto-advance Dialogue -->
        {#if !isTyping && (!currentNode.options || currentNode.options.length === 0)}
            <div
                class="absolute bottom-4 right-5 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[14px] border-t-red-600 animate-bounce z-10"
            ></div>
        {/if}
    </div>

    <!-- RIGHT SIDE: The 4-Button Command Menu (Appears only when it's the player's turn to act) -->
    {#if !isTyping && currentNode.options && currentNode.options.length > 0 && !showInterviewOptions}
        <div
            class="absolute bottom-0 right-0 w-[45%] sm:w-[40%] h-full bg-white border-[6px] border-[#333] rounded-lg shadow-[0_8px_0_rgba(0,0,0,0.2)] z-20"
        >
            <div
                class="absolute inset-1 border-[2px] border-[#333] rounded-sm pointer-events-none z-10"
            ></div>

            <div class="w-full h-full grid grid-cols-2 grid-rows-2 p-2">
                <button
                    class="group relative flex items-center justify-center retro-font !text-black text-xl hover:bg-gray-200 transition-colors"
                    on:click={() => (showInterviewOptions = true)}
                >
                    <div
                        class="absolute left-2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[10px] border-l-red-600 opacity-0 group-hover:opacity-100"
                    ></div>
                    RESPOND
                </button>

                <button
                    class="group relative flex items-center justify-center retro-font !text-black text-xl hover:bg-gray-200 transition-colors"
                    on:click={() =>
                        alert("Scroll down to view your KEY ITEMS in the BAG!")}
                >
                    <div
                        class="absolute left-2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[10px] border-l-red-600 opacity-0 group-hover:opacity-100"
                    ></div>
                    BAG
                </button>

                <button
                    class="group relative flex items-center justify-center retro-font text-blue-700 font-bold text-xl hover:bg-blue-100 transition-colors"
                    on:click={() => advanceNode("catch_attempt")}
                >
                    <div
                        class="absolute left-2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[10px] border-l-blue-600 opacity-0 group-hover:opacity-100"
                    ></div>
                    HIRE
                </button>

                <button
                    class="group relative flex items-center justify-center retro-font !text-black text-xl hover:bg-gray-200 transition-colors"
                    on:click={() => (window.location.href = "/")}
                >
                    <div
                        class="absolute left-2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[10px] border-l-red-600 opacity-0 group-hover:opacity-100"
                    ></div>
                    RUN
                </button>
            </div>
        </div>
    {/if}

    <!-- THE DYNAMIC CHOICES OVERLAY (Shows the specific options tied to this dialogue node) -->
    {#if showInterviewOptions}
        <div
            class="absolute bottom-0 left-0 right-0 h-full bg-white border-[6px] border-[#333] rounded-lg shadow-[0_8px_0_rgba(0,0,0,0.2)] z-40 p-2 sm:p-4 flex flex-col"
        >
            <div
                class="absolute inset-1 border-[2px] border-[#333] rounded-sm pointer-events-none z-10"
            ></div>

            <div
                class="w-full flex-1 flex flex-col gap-2 overflow-y-auto custom-scrollbar relative z-20 pl-2"
            >
                {#each currentNode.options as option}
                    <button
                        on:click={() => {
                            showInterviewOptions = false;
                            advanceNode(option.nextId, option.unlock);
                        }}
                        class="text-left retro-font !text-black text-[1.1rem] sm:text-[1.3rem] hover:bg-gray-200 outline-none flex items-center gap-2 group rounded relative py-1"
                    >
                        <div
                            class="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[10px] border-l-black opacity-0 group-hover:opacity-100 shrink-0"
                        ></div>
                        <span>"{option.text}"</span>
                    </button>
                {/each}
            </div>

            <!-- Back/Cancel Button -->
            <button
                class="absolute bottom-3 right-4 retro-font text-red-600 text-lg hover:underline z-30 font-bold"
                on:click={() => (showInterviewOptions = false)}
            >
                CANCEL
            </button>
        </div>
    {/if}
</div>

<style>
    .retro-font {
        font-family: "VT323", monospace, "Courier New", Courier;
        letter-spacing: 0.05em;
    }
    .custom-scrollbar::-webkit-scrollbar {
        width: 8px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
        background: #e0e0e0;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 4px;
    }
</style>
