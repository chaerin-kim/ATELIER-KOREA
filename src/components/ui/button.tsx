import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", asChild = false, isLoading, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 tracking-wide font-sans";
    
    const variants = {
      primary: "bg-stone-900 text-stone-50 hover:bg-stone-900/90 shadow-sm",
      secondary: "bg-stone-200 text-stone-900 hover:bg-stone-200/80",
      outline: "border border-stone-200 bg-transparent hover:bg-stone-100 hover:text-stone-900",
      ghost: "hover:bg-stone-100 hover:text-stone-900",
      link: "text-stone-900 underline-offset-4 hover:underline",
    };

    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-sm px-3",
      lg: "h-11 rounded-sm px-8 text-base",
      icon: "h-10 w-10",
    };

    // asChild 사용 시 Slot은 단일 자식만 허용하므로 children을 그대로 전달
    if (asChild) {
      return (
        <Slot
          className={cn(baseStyles, variants[variant], sizes[size], className)}
          ref={ref}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
