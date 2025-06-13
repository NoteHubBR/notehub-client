import { clsx } from "clsx";

interface MenuItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
    icon?: React.ElementType;
    shouldHide?: boolean;
    valueToCompare?: any;
    currentValue?: any
}

export const MenuItem = ({ icon: Icon, shouldHide = false, valueToCompare, currentValue, className, children, ...rest }: MenuItemProps) => {

    const isActive: boolean = valueToCompare === currentValue;

    if (shouldHide) return <></>;

    return (
        <li
            role="menuitem"
            className={clsx(
                'cursor-pointer',
                'align-middle',
                'px-6 py-3',
                'flex items-center gap-3',
                'font-semibold text-sm',
                valueToCompare && currentValue && isActive
                    ? 'dark:bg-semilight/5 bg-semidark/5'
                    : 'dark:hover:bg-semilight/10 hover:bg-semidark/10',
                'transition-colors',
                className
            )}
            {...rest}
        >
            {Icon && <Icon size={20} className="inline-block" />}
            {children}
        </li>
    )

}