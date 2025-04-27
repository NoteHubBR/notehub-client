import { IconCheck } from "@tabler/icons-react";
import { useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";

interface OptionProps extends React.HTMLAttributes<HTMLLIElement> {
    sParam: string;
    value: (string | null)[];
    text: string
}

export const Option = ({ sParam, value, text, ...rest }: OptionProps) => {

    const pathname = usePathname();
    const sParams = useSearchParams();

    const current = sParams.get(sParam);
    const onRoute = value.includes(current);

    const handleParamUpdate = useCallback(() => {
        const newSParams = new URLSearchParams(sParams);
        newSParams.set(sParam, value[0] ? value[0] : '');
        window.history.replaceState(null, '', `${pathname}?${newSParams}`);
    }, [pathname, sParam, sParams, value])

    return (
        <li
            role="menuitem"
            onClick={handleParamUpdate}
            className="cursor-pointer
            p-2
            flex items-center gap-3
            border-b dark:border-neutral-700/50 border-dark/25 last:border-none
            hover:dark:bg-semidark/75 hover:bg-semilight/75"
            {...rest}
        >
            <span><IconCheck size={15} className={`${!onRoute && 'invisible'}`} /></span>
            <span role="option" aria-selected={onRoute} className="capitalize font-light text-sm">
                {text}
            </span>
        </li>
    )

}