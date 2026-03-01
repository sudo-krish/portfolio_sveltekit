<!-- src/lib/components/home/ContactCTA.svelte -->
<script lang="ts">
    import { onMount } from "svelte";
    import gsap from "gsap";
    import { ScrollTrigger } from "gsap/ScrollTrigger";
    import {
        Mail,
        Github,
        Linkedin,
        Instagram,
        Copy,
        Check,
        Terminal,
        Send,
        Coffee,
        Calendar,
        MapPin,
        ArrowRight,
    } from "lucide-svelte";
    import { Badge } from "$lib/components/ui/badge";
    import { getPersonalInfo } from "$lib/data/portfolio-data";

    const personal = getPersonalInfo();
    const COFFEE_URL = "https://buymeacoffee.com/krishnanandanil";
    const CALENDAR_URL = "https://calendly.com/krishnanandpanil";

    let copied = false;

    function copyEmail() {
        navigator.clipboard.writeText(personal.email);
        copied = true;
        setTimeout(() => {
            copied = false;
        }, 2000);
    }

    onMount(() => {
        gsap.registerPlugin(ScrollTrigger);
        const scroller = ".snap-container";

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".contact-wrapper",
                scroller: scroller,
                start: "top 70%",
                toggleActions: "play none none reverse",
            },
        });

        tl.fromTo(
            ".terminal-window",
            { x: -30, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        ).fromTo(
            ".action-card",
            { x: 30, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
            "-=0.4",
        );

        return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    });
</script>

<div
    class="contact-wrapper w-full h-full flex flex-col justify-center py-12 lg:py-0"
>
    <div
        class="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 lg:px-0"
    >
        <!-- LEFT COLUMN: THE TERMINAL (Span 5) -->
        <div
            class="lg:col-span-5 terminal-window relative flex flex-col h-full min-h-[400px]"
        >
            <!-- Decorative Line -->
            <div
                class="hidden lg:block absolute -left-6 top-6 bottom-6 w-px bg-gradient-to-b from-blue-500/50 to-transparent"
            ></div>

            <!-- Terminal Container -->
            <div
                class="h-full rounded-xl border border-white/10 bg-background/40 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)] flex flex-col overflow-hidden"
            >
                <!-- Terminal Header -->
                <div
                    class="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/5"
                >
                    <div class="flex gap-1.5">
                        <div class="w-3 h-3 rounded-full bg-red-500/80"></div>
                        <div
                            class="w-3 h-3 rounded-full bg-yellow-500/80"
                        ></div>
                        <div class="w-3 h-3 rounded-full bg-green-500/80"></div>
                    </div>
                    <div
                        class="ml-auto text-[10px] font-mono text-muted-foreground uppercase tracking-wider opacity-70"
                    >
                        ssh {personal.name
                            .toLowerCase()
                            .replace(" ", "")}@server
                    </div>
                </div>

                <!-- Terminal Body -->
                <div
                    class="flex-1 p-6 font-mono text-sm space-y-5"
                    style="text-shadow: 0 0 5px rgba(0, 255, 100, 0.15);"
                >
                    <!-- Status Check -->
                    <div class="space-y-1">
                        <div class="flex gap-2 text-muted-foreground">
                            <span class="text-green-500">➜</span>
                            <span class="text-blue-400">~</span> ./check_status.sh
                        </div>
                        <div
                            class="pl-4 text-xs text-muted-foreground/80 space-y-1"
                        >
                            <p>> Connecting to node...</p>
                            <p>
                                > Availability: <span
                                    class="text-green-400 font-bold"
                                    >OPEN_TO_WORK</span
                                >
                            </p>
                            <p>
                                > Latency: <span class="text-blue-400"
                                    >~24h Response</span
                                >
                            </p>
                        </div>
                    </div>

                    <!-- Location -->
                    <div class="space-y-1">
                        <div class="flex gap-2 text-muted-foreground">
                            <span class="text-green-500">➜</span>
                            <span class="text-blue-400">~</span> cat ./current_location.txt
                        </div>
                        <div
                            class="pl-4 text-xs text-yellow-400 flex items-center gap-2"
                        >
                            <MapPin size={12} /> "{personal.address.city}"
                        </div>
                    </div>

                    <!-- Quick Links -->
                    <div class="space-y-2 pt-4 border-t border-border/30">
                        <p
                            class="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-2"
                        >
                            Initialize Connection:
                        </p>

                        <div class="grid grid-cols-2 gap-3">
                            <a
                                href={CALENDAR_URL}
                                target="_blank"
                                class="flex items-center justify-center gap-2 p-3 rounded-lg bg-secondary/20 hover:bg-secondary/40 border border-border/50 transition-all group"
                            >
                                <Calendar
                                    size={14}
                                    class="group-hover:text-blue-400 transition-colors"
                                />
                                <span class="text-xs">Book Meeting</span>
                            </a>
                            <a
                                href={COFFEE_URL}
                                target="_blank"
                                class="flex items-center justify-center gap-2 p-3 rounded-lg bg-secondary/20 hover:bg-secondary/40 border border-border/50 transition-all group"
                            >
                                <Coffee
                                    size={14}
                                    class="group-hover:text-yellow-400 transition-colors"
                                />
                                <span class="text-xs">Buy Coffee</span>
                            </a>
                        </div>
                    </div>

                    <!-- Social Protocols -->
                    <div class="pt-2 flex gap-4">
                        <a
                            href={personal.socialLinks.github}
                            target="_blank"
                            class="text-muted-foreground hover:text-foreground transition-colors"
                            ><Github size={18} /></a
                        >
                        <a
                            href={personal.socialLinks.linkedin}
                            target="_blank"
                            class="text-muted-foreground hover:text-blue-500 transition-colors"
                            ><Linkedin size={18} /></a
                        >
                    </div>
                </div>
            </div>
        </div>

        <!-- RIGHT COLUMN: PRIMARY ACTION (Span 7) -->
        <div class="lg:col-span-7 action-card flex flex-col justify-center">
            <!-- Status Badge (Matches Hero) -->
            <div class="mb-6">
                <div
                    class="inline-flex items-center gap-2.5 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm"
                >
                    <span class="relative flex h-2 w-2">
                        <span
                            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"
                        ></span>
                        <span
                            class="relative inline-flex rounded-full h-2 w-2 bg-blue-500"
                        ></span>
                    </span>
                    <span
                        class="font-mono text-[10px] font-semibold text-blue-200 tracking-widest uppercase"
                    >
                        System Online
                    </span>
                </div>
            </div>

            <!-- Headline (Matches Warehouse/Hero Gradients) -->
            <h2
                class="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6"
            >
                Let's Engineer <br />
                <span
                    class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-300% animate-gradient"
                >
                    Your Next Big Scale.
                </span>
            </h2>

            <p
                class="text-lg text-muted-foreground max-w-xl mb-10 leading-relaxed"
            >
                I'm currently available for data architecture consulting and
                engineering roles. Have a complex pipeline to build? Let's talk.
            </p>

            <!-- Email Action Box -->
            <div class="relative w-full max-w-lg">
                <!-- Glow Effect behind box -->
                <div
                    class="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"
                ></div>

                <div
                    class="relative flex items-center bg-background border border-border rounded-lg p-2 pr-2 shadow-xl"
                >
                    <div
                        class="pl-4 flex-1 font-mono text-sm text-foreground truncate select-all"
                    >
                        {personal.email}
                    </div>

                    <div class="flex items-center gap-2">
                        <button
                            on:click={copyEmail}
                            class="p-2.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                            aria-label="Copy Email"
                        >
                            {#if copied}
                                <Check size={18} class="text-green-500" />
                            {:else}
                                <Copy size={18} />
                            {/if}
                        </button>

                        <a
                            href="mailto:{personal.email}"
                            class="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-all shadow-lg shadow-blue-500/20"
                        >
                            <span>Send</span>
                            <ArrowRight size={16} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    /* Reuse the gradient animation from your other components */
    .bg-300\% {
        background-size: 300% 300%;
    }
    .animate-gradient {
        animation: animatedgradient 6s ease infinite alternate;
    }

    @keyframes animatedgradient {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }
</style>
