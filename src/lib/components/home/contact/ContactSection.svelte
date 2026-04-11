<!-- src/lib/components/home/contact/ContactSection.svelte -->
<!-- 3D: RIGHT (x:4.5) | Content: LEFT -->
<script lang="ts">
    import { onMount } from "svelte";
    import gsap from "gsap";
    import {
        Mail,
        MapPin,
        Calendar,
        Coffee,
        Github,
        Linkedin,
        Copy,
        Check,
    } from "lucide-svelte";
    import { siteConfig } from "$lib/data/site";
    import { heroProfile } from "$lib/data/hero_content";
    import { contactSectionContent, personalContactInfo } from "$lib/data/contact-content";
    import GlassPanel from "$lib/components/ui/GlassPanel.svelte";
    import CtaLink from "$lib/components/ui/CtaLink.svelte";
    import GlowAccent from "$lib/components/ui/GlowAccent.svelte";
    import MobileCarousel from "$lib/components/ui/MobileCarousel.svelte";

    const personal = {
        ...siteConfig,
        ...heroProfile,
        ...personalContactInfo
    };
    const content = contactSectionContent;

    const CALENDAR_URL = "https://calendly.com/krishnanandanil/30min";
    const COFFEE_URL = "https://buymeacoffee.com/krishnanandanil";

    let copied = false;
    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(personal.email);
            copied = true;
            setTimeout(() => (copied = false), 2000);
        } catch {}
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

<!-- CHANGED: layout="left" -->
<MobileCarousel
    layout="left"
    sectionTitle="Contact"
    sectionDescription="Let's build something together"
    accentColor="hsl(var(--accent))"
>
    <!-- DESKTOP / TABLET -->
    <svelte:fragment slot="content-pc">
        <!-- CHANGED: Glow position moved to right side to balance left content -->
        <GlowAccent color="hsl(var(--accent))" position="top-1/3 right-[10%]" />

        <!-- MAIN CONTENT CARD (LEFT SIDE PC) -->
        <!-- CHANGED: right-[8%] to left-[8%] -->
        <div
            class="absolute z-20 pointer-events-auto flex flex-col"
            style="top: 10cqi; left: 3cqi; width: 40cqi; gap: 1.5cqi;"
        >
            <p
                class="contact-panel text-sm lg:text-base text-foreground/50 px-2 shrink-0 font-light leading-relaxed"
            >
                {content.introParagraph}
            </p>

            <!-- TERMINAL CONTACT CARD -->
            <GlassPanel
                glow="hsl(var(--accent))"
                className="contact-panel w-full shrink-0 rounded-3xl relative overflow-hidden shadow-2xl shadow-accent/10"
            >
                <!-- Terminal Header -->
                <div
                    class="flex items-center gap-2 px-5 py-3 border-b border-foreground/[0.06] bg-foreground/[0.02]"
                >
                    <div class="flex gap-1.5">
                        <div
                            class="w-2.5 h-2.5 rounded-full bg-red-500/60"
                        ></div>
                        <div
                            class="w-2.5 h-2.5 rounded-full bg-yellow-500/60"
                        ></div>
                        <div
                            class="w-2.5 h-2.5 rounded-full bg-green-500/60"
                        ></div>
                    </div>
                    <span class="ml-2 font-mono text-[10px] text-foreground/20"
                        >~/initialize_connection.sh</span
                    >
                </div>

                <div
                    class="p-6 font-mono text-sm space-y-5"
                    style="text-shadow: 0 0 5px hsl(var(--accent) / 0.1);"
                >
                    <div class="space-y-1.5">
                        <div class="flex gap-2 text-foreground/30">
                            <span class="text-muted-foreground">➜</span>
                            <span class="text-foreground/60">whoami</span>
                        </div>
                        <p class="pl-6 text-foreground/80">{personal.name}</p>
                        <p class="pl-6 text-foreground/30 text-xs">
                            {personal.jobTitle} ·
                            <span class="text-muted-foreground/60"
                                >Available for work</span
                            > · ~24h response
                        </p>
                    </div>

                    <div class="space-y-1">
                        <div class="flex gap-2 text-foreground/30">
                            <span class="text-muted-foreground">➜</span>
                            <span class="text-foreground/60">cat location.env</span>
                        </div>
                        <p
                            class="pl-6 text-foreground/50 flex items-center gap-1.5 text-xs"
                        >
                            <MapPin size={12} /> "{personal.address.city}"
                        </p>
                    </div>

                    <div class="space-y-2">
                        <div class="flex gap-2 text-foreground/30">
                            <span class="text-muted-foreground">➜</span>
                            <span class="text-foreground/60">echo $CONTACT</span>
                        </div>
                        <button
                            on:click={copyEmail}
                            class="ml-6 flex items-center gap-2 px-4 py-2.5 rounded-xl border border-foreground/[0.06] bg-foreground/[0.02] hover:bg-accent/10 hover:border-accent/20 transition-all group"
                        >
                            <Mail size={14} class="text-muted-foreground/60" />
                            <span
                                class="text-xs text-foreground/60 group-hover:text-foreground/80 transition-colors"
                                >{personal.email}</span
                            >
                            {#if copied}
                                <Check
                                    size={14}
                                    class="text-muted-foreground ml-auto"
                                />
                            {:else}
                                <Copy
                                    size={14}
                                    class="text-foreground/20 ml-auto group-hover:text-foreground/40 transition-colors"
                                />
                            {/if}
                        </button>
                    </div>

                    <div class="pt-4 border-t border-foreground/[0.06] space-y-2">
                        <p
                            class="text-[10px] text-foreground/20 uppercase tracking-[0.2em] font-bold mb-3"
                        >
                            Initialize Connection
                        </p>
                        <div class="grid grid-cols-2 gap-3">
                            <a
                                href={CALENDAR_URL}
                                target="_blank"
                                class="flex items-center gap-2 px-4 py-3 rounded-xl border border-foreground/[0.06] bg-foreground/[0.02] hover:bg-accent/10 hover:border-accent/20 transition-all text-xs text-foreground/50 hover:text-foreground/80"
                            >
                                <Calendar
                                    size={14}
                                    class="text-muted-foreground/60"
                                /><span>Schedule Call</span>
                            </a>
                            <a
                                href={COFFEE_URL}
                                target="_blank"
                                class="flex items-center gap-2 px-4 py-3 rounded-xl border border-foreground/[0.06] bg-foreground/[0.02] hover:bg-highlight/10 hover:border-highlight/20 transition-all text-xs text-foreground/50 hover:text-foreground/80"
                            >
                                <Coffee
                                    size={14}
                                    class="text-muted-foreground/60"
                                /><span>Buy Coffee</span>
                            </a>
                        </div>
                    </div>

                    <div class="pt-3 flex gap-4">
                        <a
                            href={personal.socialLinks.github}
                            target="_blank"
                            class="text-foreground/20 hover:text-foreground/60 transition-colors"
                            ><Github size={18} /></a
                        >
                        <a
                            href={personal.socialLinks.linkedin}
                            target="_blank"
                            class="text-foreground/20 hover:text-primary/60 transition-colors"
                            ><Linkedin size={18} /></a
                        >
                    </div>
                </div>
            </GlassPanel>

            <!-- CTA -->
            <div class="contact-panel mt-4">
                <CtaLink
                    href={content.ctaSlug}
                    label={content.ctaLabel}
                    color="hsl(var(--accent))"
                />
            </div>
        </div>
    </svelte:fragment>

    <!-- MOBILE / SMALL TABLET (Carousel Slide Layout) -->
    <svelte:fragment slot="content-mobile">
        <div
            class="flex flex-col items-center justify-center z-20 w-full min-h-[100dvh] max-w-lg mx-auto pointer-events-auto gap-4 px-4 pt-[12dvh] pb-[20dvh]"
        >
            <p
                class="contact-panel text-xs sm:text-sm leading-relaxed text-foreground/50 px-2 shrink-0 font-light"
            >
                {content.introParagraph}
            </p>

            <!-- TERMINAL CONTACT CARD -->
            <GlassPanel
                glow="hsl(var(--accent))"
                className="contact-panel w-full shrink-0 rounded-3xl relative overflow-hidden shadow-2xl shadow-accent/10"
            >
                <!-- Terminal Header -->
                <div
                    class="flex items-center gap-2 px-5 py-3 border-b border-foreground/[0.06] bg-foreground/[0.02]"
                >
                    <div class="flex gap-1.5">
                        <div
                            class="w-2.5 h-2.5 rounded-full bg-red-500/60"
                        ></div>
                        <div
                            class="w-2.5 h-2.5 rounded-full bg-yellow-500/60"
                        ></div>
                        <div class="w-2 h-2 rounded-full bg-green-500/60"></div>
                    </div>
                    <span class="ml-2 font-mono text-[9px] text-foreground/20"
                        >~/initialize_connection.sh</span
                    >
                </div>

                <div
                    class="p-4 sm:p-5 font-mono text-xs space-y-4"
                    style="text-shadow: 0 0 5px hsl(var(--accent) / 0.1);"
                >
                    <div class="space-y-1">
                        <div class="flex gap-2 text-foreground/30">
                            <span class="text-muted-foreground">➜</span>
                            <span class="text-foreground/60">whoami</span>
                        </div>
                        <p class="pl-5 text-foreground/80">{personal.name}</p>
                        <p class="pl-5 text-foreground/30 text-[10px]">
                            {personal.jobTitle} ·
                            <span class="text-muted-foreground/60"
                                >Available for work</span
                            > · ~24h response
                        </p>
                    </div>

                    <div class="space-y-1">
                        <div class="flex gap-2 text-foreground/30">
                            <span class="text-muted-foreground">➜</span>
                            <span class="text-foreground/60">cat location.env</span>
                        </div>
                        <p
                            class="pl-5 text-foreground/50 flex items-center gap-1.5 text-[10px]"
                        >
                            <MapPin size={12} /> "{personal.address.city}"
                        </p>
                    </div>

                    <div class="space-y-2">
                        <div class="flex gap-2 text-foreground/30">
                            <span class="text-muted-foreground">➜</span>
                            <span class="text-foreground/60">echo $CONTACT</span>
                        </div>
                        <button
                            on:click={copyEmail}
                            class="ml-5 flex items-center gap-2 px-3 py-2 rounded-xl border border-foreground/[0.06] bg-foreground/[0.02] hover:bg-accent/10 hover:border-accent/20 transition-all group"
                        >
                            <Mail size={12} class="text-muted-foreground/60" />
                            <span
                                class="text-[10px] text-foreground/60 group-hover:text-foreground/80 transition-colors"
                                >{personal.email}</span
                            >
                            {#if copied}
                                <Check
                                    size={12}
                                    class="text-muted-foreground ml-auto"
                                />
                            {:else}
                                <Copy
                                    size={12}
                                    class="text-foreground/20 ml-auto group-hover:text-foreground/40 transition-colors"
                                />
                            {/if}
                        </button>
                    </div>

                    <div class="pt-3 border-t border-foreground/[0.06] space-y-2">
                        <p
                            class="text-[9px] text-foreground/20 uppercase tracking-[0.2em] font-bold mb-2"
                        >
                            Initialize Connection
                        </p>
                        <div class="grid grid-cols-2 gap-2">
                            <a
                                href={CALENDAR_URL}
                                target="_blank"
                                class="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-foreground/[0.06] bg-foreground/[0.02] hover:bg-accent/10 hover:border-accent/20 transition-all text-[10px] text-foreground/50 hover:text-foreground/80"
                            >
                                <Calendar
                                    size={12}
                                    class="text-muted-foreground/60"
                                /><span>Schedule Call</span>
                            </a>
                            <a
                                href={COFFEE_URL}
                                target="_blank"
                                class="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-foreground/[0.06] bg-foreground/[0.02] hover:bg-highlight/10 hover:border-highlight/20 transition-all text-[10px] text-foreground/50 hover:text-foreground/80"
                            >
                                <Coffee
                                    size={12}
                                    class="text-muted-foreground/60"
                                /><span>Buy Coffee</span>
                            </a>
                        </div>
                    </div>

                    <div class="pt-2 flex gap-4">
                        <a
                            href={personal.socialLinks.github}
                            target="_blank"
                            class="text-foreground/20 hover:text-foreground/60 transition-colors"
                            ><Github size={16} /></a
                        >
                        <a
                            href={personal.socialLinks.linkedin}
                            target="_blank"
                            class="text-foreground/20 hover:text-primary/60 transition-colors"
                            ><Linkedin size={16} /></a
                        >
                    </div>
                </div>
            </GlassPanel>

            <!-- CTA -->
            <div class="contact-panel mt-2">
                <CtaLink
                    href={content.ctaSlug}
                    label={content.ctaLabel}
                    color="hsl(var(--accent))"
                />
            </div>
        </div>
    </svelte:fragment>
</MobileCarousel>
