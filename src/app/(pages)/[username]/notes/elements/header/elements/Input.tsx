import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => {

    const pathname = usePathname();
    const sParams = useSearchParams();
    const router = useRouter();

    const [query, setQuery] = useState<string>(sParams.get('q') ?? '');

    const updateURL = (value: string) => {
        const params = new URLSearchParams(sParams);
        params.set('q', value);
        router.replace(`${pathname}?${params}`);
    }

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault(); updateURL(query);
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            updateURL(query);
        }, 500);
        return () => clearTimeout(timer);
    }, [query]);

    return (
        <li className="flex-1 inlg:basis-full">
            <form role="search" onSubmit={handleSearchSubmit} className="flex justify-center">
                <input
                    name="q"
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full inlg:max-w-[444px] h-full px-2 py-1 rounded-lg
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