import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IconCheck } from "@tabler/icons-react";

interface OptionProps extends React.HTMLAttributes<HTMLLIElement> {
    sParam: string;
    value: string;
    text: string
}

export const Option = ({ sParam, value, text, ...rest }: OptionProps) => {

    const pathname = usePathname();
    const sParams = useSearchParams();
    const router = useRouter();

    const current = sParams.get(sParam);
    const onRoute = value === current;

    const handleParamUpdate = useCallback(() => {
        const newSParams = new URLSearchParams(sParams);
        newSParams.set(sParam, value);
        router.replace(`${pathname}?${newSParams}`);
    }, [pathname, router, sParam, sParams, value])

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