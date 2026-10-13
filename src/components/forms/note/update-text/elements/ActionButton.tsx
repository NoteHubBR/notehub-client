import { clsx } from "clsx";

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    skipAuthorityCheck?: boolean;
    isAuthor?: boolean;
    isEditing: boolean;
    icon: React.ElementType;
    tooltip: string;
}

export const ActionButton = ({ skipAuthorityCheck = false, isAuthor = false, isEditing, icon: Icon, tooltip, className, children, ...rest }: ActionButtonProps) => {

    if (skipAuthorityCheck || isAuthor) return (
        <button
            className={clsx(
                'disabled:cursor-not-allowed',
                'group relative p-1 rounded-full',
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

    return null;

}