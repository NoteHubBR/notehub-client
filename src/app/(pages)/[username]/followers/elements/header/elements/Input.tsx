import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "@/data/hooks";
import { usePathname, useSearchParams } from "next/navigation";

export const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => {

    const pathname = usePathname();
    const sParams = useSearchParams();

    const [reseted, setReseted] = useState<boolean>(false);
    const [query, setQuery] = useState<null | string>(sParams.get('q'));

    const debouncedSearch = useDebounce(query);

    const updateURL = useCallback((value: string | null) => {
        const params = new URLSearchParams(sParams);
        if (value) {
            if (reseted) return;
            if (params.get('page')) {
                params.delete('page');
                setReseted(true);
            }
            params.set('q', value);
        }
        else params.delete('q');
        window.history.replaceState(null, '', `${pathname}?${params}`);
    }, [pathname, reseted, sParams])

    useEffect(() => {
        updateURL(debouncedSearch);
    }, [debouncedSearch, updateURL]);

    return (
        <li className="flex-1 insm:basis-full">
            <form role="search" onSubmit={(e: React.FormEvent) => e.preventDefault()} className="flex justify-center">
                <input
                    name="q"
                    type="search"
                    spellCheck={false}
                    autoCorrect="off"
                    autoCapitalize="off"
                    value={query ?? ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                    className="w-full insm:max-w-[235px] h-full px-2 py-1 rounded-lg
                    border-2 dark:border-neutral-700/50 border-dark/25
                    text-md placeholder:text-sm
                    bg-transparent
                    focus:!border-primary
                    transition-colors"
                    {...props}
                />
            </form>
        </li>
    )

}