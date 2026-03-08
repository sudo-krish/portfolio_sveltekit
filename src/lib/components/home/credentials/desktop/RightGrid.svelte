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
<div class="w-full max-w-[1000px] flex flex-col gap-2 relative z-10 pt-4">
    <!-- OVERVIEW SEO CARD -->
    <div
        class="group relative flex flex-col p-6 2xl:p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.06] to-white/[0.01] backdrop-blur-[60px] border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden mb-2"
    >
        <div
            class="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-60"
        ></div>
        <div
            class="absolute -right-20 -top-20 w-96 h-96 rounded-full blur-[100px] opacity-10 pointer-events-none bg-orange-500"
        ></div>

        <div class="relative z-10 flex flex-col gap-4">
            <div class="flex items-center gap-4">
                <div
                    class="flex items-center justify-center w-12 h-12 rounded-2xl bg-black/20 border border-white/10 text-orange-400"
                >
                    <Shield size={24} />
                </div>
                <div class="flex flex-col">
                    <span
                        class="text-[clamp(20px,1.8vw,26px)] font-black text-white leading-tight tracking-tight"
                    >
                        {certificatesData.overview.title}
                    </span>
                    <span
                        class="text-[11px] 2xl:text-xs font-mono text-orange-400 uppercase tracking-[0.2em] mt-0.5"
                    >
                        {certificatesData.overview.subtitle}
                    </span>
                </div>
            </div>
            <p
                class="text-[clamp(0.95rem,1vw,1.1rem)] leading-[1.8] text-white/70 font-light max-w-[95%]"
            >
                {@html certificatesData.overview.description}
            </p>
        </div>
    </div>

    <!-- CERTIFICATES HORIZONTAL DRAG ROW -->
    <div class="flex flex-col w-full mt-6">
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
            class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
            on:click={closeModal}
        >
            <div
                transition:scale={{ duration: 300, start: 0.95, opacity: 0 }}
                on:click|stopPropagation
                class="relative w-full max-w-[550px] flex flex-col p-8 rounded-[2rem] bg-[#0c0c0c] border border-white/15 shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden"
            >
                <div
                    class="absolute -top-32 -right-32 w-80 h-80 rounded-full blur-[100px] opacity-20 pointer-events-none"
                    style="background-color: {selectedItem.color}"
                ></div>

                <button
                    on:click={closeModal}
                    class="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/15 text-white/50 hover:text-white transition-colors z-20"
                >
                    <X size={18} />
                </button>

                <div class="relative z-10 flex flex-col">
                    <div
                        class="flex items-start gap-5 mb-6 border-b border-white/[0.08] pb-6"
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
                                class="text-xl sm:text-2xl font-black text-white leading-tight"
                            >
                                {selectedItem.name}
                            </h3>
                            <div
                                class="flex flex-wrap items-center gap-2 font-mono text-[10px] sm:text-xs text-white/50 uppercase tracking-widest mt-1"
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
                            class="text-[1rem] leading-[1.8] text-white/80 font-light"
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
                                class="flex items-center gap-2 text-xs font-bold text-white hover:text-white/70 transition-colors group"
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
