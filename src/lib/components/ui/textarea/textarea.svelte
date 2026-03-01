<script lang="ts">
	import {
		cn,
		type WithElementRef,
		type WithoutChildren,
	} from "$lib/utils.js";
	import type { HTMLTextareaAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		value = $bindable(),
		class: className,
		"data-slot": dataSlot = "textarea",
		...restProps
	}: WithoutChildren<WithElementRef<HTMLTextareaAttributes>> = $props();
</script>

<textarea
	bind:this={ref}
	data-slot={dataSlot}
	class={cn(
		"border-white/10 bg-foreground/5 backdrop-blur-md placeholder:text-muted-foreground focus-visible:border-primary/50 focus-visible:ring-primary/20 focus-visible:shadow-[0_0_15px_rgba(var(--primary),0.1)] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive field-sizing-content flex min-h-16 w-full rounded-md border px-3 py-2 text-base outline-none transition-all duration-200 focus-visible:ring-[3px] focus-visible:bg-foreground/10 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
		className,
	)}
	bind:value
	{...restProps}
></textarea>
