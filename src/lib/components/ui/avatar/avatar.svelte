<script lang="ts">
	import { Avatar as AvatarPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		loadingStatus = $bindable("loading"),
		class: className,
		...restProps
	}: AvatarPrimitive.RootProps = $props();
</script>

<AvatarPrimitive.Root
	bind:ref
	bind:loadingStatus
	data-slot="avatar"
	class={cn(
		"relative flex size-8 shrink-0 overflow-hidden rounded-full ring-1 ring-white/10 shadow-[0_0_10px_rgba(0,0,0,0.2)]",
		className,
	)}
	{...restProps}
/>
