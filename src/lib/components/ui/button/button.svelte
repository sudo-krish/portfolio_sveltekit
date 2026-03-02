<!-- src/lib/components/ui/button/button.svelte -->
<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type {
		HTMLAnchorAttributes,
		HTMLButtonAttributes,
	} from "svelte/elements";
	import { type VariantProps, tv } from "tailwind-variants";

	export const buttonVariants = tv({
		// The BASE class applies universal physics and typography
		base: [
			"inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold outline-none",
			"transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]", // Springy, physical animation
			"focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
			"disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50",
			"[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
			// The active state physically depresses the button and changes the shadow
			"active:scale-[0.96] active:translate-y-[1px]",
		].join(" "),

		variants: {
			variant: {
				// The main action button - heavily saturated, glowing core
				default: [
					"bg-primary text-primary-foreground",
					"shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_4px_10px_-2px_hsl(var(--primary)/0.4)]",
					"hover:bg-primary/90 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),0_0_20px_0_hsl(var(--primary)/0.6),0_6px_15px_-3px_hsl(var(--primary)/0.5)]",
					"hover:-translate-y-0.5",
					"border border-primary-foreground/10",
				].join(" "),

				// The frosted glass variant - perfect for placing over imagery or gradients
				glass: [
					"bg-[hsl(var(--glass-bg))] backdrop-blur-[var(--glass-blur)] backdrop-saturate-[150%] text-foreground",
					"border border-[hsl(var(--glass-border))] border-t-[hsl(var(--glass-highlight))]",
					"shadow-[inset_0_1px_0_0_hsl(var(--glass-highlight)),0_8px_20px_-6px_rgba(0,0,0,0.2)]",
					"hover:bg-[hsl(var(--glass-bg))] hover:border-[hsl(var(--primary)/0.4)]",
					"hover:shadow-[inset_0_1px_0_0_hsl(var(--glass-highlight)),0_0_20px_-5px_hsl(var(--primary)/0.3),0_12px_25px_-8px_rgba(0,0,0,0.3)]",
					"hover:-translate-y-0.5",
				].join(" "),

				// Laser-etched outline that glows on hover
				outline: [
					"bg-transparent text-foreground",
					"border border-border/50",
					"shadow-sm",
					"hover:bg-primary/5 hover:border-primary/50 hover:text-primary",
					"hover:shadow-[inset_0_0_20px_hsl(var(--primary)/0.1),0_0_15px_hsl(var(--primary)/0.2)]",
				].join(" "),

				// Subtle secondary actions
				secondary: [
					"bg-secondary text-secondary-foreground",
					"border border-white/5",
					"shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_2px_5px_rgba(0,0,0,0.1)]",
					"hover:bg-secondary/80 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_4px_10px_rgba(0,0,0,0.15)]",
				].join(" "),

				// Destructive actions - warning glow
				destructive: [
					"bg-destructive text-destructive-foreground",
					"shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_4px_10px_-2px_hsl(var(--destructive)/0.3)]",
					"hover:bg-destructive/90 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_0_20px_0_hsl(var(--destructive)/0.5),0_6px_15px_-3px_hsl(var(--destructive)/0.4)]",
					"hover:-translate-y-0.5",
				].join(" "),

				// Invisible until hovered, then becomes a gentle glass indent
				ghost: [
					"bg-transparent text-muted-foreground",
					"hover:text-foreground hover:bg-foreground/5",
					"active:bg-foreground/10",
				].join(" "),

				link: "text-primary underline-offset-4 hover:underline",
			},
			size: {
				default: "h-10 px-5 py-2 has-[>svg]:px-4",
				sm: "h-8 px-3 text-xs has-[>svg]:px-2.5",
				lg: "h-12 px-8 text-base has-[>svg]:px-5", // Slightly larger for hero sections
				icon: "size-10", // Perfect square
				"icon-sm": "size-8",
				"icon-lg": "size-12",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	});

	export type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];
	export type ButtonSize = VariantProps<typeof buttonVariants>["size"];

	export type ButtonProps = WithElementRef<HTMLButtonAttributes> &
		WithElementRef<HTMLAnchorAttributes> & {
			variant?: ButtonVariant;
			size?: ButtonSize;
		};
</script>

<script lang="ts">
	let {
		class: className,
		variant = "default",
		size = "default",
		ref = $bindable(null),
		href = undefined,
		type = "button",
		disabled,
		children,
		...restProps
	}: ButtonProps = $props();
</script>

<!-- 
  We use the {#if href} block to semantically render an <a> tag 
  if a link is provided, otherwise we render a <button>. 
-->
{#if href}
	<a
		bind:this={ref}
		data-slot="button"
		class={cn(buttonVariants({ variant, size }), className)}
		href={disabled ? undefined : href}
		aria-disabled={disabled}
		role={disabled ? "link" : undefined}
		tabindex={disabled ? -1 : undefined}
		{...restProps}
	>
		{@render children?.()}
	</a>
{:else}
	<button
		bind:this={ref}
		data-slot="button"
		class={cn(buttonVariants({ variant, size }), className)}
		{type}
		{disabled}
		{...restProps}
	>
		{@render children?.()}
	</button>
{/if}
