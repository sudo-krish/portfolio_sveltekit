<!-- src/routes/contact/+page.svelte -->
<script lang="ts">
    import Navigation from "$lib/components/Navigation.svelte";
    import { Mail, Linkedin, Github, LayoutGrid, Radio } from "lucide-svelte";
</script>

<svelte:head>
    <title>Reach Me | Krishnanand Anil</title>
    <meta
        name="description"
        content="Contact Krishnanand Anil for Data Engineering, Cloud Architecture, and Real-Time Systems consulting."
    />
</svelte:head>

<div
    class="min-h-screen bg-background selection:bg-primary/30 selection:text-primary-foreground font-sans bg-grid-pattern relative overflow-hidden"
>
    <!-- Background Glows -->
    <div class="fixed inset-0 pointer-events-none z-0 bg-radial-gradient"></div>

    <Navigation />

    <main
        class="relative z-10 pt-32 pb-24 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto"
    >
        <header class="mb-20">
            <div
                class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 mb-8"
            >
                <div class="relative flex h-2.5 w-2.5">
                    <span
                        class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
                    ></span>
                    <span
                        class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"
                    ></span>
                </div>
                <span
                    class="font-mono text-[11px] font-bold text-emerald-400 tracking-widest uppercase"
                >
                    Open for Full-Time & Consulting
                </span>
            </div>

            <h1
                class="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight"
            >
                Let's Build <br class="hidden md:block" />
                <span
                    class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-300 to-blue-400 bg-300% animate-gradient"
                    >Something.</span
                >
            </h1>
            <p
                class="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
            >
                I architect high-throughput data platforms and AI-ready systems.
                If your pipeline is failing at scale, or you need a senior
                engineer to drive the next evolution, reach out.
            </p>
        </header>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Direct Email Card -->
            <a
                href="mailto:krishnanandpanil@gmail.com"
                class="group relative flex flex-col items-center justify-center p-10 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-md transition-all duration-500 hover:border-blue-500/30 hover:bg-blue-950/20 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.2)] hover:-translate-y-1 text-center overflow-hidden"
            >
                <!-- Animated Hover Gradient -->
                <div
                    class="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                ></div>

                <div class="relative z-10">
                    <div
                        class="inline-flex p-4 rounded-2xl bg-white/5 border border-white/10 mb-6 group-hover:bg-blue-500/20 group-hover:border-blue-500/30 group-hover:scale-110 transition-all duration-500"
                    >
                        <Mail size={32} class="text-blue-400" />
                    </div>
                    <h3
                        class="text-xl font-bold mb-2 text-foreground group-hover:text-blue-100 transition-colors"
                    >
                        Direct Email
                    </h3>
                    <p
                        class="text-sm text-muted-foreground font-mono group-hover:text-blue-300 transition-colors"
                    >
                        krishnanandpanil@gmail.com
                    </p>
                </div>
            </a>

            <!-- LinkedIn Card -->
            <a
                href="https://www.linkedin.com/in/krishnanand-anil/"
                target="_blank"
                class="group relative flex flex-col items-center justify-center p-10 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-md transition-all duration-500 hover:border-blue-500/30 hover:bg-blue-950/20 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.2)] hover:-translate-y-1 text-center overflow-hidden"
            >
                <div
                    class="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                ></div>

                <div class="relative z-10">
                    <div
                        class="inline-flex p-4 rounded-2xl bg-white/5 border border-white/10 mb-6 group-hover:bg-[#0A66C2]/20 group-hover:border-[#0A66C2]/30 group-hover:scale-110 transition-all duration-500"
                    >
                        <Linkedin
                            size={32}
                            class="text-blue-400 group-hover:text-[#0A66C2] transition-colors"
                        />
                    </div>
                    <h3
                        class="text-xl font-bold mb-2 text-foreground group-hover:text-blue-100 transition-colors"
                    >
                        Professional Network
                    </h3>
                    <p
                        class="text-sm text-muted-foreground font-mono group-hover:text-blue-300 transition-colors"
                    >
                        linkedin.com/in/krishnanand-anil
                    </p>
                </div>
            </a>

            <!-- GitHub Card -->
            <a
                href="https://github.com/sudo-krish"
                target="_blank"
                class="group relative flex flex-col items-center justify-center p-10 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-md transition-all duration-500 hover:border-blue-500/30 hover:bg-blue-950/20 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.2)] hover:-translate-y-1 text-center overflow-hidden"
            >
                <div
                    class="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                ></div>

                <div class="relative z-10">
                    <div
                        class="inline-flex p-4 rounded-2xl bg-white/5 border border-white/10 mb-6 group-hover:bg-white/10 group-hover:border-white/30 group-hover:scale-110 transition-all duration-500"
                    >
                        <Github
                            size={32}
                            class="text-blue-400 group-hover:text-white transition-colors"
                        />
                    </div>
                    <h3
                        class="text-xl font-bold mb-2 text-foreground group-hover:text-blue-100 transition-colors"
                    >
                        Open Source
                    </h3>
                    <p
                        class="text-sm text-muted-foreground font-mono group-hover:text-blue-300 transition-colors"
                    >
                        github.com/sudo-krish
                    </p>
                </div>
            </a>

            <!-- Meeting Card (Span 2 columns on large screens) -->
            <div
                class="lg:col-span-3 relative p-12 rounded-2xl bg-gradient-to-br from-blue-950/40 to-background border border-blue-500/20 flex flex-col md:flex-row items-center justify-between text-center md:text-left overflow-hidden group hover:border-blue-500/40 transition-colors"
            >
                <div
                    class="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                ></div>

                <div class="relative z-10 mb-8 md:mb-0 max-w-lg">
                    <div
                        class="inline-flex items-center gap-2 text-blue-400 font-mono text-[10px] tracking-widest uppercase mb-4"
                    >
                        <Radio size={12} /> Live Discussion
                    </div>
                    <h3 class="text-3xl font-bold text-blue-100 mb-3">
                        Schedule an Exploration Call
                    </h3>
                    <p
                        class="text-blue-200/60 text-sm md:text-base leading-relaxed"
                    >
                        Want to discuss a complex architecture, potential
                        collaboration, or consulting engagement? Let's get on a
                        call to map out the strategy.
                    </p>
                </div>

                <div class="relative z-10 flex flex-col items-center">
                    <button
                        disabled
                        class="px-8 py-4 bg-white/5 border border-white/10 text-muted-foreground rounded-xl cursor-not-allowed flex items-center gap-3 font-semibold tracking-wide transition-all"
                    >
                        <LayoutGrid size={18} />
                        Integration Coming Soon
                    </button>
                    <span
                        class="text-[10px] font-mono text-muted-foreground/50 mt-4 uppercase tracking-widest"
                    >
                        Currently Updating Calendar
                    </span>
                </div>
            </div>
        </div>
    </main>
</div>

<style>
    /* Background Grid Pattern */
    .bg-grid-pattern {
        background-size: 50px 50px;
        background-image: linear-gradient(
                to right,
                rgba(255, 255, 255, 0.03) 1px,
                transparent 1px
            ),
            linear-gradient(
                to bottom,
                rgba(255, 255, 255, 0.03) 1px,
                transparent 1px
            );
    }

    /* Ambient Glow */
    .bg-radial-gradient {
        background: radial-gradient(
            circle at 50% 0%,
            rgba(59, 130, 246, 0.15) 0%,
            transparent 50%
        );
    }

    /* Gradient Animation */
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
