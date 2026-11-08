<!-- src/lib/components/ui/modal/Modal.svelte -->
<script lang="ts">
    import {
        Award,
        BookOpen,
        CheckCircle,
        X,
        ExternalLink,
    } from "lucide-svelte";
    import { fade, scale } from "svelte/transition";

    export let item: any = null;
    export let type: "cert" | "paper" = "cert";
    export let onclose: () => void;
</script>

{#if item}
    <!-- Dialog Container -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div
        role="dialog"
        aria-modal="true"
        aria-label="Credential detail"
        tabindex="-1"
        transition:fade={{ duration: 200 }}
        class="fixed inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-md p-4"
        onclick={(e) => {
            if (e.target === e.currentTarget) onclose();
        }}
        onkeydown={(e) => {
            if (e.key === "Escape") onclose();
        }}
    >
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <div
            transition:scale={{ duration: 250, start: 0.96, opacity: 0 }}
            class="relative w-full max-w-[540px] flex flex-col p-6 sm:p-8 rounded-2xl bg-card border border-border/80 shadow-[var(--shadow-xl)] overflow-hidden cursor-default"
            onclick={(e) => e.stopPropagation()}
        >
            <button
                onclick={onclose}
                aria-label="Close modal"
                class="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-lg bg-muted/70 border border-border/80 hover:bg-primary/12 hover:border-primary/40 text-muted-foreground hover:text-foreground transition-colors z-20 cursor-pointer"
            >
                <X size={16} />
            </button>

            <div class="relative z-10 flex flex-col">
                <div
                    class="flex items-start gap-4 mb-5 border-b border-border/70 pb-5"
                >
                    <div
                        class="w-13 h-13 shrink-0 flex items-center justify-center rounded-xl bg-primary/12 border border-primary/35 text-primary"
                    >
                        <svelte:component
                            this={type === "cert" ? Award : BookOpen}
                            size={26}
                        />
                    </div>
                    <div class="flex flex-col gap-1.5 pr-8">
                        <h3
                            class="text-lg sm:text-xl font-heading font-bold text-foreground leading-snug"
                        >
                            {item.name}
                        </h3>
                        <div
                            class="flex flex-wrap items-center gap-2 font-mono text-[11px] text-muted-foreground uppercase tracking-wider mt-0.5"
                        >
                            <span class="text-primary font-semibold">{item.issuer}</span>
                            <span>·</span>
                            <span class="tabular-nums">{item.date}</span>
                        </div>
                    </div>
                </div>

                <div class="flex flex-col mb-6">
                    <p
                        class="text-[0.95rem] leading-[1.72] text-muted-foreground mb-0"
                    >
                        {@html item.impact}
                    </p>
                </div>

                <div class="flex items-center justify-between mt-auto pt-4 border-t border-border/70">
                    <div
                        class="flex items-center gap-2 px-2.5 py-1 rounded-md bg-muted/70 border border-border/80 w-max"
                    >
                        <CheckCircle size={12} class="text-success" />
                        <span
                            class="text-[10px] font-mono font-semibold text-muted-foreground tracking-wider uppercase"
                        >
                            {type === "cert"
                                ? "Verified Credential"
                                : "Verified Publication"}
                        </span>
                    </div>

                    {#if item.url && item.url !== "#"}
                        <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/12 border border-primary/35 text-xs font-mono font-bold text-primary hover:bg-primary/20 transition-colors group no-underline"
                        >
                            View Original
                            <ExternalLink
                                size={13}
                                class="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                            />
                        </a>
                    {/if}
                </div>
            </div>
        </div>
    </div>
{/if}
