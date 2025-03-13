import { forwardRef } from "react";

export const Button = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(({ ...props }, ref) => (
    <button
        ref={ref}
        className="py-2 px-4 rounded-full
        font-medium text-xs
        dark:text-black text-white
        dark:bg-white bg-black
        hover:opacity-75 transition-opacity"
        {...props}
    />
))

Button.displayName = 'Button';