<!-- src/lib/components/ui/anchors/SectionAnchor.svelte -->
<script lang="ts">
    let {
        label,
        title,
        description,
        labelColor = "text-primary/90",
        accentColor = "hsl(var(--primary))",
        align = "left",
        maxDescWidth = "20cqi",
        headingTag = "h2",
    } = $props<{
        label: string;
        title: string;
        description: string;
        labelColor?: string;
        accentColor?: string;
        align?: "left" | "right" | "center";
        maxDescWidth?: string;
        headingTag?: "h2" | "h3" | "div";
    }>();

    const alignClasses: Record<string, string> = {
        left: "items-start text-left",
        right: "items-end text-right",
        center: "items-center text-center",
    };
</script>

<div
    class="group/anchor flex flex-col w-full {alignClasses[align]}"
>
    <svelte:element this={headingTag || "h2"}
        class="font-heading font-extrabold text-foreground leading-[0.95] tracking-tight sm:whitespace-pre-line text-balance"
        style="font-size: clamp(2.05rem, 4.5cqi, 3.85rem); margin-bottom: max(0.55rem, 0.85cqi);"
    >
        {title.replace(/\n/g, ' ')}
    </svelte:element>

    <div
        class="flex items-center gap-2 {align === 'right' ? 'flex-row-reverse' : ''}"
        style="margin-bottom: max(0.55rem, 0.8cqi);"
    >
        <div class="flex items-center gap-1 shrink-0 {align === 'right' ? 'flex-row-reverse' : ''}">
            <span class="h-[2px] w-6 rounded-full transition-all duration-300 group-hover/anchor:w-8" style="background-color: {accentColor};"></span>
            <span class="h-[2px] w-1.5 rounded-full opacity-50" style="background-color: {accentColor};"></span>
        </div>
        <span
            class="font-mono {labelColor} uppercase tracking-[0.2em] font-bold"
            style="font-size: clamp(10px, 0.78cqi, 12px);"
        >
            {label}
        </span>
    </div>

    <p
        class="text-muted-foreground font-normal leading-relaxed mb-0 lg:max-w-[var(--desc-max)]"
        style="font-size: clamp(0.9rem, 1cqi, 0.98rem); --desc-max: {align === 'center' ? '440px' : maxDescWidth};"
    >
        {@html description}
    </p>
</div>
