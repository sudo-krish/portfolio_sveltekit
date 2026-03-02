<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="card-content"
	class={cn(
		"px-6",
		// Ensures content fills available space if card height is fixed
		"flex-grow",
		className,
	)}
	{...restProps}
>
	{@render children?.()}
</div>
