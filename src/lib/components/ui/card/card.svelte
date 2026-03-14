<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		// Optional prop to determine if the card should have the heavy hover effect
		interactive = false,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		interactive?: boolean;
	} = $props();
</script>

<div
	bind:this={ref}
	data-slot="card"
	class={cn(
		// Use our global volumetric glass variables and styles
		"relative flex flex-col gap-6 rounded-2xl overflow-hidden text-card-foreground",
		"bg-[hsl(var(--glass-bg))] backdrop-blur-[var(--glass-blur)] backdrop-saturate-[150%]",
		"border border-[hsl(var(--glass-border))] border-t-[hsl(var(--glass-highlight))]",
		"shadow-[inset_0_1px_0_0_hsl(var(--glass-highlight)),0_10px_30px_-10px_rgba(0,0,0,0.3)]",
		"transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
		// Interactive hover states (only apply if interactive prop is true or naturally hovered)
		interactive &&
			"hover:-translate-y-1.5 hover:shadow-[inset_0_1px_0_0_hsl(var(--glass-highlight)),0_0_30px_-5px_hsl(var(--primary)/0.2),0_20px_40px_-15px_rgba(0,0,0,0.5)] hover:border-[hsl(var(--primary)/0.4)] hover:border-t-[hsl(var(--primary)/0.8)]",
		className,
	)}
	{...restProps}
>
	<!-- Inner ambient glow layer for depth -->
	<div
		class="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent pointer-events-none z-0"
	></div>

	<!-- Render children on top of the glass effects -->
	<div class="relative z-10 flex flex-col gap-6 w-full h-full">
		{@render children?.()}
	</div>
</div>
