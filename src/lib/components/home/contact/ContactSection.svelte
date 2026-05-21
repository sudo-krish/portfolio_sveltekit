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
        let ctx = gsap.context(() => {
            // Left Panel (Content) Animation
            if (leftPanel) {
                gsap.fromTo(leftPanel.children, { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 1.0, stagger: 0.15, ease: "power3.out", delay: 0.2 });
            }
            // Right Panel (Anchor) Animation
            if (rightPanel) {
                gsap.fromTo(rightPanel.children, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power3.out", delay: 0.1 });
            }
            // Mobile Animation
            if (mobilePanel) {
                gsap.fromTo(mobilePanel.children, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.0, stagger: 0.15, ease: "power3.out", delay: 0.1 });
            }
        });
        return () => ctx.revert();
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
    <div class="flex flex-col gap-4 w-full pointer-events-auto">
        <!-- ═══ Inline Contact Form ═══ -->
        <GlassCard variant="default" class="flex flex-col {isMobile ? 'p-5' : 'p-6 2xl:p-8'} shadow-xl">
            <div class="flex items-center gap-3 mb-5 border-b border-foreground/[0.08] pb-4">
                <div class="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Mail size={18} class="text-primary" />
                </div>
                <div class="flex flex-col">
                    <h3 class="text-base sm:text-lg font-semibold text-foreground tracking-tight">Send a message</h3>
                    <p class="text-[10px] text-foreground/50 font-mono">Opens your email client.</p>
                </div>
            </div>

            <div class="flex flex-col gap-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="flex flex-col gap-1.5">
                        <label for="contact-name" class="text-[10px] uppercase tracking-[0.15em] text-foreground/50 font-mono ml-0.5">Name</label>
                        <input id="contact-name" type="text" bind:value={formName} placeholder="Your name" class="w-full px-3.5 py-2.5 rounded-xl bg-foreground/[0.03] border border-foreground/[0.08] text-sm text-foreground placeholder:text-foreground/20 outline-none focus:border-primary/40 focus:bg-foreground/[0.05] transition-all duration-300" />
                    </div>
                    <div class="flex flex-col gap-1.5">
                        <label for="contact-subject" class="text-[10px] uppercase tracking-[0.15em] text-foreground/50 font-mono ml-0.5">Subject</label>
                        <input id="contact-subject" type="text" bind:value={formSubject} placeholder="What's this about?" class="w-full px-3.5 py-2.5 rounded-xl bg-foreground/[0.03] border border-foreground/[0.08] text-sm text-foreground placeholder:text-foreground/20 outline-none focus:border-primary/40 focus:bg-foreground/[0.05] transition-all duration-300" />
                    </div>
                </div>

                <div class="flex flex-col gap-1.5">
                    <label for="contact-message" class="text-[10px] uppercase tracking-[0.15em] text-foreground/50 font-mono ml-0.5">Message</label>
                    <textarea id="contact-message" bind:value={formMessage} placeholder="Hello! I'd like to discuss..." rows={isMobile ? 2 : 3} class="w-full px-3.5 py-3 rounded-xl bg-foreground/[0.03] border border-foreground/[0.08] text-sm text-foreground placeholder:text-foreground/20 outline-none focus:border-primary/40 focus:bg-foreground/[0.05] transition-all duration-300 resize-none"></textarea>
                </div>

                <button onclick={handleSend} class="w-full mt-2 py-3.5 rounded-xl bg-foreground text-background font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all duration-200 group shadow-lg">
                    Send Message
                    <Send size={14} class="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
                </button>
            </div>
        </GlassCard>

        <!-- ═══ Quick Actions Row ═══ -->
        <div class="grid grid-cols-2 gap-3 2xl:gap-4 mt-1">
            <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer" class="flex items-center gap-3 {isMobile ? 'p-3' : 'p-3.5 2xl:p-4'} rounded-[1.25rem] bg-gradient-to-br from-[#006BFF] to-[#0052cc] text-white shadow-[0_8px_20px_rgba(0,107,255,0.25)] hover:shadow-[0_12px_25px_rgba(0,107,255,0.4)] hover:-translate-y-0.5 transition-all duration-300 group">
                <div class="w-9 h-9 2xl:w-10 2xl:h-10 shrink-0 rounded-lg bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Calendar size={16} />
                </div>
                <div class="flex flex-col">
                    <span class="text-sm 2xl:text-base font-bold tracking-wide">Calendly</span>
                    <span class="text-[9px] 2xl:text-[10px] font-medium opacity-80 uppercase tracking-widest">Schedule Call</span>
                </div>
            </a>

            <a href={COFFEE_URL} target="_blank" rel="noopener noreferrer" class="flex items-center gap-3 {isMobile ? 'p-3' : 'p-3.5 2xl:p-4'} rounded-[1.25rem] bg-gradient-to-br from-[#FFDD00] to-[#FFC300] text-black shadow-[0_8px_20px_rgba(255,221,0,0.25)] hover:shadow-[0_12px_25px_rgba(255,221,0,0.4)] hover:-translate-y-0.5 transition-all duration-300 group">
                <div class="w-9 h-9 2xl:w-10 2xl:h-10 shrink-0 rounded-lg bg-black/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Coffee size={16} />
                </div>
                <div class="flex flex-col">
                    <span class="text-sm 2xl:text-base font-bold tracking-wide">Support Me</span>
                    <span class="text-[9px] 2xl:text-[10px] font-bold opacity-70 uppercase tracking-widest">Buy a Coffee</span>
                </div>
            </a>
        </div>

        <!-- ═══ Location Full Row ═══ -->
        <a href="https://maps.google.com/?q={personal.address.city}" target="_blank" rel="noopener noreferrer" class="relative overflow-hidden flex items-center justify-between {isMobile ? 'p-4' : 'p-4 2xl:p-5'} mt-1 rounded-[1.25rem] border border-foreground/[0.08] bg-card hover:border-foreground/[0.15] hover:bg-foreground/[0.02] transition-all duration-400 group shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            
            <!-- Real Map iframe background -->
            <iframe title="Map of {personal.address.city}" src="https://www.openstreetmap.org/export/embed.html?bbox=77.4%2C12.8%2C77.7%2C13.1&layer=mapnik" class="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none dark:invert dark:opacity-30 mix-blend-luminosity" style="border: 0;" tabindex="-1"></iframe>
            
            <!-- Overlay gradient to ensure text readability -->
            <div class="absolute inset-0 bg-gradient-to-r from-card/90 via-card/50 to-transparent pointer-events-none"></div>

            <div class="flex items-center gap-3 2xl:gap-4 relative z-10">
                <div class="w-10 h-10 2xl:w-12 2xl:h-12 shrink-0 rounded-xl bg-card border border-foreground/10 shadow-sm flex items-center justify-center text-foreground/80 group-hover:scale-110 group-hover:text-foreground transition-all duration-300">
                    <MapPin size={18} />
                </div>
                <div class="flex flex-col">
                    <span class="text-xs sm:text-sm 2xl:text-base font-bold text-foreground tracking-tight drop-shadow-sm">{personal.address.city}, {personal.address.country}</span>
                    <span class="text-[9px] 2xl:text-[10px] text-foreground/60 font-mono uppercase tracking-[0.1em] mt-0.5">Based In (View Map)</span>
                </div>
            </div>
            <div class="relative z-10 w-8 h-8 2xl:w-10 2xl:h-10 rounded-full bg-card/80 backdrop-blur-sm border border-foreground/10 shadow-sm flex items-center justify-center group-hover:bg-foreground/[0.08] transition-colors">
                <ArrowUpRight size={14} class="text-foreground/70 group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
        </a>

        <!-- ═══ Socials Dedicated ═══ -->
        <div class="grid grid-cols-2 gap-3 2xl:gap-4 mt-1">
            <GlassCard variant="inset" hover={true} href={personal.socialLinks.linkedin} target="_blank" class="flex items-center justify-center gap-2 {isMobile ? 'p-3' : 'p-3.5 2xl:p-4'} group !rounded-full">
                <Linkedin size={16} class="text-foreground/50 group-hover:text-foreground transition-colors" />
                <span class="text-xs sm:text-sm font-semibold text-foreground/70 group-hover:text-foreground transition-colors tracking-wide">LinkedIn</span>
            </GlassCard>

            <GlassCard variant="inset" hover={true} href={personal.socialLinks.github} target="_blank" class="flex items-center justify-center gap-2 {isMobile ? 'p-3' : 'p-3.5 2xl:p-4'} group !rounded-full">
                <Github size={16} class="text-foreground/50 group-hover:text-foreground transition-colors" />
                <span class="text-xs sm:text-sm font-semibold text-foreground/70 group-hover:text-foreground transition-colors tracking-wide">GitHub</span>
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
            <div bind:this={mobilePanel} class="flex flex-col items-center justify-start w-full min-h-[100dvh] max-w-lg mx-auto px-5 pt-16 pb-16" style="gap: 2rem;">
                {@render contactAnchor("center")}
                <div class="w-full max-w-sm mt-4">
                    {@render contactCard(true)}
                </div>
            </div>
        </div>
    </svelte:fragment>
</MobileCarousel>
