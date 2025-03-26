import { clsx } from "clsx";
import { forwardRef } from "react";

export const Button = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>((props, ref) => {

    if (props.disabled) return (
        <div
            role="status"
            className={clsx(
                'applying',
                'cursor-pointer',
                'dark:bg-lighter/10 bg-darker/10',
                'py-2 px-4 rounded-full font-medium text-xs',
                'drop-shadow-alpha-d-xs',
                'transition-colors duration-300',
            )}
        >
            Salvar
        </div>
    )

    return (
        <button
            ref={ref}
            className="py-2 px-4 rounded-full
            font-medium text-xs
            dark:text-black text-white
            dark:bg-white bg-black
            hover:opacity-75 transition-opacity"
            {...props}
        />
    )

})

Button.displayName = 'Button';