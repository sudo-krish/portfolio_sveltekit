<!-- src/lib/components/ui/cards/GlassCard.svelte -->
<!--
  Architectural Specification Sheet Surface.
  Every surface on the homepage uses this component.
  Variants: "default" | "compact" | "inset" control visual density.
  Accent color is passed as a CSS custom property for max flexibility.
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

    type VariantConfig = { rounded: string; pad: string; bg: string; blur: string; shadow: string; shadowHover: string };
    const base: Record<string, VariantConfig> = {
        default: {
            rounded: "rounded-2xl",
            pad: "padding: max(1.25rem, 1.25cqi);",
            bg: "bg-card/85",
            blur: "backdrop-blur-xl",
            shadow: "shadow-[var(--shadow-md)]",
            shadowHover: "hover:shadow-[var(--shadow-lg)] hover:-translate-y-0.5",
        },
        compact: {
            rounded: "rounded-xl",
            pad: "padding: max(0.65rem, 0.7cqi);",
            bg: "bg-card/78",
            blur: "backdrop-blur-lg",
            shadow: "shadow-[var(--shadow-sm)]",
            shadowHover: "hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5",
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
</script>

{#if href}
    <a
        {href}
        {target}
        {rel}
        class="{v.rounded} {v.bg} {v.blur} {v.shadow}
               border border-border/80
               {hover ? `${v.shadowHover} hover:border-primary/45` : ''}
               relative block overflow-hidden transition-all duration-300 no-underline
               {className}"
        style="{v.pad} --_accent: {accent}; {extraStyle}"
    >
        <!-- ── Hairline top highlight ── -->
        <div
            class="pointer-events-none absolute inset-x-0 top-0 h-px
                   bg-gradient-to-r from-transparent via-primary/25 to-transparent opacity-70"
        ></div>

        <!-- ── Left 1px specification rule ── -->
        {#if variant !== "inset"}
            <div
                class="pointer-events-none absolute inset-y-0 left-0 w-px
                       opacity-45 {hover ? 'group-hover:opacity-85' : ''} transition-opacity duration-300"
                style="background: linear-gradient(to bottom, transparent, var(--_accent, hsl(var(--primary))) 50%, transparent);"
            ></div>
        {/if}

        <!-- ── Content slot ── -->
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
        class="{v.rounded} {v.bg} {v.blur} {v.shadow}
               border border-border/80
               {hover ? `${v.shadowHover} hover:border-primary/45` : ''}
               relative block overflow-hidden transition-all duration-300 text-left
               {className}"
        style="{v.pad} --_accent: {accent}; {extraStyle}"
    >
        <!-- ── Hairline top highlight ── -->
        <div
            class="pointer-events-none absolute inset-x-0 top-0 h-px
                   bg-gradient-to-r from-transparent via-primary/25 to-transparent opacity-70"
        ></div>

        <!-- ── Left 1px specification rule ── -->
        {#if variant !== "inset"}
            <div
                class="pointer-events-none absolute inset-y-0 left-0 w-px
                       opacity-45 {hover ? 'group-hover:opacity-85' : ''} transition-opacity duration-300"
                style="background: linear-gradient(to bottom, transparent, var(--_accent, hsl(var(--primary))) 50%, transparent);"
            ></div>
        {/if}

        <!-- ── Content slot ── -->
        <div class="relative z-10 h-full flex flex-col">
            {#if children}
                {@render children()}
            {/if}
        </div>
    </button>
{:else}
    <div
        class="{v.rounded} {v.bg} {v.blur} {v.shadow}
               border border-border/80
               {hover ? 'hover:border-primary/35' : ''}
               relative overflow-hidden transition-colors duration-300
               {className}"
        style="{v.pad} --_accent: {accent}; {extraStyle}"
    >
        <!-- ── Hairline top highlight ── -->
        <div
            class="pointer-events-none absolute inset-x-0 top-0 h-px
                   bg-gradient-to-r from-transparent via-primary/25 to-transparent opacity-70"
        ></div>

        <!-- ── Left 1px specification rule ── -->
        {#if variant !== "inset"}
            <div
                class="pointer-events-none absolute inset-y-0 left-0 w-px
                       opacity-45 {hover ? 'group-hover:opacity-75' : ''} transition-opacity duration-300"
                style="background: linear-gradient(to bottom, transparent, var(--_accent, hsl(var(--primary))) 50%, transparent);"
            ></div>
        {/if}

        <!-- ── Content slot ── -->
        <div class="relative z-10 h-full flex flex-col">
            {#if children}
                {@render children()}
            {/if}
        </div>
    </div>
{/if}
