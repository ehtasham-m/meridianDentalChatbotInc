import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-body font-medium transition-all duration-300 ease-premium focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-mint text-navy-700 shadow-card hover:-translate-y-0.5 hover:shadow-card-hover hover:bg-mint-600",
        secondary:
          "bg-navy-700 text-warm-100 shadow-card hover:-translate-y-0.5 hover:shadow-card-hover hover:bg-navy-900",
        outline:
          "border border-navy-700/20 text-navy-700 hover:-translate-y-0.5 hover:border-navy-700 hover:bg-navy-700/[0.03]",
        ghost: "text-navy-700 hover:bg-navy-700/[0.05]",
        light:
          "bg-warm-100/10 text-warm-100 border border-warm-100/25 backdrop-blur hover:bg-warm-100/20 hover:-translate-y-0.5",
      },
      size: {
        default: "h-12 px-6 text-[15px]",
        lg: "h-14 px-8 text-base",
        sm: "h-10 px-4 text-sm",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
}

export function Button({
  className,
  variant,
  size,
  href,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size, className }));

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
