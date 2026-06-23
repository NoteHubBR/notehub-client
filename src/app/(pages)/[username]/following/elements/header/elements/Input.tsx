import { useDebounce } from "@/data/hooks";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => {

    const pathname = usePathname();
    const sParams = useSearchParams();
    const searchParamsString = sParams.toString();

    const currentQ = sParams.get('q') ?? '';
    const [query, setQuery] = useState(currentQ);
    const debouncedSearch = useDebounce(query);

    useEffect(() => setQuery(currentQ), [currentQ]);

    useEffect(() => {
        if (debouncedSearch === currentQ) return;
        const params = new URLSearchParams(searchParamsString);
        if (debouncedSearch) params.set('q', debouncedSearch);
        else params.delete('q');
        params.delete('page');
        const nextSearch = params.toString();
        const nextUrl = nextSearch ? `${pathname}?${nextSearch}` : pathname;
        const currentUrl = `${pathname}${window.location.search}`;
        if (nextUrl !== currentUrl) window.history.replaceState(null, '', nextUrl);
    }, [debouncedSearch, currentQ, pathname, searchParamsString])

    return (
        <li className="flex-1 insm:basis-full">
            <form role="search" onSubmit={(e: React.FormEvent) => e.preventDefault()} className="flex justify-center">
                <input
                    name="q"
                    type="search"
                    spellCheck={false}
                    autoCorrect="off"
                    autoCapitalize="off"
                    value={query}
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