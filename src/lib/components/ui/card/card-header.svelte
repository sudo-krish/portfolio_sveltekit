<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="card-header"
	class={cn(
		"@container/card-header has-data-[slot=card-action]:grid-cols-[1fr_auto] grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 pt-6",
		// Optional sleek separator line if followed by body
		"[.border-b]:pb-6 [.border-b]:border-b [.border-b]:border-[hsl(var(--border)/0.3)]",
		className,
	)}
	{...restProps}
>
	{@render children?.()}
</div>
