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
    class="flex flex-col w-full {alignClasses[align]}"
>
    <svelte:element this={headingTag || "h2"}
        class="font-heading font-extrabold text-foreground leading-[0.96] tracking-tight sm:whitespace-pre-line text-balance"
        style="font-size: clamp(2rem, 4.5cqi, 3.85rem); margin-bottom: max(0.55rem, 0.85cqi);"
    >
        {title.replace(/\n/g, ' ')}
    </svelte:element>

    <div
        class="flex items-center gap-2.5"
        style="margin-bottom: max(0.55rem, 0.8cqi);"
    >
        <span class="h-px w-6 bg-primary/50 shrink-0"></span>
        <span
            class="font-mono {labelColor} uppercase tracking-[0.2em] font-semibold"
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

