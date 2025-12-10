import { clsx } from "clsx";

interface DetailProps extends React.LiHTMLAttributes<HTMLLIElement> {
    hasSucceeded: boolean;
    hasFailed: boolean;
    icon: React.ElementType;
    label: string;
    value: string;
}

export const Detail = ({ hasSucceeded, hasFailed, icon: Icon, label, value, ...rest }: DetailProps) => (
    <li className="flex items-center justify-center gap-2" {...rest}>
        <aside
            className={clsx(
                'p-[6px] rounded-full',
                'transition-colors ease-linear duration-500',
                hasSucceeded
                    ? 'dark:bg-secondary/25 bg-primary/25'
                    : hasFailed
                        ? 'dark:bg-yellow-600/25 bg-yellow-500/25'
                        : 'dark:bg-light/5 bg-dark/5'
            )}
        >
            <Icon
                size={24}
                className={clsx(
                    'transition-colors ease-linear duration-500',
                    hasSucceeded
                        ? 'dark:text-secondary text-primary'
                        : hasFailed
                            ? 'dark:text-yellow-600 text-yellow-500'
                            : 'dark:text-semilight/50 text-semidark/50'
                )}
            />
        </aside>
        <div className="flex flex-col justify-center">
            <span className="font-medium text-xs dark:text-midlight/50 text-middark/50">
                {label}
            </span>
            <p className={clsx(
                'font-semibold text-sm text-primary',
                'transition-opacity ease-linear duration-500',
                hasSucceeded ? 'opacity-100' : 'opacity-0'
            )}>
                {hasSucceeded ? value : ''}
            </p>
        </div>
    </li>
)