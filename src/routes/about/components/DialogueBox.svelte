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
</script>

<div
    class="relative w-full min-h-[140px] bg-white border-[6px] border-[#333] rounded-lg shadow-[0_8px_0_rgba(0,0,0,0.2)] flex flex-col mt-4 {battleState ===
    'start_anim'
        ? 'opacity-0 translate-y-10'
        : 'opacity-100 translate-y-0 transition-all duration-500 delay-300'}"
>
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
        class="relative w-full flex-1 p-4 sm:p-6 cursor-pointer flex flex-col"
        on:click={handleBoxClick}
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

        <!-- Text naturally pushes the container height down -->
        <p
            class="retro-font text-[1.2rem] sm:text-[1.5rem] leading-snug pt-2 px-1 pb-4 relative z-10 {currentNode.speaker ===
            'System'
                ? '!text-blue-700'
                : '!text-black'}"
        >
            {displayedText}
        </p>

        {#if !isTyping && currentNode.nextId && (!currentNode.options || currentNode.options.length === 0)}
            <div
                class="absolute bottom-4 right-5 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[14px] border-t-red-600 animate-bounce z-10"
            ></div>
        {/if}
    </div>

    <!-- Options Menu -->
    {#if !isTyping && currentNode.options && currentNode.options.length > 0}
        <div
            class="absolute bottom-full right-2 mb-2 bg-white border-[4px] border-[#333] rounded-sm shadow-[4px_4px_0_rgba(0,0,0,0.5)] p-2 min-w-[200px] max-w-[90vw] flex flex-col gap-1 z-50"
        >
            <div
                class="absolute inset-1 border-[2px] border-[#333] rounded-sm pointer-events-none"
            ></div>
            {#each currentNode.options as option}
                <button
                    on:click|stopPropagation={() =>
                        advanceNode(option.nextId, option.unlock)}
                    class="text-left w-full retro-font !text-black text-sm sm:text-lg py-1 px-2 hover:bg-gray-200 focus:bg-gray-200 outline-none flex items-start gap-2 group transition-colors rounded relative z-10"
                >
                    <div
                        class="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[10px] border-l-black opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity mt-1 shrink-0"
                    ></div>
                    <span class="flex-1 leading-snug">{option.text}</span>
                </button>
            {/each}
        </div>
    {/if}
</div>

<style>
    .retro-font {
        font-family: "VT323", monospace, "Courier New", Courier;
        letter-spacing: 0.05em;
    }
</style>
