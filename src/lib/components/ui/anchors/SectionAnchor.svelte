<!-- src/lib/components/ui/anchors/SectionAnchor.svelte -->
<script lang="ts">
    let {
        label,
        title,
        description,
        labelColor = "text-primary/80",
        align = "left",
        maxDescWidth = "20cqi",
        headingTag = "h2",
    } = $props<{
        label: string;
        title: string;
        description: string;
        labelColor?: string;
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
    class="flex flex-col {alignClasses[align]}"
>
    <span
        class="font-mono {labelColor} uppercase tracking-[0.3em]"
        style="font-size: clamp(11px, 0.8cqi, 13px); margin-bottom: max(0.5rem, 0.8cqi);"
    >
        {label}
    </span>

    <svelte:element this={headingTag || "h2"}
        class="font-black text-foreground/75 leading-[0.92] tracking-tighter whitespace-pre-line"
        style="font-size: clamp(2.25rem, 5cqi, 4.25rem); margin-bottom: max(0.75rem, 1.1cqi);"
    >
        {title}
    </svelte:element>

    <p
        class="text-muted-foreground font-normal leading-relaxed mb-0"
        style="font-size: clamp(0.88rem, 1cqi, 0.98rem); max-width: {align === 'center' ? '380px' : maxDescWidth};"
    >
        {@html description}
    </p>
</div>

