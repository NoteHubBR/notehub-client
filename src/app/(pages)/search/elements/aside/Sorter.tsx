import { clsx } from "clsx";
import { useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";

interface SorterProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    sParam: string;
    values: (string | null)[];
    icon?: React.ElementType;
}

export const Sorter = ({ sParam, values, icon: Icon, className, children, ...rest }: SorterProps) => {

    const pathname = usePathname();
    const sParams = useSearchParams();

    const current = sParams.get(sParam);
    const onParam = values.includes(current);

    const handleParamUpdate = useCallback(() => {
        const params = new URLSearchParams(sParams);
        params.set(sParam, values[0] ? values[0] : '');
        window.history.replaceState(null, '', `${pathname}?${params}`);
    }, [pathname, sParam, sParams, values])

    return (
        <li>
            <button
                onClick={handleParamUpdate}
                disabled={onParam}
                className={clsx(
                    'cursor-pointer whitespace-nowrap',
                    'p-2 rounded-md',
                    'flex items-center gap-1',
                    'font-semibold',
                    onParam
                        ? 'text-primary dark:bg-semidark bg-semilight'
                        : 'dark:text-midlight text-middark',
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
            </button>
        </li>
    )

}