<script lang="ts">
    import { TerminalSquare } from "lucide-svelte";
    import { Card } from "$lib/components/ui/card";

    // Import the shared hero text
    import { heroContent } from "$lib/data/hero_content";

    // Allow dynamic overrides from parent, but make them optional
    let props = $props<{
        metaLabel?: string;
        metaTitle?: string;
        main?: string;
        details?: string;
    }>();

    // Default to heroContent, but allow parent to override
    const metaLabel = props.metaLabel ?? heroContent.bioCard.metaLabel;
    const metaTitle = props.metaTitle ?? heroContent.bioCard.metaTitle;

    const main = props.main ?? heroContent.bioCard.main;
    const details = props.details ?? heroContent.bioCard.details;
</script>

<Card
    class="glass-shard relative w-full max-w-[800px] mb-8 rounded-[2rem] rounded-tl-[1rem] 
         bg-card/80 backdrop-blur-2xl border border-foreground/10 
         shadow-[0_30px_80px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.1)] overflow-hidden group"
>
    <!-- Soft background glow -->
    <div
        class="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
    ></div>

    <!-- Accent line top -->
    <div
        class="pointer-events-none absolute inset-x-0 top-0 h-[1px]
           bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50"
    ></div>

    <!-- Radial Glow Blob -->
    <div
        class="pointer-events-none absolute -right-20 -top-20
           w-64 h-64 rounded-full
           bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.3)_0%,transparent_60%)]
           opacity-60 dark:mix-blend-screen transition-opacity duration-700 group-hover:opacity-100"
    ></div>

    <div class="relative z-10 p-8 xl:p-10 flex flex-col gap-8">
        <!-- Floating Header Area -->
        <div class="flex items-start justify-between w-full">
            <div class="flex flex-col gap-1.5 mt-2">
                <span
                    class="font-mono text-[clamp(9px,1vw,11px)] tracking-[0.3em] uppercase text-primary/80 font-semibold drop-shadow-[0_0_8px_hsl(var(--primary)/0.3)]"
                >
                    {metaLabel}
                </span>
                <span
                    class="text-[clamp(12px,1.2vw,14px)] font-medium text-foreground/50 tracking-wide"
                >
                    {metaTitle}
                </span>
            </div>

            <!-- Floating Terminal Badge -->
            <div
                class="flex h-12 w-12 items-center justify-center rounded-2xl
                 bg-foreground/[0.03] border border-foreground/10 backdrop-blur-md
                 shadow-[0_8px_16px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.1)]
                 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shrink-0"
            >
                <TerminalSquare
                    size={22}
                    class="text-foreground/80 group-hover:text-primary transition-colors duration-500 drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]"
                />
            </div>
        </div>

        <!-- Main Statement (Pull Quote Style) -->
        <div class="relative pl-6 py-2 border-l-2 border-primary/40">
            <div
                class="absolute left-[-2px] top-0 w-[2px] h-1/3 bg-gradient-to-b from-primary to-transparent"
            ></div>
            <p
                class="text-[clamp(1.2rem,2vw,1.875rem)] leading-[1.4] text-foreground/95 font-medium tracking-tight"
            >
                {@html main}
            </p>
        </div>

        <!-- Details Box (Inner Frosted Glass) -->
        <div
            class="relative mt-2 p-6 rounded-2xl bg-foreground/[0.02] border border-foreground/[0.05] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
        >
            <p
                class="text-[clamp(0.85rem,1vw,1rem)] leading-[1.8] text-foreground/60"
            >
                {details}
            </p>
        </div>
    </div>
</Card>
