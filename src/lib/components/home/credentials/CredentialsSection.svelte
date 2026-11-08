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
        <div class="w-full flex flex-col gap-3.5 relative z-10">
            <!-- Mobile Overview Specification Card -->
            <div class="w-full p-5 rounded-2xl bg-card/85 backdrop-blur-xl border border-border/80 shadow-[var(--shadow-sm)] flex flex-col gap-3">
                <div class="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-border/70">
                    <div class="flex items-center gap-2.5">
                        <div class="w-8 h-8 rounded-lg bg-muted/80 border border-border/80 flex items-center justify-center text-primary shrink-0">
                            <Shield size={16} />
                        </div>
                        <h3 class="text-[16px] font-heading font-bold text-foreground tracking-tight leading-snug">
                            {certificatesData.overview.title}
                        </h3>
                    </div>
                    <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-muted/60 border border-border/70">
                        <CheckCircle size={11} class="text-success" />
                        <span class="text-[9.5px] font-mono font-semibold text-muted-foreground tracking-wider uppercase">Verified</span>
                    </div>
                </div>
                <p class="text-[0.88rem] leading-[1.65] text-muted-foreground mb-0">
                    {@html certificatesData.overview.description}
                </p>
            </div>

            <!-- MAIN ACCORDION LEDGER (Zero title truncation on mobile; full light/dark theme support) -->
            <div class="relative flex flex-col w-full rounded-2xl bg-card/85 backdrop-blur-xl border border-border/80 shadow-[var(--shadow-md)] overflow-hidden">
                <div class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent opacity-70"></div>

                <div class="relative z-10 flex flex-col w-full divide-y divide-border/60 p-1.5 sm:p-2">
                    {#each allItems as item}
                        {@const isOpen = activeId === item.id}
                        <div class="flex flex-col">
                            <button
                                type="button"
                                class="flex items-start gap-3 w-full p-3 sm:p-3.5 hover:bg-muted/40 rounded-xl transition-colors duration-200 text-left cursor-pointer"
                                onclick={() => toggleAccordion(item.id)}
                            >
                                <div
                                    class="w-9 h-9 shrink-0 flex items-center justify-center rounded-lg border transition-colors duration-200 mt-0.5
                                           {isOpen ? 'bg-primary/15 border-primary/45 text-primary' : 'bg-muted/70 border-border/80 text-muted-foreground'}"
                                >
                                    <svelte:component this={item.icon} size={16} />
                                </div>
                                <div class="flex flex-col flex-1 min-w-0 pr-1">
                                    <span class="text-[13.5px] sm:text-[14.5px] font-heading font-bold text-foreground leading-snug break-words">
                                        {item.name}
                                    </span>
                                    <div class="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-1">
                                        <span class="text-[10.5px] sm:text-[11px] font-mono font-semibold text-primary tracking-wide leading-snug">
                                            {item.issuer}
                                        </span>
                                        <span class="text-[10px] text-border">·</span>
                                        <span class="text-[10.5px] sm:text-[11px] font-mono tabular-nums text-muted-foreground">
                                            {item.date}
                                        </span>
                                    </div>
                                </div>
                                <div
                                    class="shrink-0 flex items-center justify-center w-6 h-6 rounded-md border transition-all duration-200 mt-0.5
                                           {isOpen ? 'rotate-180 bg-primary/15 border-primary/40 text-primary' : 'bg-muted/60 border-border/70 text-muted-foreground'}"
                                >
                                    <ChevronDown size={12} />
                                </div>
                            </button>
                            {#if isOpen}
                                <div transition:slide={{ duration: 250 }} class="overflow-hidden">
                                    <div class="pl-3 sm:pl-14 pr-3 pb-3.5 pt-1">
                                        <div class="p-3.5 rounded-xl bg-muted/45 border border-border/70">
                                            <p class="text-[12px] sm:text-[12.5px] leading-relaxed text-muted-foreground mb-0">
                                                {@html item.impact}
                                            </p>
                                            {#if item.url && item.url !== "#"}
                                                <div class="mt-3 pt-2.5 border-t border-border/60 flex items-center justify-between">
                                                    <span class="text-[9.5px] font-mono uppercase tracking-wider text-muted-foreground">
                                                        {item.metaLabel}
                                                    </span>
                                                    <a
                                                        href={item.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary/12 border border-primary/35 hover:bg-primary/20 transition-colors"
                                                    >
                                                        <span class="text-[10px] font-mono font-bold uppercase tracking-wider text-primary">
                                                            {item.linkText}
                                                        </span>
                                                        <ExternalLink size={11} class="text-primary" />
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
        <div class="w-full flex flex-col relative z-10" style="gap: 0.65cqi; padding-top: 0.5cqi;">
            <!-- OVERVIEW SPECIFICATION SHEET -->
            <div class="group relative flex flex-col rounded-2xl bg-card/85 backdrop-blur-xl border border-border/80 shadow-[var(--shadow-md)] overflow-hidden" style="padding: 1.35cqi; margin-bottom: 0.3cqi;">
                <div class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent opacity-70"></div>

                <div class="relative z-10 flex flex-col" style="gap: 0.75cqi;">
                    <div class="flex items-center justify-between pb-3 border-b border-border/70" style="gap: 0.8cqi;">
                        <div class="flex items-center" style="gap: 0.75cqi;">
                            <div class="flex items-center justify-center w-10 h-10 rounded-lg bg-muted/80 border border-border/80 text-primary shrink-0">
                                <Shield size={20} />
                            </div>
                            <h3 class="text-[clamp(18px,1.5vw,23px)] font-heading font-bold text-foreground leading-tight tracking-tight">
                                {certificatesData.overview.title}
                            </h3>
                        </div>
                        <span class="font-mono text-primary uppercase tracking-[0.18em] font-semibold px-2.5 py-1 rounded-md bg-muted/60 border border-border/70 shrink-0" style="font-size: clamp(9px, 0.7cqi, 11px);">
                            {certificatesData.overview.subtitle}
                        </span>
                    </div>
                    <p class="text-[clamp(0.9rem,0.98vw,1.04rem)] leading-[1.7] text-muted-foreground max-w-[96%] mb-0">
                        {@html certificatesData.overview.description}
                    </p>
                </div>
            </div>

            <!-- CERTIFICATES HORIZONTAL DRAG ROW -->
            <div class="flex flex-col w-full" style="margin-top: 0.6cqi;">
                <div class="flex items-center justify-end w-full mb-1.5 pr-2">
                    <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-card/80 border border-border/70">
                        <span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
                        <span class="text-[9px] font-mono uppercase tracking-[0.14em] text-muted-foreground font-semibold">Select any credential for details</span>
                    </div>
                </div>
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
    accentColor="hsl(38 92% 50%)"
    modelLabel="AWS Vault"
    briefLabel="Certifications"
>
    <!-- DESKTOP -->
    <svelte:fragment slot="content-pc">

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
                    labelColor="text-amber-400/90"
                    accentColor="hsl(38 92% 50%)"
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
            class="w-full relative z-20 pointer-events-auto"
        >
            <div
                class="flex flex-col items-start justify-start w-full min-h-[100dvh] max-w-xl md:max-w-2xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-12 gap-4 sm:gap-5"
            >
                <SectionAnchor
                    label={certificatesData.leftAnchor.label}
                    title={certificatesData.leftAnchor.title}
                    description={certificatesData.leftAnchor.description}
                    labelColor="text-amber-400/90"
                    accentColor="hsl(38 92% 50%)"
                    align="left"
                />

                {@render credentialsGrid(true)}

                <div
                    class="flex items-stretch bg-card/90 backdrop-blur-xl rounded-2xl border border-border/80 shadow-[var(--shadow-md)] p-1.5 w-max"
                >
                    <PillButton
                        href={certificatesData.ui.cta.href}
                        label={certificatesData.ui.cta.label}
                        Icon={ArrowRight}
                        accentColor="orange"
                    />
                </div>
            </div>
        </div>
    </svelte:fragment>
</MobileCarousel>
