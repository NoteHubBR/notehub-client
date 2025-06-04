import { clsx } from "clsx";

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isEditing: boolean;
    icon: React.ElementType;
    tooltip: string;
}

export const ActionButton = ({ isEditing, icon: Icon, tooltip, className, children, ...rest }: ActionButtonProps) => (
    <button
        className={clsx(
            'group relative p-1 rounded-full',
            'dark:drop-shadow-alpha-l-sm drop-shadow-alpha-d-sm',
            'transition-colors',
            isEditing ? 'block' : 'hidden',
            className
        )}
        {...rest}
    >
        <span
            role="tooltip"
            className="pointer-events-none select-none whitespace-nowrap
            absolute left-1/2 -translate-x-1/2 inmd:-translate-x-[60%] top-[150%]
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