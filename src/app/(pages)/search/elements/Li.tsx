import { clsx } from "clsx";

interface LiProps extends React.LiHTMLAttributes<HTMLLIElement> {
    onParam?: boolean;
    useBg?: boolean;
    icon?: React.ElementType;
}

export const Li = ({ onParam, useBg, icon: Icon, className, children, ...rest }: LiProps) => {

    return (
        <li
            className={clsx(
                'cursor-pointer whitespace-nowrap',
                'p-2 rounded-md',
                'flex items-center gap-1',
                'font-semibold',
                onParam
                    ? 'text-primary'
                    : 'dark:text-midlight text-middark',
                onParam && useBg && 'dark:bg-semidark bg-semilight',
                'hover:dark:bg-semidark hover:bg-semilight',
                className
            )}
            {...rest}
        >
            {Icon &&
                <Icon size={24} className={clsx(
                    'inline-block',
                    onParam
                        ? 'text-primary'
                        : 'dark:text-midlight text-middark',
                )}
                />
            }
            {children}
        </li>
    )

}