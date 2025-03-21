import { clsx } from "clsx";
import { forwardRef } from "react";

export const Button = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(({ ...props }, ref) => {

    if (props.disabled) return <div
        role="status"
        style={{ filter: 'drop-shadow(0 0 2px rgba(0, 0, 0, .25)' }}
        className={clsx(
            'following',
            'cursor-pointer',
            'dark:bg-neutral-50/10 bg-neutral-900/10',
            'py-2 px-4 rounded-full font-medium text-xs',
            'transition-colors duration-300',
        )}
    >
        Salvar
    </div>

    return <button
        ref={ref}
        className="py-2 px-4 rounded-full
            font-medium text-xs
            dark:text-black text-white
            dark:bg-white bg-black
            hover:opacity-75 transition-opacity"
        {...props}
    />

})

Button.displayName = 'Button';