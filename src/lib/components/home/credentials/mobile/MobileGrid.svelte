<!-- src/lib/components/home/credentials/mobile/MobileGrid.svelte -->
<script lang="ts">
    import { slide } from "svelte/transition";
    import {
        Award,
        BookOpen,
        CheckCircle,
        ChevronDown,
        Shield,
        ExternalLink,
    } from "lucide-svelte";
    import { certificatesData } from "$lib/data/certificates";

    const allItems = [
        ...certificatesData.list.map((c) => ({
            ...c,
            type: "cert",
            icon: Award,
            linkText: "View Credential",
            metaLabel: "Impact & Learning",
        })),
        ...certificatesData.papers.map((p) => ({
            ...p,
            type: "paper",
            icon: BookOpen,
            linkText: "Read Research",
            metaLabel: "Impact & Abstract",
        })),
    ];

    let activeId: string | null = allItems[0]?.id || null;

    function toggleAccordion(id: string) {
        activeId = activeId === id ? null : id;
    }
</script>

<div class="w-full flex flex-col gap-3 relative z-10 mt-4">
    <!-- Top Meta Bar -->
    <div class="flex items-center justify-between px-1 w-full mb-1">
        <div
            class="flex items-center gap-1.5 text-[9px] text-foreground/30 font-mono uppercase tracking-widest"
        >
            <Shield size={10} class="text-orange-400" />
            <span>Globally Recognized</span>
        </div>
        <div
            class="flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20"
        >
            <CheckCircle size={9} class="text-green-400" />
            <span
                class="text-[8px] font-bold text-green-400 tracking-widest uppercase"
                >Verified</span
            >
        </div>
    </div>

    <!-- MAIN SCROLLABLE CONTAINER (Mobile sizing) -->
    <div
        class="group relative flex flex-col w-full rounded-[1.5rem] bg-gradient-to-br from-foreground/[0.04] to-foreground/[0.01] backdrop-blur-[40px] border border-foreground/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)] overflow-hidden"
    >
        <!-- Top internal highlight -->
        <div
            class="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-foreground/30 to-transparent opacity-60"
        ></div>
        <!-- Ambient Orange Glow -->
        <div
            class="absolute -right-10 -bottom-10 w-48 h-48 rounded-full blur-[60px] opacity-20 pointer-events-none bg-orange-500"
        ></div>

        <!-- Scrollable List Area -->
        <!-- Fixed max height for mobile so it fits on screen while allowing inner scrolling -->
        <div
            class="relative z-10 flex flex-col w-full max-h-[380px] overflow-y-auto no-scrollbar scroll-smooth p-2"
        >
            {#each allItems as item}
                <div
                    class="flex flex-col border-b border-foreground/[0.05] last:border-none"
                >
                    <!-- Accordion Header -->
                    <button
                        type="button"
                        class="flex items-center gap-3 w-full p-3 sm:p-4 hover:bg-foreground/[0.02] rounded-xl transition-colors duration-300 text-left cursor-pointer"
                        on:click={() => toggleAccordion(item.id)}
                    >
                        <!-- Icon Circle -->
                        <div
                            class="w-10 h-10 shrink-0 flex items-center justify-center rounded-xl border transition-all duration-300"
                            style="background-color: {activeId === item.id
                                ? `${item.color}20`
                                : 'rgba(0,0,0,0.3)'}; border-color: {activeId ===
                            item.id
                                ? `${item.color}30`
                                : 'rgba(255,255,255,0.1)'};"
                        >
                            <svelte:component
                                this={item.icon}
                                size={16}
                                style="color: {activeId === item.id
                                    ? item.color
                                    : 'rgba(255,255,255,0.4)'};"
                            />
                        </div>

                        <!-- Title and Meta -->
                        <div class="flex flex-col flex-1 min-w-0 pr-1">
                            <span
                                class="text-[12px] sm:text-[13px] font-bold text-foreground/90 truncate leading-tight"
                            >
                                {item.name}
                            </span>
                            <div class="flex items-center gap-1.5 mt-1">
                                <span
                                    class="text-[9px] font-mono truncate tracking-wider"
                                    style="color: {item.color}e6;"
                                    >{item.issuer}</span
                                >
                                <span class="text-[8px] text-foreground/30">·</span>
                                <span
                                    class="text-[9px] text-foreground/40 font-medium"
                                    >{item.date}</span
                                >
                            </div>
                        </div>

                        <!-- Caret Icon -->
                        <div
                            class="shrink-0 flex items-center justify-center w-5 h-5 rounded-full border transition-transform duration-300"
                            style="transform: {activeId === item.id
                                ? 'rotate(180deg)'
                                : 'rotate(0deg)'}; background-color: {activeId ===
                            item.id
                                ? `${item.color}20`
                                : 'rgba(255,255,255,0.05)'}; border-color: {activeId ===
                            item.id
                                ? `${item.color}30`
                                : 'rgba(255,255,255,0.05)'}; color: {activeId ===
                            item.id
                                ? item.color
                                : 'rgba(255,255,255,0.3)'};"
                        >
                            <ChevronDown size={10} />
                        </div>
                    </button>

                    <!-- Accordion Body -->
                    {#if activeId === item.id}
                        <div
                            transition:slide={{ duration: 300 }}
                            class="overflow-hidden"
                        >
                            <div class="pl-14 pr-3 pb-4 pt-1">
                                <div
                                    class="p-3 rounded-xl bg-card/80 border border-foreground/5 shadow-inner"
                                >
                                    <h4
                                        class="text-[8px] font-mono uppercase tracking-[0.2em] mb-1.5 font-bold"
                                        style="color: {item.color};"
                                    >
                                        {item.metaLabel}
                                    </h4>
                                    <p
                                        class="text-[10px] sm:text-[11px] leading-relaxed text-foreground/70 font-light"
                                    >
                                        {@html item.impact}
                                    </p>

                                    {#if item.url}
                                        <div class="mt-3 flex justify-end">
                                            <a
                                                href={item.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border hover:bg-foreground/5 transition-colors"
                                                style="border-color: {item.color}40;"
                                            >
                                                <span
                                                    class="text-[9px] font-bold uppercase tracking-wider"
                                                    style="color: {item.color};"
                                                >
                                                    {item.linkText}
                                                </span>
                                                <ExternalLink
                                                    size={10}
                                                    style="color: {item.color};"
                                                />
                                            </a>
                                        </div>
                                    {/if}
                                </div>
                            </div>
                        </div>
                    {/if}
                </div>
            {/each}
        </div>
    </div>
</div>
