import { forwardRef } from "react";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    tooltip?: string;
    children?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ tooltip, children, ...rest }, ref) => (
    <button ref={ref} className="relative group p-1 rounded-full dark:hover:bg-semilight/15 hover:bg-semidark/15 transition-colors" {...rest}>
        {tooltip &&
            <span
                className="pointer-events-none
                    group-hover:opacity-100 group-hover:visible transition-all
                    invisible opacity-0 
                    absolute break-keep top-[150%] left-1/2 -translate-x-1/2
                    w-max p-1
                    rounded-md
                    text-sm 
                    bg-neutral-500 text-white"
            >
                {tooltip}
            </span>
        }
        {children}
    </button>
));

Button.displayName = 'Button';