<script lang="ts">
    import { scale, fade, fly } from "svelte/transition";
    import { Backpack, Code2, Trophy, Gamepad2, X } from "lucide-svelte";

    export let battleState: string;
    export let inventory: {
        skills: boolean;
        experience: boolean;
        lore: boolean;
    };

    // State to track which item in the bag is currently "selected/hovered"
    let selectedItem: "skills" | "experience" | "lore" | null = null;

    // State to track the currently opened modal item
    let modalItem: "skills" | "experience" | "lore" | null = null;

    // Default to the first unlocked item if nothing is hovered
    $: displayItem =
        selectedItem ||
        (inventory.skills
            ? "skills"
            : inventory.experience
              ? "experience"
              : inventory.lore
                ? "lore"
                : null);

    // Data dictionary: 'brief' is shown on the bottom left, 'details' is shown in the pop-up
    const itemData = {
        skills: {
            title: "TECH_STACK",
            brief: "A collection of tools used for building data pipelines and wrangling databases.",
            details: [
                "Python (Pandas, PySpark, FastAPI)",
                "SQL (PostgreSQL, MySQL, Snowflake)",
                "Cloud (AWS S3, EC2, Redshift)",
                "Kafka & Distributed Systems",
            ],
            icon: Code2,
            color: "blue",
        },
        experience: {
            title: "EXP_SHARE",
            brief: "A record of past battles fought. Contains knowledge of query optimization.",
            details: [
                "Senior Data Engineer @ Tech Corp",
                "Processed 50M+ events per day",
                "Reduced query times from hours to seconds",
                "Built automated CI/CD data pipelines",
            ],
            icon: Trophy,
            color: "yellow",
        },
        lore: {
            title: "DEV_QUIRKS",
            brief: "Personal quirks. Warning: Do not operate without sufficient caffeine levels.",
            details: [
                "Requires coffee to compile code",
                "Considers 'It works on my machine' an insult",
                "Reads documentation for fun",
                "Hates poorly formatted logs",
            ],
            icon: Gamepad2,
            color: "purple",
        },
    };

    const inventoryItems: Array<"skills" | "experience" | "lore"> = [
        "skills",
        "experience",
        "lore",
    ];

    function openModal(item: "skills" | "experience" | "lore") {
        if (inventory[item]) {
            modalItem = item;
        }
    }

    function closeModal() {
        modalItem = null;
    }
</script>

<div
    class="w-full mt-6 {battleState === 'start_anim'
        ? 'opacity-0'
        : 'opacity-100 transition-opacity duration-1000 delay-500'}"
>
    <!-- Bag Header -->
    <div class="flex items-center gap-3 mb-2 px-2">
        <div
            class="w-8 h-8 bg-muted-foreground text-background rounded flex items-center justify-center border-2 border-[#333] shadow-[2px_2px_0_#333]"
        >
            <Backpack size={20} class="text-foreground" />
        </div>
        <h2
            class="retro-font text-foreground text-2xl drop-shadow-[2px_2px_0_#000] tracking-wider"
        >
            KEY ITEMS
        </h2>
    </div>

    <!-- Main Bag UI Container -->
    <div
        class="w-full bg-[#f8f8f8] border-[6px] border-[#333] rounded-lg p-2 sm:p-4 shadow-[0_8px_0_rgba(0,0,0,0.4)] flex flex-col md:flex-row gap-4 relative overflow-hidden"
    >
        <!-- Subtle checkered background pattern common in Gen 3/4 bags -->
        <div
            class="absolute inset-0 bg-[linear-gradient(45deg,rgba(0,0,0,0.02)_25%,transparent_25%,transparent_75%,rgba(0,0,0,0.02)_75%,rgba(0,0,0,0.02)),linear-gradient(45deg,rgba(0,0,0,0.02)_25%,transparent_25%,transparent_75%,rgba(0,0,0,0.02)_75%,rgba(0,0,0,0.02))] bg-[length:20px_20px] bg-[position:0_0,10px_10px] pointer-events-none"
        ></div>

        <!-- LEFT SIDE: Item Preview Window -->
        <div class="w-full md:w-1/3 flex flex-col gap-3 z-10">
            <!-- Icon Box -->
            <div
                class="w-full aspect-square md:aspect-auto md:h-32 bg-[#e0f8d0] border-[4px] border-[#4a8a70] rounded shadow-[inset_0_4px_8px_rgba(0,0,0,0.1)] flex items-center justify-center relative"
            >
                {#if displayItem && inventory[displayItem]}
                    <div in:scale class="flex flex-col items-center">
                        <svelte:component
                            this={itemData[displayItem].icon}
                            size={48}
                            class="text-{itemData[displayItem]
                                .color}-600 drop-shadow-md"
                        />
                    </div>
                {:else}
                    <span class="retro-font text-foreground text-4xl opacity-30"
                        >?</span
                    >
                {/if}
            </div>

            <!-- Brief Description Box -->
            <div
                class="w-full flex-1 min-h-[100px] bg-white border-[4px] border-[#555] rounded p-3 shadow-[2px_2px_0_#ccc]"
            >
                {#if displayItem && inventory[displayItem]}
                    <p
                        class="retro-font !text-black text-lg leading-snug"
                        in:fade
                    >
                        {itemData[displayItem].brief}
                    </p>
                {:else}
                    <p class="retro-font text-muted-foreground text-lg leading-snug">
                        Select an item from the bag to view its details.
                    </p>
                {/if}
            </div>
        </div>

        <!-- RIGHT SIDE: The Scrollable Item List -->
        <div
            class="w-full md:w-2/3 bg-white border-[4px] border-[#555] rounded p-2 shadow-[2px_2px_0_#ccc] flex flex-col gap-1 z-10 h-[240px] md:h-auto overflow-y-auto custom-scrollbar"
        >
            {#each inventoryItems as item}
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <div
                    class="w-full p-2 flex items-center justify-between border-b-2 border-dashed border-border transition-colors {inventory[
                        item
                    ]
                        ? 'cursor-pointer'
                        : 'cursor-not-allowed'} {displayItem === item
                        ? `bg-${itemData[item].color}-100`
                        : 'hover:bg-gray-100'}"
                    on:mouseenter={() => (selectedItem = item)}
                    on:mouseleave={() => (selectedItem = null)}
                    on:click={() => openModal(item)}
                >
                    <div class="flex items-center gap-3">
                        <div
                            class="w-8 h-8 rounded bg-{itemData[item]
                                .color}-200 border-2 border-{itemData[item]
                                .color}-400 flex items-center justify-center"
                        >
                            <svelte:component
                                this={itemData[item].icon}
                                size={16}
                                class="text-{itemData[item].color}-700"
                            />
                        </div>
                        <span
                            class="retro-font text-xl {inventory[item]
                                ? '!text-black'
                                : 'text-muted-foreground'}">{itemData[item].title}</span
                        >
                    </div>
                    {#if inventory[item]}
                        <span class="retro-font !text-black text-lg px-2"
                            >x01</span
                        >
                    {:else}
                        <span class="retro-font text-muted-foreground text-lg">???</span
                        >
                    {/if}
                </div>
            {/each}

            <!-- Empty Slot Filler -->
            <div
                class="w-full p-2 flex items-center justify-between border-b-2 border-dashed border-border opacity-50"
            >
                <span class="retro-font text-muted-foreground text-xl pl-11"
                    >CANCEL</span
                >
            </div>
        </div>

        <!-- THE MODAL POP-UP OVERLAY FOR DETAILED INFO -->
        {#if modalItem}
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div
                class="absolute inset-0 bg-background/50 z-40 backdrop-blur-sm flex items-center justify-center p-4"
                transition:fade={{ duration: 150 }}
                on:click={closeModal}
            >
                <div
                    class="bg-white border-[6px] border-[#333] rounded-lg shadow-[8px_8px_0_rgba(0,0,0,0.8)] w-full max-w-sm flex flex-col"
                    on:click|stopPropagation
                    transition:fly={{ y: 20, duration: 250 }}
                >
                    <!-- Modal Header -->
                    <div
                        class="bg-secondary px-3 py-2 flex justify-between items-center text-foreground"
                    >
                        <div class="flex items-center gap-2">
                            <svelte:component
                                this={itemData[modalItem].icon}
                                size={18}
                                class="text-{itemData[modalItem].color}-400"
                            />
                            <span class="retro-font text-xl tracking-wider"
                                >{itemData[modalItem].title} DETAILS</span
                            >
                        </div>
                        <button
                            class="hover:text-muted-foreground transition-colors"
                            on:click={closeModal}
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <!-- Modal Content (Bulleted List) -->
                    <div class="p-6 flex flex-col gap-3 relative bg-[#f8f8f8]">
                        <div
                            class="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none"
                        ></div>

                        <div class="relative z-10 flex flex-col gap-2">
                            {#each itemData[modalItem].details as detail}
                                <div class="flex items-start gap-2">
                                    <div
                                        class="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[10px] border-l-black mt-1 shrink-0"
                                    ></div>
                                    <span
                                        class="retro-font !text-black text-lg leading-snug"
                                        >{detail}</span
                                    >
                                </div>
                            {/each}
                        </div>
                    </div>
                </div>
            </div>
        {/if}
    </div>
</div>

<style>
    .retro-font {
        font-family: "VT323", monospace, "Courier New", Courier;
        letter-spacing: 0.05em;
    }

    .custom-scrollbar::-webkit-scrollbar {
        width: 12px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
        background: #e0e0e0;
        border-left: 2px solid #ccc;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
        background: #888;
        border: 2px solid #555;
        border-radius: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
</style>
