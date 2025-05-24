import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  {
    variants: {
      variant: {
        default: 'bg-primary text-white hover:bg-primary/90',
        accent: 'bg-accent text-white hover:bg-accent/90',
        secondary: 'bg-white text-primary border border-gray-200 hover:bg-gray-50 hover:border-gray-300',
        ghost: 'bg-gray-50 text-gray-700 hover:bg-gray-100',
      },
      size: {
        sm: 'h-9 px-3 rounded-md text-sm',
        md: 'h-10 py-2 px-4',
        lg: 'h-11 px-8 rounded-md',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant,
    size,
    isLoading = false,
    icon,
    iconPosition = 'right',
    children,
    disabled,
    ...props
  }, ref) => {
    return (
      <button
        className={cn(
          'group relative overflow-hidden',
          buttonVariants({ variant, size, className }),
          { 'opacity-70 cursor-not-allowed': isLoading || disabled }
        )}
        ref={ref}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          </span>
        )}
        <span 
          className={cn(
            'flex items-center gap-2',
            { 'opacity-0': isLoading },
            { 'flex-row-reverse': iconPosition === 'left' }
          )}
        >
          {icon && <span className={cn({ 'order-1': iconPosition === 'right' })}>{icon}</span>}
          {children}
        </span>
        <span className="absolute top-0 left-0 h-full w-0.5 bg-white/30 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };