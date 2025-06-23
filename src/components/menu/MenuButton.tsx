import { clsx } from "clsx";
import { IconDotsVertical } from "@tabler/icons-react";

interface MenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    tooltip: string;
}

export const MenuButton = ({ tooltip, className, children, ...rest }: MenuButtonProps) => (
    <button
        type="button"
        className={clsx(
            'group',
            'disabled:cursor-not-allowed',
            'p-1 rounded-full',
            'transition-colors',
            'dark:hover:bg-semilight/10 hover:bg-semidark/10',
            'dark:focus:bg-semilight/10 focus:bg-semidark/10',
            className
        )}
        {...rest}
    >
        <IconDotsVertical size={20} />
        <span
            role="tooltip"
            className="pointer-events-none select-none whitespace-nowrap
            absolute left-1/2 -translate-x-1/2 inlg:-translate-x-[60%] top-[150%]
            p-2 rounded-full
            font-medium text-xs text-white
            bg-neutral-500
            opacity-0
            group-hover:opacity-100
            group-focus:opacity-0
            transition-opacity"
        >
            {tooltip}
        </span>
        {children}
    </button>
)