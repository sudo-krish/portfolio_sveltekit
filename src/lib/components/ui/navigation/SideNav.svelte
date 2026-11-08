<!-- src/lib/components/ui/navigation/SideNav.svelte -->
<script lang="ts">
    import { scrollTriggerTarget, activeSectionIndex } from "$lib/stores/scroll-store";

    const sections = [
        { id: "hero", label: "Platform Core", stage: "01", accent: "hsl(var(--primary))" },
        { id: "pipeline", label: "Kafka Conduits", stage: "02", accent: "hsl(38 92% 50%)" },
        { id: "datalake", label: "Hydrological Lake", stage: "03", accent: "hsl(160 84% 39%)" },
        { id: "lakehouse", label: "Compute Engine", stage: "04", accent: "hsl(217 91% 60%)" },
        { id: "warehouse", label: "OLAP Matrix", stage: "05", accent: "hsl(271 91% 65%)" },
        { id: "experience", label: "Career Ledger", stage: "06", accent: "hsl(350 89% 60%)" },
        { id: "techstack", label: "Cluster Nodes", stage: "07", accent: "hsl(173 80% 40%)" },
        { id: "github", label: "Code Topology", stage: "08", accent: "hsl(142 71% 45%)" },
        { id: "impact", label: "SLA Proof", stage: "09", accent: "hsl(24 95% 53%)" },
        { id: "credentials", label: "AWS Vault", stage: "10", accent: "hsl(38 92% 50%)" },
        { id: "contact", label: "Terminal Beacon", stage: "11", accent: "hsl(192 91% 48%)" },
    ];

    const handleClick = (id: string) => {
        scrollTriggerTarget.set(id);
    };
</script>

<!-- Hydrological Pipeline Navigation Rail (Desktop) -->
<nav 
    aria-label="Data Pipeline Stage Navigation"
    class="hidden lg:flex fixed left-3.5 top-1/2 -translate-y-1/2 z-[100] group/nav select-none"
>
    <div class="relative flex items-start">
        <!-- Blueprint Vertical Bus Trace -->
        <div class="flex flex-col items-center gap-1.5 py-3 px-2 pr-5 relative">
            <div class="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-px bg-border/50 pointer-events-none"></div>

            {#each sections as section, i (section.id)}
                {@const isActive = $activeSectionIndex === i}
                <button 
                    type="button"
                    class="relative z-10 flex items-center justify-center w-6 h-6 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 cursor-pointer"
                    onclick={(e) => {
                        e.stopPropagation();
                        handleClick(section.id);
                    }}
                    aria-label="Navigate to Stage {section.stage}: {section.label}"
                    aria-current={isActive ? "true" : undefined}
                >
                    <!-- Dot Node -->
                    <div 
                        class="rounded-full transition-all duration-300 ease-out
                            {isActive 
                                ? 'w-2.5 h-2.5 scale-110' 
                                : 'w-1.5 h-1.5 bg-foreground/25 hover:bg-foreground/70 hover:scale-125'}"
                        style={isActive ? `background-color: ${section.accent}; box-shadow: 0 0 10px ${section.accent};` : ""}
                    ></div>

                    <!-- Active Stage Ticker Rule -->
                    {#if isActive}
                        <div 
                            class="absolute -left-1 w-[2px] h-4 rounded-full transition-all duration-300"
                            style="background-color: {section.accent};"
                        ></div>
                    {/if}
                </button>
            {/each}
        </div>

        <!-- Expanded Architectural Stage Flyout Panel -->
        <div 
            class="absolute left-[34px] top-1/2 -translate-y-1/2 
                    transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
                    bg-card/95 backdrop-blur-2xl border border-border/85 rounded-2xl 
                    shadow-[var(--shadow-xl)]
                    py-2 min-w-[210px] overflow-hidden
                    opacity-0 scale-95 translate-x-[-6px] pointer-events-none
                    group-hover/nav:opacity-100 group-hover/nav:scale-100 group-hover/nav:translate-x-0 group-hover/nav:pointer-events-auto"
        >
            <!-- Top Specular Hairline -->
            <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent"></div>

            <!-- Panel Header -->
            <div class="px-3.5 py-1.5 pb-2 border-b border-border/60 flex items-center justify-between">
                <span class="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground/80">
                    Pipeline Stages
                </span>
                <span class="font-mono text-[9px] text-primary font-bold">
                    11 Steps
                </span>
            </div>

            <!-- Section Rows -->
            <div class="py-1">
                {#each sections as section, i (section.id)}
                    {@const isActive = $activeSectionIndex === i}
                    <button 
                        type="button"
                        class="w-full flex items-center justify-between gap-3 px-3.5 py-1.5 text-left transition-all duration-200 cursor-pointer
                               hover:bg-primary/10 active:bg-primary/15
                               {isActive ? 'bg-primary/12' : ''}"
                        onclick={() => handleClick(section.id)}
                    >
                        <div class="flex items-center gap-2.5 min-w-0">
                            <div 
                                class="w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-200"
                                style={isActive ? `background-color: ${section.accent}; box-shadow: 0 0 6px ${section.accent};` : "background-color: hsl(var(--border));"}
                            ></div>
                            <span 
                                class="text-[11.5px] font-heading font-semibold tracking-tight whitespace-nowrap truncate transition-colors duration-200
                                       {isActive ? 'text-foreground font-bold' : 'text-muted-foreground hover:text-foreground'}"
                            >
                                {section.label}
                            </span>
                        </div>
                        <span 
                            class="font-mono tabular-nums text-[9px] shrink-0 font-bold"
                            style={isActive ? `color: ${section.accent};` : "color: hsl(var(--muted-foreground) / 0.6);"}
                        >
                            {section.stage}
                        </span>
                    </button>
                {/each}
            </div>
        </div>
    </div>
</nav>
