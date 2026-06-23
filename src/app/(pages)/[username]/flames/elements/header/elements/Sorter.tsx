import { clsx } from "clsx";
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

    const handleParamUpdate = () => {
        const params = new URLSearchParams(sParams);
        const nextValue = val.find((v): v is string => v !== null) ?? null;
        if (nextValue) params.set(sParam, nextValue);
        else params.delete(sParam);
        const keys = Array.from(params.keys());
        if (keys.length === 1 && keys[0] === "page") params.delete("page");
        const nextSearch = params.toString();
        const newUrl = nextSearch ? `${pathname}?${nextSearch}` : pathname;
        window.history.replaceState(null, "", newUrl);
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