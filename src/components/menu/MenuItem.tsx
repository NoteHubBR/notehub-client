import { clsx } from "clsx";

interface MenuItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
    icon: React.ElementType;
}

export const MenuItem = ({ icon: Icon, className, children, ...rest }: MenuItemProps) => (
    <li
        role="menuitem"
        className={clsx(
            'cursor-pointer',
            'align-middle',
            'p-2 rounded-lg',
            'flex items-center gap-3',
            'font-semibold text-sm',
            'dark:hover:bg-semilight/10 hover:bg-semidark/10',
            'transition-colors',
            className
        )}
        {...rest}
    >
        <Icon size={20} className="inline-block" />
        {children}
    </li>
)