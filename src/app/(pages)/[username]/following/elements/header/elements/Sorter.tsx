import { clsx } from "clsx";
import { useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";

interface SorterProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    orderParam: string;
    sortParam: string;
    orderValues: (string | null)[];
    sortValues: (string | null)[];
}

export const Sorter = ({ orderParam, sortParam, orderValues, sortValues, ...rest }: SorterProps) => {

    const pathname = usePathname();
    const sParams = useSearchParams();

    const currentOrder = sParams.get(orderParam);
    const currentSort = sParams.get(sortParam);
    const onRoute = orderValues.includes(currentOrder) && sortValues.includes(currentSort);

    const handleParamUpdate = useCallback(() => {
        const params = new URLSearchParams(sParams);
        params.set(orderParam, orderValues[0] ? orderValues[0] : '');
        params.set(sortParam, sortValues[0] ? sortValues[0] : '');
        window.history.replaceState(null, '', `${pathname}?${params}`);
    }, [orderParam, orderValues, pathname, sParams, sortParam, sortValues])

    return (
        <li>
            <button
                onClick={handleParamUpdate}
                disabled={onRoute}
                className={clsx(
                    'cursor-pointer',
                    'px-3 py-1 rounded-md',
                    'border', onRoute ? 'border-primary' : 'dark:border-neutral-700/50 border-dark/25',
                    onRoute ? 'bg-primary text-white' : 'dark:bg-dark bg-light hover:dark:bg-semidark hover:bg-semilight',
                    'transition-all'
                )}
                {...rest}
            />
        </li>
    )

}