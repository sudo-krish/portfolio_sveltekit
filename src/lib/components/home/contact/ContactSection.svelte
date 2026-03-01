<!-- src/lib/components/home/contact/ContactSection.svelte -->
<!-- 3D: LEFT (x:-4.5) | Content: RIGHT -->
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
        ArrowRight,
    } from "lucide-svelte";
    import { getPersonalInfo } from "$lib/data/portfolio-data";
    import { getSectionContent } from "$lib/data/section-content";

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

<div
    class="relative w-full h-[100dvh] overflow-hidden pointer-events-none z-20"
>
    <div
        class="absolute top-1/3 right-[10%] w-[500px] h-[500px] bg-pink-500/[0.06] rounded-full blur-[120px]"
    ></div>

    <!-- Content: LEFT (3D on RIGHT) -->
    <div
        class="absolute top-[15%] md:top-[20%] left-[5%] md:left-[10%] w-full max-w-sm md:max-w-xl lg:max-w-2xl lg:w-[45%] flex flex-col gap-4"
    >
        <!-- SEO INTRO -->
        <p
            class="contact-panel pointer-events-auto text-[11px] leading-relaxed text-white/40 px-2"
        >
            {content.introParagraph}
        </p>

        <!-- MAIN CONTACT CARD -->
        <div
            class="contact-panel pointer-events-auto w-full border border-white/10 bg-black/40 backdrop-blur-2xl rounded-3xl shadow-2xl relative overflow-hidden"
        >
            <div
                class="absolute top-0 right-0 w-32 h-32 bg-pink-500/20 blur-[50px]"
            ></div>

            <!-- Terminal Header -->
            <div
                class="flex items-center gap-2 px-5 py-3 border-b border-white/[0.06] bg-white/[0.02]"
            >
                <div class="flex gap-1.5">
                    <div class="w-2.5 h-2.5 rounded-full bg-red-500/60"></div>
                    <div
                        class="w-2.5 h-2.5 rounded-full bg-yellow-500/60"
                    ></div>
                    <div class="w-2.5 h-2.5 rounded-full bg-green-500/60"></div>
                </div>
                <span class="ml-2 font-mono text-[10px] text-white/20"
                    >~/initialize_connection.sh</span
                >
            </div>

            <!-- Terminal Body -->
            <div
                class="p-6 lg:p-8 font-mono text-sm space-y-5 relative z-10"
                style="text-shadow: 0 0 5px rgba(236,72,153,0.1);"
            >
                <!-- Status -->
                <div class="space-y-1.5">
                    <div class="flex gap-2 text-white/30">
                        <span class="text-pink-400">➜</span>
                        <span class="text-white/60">whoami</span>
                    </div>
                    <p class="pl-6 text-white/80">{personal.name}</p>
                    <p class="pl-6 text-white/30 text-xs">
                        {personal.jobTitle} ·
                        <span class="text-green-400/60">Available for work</span
                        > · ~24h response
                    </p>
                </div>

                <!-- Location -->
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

                <!-- Email -->
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
                            <Check size={14} class="text-green-400 ml-auto" />
                        {:else}
                            <Copy
                                size={14}
                                class="text-white/20 ml-auto group-hover:text-white/40 transition-colors"
                            />
                        {/if}
                    </button>
                </div>

                <!-- Quick Actions -->
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
                            <Calendar size={14} class="text-pink-400/60" />
                            <span>Schedule Call</span>
                        </a>
                        <a
                            href={COFFEE_URL}
                            target="_blank"
                            class="flex items-center gap-2 px-4 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-amber-500/10 hover:border-amber-500/20 transition-all text-xs text-white/50 hover:text-white/80"
                        >
                            <Coffee size={14} class="text-amber-400/60" />
                            <span>Buy Coffee</span>
                        </a>
                    </div>
                </div>

                <!-- Social -->
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
        </div>

        <!-- CTA -->
        <div
            class="contact-panel pointer-events-auto px-6 py-3 border border-white/10 bg-black/40 backdrop-blur-2xl rounded-3xl"
        >
            <a
                href={content.ctaSlug}
                class="group/cta flex items-center gap-2 text-[11px] font-bold text-pink-400/70 hover:text-pink-400 transition-colors"
            >
                <span>{content.ctaLabel}</span>
                <ArrowRight
                    size={12}
                    class="group-hover/cta:translate-x-1 transition-transform"
                />
            </a>
        </div>
    </div>
</div>
