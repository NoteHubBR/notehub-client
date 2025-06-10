import { clsx } from "clsx";

interface SorterProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon: React.ElementType;
    tooltip: string;
    count: number;
}

export const Sorter = ({ icon: Icon, tooltip, count, className, children, ...rest }: SorterProps) => {
    if (count > 1) return (
        <button
            type="button"
            className={clsx(
                'group relative px-2 py-1 rounded',
                'flex items-center gap-1',
                'text-sm insm:text-xs',
                'hover:dark:bg-semidark hover:bg-semilight',
                'focus:dark:bg-semidark focus:bg-semilight',
                'transition-colors',
                className
            )}
            {...rest}
        >
            <span
                role="tooltip"
                className="pointer-events-none select-none whitespace-nowrap
                z-10 absolute left-1/2 -translate-x-1/2 inmd:-translate-x-[60%] top-[150%]
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
            <Icon size={20} />
            {children}
        </button >
    )
}