'use client';

import { Mobile } from "@/components/mobile";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const Page = () => {

    const params = useSearchParams();
    const q = params.get('q') ?? '';

    const [query, setQuery] = useState<string>(q);

    return (
        <>
            <Mobile.Header.SearchHeader query={query} setQuery={setQuery} />
            <p>{q}</p>
        </>
    )

}

export default Page;