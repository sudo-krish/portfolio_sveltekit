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
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <div
        role="dialog"
        aria-modal="true"
        aria-label="Credential detail"
        transition:fade={{ duration: 200 }}
        class="fixed inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-md p-4"
        onclick={(e) => {
            if (e.target === e.currentTarget) onclose();
        }}
        onkeydown={(e) => {
            if (e.key === 'Escape') onclose();
        }}
    >
        <div
            transition:scale={{ duration: 300, start: 0.95, opacity: 0 }}
            class="relative w-full max-w-[550px] flex flex-col p-8 rounded-[2rem] bg-[#0c0c0c] border border-foreground/15 shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden cursor-default"
            onclick={(e) => e.stopPropagation()}
        >
            <div
                class="absolute -top-32 -right-32 w-80 h-80 rounded-full blur-[100px] opacity-20 pointer-events-none"
                style="background-color: {item.color}"
            ></div>

            <button
                onclick={onclose}
                class="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-foreground/5 border border-foreground/10 hover:bg-foreground/15 text-foreground/50 hover:text-foreground transition-colors z-20"
            >
                <X size={18} />
            </button>

            <div class="relative z-10 flex flex-col">
                <div
                    class="flex items-start gap-5 mb-6 border-b border-foreground/[0.08] pb-6"
                >
                    <div
                        class="w-16 h-16 shrink-0 flex items-center justify-center rounded-2xl border shadow-inner"
                        style="background-color: {item.color}15; border-color: {item.color}40;"
                    >
                        <svelte:component
                            this={type === "cert" ? Award : BookOpen}
                            size={32}
                            style="color: {item.color}"
                        />
                    </div>
                    <div class="flex flex-col gap-1.5 pr-8 pt-1">
                        <h3
                            class="text-xl sm:text-2xl font-black text-foreground leading-tight"
                        >
                            {item.name}
                        </h3>
                        <div
                            class="flex flex-wrap items-center gap-2 font-mono text-[10px] sm:text-xs text-foreground/50 uppercase tracking-widest mt-1"
                        >
                            <span style="color: {item.color}"
                                >{item.issuer}</span
                            >
                            <span class="hidden sm:inline">·</span>
                            <span>{item.date}</span>
                        </div>
                    </div>
                </div>

                <div class="flex flex-col mb-8">
                    <h4
                        class="text-[10px] font-mono uppercase tracking-[0.2em] mb-3 font-bold"
                        style="color: {item.color}"
                    >
                        {type === "cert"
                            ? "Impact & Learning"
                            : "Abstract & Impact"}
                    </h4>
                    <p
                        class="text-[1rem] leading-[1.8] text-foreground/80 font-light"
                    >
                        {@html item.impact}
                    </p>
                </div>

                <div class="flex items-center justify-between mt-auto pt-4">
                    <div
                        class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 w-max"
                    >
                        <CheckCircle size={12} class="text-green-400" />
                        <span
                            class="text-[10px] font-bold text-green-400 tracking-widest uppercase"
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
                            class="flex items-center gap-2 text-xs font-bold text-foreground hover:text-foreground/70 transition-colors group"
                        >
                            View Original
                            <ExternalLink
                                size={14}
                                class="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                            />
                        </a>
                    {/if}
                </div>
            </div>
        </div>
    </div>
{/if}
