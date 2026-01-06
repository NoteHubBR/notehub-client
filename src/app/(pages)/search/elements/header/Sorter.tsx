import { clsx } from "clsx";
import { useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";

interface SorterProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    orderParam: string;
    sortParam: string;
    orderValues: (string | null)[];
    sortValues: (string | null)[];
    icon?: React.ElementType;
}

export const Sorter = ({ orderParam, sortParam, orderValues, sortValues, icon: Icon, className, children, ...rest }: SorterProps) => {

    const pathname = usePathname();
    const sParams = useSearchParams();

    const currentOrder = sParams.get(orderParam);
    const currentSort = sParams.get(sortParam);
    const onParam = orderValues.includes(currentOrder) && sortValues.includes(currentSort);

    const handleParamUpdate = useCallback(() => {
        const params = new URLSearchParams(sParams);
        params.delete('page');
        params.set(orderParam, orderValues[0] ? orderValues[0] : '');
        params.set(sortParam, sortValues[0] ? sortValues[0] : '');
        window.history.replaceState(null, '', `${pathname}?${params}`);
    }, [orderParam, orderValues, pathname, sParams, sortParam, sortValues])

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