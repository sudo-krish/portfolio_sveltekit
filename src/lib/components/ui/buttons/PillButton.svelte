<script lang="ts">
    import { ArrowRight } from "lucide-svelte";

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
        cyan: { bg: "bg-primary", text: "text-primary-foreground", shadow: "shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),0_0_15px_hsl(var(--primary)/0.2)]", hoverGlow: "hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),0_0_25px_hsl(var(--primary)/0.4)]" },
        blue: { bg: "bg-primary", text: "text-primary-foreground", shadow: "shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),0_0_15px_hsl(var(--primary)/0.2)]", hoverGlow: "hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),0_0_25px_hsl(var(--primary)/0.4)]" },
        purple: { bg: "bg-primary", text: "text-primary-foreground", shadow: "shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),0_0_15px_hsl(var(--primary)/0.2)]", hoverGlow: "hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),0_0_25px_hsl(var(--primary)/0.4)]" },
        orange: { bg: "bg-highlight", text: "text-highlight-foreground", shadow: "shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),0_0_15px_hsl(var(--highlight)/0.2)]", hoverGlow: "hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),0_0_25px_hsl(var(--highlight)/0.4)]" },
        green: { bg: "bg-success", text: "text-success-foreground", shadow: "shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),0_0_15px_hsl(var(--success)/0.3)]", hoverGlow: "hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),0_0_25px_hsl(var(--success)/0.5)]" },
        amber: { bg: "bg-warning", text: "text-warning-foreground", shadow: "shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),0_0_15px_hsl(var(--warning)/0.3)]", hoverGlow: "hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),0_0_25px_hsl(var(--warning)/0.5)]" },
        primary: { bg: "bg-primary", text: "text-primary-foreground", shadow: "shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),0_0_15px_hsl(var(--primary)/0.2)]", hoverGlow: "hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),0_0_25px_hsl(var(--primary)/0.4)]" },
    };

    const c = colorMap[accentColor] ?? colorMap.primary;
</script>

<a
    {href}
    class="group relative inline-flex items-center justify-center {c.bg} {c.text} {c.shadow} {c.hoverGlow} font-bold rounded-[1.2rem] overflow-hidden transition-all duration-300 {reversed ? 'flex-row-reverse' : ''}"
    style="height: max(3rem, 3cqi); padding: 0 max(1.5rem, 1.5cqi); gap: max(0.5rem, 0.5cqi); font-size: clamp(0.875rem, 1cqi, 1rem);"
>
    <!-- Shimmer sweep animation (same as Hero CTA) -->
    <div
        class="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-[150%] transition-transform duration-1000 ease-out"
    ></div>

    <!-- Label text -->
    <span class="z-10 whitespace-nowrap">{label}</span>

    <!-- Icon -->
    <Icon class="z-10" size={18} />
</a>
