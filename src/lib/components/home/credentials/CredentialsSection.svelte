<!-- src/lib/components/home/credentials/CredentialsSection.svelte -->
<script lang="ts">
    import { onMount } from "svelte";
    import { slide } from "svelte/transition";
    import gsap from "gsap";
    import GlowAccent from "$lib/components/ui/GlowAccent.svelte";
    import MobileCarousel from "$lib/components/ui/MobileCarousel.svelte";
    import { certificatesData } from "$lib/data/certificates";

    import SectionAnchor from "$lib/components/ui/anchors/SectionAnchor.svelte";
    import PillButton from "$lib/components/ui/buttons/PillButton.svelte";
    import { ArrowRight, Award, BookOpen, Shield, CheckCircle, ChevronDown, ExternalLink } from "lucide-svelte";
    
    import DraggableRow from "./MarqueeScroller.svelte";
    import Modal from "$lib/components/ui/modal/Modal.svelte";

    let leftPanel: HTMLElement;
    let rightPanel: HTMLElement;

    // Desktop State
    let selectedItem: any = null;
    let modalType: "cert" | "paper" = "cert";

    function openModal(item: any, type: "cert" | "paper") {
        selectedItem = item;
        modalType = type;
    }

    function closeModal() {
        selectedItem = null;
    }

    // Mobile State
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

    onMount(() => {
        let ctx = gsap.context(() => {
            if (leftPanel) {
                gsap.fromTo(
                    leftPanel.children,
                    { x: -30, opacity: 0 },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 1.0,
                        stagger: 0.15,
                        ease: "power3.out",
                        delay: 0.2,
                    },
                );
            }
            if (rightPanel) {
                gsap.fromTo(
                    rightPanel.children,
                    { y: 30, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1.2,
                        stagger: 0.15,
                        ease: "power3.out",
                        delay: 0.1,
                    },
                );
            }
        });
        return () => ctx.revert();
    });
</script>

{#snippet credentialsGrid(isMobile: boolean)}
    {#if isMobile}
        <div class="w-full flex flex-col gap-3 relative z-10 mt-4">
            <!-- Top Meta Bar -->
            <div class="flex items-center justify-between px-1 w-full mb-1">
                <div class="flex items-center gap-1.5 text-[9px] text-foreground/30 font-mono uppercase tracking-widest">
                    <Shield size={10} class="text-muted-foreground" />
                    <span>Globally Recognized</span>
                </div>
                <div class="flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                    <CheckCircle size={9} class="text-muted-foreground" />
                    <span class="text-[8px] font-bold text-muted-foreground tracking-widest uppercase">Verified</span>
                </div>
            </div>

            <!-- MAIN SCROLLABLE CONTAINER -->
            <div class="group relative flex flex-col w-full rounded-[1.5rem] bg-gradient-to-br from-foreground/[0.04] to-foreground/[0.01] backdrop-blur-[40px] border border-foreground/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.12)] overflow-hidden">
                <div class="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-foreground/30 to-transparent opacity-60"></div>
                <div class="absolute -right-10 -bottom-10 w-48 h-48 rounded-full blur-[60px] opacity-20 pointer-events-none bg-orange-500"></div>

                <div class="relative z-10 flex flex-col w-full max-h-[380px] overflow-y-auto no-scrollbar scroll-smooth p-2">
                    {#each allItems as item}
                        <div class="flex flex-col border-b border-foreground/[0.05] last:border-none">
                            <button type="button" class="flex items-center gap-3 w-full p-3 sm:p-4 hover:bg-foreground/[0.02] rounded-xl transition-colors duration-300 text-left cursor-pointer" onclick={() => toggleAccordion(item.id)}>
                                <div class="w-10 h-10 shrink-0 flex items-center justify-center rounded-xl border transition-all duration-300" style="background-color: {activeId === item.id ? `${item.color}20` : 'rgba(0,0,0,0.3)'}; border-color: {activeId === item.id ? `${item.color}30` : 'rgba(255,255,255,0.1)'};">
                                    <svelte:component this={item.icon} size={16} style="color: {activeId === item.id ? item.color : 'rgba(255,255,255,0.4)'};" />
                                </div>
                                <div class="flex flex-col flex-1 min-w-0 pr-1">
                                    <span class="text-[12px] sm:text-[13px] font-bold text-foreground/90 truncate leading-tight">{item.name}</span>
                                    <div class="flex items-center gap-1.5 mt-1">
                                        <span class="text-[9px] font-mono truncate tracking-wider" style="color: {item.color}e6;">{item.issuer}</span>
                                        <span class="text-[8px] text-foreground/30">·</span>
                                        <span class="text-[9px] text-foreground/40 font-medium">{item.date}</span>
                                    </div>
                                </div>
                                <div class="shrink-0 flex items-center justify-center w-5 h-5 rounded-full border transition-transform duration-300" style="transform: {activeId === item.id ? 'rotate(180deg)' : 'rotate(0deg)'}; background-color: {activeId === item.id ? `${item.color}20` : 'rgba(255,255,255,0.05)'}; border-color: {activeId === item.id ? `${item.color}30` : 'rgba(255,255,255,0.05)'}; color: {activeId === item.id ? item.color : 'rgba(255,255,255,0.3)'};">
                                    <ChevronDown size={10} />
                                </div>
                            </button>
                            {#if activeId === item.id}
                                <div transition:slide={{ duration: 300 }} class="overflow-hidden">
                                    <div class="pl-14 pr-3 pb-4 pt-1">
                                        <div class="p-3 rounded-xl bg-card/80 border border-foreground/5 shadow-inner">
                                            <h4 class="text-[8px] font-mono uppercase tracking-[0.2em] mb-1.5 font-bold" style="color: {item.color};">{item.metaLabel}</h4>
                                            <p class="text-[10px] sm:text-[11px] leading-relaxed text-foreground/70 font-light">{@html item.impact}</p>
                                            {#if item.url}
                                                <div class="mt-3 flex justify-end">
                                                    <a href={item.url} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border hover:bg-foreground/5 transition-colors" style="border-color: {item.color}40;">
                                                        <span class="text-[9px] font-bold uppercase tracking-wider" style="color: {item.color};">{item.linkText}</span>
                                                        <ExternalLink size={10} style="color: {item.color};" />
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
    {:else}
        <div class="w-full flex flex-col relative z-10" style="gap: 0.5cqi; padding-top: 1cqi;">
            <!-- OVERVIEW SEO CARD -->
            <div class="group relative flex flex-col rounded-[2rem] bg-gradient-to-br from-foreground/[0.06] to-foreground/[0.01] backdrop-blur-[60px] border border-foreground/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.12)] overflow-hidden" style="padding: 1.5cqi; margin-bottom: 0.4cqi;">
                <div class="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-foreground/40 to-transparent opacity-60"></div>
                <div class="absolute -right-20 -top-20 w-96 h-96 rounded-full blur-[100px] opacity-10 pointer-events-none bg-orange-500"></div>

                <div class="relative z-10 flex flex-col" style="gap: 0.8cqi;">
                    <div class="flex items-center" style="gap: 0.8cqi;">
                        <div class="flex items-center justify-center w-12 h-12 rounded-2xl bg-card/60 border border-foreground/10 text-muted-foreground">
                            <Shield size={24} />
                        </div>
                        <div class="flex flex-col">
                            <span class="text-[clamp(20px,1.8vw,26px)] font-black text-foreground leading-tight tracking-tight">
                                {certificatesData.overview.title}
                            </span>
                            <span class="font-mono text-muted-foreground uppercase tracking-[0.2em]" style="font-size: clamp(8px, 0.7cqi, 12px); margin-top: 0.3cqi;">
                                {certificatesData.overview.subtitle}
                            </span>
                        </div>
                    </div>
                    <p class="text-[clamp(0.95rem,1vw,1.1rem)] leading-[1.8] text-foreground/70 font-light max-w-[95%]">
                        {@html certificatesData.overview.description}
                    </p>
                </div>
            </div>

            <!-- CERTIFICATES HORIZONTAL DRAG ROW -->
            <div class="flex flex-col w-full" style="margin-top: 1cqi;">
                <DraggableRow title="Verified Certifications" items={certificatesData.list} icon={Award} direction="left" variant="cert" onSelect={(item: any) => openModal(item, "cert")} />
                <DraggableRow title="Peer-Reviewed Publications" items={certificatesData.papers} icon={BookOpen} direction="right" variant="paper" onSelect={(item: any) => openModal(item, "paper")} />
            </div>

            <Modal item={selectedItem} type={modalType} onclose={closeModal} />
        </div>
    {/if}
{/snippet}

<MobileCarousel
    layout="right"
    sectionTitle={certificatesData.ui.carousel.sectionTitle}
    sectionDescription={certificatesData.ui.carousel.sectionDescription}
    accentColor={certificatesData.ui.carousel.accentColor}
>
    <!-- DESKTOP -->
    <svelte:fragment slot="content-pc">
        <GlowAccent
            color={certificatesData.ui.carousel.accentColor}
            position="top-[15%] right-[10%]"
            size={600}
        />

        <div
            class="absolute inset-0 z-20 pointer-events-none flex relative"
            style="container-type: size; padding: 3cqi 0 1cqi 0;"
        >
            <!-- LEFT 40%: Typographic Anchor -->
            <div
                bind:this={leftPanel}
                class="w-[40%] h-full flex flex-col items-start justify-end pointer-events-auto"
                style="padding-left: 3cqi; padding-bottom: 2cqi;"
            >
                <SectionAnchor
                    label={certificatesData.leftAnchor.label}
                    title={certificatesData.leftAnchor.title}
                    description={certificatesData.leftAnchor.description}
                    labelColor="text-muted-foreground/80"
                    align="left"
                />
            </div>

            <!-- RIGHT 60%: Interactive Certificate Accordion -->
            <div
                bind:this={rightPanel}
                class="w-[60%] h-full flex flex-col justify-center items-end pointer-events-auto"
                style="padding-right: 3cqi; gap: 1.5cqi;"
            >
                {@render credentialsGrid(false)}
            </div>
        </div>

        <!-- CENTER BOTTOM: CTA Dock -->
        <div
            class="absolute left-1/2 -translate-x-1/2 z-40 pointer-events-auto flex justify-center"
            style="bottom: 2cqi; max-width: 20cqi;"
        >
            <div
                class="flex items-stretch bg-card/80 backdrop-blur-xl rounded-[1.5rem] border border-foreground/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.07)]"
                style="padding: 0.4cqi;"
            >
                <PillButton
                    href={certificatesData.ui.cta.href}
                    label={certificatesData.ui.cta.label}
                    sublabel="View All"
                    Icon={ArrowRight}
                    accentColor="orange"
                />
            </div>
        </div>
    </svelte:fragment>

    <!-- MOBILE -->
    <svelte:fragment slot="content-mobile">
        <div
            class="h-full w-full overflow-y-auto overscroll-contain no-scrollbar touch-pan-y relative z-20 pointer-events-auto"
        >
            <div
                class="flex flex-col items-center justify-center w-full min-h-[100dvh] max-w-lg mx-auto gap-6 px-4 pt-[12dvh] pb-[20dvh]"
            >
                <SectionAnchor
                    label={certificatesData.leftAnchor.label}
                    title={certificatesData.leftAnchor.title}
                    description={certificatesData.leftAnchor.description}
                    labelColor="text-muted-foreground/80"
                    align="center"
                />

                <div
                    class="flex items-stretch bg-card/80 backdrop-blur-xl rounded-[1.5rem] border border-foreground/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.07)] p-1.5 w-max mx-auto"
                >
                    <PillButton
                        href={certificatesData.ui.cta.href}
                        label={certificatesData.ui.cta.label}
                        Icon={ArrowRight}
                        accentColor="orange"
                    />
                </div>

                {@render credentialsGrid(true)}
            </div>
        </div>
    </svelte:fragment>
</MobileCarousel>
