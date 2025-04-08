import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => {

    const pathname = usePathname();
    const sParams = useSearchParams();
    const router = useRouter();

    const [query, setQuery] = useState<string>('');

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams(sParams);
        params.set('q', query);
        router.replace(`${pathname}?${params}`);
    }

    return (
        <form role="search" onSubmit={handleSearchSubmit} className="flex-1 flex justify-center inlg:basis-full">
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
    )

}