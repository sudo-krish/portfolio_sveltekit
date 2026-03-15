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

    const colorMap: Record<string, { bg: string; shadow: string; hoverGlow: string }> = {
        cyan: { bg: "bg-[#0891b2]", shadow: "shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_0_15px_rgba(8,145,178,0.4)]", hoverGlow: "hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_0_25px_rgba(8,145,178,0.6)]" },
        blue: { bg: "bg-[#2563eb]", shadow: "shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_0_15px_rgba(37,99,235,0.4)]", hoverGlow: "hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_0_25px_rgba(37,99,235,0.6)]" },
        purple: { bg: "bg-[#7c3aed]", shadow: "shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_0_15px_rgba(124,58,237,0.4)]", hoverGlow: "hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_0_25px_rgba(124,58,237,0.6)]" },
        orange: { bg: "bg-[#c2410c]", shadow: "shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_0_15px_rgba(194,65,12,0.4)]", hoverGlow: "hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_0_25px_rgba(194,65,12,0.6)]" },
        green: { bg: "bg-[#15803d]", shadow: "shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_0_15px_rgba(21,128,61,0.4)]", hoverGlow: "hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_0_25px_rgba(21,128,61,0.6)]" },
        amber: { bg: "bg-[#b45309]", shadow: "shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_0_15px_rgba(180,83,9,0.4)]", hoverGlow: "hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_0_25px_rgba(180,83,9,0.6)]" },
        primary: { bg: "bg-primary", shadow: "shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_0_15px_hsl(var(--primary)/0.3)]", hoverGlow: "hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_0_25px_hsl(var(--primary)/0.5)]" },
    };

    const c = colorMap[accentColor] ?? colorMap.primary;
</script>

<a
    {href}
    class="group relative inline-flex items-center justify-center {c.bg} {c.shadow} {c.hoverGlow} font-bold rounded-[1.2rem] overflow-hidden transition-all duration-300 {reversed ? 'flex-row-reverse' : ''}"
    style="height: max(3rem, 3cqi); padding: 0 max(1.5rem, 1.5cqi); gap: max(0.5rem, 0.5cqi); font-size: clamp(0.875rem, 1cqi, 1rem); color: white;"
>
    <!-- Shimmer sweep animation (same as Hero CTA) -->
    <div
        class="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-[150%] transition-transform duration-1000 ease-out"
    ></div>

    <!-- Label text -->
    <span class="z-10 whitespace-nowrap" style="color: white;">{label}</span>

    <!-- Icon -->
    <Icon class="z-10" size={18} style="color: white;" />
</a>
