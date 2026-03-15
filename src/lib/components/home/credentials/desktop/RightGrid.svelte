<!-- src/lib/components/home/credentials/desktop/RightGrid.svelte -->
<script lang="ts">
    import {
        Award,
        BookOpen,
        CheckCircle,
        Shield,
        X,
        ExternalLink,
    } from "lucide-svelte";
    import { certificatesData } from "$lib/data/certificates";
    import { fade, scale } from "svelte/transition";

    import DraggableRow from "./MarqueeScroller.svelte"; // NEW

    let selectedItem: any = null;
    let modalType: "cert" | "paper" = "cert";

    function openModal(item: any, type: "cert" | "paper") {
        selectedItem = item;
        modalType = type;
    }

    function closeModal() {
        selectedItem = null;
    }
</script>

<!-- Increased max-width to 1000px as requested -->
<div class="w-full flex flex-col relative z-10" style="gap: 0.5cqi; padding-top: 1cqi;">
    <!-- OVERVIEW SEO CARD -->
    <div
        class="group relative flex flex-col rounded-[2rem] bg-gradient-to-br from-foreground/[0.06] to-foreground/[0.01] backdrop-blur-[60px] border border-foreground/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden"
        style="padding: 1.5cqi; margin-bottom: 0.4cqi;"
    >
        <div
            class="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-foreground/40 to-transparent opacity-60"
        ></div>
        <div
            class="absolute -right-20 -top-20 w-96 h-96 rounded-full blur-[100px] opacity-10 pointer-events-none bg-orange-500"
        ></div>

        <div class="relative z-10 flex flex-col" style="gap: 0.8cqi;">
            <div class="flex items-center" style="gap: 0.8cqi;">
                <div
                    class="flex items-center justify-center w-12 h-12 rounded-2xl bg-card/60 border border-foreground/10 text-orange-400"
                >
                    <Shield size={24} />
                </div>
                <div class="flex flex-col">
                    <span
                        class="text-[clamp(20px,1.8vw,26px)] font-black text-foreground leading-tight tracking-tight"
                    >
                        {certificatesData.overview.title}
                    </span>
                    <span
                        class="font-mono text-orange-400 uppercase tracking-[0.2em]"
                        style="font-size: clamp(8px, 0.7cqi, 12px); margin-top: 0.3cqi;"
                    >
                        {certificatesData.overview.subtitle}
                    </span>
                </div>
            </div>
            <p
                class="text-[clamp(0.95rem,1vw,1.1rem)] leading-[1.8] text-foreground/70 font-light max-w-[95%]"
            >
                {@html certificatesData.overview.description}
            </p>
        </div>
    </div>

    <!-- CERTIFICATES HORIZONTAL DRAG ROW -->
    <div class="flex flex-col w-full" style="margin-top: 1cqi;">
        <!-- PREMIUM MARQUEE: CERTIFICATES (Scrolls Left) -->
        <DraggableRow
            title="Verified Certifications"
            items={certificatesData.list}
            icon={Award}
            direction="left"
            variant="cert"
            onSelect={(item) => openModal(item, "cert")}
        />

        <!-- PREMIUM MARQUEE: RESEARCH PAPERS (Scrolls Right) -->
        <DraggableRow
            title="Peer-Reviewed Publications"
            items={certificatesData.papers}
            icon={BookOpen}
            direction="right"
            variant="paper"
            onSelect={(item) => openModal(item, "paper")}
        />
    </div>

    <!-- ENHANCED MODAL POPUP -->
    {#if selectedItem}
        <div
            transition:fade={{ duration: 200 }}
            class="fixed inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-md p-4"
            on:click={closeModal}
        >
            <div
                transition:scale={{ duration: 300, start: 0.95, opacity: 0 }}
                on:click|stopPropagation
                class="relative w-full max-w-[550px] flex flex-col p-8 rounded-[2rem] bg-[#0c0c0c] border border-foreground/15 shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden"
            >
                <div
                    class="absolute -top-32 -right-32 w-80 h-80 rounded-full blur-[100px] opacity-20 pointer-events-none"
                    style="background-color: {selectedItem.color}"
                ></div>

                <button
                    on:click={closeModal}
                    class="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-foreground/5 border border-foreground/10 hover:bg-foreground/15 text-foreground/50 hover:text-foreground transition-colors z-20"
                >
                    <X size={18} />
                </button>

                <div class="relative z-10 flex flex-col">
                    <div
                        class="flex items-start gap-5 mb-6 border-b border-foreground/[0.08] pb-6"
                    >
                        <div
                            class="w-16 h-16 shrink-0 flex items-center justify-center rounded-2xl border shadow-inner"
                            style="background-color: {selectedItem.color}15; border-color: {selectedItem.color}40;"
                        >
                            <svelte:component
                                this={modalType === "cert" ? Award : BookOpen}
                                size={32}
                                style="color: {selectedItem.color}"
                            />
                        </div>
                        <div class="flex flex-col gap-1.5 pr-8 pt-1">
                            <h3
                                class="text-xl sm:text-2xl font-black text-foreground leading-tight"
                            >
                                {selectedItem.name}
                            </h3>
                            <div
                                class="flex flex-wrap items-center gap-2 font-mono text-[10px] sm:text-xs text-foreground/50 uppercase tracking-widest mt-1"
                            >
                                <span style="color: {selectedItem.color}"
                                    >{selectedItem.issuer}</span
                                >
                                <span class="hidden sm:inline">·</span>
                                <span>{selectedItem.date}</span>
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-col mb-8">
                        <h4
                            class="text-[10px] font-mono uppercase tracking-[0.2em] mb-3 font-bold"
                            style="color: {selectedItem.color}"
                        >
                            {modalType === "cert"
                                ? "Impact & Learning"
                                : "Abstract & Impact"}
                        </h4>
                        <p
                            class="text-[1rem] leading-[1.8] text-foreground/80 font-light"
                        >
                            {@html selectedItem.impact}
                        </p>
                    </div>

                    <div class="flex items-center justify-between mt-auto pt-4">
                        <div
                            class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 w-max"
                        >
                            <CheckCircle size={12} class="text-green-400" />
                            <span
                                class="text-[10px] font-bold text-green-400 tracking-widest uppercase"
                            >
                                {modalType === "cert"
                                    ? "Verified Credential"
                                    : "Verified Publication"}
                            </span>
                        </div>

                        {#if selectedItem.url && selectedItem.url !== "#"}
                            <a
                                href={selectedItem.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                class="flex items-center gap-2 text-xs font-bold text-foreground hover:text-foreground/70 transition-colors group"
                            >
                                View Original
                                <ExternalLink
                                    size={14}
                                    class="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                                />
                            </a>
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    {/if}
</div>
