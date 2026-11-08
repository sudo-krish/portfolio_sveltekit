<!-- src/lib/components/ui/cards/GlassCard.svelte -->
<!--
  Architectural Specification Sheet Surface.
  Every surface on the homepage uses this component.
  Variants: "default" | "compact" | "inset" control visual density.
  Includes interactive pointer-tracking specular spotlight and blueprint corner marks.
-->
<script lang="ts">
    import type { Snippet } from "svelte";

    let {
        variant = "default",
        accent = "hsl(var(--primary))",
        hover = true,
        class: className = "",
        style: extraStyle = "",
        href = "",
        target = "",
        rel = "",
        onclick,
        children,
    } = $props<{
        /** Visual density: "default" for main cards, "compact" for grid items, "inset" for inner detail boxes */
        variant?: "default" | "compact" | "inset";
        /** CSS color value for the left accent line and ambient glow */
        accent?: string;
        /** Enable hover effects (lift + glow) */
        hover?: boolean;
        /** Additional CSS classes */
        class?: string;
        /** Inline style overrides */
        style?: string;
        /** If provided, renders as an anchor tag */
        href?: string;
        /** Target attribute for anchor tag */
        target?: string;
        /** Rel attribute for anchor tag */
        rel?: string;
        /** If provided, renders as a button tag */
        onclick?: (event: MouseEvent) => void;
        children?: Snippet;
    }>();

    type VariantConfig = {
        rounded: string;
        pad: string;
        bg: string;
        blur: string;
        shadow: string;
        shadowHover: string;
    };
    const base: Record<string, VariantConfig> = {
        default: {
            rounded: "rounded-2xl",
            pad: "padding: max(1.25rem, 1.25cqi);",
            bg: "bg-card/88",
            blur: "backdrop-blur-xl",
            shadow: "shadow-[var(--shadow-md)]",
            shadowHover: "hover:shadow-[var(--shadow-lg)] hover:-translate-y-0.5 active:scale-[0.99]",
        },
        compact: {
            rounded: "rounded-xl",
            pad: "padding: max(0.65rem, 0.7cqi);",
            bg: "bg-card/82",
            blur: "backdrop-blur-lg",
            shadow: "shadow-[var(--shadow-sm)]",
            shadowHover: "hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5 active:scale-[0.98]",
        },
        inset: {
            rounded: "rounded-lg",
            pad: "padding: max(0.9rem, 0.9cqi);",
            bg: "bg-muted/45",
            blur: "backdrop-blur-sm",
            shadow: "shadow-none",
            shadowHover: "",
        },
    };

    const v = $derived(base[variant] ?? base.default);

    function handlePointerMove(e: PointerEvent) {
        const el = e.currentTarget as HTMLElement | null;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
        el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
    }
</script>

{#snippet cardDecorations()}
    <!-- Interactive Pointer-Tracking Specular Spotlight -->
    {#if hover && variant !== "inset"}
        <div
            class="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style="background: radial-gradient(320px circle at var(--spot-x, 50%) var(--spot-y, 0%), hsl(var(--primary) / 0.08), transparent 70%);"
        ></div>
    {/if}

    <!-- Hairline top highlight -->
    <div
        class="pointer-events-none absolute inset-x-0 top-0 h-px
               bg-gradient-to-r from-transparent via-primary/35 to-transparent opacity-75 group-hover:opacity-100 transition-opacity duration-300"
    ></div>

    <!-- Left 1px specification rule -->
    {#if variant !== "inset"}
        <div
            class="pointer-events-none absolute inset-y-0 left-0 w-px
                   opacity-55 {hover ? 'group-hover:opacity-95' : ''} transition-opacity duration-300"
            style="background: linear-gradient(to bottom, transparent, var(--_accent, hsl(var(--primary))) 50%, transparent);"
        ></div>
    {/if}

    <!-- Subtle Architectural Corner Registration Ticks (Default cards) -->
    {#if variant === "default"}
        <div
            class="pointer-events-none absolute top-2.5 right-2.5 w-2 h-2 border-t border-r border-primary/30 group-hover:border-primary/65 transition-colors duration-300 rounded-tr-[2px]"
        ></div>
        <div
            class="pointer-events-none absolute bottom-2.5 left-2.5 w-2 h-2 border-b border-l border-primary/25 group-hover:border-primary/55 transition-colors duration-300 rounded-bl-[2px]"
        ></div>
    {/if}
{/snippet}

{#if href}
    <a
        {href}
        {target}
        {rel}
        onpointermove={handlePointerMove}
        class="group {v.rounded} {v.bg} {v.blur} {v.shadow}
               border border-border/85
               {hover ? `${v.shadowHover} hover:border-primary/45` : ''}
               relative block overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] no-underline
               {className}"
        style="{v.pad} --_accent: {accent}; {extraStyle}"
    >
        {@render cardDecorations()}
        <div class="relative z-10 h-full flex flex-col">
            {#if children}
                {@render children()}
            {/if}
        </div>
    </a>
{:else if onclick}
    <button
        type="button"
        {onclick}
        onpointermove={handlePointerMove}
        class="group {v.rounded} {v.bg} {v.blur} {v.shadow}
               border border-border/85
               {hover ? `${v.shadowHover} hover:border-primary/45` : ''}
               relative block overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] text-left
               {className}"
        style="{v.pad} --_accent: {accent}; {extraStyle}"
    >
        {@render cardDecorations()}
        <div class="relative z-10 h-full flex flex-col">
            {#if children}
                {@render children()}
            {/if}
        </div>
    </button>
{:else}
    <div
        onpointermove={handlePointerMove}
        role="presentation"
        class="group {v.rounded} {v.bg} {v.blur} {v.shadow}
               border border-border/85
               {hover ? 'hover:border-primary/40' : ''}
               relative overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
               {className}"
        style="{v.pad} --_accent: {accent}; {extraStyle}"
    >
        {@render cardDecorations()}
        <div class="relative z-10 h-full flex flex-col">
            {#if children}
                {@render children()}
            {/if}
        </div>
    </div>
{/if}
