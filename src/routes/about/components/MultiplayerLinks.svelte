<script lang="ts">
    import { Mail, Github, Linkedin, Wifi } from "lucide-svelte";
    export let personal: any;
</script>

<!-- Retro "Multiplayer" connection panel styled like a Pokemon link cable menu -->
<div class="w-full mt-8">
    <!-- Header bar -->
    <div class="flex items-center gap-3 mb-2 px-2">
        <div
            class="w-8 h-8 bg-[#346856] text-white rounded flex items-center justify-center border-2 border-[#1a3a2a] shadow-[2px_2px_0_#1a3a2a]"
        >
            <Wifi size={18} />
        </div>
        <h2
            class="retro-font text-white text-2xl drop-shadow-[2px_2px_0_#000] tracking-wider"
        >
            MULTIPLAYER
        </h2>
        <div class="flex-1 h-[2px] bg-[#346856] ml-2 opacity-50"></div>
    </div>

    <!-- Connection card -->
    <div
        class="w-full bg-[#1a2332] border-[6px] border-[#346856] rounded-lg p-4 sm:p-6 shadow-[0_8px_0_rgba(0,0,0,0.4)] relative overflow-hidden"
    >
        <!-- Subtle scan-line effect -->
        <div
            class="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.15)_2px,rgba(0,0,0,0.15)_4px)] pointer-events-none z-0"
        ></div>

        <!-- Decorative inner border -->
        <div
            class="absolute inset-1 border-[2px] border-[#346856] rounded-sm pointer-events-none opacity-30"
        ></div>

        <div class="relative z-10">
            <p
                class="retro-font text-[#88c070] text-base sm:text-lg mb-4 text-center"
            >
                Connect via LINK CABLE:
            </p>

            <div
                class="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
            >
                <a
                    href="mailto:{personal.email}"
                    class="retro-link group"
                >
                    <div class="retro-link-icon bg-[#e3350d]">
                        <Mail size={16} class="text-white" />
                    </div>
                    <span class="retro-link-text">EMAIL</span>
                    <div class="retro-link-arrow">▶</div>
                </a>

                <a
                    href="https://github.com/sudo-krish"
                    target="_blank"
                    class="retro-link group"
                >
                    <div class="retro-link-icon bg-[#f8f8f8]">
                        <Github size={16} class="text-[#333]" />
                    </div>
                    <span class="retro-link-text">GITHUB</span>
                    <div class="retro-link-arrow">▶</div>
                </a>

                <a
                    href={personal.socialLinks.linkedin}
                    target="_blank"
                    class="retro-link group"
                >
                    <div class="retro-link-icon bg-[#0077b5]">
                        <Linkedin size={16} class="text-white" />
                    </div>
                    <span class="retro-link-text">LINKEDIN</span>
                    <div class="retro-link-arrow">▶</div>
                </a>
            </div>

            <!-- Blinking status indicator -->
            <div
                class="flex items-center justify-center gap-2 mt-4 pt-3 border-t border-[#346856]/40"
            >
                <div
                    class="w-2 h-2 rounded-full bg-[#48d0b0] animate-pulse shadow-[0_0_6px_#48d0b0]"
                ></div>
                <span class="retro-font text-[#48d0b0] text-sm tracking-widest"
                    >STATUS: ONLINE</span
                >
            </div>
        </div>
    </div>
</div>

<style>
    .retro-font {
        font-family: "VT323", monospace, "Courier New", Courier;
        letter-spacing: 0.05em;
    }

    .retro-link {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background: #0d1520;
        border: 3px solid #346856;
        border-radius: 6px;
        padding: 0.5rem 0.75rem;
        text-decoration: none;
        transition: all 0.15s ease;
        box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.5);
    }
    .retro-link:hover {
        background: #162030;
        border-color: #48d0b0;
        transform: translateY(-2px);
        box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.5);
        text-shadow: none;
    }
    .retro-link:active {
        transform: translateY(1px);
        box-shadow: 1px 1px 0 rgba(0, 0, 0, 0.5);
    }

    .retro-link-icon {
        width: 28px;
        height: 28px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid rgba(0, 0, 0, 0.3);
        flex-shrink: 0;
    }

    .retro-link-text {
        font-family: "VT323", monospace, "Courier New", Courier;
        color: #e8e8e8;
        font-size: 1.1rem;
        letter-spacing: 0.1em;
        font-weight: bold;
    }

    .retro-link-arrow {
        font-family: "VT323", monospace;
        color: #346856;
        font-size: 0.75rem;
        opacity: 0;
        transition: opacity 0.15s ease, transform 0.15s ease;
        transform: translateX(-4px);
    }
    .retro-link:hover .retro-link-arrow {
        opacity: 1;
        transform: translateX(0);
        color: #48d0b0;
    }
</style>
