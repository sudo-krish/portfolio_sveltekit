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
	data-slot="card-footer"
	class={cn(
		"flex items-center px-6 pb-6 pt-2",
		// Beautiful glass-etched separator line
		"[.border-t]:pt-6 [.border-t]:mt-2 [.border-t]:border-t [.border-t]:border-[hsl(var(--border)/0.2)] [.border-t]:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]",
		className,
	)}
	{...restProps}
>
	{@render children?.()}
</div>
