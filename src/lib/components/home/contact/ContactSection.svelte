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
    import { getPersonalInfo } from "$lib/data/portfolio-data";
    import { getSectionContent } from "$lib/data/section-content";
    import GlassPanel from "$lib/components/ui/GlassPanel.svelte";
    import CtaLink from "$lib/components/ui/CtaLink.svelte";
    import GlowAccent from "$lib/components/ui/GlowAccent.svelte";
    import MobileCarousel from "$lib/components/ui/MobileCarousel.svelte";

    const personal = getPersonalInfo();
    const content = getSectionContent("contact")!;

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

<MobileCarousel
    layout="right"
    sectionTitle="Contact"
    sectionDescription="Let's build something together"
    accentColor="#ec4899"
>
    <!-- DESKTOP / TABLET (Original Preserved floating layout) -->
    <svelte:fragment slot="content-pc">
        <GlowAccent color="#ec4899" position="top-1/3 left-[10%]" />

        <!-- MAIN CONTENT CARD (RIGHT SIDE PC) -->
        <div
            class="absolute top-[18%] right-[8%] w-full max-w-lg lg:max-w-xl z-20 pointer-events-auto flex flex-col gap-6"
        >
            <p
                class="contact-panel text-sm lg:text-base text-white/50 px-2 shrink-0 font-light leading-relaxed"
            >
                {content.introParagraph}
            </p>

            <!-- TERMINAL CONTACT CARD -->
            <GlassPanel
                glow="#ec4899"
                className="contact-panel w-full shrink-0 rounded-3xl relative overflow-hidden shadow-2xl shadow-pink-900/10"
            >
                <!-- Terminal Header -->
                <div
                    class="flex items-center gap-2 px-5 py-3 border-b border-white/[0.06] bg-white/[0.02]"
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
                    <span class="ml-2 font-mono text-[10px] text-white/20"
                        >~/initialize_connection.sh</span
                    >
                </div>

                <div
                    class="p-6 font-mono text-sm space-y-5"
                    style="text-shadow: 0 0 5px rgba(236,72,153,0.1);"
                >
                    <div class="space-y-1.5">
                        <div class="flex gap-2 text-white/30">
                            <span class="text-pink-400">➜</span>
                            <span class="text-white/60">whoami</span>
                        </div>
                        <p class="pl-6 text-white/80">{personal.name}</p>
                        <p class="pl-6 text-white/30 text-xs">
                            {personal.jobTitle} ·
                            <span class="text-green-400/60"
                                >Available for work</span
                            > · ~24h response
                        </p>
                    </div>

                    <div class="space-y-1">
                        <div class="flex gap-2 text-white/30">
                            <span class="text-pink-400">➜</span>
                            <span class="text-white/60">cat location.env</span>
                        </div>
                        <p
                            class="pl-6 text-white/50 flex items-center gap-1.5 text-xs"
                        >
                            <MapPin size={12} /> "{personal.address.city}"
                        </p>
                    </div>

                    <div class="space-y-2">
                        <div class="flex gap-2 text-white/30">
                            <span class="text-pink-400">➜</span>
                            <span class="text-white/60">echo $CONTACT</span>
                        </div>
                        <button
                            on:click={copyEmail}
                            class="ml-6 flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-pink-500/10 hover:border-pink-500/20 transition-all group"
                        >
                            <Mail size={14} class="text-pink-400/60" />
                            <span
                                class="text-xs text-white/60 group-hover:text-white/80 transition-colors"
                                >{personal.email}</span
                            >
                            {#if copied}
                                <Check
                                    size={14}
                                    class="text-green-400 ml-auto"
                                />
                            {:else}
                                <Copy
                                    size={14}
                                    class="text-white/20 ml-auto group-hover:text-white/40 transition-colors"
                                />
                            {/if}
                        </button>
                    </div>

                    <div class="pt-4 border-t border-white/[0.06] space-y-2">
                        <p
                            class="text-[10px] text-white/20 uppercase tracking-[0.2em] font-bold mb-3"
                        >
                            Initialize Connection
                        </p>
                        <div class="grid grid-cols-2 gap-3">
                            <a
                                href={CALENDAR_URL}
                                target="_blank"
                                class="flex items-center gap-2 px-4 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-pink-500/10 hover:border-pink-500/20 transition-all text-xs text-white/50 hover:text-white/80"
                            >
                                <Calendar
                                    size={14}
                                    class="text-pink-400/60"
                                /><span>Schedule Call</span>
                            </a>
                            <a
                                href={COFFEE_URL}
                                target="_blank"
                                class="flex items-center gap-2 px-4 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-amber-500/10 hover:border-amber-500/20 transition-all text-xs text-white/50 hover:text-white/80"
                            >
                                <Coffee
                                    size={14}
                                    class="text-amber-400/60"
                                /><span>Buy Coffee</span>
                            </a>
                        </div>
                    </div>

                    <div class="pt-3 flex gap-4">
                        <a
                            href={personal.socialLinks.github}
                            target="_blank"
                            class="text-white/20 hover:text-white/60 transition-colors"
                            ><Github size={18} /></a
                        >
                        <a
                            href={personal.socialLinks.linkedin}
                            target="_blank"
                            class="text-white/20 hover:text-blue-400/60 transition-colors"
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
                    color="#ec4899"
                />
            </div>
        </div>
    </svelte:fragment>

    <!-- MOBILE / SMALL TABLET (Carousel Slide Layout) -->
    <svelte:fragment slot="content-mobile">
        <div
            class="z-20 w-full max-w-lg mx-auto pointer-events-auto flex flex-col gap-4 mt-4"
        >
            <p
                class="contact-panel text-xs sm:text-sm leading-relaxed text-white/50 px-2 shrink-0 font-light"
            >
                {content.introParagraph}
            </p>

            <!-- TERMINAL CONTACT CARD -->
            <GlassPanel
                glow="#ec4899"
                className="contact-panel w-full shrink-0 rounded-3xl relative overflow-hidden shadow-2xl shadow-pink-900/10"
            >
                <!-- Terminal Header -->
                <div
                    class="flex items-center gap-2 px-5 py-3 border-b border-white/[0.06] bg-white/[0.02]"
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
                    <span class="ml-2 font-mono text-[9px] text-white/20"
                        >~/initialize_connection.sh</span
                    >
                </div>

                <div
                    class="p-4 sm:p-5 font-mono text-xs space-y-4"
                    style="text-shadow: 0 0 5px rgba(236,72,153,0.1);"
                >
                    <div class="space-y-1">
                        <div class="flex gap-2 text-white/30">
                            <span class="text-pink-400">➜</span>
                            <span class="text-white/60">whoami</span>
                        </div>
                        <p class="pl-5 text-white/80">{personal.name}</p>
                        <p class="pl-5 text-white/30 text-[10px]">
                            {personal.jobTitle} ·
                            <span class="text-green-400/60"
                                >Available for work</span
                            > · ~24h response
                        </p>
                    </div>

                    <div class="space-y-1">
                        <div class="flex gap-2 text-white/30">
                            <span class="text-pink-400">➜</span>
                            <span class="text-white/60">cat location.env</span>
                        </div>
                        <p
                            class="pl-5 text-white/50 flex items-center gap-1.5 text-[10px]"
                        >
                            <MapPin size={12} /> "{personal.address.city}"
                        </p>
                    </div>

                    <div class="space-y-2">
                        <div class="flex gap-2 text-white/30">
                            <span class="text-pink-400">➜</span>
                            <span class="text-white/60">echo $CONTACT</span>
                        </div>
                        <button
                            on:click={copyEmail}
                            class="ml-5 flex items-center gap-2 px-3 py-2 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-pink-500/10 hover:border-pink-500/20 transition-all group"
                        >
                            <Mail size={12} class="text-pink-400/60" />
                            <span
                                class="text-[10px] text-white/60 group-hover:text-white/80 transition-colors"
                                >{personal.email}</span
                            >
                            {#if copied}
                                <Check
                                    size={12}
                                    class="text-green-400 ml-auto"
                                />
                            {:else}
                                <Copy
                                    size={12}
                                    class="text-white/20 ml-auto group-hover:text-white/40 transition-colors"
                                />
                            {/if}
                        </button>
                    </div>

                    <div class="pt-3 border-t border-white/[0.06] space-y-2">
                        <p
                            class="text-[9px] text-white/20 uppercase tracking-[0.2em] font-bold mb-2"
                        >
                            Initialize Connection
                        </p>
                        <div class="grid grid-cols-2 gap-2">
                            <a
                                href={CALENDAR_URL}
                                target="_blank"
                                class="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-pink-500/10 hover:border-pink-500/20 transition-all text-[10px] text-white/50 hover:text-white/80"
                            >
                                <Calendar
                                    size={12}
                                    class="text-pink-400/60"
                                /><span>Schedule Call</span>
                            </a>
                            <a
                                href={COFFEE_URL}
                                target="_blank"
                                class="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-amber-500/10 hover:border-amber-500/20 transition-all text-[10px] text-white/50 hover:text-white/80"
                            >
                                <Coffee
                                    size={12}
                                    class="text-amber-400/60"
                                /><span>Buy Coffee</span>
                            </a>
                        </div>
                    </div>

                    <div class="pt-2 flex gap-4">
                        <a
                            href={personal.socialLinks.github}
                            target="_blank"
                            class="text-white/20 hover:text-white/60 transition-colors"
                            ><Github size={16} /></a
                        >
                        <a
                            href={personal.socialLinks.linkedin}
                            target="_blank"
                            class="text-white/20 hover:text-blue-400/60 transition-colors"
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
                    color="#ec4899"
                />
            </div>
        </div>
    </svelte:fragment>
</MobileCarousel>
