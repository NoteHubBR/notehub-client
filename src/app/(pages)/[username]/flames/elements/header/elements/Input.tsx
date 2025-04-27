import { useDebounce } from "@/data/hooks";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => {

    const pathname = usePathname();
    const sParams = useSearchParams();

    const [query, setQuery] = useState<null | string>(sParams.get('q'));

    const debouncedSearch = useDebounce(query);

    useEffect(() => {
        const updateURL = (value: string) => {
            const params = new URLSearchParams(sParams);
            if (value) params.set('q', value);
            else params.delete('q');
            window.history.replaceState(null, '', `${pathname}?${params}`);
        }
        updateURL(debouncedSearch ?? '');
    }, [debouncedSearch, pathname, sParams]);

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
                    className="w-full insm:max-w-[244px] h-full px-2 py-1 rounded-lg
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