import { clsx } from "clsx";
import { forwardRef } from "react";

export const Button = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(({ className, ...rest }, ref) => (
    <button
        ref={ref}
        className={clsx(
            'px-4 py-2 rounded',
            'border dark:border-middark/50 border-midlight/50',
            'text-sm',
            'transition-colors',
            className
        )}
        {...rest}
    />
))

Button.displayName = 'Button';