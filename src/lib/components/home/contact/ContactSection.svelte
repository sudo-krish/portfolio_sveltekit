<!-- src/lib/components/home/contact/ContactSection.svelte -->
<!-- 3D: RIGHT (x:4.5) | Content: LEFT -->
<script lang="ts">
    import { onMount } from "svelte";
    import gsap from "gsap";
    import { fade, fly } from "svelte/transition";
    import {
        Mail,
        MapPin,
        Calendar,
        Coffee,
        Github,
        Linkedin,
        Send,
        X,
        ArrowUpRight,
    } from "lucide-svelte";
    import { siteConfig } from "$lib/data/site";
    import { heroProfile } from "$lib/data/hero_content";
    import {
        contactSectionContent,
        personalContactInfo,
    } from "$lib/data/contact-content";
    import GlassCard from "$lib/components/ui/cards/GlassCard.svelte";
    import CtaLink from "$lib/components/ui/CtaLink.svelte";
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

    /* ── Mail Modal State ── */
    let showMailModal = $state(false);
    let formName = $state("");
    let formSubject = $state("");
    let formMessage = $state("");

    const openMailModal = () => {
        showMailModal = true;
    };
    const closeMailModal = () => {
        showMailModal = false;
    };

    const handleSend = () => {
        const subj = encodeURIComponent(
            formSubject || `Hello from ${formName || "a visitor"}`,
        );
        const body = encodeURIComponent(formMessage);
        window.open(
            `mailto:${personal.email}?subject=${subj}&body=${body}`,
            "_self",
        );
        closeMailModal();
        formName = "";
        formSubject = "";
        formMessage = "";
    };

    onMount(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo(
                ".contact-panel",
                { y: 50, opacity: 0, scale: 0.95 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1.2,
                    stagger: 0.15,
                    ease: "power3.out",
                    delay: 0.1,
                },
            );
        });
        return () => ctx.revert();
    });
</script>

{#snippet contactCard(isMobile: boolean)}
    <div class="flex flex-col gap-3 w-full pointer-events-auto">
        <!-- ═══ Headline Card ═══ -->
        <GlassCard
            variant="default"
            accent="hsl(var(--primary))"
            class="contact-panel relative overflow-hidden group/hero flex flex-col justify-between {isMobile
                ? 'p-5 min-h-[140px]'
                : 'p-6 2xl:p-8 min-h-[180px] 2xl:min-h-[220px]'}"
        >
            <!-- top-bar metadata -->
            <div class="flex items-center justify-between w-full">
                <span
                    class="flex items-center gap-2 text-[10px] 2xl:text-xs font-mono text-foreground/40 tracking-widest uppercase"
                >
                    <span class="relative flex h-2 w-2">
                        <span
                            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground opacity-30"
                        ></span>
                        <span
                            class="relative inline-flex rounded-full h-2 w-2 bg-foreground"
                        ></span>
                    </span>
                    Open to Work
                </span>
                <span
                    class="flex items-center gap-1.5 text-[10px] 2xl:text-xs font-mono text-foreground/30"
                >
                    <MapPin size={10} />
                    {personal.address.city}
                </span>
            </div>

            <!-- headline -->
            <h2
                class="{isMobile
                    ? 'text-2xl'
                    : 'text-3xl 2xl:text-[2.75rem]'} font-semibold text-foreground leading-[1.15] tracking-tight"
            >
                Let's start a<br />
                <span class="font-light text-foreground/60">conversation.</span>
            </h2>
        </GlassCard>

        <!-- ═══ Email Button → opens modal ═══ -->
        <GlassCard
            variant="inset"
            hover={true}
            class="contact-panel group/email flex items-center justify-between {isMobile
                ? 'p-3.5'
                : 'p-4 2xl:p-5'} cursor-pointer hover:border-foreground/15 transition-all duration-400"
            onclick={openMailModal}
        >
            <div class="flex items-center gap-3 2xl:gap-4">
                <div
                    class="w-9 h-9 2xl:w-10 2xl:h-10 rounded-xl bg-foreground/[0.04] border border-foreground/[0.06] flex items-center justify-center group-hover/email:bg-foreground/[0.08] transition-colors duration-300"
                >
                    <Mail
                        size={16}
                        class="text-foreground/50 group-hover/email:text-foreground/80 transition-colors duration-300"
                    />
                </div>
                <div class="flex flex-col">
                    <span
                        class="text-[9px] 2xl:text-[10px] font-mono text-foreground/35 uppercase tracking-[0.15em]"
                        >Send Message</span
                    >
                    <span
                        class="{isMobile
                            ? 'text-xs'
                            : 'text-sm 2xl:text-base'} font-medium text-foreground/80 group-hover/email:text-foreground transition-colors duration-300"
                        >{personal.email}</span
                    >
                </div>
            </div>
            <div
                class="w-7 h-7 2xl:w-8 2xl:h-8 rounded-lg bg-foreground/[0.03] flex items-center justify-center group-hover/email:bg-foreground/[0.08] transition-all duration-300"
            >
                <Send
                    size={12}
                    class="text-foreground/40 group-hover/email:text-foreground/70 transition-colors duration-300"
                />
            </div>
        </GlassCard>

        <!-- ═══ Quick Actions Row ═══ -->
        <div class="contact-panel grid grid-cols-2 gap-2.5 2xl:gap-3">
            <GlassCard
                variant="inset"
                hover={true}
                href={CALENDAR_URL}
                target="_blank"
                class="group/act flex items-center gap-3 {isMobile
                    ? 'p-3'
                    : 'p-3.5 2xl:p-4'} hover:border-foreground/15 transition-all duration-400"
            >
                <div
                    class="w-8 h-8 rounded-lg bg-foreground/[0.04] border border-foreground/[0.06] flex items-center justify-center group-hover/act:bg-foreground/[0.08] transition-colors duration-300"
                >
                    <Calendar
                        size={14}
                        class="text-foreground/50 group-hover/act:text-foreground/80 transition-colors duration-300"
                    />
                </div>
                <div class="flex flex-col">
                    <span
                        class="{isMobile
                            ? 'text-[11px]'
                            : 'text-xs 2xl:text-sm'} font-medium text-foreground/70 group-hover/act:text-foreground transition-colors"
                        >Schedule</span
                    >
                    <span
                        class="text-[9px] 2xl:text-[10px] font-mono text-foreground/30"
                        >30 min</span
                    >
                </div>
            </GlassCard>

            <GlassCard
                variant="inset"
                hover={true}
                href={COFFEE_URL}
                target="_blank"
                class="group/act flex items-center gap-3 {isMobile
                    ? 'p-3'
                    : 'p-3.5 2xl:p-4'} hover:border-foreground/15 transition-all duration-400"
            >
                <div
                    class="w-8 h-8 rounded-lg bg-foreground/[0.04] border border-foreground/[0.06] flex items-center justify-center group-hover/act:bg-foreground/[0.08] transition-colors duration-300"
                >
                    <Coffee
                        size={14}
                        class="text-foreground/50 group-hover/act:text-foreground/80 transition-colors duration-300"
                    />
                </div>
                <div class="flex flex-col">
                    <span
                        class="{isMobile
                            ? 'text-[11px]'
                            : 'text-xs 2xl:text-sm'} font-medium text-foreground/70 group-hover/act:text-foreground transition-colors"
                        >Coffee</span
                    >
                    <span
                        class="text-[9px] 2xl:text-[10px] font-mono text-foreground/30"
                        >Support</span
                    >
                </div>
            </GlassCard>
        </div>

        <!-- ═══ Socials ═══ -->
        <div class="contact-panel flex items-center justify-center gap-2 pt-1">
            <a
                href={personal.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                class="p-2.5 rounded-lg text-foreground/30 hover:text-foreground/70 hover:bg-foreground/[0.04] transition-all duration-300"
            >
                <Github size={17} />
            </a>
            <a
                href={personal.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                class="p-2.5 rounded-lg text-foreground/30 hover:text-foreground/70 hover:bg-foreground/[0.04] transition-all duration-300"
            >
                <Linkedin size={17} />
            </a>
        </div>
    </div>
{/snippet}

<!-- ═══════════════════ LAYOUT ═══════════════════ -->

<MobileCarousel
    layout="left"
    sectionTitle="Contact"
    sectionDescription="Let's build something together"
    accentColor="hsl(var(--primary))"
>
    <!-- DESKTOP / TABLET -->
    <svelte:fragment slot="content-pc">
        <GlowAccent
            color="hsl(var(--primary))"
            position="top-1/3 right-[10%]"
        />

        <div
            class="absolute z-20 pointer-events-auto flex flex-col"
            style="top: 10cqi; left: 3cqi; width: 38cqi; gap: 1.5cqi;"
        >
            <p
                class="contact-panel text-sm lg:text-base text-foreground/50 px-2 shrink-0 font-light leading-relaxed"
            >
                {content.introParagraph}
            </p>

            {@render contactCard(false)}

            <div class="contact-panel mt-4">
                <CtaLink
                    href={content.ctaSlug}
                    label={content.ctaLabel}
                    color="hsl(var(--primary))"
                />
            </div>
        </div>
    </svelte:fragment>

    <!-- MOBILE / SMALL TABLET -->
    <svelte:fragment slot="content-mobile">
        <div
            class="flex flex-col items-center justify-center z-20 w-full min-h-[100dvh] max-w-lg mx-auto pointer-events-auto gap-4 px-4 pt-[12dvh] pb-[20dvh]"
        >
            <p
                class="contact-panel text-xs sm:text-sm leading-relaxed text-foreground/50 px-2 shrink-0 font-light"
            >
                {content.introParagraph}
            </p>

            {@render contactCard(true)}

            <div class="contact-panel mt-2">
                <CtaLink
                    href={content.ctaSlug}
                    label={content.ctaLabel}
                    color="hsl(var(--primary))"
                />
            </div>
        </div>
    </svelte:fragment>
</MobileCarousel>

<!-- ═══════════════════ MAIL MODAL ═══════════════════ -->

{#if showMailModal}
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
        class="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        transition:fade={{ duration: 200 }}
    >
        <!-- backdrop -->
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <div
            class="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onclick={closeMailModal}
        ></div>

        <!-- modal card -->
        <div
            class="relative z-10 w-full max-w-md"
            transition:fly={{ y: 24, duration: 350 }}
        >
            <GlassCard
                variant="default"
                hover={false}
                accent="hsl(var(--primary))"
                class="flex flex-col p-6 2xl:p-8 shadow-2xl"
            >
                <!-- close -->
                <button
                    class="absolute top-4 right-4 p-2 rounded-lg text-foreground/40 hover:text-foreground hover:bg-foreground/[0.05] transition-colors z-20"
                    onclick={closeMailModal}
                >
                    <X size={16} />
                </button>

                <!-- header -->
                <div class="flex flex-col gap-1 mb-6">
                    <h3
                        class="text-lg 2xl:text-xl font-semibold text-foreground"
                    >
                        Send a message
                    </h3>
                    <p class="text-xs text-foreground/40 font-mono">
                        Opens your email client with your message pre-filled.
                    </p>
                </div>

                <!-- form -->
                <div class="flex flex-col gap-4">
                    <div class="flex flex-col gap-1.5">
                        <label
                            for="contact-name"
                            class="text-[10px] uppercase tracking-[0.15em] text-foreground/50 font-mono ml-0.5"
                            >Name</label
                        >
                        <input
                            id="contact-name"
                            type="text"
                            bind:value={formName}
                            placeholder="Your name"
                            class="w-full px-4 py-3 rounded-xl bg-foreground/[0.03] border border-foreground/[0.08] text-sm text-foreground placeholder:text-foreground/20 outline-none focus:border-foreground/20 focus:bg-foreground/[0.05] transition-all duration-300"
                        />
                    </div>

                    <div class="flex flex-col gap-1.5">
                        <label
                            for="contact-subject"
                            class="text-[10px] uppercase tracking-[0.15em] text-foreground/50 font-mono ml-0.5"
                            >Subject</label
                        >
                        <input
                            id="contact-subject"
                            type="text"
                            bind:value={formSubject}
                            placeholder="What's this about?"
                            class="w-full px-4 py-3 rounded-xl bg-foreground/[0.03] border border-foreground/[0.08] text-sm text-foreground placeholder:text-foreground/20 outline-none focus:border-foreground/20 focus:bg-foreground/[0.05] transition-all duration-300"
                        />
                    </div>

                    <div class="flex flex-col gap-1.5">
                        <label
                            for="contact-message"
                            class="text-[10px] uppercase tracking-[0.15em] text-foreground/50 font-mono ml-0.5"
                            >Message</label
                        >
                        <textarea
                            id="contact-message"
                            bind:value={formMessage}
                            placeholder="Hello! I'd like to discuss..."
                            rows="4"
                            class="w-full px-4 py-3 rounded-xl bg-foreground/[0.03] border border-foreground/[0.08] text-sm text-foreground placeholder:text-foreground/20 outline-none focus:border-foreground/20 focus:bg-foreground/[0.05] transition-all duration-300 resize-none"
                        ></textarea>
                    </div>

                    <button
                        onclick={handleSend}
                        class="w-full mt-1 py-3 rounded-xl bg-foreground text-background font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all duration-200 group"
                    >
                        Open in Mail
                        <ArrowUpRight
                            size={14}
                            class="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                        />
                    </button>
                </div>
            </GlassCard>
        </div>
    </div>
{/if}
