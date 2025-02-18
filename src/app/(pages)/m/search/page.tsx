'use client';

import { Mobile } from "@/components/mobile";
import { Search as RecentSearch } from "@/components/desktop/navbar/dropdown/elements/Search";
import { useRef, useState } from "react";
import { useScreen, useStore, useUser } from "@/data/hooks";

const Search = () => {

    const { onMobile } = useScreen();

    const { searches } = useStore();
    const { user } = useUser();

    const [query, setQuery] = useState<string>('');
    
    const inputRef = useRef<HTMLInputElement>(null);

    if (!onMobile) return null;

    return (
        <>
            <Mobile.Header.SearchHeader ref={inputRef} query={query} setQuery={setQuery} />
            <section
                className="w-[77%] m-auto py-2"
                onMouseDown={(e: React.MouseEvent) => e.preventDefault()}
            >
                {searches(user).map((query, index) => (
                    <RecentSearch
                        key={index}
                        query={query}
                        setter={() => setQuery(query)}
                        inputRef={inputRef}
                    />
                ))}
            </section >
        </>
    )

}

export default Search;