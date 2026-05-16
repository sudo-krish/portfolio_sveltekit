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

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<nav 
    aria-label="Section navigation"
    class="flex fixed left-2 lg:left-3 top-1/2 -translate-y-1/2 z-[100] group/nav"
>
    <div class="relative flex items-start">
        <!-- Dots column -->
        <div class="flex flex-col items-center gap-[5px] lg:gap-[6px] py-2.5 lg:py-3 px-[4px] lg:px-[5px] lg:pr-6">
            {#each sections as section, i}
                {@const isActive = $activeSectionIndex === i}
                <button 
                    class="relative flex items-center justify-center w-3 h-3"
                    onclick={(e) => {
                        e.stopPropagation();
                        // On mobile (no hover), tap dot to toggle panel
                        if (window.matchMedia('(hover: none)').matches) {
                            togglePanel();
                        } else {
                            handleClick(section.id);
                        }
                    }}
                    aria-label="Navigate to {section.label}"
                >
                    <div 
                        class="rounded-full transition-all duration-300 ease-out
                            {isActive 
                                ? 'w-[6px] h-[6px] lg:w-[7px] lg:h-[7px] bg-foreground shadow-[0_0_6px_rgba(255,255,255,0.3)]' 
                                : 'w-[4px] h-[4px] lg:w-[5px] lg:h-[5px] bg-foreground/25 hover:bg-foreground/60 hover:scale-150'}"
                    ></div>

                    {#if isActive}
                        <div class="absolute -left-[3px] w-[2px] h-3 rounded-full bg-foreground/70 transition-all duration-500"></div>
                    {/if}
                </button>
            {/each}
        </div>

        <!-- Expanded label panel -->
        <!-- Desktop: hover via group/nav, Mobile: tap via `expanded` state -->
        <div 
            class="absolute left-[20px] lg:left-[23px] top-1/2 -translate-y-1/2 
                    transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]
                    bg-card/80 backdrop-blur-2xl border border-foreground/[0.08] rounded-2xl 
                    shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.05)]
                    py-2 min-w-[130px] lg:min-w-[140px]
                    {expanded 
                        ? 'opacity-100 scale-100 translate-x-0 pointer-events-auto' 
                        : 'opacity-0 scale-95 translate-x-[-4px] pointer-events-none lg:group-hover/nav:opacity-100 lg:group-hover/nav:scale-100 lg:group-hover/nav:translate-x-0 lg:group-hover/nav:pointer-events-auto'}"
        >
            <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent rounded-t-2xl"></div>

            {#each sections as section, i}
                {@const isActive = $activeSectionIndex === i}
                <button 
                    class="w-full flex items-center gap-2.5 px-4 py-[7px] text-left transition-all duration-200 
                           hover:bg-foreground/[0.05] active:bg-foreground/[0.08]
                           {isActive ? 'bg-foreground/[0.04]' : ''}"
                    onclick={() => handleClick(section.id)}
                >
                    <div class="w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-200 {isActive ? 'bg-foreground' : 'bg-foreground/20'}"></div>
                    <span class="text-[11px] font-semibold tracking-wide whitespace-nowrap transition-colors duration-200 {isActive ? 'text-foreground' : 'text-foreground/50 hover:text-foreground/80'}">
                        {section.label}
                    </span>
                </button>
            {/each}
        </div>
    </div>
</nav>

<!-- Backdrop to close panel on mobile tap-away -->
{#if expanded}
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div class="fixed inset-0 z-[99] lg:hidden" onclick={() => expanded = false}></div>
{/if}

