<!-- src/lib/components/ui/cards/GlassCard.svelte -->
<!--
  The ONE card to rule them all.
  Every glass surface on the homepage uses this component.
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
            rounded: "rounded-[1.75rem]",
            pad: "padding: max(1.25rem, 1.2cqi);",
            bg: "bg-card/65",
            blur: "backdrop-blur-2xl",
            shadow: "shadow-[0_8px_32px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.07)]",
            shadowHover: "hover:shadow-[0_12px_40px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.11)]",
        },
        compact: {
            rounded: "rounded-2xl",
            pad: "padding: max(0.65rem, 0.7cqi);",
            bg: "bg-card/55",
            blur: "backdrop-blur-xl",
            shadow: "shadow-[0_4px_16px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.05)]",
            shadowHover: "hover:shadow-[0_6px_22px_rgba(0,0,0,0.14),inset_0_1px_0_rgba(255,255,255,0.09)]",
        },
        inset: {
            rounded: "rounded-xl",
            pad: "padding: max(1rem, 1cqi);",
            bg: "bg-foreground/[0.02]",
            blur: "backdrop-blur-md",
            shadow: "shadow-[inset_0_1px_0_rgba(255,255,255,0.03),inset_0_-1px_4px_rgba(0,0,0,0.06)]",
            shadowHover: "",
        },
    };

    const v: VariantConfig = base[variant];
</script>

{#if href}
    <a
        {href}
        {target}
        {rel}
        class="{v.rounded} {v.bg} {v.blur} {v.shadow}
               border border-foreground/[0.07]
               {hover ? `${v.shadowHover} hover:border-foreground/[0.13]` : ''}
               relative block overflow-hidden transition-all duration-600
               {className}"
        style="{v.pad} --_accent: {accent}; {extraStyle}"
    >
        <!-- ── Hairline top highlight ── -->
        <div
            class="pointer-events-none absolute inset-x-0 top-0 h-px
                   bg-gradient-to-r from-transparent via-foreground/15 to-transparent opacity-50"
        ></div>

        <!-- ── Left accent edge ── -->
        {#if variant !== "inset"}
            <div
                class="pointer-events-none absolute inset-y-0 left-0 w-px
                       opacity-30 {hover ? 'group-hover:opacity-70' : ''} transition-opacity duration-600"
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
               border border-foreground/[0.07]
               {hover ? `${v.shadowHover} hover:border-foreground/[0.13]` : ''}
               relative block overflow-hidden transition-all duration-600 text-left
               {className}"
        style="{v.pad} --_accent: {accent}; {extraStyle}"
    >
        <!-- ── Hairline top highlight ── -->
        <div
            class="pointer-events-none absolute inset-x-0 top-0 h-px
                   bg-gradient-to-r from-transparent via-foreground/15 to-transparent opacity-50"
        ></div>

        <!-- ── Left accent edge ── -->
        {#if variant !== "inset"}
            <div
                class="pointer-events-none absolute inset-y-0 left-0 w-px
                       opacity-30 {hover ? 'group-hover:opacity-70' : ''} transition-opacity duration-600"
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
               border border-foreground/[0.07]
               {hover ? `${v.shadowHover} hover:border-foreground/[0.13]` : ''}
               relative overflow-hidden transition-all duration-600
               {className}"
        style="{v.pad} --_accent: {accent}; {extraStyle}"
    >
    <!-- ── Hairline top highlight ── -->
    <div
        class="pointer-events-none absolute inset-x-0 top-0 h-px
               bg-gradient-to-r from-transparent via-foreground/15 to-transparent opacity-50"
    ></div>

    <!-- ── Left accent edge ── -->
    {#if variant !== "inset"}
        <div
            class="pointer-events-none absolute inset-y-0 left-0 w-px
                   opacity-30 {hover ? 'group-hover:opacity-70' : ''} transition-opacity duration-600"
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
