<!-- src/lib/components/home/contact/ContactSection.svelte -->
<script lang="ts">
    import { onMount } from "svelte";
    import gsap from "gsap";
    import {
        Mail,
        MapPin,
        Github,
        Linkedin,
        Send,
        Calendar,
        Coffee,
        ArrowUpRight
    } from "lucide-svelte";
    import { siteConfig } from "$lib/data/site";
    import { heroProfile } from "$lib/data/hero_content";
    import {
        contactSectionContent,
        personalContactInfo,
    } from "$lib/data/contact-content";
    import GlassCard from "$lib/components/ui/cards/GlassCard.svelte";
    import SectionAnchor from "$lib/components/ui/anchors/SectionAnchor.svelte";
    import GlowAccent from "$lib/components/ui/GlowAccent.svelte";
    import MobileCarousel from "$lib/components/ui/MobileCarousel.svelte";

    const personal = {
        ...siteConfig,
        ...heroProfile,
        ...personalContactInfo,
    };
    const content = contactSectionContent;

    const CALENDAR_URL = "https://calendly.com/krishnanandanil/30min";
    const COFFEE_URL = "https://buymeacoffee.com/krishnanandanil";

    let leftPanel: HTMLElement;
    let rightPanel: HTMLElement;
    let mobilePanel: HTMLElement;

    /* ── Form State ── */
    let formName = $state("");
    let formSubject = $state("");
    let formMessage = $state("");

    const handleSend = () => {
        const subj = encodeURIComponent(
            formSubject || `Hello from ${formName || "a visitor"}`,
        );
        const body = encodeURIComponent(formMessage);
        window.open(
            `mailto:${personal.email}?subject=${subj}&body=${body}`,
            "_self",
        );
        formName = "";
        formSubject = "";
        formMessage = "";
    };

    onMount(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        let ctx = gsap.context(() => {});
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        ctx.add(() => {
                            if (leftPanel) {
                                gsap.fromTo(
                                    leftPanel.children,
                                    { x: -24, opacity: 0 },
                                    {
                                        x: 0,
                                        opacity: 1,
                                        duration: 0.75,
                                        stagger: 0.1,
                                        ease: "expo.out",
                                        clearProps: "transform,opacity",
                                    },
                                );
                            }
                            if (rightPanel) {
                                gsap.fromTo(
                                    rightPanel.children,
                                    { y: 24, opacity: 0 },
                                    {
                                        y: 0,
                                        opacity: 1,
                                        duration: 0.85,
                                        stagger: 0.1,
                                        ease: "expo.out",
                                        delay: 0.06,
                                        clearProps: "transform,opacity",
                                    },
                                );
                            }
                        });
                    }
                });
            },
            { threshold: 0.25 },
        );
        if (leftPanel) observer.observe(leftPanel);
        return () => {
            observer.disconnect();
            ctx.revert();
        };
    });
</script>

{#snippet contactAnchor(align: "left" | "center" | "right")}
    <SectionAnchor
        label="Get in Touch"
        title="Let's start a conversation."
        description={content.introParagraph}
        labelColor="text-primary/80"
        align={align}
    />
{/snippet}

{#snippet contactCard(isMobile: boolean)}
    <div class="flex flex-col gap-3.5 w-full pointer-events-auto">
        <!-- ═══ Inline Architectural Dispatch Form ═══ -->
        <GlassCard variant="default" class="flex flex-col {isMobile ? 'p-5' : 'p-6 2xl:p-7'}">
            <div class="flex items-center justify-between gap-3 mb-4 border-b border-border/70 pb-3.5">
                <div class="flex items-center gap-3">
                    <div class="w-9 h-9 rounded-lg bg-primary/12 border border-primary/35 flex items-center justify-center shrink-0">
                        <Mail size={17} class="text-primary" />
                    </div>
                    <h3 class="text-base sm:text-lg font-heading font-bold text-foreground tracking-tight">Send a message</h3>
                </div>
                <span class="text-[10px] text-muted-foreground font-mono uppercase tracking-wider hidden sm:inline">Direct Mailto</span>
            </div>

            <div class="flex flex-col gap-3.5">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div class="flex flex-col gap-1.5">
                        <label for="contact-name" class="text-[10.5px] uppercase tracking-wider text-muted-foreground font-mono font-semibold ml-0.5">Name</label>
                        <input id="contact-name" type="text" bind:value={formName} placeholder="Your name" class="w-full px-3.5 py-2.5 rounded-xl bg-muted/45 border border-border/80 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/60 focus:bg-card transition-all duration-200" />
                    </div>
                    <div class="flex flex-col gap-1.5">
                        <label for="contact-subject" class="text-[10.5px] uppercase tracking-wider text-muted-foreground font-mono font-semibold ml-0.5">Subject</label>
                        <input id="contact-subject" type="text" bind:value={formSubject} placeholder="Architecture / Opportunity" class="w-full px-3.5 py-2.5 rounded-xl bg-muted/45 border border-border/80 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/60 focus:bg-card transition-all duration-200" />
                    </div>
                </div>

                <div class="flex flex-col gap-1.5">
                    <label for="contact-message" class="text-[10.5px] uppercase tracking-wider text-muted-foreground font-mono font-semibold ml-0.5">Message</label>
                    <textarea id="contact-message" bind:value={formMessage} placeholder="Hello! I'd like to discuss..." rows={isMobile ? 2 : 3} class="w-full px-3.5 py-2.5 rounded-xl bg-muted/45 border border-border/80 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/60 focus:bg-card transition-all duration-200 resize-none"></textarea>
                </div>

                <button onclick={handleSend} class="w-full mt-1 py-3 rounded-xl bg-primary text-primary-foreground font-heading font-bold text-sm flex items-center justify-center gap-2 hover:opacity-95 active:scale-[0.99] transition-all duration-200 group shadow-[var(--shadow-sm)] cursor-pointer">
                    Send Message
                    <Send size={14} class="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                </button>
            </div>
        </GlassCard>

        <!-- ═══ Quick Actions Row (Cohesive Blueprint Action Tiles) ═══ -->
        <div class="grid grid-cols-2 gap-3">
            <GlassCard variant="compact" accent="hsl(var(--primary))" href={CALENDAR_URL} target="_blank" rel="noopener noreferrer" class="group">
                <div class="flex items-center justify-between gap-2.5">
                    <div class="flex items-center gap-2.5 min-w-0">
                        <div class="w-9 h-9 shrink-0 rounded-lg bg-primary/14 border border-primary/35 text-primary flex items-center justify-center">
                            <Calendar size={16} />
                        </div>
                        <div class="flex flex-col min-w-0">
                            <span class="text-sm font-heading font-bold text-foreground leading-tight">Calendly</span>
                            <span class="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mt-0.5">Schedule Call</span>
                        </div>
                    </div>
                    <ArrowUpRight size={14} class="text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                </div>
            </GlassCard>

            <GlassCard variant="compact" accent="hsl(var(--warning))" href={COFFEE_URL} target="_blank" rel="noopener noreferrer" class="group">
                <div class="flex items-center justify-between gap-2.5">
                    <div class="flex items-center gap-2.5 min-w-0">
                        <div class="w-9 h-9 shrink-0 rounded-lg bg-warning/15 border border-warning/35 text-warning flex items-center justify-center">
                            <Coffee size={16} />
                        </div>
                        <div class="flex flex-col min-w-0">
                            <span class="text-sm font-heading font-bold text-foreground leading-tight">Support Work</span>
                            <span class="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mt-0.5">Buy a Coffee</span>
                        </div>
                    </div>
                    <ArrowUpRight size={14} class="text-muted-foreground group-hover:text-warning transition-colors shrink-0" />
                </div>
            </GlassCard>
        </div>

        <!-- ═══ Location Full Row ═══ -->
        <a href="https://maps.google.com/?q={personal.address.city}" target="_blank" rel="noopener noreferrer" class="relative overflow-hidden flex items-center justify-between p-4 rounded-xl border border-border/80 bg-card/85 hover:border-primary/45 transition-all duration-300 group shadow-[var(--shadow-sm)] no-underline">
            <!-- Real Map iframe background -->
            <iframe title="Map of {personal.address.city}" src="https://www.openstreetmap.org/export/embed.html?bbox=77.4%2C12.8%2C77.7%2C13.1&layer=mapnik" class="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none dark:invert dark:opacity-25 mix-blend-luminosity" style="border: 0;" tabindex="-1"></iframe>
            
            <!-- Overlay gradient to ensure text readability -->
            <div class="absolute inset-0 bg-gradient-to-r from-card/95 via-card/70 to-card/30 pointer-events-none"></div>

            <div class="flex items-center gap-3 relative z-10">
                <div class="w-9 h-9 shrink-0 rounded-lg bg-muted/80 border border-border/80 flex items-center justify-center text-primary">
                    <MapPin size={17} />
                </div>
                <div class="flex flex-col">
                    <span class="text-sm font-heading font-bold text-foreground tracking-tight">{personal.address.city}, {personal.address.country}</span>
                    <span class="text-[10px] text-muted-foreground font-mono uppercase tracking-wider mt-0.5">Based In · Open Map</span>
                </div>
            </div>
            <div class="relative z-10 w-8 h-8 rounded-lg bg-muted/80 border border-border/80 flex items-center justify-center group-hover:border-primary/40 transition-colors">
                <ArrowUpRight size={14} class="text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
        </a>

        <!-- ═══ Socials Dedicated ═══ -->
        <div class="grid grid-cols-2 gap-3">
            <GlassCard variant="compact" hover={true} href={personal.socialLinks.linkedin} target="_blank" class="flex items-center justify-center gap-2 group">
                <div class="flex items-center justify-center gap-2 w-full">
                    <Linkedin size={15} class="text-primary" />
                    <span class="text-xs sm:text-sm font-heading font-bold text-foreground tracking-tight">LinkedIn</span>
                </div>
            </GlassCard>

            <GlassCard variant="compact" hover={true} href={personal.socialLinks.github} target="_blank" class="flex items-center justify-center gap-2 group">
                <div class="flex items-center justify-center gap-2 w-full">
                    <Github size={15} class="text-primary" />
                    <span class="text-xs sm:text-sm font-heading font-bold text-foreground tracking-tight">GitHub</span>
                </div>
            </GlassCard>
        </div>
    </div>
{/snippet}

<!-- ═══════════════════ LAYOUT ═══════════════════ -->

<MobileCarousel layout="left" sectionTitle="Contact" sectionDescription="Let's build something together" accentColor="hsl(var(--primary))">
    <!-- DESKTOP / TABLET -->
    <svelte:fragment slot="content-pc">
        <GlowAccent color="hsl(var(--primary))" position="top-1/3 right-[10%]" size={600} />

        <div class="absolute inset-0 z-20 pointer-events-none flex relative" style="container-type: size; padding: 3cqi 0 1cqi 0;">
            <!-- LEFT 55%: Content Panel -->
            <div bind:this={leftPanel} class="w-[55%] h-full flex flex-col items-start justify-center pointer-events-auto" style="padding-left: 3cqi;">
                <div class="flex flex-col items-start w-full max-w-[36cqi]">
                    {@render contactCard(false)}
                </div>
            </div>

            <!-- RIGHT 45%: Typographic Anchor -->
            <div bind:this={rightPanel} class="w-[45%] h-full flex flex-col items-end justify-end text-right pointer-events-auto" style="padding-right: 3cqi; padding-bottom: 2cqi;">
                {@render contactAnchor("right")}
            </div>
        </div>
    </svelte:fragment>

    <!-- MOBILE / SMALL TABLET -->
    <svelte:fragment slot="content-mobile">
        <div class="w-full relative z-20 pointer-events-auto">
            <div bind:this={mobilePanel} class="flex flex-col items-start justify-start w-full min-h-[100dvh] max-w-xl md:max-w-2xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-12 gap-4 sm:gap-5">
                {@render contactAnchor("left")}
                <div class="w-full">
                    {@render contactCard(true)}
                </div>
            </div>
        </div>
    </svelte:fragment>
</MobileCarousel>
