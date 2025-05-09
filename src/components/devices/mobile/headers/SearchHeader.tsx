'use client';

import { clsx } from "clsx";
import { forwardRef } from "react";
import { IconArrowLeft, IconX } from "@tabler/icons-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useScreen, useStore, useUser } from "@/data/hooks";
import Link from "next/link";

interface SearchHeaderProps extends React.InputHTMLAttributes<HTMLInputElement> {
    query: string;
    setQuery: (query: string) => void;
}

export const SearchHeader = forwardRef<HTMLInputElement, SearchHeaderProps>(({ query, setQuery, ...props }, ref) => {

    const sParams = useSearchParams();

    const { onMobile } = useScreen();
    const { searches, setActions } = useStore();
    const { user } = useUser();

    const router = useRouter();

    const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (!query.trim()) return;
        setActions({ searches: [query, ...searches(user).filter(q => q !== query)] }, user?.username);
        const params = new URLSearchParams(sParams);
        params.set('q', query);
        return router.push(`/search?${params}`);
    }

    if (!onMobile) return null;

    return (
        <header className="p-2 flex items-center justify-evenly insm:gap-2">
            <Link
                href="/"
                className="p-1 rounded-full
                hover:dark:bg-lighter/10 hover:bg-dark/10 transition-colors"
            >
                <IconArrowLeft />
            </Link>
            <form onSubmit={onSubmit} className="w-4/5 flex items-center">
                <input
                    ref={ref}
                    inputMode="search"
                    className="outline-none
                    w-full py-[6px] pl-4 pr-10
                    text-sm dark:text-lighter text-dark
                    border-2 dark:border-semilight/10 border-semidark/10 rounded-3xl
                    dark:bg-dark bg-light
                    dark:focus:border-primary focus:border-primary
                    dark:placeholder:text-light/30
                    transition-colors"
                    placeholder="Pesquisar"
                    value={query}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                    {...props}
                />
            </form>
            <button
                aria-label="Apagar"
                className={clsx(
                    query.length > 0 ? 'visible opacity-100' : 'invisible opacity-0',
                    "p-1 rounded-md",
                    "dark:bg-semidark bg-lighter",
                    "hover:dark:bg-lighter/10 hover:bg-dark/10",
                    'transition-all'
                )}
                onMouseDown={(e: React.MouseEvent) => e.preventDefault()}
                onClick={() => { setQuery(''); }}
            >
                <IconX size={18} />
            </button>
        </header>
    )

})

SearchHeader.displayName = 'SearchHeader';