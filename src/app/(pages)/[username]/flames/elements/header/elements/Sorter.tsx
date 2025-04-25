import { clsx } from "clsx";
import { useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";

interface SorterProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    sParam: string;
    val: (string | null)[];
}

export const Sorter = ({ sParam, val, ...rest }: SorterProps) => {

    const pathname = usePathname();
    const sParams = useSearchParams();

    const current = sParams.get(sParam);
    const onRoute = val.includes(current);

    const handleParamUpdate = useCallback(() => {
        const params = new URLSearchParams(sParams);
        params.set("order", "createdAt");
        params.set(sParam, val[0] ? val[0] : '');
        window.history.replaceState(null, '', `${pathname}?${params}`);
    }, [pathname, sParam, sParams, val])

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