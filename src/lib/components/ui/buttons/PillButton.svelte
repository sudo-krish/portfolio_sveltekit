<script lang="ts">
    import { ArrowRight } from "lucide-svelte";
    import { scrollTriggerTarget } from "$lib/stores/scroll-store";

    let {
        href,
        label = "",
        sublabel = "",
        Icon = ArrowRight,
        accentColor = "cyan",
        reversed = false,
    } = $props<{
        href: string;
        label: string;
        sublabel?: string;
        Icon?: any;
        accentColor?: string;
        reversed?: boolean;
    }>();

    const colorMap: Record<string, { bg: string; text: string; shadow: string; hoverGlow: string }> = {
        cyan: { bg: "bg-primary", text: "text-primary-foreground", shadow: "shadow-[inset_0_1px_2px_rgba(255,255,255,0.12),0_4px_14px_hsl(var(--primary)/0.2)]", hoverGlow: "hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.15),0_6px_20px_hsl(var(--primary)/0.35)]" },
        blue: { bg: "bg-primary", text: "text-primary-foreground", shadow: "shadow-[inset_0_1px_2px_rgba(255,255,255,0.12),0_4px_14px_hsl(var(--primary)/0.2)]", hoverGlow: "hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.15),0_6px_20px_hsl(var(--primary)/0.35)]" },
        purple: { bg: "bg-primary", text: "text-primary-foreground", shadow: "shadow-[inset_0_1px_2px_rgba(255,255,255,0.12),0_4px_14px_hsl(var(--primary)/0.2)]", hoverGlow: "hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.15),0_6px_20px_hsl(var(--primary)/0.35)]" },
        orange: { bg: "bg-highlight", text: "text-highlight-foreground", shadow: "shadow-[inset_0_1px_2px_rgba(255,255,255,0.12),0_4px_14px_hsl(var(--highlight)/0.2)]", hoverGlow: "hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.15),0_6px_20px_hsl(var(--highlight)/0.35)]" },
        green: { bg: "bg-success", text: "text-success-foreground", shadow: "shadow-[inset_0_1px_2px_rgba(255,255,255,0.12),0_4px_14px_hsl(var(--success)/0.25)]", hoverGlow: "hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.15),0_6px_20px_hsl(var(--success)/0.4)]" },
        amber: { bg: "bg-warning", text: "text-warning-foreground", shadow: "shadow-[inset_0_1px_2px_rgba(255,255,255,0.12),0_4px_14px_hsl(var(--warning)/0.25)]", hoverGlow: "hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.15),0_6px_20px_hsl(var(--warning)/0.4)]" },
        primary: { bg: "bg-primary", text: "text-primary-foreground", shadow: "shadow-[inset_0_1px_2px_rgba(255,255,255,0.12),0_4px_14px_hsl(var(--primary)/0.2)]", hoverGlow: "hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.15),0_6px_20px_hsl(var(--primary)/0.35)]" },
    };

    const c = $derived(colorMap[accentColor] ?? colorMap.primary);

    function handleClick(e: MouseEvent) {
        if (href.startsWith("#") && href.length > 1) {
            e.preventDefault();
            scrollTriggerTarget.set(href.slice(1));
        }
    }
</script>

<a
    {href}
    onclick={handleClick}
    data-sublabel={sublabel || undefined}
    class="group relative inline-flex items-center justify-center {c.bg} {c.text} {c.shadow} {c.hoverGlow} font-heading font-bold rounded-xl border border-primary-foreground/15 overflow-hidden transition-all duration-300 hover:-translate-y-0.5 no-underline {reversed ? 'flex-row-reverse' : ''}"
    style="height: max(2.85rem, 2.85cqi); padding: 0 max(1.1rem, 1.15cqi) 0 max(1.3rem, 1.35cqi); gap: max(0.6rem, 0.6cqi); font-size: clamp(0.85rem, 0.95cqi, 0.95rem);"
>
    <!-- Label text -->
    <span class="z-10 whitespace-nowrap tracking-tight">{label}</span>

    <!-- Architectural Icon Compartment -->
    <span class="z-10 inline-flex items-center justify-center w-6 h-6 rounded-lg bg-primary-foreground/15 transition-transform duration-300 group-hover:translate-x-0.5">
        <Icon size={15} />
    </span>
</a>
