'use client';

import { clsx } from "clsx";
import { forwardRef } from "react";
import { IconArrowLeft, IconX } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useScreen, useStore, useUser } from "@/data/hooks";

interface SearchHeaderProps extends React.HTMLAttributes<HTMLInputElement> {
    query: string;
    setQuery: (query: string) => void;
}

export const SearchHeader = forwardRef<HTMLInputElement, SearchHeaderProps>(({ query, setQuery, ...props }, ref) => {

    const { onMobile } = useScreen();

    const { searches, setActions } = useStore();
    const { user } = useUser();

    const router = useRouter();

    const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (!query.trim()) return;
        setActions({ searches: [query, ...searches(user).filter(q => q !== query)] }, user?.username);
        router.push(`/search?q=${query}`);
    }

    if (!onMobile) return null;

    return (
        <header className="p-2 flex items-center justify-evenly insm:gap-2">
            <button
                aria-label="Voltar"
                className="p-1 rounded-full
                    hover:dark:bg-neutral-50/10 hover:bg-neutral-900/10 transition-colors"
                onClick={() => router.back()}
            >
                <IconArrowLeft />
            </button>
            <form onSubmit={onSubmit} className="w-4/5 flex items-center">
                <input
                    ref={ref}
                    inputMode="search"
                    className="outline-none
                        w-full py-[6px] pl-4 pr-10
                        text-sm dark:text-neutral-50 text-neutral-900
                        border-2 dark:border-neutral-50/15 border-neutral-900/15 rounded-3xl
                        dark:bg-neutral-900 bg-neutral-100
                        dark:focus:border-violet-600 focus:border-violet-600
                        dark:placeholder:text-neutral-100/30
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
                    "dark:bg-neutral-800 bg-neutral-50",
                    "hover:dark:bg-neutral-50/10 hover:bg-neutral-900/10",
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