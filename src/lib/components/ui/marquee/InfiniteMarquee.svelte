<script lang="ts">
    import { Cpu } from "lucide-svelte";

    let {
        items = [],
        speed = "30s",
        pauseOnHover = true,
        direction = "left",
    } = $props<{
        items: string[];
        speed?: string;
        pauseOnHover?: boolean;
        direction?: "left" | "right";
    }>();

    // We duplicate the items array so it seamlessly loops without jumping
    const doubleItems = [...items, ...items, ...items];
</script>

<div
    class="relative flex w-full overflow-hidden"
    style="--marquee-speed: {speed};"
>
    <!-- Optional Fading edges for a premium look -->
    <div
        class="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"
    ></div>
    <div
        class="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"
    ></div>

    <!-- Marquee Track -->
    <div
        class="flex w-max min-w-full shrink-0 gap-3 py-2 {pauseOnHover
            ? 'hover:[animation-play-state:paused]'
            : ''}"
        class:animate-marquee-left={direction === "left"}
        class:animate-marquee-right={direction === "right"}
    >
        {#each doubleItems as tag, i}
            <div
                class="flex items-center gap-1.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-3.5 py-1.5 transition-colors hover:bg-primary/20 hover:border-primary/50 cursor-default"
            >
                <Cpu size={12} class="text-primary" />
                <span
                    class="font-mono text-[10px] font-bold uppercase tracking-widest text-white/90 whitespace-nowrap"
                >
                    {tag}
                </span>
            </div>
        {/each}
    </div>
</div>

<style>
    .animate-marquee-left {
        animation: scroll-left var(--marquee-speed) linear infinite;
    }
    .animate-marquee-right {
        animation: scroll-right var(--marquee-speed) linear infinite;
    }

    @keyframes scroll-left {
        from {
            transform: translateX(0);
        }
        to {
            transform: translateX(
                -33.33%
            ); /* Shifts exactly 1/3 since we tripled the array */
        }
    }
    @keyframes scroll-right {
        from {
            transform: translateX(-33.33%);
        }
        to {
            transform: translateX(0);
        }
    }
</style>
