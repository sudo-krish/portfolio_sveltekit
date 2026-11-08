import { type VariantProps, tv } from 'tailwind-variants';

export const badgeVariants = tv({
  base: 'focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-full border px-2 py-0.5 text-xs font-medium transition-all duration-200 focus-visible:ring-[3px] [&>svg]:pointer-events-none [&>svg]:size-3',
  variants: {
    variant: {
      default:
        'bg-primary/80 text-primary-foreground [a&]:hover:bg-primary/90 border-primary/30 backdrop-blur-sm shadow-[0_0_8px_rgba(var(--primary),0.15)]',
      secondary:
        'bg-secondary/60 text-secondary-foreground [a&]:hover:bg-secondary/80 border-foreground/10 backdrop-blur-sm',
      destructive:
        'bg-destructive/80 [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 border-destructive/30 text-foreground backdrop-blur-sm',
      outline:
        'text-foreground border-foreground/15 bg-foreground/5 backdrop-blur-md [a&]:hover:bg-foreground/10 [a&]:hover:text-accent-foreground',
      glass:
        'text-foreground border-foreground/10 bg-foreground/5 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] [a&]:hover:bg-foreground/10',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export type BadgeVariant = VariantProps<typeof badgeVariants>['variant'];
export { default as Badge } from './badge.svelte';
