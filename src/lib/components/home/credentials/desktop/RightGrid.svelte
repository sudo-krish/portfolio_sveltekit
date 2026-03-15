<!-- src/lib/components/home/credentials/desktop/RightGrid.svelte -->
<script lang="ts">
    import {
        Award,
        BookOpen,
        Shield,
    } from "lucide-svelte";
    import { certificatesData } from "$lib/data/certificates";
    import DraggableRow from "./MarqueeScroller.svelte";
    import Modal from "$lib/components/ui/modal/Modal.svelte";

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

    <!-- CREDENTIAL DETAIL MODAL -->
    <Modal item={selectedItem} type={modalType} onclose={closeModal} />
</div>
