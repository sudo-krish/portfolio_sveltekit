<!-- src/lib/components/ui/navigation/SideNav.svelte -->
<script lang="ts">
    import { scrollTriggerTarget, activeSectionIndex } from "$lib/stores/scroll-store";

    const sections = [
        { id: "hero", label: "Intro" },
        { id: "pipeline", label: "Pipeline" },
        { id: "datalake", label: "Data Lake" },
        { id: "lakehouse", label: "Lakehouse" },
        { id: "warehouse", label: "Warehouse" },
        { id: "experience", label: "Experience" },
        { id: "techstack", label: "Tech Stack" },
        { id: "github", label: "GitHub" },
        { id: "impact", label: "Impact" },
        { id: "credentials", label: "Credentials" },
        { id: "contact", label: "Contact" },
    ];

    let expanded = $state(false);

    const togglePanel = () => {
        expanded = !expanded;
    };

    const handleClick = (id: string) => {
        scrollTriggerTarget.set(id);
        expanded = false; // close on mobile after navigating
    };
</script>

<!-- Navigation (Desktop section rail; mobile uses bottom section controls) -->
<nav 
    aria-label="Section navigation"
    class="hidden lg:flex fixed left-3 top-1/2 -translate-y-1/2 z-[100] group/nav"
>
    <div class="relative flex items-start">
        <!-- Dots column -->
        <div class="flex flex-col items-center gap-1 py-3 px-1.5 pr-5">
            {#each sections as section, i}
                {@const isActive = $activeSectionIndex === i}
                <button 
                    type="button"
                    class="relative flex items-center justify-center w-6 h-5 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                    onclick={(e) => {
                        e.stopPropagation();
                        handleClick(section.id);
                    }}
                    aria-label="Navigate to {section.label}"
                    aria-current={isActive ? "true" : undefined}
                >
                    <div 
                        class="rounded-full transition-all duration-300 ease-out
                            {isActive 
                                ? 'w-2 h-2 bg-primary shadow-[0_0_8px_hsl(var(--primary)/0.5)]' 
                                : 'w-1.5 h-1.5 bg-foreground/25 hover:bg-foreground/65 hover:scale-125'}"
                    ></div>

                    {#if isActive}
                        <div class="absolute -left-0.5 w-[2px] h-3.5 rounded-full bg-primary transition-all duration-300"></div>
                    {/if}
                </button>
            {/each}
        </div>

        <!-- Expanded label panel -->
        <div 
            class="absolute left-[26px] top-1/2 -translate-y-1/2 
                    transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
                    bg-card/90 backdrop-blur-xl border border-border/80 rounded-xl 
                    shadow-[var(--shadow-lg)]
                    py-2 min-w-[164px]
                    opacity-0 scale-95 translate-x-[-4px] pointer-events-none
                    group-hover/nav:opacity-100 group-hover/nav:scale-100 group-hover/nav:translate-x-0 group-hover/nav:pointer-events-auto"
        >
            <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent rounded-t-xl"></div>

            {#each sections as section, i}
                {@const isActive = $activeSectionIndex === i}
                <button 
                    type="button"
                    class="w-full flex items-center justify-between gap-3 px-3.5 py-1.5 text-left transition-all duration-200 
                           hover:bg-primary/10 active:bg-primary/15
                           {isActive ? 'bg-primary/12' : ''}"
                    onclick={() => handleClick(section.id)}
                >
                    <div class="flex items-center gap-2.5">
                        <div class="w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-200 {isActive ? 'bg-primary' : 'bg-border'}"></div>
                        <span class="text-[11px] font-heading font-semibold tracking-tight whitespace-nowrap transition-colors duration-200 {isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}">
                            {section.label}
                        </span>
                    </div>
                    <span class="font-mono tabular-nums text-[9px] {isActive ? 'text-primary font-bold' : 'text-muted-foreground/70'}">
                        {String(i + 1).padStart(2, '0')}
                    </span>
                </button>
            {/each}
        </div>
    </div>
</nav>

