<!-- src/lib/components/ui/anchors/SectionAnchor.svelte -->
<script lang="ts">
    let {
        label,
        title,
        description,
        labelColor = "text-primary/80",
        align = "left",
        maxDescWidth = "20cqi",
    } = $props<{
        label: string;
        title: string;
        description: string;
        labelColor?: string;
        align?: "left" | "right" | "center";
        maxDescWidth?: string;
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
        style="font-size: clamp(8px, 0.8cqi, 12px); margin-bottom: max(0.5rem, 0.8cqi);"
    >
        {label}
    </span>

    <div
        class="font-black text-muted-foreground/30 leading-[0.9] tracking-tighter whitespace-pre-line"
        style="font-size: clamp(2.5rem, 5.5cqi, 4.5rem); margin-bottom: max(0.75rem, 1.2cqi);"
    >
        {title}
    </div>

    <p
        class="text-muted-foreground font-light leading-relaxed"
        style="font-size: clamp(0.7rem, 1cqi, 0.875rem); max-width: {align === 'center' ? '320px' : maxDescWidth};"
    >
        {@html description}
    </p>
</div>

