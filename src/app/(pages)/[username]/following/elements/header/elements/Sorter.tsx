import { clsx } from "clsx";
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

    const handleParamUpdate = () => {
        const params = new URLSearchParams(sParams);
        const nextOrder = orderValues.find((v): v is string => v !== null) ?? null;
        const nextSort = sortValues.find((v): v is string => v !== null) ?? null;
        if (nextOrder) params.set(orderParam, nextOrder);
        else params.delete(orderParam);
        if (nextSort) params.set(sortParam, nextSort);
        else params.delete(sortParam);
        const keys = Array.from(params.keys());
        if (keys.length === 1 && keys[0] === 'page') params.delete('page');
        const nextSearch = params.toString();
        const newUrl = nextSearch ? `${pathname}?${nextSearch}` : pathname;
        window.history.replaceState(null, '', newUrl);
    }

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