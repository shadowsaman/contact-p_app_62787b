import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export const buttonVariants = cva(
  'inline-flex items-center justify-center font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-md hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-lg',
        accent:
          'bg-accent text-accent-foreground shadow-md hover:bg-accent/90 hover:-translate-y-0.5 hover:shadow-lg',
        outline:
          'border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground',
        ghost:
          'hover:bg-muted text-foreground',
        link:
          'text-accent underline-offset-4 hover:underline p-0 h-auto',
      },
      size: {
        default: 'h-11 px-6 py-2 text-sm rounded-[var(--radius)]',
        sm: 'h-9 px-4 text-xs rounded-[var(--radius)]',
        lg: 'h-13 px-10 py-3 text-base rounded-[var(--radius)]',
        icon: 'h-10 w-10 rounded-[var(--radius)]',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
);
Button.displayName = 'Button';
